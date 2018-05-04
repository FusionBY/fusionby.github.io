class ModalView {
	constructor (mediator) {
		this.mediator = mediator;
	}

	toggleForm = (e, modalForm) => {
		e.preventDefault();
		modalForm.modal('toggle');
	};

	handleAddTileCard = (e) => {
		e.preventDefault();
		this.mediator.pub('add', 'Name-property');
	};

	toggleInputField = (e) => {
		const { title } = e.target.dataset;
		const { confirm } = e.target.dataset;

		if (title) {
			e.currentTarget.classList.add('active');
		} else if (confirm) {
			e.currentTarget.classList.remove('active');
		}
	}
}

export default ModalView;
