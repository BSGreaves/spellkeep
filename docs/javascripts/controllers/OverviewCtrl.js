app.controller("OverviewCtrl", function(ngToast, $uibModal, $rootScope, $scope, CharacterFactory, DnDAPIFactory, SpellbookFactory, SpellsKnownFactory) {

	//Load currChar
	$scope.currChar = {};
	$scope.currSpellbook = {};
	$scope.spellsKnown = [];
  CharacterFactory.getSingleCharacter($rootScope.user.activeChar)
  .then((result => {
  	$scope.currChar = result;
  	return DnDAPIFactory.getStatsByLvl($scope.currChar.primaryClass.toLowerCase(), $scope.currChar.primaryClassLvl);
  }), (error => console.log("Error in getSingleCharacter in OverviewCtrl", error)))
  .then((result => {
  	Object.assign($scope.currChar, result.data);
  	return SpellbookFactory.getAllCharSpellbooks($scope.currChar.id);
  }), (error => console.log("Error in getStatsByLvl in OverviewCtrl", error)))
  .then(result => $scope.currSpellbook = result[0])
  .catch(error => console.log("Error in getAllCharSpellbooks in OverviewCtrl", error));

  let getUsersKnownSpells = () => {
    SpellsKnownFactory.getUsersKnownSpells($rootScope.user.activeSpellbook)
    .then(result => $scope.spellsKnown = result)
    .catch(error => console.log("Error in getAllIndexedSpells in PreparedSpellsCtrl", error));
  };

  getUsersKnownSpells();

	//Derived Stats
	$scope.calcSpellDC = () => {
		return Math.floor(8 + $scope.currChar.prof_bonus + (($scope.currChar.int - 10)/2));
	};

	//Modals
	$scope.castSpellModal = function(spell) {
	  let modalInstance = $uibModal.open({
	    ariaLabelledBy: 'modal-title',
	    ariaDescribedBy: 'modal-body',
	    templateUrl: '/partials/modals/castspell.html',
	    controller: 'CastSpellModalCtrl',
	    size: 'sm',
	    resolve: {
	      spell: function() {
	        return spell;
	      },
	      spellbook: function() {
	        return $scope.currSpellbook;
	      },
	      char: function() {
	        return $scope.currChar;
	      }
	    }
	  });

	  modalInstance.result.then(function(selectedSpellSlot) {
	    Object.keys($scope.currSpellbook).forEach(key => {
	    	if (key.indexOf(selectedSpellSlot) > -1) {
	    		$scope.currSpellbook[key] = ($scope.currSpellbook[key] - 1);
	    	}
	    });
	    SpellbookFactory.editSpellbook($scope.currSpellbook)
	    .then((result => SpellbookFactory.getAllCharSpellbooks($scope.currChar.id)),
	    	(error => console.log("Error in editSpellbook in OverviewCtrl", error)))
	    .then(result => {
	    	$scope.currSpellbook = result[0];
	    	ngToast.create({
  				className: 'info',
  				content: `${spell.name} cast at Level ${selectedSpellSlot}!`
				});
	    })
  		.catch(error => console.log("Error in getAllCharSpellbooks in OverviewCtrl", error));
	  }, function() {});
	};

	$scope.spellInfoModal = function(spellURL) {
	  let modalInstance = $uibModal.open({
	    ariaLabelledBy: 'modal-title',
	    ariaDescribedBy: 'modal-body',
	    templateUrl: '/partials/modals/spellinfo.html',
	    controller: 'SpellInfoModalCtrl',
	    resolve: {
	      spellURL: function() {
	        return spellURL;
	      }
	    }
	  });

	  modalInstance.result.then(function() {}, function() {});
	};
});