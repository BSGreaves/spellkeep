app.controller("NewSpellbookCtrl", function($filter, $scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellIndexFactory, SpellsKnownFactory) {

    $scope.spellIndex = [];
    $scope.spellsKnown = [];
    $scope.currChar = {};
    $scope.spellSelected = false;
    $scope.spellDescription = {
        name: "Select a Spell"
    };
    let cantripLimit = 3;
    let firstLvlLimit = 6;
    $scope.searchIndex = "";

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
                calcCharStats();}),
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

    $scope.filterIndexedSpells = (spellLvl) => {
        console.log("SpellObj", spellLvl);
        let passed = true;
        if (spellLvl > $scope.currChar.maxCastingLevel) {
            passed = false;
        }
        return passed;
    };

    //Needs to be tested further
    $scope.isInKnown = (spellIndex) => {
        let result = true;
        console.log("Working");
        $scope.spellsKnown.forEach(spell => {
            if (spell.index === spellIndex) {
                console.log("FALSE FALSE FALSE");
                console.log("spellIndex", spellIndex, "knownSpellIndex", spell.index, spell);
                result = false;
            }
        });
    return result;
    };




});