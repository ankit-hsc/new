'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : SigModem.js -- DESCRIPTION : Controller to configure SIG Modem
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 28th November, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('SigModemCtrl',['$scope', '$controller', 'InventoryService',function($scope, $controller, InventoryService) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$scope.init = function(click) {
		$scope.selected = [];
		$scope.sigModems=[];
		$scope.sdsIdIpPairArr=[];
		$scope.statusMap=[];
		$scope.getSigModemData();
	};		
	
	$scope.formatDate=function(date){
		return InventoryService.formatDate(date);
	};
	$scope.getSigModemData=function(){
		$scope.sdsIdIpPairArr=[];
		$scope.sigModems=[];

		InventoryService.fetchSigModems().then(function(data){
			$scope.sigModems = null!=data.data ? data.data:[];
			$scope.statusMap=null!=data.listMap ? data.listMap['status'] :[];
			$scope.sdsIdIpPairArr=data['sdsIdIpPair'];
		});
	};
	$scope.getDataIfIp=function(sdsId){
		for(var i in $scope.sdsIdIpPairArr){
			if($scope.sdsIdIpPairArr[i].value===sdsId){
				return $scope.sdsIdIpPairArr[i].name;
			}
		}
		return "";
	};
	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to update the selected SIG Modem(s) configuration?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.updateSIGModemConfigData=function(){
		InventoryService.updateSigModems($scope.selected).then(function(response){
			$scope.selected=[];
			$scope.getSigModemData();
		});
	}
	$scope.okConfirm = function() {
		console.log($scope.selected);
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
			delete $scope.selected[i].rowSelected;
		}
		console.log($scope.selected);
		$scope.updateSIGModemConfigData();
	};
	$scope.locateSigModem=function(sigModemId){
		InventoryService.locateSigModem(sigModemId).then(function(res){
			console.log('Signal Modem located');
			$scope.getSigModemData();
		});
	};
	$scope.selectRow=function(component){
		for(var i in $scope.sigModems){
			if($scope.sigModems[i].id==component.id){
				$scope.sigModems[i].rowSelected=true;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	};
	$scope.deselectRow=function(component){
		for(var i in $scope.sigModems){
			if($scope.sigModems[i].id==component.id){
				$scope.sigModems[i].rowSelected=false;
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
