import './scss/index.scss';
import '../semantic/semantic.min.css';
import '../semantic/semantic.min.js';

import PubSub from './helpers/PubSub';

import ModalComponent from './Components/ModalForm';
import TileCardComponent from './Components/TileCard';

class App {
	constructor () {
		this.init();
	}

	init () {
		const mediator = new PubSub();
		const tileCardComponent = new TileCardComponent(mediator);
		const modalComponenr = new ModalComponent(mediator);
	}
}

const app = new App();
