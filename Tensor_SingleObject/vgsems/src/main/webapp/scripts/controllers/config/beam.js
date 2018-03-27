'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : Beam.js -- DESCRIPTION : Controller to configure Beam(s)
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 4th December, 2017 | Suresh Ungarala  	| initial draft      | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('BeamConfigCtrl',['$scope', '$controller', 'ConfigService', 'constant',function($scope, $controller, ConfigService, constant) {
	
	$controller('confirmPromptCtrl', {$scope: $scope});
	$scope.init = function(click) {
		$scope.selected = [];
		$scope.beamData=[];
		$scope.statusMap=[];
		$scope.getBeamData();
	};		
	
	
	$scope.getBeamData=function(){
		ConfigService.fetchBeamData().then(function(data){
			if(data.data && data.data.length!=Math.round(constant.PROPERTIES.ZERO)){
				$scope.beamData = data.data;
				if($scope.beamData.length!=Math.round(constant.PROPERTIES.ZERO)){
					$scope.statusMap=data.listMap['status'];
				}
			}
			angular.forEach(data.data, function(value, key) {
			  if(value.listSigChannel[0]){
				  value.listSigChannel[0].modId = value.listSigChannel[0].modId == 0 ? '' : value.listSigChannel[0].modId;
				  value.listSigChannel[0].demodId = value.listSigChannel[0].demodId == 0 ? '' : value.listSigChannel[0].demodId;
			  }
			});
		});
	};

	$scope.showConfirm = function() {
		var confirmMsg = "Are you sure you want to update the selected Beam(s) configuration?";
		$scope.confirmPrompt(confirmMsg);
	}
	$scope.updateBeamConfigData=function(){
		ConfigService.updateBeam($scope.selected).then(function(response){
			$scope.selected=[];
			$scope.getBeamData();
		});
	}
	$scope.okConfirm = function() {
		for(var i in $scope.selected){
			$scope.selected[i].status=$scope.selected[i].statusSelected;
			delete $scope.selected[i].statusSelected;
			delete $scope.selected[i].rowSelected;
		}
		$scope.updateBeamConfigData();
	};
	$scope.selectRow=function(component){
		for(var i in $scope.beamData){
			if($scope.beamData[i].beamId==component.beamId){
				$scope.beamData[i].rowSelected=true;
				break;
			}
		}
		if(!$scope.$$phase){
			$scope.$apply();
		}
	};
	$scope.deselectRow=function(component){
		for(var i in $scope.beamData){
			if($scope.beamData[i].beamId==component.beamId){
				$scope.beamData[i].rowSelected=false;
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
