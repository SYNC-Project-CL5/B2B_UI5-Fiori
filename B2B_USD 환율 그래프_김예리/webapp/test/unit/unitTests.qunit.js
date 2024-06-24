/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sync08/zea_fi050/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
