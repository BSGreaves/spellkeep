var app = angular.module("SpellKeepApp", ["ngRoute", "ui.bootstrap", "angular.filter", "ngToast"])
	.config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }]);