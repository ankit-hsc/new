'use strict';
/*
 ***********************************************************************************************
 -- FILENAME      : InventoryService.js
 --	DESCRIPTION   : Service to handle Inventory details
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- |	0.1 | 4th December , 2017  |	Suresh Ungarala			|	added for sig modem			|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .service('ConfigService', ['$rootScope', '$localStorage', 'httpService', 'constant', function ($rootScope, $localStorage, httpService, constant) {
	  //var appProperties = $rootScope.appProperties;
	  var appProperties = $localStorage.appProperties;
	  
	  this.getRelevantBeamStatus=function(status){
		  var statusArr=[];
			statusArr.push(status);
			if(status!='Blocked'){
				statusArr.push('Blocked');
			}
			return statusArr;
	  }
	  this.getRelevantCommChannelStatus=function(status){
		  var statusArr=[];
			statusArr.push(status);
			if(status=='Allocated'){
				statusArr.push('Free');
				statusArr.push('Blocked');
			}else if(status=='Free'){
				statusArr.push('Blocked');
			}
			return statusArr;
	  }
	  this.getRelevantTerminalStatus=function(status){
		  var statusArr=[];
			statusArr.push(status);
			if(status=='Busy'){
				statusArr.push('Free');
				statusArr.push('Blocked');
			}else if(status=='Free'){
				statusArr.push('Blocked');
			}
			//might have some else case
			return statusArr;
	  }
	  this.fetchBeamData=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.BEAM,'GET',null,'Fetching list of all Beam(s)');
	  }
	  this.updateBeam=function(beamConfigData){
			  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.BEAM,'PUT', beamConfigData, "Updating Beam(s) configuration");
	  }
	  this.fetchBeamIdList=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.BEAM_COMM_CHANNEL,'GET',null,'Fetching list of All Beam Ids');
	  }
	  this.fetchCommChannelsForBeamId=function(beamId){
		  var url=constant.RESTURL.COMM_CHANNEL;
		  url=url.replace(':beamId',beamId);
		  return httpService.http(appProperties.VGSEMS_PATH_API+url,'GET',null,'Fetching list of all Communication channel(s)');
	  }
	  this.updateCommChannel=function(beamId,commChannelConfigData){
		  var url=constant.RESTURL.COMM_CHANNEL;
		  url=url.replace(':beamId',beamId);
		  return httpService.http(appProperties.VGSEMS_PATH_API + url,'PUT', commChannelConfigData, "Updating Communication Channel(s) configuration");
	  }
	  this.fetchOrgnztnData=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.ORG_TERMINAL,'GET',null,'Fetching list of all Organization(s)/Group(s)');
	  }
	  this.fetchterminalsForOrgId=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.GET_TERMINALS,'GET',null,'Fetching list of all Terminal(s)');
	  }
	  this.updateTerminals=function(terminals){
			  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.GET_TERMINALS,'PUT', terminals, "Updating Terminal(s) configuration");
	  }
	  this.fetchCallDetailsByCallId=function(callId){
		  	return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.ACTIVE_CALL_BY_ID+callId,'GET', null, "Fetching Call Details");
	  }
	  this.fetchTerminalPopUpDetails=function(terminalId,date){
		  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.TERMINAL_CALL_DETAIL+"?terminalId="+terminalId+"&&date="+date,'GET', null, "Fetching Terminal-Call Details");
	  }
}]);
