'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : callDetailDialogCtrl.js
 --	DESCRIPTION   : Controller to handle confirm prompts in ISRO
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 28th December, 2017   | Suresh Ungarala           | initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .controller('callDetailDialogCtrl', ['$scope', '$mdDialog','$rootScope',function ($scope, $mdDialog,$rootScope) {
	  $scope.showDialog=function(callData){
		  $mdDialog.show({
			  controller: DialogController,
			  parent:angular.element(document.body),
			  template:'<md-dialog arail-label="Call Details" style="width: 35vw;min-height:92vh;">'+
				  				'<form ng-cloak style="font-family: sans-serif">'+
							     ' <div style="background-color:#158bd3;max-height:55px;">'+
							      '  <h3 style="color:white;padding-left:10px;">Call Details</h3>'+
							      '</div>'+
							    '<md-dialog-content>'+
							    '	<div class="md-dialog-content" layout="column" style="font-family: sans-serif;">'+
							    '	<div>'+
							    '			<div layout="row" flex layout-align="start start">'+
								 '   		<span flex="60">Call ID</span>'+
								  '  		<span flex="40">'+callData.callId+'</span>'+
								   ' 		</div>'+
								    '</div'+
								    '<div>'+
								    '		<div layout="row" flex layout-align="start start">'+
								    '		<span flex="60">Call Start Time</span>'+
								    '		<span flex="40">'+moment(new Date(Math.round(callData.dateTime))).format('YYYY/MM/DD HH:mm:ss')+'</span>'+
								    		
								    '</div>'+
								    '<br/>'+
								    '<fieldset>'+
								    '		<legend><b>Calling User</b></legend>'+
								    '	<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Number</span>'+
							    	'		<span flex="40">'+callData.callerNumber+'</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Beam ID</span>'+
							    	'		<span flex="40">'+(null!=callData.callerBeamId ? callData.callerBeamId :'-')+'</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Signal Channel Freq Pair ID</span>'+
							    	'		<span flex="40">'+callData.callerFreqPairId+'</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Communication Channel ID</span>'+
							    	'		<span flex="40">'+callData.callerCommChId+'</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Communication Modem ID</span>'+
							    	'		<span>'+callData.callerModemId+'</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">PSTN Port ID</span>'+
							    	'		<span flex="40">'+callData.callerPstnPortId+'</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Server IP Address</span>'+
							    	'		<span flex="40">'+callData.callerServerIp+'</span>'+
							    	'		</div>'+
							    	 '</div'+
									    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Initial Signal Strength</span>'+
							    	'		<span flex="40">'+callData.callerSignalLength+'</span>'+
							    	'		</div>'+
							    	 '</div>'+
							    	 '</fieldset>'+
							    	'		<br/>'+
							    	 '<fieldset>'+
							    	'		<legend><b>Callee User</b></legend>'+
							    	 '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Number</span>'+
							    	'		<span flex="40">'+callData.calleeNumber+'</span>'+
							    	'		</div>'+
							    	'</div'+
								    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Beam ID</span>'+
							    	'		<span flex="40">'+(null!=callData.calleeBeamId ? 'callData.calleeBeamId' : '-')+'</span>'+
							    	'		</div>'+
							    	'</div'+
								    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Signal Channel Freq Pair ID</span>'+
							    	'		<span flex="40">'+callData.calleeFreqPairId+'</span>'+
							    	'		</div>'+
							    	'</div'+
								    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Communication Channel ID</span>'+
							    	'		<span flex="40">'+callData.calleeCommChId+'</span>'+
							    	'		</div>'+
							    	'</div'+
								    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Communication Modem ID</span>'+
							    	'		<span flex="40">'+callData.calleeModemId+'</span>'+
							    	'		</div>'+
							    	'</div'+
								    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">PSTN Port ID</span>'+
							    	'		<span>'+callData.calleePstnPortId+'</span>'+
							    	'		</div>'+
							    	'</div'+
								    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Server IP Address</span>'+
							    	'		<span flex="40">'+callData.calleeServerIp+'</span>'+
							    	'		</div>'+
							    	'</div'+
								    '<div>'+
							    	'		<div layout="row" flex layout-align="start start">'+
							    	'		<span flex="60">Initial Signal Strength</span>'+
							    	'		<span flex="40">'+callData.calleeSignalLength+'</span>'+
							    	'		</div>'+
							    	'</div'+
							    	 '</fieldset>'+
							    	'	</div>'+
							    	'</div>'+
							    '</md-dialog-content>'+
				  			'<md-dialog-actions>'+
				  			'	<md-button class="md-raised md-primary" ng-click="hide()">Close</md-button>'+
				  			'</md-dialog-actions>'+
				  			'</form>'+
				  		'</md-dialog>',
				  		clickOutsideToClose :true
		  });
		  function DialogController($scope, $mdDialog) {
			    $scope.hide = function() {
			      $mdDialog.hide();
			    };
			    $scope.formatDate=function(date){
					  return moment(new Date(Math.round(date))).format('YYYY/MM/DD HH:mm:ss');
				};
		  };
	  };
	  $scope.closeCallDialog=function(){
		$mdDialog.hide();
	  };
  }]);