'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : CommMedem.js -- DESCRIPTION : Controller to configure Communication Modem
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 29th November, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('CommModemCtrl',['$scope', '$controller', 'InventoryService', 'constant',function($scope, $controller, InventoryService, constant) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$controller('callDetailDialogCtrl', {$scope: $scope});
	
	$scope.init = function(click) {
		$scope.selected = [];
		$scope.commModems=[];
		$scope.statusMap=[];
		$scope.sdsIdIpPairArr=[];
		$scope.getCommModemData();
	};		
	
	$scope.getCommModemData=function(){
		InventoryService.fetchCommModems().then(function(data){
			$scope.commModems = null!=data.data ? data.data:[];
			$scope.statusMap=null!=data.listMap ? data.listMap['status']:[];
			$scope.sdsIdIpPairArr=data['sdsIdIpPair'];
		});
		$scope.$broadcast('reset-pagination',{});
	};
	$scope.getDataIfIp=function(sdsId){
		for(var i in $scope.sdsIdIpPairArr){
			if($scope.sdsIdIpPairArr[i].value===sdsId){
				return $scope.sdsIdIpPairArr[i].name;
			}
		}
		return "";
	};
	$scope.getRelevantStatus=function(status){
		return InventoryService.getRelevantStatus(status);
	};
	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to update the selected Communication Modem(s) configuration?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.updateCommModemConfigData=function(){
		InventoryService.updateCommModems($scope.selected).then(function(response){
			$scope.selected=[];
			$scope.getCommModemData();
		});
	};
	$scope.okConfirm = function() {
		console.log($scope.selected);
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
			delete $scope.selected[i].rowSelected;
		}
		console.log($scope.selected);
		$scope.updateCommModemConfigData();
	};
	$scope.showCallDetails=function(callId){
		InventoryService.fetchCallDetailsByCallId(callId).then(function(data){
			$scope.showDialog(data);
		});
	};
	$scope.locateCommModem=function(commModemId){
		InventoryService.locateCommModem(commModemId).then(function(res){
			console.log('Communication Modem located');
			$scope.getCommModemData();
		});
	};
	$scope.selectRow=function(component){
		for(var i in $scope.commModems){
			if($scope.commModems[i].id==component.id){
				$scope.commModems[i].rowSelected=true;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	};
	$scope.deselectRow=function(component){
		for(var i in $scope.commModems){
			if($scope.commModems[i].id==component.id){
				$scope.commModems[i].rowSelected=false;
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
