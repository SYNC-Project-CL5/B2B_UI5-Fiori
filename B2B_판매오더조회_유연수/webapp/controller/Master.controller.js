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

        return Controller.extend("sync.ea.b2csalesorder.controller.Master", {
            onInit: function () {
                this.oView = this.getView();
			    this._bDescendingSort = false;
			    this.oBookTable = this.oView.byId("idBookTable");
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onSearch: function ( oEvent ) {
                var aFilter = [],
				sQuery = oEvent.getParameter("query");

                // var aFilter = [];
                // var sQuery = ~~~;
			    if (sQuery && sQuery.length > 0) {
                    // Carrname 항공사명으로 검색가능하게끔 만든다.
				    var oFilter = new sap.ui.model.Filter("Custname", sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilter.push(oFilter);
                }

			    this.oBookTable.getBinding("items").filter(aFilter, "Application");
            },

            onSort: function ( oEvent ) {
                // sort 정보를 역으로 바꾸기 위해 ! 를 사용한다.
                // 내림차순인 경우 오름차순으로 바꾸고 
                // 오름차순인 경우 내림차순으로 바꾸기 위해 true <=> false 로 전환한다.
                this._bDescendingSort = !this._bDescendingSort;
                var oBinding = this.oBookTable.getBinding("items"),
                    oSorter = new Sorter("Custname", this._bDescendingSort);
    
                oBinding.sort(oSorter);
            },
            
            onListItemPress: function (oEvent) {
                let oItem = oEvent.getSource();
                let oContext = oItem.getBindingContext();
                let vBookid = oContext.getProperty("Bookid");
    
                this.oRouter.navTo("detail", {
                    layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                    bookid: vBookid
                });
            }

            // onListItemPress: function (oEvent) {

                // 선택된 항목의 바인딩 컨텍스트를 가져옵니다.
                // let oItem = oEvent.getSource();
                // let oContext = oItem.getBindingContext();
                // let vBookid = oContext.getProperty("Bookid");

                // 현재 뷰 인스턴스를 가져옵니다.
                // let oView = this.getView();

                // 현재 모델 경로를 가져옵니다.
                // let currentModelPath = oContext.getPath();

            

                // 뷰를 현재 모델 경로에 바인딩합니다.
                // oView.bindElement(currentModelPath);
                // 항공사를 선택했을 때 실행되는 메소드
                // var oContext = oEvent.getSource().getBindingContext(),
				//     vBookid = oContext.getProperty("Bookid");

                // console.log(currentModelPath);

			    // this.oRouter.navTo("detail", 
                //     {
                //         layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                //         bookid: vBookid
                //     }
                // );

                // var oFCL = this.oView.getParent().getParent();
                // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
            // },
        //     onselectionchange: function (oEvent) {
		// 	let oItem = oEvent.getParameter("listItem");
		// 	let oContext = oItem.getBindingContext();

		// 	let Bookid = oContext.getProperty("Bookid");

		// 	let oView = this.getView();
        //     let oDialog = oView.byId("idBookTable");

		// 	let currentModelPath = oContext.getPath(); // 모델의 경로를 가져온다.
        //         oView.bindElement(currentModelPath);
		// }
        });
    });
