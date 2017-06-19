let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    var logged = AuthFactory.isAuthenticated();
    var appTo;
    if (currRoute.originalPath) {
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
});

app.config(function($routeProvider) {
	$routeProvider
	.when("/overview", {
		templateUrl: "partials/overview.html",
		controller: "OverviewCtrl",
		resolve: {isAuth}
	})
  .when("/characters", {
    templateUrl: "partials/change-character.html",
    controller: "ChangeCharacterCtrl",
    resolve: {isAuth}
  })
  .when("/viewcharacter", {
    templateUrl: "partials/character-view.html",
    controller: "CharacterViewCtrl",
    resolve: {isAuth}
  })
  .when("/modifyspellslots", {
    templateUrl: "partials/modify-spell-slots.html",
    controller: "ModifySpellSlots",
    resolve: {isAuth}
  })
  .when("/modifystats", {
    templateUrl: "partials/modify-stats.html",
    controller: "ModifyStatsCtrl",
    resolve: {isAuth}
  })
  .when("/preparespells", {
    templateUrl: "partials/spells-prepared.html",
    controller: "PreparedSpellsCtrl",
    resolve: {isAuth}
  })
  .when("/spellbook", {
    templateUrl: "partials/spellbook.html",
    controller: "SpellbookCtrl",
    resolve: {isAuth}
  })
  .when("/newspellbook", {
    templateUrl: "partials/newSpellbook.html",
    controller: "NewSpellbookCtrl",
    resolve: {isAuth}
  })
  .when("/newcharacter", {
    templateUrl: "partials/new-character.html",
    controller: "NewCharacterCtrl",
    resolve: {isAuth}
  })
	.when("/auth", {
		templateUrl: "partials/authentication.html",
		controller: "AuthCtrl"
	})
  .when("/logout", {
    templateUrl: "partials/authentication.html",
    controller: "AuthCtrl",
    resolve: {isAuth}
  })
	.otherwise("/auth");
});