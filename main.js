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
				if (app.year.length < 3) {
					searchURL = `http://www.omdbapi.com/?s=${app.key}&plot=full`;
					console.log(app.typeSearch);

					if (app.typeSearch === 'all') {
						console.log(app.typeSearch);
						searchURL = `http://www.omdbapi.com/?s=${app.key}&plot=full`;

					} else {
						console.log(app.typeSearch);
						searchURL = `http://www.omdbapi.com/?s=${app.key}&type=${app.typeSearch}&plot=full`;
					}
				} else {
					console.log(app.typeSearch);
					if (app.typeSearch === 'all') {
						console.log(app.typeSearch);
						searchURL = `http://www.omdbapi.com/?s=${app.key}&y=${app.year}&plot=full`;

					} else {
						console.log(app.typeSearch);
						searchURL = `http://www.omdbapi.com/?s=${app.key}&y=${app.year}&type=${app.typeSearch}&plot=full`;
					}
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
				let urladdressMovie = `http://www.omdbapi.com/?i=${addressMovie}&plot=full`;

				$.getJSON(urladdressMovie).done(function (searchMovie) {
					app.movieDetails = searchMovie;
				});
			},

			deleteHistory: function (historyItem) {
				//let position = app.historyData.indexOf(historyItem) + 1;
				//console.log(position);
				$.ajax({
					url: urlHistory + '/' + historyItem.id,
					type: 'DELETE'
				}).done(function (reponse) {
					$.getJSON(urlHistory).done(function (obj) {
						app.historyData = obj;
						console.log(app.historyData);
					});
				});
				//app.historyData.splice(position, 1);
			},
		} // closes methods
	});


	$.getJSON(urlHistory).done(function (obj) {
		app.historyData = obj;
		console.log(app.historyData);
	});



});