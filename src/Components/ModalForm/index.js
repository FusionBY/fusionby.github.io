import Model from './modal.model';
import View from './modal.view';
import Controller from './modal.controller';
import Observer from '../../helpers/Observer';

const stateObserver = new Observer();
class ModalComponent {
	constructor (mediator) {
		this.mediator = mediator;
		this.init();
	}

	init () {
		const model = new Model();
		const view = new View(this.mediator);
		new Controller(model, view, this.mediator, stateObserver);
	}
}

export default ModalComponent;
