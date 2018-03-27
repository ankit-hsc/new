'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : activeCallsStatus.js -- DESCRIPTION : Controller to monitor active calls
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 30th November, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('activeCallsStatusCtrl',['$scope', '$controller', 'CallAnsSmsStatusService','$window',function($scope, $controller, CallAnsSmsStatusService,$window) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$controller('callDetailDialogCtrl', {$scope: $scope});
	
	$scope.init = function(click) {
		$scope.activeCallId=-1;
		$scope.selected = [];
		$scope.activeCalls=[];
		$scope.getActiveCallsData();
	};		
	$scope.formatDate=function(date){
		return CallAnsSmsStatusService.formatDate(date);
	}
	
	$scope.getActiveCallsData=function(){
		
		CallAnsSmsStatusService.fetchActiveCallsData().then(function(data){
			$scope.activeCalls = data;
		});
	};
	$scope.showConfirm = function(activeCallId) {
		$scope.activeCallId=activeCallId;
		var confirmMsg = "Are you sure you want to clear the selected Active Call ?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.clearActiveCall=function(){
		CallAnsSmsStatusService.clearActiveCall($scope.activeCallId).then(function(response){
			$scope.selected=[];
			$scope.getActiveCallsData();
		});
	};
	$scope.showCallDetails=function(callId){
		CallAnsSmsStatusService.fetchCallDetailsByCallId(callId).then(function(data){
			$scope.showDialog(data);
		});
	};
	$scope.okConfirm = function() {
		console.log($scope.selected);
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
		}
		console.log($scope.selected);
		$scope.clearActiveCall();
	};
	
	$scope.init();
}]);
