class Model  {
	constructor (items = []) {
		this.items = items;
	}

	addItem (item) {
		this.items.push(item);
		return item;
	}
}

export default Model;
