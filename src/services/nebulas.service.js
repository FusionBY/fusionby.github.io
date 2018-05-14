import createTileCard from '../Views/createItem';

const nebulasService = function (mediator) {
	const contract_address = 'n1i8P4uhhgmHQmagmFRsk9cRzfJSkfnv2cp';
	let user_account = null;

	const is_mainnet = true;
	let nebulas_chain_id;
	let nebulas_domain;
	const gas_price = 20000003;
	const gas_limit = 2000000;

	if (is_mainnet) {
		nebulas_chain_id = 1;
		nebulas_domain = 'https://mainnet.nebulas.io';
	} else {
		nebulas_chain_id = 1001;
		nebulas_domain = 'https://testnet.nebulas.io';
	}
	const nebulas = window.require('nebulas');
	const neb = new nebulas.Neb();
	neb.setRequest(new nebulas.HttpRequest(nebulas_domain));
	window.uiBlock.insert({
		selectWalletFile: ['.select-wallet-file', onUnlockFile],
	});

	function fetchLastCities () {
		neb.api
			.call({
				from: contract_address,
				to: contract_address,
				value: 0,
				nonce: 0,
				gasPrice: gas_price,
				gasLimit: gas_limit,
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
	fetchLastCities(); // call first last
	setInterval(fetchLastCities, 15000);

	function onClickPostMessage () {
		// Every transaction has a sequential ID, called 'Nonce'.  Required to sign a message (but not for reading information)
		neb.api.getAccountState(user_account.getAddressString()).then((resp) => {
			var nonce = parseInt(resp.nonce) + 1;

			neb.api
				.call({
					from: contract_address,
					to: contract_address,
					value: 0,
					nonce: nonce,
					gasPrice: gas_price,
					gasLimit: gas_limit,
					contract: { function: 'postCity', args: JSON.stringify([$('#cityInput').val()]) },
				})
				.then((res) => {
					var result = JSON.parse(res.result);
					alert(result.message);
					if (result.result !== 200) {
						return;
					} else {
						var gTx = new nebulas.Transaction(
							nebulas_chain_id,
							user_account,
							contract_address,
							0,
							nonce,
							gas_price,
							gas_limit,
							{ function: 'postCity', args: JSON.stringify([$('#cityInput').val()]) }
						);

						gTx.signTransaction();
						neb.api.sendRawTransaction(gTx.toProtoString()).then((res) => {
							function checkHash () {
								neb.api
									.getTransactionReceipt(res.txhash)
									.then((res) => {
										if (res.status === 1) {
											fetchLastCities();
											clearInterval(refreshStatus);
										}
									})
									.catch(() => clearInterval(refreshStatus));
							}
							var refreshStatus = setInterval(checkHash, 5000);
						});
					}
				});
		});
	}

	document.getElementById('pushCityButton').addEventListener('click', () => {
		onClickPostMessage();
	});

	function onUnlockFile (swf, fileJson, account, password) {
		account.fromKey(fileJson, password);
		user_account = account;

		$('#user-token').text(`Hello, ${fileJson.address}`);
		$('#input-segment').addClass('hide');
		$('#add-button').removeAttr('data-tooltip');
		mediator.pub('onAuth');
	}
};

export default nebulasService;
