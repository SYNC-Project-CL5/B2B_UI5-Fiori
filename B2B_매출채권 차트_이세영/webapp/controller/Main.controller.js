sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/VizFrame",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e17.sync.e17.controller.Main", {
            onInit: function () {
                this._createVizFrame();
            },

            _createVizFrame: function() {
                var oVizFrame = this.getView().byId("idVizFrame");

                // 차트 제목 설정
                oVizFrame.setVizProperties({
                    title: {
                        visible: true,
                        text: "고객별 매출채권 차트"
                    }
                });

        }})
    });