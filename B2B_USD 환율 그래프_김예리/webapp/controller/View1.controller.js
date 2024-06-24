
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    'sap/m/Label',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, Label, Filter, FilterOperator, ChartFormatter, Format) {
        "use strict";

        return Controller.extend("sync08.zeafi050.controller.View1", {
            onInit: function () {
            
                // VizFrame 생성
                this._createVizFrame();
            },

            _createVizFrame: function () {
                var oVizFrame = this.getView().byId("idVizFrame");

                // 차트 제목 설정
                oVizFrame.setVizProperties({
                    title: {
                        visible: true,
                        text: "미국 USD",
                        
                    },
                    valueAxis: {
                        title: {
                            visible: true,
                            text: "환율"
                        },
                        scale: {
                            fixedRange: true  // 축을 자동 조정하도록 설정
                        }
                    },
                    categoryAxis: {
                        title: {
                            visible: true,
                            text: "환율효력일"
                        }
                    },
                    plotArea: {
                        window: {
                            start: "firstDataPoint",  // 첫 번째 데이터 포인트부터 시작
                            end: "lastDataPoint"     // 마지막 데이터 포인트까지 끝
                        },
                        primaryScale: {
                            minValue: 1300
                        }
                    }
                });


                // VizFrame에 클릭 이벤트 핸들러 추가
                oVizFrame.attachEvent("vizClick", this._onVizFrameClick, this);

                Format.numericFormatter(ChartFormatter.getInstance());
                var formatPattern = ChartFormatter.DefaultPattern;
                var oPopOver = this.byId("idPopOver");
                oPopOver.connect(oVizFrame.getVizUid());
                oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

            },

            _onVizFrameClick: function (oEvent) {
                // 클릭된 데이터 가져오기
                var oData = oEvent.getParameter("data");
                console.log("Clicked Data:", oData);

                if (oData) {
                    var sCurrencyDate = oData.data.Gdatu; // 환율효력일
                    var sExchangeRate = oData.data.Ukurs; // 환율
                    var sMessage = "환율효력일: " + sCurrencyDate + "\n환율: " + sExchangeRate;
                    MessageToast.show(sMessage);
                }
            },

            onSearch: function () {
                // MessageToast.show("버튼클릭");
                var oDateRangeSelection = this.byId("idDateRangeSelection");
                // console.log(oDRS2.getDateValue())

                // 1. 입력한 날짜의 값을 가져온다.
                // var oModel = this.getView().getModel();
                var oStartDate = oDateRangeSelection.getDateValue();
                var oEndDate = oDateRangeSelection.getSecondDateValue();

                if (!oStartDate || !oEndDate) {
                    MessageToast.show("날짜 범위를 선택해 주세요.");
                    return;
                }

                // 함수로 형변환 (여기서부터 해결필요)
                var sFormattedStartDate = this.getFormatDate(oStartDate);
                var sFormattedEndDate = this.getFormatDate(oEndDate);

                console.log('data view ', sFormattedStartDate, sFormattedEndDate);

                // 2. sap.ui.model.Filter 객체를 배열로 만든다.
                var aFilter = [];
                // aFilter.push(new Filter("Gdatu", FilterOperator.BT, oStartDate, oEndDate));
                aFilter.push(new Filter("Gdatu", FilterOperator.BT, sFormattedStartDate, sFormattedEndDate));
                // breakpoint;

                // 3. vizFrame의 DataSet의 Binding 정보를 가져와서 filter 메소드를 호출하면서 2번에서 만든 Filter 정보를 전달한다.
                var oVizFrame = this.getView().byId("idVizFrame");
                var oBinding = oVizFrame.getDataset().getBinding("data");
                oBinding.filter(aFilter);
            },
            /**
             *  yyyy-MM-dd 포맷으로 반환
             */
            getFormatDate: function (date) {
                var year = date.getFullYear();              //yyyy
                var month = (1 + date.getMonth());          //M
                month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
                var day = date.getDate();                   //d
                day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
                return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
            }

        });
    });