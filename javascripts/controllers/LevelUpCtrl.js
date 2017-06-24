app.controller("LevelUpCtrl", function($location, $rootScope, $scope, CharacterFactory, DnDAPIFactory, SpellbookFactory) {

	//Load currChar
	$scope.currChar = {};
	$scope.currSpellbook = {};
	$scope.newLevelChar = {};
	$scope.pointDistribution = "bundle";
  CharacterFactory.getSingleCharacter($rootScope.user.activeChar)
  .then((result => {
  	$scope.currChar = result;
  	return DnDAPIFactory.getStatsByLvl($scope.currChar.primaryClass.toLowerCase(), $scope.currChar.primaryClassLvl);
  }), (error => console.log("Error in getSingleCharacter in OverviewCtrl", error)))
  .then((result => {
  	Object.assign($scope.currChar, result.data);
  	return SpellbookFactory.getAllCharSpellbooks($scope.currChar.id);
  }), (error => console.log("Error in getStatsByLvl in OverviewCtrl", error)))
  .then((result => {
  	$scope.currSpellbook = result[0];
  	return DnDAPIFactory.getStatsByLvl($scope.currChar.primaryClass.toLowerCase(), ($scope.currChar.primaryClassLvl + 1));
  }), (error => console.log("Error in getAllCharSpellbooks in OverviewCtrl", error)))
	.then(result => {
		$scope.newLevelChar = result.data;
		$scope.newLevelChar.receivesAbilityScoreImprovement = checkForAbilityScoreImprovement($scope.newLevelChar.features);
	})
  .catch(error => console.log("Error in getAllCharSpellbooks in OverviewCtrl", error));

	//Derived Stats

	let checkForAbilityScoreImprovement = featuresArray => {
		let answer = false;
		featuresArray.forEach(feature => {
			if (feature.name.includes("Ability Score Improvement")) {
				answer = true;			}
		});
		return answer;
	};

	$scope.calcSpellDC = () => {
		return Math.floor(8 + $scope.currChar.prof_bonus + (($scope.currChar.int - 10)/2));
	};

	$scope.calcBundleStats = () => {

	};

	$scope.calcSplitStats = () => {

	};

	//Click Events
	$scope.levelUpCharacter = () => {
		$scope.currChar.primaryClassLvl++;
		if ($scope.pointDistribution === 'bundle' && $scope.newLevelChar.ability_score_bonuses > 0) {
			$scope.currChar[$scope.bundleSelected] = ($scope.currChar[$scope.bundleSelected] + 2);
		}
		if ($scope.pointDistribution === 'split' && $scope.newLevelChar.ability_score_bonuses > 0) {
			$scope.currChar[$scope.splitSelected1] = ($scope.currChar[$scope.splitSelected1] + 1);
			$scope.currChar[$scope.splitSelected2] = ($scope.currChar[$scope.splitSelected2] + 1);
		}
		$scope.currSpellbook.lvl1Rem = $scope.newLevelChar.spellcasting.spell_slots_level_1;
		$scope.currSpellbook.lvl2Rem = $scope.newLevelChar.spellcasting.spell_slots_level_2;
		$scope.currSpellbook.lvl3Rem = $scope.newLevelChar.spellcasting.spell_slots_level_3;
		$scope.currSpellbook.lvl4Rem = $scope.newLevelChar.spellcasting.spell_slots_level_4;
		$scope.currSpellbook.lvl5Rem = $scope.newLevelChar.spellcasting.spell_slots_level_5;
		$scope.currSpellbook.lvl6Rem = $scope.newLevelChar.spellcasting.spell_slots_level_6;
		$scope.currSpellbook.lvl7Rem = $scope.newLevelChar.spellcasting.spell_slots_level_7;
		$scope.currSpellbook.lvl8Rem = $scope.newLevelChar.spellcasting.spell_slots_level_8;
		$scope.currSpellbook.lvl9Rem = $scope.newLevelChar.spellcasting.spell_slots_level_9;
		CharacterFactory.editCharacter($scope.currChar)
		.then((result => {
			return SpellbookFactory.editSpellbook($scope.currSpellbook);
		}), (error => console.log("error in editCharacter in LevelUpCtrl", error)))
		.then(result => $location.url("/levelupspellbook"))
		.catch(error => console.log("error in editSpellbook in LevelUpCtrl", error));
	};

});