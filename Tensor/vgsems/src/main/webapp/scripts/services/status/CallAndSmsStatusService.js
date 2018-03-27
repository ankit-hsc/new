'use strict';
/*
 ***********************************************************************************************
 -- FILENAME      : CallAnsSmsService.js
 --	DESCRIPTION   : Service to handle Status Details
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- |	0.1 | 30th November , 2017  |	Suresh Ungarala			|	Initial draft  				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .service('CallAnsSmsStatusService', ['$rootScope', '$localStorage', 'httpService', 'constant', function ($rootScope, $localStorage, httpService, constant) {
	  //var appProperties = $rootScope.appProperties;
	  var appProperties = $localStorage.appProperties;
	  
	  this.formatDate=function(date){
		  return moment(new Date(Math.round(date))).format('YYYY/MM/DD HH:mm:ss');
	  }
	  
	  this.fetchActiveCallsData=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.ACTIVE_CALLS,'GET',null,'Fetching list of Active call(s)');
	  }
	  this.clearActiveCall=function(activeCallId){
			  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.CLEAR_ACTIVE_CALL+activeCallId,'PUT', activeCallId, "Clearing Active call");
	  }
	  this.fetchRecentCallsData=function(date){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.RECENT_CALLS + '?date=' + date,'GET',null,'Fetching list of Recent call(s)');
	  }
	  this.fetchSmsData=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.SMS_STATUS,'GET',null,'Fetching list of SMS(s)');
	  }
	  this.fetchCallDetailsByCallId=function(callId){
		  	return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.ACTIVE_CALL_BY_ID+callId,'GET', null, "Fetching Call Details");
	  }
}]);
