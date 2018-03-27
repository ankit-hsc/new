'use strict';

/*
 * ********************************************************************************************** 
 * -- FILENAME : currentAlarmCtrl.js 
 * -- DESCRIPTION : Controller to handle recent alarms
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

angular.module('vgsems').controller('AlarmHistoryCtrl',['$scope', '$controller', 'currentAlarmService',function($scope, $controller, currentAlarmService) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$controller('paginationCtrl', {$scope: $scope})
	$scope.init = function() {
		$scope.ArchivedAlarms=[];
		$scope.totalRecords = 0;
		$scope.getArchivedAlarmsData($scope.datatableObj.defaultPage, $scope.datatableObj.limit);
	};		
	
	
	$scope.getArchivedAlarmsData=function(pageNo, noOfRecords){
		currentAlarmService.fetchArchivedAlarms(pageNo, noOfRecords).then(function(data){
			$scope.ArchivedAlarms = data.list;
			$scope.totalRecords = data.count;
		});
	};
	
	$scope.init();
}]);


