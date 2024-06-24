sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/MessageToast",
    "sap/m/Bar",
    "sap/m/Label",
    "sap/ui/core/Icon"
], function (Controller, Dialog, Button, Text, MessageToast, Bar, Label, Icon) {
    "use strict";

    return Controller.extend("sync.ea.login.controller.Login", {
        onInit: function () {
            // 초기화 코드
        },

        onSearch: function () {
            var oView = this.getView();
            var sEmpcode = oView.byId("EmpnumInput").getValue(); // 사번 입력란에서 값을 가져옴
            var sPassword = oView.byId("passwordInput").getValue(); // 비밀번호 입력란에서 값을 가져옴

            // 하드코딩된 비밀번호
            var sHardcodedPassword = "0000";

            if (!sEmpcode || !sPassword) {
                this._showDialog("사번과 비밀번호를 모두 입력해 주세요.");
                return;
            }

            if (sPassword !== sHardcodedPassword) {
                this._showDialog("비밀번호가 잘못되었습니다.");
                return;
            }

            var oModel = this.getView().getModel();
            var sPath = "/EmpinfoSet";

            // 네트워크 요청 전에 로딩 메시지 표시
            MessageToast.show("로그인 중...");

            oModel.read(sPath, {
                success: function (oData) {
                    console.log("응답 데이터:", oData);
                    if (oData && oData.results) {
                        var bFound = oData.results.some(function (oEmployee) {
                            console.log("사원 데이터:", oEmployee);
                            return oEmployee.Empcode === sEmpcode; // 사번 필드명을 EMPCODE로 확인
                        });

                        if (bFound) {
                            this._showDialog("로그인에 성공했습니다.", "loginSuccessButton"); // 성공 시 URL 전달
                            // 로그인 성공 후의 동작을 여기에 추가합니다.
                        } else {
                            this._showDialog("사번이 잘못되었습니다.");
                        }
                    } else {
                        this._showDialog("데이터를 가져오는 데 실패했습니다. 서버 응답을 확인하세요.");
                    }
                }.bind(this),
                error: function (oError) {
                    var sErrorMessage = "로그인 중 오류가 발생했습니다.";
                    if (oError && oError.message) {
                        sErrorMessage += " " + oError.message;
                    }
                    this._showDialog(sErrorMessage);

                    // 추가로 오류 객체를 콘솔에 출력하여 상세한 오류 메시지를 확인합니다.
                    console.error(oError);
                }.bind(this)
            });
        },

        _showDialog: function (sMessage, sButtonId) {
            var oDialog = new Dialog({
                customHeader: new Bar({
                    contentMiddle: [
                        new Icon({
                            src: "sap-icon://message-information",
                            size: "1.5rem",
                            class: "sapUiTinyMarginEnd"
                        }),
                        new Label({
                            text: "알림",
                            design: "Bold"
                        })
                    ]
                }),
                type: "Message",
                state: "None",
                content: new Text({ text: sMessage }),
                beginButton: new Button({
                    id: sButtonId,
                    text: "확인",
                    press: function () {
                        oDialog.close();
                        if (sButtonId === "loginSuccessButton") {
                            window.location.href = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-client=100&sap-language=KO#synceacompany2-display"; // URL로 리다이렉션
                        }
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });

            oDialog.open();
        }
    });
});
