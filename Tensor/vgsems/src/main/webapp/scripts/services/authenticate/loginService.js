'use strict';

/*
 ***********************************************************************************************************************
 -- FILENAME      : loginService.js
 --	DESCRIPTION   : Service to handle login functionalities
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- --------------------------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes									|
 -- --------------------------------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 	| Suresh Ungarala 			| initial draft 										|
 	| 0.2 	| 19th December, 2017 	| Suresh Ungarala 			| Changes for logIn & logOut							|
 --	--------------------------------------------------------------------------------------------------------------------
 --
 ************************************************************************************************************************
 */

angular.module('vgsems')
  .service('loginService',['$http','$rootScope', '$localStorage','$location', 'constant',function($http, $rootScope, $localStorage,$location, constant) {
	  
	  var appProperties;
	  
	  this.appProperties=$http.get(constant.PROPERTIES.MESSAGES).success(function(data) {
		  	$localStorage.appProperties = data;
			$rootScope.releaseNum = data.BUILD_RELEASE;
			appProperties = $localStorage.appProperties;
	    });
	  
	  appProperties = $rootScope.appProperties;
	  this.formatDate=function(){
		  return moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
	  }
	  this.validateLogin = function(user){
		  return $http.post(appProperties.VGSEMS_PATH + constant.RESTURL.LOGIN, user);
	  }
	  this.getActiveAlarmsCount=function(){
		  $http.get(appProperties.VGSEMS_PATH +constant.RESTURL.ACTIVE_ALARM_COUNT+'?cd='+(new Date()).getTime()).success(function(data){
			  $rootScope.activeAlarmCount=data.data;
			  $localStorage.activeAlarmCount=data.data;
	  });
	  }
	this.logOut = function(){
		delete $localStorage.access_token;
		delete $localStorage.userRole;
		delete $localStorage.activeAlarmCount;
		delete $localStorage.showHeaderNavigation;
		delete $localStorage.enableAllScreen;
		delete $localStorage.disableUnAuthEditGlobal;
		
		console.log('resetting localstorage');
		$location.path(constant.LOCATIONS.INIT_LINK);
		$rootScope.enableAllScreen=false;
    	$rootScope.showHeaderNavigation = false;
    	$rootScope.disableUnAuthEditGlobal=true;
	}
}]);

