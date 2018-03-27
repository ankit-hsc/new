'use strict';

/*
 * ********************************************************************************************** 
 * -- FILENAME : currentAlarmCtrl.js 
 * -- DESCRIPTION : Controller to handle current alarms
 * -- Copyright : Copyright (c) 2017.
 * -- Company : ISRO. 
 * -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION	| Date 				  | Author 			| Reason for Changes 							|
 * --------------------------------------------------------------------------------------------- -- |
 * | 0.1 	| 30th November, 2017 | Suresh Ungarala | initial draft 								|						
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */

angular.module('vgsems').controller('CurrentAlarmCtrl',
		['$scope', '$controller', 'currentAlarmService', 'constant',function($scope, $controller, currentAlarmService, constant) {

	$controller('confirmPromptCtrl', {$scope: $scope});
	$scope.init = function(click) {
		$scope.selected = [];
		$scope.currentAlarms=[];
		$scope.getCurrentAlarmsData();
	};		
	
	$scope.formatDate=function(date){
		return currentAlarmService.formatDate(date);
	}
	$scope.getCurrentAlarmsData=function(){
		currentAlarmService.fetchActiveAlarms().then(function(data){
			$scope.currentAlarms = data;
		},function(err){
			console.log(err);
		});
	};
	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to clear the selected Active alarm?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.forceClearActiveAlarm=function(){
		var alrmIds=[];
		for(var i in $scope.selected){
			alrmIds.push($scope.selected[i].alarmId);
		}
		currentAlarmService.forceClearAlarm(alrmIds).then(function(response){
			$scope.selected=[];
			$scope.getCurrentAlarmsData();
		});
	}
	$scope.okConfirm = function() {
		$scope.forceClearActiveAlarm();
	};
	$scope.onPaginate = function(){
		for(var x = 0; x < $scope.selected.length; x++){
			$scope.selected[x].rowSelected = false;
		}
		$scope.selected = [];
	}
	
	$scope.init();
}]);


