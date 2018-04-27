import './scss/index.scss';
import '../semantic/semantic.min.css';

import '../semantic/semantic.min.js';

import Model from './model/Model';
import View from './view/View';
import Controller from './controller/Controller';

// const model = new Model();
// const view = new View();
// const controller = new Controller(model, view);

(function () {
	const model = new Model();
	const view = new View(controller);
	const controller = new Controller(model, view);
})();
