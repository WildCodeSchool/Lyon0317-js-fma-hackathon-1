$(document).ready(function () {

	let searchURL = 'http://www.omdbapi.com/?s=mask&plot=full';


	$.getJSON(searchURL).done(function (movies) {
		console.log(movies);
		let app = new Vue({
			el: '#searchMovies',
			data: {
				movies,

			}
		})


	});




});