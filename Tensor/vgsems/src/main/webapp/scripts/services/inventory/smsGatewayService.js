'use strict';
/*
 ***********************************************************************************************
 -- FILENAME      : SMSGatewayService.js
 --	DESCRIPTION   : Service to handle SmsGateway details.
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
  .service('smsGatewayService', ['$rootScope', '$localStorage', 'httpService', 'constant', function ($rootScope, $localStorage, httpService, constant) {
	  //var appProperties = $rootScope.appProperties;
	  var appProperties = $localStorage.appProperties;
	  
	  this.getRelevantStatus=function(status){
		  var statusArr=[];
			statusArr.push(status);
			if(status!='Blocked'){
				statusArr.push('Blocked');
			}
			return statusArr;
	  }
	  
	  this.fetchSmsGatewayData=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.SMS_GATEWAY,'GET',null,'Fetching list of all SMS Gateway(s)');
	  }
	  this.updateSmsGateway=function(smsGatewayConfigData){
			  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.SMS_GATEWAY,'PUT', smsGatewayConfigData, "Updating SMS Gateway(s) configuration");
	  }
	 
}]);
