app.controller("RestCtrl", function($rootScope, $scope, $location, CharacterFactory, DnDAPIFactory, SpellbookFactory) {

	$scope.currSpellbook = {};
	$scope.currChar = {};

	//Page Load
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


  //Click Events
	$scope.keepPreparedSpells = () => {
		resetSpellSlots();
		$location.path('/overview');
	};

	$scope.editPreparedSpells = () => {
		resetSpellSlots();
		$location.path('/preparespells');
	};

	let resetSpellSlots = () => {
		$scope.currSpellbook.lvl1Rem = $scope.currChar.spellcasting.spell_slots_level_1;
		$scope.currSpellbook.lvl2Rem = $scope.currChar.spellcasting.spell_slots_level_2;
		$scope.currSpellbook.lvl3Rem = $scope.currChar.spellcasting.spell_slots_level_3;
		$scope.currSpellbook.lvl4Rem = $scope.currChar.spellcasting.spell_slots_level_4;
		$scope.currSpellbook.lvl5Rem = $scope.currChar.spellcasting.spell_slots_level_5;
		$scope.currSpellbook.lvl6Rem = $scope.currChar.spellcasting.spell_slots_level_6;
		$scope.currSpellbook.lvl7Rem = $scope.currChar.spellcasting.spell_slots_level_7;
		$scope.currSpellbook.lvl8Rem = $scope.currChar.spellcasting.spell_slots_level_8;
		$scope.currSpellbook.lvl9Rem = $scope.currChar.spellcasting.spell_slots_level_9;
		SpellbookFactory.editSpellbook($scope.currSpellbook)
		.then()
		.catch(error => console.log("Error in resetSpellSlots in RestCtrl", error));
	};

});