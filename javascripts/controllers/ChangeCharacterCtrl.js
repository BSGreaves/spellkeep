app.controller("ChangeCharacterCtrl", function($scope, $rootScope, CharacterFactory, SpellbookFactory) {

	$scope.allCharacters = [];

	let getAllCharacters = () => {
		CharacterFactory.getAllCharacters($rootScope.user.uid)
		.then(result => $scope.allCharacters = result)
		.catch(error => console.log("Error in getAllCharacters in ChangeCharacterCtrl", error));
	};

	getAllCharacters();

	$scope.deleteCharacter = charid => {
		CharacterFactory.deleteCharacter(charid)
		.then(result => getAllCharacters())
		.catch(error => console.log("Error in deleteCharacter in ChangeCharacterCtrl", error));
	};

	$scope.setActiveCharacter = selectedCharId => {
		$rootScope.user.charid = selectedCharId;
		SpellbookFactory.getAllCharSpellbooks(selectedCharId)
		.then()
		.catch();
	};

});