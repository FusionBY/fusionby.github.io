class ModalController {
	constructor (model, view, mediator, stateObserver) {
		this.model = model;
		this.view = view;
		this.mediator = mediator;
		this.stateObserver = stateObserver;

		this.addTileCard = $('#add-tileCard');
		this.addButton = $('#add-button');
		this.closeButton = $('#close-modal-button');
		this.formTitle = $('#form-title');
		this.modalForm = $('#main-modalForm');

		this.formTitle.on('click', this.toggleInputField);
		this.formTitle.keypress(this.toggleInputField);
		this.addButton.on('click', this.toggleForm);
		this.closeButton.on('click', this.toggleForm);
		this.addTileCard.on('click', this.handleAddTileCard);

		this.bindings = [
			{
				element: $('#main-modalForm [data-atr="title"]'),
				name: 'title',
			},
			{
				element: $('#main-modalForm [data-atr="input"]'),
				name: 'input',
			},
		];

		this.stateObserver.subscribe((newState) => this.updateDOM(newState, this.bindings));

		this.previousState;

		this.init();
	}

	get state () {
		return this.model.state;
	}

	init () {
		console.log('init');
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
		const { modalForm } = this;
		this.view.toggleForm(e, modalForm );
	}

	toggleInputField = (e) => {
		const input = this.bindings.find((elem) => elem.name === 'input');
		this.view.toggleInputField(e, (newState) => this.setState(newState), { input: input });
	}

	handleAddTileCard = (e) => {
		this.toggleForm(e);
		this.view.handleAddTileCard(e, this.state.title);
	}
}

export default ModalController;
