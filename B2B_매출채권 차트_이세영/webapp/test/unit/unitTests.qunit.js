/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce17/sync.e17/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
