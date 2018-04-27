class Controller {
	constructor (model, view) {
		this.model = model;
		this.view = view;

		view.on('add', this.addItem);
	}

	addItem = (title) => {
		const item = this.model.addItem({
			id: Date.now(),
			title,
		});

		this.view.addItem(item);
	}
}

export default Controller;
