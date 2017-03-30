$(document).ready(function () {

	let urlHistory = "http://localhost:3000/research";


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
			key: '',
			year: '',
			historyData: {
				'key': '',
				'address': ''
			},
			movieDetails: {
				"Title": '',
			},

		},

		methods: {
			research: function () {

				app.key = app.key.split(" ").join("+");
				console.log(app.key);

				let searchURL = "";
				if (app.year !== "") {
					searchURL = `http://www.omdbapi.com/?s=${app.key}&y=${app.year}&plot=full`;
					if (app.typeSearch === 'all') {
						searchURL = `http://www.omdbapi.com/?s=${app.key}&y=${app.year}&plot=full`;
					} else {
						searchURL = `http://www.omdbapi.com/?s=${app.key}&y=${app.year}&type=${app.typeSearch}&plot=full`;
					}
				} else {
					searchURL = `http://www.omdbapi.com/?s=${app.key}&plot=full`;
				};


				//Get the API adresse
				$.getJSON(searchURL).done(function (newsearch) {
					console.log(newsearch);
					app.movies = newsearch;
				});

				$.post(urlHistory, { key: app.key, address: searchURL }).done(function () { });
				$.getJSON(urlHistory).done(function (obj) {
					app.historyData = obj;
					console.log(app.historyData);
				});
			},//closes research function

			historySearch: function (address) {
				$.getJSON(address).done(function (searchhistory) {
					app.movies = searchhistory;
				});
			},//closes historySearch

			moviedetails: function (addressMovie) {
				let urladdressMovie = `http://www.omdbapi.com/?i=${addressMovie}`;

				$.getJSON(urladdressMovie).done(function (searchMovie) {
					app.movieDetails = searchMovie;
				});
			}
		} // closes methods
	});


	$.getJSON(urlHistory).done(function (obj) {
		app.historyData = obj;
		console.log(app.historyData);
	});



});