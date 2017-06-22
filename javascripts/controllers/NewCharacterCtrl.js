app.controller("NewCharacterCtrl", function($location, $scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellbookFactory, UserFactory) {

	$scope.status = {
    isopen: false
  };

  $scope.newChar = {
		charName: "",
		uid: $rootScope.user.uid,
		imgUrl: "",
		profBonus: 0,
		spellDCBonus: 0,
		primaryClass: "",
		primaryClassLvl: 1,
		secondaryClass: "", 
		secondaryClassLvl: 0,
		tertiaryClass: "",
		tertiaryClassLvl: 0,
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10
  };

	$scope.postNewCharacter = () => {
		let newCharID = "";
		let newSpellbookID = "";
		CharacterFactory.postNewCharacter($scope.newChar)
		.then((result => {
			newCharID = result.data.name;
			return DnDAPIFactory.getStatsByLvl($scope.newChar.primaryClass.toLowerCase(), 1);
		}),
		(error => console.log("Error in postNewCharacter in NewCharacterCtrl", error)))
		.then((result => {
			result = result.data;
			let newSpellbook = {
				charid: newCharID,
				uid: $rootScope.user.uid,
				class: $scope.newChar.primaryClass,
				lvl1Rem: result.spellcasting.spell_slots_level_1,
				lvl2Rem: result.spellcasting.spell_slots_level_2,
				lvl3Rem: result.spellcasting.spell_slots_level_3,
				lvl4Rem: result.spellcasting.spell_slots_level_4,
				lvl5Rem: result.spellcasting.spell_slots_level_5,
				lvl6Rem: result.spellcasting.spell_slots_level_6,
				lvl7Rem: result.spellcasting.spell_slots_level_7,
				lvl8Rem: result.spellcasting.spell_slots_level_8,
				lvl9Rem: result.spellcasting.spell_slots_level_9
			};
			return SpellbookFactory.postNewSpellbook(newSpellbook);
		}),
		(error => console.log("Error in getStatsByLvl in NewCharacterCtrl", error)))
		.then((result => {
			newSpellbookID = result.data.name;
			$rootScope.user.activeSpellbook = newSpellbookID;
			$rootScope.user.activeChar = newCharID;
			return UserFactory.editUser($rootScope.user);
		}),
		(error => console.log("Error in postNewSpellbook in NewCharacterCtrl", error)))
		.then(result => $location.url("/newspellbook"))
		.catch(error => console.log("Error in editUser in NewCharacterCtrl", error));
	};
});