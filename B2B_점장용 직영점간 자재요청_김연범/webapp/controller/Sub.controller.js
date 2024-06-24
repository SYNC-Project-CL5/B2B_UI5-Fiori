sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("transporting.tfr.controller.Sub", {

        onSearch: function() {
            var oPasswordInput = this.getView().byId("passwordInput");
            var sPassword = oPasswordInput.getValue();

            if (!sPassword) {
                MessageBox.error("비밀번호를 입력해주세요.");
                return;
            }

            if (sPassword !== "0000") {
                MessageBox.error("비밀번호가 틀립니다.");
                return;
            }

            var oRadioGroup = this.getView().byId("plantRadioGroup");
            // var selectedPlant = oRadioGroup.getSelectedButton().getId();
            var iSelectedIndex = oRadioGroup.getSelectedIndex();

            if (iSelectedIndex === -1) {
                MessageBox.error("직영점을 선택해주세요.");
                return;
            }

            var aButtons = oRadioGroup.getButtons();
            var oSelectedButton = aButtons[iSelectedIndex];
            var sSelectedPlantId = oSelectedButton.getId();
            var sPlantIdText = sSelectedPlantId.split("--").pop();
            

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMain", {
                plant: sPlantIdText
            });
    
            debugger;
        },

        onNavBack: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteSub");
        }
    });
});
