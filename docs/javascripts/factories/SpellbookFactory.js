app.factory("SpellbookFactory", function($q, $http, FIREBASE_CONFIG) {

	let getAllCharSpellbooks = charId => {
		let outputArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/spellbooks.json?orderBy="charid"&equalTo="${charId}"`)
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

	let postNewSpellbook = newSpellbook => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/spellbooks.json`, JSON.stringify(newSpellbook))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let editSpellbook = editedSpellbook => {
		let editId = editedSpellbook.id;
		delete editedSpellbook.id;
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/spellbooks/${editId}.json`, angular.toJson(editedSpellbook))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let deleteSpellbook = id => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/spellbooks/${id}.json`)
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	return {getAllCharSpellbooks:getAllCharSpellbooks, postNewSpellbook:postNewSpellbook, editSpellbook:editSpellbook, deleteSpellbook:deleteSpellbook};
});