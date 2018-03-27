'use strict';
/*
 ***********************************************************************************************
 -- FILENAME      : statisticsService.js
 --	DESCRIPTION   : Service to fetch hourly statistics data
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- |	0.1 | 12th December , 2017  |	Suresh Ungarala			|	added for Statistics			|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .service('StatisticsService', ['$rootScope', '$localStorage', 'httpService', 'constant', function ($rootScope, $localStorage, httpService, constant) {
	  //var appProperties = $rootScope.appProperties;
	  var appProperties = $localStorage.appProperties;
	  this.fetchStatData=function(date){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.STATISTICS+date,'GET',null,'Fetching hourly statistics data.');
	  }
  }]);