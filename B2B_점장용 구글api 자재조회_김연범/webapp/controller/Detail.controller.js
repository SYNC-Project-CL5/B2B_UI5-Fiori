sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sync.ea.stg.controller.Detail", {
		onInit: function () {
            
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("stg").attachPatternMatched(this._onWerksMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onWerksMatched, this);
		},

        _onWerksMatched: function (oEvent) {
            this._werks = oEvent.getParameter("arguments").werks || this._werks || "";			
            // this._carrid = AA
            // /CarrierSet(' + this._carrid + ') => /CarrierSet('AA')

            this.getView().bindElement("/PlantSet('" + this._werks + "')");
            // this._werks = oEvent.getParameter("arguments").werks || this._werks || "";

		},


		onExit: function () {
			this.oRouter.getRoute("stg").detachPatternMatched(this._onWerksMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onWerksMatched, this);
		}
	});
});