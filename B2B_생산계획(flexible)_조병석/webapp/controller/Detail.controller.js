sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("master").attachPatternMatched(this._onPlanidMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onPlanidMatched, this);
		},

		_onPlanidMatched: function (oEvent) {
			this._planid = oEvent.getParameter("arguments").planid || this._planid || "";
			this.getView().bindElement("/ZEA_PPCDSV01('" + this._planid + "')");
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onPlanidMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onPlanidMatched, this);
		}
	});
});


// "sync.ea.plan.controller.Detail"



