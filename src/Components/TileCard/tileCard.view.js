import createItem from '../../Views/createItem';

export default class TileCardView {
	constructor () {
		this.cardsList = $('#cardsList');
	}

	addItem (item) {
		const elementDOM = createItem(item);
		this.cardsList.append(elementDOM);
	}

	emptyCardsList () {
		this.cardsList.empty();
	}
}
