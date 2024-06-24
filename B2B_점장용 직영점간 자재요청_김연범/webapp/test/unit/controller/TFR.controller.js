/*global QUnit*/

sap.ui.define([
	"transporting/tfr/controller/TFR.controller"
], function (Controller) {
	"use strict";

	QUnit.module("TFR Controller");

	QUnit.test("I should test the TFR controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
