/*global QUnit*/

sap.ui.define([
	"syncea/stg/controller/stg.controller"
], function (Controller) {
	"use strict";

	QUnit.module("stg Controller");

	QUnit.test("I should test the stg controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
