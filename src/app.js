import './scss/index.scss';
import '../semantic/semantic.min.css';
import '../semantic/semantic.min.js';

import PubSub from './helpers/PubSub';

import ModalComponent from './Components/ModalForm';
import TileCardComponent from './Components/TileCard';
import NebulasService from './services/nebulas.service';

class App {
	constructor () {
		this.mediator = new PubSub();
		this.init();

		const rulesMessage = $('#rules-message');
		$('.message .close.icon').on('click', () => rulesMessage.addClass('hidden'));
	}

	init () {
		new TileCardComponent(this.mediator);
		new ModalComponent(this.mediator);
		NebulasService(this.mediator);
	}
}

new App();
