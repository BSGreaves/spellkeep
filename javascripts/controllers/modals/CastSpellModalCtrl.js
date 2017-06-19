app.controller("CastSpellModalCtrl", function($scope, $uibModalInstance, spell, spellbook, char) {

	$scope.spell = spell;
	$scope.spellbook = spellbook;
	$scope.char = char;
	$scope.selectedSpellSlot = spell.level.toString();
	console.log("spell", spell);
	console.log("spellbook", spellbook);
	console.log("char", char);


	$scope.castSpell = function() {
    $uibModalInstance.close($scope.selectedSpellSlot);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
	
});