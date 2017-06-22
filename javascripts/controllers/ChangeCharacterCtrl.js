app.controller("ChangeCharacterCtrl", function($scope, $rootScope, CharacterFactory, SpellbookFactory, SpellsKnownFactory, UserFactory) {

	$scope.allCharacters = [];

	let getAllCharacters = () => {
		CharacterFactory.getAllCharacters($rootScope.user.uid)
		.then(result => $scope.allCharacters = result)
		.catch(error => console.log("Error in getAllCharacters in ChangeCharacterCtrl", error));
	};

	getAllCharacters();

	$scope.deleteCharacter = char => {
		SpellbookFactory.getAllCharSpellbooks(char.id)
		.then((result => {
			result.forEach(spellbook => {
				SpellsKnownFactory.getUsersKnownSpells(spellbook.id)
				.then((result => {
					result.forEach(spell => {
						SpellsKnownFactory.deleteKnownSpell(spell.id)
						.then()
						.catch(error => console.log("Error in deleteKnownSpell in ChangeCharacterCtrl", error));
					});
					return SpellbookFactory.deleteSpellbook(spellbook.id);
				}), (error => console.log("Error in getUsersKnownSpells in ChangeCharacterCtrl", error)))
				.then()
				.catch(error => console.log("Error in deleteSpellbook in ChangeCharacterCtrl", error));
			});
			return CharacterFactory.deleteCharacter(char.id);
		}),
		(error => console.log("Error in getAllCharSpellbooks in ChangeCharacterCtrl", error)))
		.then(result => getAllCharacters())
		.catch(error => console.log("Error in deleteCharacter in ChangeCharacterCtrl", error));
	};

	$scope.setActiveCharacter = selectedCharId => {
		SpellbookFactory.getAllCharSpellbooks(selectedCharId)
		.then((result => {
			let firstSpellbook = result[0];
			$rootScope.user.activeSpellbook = firstSpellbook.id;
			$rootScope.user.activeChar = selectedCharId;
			return UserFactory.editUser($rootScope.user);
		}), (error => console.log("Error in getAllCharSpellbooks in ChangeCharacterCtrl", error)))
		.then((result => {
			return UserFactory.getUser($rootScope.user.uid);
		}), (error => console.log("Error in getAllCharSpellbooks in ChangeCharacterCtrl", error)))
		.then(result => {
			$rootScope.user = result;
			getAllCharacters();
		})
		.catch(error => console.log("Error in editUser in ChangeCharacterCtrl", error));
	};

});