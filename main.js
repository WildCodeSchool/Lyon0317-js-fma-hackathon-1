$(document).ready(function () {

	let searchURL = 'http://www.omdbapi.com/?s=mask&plot=full';

	//Get the API adresse
	$.getJSON(searchURL).done(function (movies) {
		console.log(movies);


		let app = new Vue({ //Vue.js variable
			el: '#searchMovies',
			data: {
				movies,

			}
		})


	});




});