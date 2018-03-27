'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : currentAlarmService.js
 --	DESCRIPTION   : Service to handle current alarm page functionalities
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- |	0.1 | 30th November, 2017   |	Suresh Ungarala			|	initial draft  				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .service('currentAlarmService', ['$rootScope', 'httpService', 'constant', '$localStorage', function ($rootScope, httpService, constant, $localStorage) {
	  //var appProperties = $rootScope.appProperties;
	  var appProperties = $localStorage.appProperties;
	  
	 this.fetchActiveAlarms=function(){
		 return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.ACTIVE_ALARMS,'GET', null, "Fetching list of all active alarms");
	 }
	  
	 this.forceClearAlarm = function(activeAlarmIds){
		  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.ACTIVE_ALARMS,'DELETE', activeAlarmIds, "Clearing alarm(s)");
	  }
	 this.fetchArchivedAlarms=function(pageNo, noOfRecords){
			 return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.RECENT_ALARMS + '?pagen=' + pageNo +'&&pagerecord=' + noOfRecords,'GET', null, "Fetching list of all archieved alarms");
	 }
	 this.formatDate=function(date){
		 return moment(new Date(Math.round(date))).format('YYYY/MM/DD HH:mm:ss');
	 }
}]);
