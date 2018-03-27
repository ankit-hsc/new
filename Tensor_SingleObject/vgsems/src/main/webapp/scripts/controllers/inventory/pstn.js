'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : pstn.js -- DESCRIPTION : Controller to configure PSTN
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 29th November, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('pstnCtrl',['$scope', '$controller', 'InventoryService', 'constant',function($scope, $controller, InventoryService, constant) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$controller('callDetailDialogCtrl', {$scope: $scope});
	
	$scope.init = function(click) {
		$scope.selected = [];
		$scope.pstnData=[];
		$scope.statusMap=[];
		$scope.directionList=[];
		$scope.gwIdIpPairList=[];
		$scope.getPstnData();
	};		
	
	$scope.getPstnData=function(){
		InventoryService.fetchPstnData().then(function(data){
			$scope.pstnData = null!=data.data ? data.data : [];
			$scope.statusMap= null!= data.listMap ? data.listMap['status']:[];
			$scope.directionList=data.direction;
			$scope.gwIdIpPairList=data.gwIdIpPair;
		});
		$scope.$broadcast('reset-pagination',{});
	};
	$scope.getGwIp=function(gwId){
		for(var i in $scope.gwIdIpPairList){
			if($scope.gwIdIpPairList[i].value===gwId){
				return $scope.gwIdIpPairList[i].name;
			}
		}
		return "";
	};
	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to update the selected PSTN(s) configuration?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.updatePstnConfigData=function(){
		InventoryService.updatePstn($scope.selected).then(function(response){
			$scope.selected=[];
			$scope.getPstnData();
		});
	}
	$scope.okConfirm = function() {
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
			delete $scope.selected[i].rowSelected;
		}
		$scope.updatePstnConfigData();
	};
	$scope.showCallDetails=function(callId){
		InventoryService.fetchCallDetailsByCallId(callId).then(function(data){
			$scope.showDialog(data);
		});
	};
	$scope.selectRow=function(component){
		for(var i in $scope.pstnData){
			if($scope.pstnData[i].id==component.id){
				$scope.pstnData[i].rowSelected=true;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	};
	$scope.deselectRow=function(component){
		for(var i in $scope.pstnData){
			if($scope.pstnData[i].id==component.id){
				$scope.pstnData[i].rowSelected=false;
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
