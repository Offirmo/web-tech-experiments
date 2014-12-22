/* Rise of the replicators errors/exceptions
 * nicely subtyped.
 */
define(
[
	'lodash',
	'extended-exceptions'
],
function(_, EE) {
	'use strict';

	var Errors = {};


	Errors.ActionError = EE.create_custom_error('ActionError', EE.RuntimeError);
	Errors.NotEnoughResources = EE.create_custom_error('NotEnoughResources', Errors.ActionError);
	Errors.NotEnoughResourcesToAssemble = EE.create_custom_error('NotEnoughResourcesToAssemble', Errors.NotEnoughResources);

	return Errors;
});
