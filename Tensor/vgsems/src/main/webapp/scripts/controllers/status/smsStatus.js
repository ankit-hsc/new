'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : smsStatus.js -- DESCRIPTION : Controller to monitor SMS(s)
 * -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 4th December, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('smsStatusCtrl',['$scope', '$controller', 'CallAnsSmsStatusService',function($scope, $controller, CallAnsSmsStatusService) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$scope.init = function(click) {
		$scope.smsData=[];
		$scope.getsmsData();
	};		
	
	
	$scope.getsmsData=function(){
		CallAnsSmsStatusService.fetchSmsData().then(function(data){
			$scope.smsData = data;
		});
	};
	
	
	$scope.init();
}]);
