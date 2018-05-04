import Model from './modal.model';
import View from './modal.view';
import Controller from './modal.controller';

class ModalComponent {
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

export default ModalComponent;
