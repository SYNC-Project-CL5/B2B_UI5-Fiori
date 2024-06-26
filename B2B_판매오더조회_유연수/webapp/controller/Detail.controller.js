sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], 


function (Controller,
	UIComponent) {
	"use strict";

	return Controller.extend("sync.ea.b2csalesorder.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			// var oRouter = UIComponent.getRouterFor(this);
			// oRouter.getRoute("detail").attachPatternMatched(this._onBookMatched, this);

			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("master").attachPatternMatched(this._onBookMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onBookMatched, this);
		},
	
		_onBookMatched: function (oEvent) {
			this._bookid = oEvent.getParameter("arguments").bookid || this._bookid || "";
			this.getView().bindElement("/OnlineBookSet('" + this._bookid + "')");			
			
			// var sPath = decodeURIComponent(oEvent.getParameter("arguments").path);
			// this.getView().bindElement(sPath);
            
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onBookMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onBookMatched, this);
		},

		onselectionchange: function (oEvent) {
            let oItem = oEvent.getParameter("listItem");
            let oContext = oItem.getBindingContext();
            let Bookid = oContext.getProperty("Bookid");

            let oView = this.getView();
            let currentModelPath = oContext.getPath(); 
            oView.bindElement(currentModelPath);
		}
	});
});