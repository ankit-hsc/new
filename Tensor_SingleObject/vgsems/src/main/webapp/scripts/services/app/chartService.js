'use strict';

/*
 ********************************************************************************************************************
 -- FILENAME      : chartService.js
 --	DESCRIPTION   : Service for plotting all kinds of chart in ISRO
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- -----------------------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes								 |
 -- -----------------------------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 	| Suresh Ungarala 			| initial draft 									|
 --	-----------------------------------------------------------------------------------------------------------------
 --
 *********************************************************************************************************************
 */

angular.module('vgsems').service('chartService', ['$rootScope', 'constant', '$controller', function($rootScope ,constant,$controller) {
	// colors is optional field, otherwise default will be picked
	this.initModelDataFunction =function(functionName){
		this.listenerFunction = functionName;
	}
	this.createPieChart = function(divName, chartData, valueField, titleField, colors, legends,isListenerNeeded,title,description) {
		if(!colors) {
			colors = constant.PIE_COLORS.DEFAULT_COLORS;
		}
		if(legends) {
legends = {
					"position" : "right",
					"align": "left",
					"valueWidth":15,
					"spacing":1,
					"equalWidths":false,
					"verticalGap":2
				};		} else {
			legends = false;
		}
		
		if(!isListenerNeeded){
			isListenerNeeded =false;
		}
		if(!title){
			title="none"
		}
		var chart = AmCharts.makeChart(divName, {
			"type" : "pie",
			"title":title,
			"description":description,
			"theme" : "light",
			"addClassNames": true,
			"dataProvider" : chartData,
			"valueField" : valueField,
			"titleField" : titleField,
			"balloon" : {
				"fixedPosition" : true
			},
			"labelsEnabled" : false,
			"autoMargins" : false,
			"marginTop" : 0,
			"marginBottom" : 0,
			"marginLeft" : 0,
			"marginRight" : 0,
			"pullOutRadius" : 0,
			"colors" : colors,
			"legend" : legends,
			"startDuration" : 0,
            "balloonText":"[[title]] ([[value]])\n[[percents]]%",
            "depth3D": 5,
            "outlineAlpha": 0.4,
            "angle": 25,
            /*"innerRadius":15,*/
            "radius":"40%"
		});
		if(isListenerNeeded){
			chart.addListener("clickSlice", this.listenerFunction)
		}
		return chart;
	}

	this.createGanttChart= function(graphData){
		var ganttChart = AmCharts.makeChart( "chartdiv", {
		    "type": "gantt",
		    "theme": "light",
		    "addClassNames": true,
		    "period": "fff",
		    "pathToImages":"images/",
		    "dataDateFormat":"YYYY-MM-DD",
		    "balloonDateFormat": "JJ:NN",
		    "columnWidth": 0.2,
		    "valueAxis": {
		        "type": "date"
		    },
		    "categoryAxis":{
		    	"autoGridCount":false,
		    	"gridCount":30,
		    	"listeners": [{
		            "event": "clickItem",
		            "method": this.listenerFunction
		    	}],
		    	"labelFunction": function(sapId){
		    		if(sapId <= 9) {
		    			return "SAP0"+sapId;
		    		} else {
		    			return "SAP"+sapId;
		    		}
		    	}
		    },
		    "graph": {
		        "fillAlphas": 1,
		        "balloonText": "[[label]]",
		        "labelText":" ",
		    	"labelPosition":"middle"
		    },
		    "rotate": true,
		    "categoryField": "sapId",
		    "segmentsField": "segmentsData",
		    "colorField":"color",
		    "startDateField": "startDate",
		    "endDateField": "endDate",
		    "durationField": "duration",
		    "dataProvider": graphData, 
		    "valueScrollbar": {
		        "autoGridCount":true
		    },
		    "chartCursor": {
		        "cursorColor":"#55bb76",
		        "valueBalloonsEnabled": false,
		        "cursorAlpha": 0,
		        "valueLineAlpha":0.5,
		        "valueLineBalloonEnabled": true,
		        "valueLineEnabled": true,
		        "zoomable":false,
		        "valueZoomable":true,
		        "categoryBalloonFunction": function(category){
		        	if(category <= 9){
		        		return "SAP0"+category;
		        	} else{
		        		return "SAP"+category;
		        	}
		        }
		    }	    
		} );
		ganttChart.addListener("clickGraphItem", this.listenerFunction);
		return ganttChart;
		}
}]);
