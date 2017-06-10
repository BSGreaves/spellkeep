app.factory("SpellFactory", function($http, $q) {

	let fetchSpellList = () => {
		return $q((resolve, reject) => {
			$http.get(`http://dnd5eapi.co/api/spells/`)
			.then(data => resolve(data))
			.catch(error => reject(error));
		});
	};

	let fetchSingleSpell = (spellID) => {
		return $q((resolve, reject) => {
			$http.get(`http://dnd5eapi.co/api/spells/${spellID}`)
			.then(data => resolve(data))
			.catch(error => reject(error));
		});
	};

	return {fetchSpellList: fetchSpellList, fetchSingleSpell: fetchSingleSpell};
});