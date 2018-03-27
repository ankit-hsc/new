'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : smsGateway.js -- DESCRIPTION : Controller to configure SMS Gateway
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 4th December, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('smsGatewayConfigCtrl',['$scope', '$controller', 'smsGatewayService', 'constant',function($scope, $controller, smsGatewayService, constant) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$scope.init = function(click) {
		$scope.selected = [];
		$scope.smsGatewayData=[];
		$scope.getsmsGatewayData();
		$scope.statusMap=[];
	};		
	
	
	$scope.getsmsGatewayData=function(){
	
		
		console.log("$scope.smsGatewayData "+$scope.smsGatewayData);
		smsGatewayService.fetchSmsGatewayData().then(function(data){
			$scope.smsGatewayData = null!=data.data ? data.data:[];
			$scope.statusMap=null!=data.listMap ? data.listMap['status'] : [];
		});
	};

	$scope.getRelevantStatus=function(status){
		return smsGatewayService.getRelevantStatus(status);
	};
	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to update the selected Sms Gateway(s) configuration?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.updatesmsGatewayConfigData=function(){
		smsGatewayService.updateSmsGateway($scope.selected).then(function(response){
			$scope.selected=[];
			$scope.getsmsGatewayData();
		});
	}
	$scope.okConfirm = function() {
		console.log($scope.selected);
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
		}
		console.log($scope.selected);
		$scope.updatesmsGatewayConfigData();
	};
	$scope.selectRow=function(component){
		for(var i in $scope.smsGatewayData){
			if($scope.smsGatewayData[i].gatewayId==component.gatewayId){
				$scope.smsGatewayData[i].rowSelected=true;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	};
	$scope.deselectRow=function(component){
		for(var i in $scope.smsGatewayData){
			if($scope.smsGatewayData[i].gatewayId==component.gatewayId){
				$scope.smsGatewayData[i].rowSelected=false;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	}
	$scope.onPaginate = function(){
		for(var x = 0; x < $scope.selected.length; x++){
			$scope.selected[x].rowSelected = false;
		}
		$scope.selected = [];
	}
	$scope.init();
}]);
