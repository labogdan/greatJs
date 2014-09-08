func = function() {
	url = 'http://somesite.com';
	goTo = function() {
		console.log(url);
	};
	return {goTo : goTo};
}();
func.goTo();