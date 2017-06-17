app.filter("toUppercase", function () {
	return function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
});