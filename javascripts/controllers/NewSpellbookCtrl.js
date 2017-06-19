app.controller("NewSpellbookCtrl", function($filter, $scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellIndexFactory, SpellsKnownFactory) {

    $scope.currChar = {};
    $scope.currSpellbook = {};
    $scope.spellIndex = [];
    $scope.spellsKnown = [];
    $scope.spellSelected = false;
    $scope.spellDescription = {
        name: "Select a Spell"
    };
    let cantripLimit = 3;
    let firstLvlLimit = 6;

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

    $scope.writeToSpellbook = newSpell => {
        console.log(newSpell);
        delete newSpell.id;
        newSpell.prepared = false;
        newSpell.sbid = $rootScope.user.activeSpellbook;
        newSpell.index = parseInt(newSpell.url.split("/").pop());
        console.log(newSpell);
        SpellsKnownFactory.postNewKnownSpell(newSpell)
            .then(result => loadDOM())
            .catch(error => console.log("Error in writeToSpellbook/postNewKnownSpell in NewSpellbookCtrl", error));
    };

    $scope.deleteFromSpellbook = id => {
        SpellsKnownFactory.deleteKnownSpell(id)
            .then(result => loadDOM())
            .catch(error => console.log("Error in deleteFromSpellbook in NewSpellbookCtrl", error));
    };

    let getUsersKnownSpells = () => {
        SpellsKnownFactory.getUsersKnownSpells($rootScope.user.activeSpellbook)
            .then(result => $scope.spellsKnown = result)
            .catch(error => console.log("Error in getAllIndexedSpells in NewSpellbookCtrl", error));
    };

    let getAllIndexedSpells = () => {
        SpellIndexFactory.getAllIndexedSpells()
            .then(result => $scope.spellIndex = result)
            .catch(error => console.log("Error in getAllIndexedSpells in NewSpellbookCtrl", error));
    };

    let loadDOM = () => {
        getUsersKnownSpells();
        getAllIndexedSpells();
    };

    loadDOM();

    CharacterFactory.getSingleCharacter($rootScope.user.activeChar)
        .then((result => {
            $scope.currChar = result;
            return DnDAPIFactory.getStatsByLvl($scope.currChar.primaryClass.toLowerCase(), $scope.currChar.primaryClassLvl);}),
            (error => console.log("Error in getSingleCharacter in NewSpellbookCtrl", error)))
        .then((result => {
            Object.assign($scope.currChar, result.data);
            }),
            (error => console.log("Error in getStatsByLvl in NewSpellbookCtrl", error)));

    $scope.setDescription = (spell) => {
        DnDAPIFactory.getSingleAPISpell(spell.url)
        .then(result => {
            result = result.data;
            $scope.spellDescription = result;
            $scope.spellSelected = true;
        })
        .catch(error => console.log("Error in getSingleAPISpell in NewSpellbookCtrl", error));
    };

    let calcCharStats = () => {
        console.log(("CurrChar after getting stats", $scope.currChar));
        console.log(("CurrChar after getting stats", $scope.currChar.spellcasting));
        $scope.currChar.maxCastingLevel = (Object.keys($scope.currChar.spellcasting).filter(key => {
            return $scope.currChar.spellcasting[key] > 0;
        }).length) - 1;
    };


});