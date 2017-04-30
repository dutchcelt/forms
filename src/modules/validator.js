import createMap from './helpers/createMap.js';
import setObject from './helpers/setObject.js';
import getKey from './helpers/getKey.js';
import getElementFromField from './helpers/getElementFromField.js';
import renderFieldMessage from './helpers/renderFieldMessage.js';
import clearFieldMessage from './helpers/clearFieldMessage.js';
import config from './config.js';

export default {

	init() {
		this.elementsMap = createMap(this.form);
		this.isFormValid = true;
		this.form.addEventListener('input', this);
		this.form.addEventListener('blur', this);
		this.form.addEventListener('change', this);
		this.form.addEventListener('submit', this);
	},

	handleEvent(event) {
		this.isFormValid = this.form.checkValidity();
		if (event.type === 'submit' && !this.isFormValid) {
			event.preventDefault();
			this.validateForm();
		} else if ((/change|blur|input/i).test(event.type)) {
			const field = this.form[getKey(event.target)];
			this.validate(field);

		}
	},

	validateForm() {
		this
			.setFormValidation()
			.elementsMap
			.forEach((data, field) => this.validate(field));
	},

	validate(field) {
		this
			.setFieldValidation(field)
			.setFormValidation();
	},


	updateMap(field) {
		this.elementsMap.set(field, setObject(field));
		return this.elementsMap.get(field);
	},

	setFormValidation(){
		this.isFormValid
			? this.form.classList.remove(config.errorClass)
			: this.form.classList.add(config.errorClass);
		return this;
	},

	setFieldValidation(field){
		const fieldData = this.updateMap(field);
		const target = getElementFromField(field);
		if (fieldData.valid) {
			target.classList.remove(config.errorClass);
			clearFieldMessage(fieldData);
		} else {
			target.classList.add(config.errorClass);
			renderFieldMessage(fieldData);
		}
		return this;
	}

};