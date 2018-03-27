'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : Terminal.js -- DESCRIPTION : Controller to configure Terminal(s)
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 4th December, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('terminalConfigCtrl',['$scope', '$controller', 'ConfigService', 'constant',function($scope, $controller, ConfigService, constant) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$controller('callDetailDialogCtrl', {$scope: $scope});
	$controller('terminalDetailPopUpCtrl', {$scope: $scope});
	
	$scope.init = function() {
		$scope.isAllSelected = false;
		$scope.filteredData=[];
		$scope.selected = [];
		$scope.terminalData=[];
		$scope.orgData=[];
		$scope.statusMap=[];
		$scope.all='ALL';
		$scope.orgs=$scope.all;
		ConfigService.fetchOrgnztnData().then(function(data){
			$scope.orgData=data;
			$scope.orgData.push({groupName: $scope.all});
		});
		$scope.getTerminalData();
	};		
	$scope.filterByOrgNames=function(){
		//if(!$scope.isAllSelected){
			$scope.filteredData=[];
			for(var i in $scope.terminalData){
				if($scope.orgs===$scope.terminalData[i].orgGroupName){
					$scope.filteredData.push($scope.terminalData[i]);
				} else if($scope.orgs == $scope.all){
					$scope.filteredData=$scope.terminalData;
				}
			}
		/*}else{
			$scope.filteredData=$scope.terminalData;
		}*/
	};
	$scope.getTerminalData=function(){
		ConfigService.fetchterminalsForOrgId().then(function(data){
			for(var i in data.data){
				var temp=null!=data.data[i].gpsLocation?data.data[i].gpsLocation.split(','):new Array();
				if(temp.length!=0){
					//data.data[i].customGps=(Math.round(temp[0])>0?temp[0]+'E':temp[0]+'W')+','+(Math.round(temp[1]>0)?temp[1]+'N':temp[1]+'S');
					if(temp[0] == 0 && temp[1] == 0){
						data.data[i].customGps = '';
					} else {
						data.data[i].customGps = (Math.round(temp[0]) > 0 ? temp[0] + 'E' : temp[0] + 'W') + ',' + (Math.round(temp[1] > 0) ? temp[1] + 'N' : temp[1] + 'S');
					}
				}
			}
			$scope.terminalData = null!=data.data ? data.data:[];
			$scope.filteredData=null!=data.data ? data.data:[];
			$scope.statusMap=null!=data.listMap ? data.listMap['status']:[];
		});
	};
	/*$scope.selectAll=function(){
		if($scope.isAllSelected){
			$scope.orgs=$scope.all;
		}
	};
	$scope.checkAllOptionSel = function(){
		if($scope.all !=$scope.orgs){
			$scope.isAllSelected = false;
		}
	};*/
	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to update the selected terminal(s) configuration?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.updateTerminalConfigData=function(){
		ConfigService.updateTerminals($scope.selected).then(function(response){
			$scope.selected=[];
			$scope.getTerminalData();
		});
	};
	$scope.showCallDetails=function(callId){
		ConfigService.fetchCallDetailsByCallId(callId).then(function(data){
			$scope.showDialog(data);
		});
	};
	$scope.showTerminalCallDetails=function(terminalId){
			$scope.showPopUp(terminalId);
	};
	$scope.okConfirm = function() {
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
			delete $scope.selected[i].customGps;
			delete $scope.selected[i].rowSelected;
		}
		$scope.updateTerminalConfigData();
	};
	$scope.selectRow=function(component){
		for(var i in $scope.filteredData){
			if($scope.filteredData[i].terminalId==component.terminalId){
				$scope.filteredData[i].rowSelected=true;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	};
	$scope.deselectRow=function(component){
		for(var i in $scope.filteredData){
			if($scope.filteredData[i].terminalId==component.terminalId){
				$scope.filteredData[i].rowSelected=false;
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
