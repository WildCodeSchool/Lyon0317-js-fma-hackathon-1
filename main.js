$(document).ready(function () {

	let app = new Vue({ //Vue.js variable
		el: '#searchMovies',
		data: {
			movies: {
				"Title": '',
				"Year": '',
				"imdbID": '',
				"Type": '',
				"Poster": ''
			},
			typeSearch: 'all',


		},

		methods: {
			research: function () {
				let key = $('#mot-clef').val();
				let year = $('#annee').val();

				key = key.split(" ").join("+");
				console.log(key);

				let searchURL = "";
				if (year !== "") {
					searchURL = `http://www.omdbapi.com/?s=${key}&y=${year}&plot=full`;
					if (app.typeSearch === 'all') {
						searchURL = `http://www.omdbapi.com/?s=${key}&y=${year}&plot=full`;
					} else {
						searchURL = `http://www.omdbapi.com/?s=${key}&y=${year}&type=${app.typeSearch}&plot=full`;
					}
				} else {
					searchURL = `http://www.omdbapi.com/?s=${key}&plot=full`;
				};


				//Get the API adresse
				$.getJSON(searchURL).done(function (newsearch) {
					console.log(newsearch);
					app.movies = newsearch;

				});
			}
		}
	});

});