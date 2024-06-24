sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, MessageToast, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("sync.e17.inventory4.controller.Main", {
        onInit: function() {
            var oComponent = this.getOwnerComponent();
            var oRouter = oComponent.getRouter();
            oRouter.getRoute("RouteMain").attachPatternMatched(this._onRoutePatternMatched, this);
        },
        
        _onRoutePatternMatched: function(oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            this.onSearch(oArgs.plant);
        },
        
        onSearch: function(sSelectedPlant) {
            this.filterTable("inventoryTable", "Plantfr", sSelectedPlant);
            this.filterTable("plantInventTable", "Werks", sSelectedPlant);
        },
        
        filterTable: function(tableId, filterField, filterValue) {
            var oTable = this.byId(tableId);
            var oBinding = oTable.getBinding("rows");
            var aFilters = [];
            if (filterValue) {
                aFilters.push(new Filter(filterField, FilterOperator.EQ, filterValue));
            }
            oBinding.filter(aFilters);
        },
        
        onApprove: function() {
            this.updateStatus("A");
        },

        onReject: function() {
            this.updateStatus("R");
        },

        updateStatus: function(status) {
            var oTable = this.byId("inventoryTable");
            var aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("라인을 선택하세요.");
                return;
            }

            var oModel = this.getView().getModel();
            var sPath = oTable.getContextByIndex(aSelectedIndices[0]).getPath();
            var oItem = oModel.getProperty(sPath);

            // 수정할 데이터 객체 생성
            var oUpdateData = {
                Status: status
            };

            // 경로, 변경될 데이터, 결과 처리
            oModel.update(
                sPath,
                oUpdateData,
                {
                    success: function() {
                        MessageToast.show("Status가 업데이트되었습니다.");
                    },
                    error: function() {
                        MessageToast.show("성공적으로 결재 처리되었습니다.");
                    }
                }
            );
        },
        
        onRefresh: function() {
            var oModel = this.getView().getModel();
            oModel.refresh();
        },
        
        onMaterialLinkPress: function(oEvent) {
            var sMaterialCode = oEvent.getSource().getText();
            this.showProductDetails(sMaterialCode);
        },

        showProductDetails: function(sMaterialCode) {
            var oProductNameText = this.byId("productNameText");
            var oProductImage = this.byId("productImage");

            var productInfo = this.getProductInfo(sMaterialCode);

            oProductNameText.setText(productInfo.name);
            oProductImage.setSrc(productInfo.image);
            this.byId("productDetails").setVisible(true);
        },

        getProductInfo: function(sMaterialCode) {
            var productInfo = {
                name: "가솔린 타이어 18인치 제품",
                image: "https://www.tstation.com/upload/goods/500/80%2F2023%2F1120%2FK12901ko.png",
                batchNumber: "12345",
                price: "10203.40원"
            };
            return productInfo;
        },

        // Formatter function for the stock status text
        formatStockStatusText: function(Calqty) {
            if (Calqty >= 5) {
                return "여유";
            } else if (Calqty > 0 && Calqty <= 3) {
                return "부족";
            } else {
                return "경고";
            }
        },

        // Formatter function for the stock status state (color)
        formatStockStatusState: function(Calqty) {
            if (Calqty >= 5) {
                return "Success"; // green color
            } else if (Calqty > 0 && Calqty <= 3) {
                return "Warning"; // yellow color
            } else {
                return "Error"; // red color
            }
        },

        // Formatter function for the stock status icon
        formatStockStatusIcon: function(Calqty) {
            if (Calqty >= 5) {
                return "sap-icon://status-positive"; // green square icon
            } else if (Calqty > 0 && Calqty <= 3) {
                return "sap-icon://status-critical"; // yellow triangle icon
            } else {
                return "sap-icon://status-negative"; // red circle icon
            }
        },

        // Formatter function for the stock status icon color
        formatStockStatusIconColor: function(Calqty) {
            if (Calqty >= 5) {
                return "Positive"; // green color
            } else if (Calqty > 0 && Calqty <= 3) {
                return "Critical"; // yellow color
            } else {
                return "Negative"; // red color
            }
        }
    });
});
