class ModalController {
	constructor (model, view, mediator, stateObserver) {
		this.model = model;
		this.view = view;
		this.mediator = mediator;
		this.stateObserver = stateObserver;

		this.authenticated = false;
		mediator.sub('onAuth', () => this.authenticated = true);

		this.addButton = $('#add-button');
		this.pushCityButton = $('#pushCityButton');
		this.closeButton = $('#close-modal-button');
		this.modalForm = $('#main-modalForm');

		this.addButton.on('click', this.toggleForm);
		this.closeButton.on('click', this.toggleForm);
		this.pushCityButton.on('click', this.toggleForm);

		this.stateObserver.subscribe((newState) => this.updateDOM(newState, this.bindings));

		this.previousState;

	}

	get state () {
		return this.model.state;
	}

	setState = (newState) => {
		this.previousState = this.state;
		this.stateObserver.broadcast(this.model.setState(newState));
	}

	updateDOM (newState, bindings) {
		bindings.forEach(({ element, name }) => {
			if (this.previousState[name] !== newState[name]) {
				element.text(newState[name]);
			}
		});
	}

	toggleForm = (e) => {
		if (!this.authenticated) {
			return;
		}
		const { modalForm } = this;
		this.view.toggleForm(e, modalForm );
	}
}

export default ModalController;
