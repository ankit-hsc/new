'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : terminalDetailPopUpCtrl.js
 --	DESCRIPTION   : Controller to handle confirm prompts in ISRO
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 02th February, 2017   | Suresh Ungarala           | initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .controller('terminalDetailPopUpCtrl', ['$scope', '$mdDialog','constant','ConfigService',function ($scope, $mdDialog,constant,ConfigService) {
	  $scope.showPopUp=function(terminalId){
		  $mdDialog.show({
			  controller: DialogController,
			  parent:angular.element(document.body),
			  template:'<md-dialog arail-label="Call Details" style="width: 35vw;">'+
				  				'<form ng-cloak style="font-family: sans-serif">'+
							     ' <div style="background-color:#158bd3;max-height:55px;">'+
							      '  <h3 style="color:white;padding-left:10px;">Terminal Details</h3>'+
							      '</div>'+
							    '<md-dialog-content>'+
							    '	<div class="md-dialog-content" layout="column" style="font-family: sans-serif;">'+
							    '	<div style="display:flex;justify-content:center;">'+
							    '			<md-input-container>'+
								'				<label> Date </label>'+
								'				<md-select ng-model="date" ng-change="fetchTerminalCallDetails('+terminalId+')" >'+
								'				<md-option ng-value="date" ng-repeat="date in dates" ng-selected="$first">{{date}}</md-option>'+
								'				</md-select>'+
								'			</md-input-container>'+
								    '</div>'+
								    '<br/>'+
								    '<fieldset>'+
								    '		<legend><b>Call Details</b></legend>'+
								    '	<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">SMR-PSTN</span>'+
							    	'		<span flex="40">{{(null!=popUpData && null!=popUpData.callerNumber ? popUpData.callerNumber : "-")}}</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">PSTN-SMR</span>'+
							    	'		<span flex="40">{{(null!=popUpData && null!=popUpData.callerBeamId ? popUpData.callerBeamId :"-")}}</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">SMR-SMR</span>'+
							    	'		<span flex="40">{{(null!=popUpData && null!=popUpData.callerFreqPairId ? popUpData.callerFreqPairId : "-")}}</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Success Count</span>'+
							    	'		<span flex="40">{{(null!=popUpData && null!=popUpData.callerCommChId ? popUpData.callerCommChId : "-")}}</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Failure Count</span>'+
							    	'		<span>{{(null!=popUpData && null!=popUpData.callerModemId ? popUpData.callerModemId : "-")}}</span>'+
							    	'		</div>'+
							    	 '</div'+
							    	 '</fieldset>'+
							    	'</div>'+
							    	'</div>'+
							    '</md-dialog-content>'+
				  			'<md-dialog-actions>'+
				  			'	<md-button class="md-raised md-primary" ng-click="hide()">Close</md-button>'+
				  			'</md-dialog-actions>'+
				  			'</form>'+
				  		'</md-dialog>',
				  		clickOutsideToClose :true
		  });
		  function DialogController($scope, $mdDialog,ConfigService) {
			  $scope.dates=[];
			  $scope.popUpData={};
				var sysDate=new Date().getTime();
				for(var i=0;i<7;i++){
					$scope.dates.push(moment(new Date(sysDate-(i*86400*1000))).format(constant.SOFTWARE.STATISTICS_DATE_FORMAT));
				}
			    $scope.hide = function() {
			      $mdDialog.hide();
			    };
			    $scope.fetchTerminalCallDetails=function(terminalId){
			    	ConfigService.fetchTerminalPopUpDetails(terminalId,$scope.date).then(function(data){
			    		$scope.popUpData=data;
			    	});
			    };
		  };
	  };
	  $scope.closeCallDialog=function(){
		$mdDialog.hide();
	  };
  }]);