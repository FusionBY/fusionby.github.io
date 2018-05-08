class ModalView {
	constructor (mediator) {
		this.mediator = mediator;
	}

	toggleForm = (e, modalForm) => {
		e.preventDefault();
		modalForm.modal('toggle');
	};

	handleAddTileCard = (e, value) => {
		e.preventDefault();
		this.mediator.pub('add', value);
	};

	toggleInputField = (e, setState, { input }) => {
		const editAvailable = e.target.dataset.atr === 'title' || e.target.dataset.atr === 'title-icon';
		let confirmAvailable = e.target.dataset.atr === 'confirm';

		if (e.which === 13) {
			confirmAvailable = true;
		}

		if (editAvailable) {
			return e.currentTarget.classList.add('active');
		} else if (confirmAvailable) {
			const value = input.element.val();
			setState({ title: value });
			e.currentTarget.classList.remove('active');
		}
	}
}

export default ModalView;
