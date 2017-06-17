app.controller("NewCharacterCtrl", function($scope, $rootScope, CharacterFactory) {

	$scope.status = {
    isopen: false
  };

  $scope.newChar = {
		charName: "",
		uid: "",
		imgUrl: "http://img07.deviantart.net/b011/i/2012/360/3/5/wise_old_wizard_by_xxtokenxx-d5pah0w.jpg",
		profBonus: 0,
		spellDCBonus: 0,
		primaryClass: "",
		primaryClassLvl: 1,
		secondaryClass: "", 
		secondaryClassLvl: 0,
		tertiaryClass: "",
		tertiaryClassLvl: 0,
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10
  };

	$scope.postNewCharacter = () => {
		$scope.newChar.uid = $rootScope.user.uid;
		console.log($scope.newChar);
		CharacterFactory.postNewCharacter($scope.newChar)
		.then(result => console.log(result))
		.catch(error => console.log("Error in postNewCharacter in NewCharacterCtrl", error));
	};

});