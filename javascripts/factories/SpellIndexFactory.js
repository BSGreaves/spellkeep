app.factory("SpellIndexFactory", function($q, $http, FIREBASE_CONFIG) {

	let getAllIndexedSpells = () => {
		let outputArray = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/spellIndex.json`)
			.then(fbItems => {
				fbItems = fbItems.data;
				if (fbItems !== null) {
		      Object.keys(fbItems).forEach(key => {
		        fbItems[key].id = key;
		        outputArray.push(fbItems[key]);
		      });
				}
		    resolve(outputArray);
			})
			.catch(error => reject(error));
		});
	};

	return {getAllIndexedSpells:getAllIndexedSpells};
});