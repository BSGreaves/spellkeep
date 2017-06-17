app.controller("PreparedSpellsCtrl", function($scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellIndexFactory, SpellsKnownFactory) {

    $scope.spellsKnown = [];
    $scope.spellbookLevelFilter = "";
    $scope.spellbookSchoolFilter = "";
    $scope.preparedLevelFilter = "";
    $scope.preparedSchoolFilter = "";
    $scope.currChar = {};
    $scope.spellSelected = false;
    $scope.spellDescription = {
        name: "Select a Spell",
    };

    //Page Load

    let getUsersKnownSpells = () => {
        SpellsKnownFactory.getUsersKnownSpells($rootScope.user.activeSpellbook)
            .then(result => $scope.spellsKnown = result)
            .catch(error => console.log("Error in getAllIndexedSpells in PreparedSpellsCtrl", error));
    };

    getUsersKnownSpells();

    CharacterFactory.getSingleCharacter($rootScope.user.activeChar)
        .then(result => $scope.currChar = result)
        .catch(error => console.log("Error in getSingleCharacter in PreparedSpellsCtrl", error));

		//Click Events

    $scope.prepareSpell = spell => {
        spell.prepared = true;
        SpellsKnownFactory.editKnownSpell(spell)
            .then(result => getUsersKnownSpells())
            .catch(error => console.log("Error in prepareSpell/editKnownSpell in PreparedSpellsCtrl", error));
    };

    $scope.unprepareSpell = spell => {
        spell.prepared = false;
        SpellsKnownFactory.editKnownSpell(spell)
            .then(result => getUsersKnownSpells())
            .catch(error => console.log("Error in unprepareSpell/editKnownSpell in PreparedSpellsCtrl", error));
    };

    $scope.setDescription = (spell) => {
        DnDAPIFactory.getSingleAPISpell(spell.url)
        .then(result => {
            result = result.data;
            $scope.spellDescription = result;
            $scope.spellSelected = true;
        })
        .catch(error => console.log("Error in setDescription/getSingleAPISpell in PreparedSpellsCtrl", error));
    };

});