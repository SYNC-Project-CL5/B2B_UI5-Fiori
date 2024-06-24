sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/f/library"
], function (Controller, Filter, FilterOperator, Sorter, fioriLibrary) {
    "use strict";

    return Controller.extend("sync.ea.stg.controller.Stg", {
        onInit: function () {
            this.oView = this.getView();
            this._bDescendingSort = false;
            this.oPlantTable = this.oView.byId("idPlantTable");
            this.oRouter = this.getOwnerComponent().getRouter();
        },

        onSearch: function (oEvent) {
            var aFilter = [],
                sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter("Pname1", FilterOperator.Contains, sQuery);
                aFilter.push(oFilter);
            }

            this.oPlantTable.getBinding("items").filter(aFilter, "Application");
        },

        onSort: function () {
            this._bDescendingSort = !this._bDescendingSort;
            var oBinding = this.oPlantTable.getBinding("items"),
                oSorter = new Sorter("Pname1", this._bDescendingSort);

            oBinding.sort(oSorter);
        },

        onListItemPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext(),
                vWerks = oContext.getProperty("Werks");

            this.oRouter.navTo("RouteDetail", {
                layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                werks: vWerks
            });
        }
    });
});
