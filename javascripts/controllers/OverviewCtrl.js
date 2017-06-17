app.controller("OverviewCtrl", function($rootScope, $scope, CharacterFactory, DnDAPIFactory, SpellsKnownFactory) {

	//Load currChar
	$scope.currChar = {};
  CharacterFactory.getSingleCharacter($rootScope.user.activeChar)
  .then((result => {
  	$scope.currChar = result;
  	console.log($scope.currChar.primaryClass, $scope.currChar.primaryClassLvl);
  	return DnDAPIFactory.getStatsByLvl($scope.currChar.primaryClass.toLowerCase(), $scope.currChar.primaryClassLvl);
  }), (error => console.log("Error in getSingleCharacter in OverviewCtrl", error)))
  .then(result => {Object.assign($scope.currChar, result.data);})
  .catch(error => console.log("Error in getSingleCharacter in OverviewCtrl", error));

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

});