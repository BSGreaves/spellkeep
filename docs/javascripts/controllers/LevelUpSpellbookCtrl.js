app.controller("LevelUpSpellbookCtrl", function($filter, $location, $scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellIndexFactory, SpellsKnownFactory) {

	$scope.spellIndex = [];
	$scope.spellsKnown = [];
	$scope.indexLevelFilter = "";
	$scope.indexSchoolFilter = "";
	$scope.currChar = {};
	$scope.spellSelected = false;
	$scope.spellDescription = {
		name: "Select a Spell",
	};

	//Page Load
	let getUsersKnownSpells = () => {
		SpellsKnownFactory.getUsersKnownSpells($rootScope.user.activeSpellbook)
		.then(result => $scope.spellsKnown = result)
		.catch(error => console.log("Error in getAllIndexedSpells in SpellbookCtrl", error));
	};

	let getAllIndexedSpells = () => {
		SpellIndexFactory.getAllIndexedSpells()
		.then(result => $scope.spellIndex = result)
		.catch(error => console.log("Error in getAllIndexedSpells in SpellbookCtrl", error));
	};

	let loadDOM = () => {
		getUsersKnownSpells();
		getAllIndexedSpells();
	};

	loadDOM();

	CharacterFactory.getSingleCharacter($rootScope.user.activeChar)
	.then(result => $scope.currChar = result)
	.catch(error => console.log("Error in getSingleCharacter in SpellbookCtrl", error));

	//Click Events
	$scope.switchToPrepareSpells = () => {
		$location.url("/preparespells");
	};

	$scope.setDescription = spell => {
		DnDAPIFactory.getSingleAPISpell(spell.url)
		.then(result => {
			result = result.data;
			$scope.spellDescription = result;
			$scope.spellSelected = true;
		})
		.catch(error => console.log("Error in getSingleAPISpell in SpellbookCtrl", error));
	};

	$scope.writeToSpellbook = newSpell => {
		delete newSpell.id;
		newSpell.prepared = false;
		newSpell.sbid = $rootScope.user.activeSpellbook;
		newSpell.index = parseInt(newSpell.url.split("/").pop());
		SpellsKnownFactory.postNewKnownSpell(newSpell)
			.then(result => loadDOM())
			.catch(error => console.log("Error in writeToSpellbook/postNewKnownSpell in SpellbookCtrl", error));
	};

	$scope.deleteFromSpellbook = id => {
		SpellsKnownFactory.deleteKnownSpell(id)
			.then(result => loadDOM())
			.catch(error => console.log("Error in deleteFromSpellbook in SpellbookCtrl", error));
	};

	//Calculations
	let calcCharStats = () => {
		$scope.currChar.maxCastingLevel = (Object.keys($scope.currChar.spellcasting).filter(key => {
			return $scope.currChar.spellcasting[key] > 0;
		}).length) - 1;
	};
});