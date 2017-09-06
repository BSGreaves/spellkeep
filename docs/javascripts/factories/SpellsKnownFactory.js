app.factory("SpellsKnownFactory", function($q, $http, FIREBASE_CONFIG) {

	let getUsersKnownSpells = sbid => {
		let outputArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/spellsKnown.json?orderBy="sbid"&equalTo="${sbid}"`)
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

	let postNewKnownSpell = newSpell => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/spellsKnown.json`, angular.toJson(newSpell))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let deleteKnownSpell = id => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/spellsKnown/${id}.json`)
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let editKnownSpell = editedSpell => {
		console.log(editedSpell);
		let editId = editedSpell.id;
		delete editedSpell.id;
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/spellsKnown/${editId}.json`, angular.toJson(editedSpell))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	return {postNewKnownSpell:postNewKnownSpell, getUsersKnownSpells:getUsersKnownSpells, deleteKnownSpell:deleteKnownSpell, editKnownSpell:editKnownSpell};
});