app.controller("SideNavCtrl", function($scope, $rootScope, $location) {

  $scope.overviewCollapsed = true;
  $scope.characterCollapsed = true;
  $scope.referenceCollapsed = true;

	$scope.ifUrlIs = (path) => {
		if ($location.url() == path) {
			return true;
		} 
	};

});