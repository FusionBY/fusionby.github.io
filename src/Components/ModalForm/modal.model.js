export default class ModalModel {
	constructor () {
		this.initialState = {};
		this.state = { ...this.initialState };
	}

	setState = (newState) => {
		this.state = { ...this.state, ...newState };
		return this.state;
	}
}
