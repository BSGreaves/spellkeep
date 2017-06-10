app.controller("OverviewCtrl", function($scope, SpellFactory) {

	$scope.spellList = [];
	
	let loadSpells = () => {
		console.log("Test");
		SpellFactory.fetchSpellList()
		.then(results => {console.log(results); $scope.spellList = results.data.results;})
		.catch(error => console.log("Error in loadSpells", error));
	};

	let indexSpells = () => {
		let indexedSpells = [];
		console.log("Test");
		SpellFactory.fetchSpellList()
		.then(results => {
			console.log(results.data.results); 
		}, error => console.log(error));
	};

	indexSpells();

	//loadSpells(); 

});