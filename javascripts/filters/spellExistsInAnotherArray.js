app.filter("spellExistsInAnotherArray", function() {
	return function(items, otherArray) {
		return items.filter(item => {
			return !otherArray.some(each => item.name === each.name);
		});
	};
});