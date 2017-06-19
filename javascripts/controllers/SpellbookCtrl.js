app.controller("SpellbookCtrl", function($filter, $scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellIndexFactory, SpellsKnownFactory) {

    $scope.spellIndex = [];
    $scope.spellsKnown = [];
    $scope.indexLevelFilter = "";
    $scope.indexSchoolFilter = "";
    $scope.currChar = {};
    $scope.spellSelected = false;
    $scope.spellDescription = {
        name: "Select a Spell",
    };

    $scope.writeToSpellbook = newSpell => {
        console.log(newSpell);
        delete newSpell.id;
        newSpell.prepared = false;
        newSpell.sbid = $rootScope.user.activeSpellbook;
        newSpell.index = parseInt(newSpell.url.split("/").pop());
        console.log(newSpell);
        SpellsKnownFactory.postNewKnownSpell(newSpell)
            .then(result => loadDOM())
            .catch(error => console.log("Error in writeToSpellbook/postNewKnownSpell in SpellbookCtrl", error));
    };

    $scope.deleteFromSpellbook = id => {
        SpellsKnownFactory.deleteKnownSpell(id)
            .then(result => loadDOM())
            .catch(error => console.log("Error in deleteFromSpellbook in SpellbookCtrl", error));
    };

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

    $scope.setDescription = (spell) => {
        DnDAPIFactory.getSingleAPISpell(spell.url)
        .then(result => {
            result = result.data;
            $scope.spellDescription = result;
            $scope.spellSelected = true;
        })
        .catch(error => console.log("Error in getSingleAPISpell in SpellbookCtrl", error));
    };

    let calcCharStats = () => {
        console.log(("CurrChar after getting stats", $scope.currChar));
        console.log(("CurrChar after getting stats", $scope.currChar.spellcasting));
        $scope.currChar.maxCastingLevel = (Object.keys($scope.currChar.spellcasting).filter(key => {
            return $scope.currChar.spellcasting[key] > 0;
        }).length) - 1;
    };
});