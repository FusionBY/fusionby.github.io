import createTileCard from '../Views/createItem';

const nebulasService = function (mediator) {

	if (window.webExtensionWallet === 'for nebulas') {
		$('#user-token').text('WebExtensionWallet was found.');
		$('#input-segment').addClass('hide');
		$('#not-extension-message').addClass('hide');
		$('#add-button').removeAttr('data-tooltip');
		mediator.pub('onAuth');
	}

	const contract_address = 'n1uBwGx1YHuy9acDwVcxd2Evu6hm2LNaGmA'; // to
	const nebulas_domain = 'https://mainnet.nebulas.io';

	const NebPay = window.require('nebpay');
	const nebPay = new NebPay;
	const nebulas = window.require('nebulas');
	const neb = new nebulas.Neb();
	neb.setRequest(new nebulas.HttpRequest(nebulas_domain));

	function fetchLastCities () {
		neb.api
			.call({
				from: contract_address,
				to: contract_address,
				value: 0,
				nonce: 0,
				gasPrice: 10,
				gasLimit: 10,
				contract: { function: 'getLastCities' },
			})
			.then((resp) => {
				var cities = JSON.parse(resp.result);
				mediator.pub('lastCities', cities);
				$('#LAST_CITY').empty();
				$('#LAST_CITY').append('<div class="ui centered cards"></div>');
				var lastCity = cities && cities[0] && cities[0].city;
				var userId = cities && cities[0] && cities[0].user;
				var create = cities && cities[0] && cities[0].timeStamp;
				if (lastCity) {
					$('#LAST_CITY .cards').append(createTileCard({ create, userId, title: lastCity }));
				}
			});
	}
	fetchLastCities();
	setInterval(() => {
		fetchLastCities();
	}, 10000);

	function onClickPostMessage () {

		const serialNumber = nebPay.call(contract_address, 0, 'postCity', JSON.stringify([$('#cityInput').val()]), (cb) => console.log(cb));

		function funcIntervalQuery () {
			nebPay
				.queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
				.then((resp) => {
					var respObject = JSON.parse(resp);
					if (respObject.code === 0) {
						//The transaction is successful
						alert('The transaction is successful');
						clearInterval(intervalQuery); //stop the periodically query
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}

		const intervalQuery = setInterval(() => {
			funcIntervalQuery();
		}, 10000);
	}

	document.getElementById('pushCityButton').addEventListener('click', () => {
		onClickPostMessage();
	});
};

export default nebulasService;
