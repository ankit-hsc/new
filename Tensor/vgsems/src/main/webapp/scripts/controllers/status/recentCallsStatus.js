'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : recentCallsStatus.js -- DESCRIPTION : Controller to monitor recent calls
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 4th December, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('recentCallsStatusCtrl',['$scope', '$controller', 'CallAnsSmsStatusService','constant',function($scope, $controller, CallAnsSmsStatusService,constant) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$controller('paginationCtrl', {$scope: $scope});
	$controller('callDetailDialogCtrl', {$scope: $scope});
	
	$scope.init = function(click) {
		$scope.recentCalls=[];
		$scope.dates=[];
		var sysDate=new Date().getTime();
		for(var i=0;i<7;i++){
			$scope.dates.push(moment(new Date(sysDate-(i*86400*1000))).format(constant.SOFTWARE.STATISTICS_DATE_FORMAT));
		}
	};		
	
	
	$scope.getrecentCallsData=function(){
		CallAnsSmsStatusService.fetchRecentCallsData($scope.date).then(function(data){
			$scope.recentCalls = data.list;
		});
	};
	$scope.showCallDetails=function(callId){
		CallAnsSmsStatusService.fetchCallDetailsByCallId(callId).then(function(data){
			$scope.showDialog(data);
		});
	};
	$scope.formatDate=function(date){
		return CallAnsSmsStatusService.formatDate(date);
	}
	
	$scope.init();
}]);
