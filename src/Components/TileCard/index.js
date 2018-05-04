import Model from './tileCard.model';
import View from './tileCard.view';
import Controller from './tileCard.controller';

class TileCardComponent {
	constructor (mediator) {
		this.mediator = mediator;
		this.init();
	}

	init () {
		const model = new Model();
		const view = new View(this.mediator);
		const controller = new Controller(model, view, this.mediator);
	}
}

export default TileCardComponent;
