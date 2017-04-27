import {
    createMap,
    setObject,
    getKey,
    getElementFromField,
    renderFieldMessage,
    clearFieldMessage
} from './helpers.js';

const validation = {

    init() {

        this.elementsMap = createMap(this.form, this.options);
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
            this.updateMap(field).validate(field);

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
        setObject(field, this.options).then( values => {
            this.elementsMap.set(field, values);
    });
        return this;
    },

    setFormValidation(){
        this.isFormValid
            ? this.form.classList.remove(this.options.errorClass)
            : this.form.classList.add(this.options.errorClass);
        return this;
    },

    setFieldValidation(field){
        const fieldData = this.elementsMap.get(field);
        const target = getElementFromField(field);
        if (fieldData.valid) {
            target.classList.remove(this.options.errorClass);
            clearFieldMessage(fieldData);
        } else {
            target.classList.add(this.options.errorClass);
            renderFieldMessage(fieldData);
        }
        return this;
    }

};

export { validation };