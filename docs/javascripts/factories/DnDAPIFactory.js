app.factory("DnDAPIFactory", function($http, $q) {

	let getAllAPISpells = () => {
		return $q((resolve, reject) => {
			$http.get(`https://spellkeep-proxy.herokuapp.com/api/spellKeep/spells/`)
			.then(data => resolve(data))
			.catch(error => reject(error));
		});
	};

	let getSingleAPISpell = (url) => {
		return $q((resolve, reject) => {
			$http.get(url)
			.then(data => resolve(data))
			.catch(error => reject(error));
		});
	};

	let getStatsByLvl = (className, level) => {
		return $q((resolve, reject) => {
			$http.get(`https://spellkeep-proxy.herokuapp.com/api/spellKeep/classes/${className}/level/${level}`)
			.then(data => resolve(data))
			.catch(error => reject(error));
		});
	}; 

	return {getAllAPISpells: getAllAPISpells, getSingleAPISpell: getSingleAPISpell, getStatsByLvl:getStatsByLvl};
});