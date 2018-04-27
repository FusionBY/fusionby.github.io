import EventEmitter from '../helpers/EventEmitter';
import createItem from '../helpers/createItem';

class View extends EventEmitter {
	constructor () {
		super();
		this.cardsList = $('#cardsList');
		this.addButton = $('#add-button');

		this.addButton.on('click', this.handleAdd);
	}

	addItem (item) {
		const elementDOM = createItem(item);
		this.cardsList.append(elementDOM);
	}

	handleAdd = (e) => {
		e.preventDefault();
		this.emit('add', 'test');
	};
}

export default View;
