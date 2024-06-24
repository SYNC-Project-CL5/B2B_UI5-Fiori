sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
], function (Controller, MessageBox) {
  "use strict";

  return Controller.extend("sync.e17.inventory4.controller.Sub", {
  
      onSearch: function() {
          var oPasswordInput = this.getView().byId("passwordInput");
          var sPassword = oPasswordInput.getValue();

          // 비밀번호 입력 여부 확인
            if (!sPassword) {
              MessageBox.error("비밀번호를 입력해주세요.");
              return;
          }
  

          
          // 비밀번호 확인
          if (sPassword !== "0000") {
              MessageBox.error("비밀번호가 틀립니다.");
              return;
          }

          var oRadioGroup = this.getView().byId("plantRadioGroup");
          var selectedPlant = oRadioGroup.getSelectedButton().getId();
          
          var oComponent = this.getOwnerComponent();
          var oRouter = oComponent.getRouter();
          oRouter.navTo("RouteMain", {
              plant: selectedPlant
          }); // RouteMain으로 라우팅하여 Main View로 이동
      }
  });
});
