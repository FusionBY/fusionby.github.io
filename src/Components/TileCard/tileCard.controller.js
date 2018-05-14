import getItemModel from './tileCardModelBuilder';

export default class TileCardController {
	constructor (model, view, mediator) {
		this.model = model;
		this.view = view;
		this.mediator = mediator;

		mediator.sub('lastCities', this.renderLastCities);
	}

	addItem = (element) => {
		const id = Date.now();
		const item = this.model.addItem(new getItemModel(id, element.clientTimestamp, element.city, element.user));
		this.view.addItem(item);
	};

	renderLastCities = (cities) => {
		this.view.emptyCardsList();
		cities.reverse().forEach((element) => {
			this.addItem(element);
		});
	};
}
