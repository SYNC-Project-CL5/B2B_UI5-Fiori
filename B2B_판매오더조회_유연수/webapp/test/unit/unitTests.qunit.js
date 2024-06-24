/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"syncea/b2csalesorder/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
