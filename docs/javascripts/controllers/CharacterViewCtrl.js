app.controller("CharacterViewCtrl", function($scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellbookFactory, SpellsKnownFactory) {

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

  //Derived Stats
	$scope.calcSpellDC = () => {
		return Math.floor(8 + $scope.currChar.prof_bonus + (($scope.currChar.int - 10)/2));
	};

});