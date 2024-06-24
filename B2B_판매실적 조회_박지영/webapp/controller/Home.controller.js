sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
	'../model/formatter'
], function (BaseController, JSONModel, Device, formatter) {
	"use strict";
	return BaseController.extend("sync.ea.company2.controller.Home", {
		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				isPhone: Device.system.phone
			});
			this.setModel(oViewModel, "view");
			Device.media.attachHandler(function (oDevice) {
				this.getModel("view").setProperty("/isPhone", oDevice.name === "Phone");
			}.bind(this));
		},
		onSalesPerfPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-ui-xx-noless&sap-theme=custom_tire@https://edu.bgis.co.kr:8443/sap/bc/theming/themes/~client-100&theme=custom_tire#synceasales2-display"; // 이동할 URL을 여기에 입력
            window.location.href = sUrl;
        },
		onSalesB2cPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp#synceab2csalesorder-display"; // 이동할 URL을 여기에 입력
            window.location.href = sUrl;
        },
		onSalesPricePress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp#synceaprice-display"; // 이동할 URL을 여기에 입력
            window.location.href = sUrl;
        },
		onProductsMoveAccessPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-ui-xx-noless&sap-theme=custom_tire@https://edu.bgis.co.kr:8443/sap/bc/theming/themes/~client-100&theme=custom_tire#synce17inventory4-display"; // 이동할 URL을 여기에 입력
            window.location.href = sUrl;
        },
		onProductsMoveRequestPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp#transportingtfr-display"; // 재고이전 요청 연결 (연범)
            window.location.href = sUrl;
        },
		onProductsAmountPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp#synceastock-display"; // 직영점별 재고조회 연결 (혜진)
            window.location.href = sUrl;
        },
		onIncomePress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-ui-xx-noless&sap-theme=custom_tire@https://edu.bgis.co.kr:8443/sap/bc/theming/themes/~client-100&theme=custom_tire#zeafi090-display"; 
            window.location.href = sUrl;
        },
		onExchangePress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-ui-xx-noless&sap-theme=custom_tire@https://edu.bgis.co.kr:8443/sap/bc/theming/themes/~client-100&theme=custom_tire#sync08zeafi050-display"; 
            window.location.href = sUrl;
        },
		onProducePlanPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-ui-xx-noless&sap-theme=custom_tire@https://edu.bgis.co.kr:8443/sap/bc/theming/themes/~client-100&theme=custom_tire#synceaplan-display";
            window.location.href = sUrl;
        },
		onProduceOrderPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-ui-xx-noless&sap-theme=custom_tire@https://edu.bgis.co.kr:8443/sap/bc/theming/themes/~client-100&theme=custom_tire#synceadispo-display"; 
            window.location.href = sUrl;
        },
		onProducePerfPress: function () {
            var sUrl = "https://edu.bgis.co.kr:8443/sap/bc/ui2/flp?sap-ui-xx-noless&sap-theme=custom_tire@https://edu.bgis.co.kr:8443/sap/bc/theming/themes/~client-100&theme=custom_tire#synceaafru-display"; 
            window.location.href = sUrl;
        },
		onKakaotalkPress: function () {
            var sUrl = "http://pf.kakao.com/_rZTtG"; // 이동할 URL을 여기에 입력
            window.location.href = sUrl;
        },
		onKakaotalkPlantPress: function () {
            var sUrl = "http://pf.kakao.com/_xnlxbtG"; // 이동할 URL을 여기에 입력
            window.location.href = sUrl;
        }
	});
});



// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
//     /**
//      * @param {typeof sap.ui.core.mvc.Controller} Controller
//      */
//     function (Controller) {
//         "use strict";

//         return Controller.extend("sync.ea.company2.controller.Home", {
//             onInit: function () {

//             }
//         });
//     });
