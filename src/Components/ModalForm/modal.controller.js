class ModalController {
	constructor (model, view, mediator) {
		this.model = model;
		this.view = view;
		this.mediator = mediator;

		this.addTileCard = $('#add-tileCard');
		this.addButton = $('#add-button');
		this.closeButton = $('#close-modal-button');
		this.formTitle = $('#form-title');
		this.modalForm = $('#main-modalForm');

		this.formTitle.on('click', this.view.toggleInputField);
		this.addButton.on('click', this.toggleForm);
		this.closeButton.on('click', this.toggleForm);
		this.addTileCard.on('click', this.handleAddTileCard);
	}

	getState () {
		return this.model.state;
	}

	toggleForm = (e) => {
		const { modalForm } = this;
		this.view.toggleForm(e, modalForm);
	}

	handleAddTileCard = (e) => {
		this.toggleForm(e);
		this.view.handleAddTileCard(e);
	}

}

export default ModalController;
