sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/f/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
        "use strict";

        return Controller.extend("sync.ea.plan.controller.Master", {
            onInit: function () {
                this.oView = this.getView();
			    this._bDescendingSort = false;
			    this.oPlanTable = this.oView.byId("idPlanTable");
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onSearch: function ( oEvent ) {
                var aFilter = [],
				sQuery = oEvent.getParameter("query");

                // var aFilter = []; 
                // var sQuery = ~~~;
			    if (sQuery && sQuery.length > 0) {
                    // Pdpdat 항공사명으로 검색가능하게끔 만든다.
				    var oFilter = new sap.ui.model.Filter("Pdpdat", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilter.push(oFilter);
                }

			    this.oPlanTable.getBinding("items").filter(aFilter, "Application");
            },

            onSort: function ( oEvent ) {
                // sort 정보를 역으로 바꾸기 위해 ! 를 사용한다.
                // 내림차순인 경우 오름차순으로 바꾸고 
                // 오름차순인 경우 내림차순으로 바꾸기 위해 true <=> false 로 전환한다.
                this._bDescendingSort = !this._bDescendingSort;
                var oBinding = this.oPlanTable.getBinding("items"),
                    oSorter = new sap.ui.model.Sorter("Planid", this._bDescendingSort);
    
                oBinding.sort(oSorter);
            },

            onListItemPress: function (oEvent) {
                // 항공사를 선택했을 때 실행되는 메소드
                var oContext = oEvent.getSource().getBindingContext(),
				    vPlanid = oContext.getProperty("Planid");

			    this.oRouter.navTo("detail", 
                    {
                        layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                        planid: vPlanid
                    }
                );

                // var oFCL = this.oView.getParent().getParent();
                // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
            }

        });
    });
