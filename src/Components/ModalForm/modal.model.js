export default class ModalModel {
	constructor () {
		this.state = {
			title: 'Новый шаблон документа',
		};
	}

	setState = (newState) => {
		this.state = { ...this.state, ...newState };
	}
}
