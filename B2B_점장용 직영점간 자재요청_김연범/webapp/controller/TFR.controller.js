sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, MessageToast, Filter, FilterOperator, DateFormat
    ) {
        "use strict";

        var werksMapping2 = {
            "Guro"      :"10002",
            "Pyeongtaek":"10003",
            "Jongno"    :"10004", 
            "Incheon"   :"10005", 
            "Osan"      :"10006", 
            "Daegu"     :"10007", 
            "Daejeon"   :"10008", 
            "Bucheon"   :"10009", 
        };

        var werksMapping = {
            "구로직영점": "10002",
            "평택직영점": "10003",
            "종로직영점": "10004",
            "인천직영점": "10005",
            "오산직영점": "10006",
            "대구직영점": "10007",
            "대전직영점": "10008",
            "부천직영점": "10009"

        };
        var scodeMapping = {
            "구로직영점": "SL03",
            "평택직영점": "SL04",
            "종로직영점": "SL05",
            "인천직영점": "SL06",
            "오산직영점": "SL07",
            "대구직영점": "SL08",
            "대전직영점": "SL09",
            "부천직영점": "SL10"

        };
        var scodeMapping2 ={
        "Guro"      :"SL03",
        "Pyeongtaek":"SL04",
        "Jongno"    :"SL05", 
        "Incheon"   :"SL06", 
        "Osan"      :"SL07", 
        "Daegu"     :"SL08", 
        "Daejeon"   :"SL09", 
        "Bucheon"   :"SL10", 
        };

        return Controller.extend("transporting.tfr.controller.TFR", {
            initSave: function () {
                return new JSONModel({
                    Bookid: "",
                    Elcdt: "",
                    Werks: "",
                    Pname1: "",
                    Matnr: "",
                    Maktx: "",
                    Auqua: "",
                    Meins: "PKG"
                });
            },

            selectedData: null,


            onInit: function () {
                // this.oView = this.getView();
                // this._bDescendingSort = false;
                // this.oBookingTable = this.oView.byId("idBookingTable");
                var oShopData = {
                    "Shops": [
                        {"key": "Guro", "name": "구로직영점"},
                        {"key": "Pyeongtaek", "name": "평택직영점"},
                        {"key": "Jongno", "name": "종로직영점"},
                        {"key": "Incheon", "name": "인천직영점"},
                        {"key": "Osan", "name": "오산직영점"},
                        {"key": "Daegu", "name": "대구직영점"},
                        {"key": "Daejeon", "name": "대전직영점"},
                        {"key": "Bucheon", "name": "부천직영점"}
                    ]
                };

                var oShopModel = new JSONModel(oShopData);
                this.getView().setModel(oShopModel, "shopModel");



                let oComponent = this.getOwnerComponent();
                let oRouter = oComponent.getRouter();
                oRouter.getRoute("RouteMain").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                var oArgs = oEvent.getParameter("arguments");

                let aFilter = [
                    new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, oArgs.plant),
                    new Filter("Status", FilterOperator.EQ, 'X')
                ];

                let oTable = this.getView().byId("idBookingTable");
                let oBinding = oTable.getBinding("rows");
                oBinding.filter(aFilter);

            },

            onCreate: function () {
                let oView = this.getView();
                let oTable = oView.byId("idBookingTable");
                let iIndex = oTable.getSelectedIndex();

                if (iIndex < 0) {
                    sap.m.MessageToast.show("행을 선택해주세요");
                    return;
                }
                let oContext = oTable.getContextByIndex(iIndex);
                let path = oContext.getPath();
                
                let oModel = oView.getModel();
                let oSelectedData = oModel.getProperty(path);

                let oNewModel = oView.getModel("new");
                if (!oNewModel) {
                    oNewModel = new sap.ui.model.json.JSONModel();
                    oView.setModel(oNewModel, "new");
                }

                // 요청수량을 보낼곳에 같이 나타낼때
                oSelectedData.Auqua2 = oSelectedData.Auqua;

                oNewModel.setProperty("/Data", oSelectedData);

                if (!this.byId("idDialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "transporting.tfr.view.Dialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this.byId("idDialog").open();
                }

            },

            RowSelector: function (oEvent) {
                let oContext = oEvent.getParameter("rowContext");
                this.selectedData = oContext.getPath();
                let oView = this.getView();
                oView.bindElement(this.selectedData);


            },

            onClose: function () {
                this.byId("idDialog").close();
            },

            /** 미사용 */
            onTableItemPress: function (oEvent) {
                let oSelectedItem = oEvent.getParameter("listItem") || oEvent.getSource();
                let oBindingContext = oSelectedItem.getBindingContext();
                let oSelectedData = oBindingContext.getObject();

                let oNewModel = this.getView().getModel("new");
                oNewModel.setProperty("/Data", oSelectedData);

                this.onCreate();
            },

            onSelectCheckbox: function (oEvent) {
                var oTable = this.byId("idBookingTable");
                var oModel = this.getView().getModel();
                var sPath = oEvent.getSource().getBindingContext().getPath();

                var aRows = oTable.getBinding("rows").getContexts();
                aRows.forEach(function (oRow) {
                    var bSelected = (oRow.getPath() === sPath);
                    oModel.setProperty(oRow.getPath() + "/isSelected", bSelected);
                });
            },
            onSave: function (oEvent) {
                let oView = this.getView();
                let oNewModel = oView.getModel("new");
                let oModel = oView.getModel();

                let newData = oNewModel.getData();

                debugger;

                //  newData.Data.Elcdt = oDateFormat.format(newData.Data.Elcdt);
                //  newData.Data.Visitdat = oDateFormat.format(newData.Data.Visitdat);
                newData.Data.Werks2 = werksMapping2[newData.Data.Pname2] || "";
                newData.Data.Werks1 = werksMapping[newData.Data.Pname1] || "";
                newData.Data.Scode2 = scodeMapping2[newData.Data.Pname2] || "";
                newData.Data.Scode1 = scodeMapping[newData.Data.Pname1] || "";
                var createData = {
                    Bookid: newData.Data.Bookid,    // 예약번호로 sap 에서 다른 정보들 검색해서 사용
                    Elcdt: newData.Data.Elcdt,      // 요청일자 : yyyy-MM-dd 포맷으로 문자열 변환 후 전달
                    Plantfr: newData.Data.Werks2,   // 출발(보내주는 곳)
                    Plantto: newData.Data.Werks1,   // 도착(요청한 곳)
                    Lgortfr: newData.Data.Scode2,   // 출발(보내주는 곳)
                    Lgortto: newData.Data.Scode1,   // 도착(요청한 곳)
                    Matnr: newData.Data.Matnr,
                    Charg: newData.Data.Charg,
                    Menge: newData.Data.Auqua2,
                    Meins: "PKG"
                };

                oModel.create(
                    "/BookingInfoSet", createData,
                    {
                        success: function (oData, oResponse) {
                            // oData : 생성된 데이터 내용
                            // oResponse : 응답결과

                            sap.m.MessageToast.show(oData.Bookid + "건이 요청되었습니다.");

                        },
                        error: function (oError) {

                            sap.m.MessageBox.error("생성 중 오류가 발생되었습니다.");
                        }
                    }
                );

            }
        });
    });
