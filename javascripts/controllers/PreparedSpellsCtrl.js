app.controller("PreparedSpellsCtrl", function($filter, $location, $scope, $rootScope, CharacterFactory, DnDAPIFactory, SpellbookFactory, SpellIndexFactory, SpellsKnownFactory) {

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

    //Get Known Spells
    let getUsersKnownSpells = () => {
        SpellsKnownFactory.getUsersKnownSpells($rootScope.user.activeSpellbook)
            .then(result => {
                $scope.spellsKnown = result;
                $scope.numberPrepared = $filter('filter')($scope.spellsKnown, {prepared: true }).length;
            })
            .catch(error => console.log("Error in getAllIndexedSpells in PreparedSpellsCtrl", error));
    };

    getUsersKnownSpells();

    //Load Char, StatsByLvl, and Spellbook
    CharacterFactory.getSingleCharacter($rootScope.user.activeChar)
    .then((result => {
        $scope.currChar = result;
        return DnDAPIFactory.getStatsByLvl($scope.currChar.primaryClass.toLowerCase(), $scope.currChar.primaryClassLvl);
    }), (error => console.log("Error in getSingleCharacter in PreparedSpellsCtrl", error)))
    .then((result => {
        Object.assign($scope.currChar, result.data);
        $scope.currChar.maxCastingLevel = (Object.keys($scope.currChar.spellcasting).filter(key => {
            return $scope.currChar.spellcasting[key] > 0;
        }).length) - 1;
        $scope.currChar.preparedSpellsLimit = Math.floor($scope.currChar.primaryClassLvl + (($scope.currChar.int - 10)/2));
        return SpellbookFactory.getAllCharSpellbooks($scope.currChar.id);
    }), (error => console.log("Error in getStatsByLvl in PreparedSpellsCtrl", error)))
    .then(result => $scope.currSpellbook = result[0])
    .catch(error => console.log("Error in getAllCharSpellbooks in PreparedSpellsCtrl", error));


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
    $scope.setDescription = spell => {
        DnDAPIFactory.getSingleAPISpell(spell.url)
        .then(result => {
            result = result.data;
            $scope.spellDescription = result;
            $scope.spellSelected = true;
        })
        .catch(error => console.log("Error in setDescription/getSingleAPISpell in PreparedSpellsCtrl", error));
    };
    $scope.switchToOverview = () => {
        $location.url("/overview");
    };

});