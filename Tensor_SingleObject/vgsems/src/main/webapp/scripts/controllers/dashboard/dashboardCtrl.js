'use strict';

/*
 ***********************************************************************************
 -- FILENAME      : dashboardCtrl.js
 --	DESCRIPTION   : Controller to handle home page functions and data
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes	|
 -- ---------------------------------------------------------------------------------
 -- | 0.1 	| 11th December, 2017 	| AKHILANAND PRASAD 		| initial draft 		|
 --	---------------------------------------------------------------------------------
 --
 ************************************************************************************
 */
angular.module('vgsems')
	.controller('DashboardCtrl', ['$scope', '$timeout', '$interval', 'homeService', '$mdSidenav',function($scope, $timeout, $interval, homeService, $mdSidenav) {
		$scope.close = function(){
			$mdSidenav('mapContainer').close().then(function(){
				console.log('closed');
			})
		}
		$scope.toggleRight = buildToggler('mapContainer');
		$scope.isOpenRight = function(){
			return $mdSidenav('mapContainer').isOpen();
		};
		$scope.openMap = function(){
			getMapData();
		};
		
		getDashboardStats();
		//getMapData();
		
		var refresher = $interval(function(){
			getDashboardStats();
		}, 60000);
		
		$scope.$on('$destroy', function(){
			$interval.cancel(refresher);
		})
		
		function getDashboardStats(){
			homeService.getDashboardStats().then(function(data){
				$scope.serviceCountData = {};
				$scope.terminalDistributionData = [];
				$scope.callMixData = [];
				$scope.callDistributionData = [];
				$scope.commModemData = [];
				$scope.pstnInStatusData = [];
				$scope.pstnOutStatusData = [];
				$scope.commChannelStatusData = [];
				$scope.signalChannelLoadingData = [];
				if(data.serviceCount){
					$scope.serviceCountData.registeredTerminalCount = data.serviceCount.registeredTerminalCount || '';
					$scope.serviceCountData.activeCallCount = data.serviceCount.activeCallCount || '';
					$scope.serviceCountData.callAttemptCount = data.serviceCount.callAttemptCount || '';
					$scope.serviceCountData.failedAttemptCallCount = data.serviceCount.failedAttemptCallCount || '';
					$scope.serviceCountData.avgRepeatCount = data.serviceCount.avgRepeatCount || '';
					$scope.serviceCountData.lostMedicPktCount = data.serviceCount.lostMedicPktCount || '';
					$scope.serviceCountData.gsmSMRSMSCount = data.serviceCount.gsmSMRSMSCount || '';
					$scope.serviceCountData.smrGSMSMSCount = data.serviceCount.smrGSMSMSCount || '';
					$scope.serviceCountData.smrSMRSMSCount = data.serviceCount.smrSMRSMSCount || '';
					$scope.serviceCountData.failedDeliverySMSCount = data.serviceCount.failedDeliverySMSCount || '';
				}
				
				if(data.terminalDistribution){
					$scope.terminalDistributionData = data.terminalDistribution;
				}
				
				if(data.callMix){
					$scope.callMixData = data.callMix;
				}
				
				if(data.callDistribution){
					$scope.callDistributionData = data.callDistribution;
				}
				
				if(data.commModemStatus){
					$scope.commModemData = data.commModemStatus;
				}
				
				if(data.pstnInStatus){
					$scope.pstnInStatusData = data.pstnInStatus;
				}
				
				if(data.pstnOutStatus){
					$scope.pstnOutStatusData = data.pstnOutStatus;
				}
				
				if(data.commChannelStatus){
					$scope.commChannelStatusData = data.commChannelStatus;
				}
				
				if(data.sigChannelLoading){
					$scope.signalChannelLoadingData = data.sigChannelLoading;
				}
				
				$timeout(function(){
					var terminalCount=0;
					for(var i in $scope.terminalDistributionData){
						terminalCount=terminalCount+Math.round($scope.terminalDistributionData[i].dataValue);
					}
					var callMixCount=0;
					for(var i in $scope.callMixData){
						callMixCount=callMixCount+Math.round($scope.callMixData[i].dataValue);
					}
					var callDistributionCount=0;
					for(var i in $scope.callDistributionData){
						callDistributionCount=callDistributionCount+Math.round($scope.callDistributionData[i].dataValue);
					}
					var commModemCount=0;
					for(var i in $scope.commModemData){
						commModemCount=commModemCount+Math.round($scope.commModemData[i].dataValue);
					}
					var pstnInCount=0;
					for(var i in $scope.pstnInStatusData){
						pstnInCount=pstnInCount+Math.round($scope.pstnInStatusData[i].dataValue);
					}
					var pstnOutCount=0;
					for(var i in $scope.pstnOutStatusData){
						pstnOutCount=pstnOutCount+Math.round($scope.pstnOutStatusData[i].dataValue);
					}
					renderPieChart($scope.terminalDistributionData, "dataValue", "name", "terminal_distribution",terminalCount);
					renderPieChart($scope.callMixData, "dataValue", "name", "call_mix", callMixCount);
					renderPieChart($scope.callDistributionData, "dataValue", "name", "call_distribution",callDistributionCount);
					renderPieChart($scope.commModemData, "dataValue", "name", "communication_modem",commModemCount);
					renderPieChart($scope.pstnInStatusData, "dataValue", "name", "pstnTermination_in",pstnInCount);
					renderPieChart($scope.pstnOutStatusData, "dataValue", "name", "pstnTermination_out",pstnOutCount);
					renderClusteredChart();
					renderStackedChart();
				}, 100);
			});
		}
		
		function getMapData(){
			homeService.getBeamMapData().then(function(res){
				$scope.mapData = res;
				$scope.mapData.map = 'indiaLow';
				renderMap();
				$scope.toggleRight();
			});
		}
		
		function renderPieChart(data, value, title, id,totalcount){
			AmCharts.makeChart( id, {
				  "type": "pie",
				  "theme": "light",
				  "dataProvider": data,
				  "valueField": value,
				  "titleField": title,
				  "labelRadius": -25,
				  "labelText": "[[percents]]%",
				   "balloon":{
					   "fixedPosition":false
				   },
				   "balloonText":"[[title]]: [[percents]]% ([[value]] out of "+totalcount+")",
				   "labelsEnabled": true,
				   "autoMargins": false,
				   "marginTop": 0,
				   "marginBottom": 0,
				   "marginLeft": 0,
				   "marginRight": 0,
				   "pullOutRadius": 0,
				   "legend":{
					   	"position":"right",
					    "marginRight":50,
					    "autoMargins":false
				   	}
				});
		}
		
		function renderClusteredChart(){
			AmCharts.makeChart("signal_channel_loading", {
				"type": "serial",
			     "theme": "light",
				"categoryField": "name",
				"rotate": true,
				"startDuration": 1,
				"legend": {
			        "maxColumns": 2,
			        "position": "top",
					"markerSize": 10
			    },
				"categoryAxis": {
					"gridPosition": "start",
					"position": "left"
				},
				"trendLines": [],
				"graphs": [
					{
						"balloonText": "[[title]]: [[value]]",
						"fillAlphas": 0.8,
						"id": "AmGraph-1",
						"lineAlpha": 0.2,
						"title": "Forward",
						"type": "column",
						"valueField": "dataValue1"
					},
					{
						"balloonText": "[[title]]: [[value]]",
						"fillAlphas": 0.8,
						"id": "AmGraph-2",
						"lineAlpha": 0.2,
						"title": "Return",
						"type": "column",
						"valueField": "dataValue2"
					}
				],
				"guides": [],
				"valueAxes": [
					{
						"id": "ValueAxis-1",
						"position": "bottom",
						"axisAlpha": 0,
						"integersOnly": true
					}
				],
				"allLabels": [],
				"balloon": {},
				"titles": [],
				"dataProvider":$scope.signalChannelLoadingData

			});
		}
		
		function renderStackedChart(){
			AmCharts.makeChart("comm_channel", {
			    "type": "serial",
				"theme": "dark",
			    "legend": {
			        "maxColumns": 5,
			        "position": "top",
					"markerSize": 10
			    },
			    "dataProvider": $scope.commChannelStatusData,
			    "valueAxes": [{
			        "stackType": "regular",
			        "axisAlpha": 0.5,
			        "gridAlpha": 0,
			        "integersOnly": true
			    }],
			    "graphs": [{
			        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
			        "fillAlphas": 0.8,
			        "lineAlpha": 0.3,
			        "title": "Active",
			        "type": "column",
					"color": "#000000",
			        "valueField": "dataValue1"
			    }, {
			        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
			        "fillAlphas": 0.8,
			        "lineAlpha": 0.3,
			        "title": "Blocked",
			        "type": "column",
					"color": "#000000",
			        "valueField": "dataValue2"
			    }, {
			        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
			        "fillAlphas": 0.8,
			        "lineAlpha": 0.3,
			        "title": "Failed",
			        "type": "column",
					"color": "#000000",
			        "valueField": "dataValue3"
			    }, {
			        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
			        "fillAlphas": 0.8,
			        "lineAlpha": 0.3,
			        "title": "Allocated",
			        "type": "column",
					"color": "#000000",
			        "valueField": "dataValue4"
			    }, {
			        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
			        "fillAlphas": 0.8,
			        "lineAlpha": 0.3,
			        "title": "Permanent Allocated",
			        "type": "column",
					"color": "#000000",
			        "valueField": "dataValue5"
			    }],
			    "rotate": true,
			    "categoryField": "name",
			    "categoryAxis": {
			        "gridPosition": "start",
			        "axisAlpha": 0,
			        "gridAlpha": 0,
			        "position": "left"
			    }
			});
		}
		
		function renderMap(){
			AmCharts.makeChart( "map_div", {
			  "type": "map",
			  "theme": "light",
			  "backgroundAlpha": 1,
			  "backgroundColor": "#fff",
			  "dataProvider": $scope.mapData,

			  "areasSettings": {
			    "unlistedAreasColor": "#8dd9ef"
			  },

			  "imagesSettings": {
			    "color": "#585869",
			    "rollOverColor": "#585869",
			    "selectedColor": "#585869",
			    "pauseDuration": 0.2,
			    "animationDuration": 4,
			    "adjustAnimationSpeed": true
			  },

			  "linesSettings": {
			    "color": "#000000",
			    "alpha": 0.4,
			    "thickness": 3
			  },
			  "titles": [{
				  "text": "Beam & User Terminal",
				  "bold": true,
				  "size": 20,
				  "color": "#4286f4"
			  }]

			} );
		}
		
		function buildToggler(navID) {
	      return function() {
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            console.log('open');
	          });
	      };
	    }
	}]);
	