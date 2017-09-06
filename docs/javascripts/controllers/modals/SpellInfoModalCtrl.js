app.controller("SpellInfoModalCtrl", function($scope, $uibModalInstance, spellURL, DnDAPIFactory) {

	$scope.spellURL = spellURL;
	$scope.spellDescription = {};

  DnDAPIFactory.getSingleAPISpell($scope.spellURL)
  .then(result => {
      result = result.data;
      $scope.spellDescription = result;
  })
  .catch(error => console.log("Error in getSingleAPISpell in SpellbookCtrl", error));

  $scope.close = function() {
    $uibModalInstance.dismiss('cancel');
  };
	
});