app.factory("CharacterFactory", function($q, $http, FIREBASE_CONFIG) {

	let getAllCharacters = (userid) => {
		let outputArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/characters.json?orderBy="uid"&equalTo="${userid}"`)
			.then(fbItems => {
				fbItems = fbItems.data;
				if (fbItems !== null) {
		      Object.keys(fbItems).forEach(key => {
		        fbItems[key].id=key;
		        outputArray.push(fbItems[key]);
		      });
				}
		    resolve(outputArray);
			})
			.catch(error => reject(error));
		});
	};

	let getSingleCharacter = charid => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/characters/${charid}.json`)
			.then(fbItem => {
				fbItem = fbItem.data;
				fbItem.id = charid;
		    resolve(fbItem);
			})
			.catch(error => reject(error));
		});
	};

	let postNewCharacter = newChar => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/characters.json`, JSON.stringify(newChar))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let deleteCharacter = charid => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/characters/${charid}.json`)
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let editCharacter = editedChar => {
		let editId = editedChar.id;
		delete editedChar.id;
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/characters/${editId}.json`, angular.toJson(editedChar))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};
	

	return {getAllCharacters:getAllCharacters, getSingleCharacter:getSingleCharacter, postNewCharacter:postNewCharacter, deleteCharacter:deleteCharacter, editCharacter:editCharacter};
});