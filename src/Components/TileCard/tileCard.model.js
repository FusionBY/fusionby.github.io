export default class TileCardModel {
	constructor (items = []) {
		this.items = items;
	}

	addItem (item) {
		this.items.push(item);
		return item;
	}
}
