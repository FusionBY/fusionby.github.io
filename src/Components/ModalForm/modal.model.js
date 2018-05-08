export default class ModalModel {
	constructor () {
		this.initialState = {
			title: 'Новый шаблон документа',
			titleActive: true,
		};
		this.state = { ...this.initialState };
	}

	setState = (newState) => {
		this.state = { ...this.state, ...newState };
		return this.state;
	}
}
