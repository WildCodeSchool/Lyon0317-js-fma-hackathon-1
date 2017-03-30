$(document).ready(function () {

	let searchURLdefaut = `http://www.omdbapi.com/?s=mask&plot=full`;

	//Get the API adresse
	$.getJSON(searchURLdefaut).done(function (movies) {
		console.log(movies);


		let app = new Vue({ //Vue.js variable
			el: '#searchMovies',
			data: {
				movies,

			},
			methods: {
				research: function () {
					let key = $('#mot-clef').val();
					console.log(key);

					let searchURL = `http://www.omdbapi.com/?s=${key}&plot=full`;

					//Get the API adresse
					$.getJSON(searchURL).done(function (newsearch) {
						console.log(newsearch);
						app.data = newsearch;
					});
				}
			}
		});
	})



});