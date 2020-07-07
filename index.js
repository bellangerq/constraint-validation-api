const submitButton = document.querySelector('[type="submit"]')
const inputs = document.querySelectorAll('[type="text"]')

// Define error messages
const fieldErrors = {
	empty: 'The following field is required.',
	cardNumber: 'You should provide a number of 16 digits.',
	expiryDate:
		"The month's 2 digit number directly followed by year's 2 last digits.",
	securityCode: 'The 3 digits number at the back of your card.'
}

/**
 * Assigns an error message to the field based on its validity state.
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 */
function validateInput(field) {
	const errorMessage = document.querySelector(`#${field.name}Error`)

	// Reset field state
	field.setCustomValidity('')
	errorMessage.innerHTML = ''
	field.removeAttribute('aria-describedby')

	// Handle empty field
	if (!field.value) {
		field.setCustomValidity(fieldErrors.empty)
		errorMessage.innerHTML = field.validationMessage
		field.setAttribute('aria-describedby', `${field.name}Error`)
		return
	}

	// Handle wrong format field
	if (!field.checkValidity()) {
		field.setCustomValidity(fieldErrors[field.name])
		errorMessage.innerHTML = field.validationMessage
		field.setAttribute('aria-describedby', `${field.name}Error`)
		return
	}
}

/**
 * Triggers validation on each input's "change" and "input" events.
 */
inputs.forEach(input => {
	input.addEventListener('change', () => validateInput(input))
	input.addEventListener('input', () => validateInput(input))
})

/**
 * Triggers validation on every input on submit button "click" event.
 */
submitButton.addEventListener('click', () => {
	inputs.forEach(input => validateInput(input))
})
