/** Rise of the replicators errors/exceptions
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
	Errors.IllegalStateForAction = EE.create_custom_error('IllegalStateForAction', Errors.ActionError);
	Errors.NotEnoughResources = EE.create_custom_error('NotEnoughResources', Errors.ActionError);
	Errors.NotEnoughResourcesToAssemble = EE.create_custom_error('NotEnoughResourcesToAssemble', Errors.NotEnoughResources);

	Errors.ApiError = EE.create_custom_error('ApiError', EE.RuntimeError);

	// 400
	Errors.ApiClientError = EE.create_custom_error('ApiClientError', Errors.ApiError);
	Errors.RouteNotFound = EE.create_custom_error('RouteNotFound', Errors.ApiClientError);
	// 405
	Errors.MethodNotAllowed = EE.create_custom_error('MethodNotAllowed', Errors.ApiClientError);

	// 500
	Errors.ApiServerError = EE.create_custom_error('ApiServerError', Errors.ApiError);
	Errors.InternalError = EE.create_custom_error('InternalError', Errors.ApiServerError);


	return Errors;
});
