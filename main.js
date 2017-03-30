$(document).ready(function () {

	let app = new Vue({ //Vue.js variable
		el: '#searchMovies',
		data: {
			movies: {
				"Title": "",
				"Year": "",
				"imdbID": "",
				"Type": "",
				"Poster": ""
			}

		},

		methods: {
			research: function () {
				let key = $('#mot-clef').val();
				console.log(key);

				let searchURL = `http://www.omdbapi.com/?s=${key}&plot=full`;

				//Get the API adresse
				$.getJSON(searchURL).done(function (newsearch) {
					console.log(newsearch);
					this.data = newsearch;
					app.movies = newsearch;

				});
			}
		}
	});

});