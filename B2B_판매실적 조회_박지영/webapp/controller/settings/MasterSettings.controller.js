sap.ui.define([
	'sync/ea/company2/controller/BaseController',
	'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel',
	'sync/ea/company2/model/formatter'
], function (BaseController, MessageToast, JSONModel, formatter) {
	"use strict";
	return BaseController.extend("sync.ea.company2.controller.settings.MasterSettings ", {
		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
					currentUser: "Administrator",
					lastLogin: new Date(Date.now() - 86400000)
				});

			this.setModel(oViewModel, "view");
		},

		onMasterPressed: function (oEvent) {
			var oContext = oEvent.getParameter("listItem").getBindingContext("side");
			var sPath = oContext.getPath() + "/selected";
			oContext.getModel().setProperty(sPath, true);
			var sSelectedMasterElement = oContext.getProperty("title");
			var sKey = oContext.getProperty("key");
			switch (sSelectedMasterElement) {
				case "아이소티 본사": {
					this.getRouter().navTo(sKey);
					break;
				}
				case "구로 직영점": {
                    this.getRouter().navTo(sKey);
                    break;
                }
				case "평택 직영점": {
                    this.getRouter().navTo(sKey);
                    break;
                }
				case "종로 직영점": {
                    this.getRouter().navTo(sKey);
                    break;
                }
				case "인천 직영점": {
                    this.getRouter().navTo(sKey);
                    break;
                }
				case "오산 직영점": {
                    this.getRouter().navTo(sKey);
                    break;
                }
				case "대구 직영점": {
                    this.getRouter().navTo(sKey);
                    break;
                }
				case "대전 직영점": {
                    this.getRouter().navTo(sKey);
                    break;
                }
				default: {
					MessageToast.show(sSelectedMasterElement + " was pressed");
					break;
				}
			}
		},

		onSavePressed: function () {
			MessageToast.show("Save was pressed");
		},

		onCancelPressed: function () {
			MessageToast.show("Cancel was pressed");
		},
		onNavButtonPress: function  () {
			this.getOwnerComponent().myNavBack();
		}
	});
});


// sap.ui.define([
// 	"sap/ui/core/mvc/Controller"
// ], function(
// 	Controller
// ) {
// 	"use strict";

// 	return Controller.extend("sync.ea.company2.controller.settings.MasterSettings", {
// 	});
// });