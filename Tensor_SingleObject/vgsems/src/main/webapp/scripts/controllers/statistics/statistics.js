'use strict';

/*
 *******************************************************************************************************************
 -- FILENAME      : statistics.js
 --	DESCRIPTION   : File to display statistics data
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ----------------------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes								|
 -- ----------------------------------------------------------------------------------------------------------------
 -- |	0.1 | 12th December, 2017  	|	Suresh Ungarala			|	initial draft  									|
 ********************************************************************************************************************
 */
angular.module('vgsems').controller('statisticsCtrl',['$scope','StatisticsService','constant','$timeout',function($scope,StatisticsService,constant,$timeout){
	var pageLoadCount=1;
	$scope.selectedIndex=0;
	$scope.init=function(){
		$scope.showServices=true;
		$scope.statList=[];
		$scope.date;
		$scope.dates=[];
		var sysDate=new Date().getTime();
		for(var i=0;i<7;i++){
			$scope.dates.push(moment(new Date(sysDate-(i*86400*1000))).format(constant.SOFTWARE.STATISTICS_DATE_FORMAT));
		}
	};
	$scope.getStatData=function(){
		StatisticsService.fetchStatData($scope.date).then(function(data){
			pageLoadCount=1;
			$scope.statList=data;
			$scope.selectedIndex=0;
			$scope.showServices=true;
			$timeout(function(){
				callAttemptChartFunc();
				activeCallchartFunc();
				droppedCallchartFunc();
				regTerminalschartFunc();
				smschartFunc();
			},200);
		});
	};
	$scope.onTabSelected=function(tabIdex){
		$scope.showServices=tabIdex==0?true:false;
		$timeout(function(){
			if(tabIdex==1 && pageLoadCount==1){
				commModemchartFunc();
				pstnTrmntnIncomingchartFunc();
				pstnTrmntnOutGoingchartFunc();
				commChannelAllocChartFunc();
				sigChnlFrwdChartFunc();
				sigChnlRetnChartFunc();
				pageLoadCount++;
			}
		},500);
	};
	
	AmCharts.checkEmptyData = function(chart) {
		  if (chart.dataProvider == null || 0 == chart.dataProvider.length) {
			  
			  chart.valueAxes[0].minimum = 0;
			  chart.valueAxes[0].maximum = 100;
			// add dummy data point
			    var dataPoint = {
			      dummyValue: 0
			    };
			    dataPoint[chart.categoryField] = '';
			    chart.dataProvider = [dataPoint];
			    chart.removeLegend();
				chart.addLabel(0, '50%', 'The chart contains no data', 'center','20');
				chart.chartDiv.style.opacity = 0.5;
		    // redraw it
				chart.validateNow();
				
			if(!$scope.$$phase){
				$timeout(function(){
					$scope.$apply();
				},100);
			  }
		  }
		};
		
	var callAttemptChartFunc=function(){
		var callAttemptchart = AmCharts.makeChart("callAttemptChartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataProvider":null!=$scope.statList?$scope.statList:[],
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
			    "id": "v1",
			    "title": "Call Attempts",
			    "position": "left",
			    "autoGridCount": false,
			    "titleBold":true,
			    "titleFontSize":12
			  }, {
			    "id": "v2",
			    "title": "Avg Repeat Attempts",
			    "gridAlpha": 0,//opacity
			    "position": "right",
			    "titleBold":true,
			    "titleFontSize":12,
			    "autoGridCount": false
			  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "lineColor": "#f4806c",//red
			    "fillColors": "#f4806c",
			    "fillAlphas": 1,//opacity for legend
			    "type": "column",
			    "title": "Total Call Attempts",
			    "valueField": "callAttemptTotal",
			    "clustered": true,
			    "columnWidth": 1,
			    "legendValueText": "[[value]]",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "lineColor": "#969686",
			    "fillColors": "#969686",//grey
			    "fillAlphas": 1,
			    "type": "column",
			    "title": "Failed Call Attempts",
			    "valueField": "callAttemptFailed",
			    "clustered": true,
			    "columnWidth": 1,
			    "legendValueText": "[[value]]",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v2",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#FFFFFF",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#158bd3",//yellow
			    "type": "smoothedLine",
			    "title": "Avg Repeat Count",
			    "useLineColorForBulletBorder": true,
			    "valueField": "callAttemptAvgRepeatCount",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    "format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10,
			    "valueFunction":function(data,valueText){
			    	if(data.values && data.values.value===0){
			    		valueText="No Data Available";
			    	}
			    	return valueText;
			    }
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "callAttemptsChartTitleId",
						"size": 15,
						"text": "Call Attempts"
					}
				]
			});

			AmCharts.checkEmptyData(callAttemptchart);
};
	var activeCallchartFunc=function(){
		var activeCallchart = AmCharts.makeChart("activeCallchartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
				    "id": "v1",
				    "title": "Call Count",
				    "position": "left",
				    "autoGridCount": false,
				    "titleBold":true,
				    "titleFontSize":12
				  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "lineColor": "#969686",
			    "fillColors": "#969686",
			    "fillAlphas": 1,//opacity for legend
			    "type": "column",
			    "title": "PSTN-SMR",
			    "valueField": "avgSimulCallPtoS",
			    "clustered": true,
			    "columnWidth": 1,
			    "legendValueText": "[[value]]",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "lineColor": "#f37216",//orange
			    "fillColors": "#f37216",
			    "fillAlphas": 1,
			    "type": "column",
			    "title": "SMR-PSTN",
			    "valueField": "avgSimulCallStoP",
			    "clustered": true,
			    "columnWidth": 1,
			    "legendValueText": "[[value]]",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v1",
			    "lineColor": "#158bd3",//blue
			    "fillColors": "#158bd3",
			    "fillAlphas": 1,
			    "type": "column",
			    "title": "SMR-SMR",
			    "valueField": "avgSimulCallStoS",
			    "clustered": true,
			    "columnWidth": 1,
			    "legendValueText": "[[value]]",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
				  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    //"format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "activeCallsChartTitleId",
						"size": 15,
						"text": "Simultaneous Active Calls"
					}
				],
			  "dataProvider":null!=$scope.statList?$scope.statList:[]
			});
		AmCharts.checkEmptyData(activeCallchart);
};
	var droppedCallchartFunc=function(){
		var droppedCallchart = AmCharts.makeChart("droppedCallchartdiv", {
		  "type": "serial",
		  "theme": "light",
		  "dataDateFormat": "YYYY-MM-DD HH",
		  "precision": 0,
		  "valueAxes": [{
		    "id": "v1",
		    "title": "Dropped Calls",
		    "position": "left",
		    "autoGridCount": false,
		    "titleBold":true,
		    "titleFontSize":12
		  }, {
		    "id": "v2",
		    "title": "Lost Packets",
		    "gridAlpha": 0,//opacity
		    "position": "right",
		    "titleBold":true,
		    "titleFontSize":12,
		    "autoGridCount": false
		  }],
		  "graphs": [{
		    "id": "g2",
		    "valueAxis": "v1",
		    "lineColor": "#f4806c",
		    "fillColors": "#f4806c",
		    "fillAlphas": 1,
		    "type": "column",
		    "title": "Dropped Calls",
		    "valueField": "dropCallPktCallCount",
		    "clustered": true,
		    "columnWidth": 0.5,
		    "legendValueText": "[[value]]",
		    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
		  }, {
		    "id": "g1",
		    "valueAxis": "v2",
		    "bullet": "round",
		    "bulletBorderAlpha": 1,
		    "bulletColor": "#969686",
		    "bulletSize": 5,
		    "hideBulletsCount": 50,
		    "lineThickness": 2,
		    "lineColor": "#969686",
		    "type": "smoothedLine",
		    "title": "Lost Media Packets",
		    "useLineColorForBulletBorder": true,
		    "valueField": "dropCallPktPktCount",
		    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
		  }],
		  "chartCursor": {
		    "pan": true,
		    "enabled":true,
		    "valueLineEnabled": true,
		    "valueLineBalloonEnabled": true,
		    "cursorAlpha": 0.2,
		    "valueLineAlpha": 0.2,
		    "categoryBalloonDateFormat": "JJ:NN"
		  },
		  "chartScrollbar": {
				"enabled": true
		  },
		  "categoryField": "date",
		  "categoryAxis": {
		    "minPeriod":"hh",
		    //"format":"JJ:NN",
			"parseDates": true,
		    "dashLength": 1,
		    "minorGridEnabled": false
		  },
		  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
		  "legend": {
		    "useGraphSettings": true,
		    "position": "bottom",
		    "markerSize":10
		  },
		  "balloon": {
		    "borderThickness": 1,
		    "shadowAlpha": 1
		  },
		  "titles": [
				{
					"id": "droppedCallsChartTitleId",
					"size": 15,
					"text": "Dropped Calls and Lost Media Packets"
				}
			],
		  "dataProvider":null!=$scope.statList?$scope.statList:[]
		});
		AmCharts.checkEmptyData(droppedCallchart);
};
	var regTerminalschartFunc=function(){
		var regTerminalschart = AmCharts.makeChart("regTerminalschartdiv", {
		  "type": "serial",
		  "theme": "light",
		  "dataDateFormat": "YYYY-MM-DD HH",
		  "precision": 0,
		  "valueAxes": [{
		    "id": "v1",
		    "title": "Number Of Terminals",
		    "gridAlpha": 0,//opacity
		    "position": "left",
		    "titleBold":true,
		    "titleFontSize":12,
		    "autoGridCount": false
		  }],
		  "graphs": [{
		    "id": "g1",
		    "valueAxis": "v2",
		    "bullet": "round",
		    "bulletBorderAlpha": 1,
		    "bulletColor": "#f37216",
		    "bulletSize": 5,
		    "hideBulletsCount": 50,
		    "lineThickness": 2,
		    "lineColor": "#f37216",
		    "type": "smoothedLine",
		    "useLineColorForBulletBorder": true,
		    "valueField": "registeredTermincalCount",
		    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
		  }],
		  "chartCursor": {
		    "pan": true,
		    "enabled":true,
		    "valueLineEnabled": true,
		    "valueLineBalloonEnabled": true,
		    "cursorAlpha": 0.2,
		    "valueLineAlpha": 0.2,
		    "categoryBalloonDateFormat": "JJ:NN"
		  },
		  "chartScrollbar": {
				"enabled": true
		  },
		  "categoryField": "date",
		  "categoryAxis": {
		    "minPeriod":"hh",
		    //"format":"JJ:NN",
			"parseDates": true,
		    "dashLength": 1,
		    "minorGridEnabled": false
		  },
		  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
		  "balloon": {
		    "borderThickness": 1,
		    "shadowAlpha": 1
		  },
		  "titles": [
				{
					"id": "regTerminalsChartTitleId",
					"size": 15,
					"text": "Registered Terminals"
				}
			],
		  "dataProvider":null!=$scope.statList?$scope.statList:[]
		});
		AmCharts.checkEmptyData(regTerminalschart);
};
	var smschartFunc=function(){
		var smschart = AmCharts.makeChart("smschartdiv", {
		  "type": "serial",
		  "theme": "light",
		  "dataDateFormat": "YYYY-MM-DD HH",
		  "precision": 0,
		  "valueAxes": [{
		    "id": "v1",
		    "title": "SMS Count",
		    "position": "left",
		    "autoGridCount": false,
		    "titleBold":true,
		    "titleFontSize":12
		  }, {
		    "id": "v2",
		    "title": "Fail Count",
		    "gridAlpha": 0,//opacity
		    "position": "right",
		    "titleBold":true,
		    "titleFontSize":12,
		    "autoGridCount": false
		  }],
		  "graphs": [{
		    "id": "g4",
		    "valueAxis": "v1",
		    "lineColor": "#f4806c",
		    "fillColors": "#f4806c",
		    "fillAlphas": 1,//opacity for legend
		    "type": "column",
		    "title": "SMR-PSTN SMS Count",
		    "valueField": "smsCountStoG",
		    "clustered": true,
		    "columnWidth": 1,
		    "legendValueText": "[[value]]",
		    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
		  },{
		    "id": "g3",
		    "valueAxis": "v1",
		    "lineColor": "#969686",
		    "fillColors": "#969686",
		    "fillAlphas": 1,//opacity for legend
		    "type": "column",
		    "title": "PSTN-SMR SMS Count",
		    "valueField": "smsCountGtoS",
		    "clustered": true,
		    "columnWidth": 1,
		    "legendValueText": "[[value]]",
		    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
		  }, {
		    "id": "g2",
		    "valueAxis": "v1",
		    "lineColor": "#158bd3",
		    "fillColors": "#158bd3",
		    "fillAlphas": 1,
		    "type": "column",
		    "title": "SMR-SMR SMS Count",
		    "valueField": "smsCountStoS",
		    "clustered": true,
		    "columnWidth": 1,
		    "legendValueText": "[[value]]",
		    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
		  }, {
		    "id": "g1",
		    "valueAxis": "v2",
		    "bullet": "round",
		    "bulletBorderAlpha": 1,
		    "bulletColor": "#f37216",
		    "bulletSize": 5,
		    "hideBulletsCount": 50,
		    "lineThickness": 2,
		    "lineColor": "#f37216",
		    "type": "smoothedLine",
		    "title": "Failed Delivery Count",
		    "useLineColorForBulletBorder": true,
		    "valueField": "smsCountFailedDelivery",
		    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
		  }],
		  "chartCursor": {
		    "pan": true,
		    "enabled":true,
		    "valueLineEnabled": true,
		    "valueLineBalloonEnabled": true,
		    "cursorAlpha": 0.2,
		    "valueLineAlpha": 0.2,
		    "categoryBalloonDateFormat": "JJ:NN"
		  },
		  "chartScrollbar": {
				"enabled": true
		  },
		  "categoryField": "date",
		  "categoryAxis": {
		    "minPeriod":"hh",
		    //"format":"JJ:NN",
			"parseDates": true,
		    "dashLength": 1,
		    "minorGridEnabled": false
		  },
		  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
		  "legend": {
		    "useGraphSettings": true,
		    "position": "bottom",
		    "markerSize":10
		  },
		  "balloon": {
		    "borderThickness": 1,
		    "shadowAlpha": 1
		  },
		  "titles": [
				{
					"id": "smsChartTitleId",
					"size": 15,
					"text": "SMS"
				}
			],
		  "dataProvider":null!=$scope.statList?$scope.statList:[]
		});
		AmCharts.checkEmptyData(smschart);
};
	var commModemchartFunc=function(){
		var commModemchart = AmCharts.makeChart("commModemchartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
			    "id": "v1",
			    "title": "Allocation %",
			    "position": "left",
			    "autoGridCount": false,
			    "titleBold":true,
			    "titleFontSize":12
			  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#4caf50",//green
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#4caf50",
			    "type": "smoothedLine",
			    "title": "Max",
			    "useLineColorForBulletBorder": true,
			    "valueField": "commModemAllocMax",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#158bd3",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#158bd3",
			    "type": "smoothedLine",
			    "title": "Min",
			    "useLineColorForBulletBorder": true,
			    "valueField": "commModemAllocMin",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#f37216",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#f37216",
			    "type": "smoothedLine",
			    "title": "Avg",
			    "useLineColorForBulletBorder": true,
			    "valueField": "commModemAllocAvg",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    //"format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "commModemAllocChartTitleId",
						"size": 15,
						"text": "Communication Modems"
					}
				],
			  "dataProvider":null!=$scope.statList?$scope.statList:[]
			});
		AmCharts.checkEmptyData(commModemchart);
	};
	var pstnTrmntnIncomingchartFunc=function(){
		var pstnTrmntnIncomingchart = AmCharts.makeChart("pstnTrmntnIncomingchartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
			    "id": "v1",
			    "title": "Allocation %",
			    "position": "left",
			    "autoGridCount": false,
			    "titleBold":true,
			    "titleFontSize":12
			  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#f37216",//"#f4d817" dark yellow
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#f37216",
			    "type": "smoothedLine",
			    "title": "Max",
			    "useLineColorForBulletBorder": true,
			    "valueField": "pstnInAllocMax",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#158bd3",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#158bd3",
			    "type": "smoothedLine",
			    "title": "Min",
			    "useLineColorForBulletBorder": true,
			    "valueField": "pstnInAllocMin",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#4caf50",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#4caf50",
			    "type": "smoothedLine",
			    "title": "Avg",
			    "useLineColorForBulletBorder": true,
			    "valueField": "pstnInAllocAvg",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    //"format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "pstnTrmntnIncomingTitleId",
						"size": 15,
						"text": "PSTN Terminations (Incoming)"
					}
				],
			  "dataProvider":null!=$scope.statList?$scope.statList:[]
			});
		AmCharts.checkEmptyData(pstnTrmntnIncomingchart);
	};
	var pstnTrmntnOutGoingchartFunc=function(){
		var pstnTrmntnOutGoingchart = AmCharts.makeChart("pstnTrmntnOutGoingchartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
			    "id": "v1",
			    "title": "Allocation %",
			    "position": "left",
			    "autoGridCount": false,
			    "titleBold":true,
			    "titleFontSize":12
			  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#158bd3",//"#f4d817" dark yellow
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#158bd3",
			    "type": "smoothedLine",
			    "title": "Max",
			    "useLineColorForBulletBorder": true,
			    "valueField": "pstnOutAllocMax",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#969686",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#969686",
			    "type": "smoothedLine",
			    "title": "Min",
			    "useLineColorForBulletBorder": true,
			    "valueField": "pstnOutAllocMin",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#f4806c",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#f4806c",
			    "type": "smoothedLine",
			    "title": "Avg",
			    "useLineColorForBulletBorder": true,
			    "valueField": "pstnOutAllocAvg",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    //"format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "pstnTrmntnOutgoingTitleId",
						"size": 15,
						"text": "PSTN Terminations (Outgoing)"
					}
				],
			  "dataProvider":null!=$scope.statList?$scope.statList:[]
			});
		AmCharts.checkEmptyData(pstnTrmntnOutGoingchart);
	};
	var commChannelAllocChartFunc=function(){
		var commChannelAllocChart = AmCharts.makeChart("commChannelAllocChartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
			    "id": "v1",
			    "title": "Allocation %",
			    "position": "left",
			    "autoGridCount": false,
			    "titleBold":true,
			    "titleFontSize":12
			  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#969686",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#969686",
			    "type": "smoothedLine",
			    "title": "Max",
			    "useLineColorForBulletBorder": true,
			    "valueField": "commChAllocMax",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#f4806c",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#f4806c",
			    "type": "smoothedLine",
			    "title": "Min",
			    "useLineColorForBulletBorder": true,
			    "valueField": "commChAllocMin",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#158bd3",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#158bd3",
			    "type": "smoothedLine",
			    "title": "Avg",
			    "useLineColorForBulletBorder": true,
			    "valueField": "commChAllocAvg",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    //"format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "pstnTrmntnOutgoingTitleId",
						"size": 15,
						"text": "PSTN Terminations (Outgoing)"
					}
				],
			  "dataProvider":null!=$scope.statList?$scope.statList:[]
			});
		AmCharts.checkEmptyData(commChannelAllocChart);
	};
	var sigChnlFrwdChartFunc=function(){
		var sigChnlFrwdChart = AmCharts.makeChart("sigChnlFrwdChartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
			    "id": "v1",
			    "title": "Loading %",
			    "position": "left",
			    "autoGridCount": false,
			    "titleBold":true,
			    "titleFontSize":12
			  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#969686",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#969686",
			    "type": "smoothedLine",
			    "title": "Max",
			    "useLineColorForBulletBorder": true,
			    "valueField": "sigChFwdAllocMax",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#f4806c",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#f4806c",
			    "type": "smoothedLine",
			    "title": "Min",
			    "useLineColorForBulletBorder": true,
			    "valueField": "sigChFwdAllocMin",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#158bd3",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#158bd3",
			    "type": "smoothedLine",
			    "title": "Avg",
			    "useLineColorForBulletBorder": true,
			    "valueField": "sigChFwdAllocAvg",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    //"format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "sigChnlFrwdTitleId",
						"size": 15,
						"text": "Signalling Channel (Forward) - Loading Percentage"
					}
				],
			  "dataProvider":null!=$scope.statList?$scope.statList:[]
			});
		AmCharts.checkEmptyData(sigChnlFrwdChart);
	};
	var sigChnlRetnChartFunc=function(){
		var sigChnlRetnChart = AmCharts.makeChart("sigChnlRetnChartdiv", {
			  "type": "serial",
			  "theme": "light",
			  "dataDateFormat": "YYYY-MM-DD HH",
			  "precision": 0,
			  "valueAxes": [{
			    "id": "v1",
			    "title": "Loading %",
			    "position": "left",
			    "autoGridCount": false,
			    "titleBold":true,
			    "titleFontSize":12
			  }],
			  "graphs": [{
			    "id": "g3",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#969686",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#969686",
			    "type": "smoothedLine",
			    "title": "Max",
			    "useLineColorForBulletBorder": true,
			    "valueField": "sigChRtnAllocMax",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g2",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#f4806c",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#f4806c",
			    "type": "smoothedLine",
			    "title": "Min",
			    "useLineColorForBulletBorder": true,
			    "valueField": "sigChRtnAllocMin",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }, {
			    "id": "g1",
			    "valueAxis": "v1",
			    "bullet": "round",
			    "bulletBorderAlpha": 1,
			    "bulletColor": "#158bd3",
			    "bulletSize": 5,
			    "hideBulletsCount": 50,
			    "lineThickness": 2,
			    "lineColor": "#158bd3",
			    "type": "smoothedLine",
			    "title": "Avg",
			    "useLineColorForBulletBorder": true,
			    "valueField": "sigChRtnAllocAvg",
			    "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
			  }],
			  "chartCursor": {
			    "pan": true,
			    "enabled":true,
			    "valueLineEnabled": true,
			    "valueLineBalloonEnabled": true,
			    "cursorAlpha": 0.2,
			    "valueLineAlpha": 0.2,
			    "categoryBalloonDateFormat": "JJ:NN"
			  },
			  "chartScrollbar": {
					"enabled": true
			  },
			  "categoryField": "date",
			  "categoryAxis": {
			    "minPeriod":"hh",
			    //"format":"JJ:NN",
				"parseDates": true,
			    "dashLength": 1,
			    "minorGridEnabled": false
			  },
			  "dateFormats":[{"period":"hh","format":"JJ:NN"}],
			  "legend": {
			    "useGraphSettings": true,
			    "position": "bottom",
			    "markerSize":10
			  },
			  "balloon": {
			    "borderThickness": 1,
			    "shadowAlpha": 1
			  },
			  "titles": [
					{
						"id": "sigChnlRetnTitleId",
						"size": 15,
						"text": "Signalling Channel (Return) Loading Percentage"
					}
				],
			  "dataProvider":null!=$scope.statList?$scope.statList:[]
			});
		AmCharts.checkEmptyData(sigChnlRetnChart);
	};
		
	$scope.init();
}]);