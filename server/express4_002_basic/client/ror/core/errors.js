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

	// for convenience (to spare a require)
	Errors.EE = EE;

	Errors.ActionError = EE.create_custom_error('ActionError', EE.RuntimeError);
	Errors.UnknownAction = EE.create_custom_error('UnknownAction', Errors.ActionError);
	Errors.NotEnoughResources = EE.create_custom_error('NotEnoughResources', Errors.ActionError);
	Errors.NotEnoughResourcesToAssemble = EE.create_custom_error('NotEnoughResourcesToAssemble', Errors.NotEnoughResources);

	return Errors;
});
