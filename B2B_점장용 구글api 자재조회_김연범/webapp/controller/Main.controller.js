sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller, ODataModel, JSONModel, Fragment, History, MessageToast) {
    "use strict";

    return Controller.extend("sync.ea.main.controller.Main", {
        onInit: function () {
            var that = this;

            // OData 모델 설정 (URL은 실제 Gateway 서비스의 URL로 변경)
            var sServiceUrl = "/sap/opu/odata/sap/ZEA_MMT_190_SRV/";
            var oDataModel = new ODataModel(sServiceUrl, true);
            this.getView().setModel(oDataModel);

            // PlantSet 데이터를 가져옴
            oDataModel.read("/PlantSet", {
                success: function (plantData) {
                    // StorageMaktxSet 데이터를 가져옴
                    oDataModel.read("/StorageMaktxSet", {
                        success: function (storageData) {
                            var spots = plantData.results.map(function (plant) {
                                // 해당 Werks에 해당하는 StorageMaktxSet 데이터를 필터링
                                var storageItems = storageData.results.filter(function (item) {
                                    return item.Werks === plant.Werks;
                                });

                                // Calqty의 총합 계산
                                plant.Calqty = storageItems.reduce(function (sum, item) {
                                    return sum + parseFloat(item.Calqty);
                                }, 0);

                                // Meins 값을 추가 (여기서는 첫 번째 항목의 Meins 값 사용)
                                plant.Meins = storageItems.length > 0 ? storageItems[0].Meins : "";

                                return plant;
                            });

                            var oJsonModel = new JSONModel({ spots: spots });
                            that.getView().setModel(oJsonModel, "geoModel");
                            that.loadGoogleMapsAPI();
                        },
                        error: function (oError) {
                            console.error("Error loading storage data: ", oError);
                        }
                    });
                },
                error: function (oError) {
                    console.error("Error loading plant data: ", oError);
                }
            });
        },

        loadGoogleMapsAPI: function () {
            var that = this;

            // Google Maps API 로드가 완료되면 맵 초기화
            window.initMap = function () {
                that.initMap();
            };

            // Google Maps API 로드
            var script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDlVhfz9Xpn1OW-PoGF0Lf8lwPI_2u2cc4&callback=initMap";
            document.body.appendChild(script);
        },

        initMap: function () {
            var mapOptions = {
                center: new google.maps.LatLng(36.3504, 127.3845), // 한국 대전 좌표 (초기 중심)
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(this.byId("map").getDomRef(), mapOptions);

            // 스팟 설정
            this.setSpots();

            // 실시간 위치 설정
            this.showCurrentLocation();
        },

        setSpots: function () {
            var that = this;
            var oModel = this.getView().getModel("geoModel");
            var spots = oModel.getData().spots;

            // 스팟 위치 설정
            var spotPositions = {
                "구로직영점": { lat: 37.4954, lng: 126.8872 },
                "평택직영점": { lat: 36.9922, lng: 127.1127 },
                "종로직영점": { lat: 37.5730, lng: 126.9794 },
                "인천직영점": { lat: 37.4563, lng: 126.7052 },
                "오산직영점": { lat: 37.1499, lng: 127.0772 },
                "대구직영점": { lat: 35.8714, lng: 128.6014 },
                "대전직영점": { lat: 36.3504, lng: 127.3845 },
                "부천직영점": { lat: 37.5033, lng: 126.7660 }
            };

            // 건물 아이콘 URL 설정
            var buildingIcon = 'https://maps.google.com/mapfiles/kml/shapes/buildings.png'; // 건물 아이콘 URL

            spots.forEach(function (spot) {
                var position = spotPositions[spot.Pname1];
                if (position) {
                    spot.Latitude = position.lat;
                    spot.Longitude = position.lng;

                    var marker = new google.maps.Marker({
                        position: position,
                        map: that.map,
                        title: spot.Pname1,
                        icon: buildingIcon // 건물 아이콘 설정
                    });

                    var infoWindow = new google.maps.InfoWindow({
                        content: "Werks: " + spot.Werks + "<br>Info: " + spot.Pname1 + "<br>Calqty: " + spot.Calqty + " " + spot.Meins + "<br><button onclick='window.showDetails(\"" + spot.Werks + "\", \"" + spot.Pname1 + "\")'>상세 조회</button>"
                    });

                    marker.addListener('click', function () {
                        infoWindow.open(that.map, marker); // 정보창 열기
                        that.map.setCenter(marker.getPosition());
                        that.map.setZoom(12); // 원하는 줌 레벨로 설정
                    });

                    spot.marker = marker; // 마커를 스팟 데이터에 저장
                }
            });

            // 상세 조회를 위한 글로벌 함수 설정
            window.showDetails = function (werks, pname1) {
                that.onShowDetails(werks, pname1);
            };
        },

        onListItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext("geoModel");
            var oSpot = oContext.getObject();
            var that = this;
            
            var oGeoMap = this.map;

            oGeoMap.setCenter({ lat: parseFloat(oSpot.Latitude), lng: parseFloat(oSpot.Longitude) });
            oGeoMap.setZoom(10); // 원하는 줌 레벨로 설정

            // 해당 스팟의 정보창 열기
            new google.maps.InfoWindow({
                content: "Werks: " + oSpot.Werks + "<br>Info: " + oSpot.Pname1 + "<br>Calqty: " + oSpot.Calqty + " " + oSpot.Meins + "<br><button onclick='window.showDetails(\"" + oSpot.Werks + "\", \"" + oSpot.Pname1 + "\")'>상세 조회</button>"
            }).open(oGeoMap, oSpot.marker);

            // 상세 조회를 위한 글로벌 함수 설정
            window.showDetails = function (werks, pname1) {
                that.onShowDetails(werks, pname1);
            };
        },

        onShowDetails: function (werks, pname1) {
            var that = this;
            this.loadStorageData(werks).then(function (data) {
                var totalQty = data.reduce(function (sum, item) {
                    return sum + parseFloat(item.Calqty);
                }, 0);

                if (!that.byId("storageDialog")) {
                    Fragment.load({
                        id: that.getView().getId(),
                        name: "sync.ea.main.view.Dialog",
                        controller: that
                    }).then(function (oDialog) {
                        that.getView().addDependent(oDialog);
                        var oJsonModel = new JSONModel(data);
                        that.getView().setModel(oJsonModel, "storageModel");
                        oDialog.setTitle("상세조회");
                        that.byId("dialogPname1").setText(pname1);
                        that.byId("dialogCalqty").setText("총 자재량: " + totalQty + " " + data[0].Meins);
                        oDialog.open();
                    });
                } else {
                    var oJsonModel = new JSONModel(data);
                    that.getView().setModel(oJsonModel, "storageModel");
                    var oDialog = that.byId("storageDialog");
                    oDialog.setTitle("상세조회");
                    that.byId("dialogPname1").setText(pname1);
                    that.byId("dialogCalqty").setText("총 자재량: " + totalQty + " " + data[0].Meins);
                    oDialog.open();
                }
            });
        },

        loadStorageData: function (werks) {
            var that = this;
            var oDataModel = this.getView().getModel();
            var sPath = "/StorageMaktxSet?$filter=Werks eq '" + werks + "'";
            return new Promise(function (resolve, reject) {
                oDataModel.read(sPath, {
                    success: function (oData) {
                        console.log("StorageMaktxSet data for Werks:", oData); // 로드된 데이터를 콘솔에 출력
                        var filteredData = oData.results.filter(function (item) {
                            return item.Werks === werks; // 필터링된 데이터를 반환
                        });
                        resolve(filteredData);
                    },
                    error: function (oError) {
                        console.error("Error loading StorageMaktxSet data: ", oError);
                        reject(oError);
                    }
                });
            });
        },

        onCloseDialog: function () {
            this.byId("storageDialog").close();
        },

        onShowListPress: function () {
            this.getOwnerComponent().getRouter().navTo("RouteStg");
        },

        onShowMapPress: function () {
            this.byId("hboxMain").setVisible(true);
            this.byId("vboxFlexible").setVisible(false);
        },

        showCurrentLocation: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    this.displayCurrentLocation.bind(this),
                    function (error) {
                        MessageToast.show("Error getting current location: " + error.message);
                    }
                );
            } else {
                MessageToast.show("Geolocation is not supported by this browser.");
            }
        },

        displayCurrentLocation: function (position) {
            var currentLat = position.coords.latitude;
            var currentLng = position.coords.longitude;
            var currentLocation = new google.maps.LatLng(currentLat, currentLng);

            var currentMarker = new google.maps.Marker({
                position: currentLocation,
                map: this.map,
                title: "현재 위치"
            });

            this.map.setCenter(currentLocation);
            this.map.setZoom(12);
        }
    });
});
