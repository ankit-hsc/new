'use strict';

/*
 ***********************************************************************************************************
 -- FILENAME      : homeService.js
 --	DESCRIPTION   : Service to handle home page functionalities
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- --------------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes						|
 -- --------------------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 	| Suresh Ungarala 			| initial draft 							|
 --	--------------------------------------------------------------------------------------------------------
 --
 ************************************************************************************************************
 */

angular.module('vgsems')
  .service('homeService', ['$rootScope', '$localStorage', 'httpService', 'constant', function ($rootScope, $localStorage, httpService, constant) {
	  //var appProperties = $rootScope.appProperties;
	  var appProperties = $localStorage.appProperties;
	  
	  this.getHomeData = function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.HOME_PAGE,'GET', null);
	}
	
	this.getDashboardStats = function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.DASHBOARD_STATS,'GET', null, "Fetching Service Details");
	  }
	  
	this.getBeamMapData = function(){
		return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.BEAM_MAP_DATA,'GET', null, "Fetching Map Data");
	}
}]);
