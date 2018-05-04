import moment from 'moment';

import getItemModel from './tileCardModelBuilder';

export default class TileCardController {
	constructor (model, view, mediator) {
		this.model = model;
		this.view = view;
		this.mediator = mediator;

		mediator.sub('add', this.addItem);
	}

	addItem = (title) => {
		const id = Date.now();
		const created = moment().locale('ru').format('DD MMMM YYYY');

		const item = this.model.addItem(new getItemModel(id, created, title));

		this.view.addItem(item);
	}
}
