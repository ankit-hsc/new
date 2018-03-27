'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : commChannel.js -- DESCRIPTION : Controller to configure Communication channel(s)
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 4th December, 2017 | Suresh Ungarala  | initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('CommChannelconfigCtrl',['$scope', '$controller', 'ConfigService', 'constant',function($scope, $controller, ConfigService, constant) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$controller('callDetailDialogCtrl', {$scope: $scope});
	
	$scope.init = function(click) {
		$scope.selected = [];
		$scope.beamIds=[];
		$scope.commChannelData=[];
		ConfigService.fetchBeamIdList().then(function(data){
			$scope.beamIds=data;
			if(null!=data){
				$scope.getCommChannelData($scope.beamIds[0][0]);
			}
			$scope.statusMap=[];
		});
	};		
	
	$scope.getCommChannelData=function(beamId){
		$scope.onPaginate();
		ConfigService.fetchCommChannelsForBeamId(beamId).then(function(data){
			$scope.commChannelData = data.data;
			$scope.statusMap=data.listMap['status'];
		});
	};

	$scope.getRelevantStatus=function(status){
		return ConfigService.getRelevantCommChannelStatus(status);
	};
	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to update the selected Communication Channel(s) configuration?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.updateCommChannelConfigData=function(){
		ConfigService.updateCommChannel($scope.beamId,$scope.selected).then(function(response){
			$scope.selected=[];
			$scope.getCommChannelData($scope.beamId);
		});
	};
	$scope.showCallDetails=function(callId){
		ConfigService.fetchCallDetailsByCallId(callId).then(function(data){
			$scope.showDialog(data);
		});
	};
	$scope.okConfirm = function() {
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
			delete $scope.selected[i].rowSelected;
		}
		$scope.updateCommChannelConfigData();
	};
	$scope.selectRow=function(component){
		for(var i in $scope.commChannelData){
			if($scope.commChannelData[i].commChId==component.commChId){
				$scope.commChannelData[i].rowSelected=true;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	};
	$scope.deselectRow=function(component){
		for(var i in $scope.commChannelData){
			if($scope.commChannelData[i].commChId==component.commChId){
				$scope.commChannelData[i].rowSelected=false;
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
