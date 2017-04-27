
export const errorMessages = elem => ({
    "badInput": `browser is unable to convert`,
    "customError": elem.dataset.errorMessage || `This field is incorrect.`,
    "patternMismatch": `value does not match the specified pattern`,
    "rangeOverflow": `value is greater than the maximum specified by the max attribute`,
    "rangeUnderflow": `value is less than the minimum specified by the min attribute`,
    "stepMismatch": `value does not fit the rules determined by the step attribute`,
    "tooLong": `value exceeds the specified maxlength`,
    "typeMismatch": `value is not in the required syntax (when type is email or url)`,
    "valueMissing": `element has a required attribute, but no value`,

    "sizeMessage": `The upload ${elem.dataset.uploadSize || ''} is too large. Please make sure the upload is less than ${elem.dataset.maxSize}KB.`,
    "typeMessage": `The upload contains at least one file of the wrong type. The upload may only contain the following types: ${elem.dataset.allowedExtensions}`

});
