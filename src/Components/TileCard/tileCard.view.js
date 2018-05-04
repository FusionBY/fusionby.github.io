import createItem from '../../Views/createItem';

export default class TileCardView {
	constructor () {
		this.cardsList = $('#cardsList');
		this.addButton = $('#add-tileCard');
	}

	addItem (item) {
		const elementDOM = createItem(item);
		this.cardsList.append(elementDOM);
	}
}
