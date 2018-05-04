export default class PubSub {
	constructor () {
		this.events = {};
	}

	sub (type, callback) {
		this.events[type] = this.events[type] || [];
		this.events[type].push(callback);
	}

	pub (type, arg) {
		if (this.events[type]) {
			this.events[type].forEach((callback) => callback(arg));
		}
	}
}
