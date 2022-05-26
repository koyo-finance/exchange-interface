// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

// @ts-expect-error Cypress said this is correct so /shrug
declare global {
	namespace Cypress {
		interface Chainable {}
	}
}
