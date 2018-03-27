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
 -- |	0.1 | 29th November , 2017  |	Suresh Ungarala			|	added for sig modem			|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .service('InventoryService', ['$rootScope', '$localStorage', 'httpService', 'constant', function ($rootScope, $localStorage, httpService, constant) {
	  //var appProperties = $rootScope.appProperties;
	  var appProperties = $localStorage.appProperties;
	  
	  this.formatDate=function(date){
		  return moment(new Date(Math.round(date))).format('YYYY/MM/DD HH:mm:ss');
	  }
	  this.formatDateForFileName=function(){
		  return moment(new Date()).format(constant.SOFTWARE.FILE_NAME_DATE_FORMAT);
	  }
	 
	  this.getRelevantStatus=function(status){
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
	  this.fetchSigModems=function(){
		  
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.SIG_MODEM,'GET',null,'Fetching list of all sig modems');
	  }
	  this.updateSigModems=function(sigModemConfigData){
			  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.SIG_MODEM,'PUT', sigModemConfigData, "Updating SIG Modem(s) configuration");
	  }
	  this.fetchCommModems=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.COMM_MODEM,'GET',null,'Fetching list of all Communication modems');
	  }
	  this.updateCommModems=function(commModemConfigData){
			  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.COMM_MODEM,'PUT', commModemConfigData, "Updating Communication Modem(s) configuration");
	  }
	  this.fetchPstnData=function(){
		  return httpService.http(appProperties.VGSEMS_PATH_API+constant.RESTURL.PSTN,'GET',null,'Fetching list of all PSTN(s)');
	  }
	  this.updatePstn=function(pstnData){
			  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.PSTN,'PUT', pstnData, "Updating PSTN(s) configuration");
	  }
	  this.uploadProvisionFreq=function(file){
		  var formData=new FormData();
			  formData.append("file",file);
		  return httpService.httpFileUpload(appProperties.VGSEMS_PATH_API + constant.RESTURL.PROVISION_FREQ,'POST', formData, "Uploading Provisioning Frequency Data");
	  }
	  this.uploadProvisionTerminal=function(file){
		  var formData=new FormData();
			  formData.append("file",file);
		  return httpService.httpFileUpload(appProperties.VGSEMS_PATH_API + constant.RESTURL.PROVISION_TERMINAL,'POST', formData, "Uploading Provisioning Terminal Data");
	  }
	  this.uploadProvisionInventory=function(file){
		  var formData=new FormData();
			  formData.append("file",file);
		  return httpService.httpFileUpload(appProperties.VGSEMS_PATH_API + constant.RESTURL.PROVISION_INVENTORY,'POST', formData, "Uploading Provisioning Inventory Data");
	  }
	  this.downloadProvisionFreq=function(){
		  var filename='_'+this.formatDateForFileName()+'.'+constant.PROPERTIES.XLSX_EXTN.toLowerCase();
		  return httpService.httpFileDownload(appProperties.VGSEMS_PATH_API+constant.RESTURL.DWLND_PROVISION_FREQ,'GET',null,'Downloading Provision Frequency Data',null,constant.PROPERTIES.FREQ_FILE_NAME+filename);
	  }
	  this.downloadProvisionTerminal=function(){
		  var filename='_'+this.formatDateForFileName()+'.'+constant.PROPERTIES.XLSX_EXTN.toLowerCase();
		  return httpService.httpFileDownload(appProperties.VGSEMS_PATH_API+constant.RESTURL.DWLND_PROVISION_TERMINAL,'GET',null,'Downloading Provision Terminal Data',null,constant.PROPERTIES.TERMINAL_FILE_NAME+filename);
	  }
	  this.downloadProvisionInventory=function(){
		  var filename='_'+this.formatDateForFileName()+'.'+constant.PROPERTIES.XLSX_EXTN.toLowerCase();
		  return httpService.httpFileDownload(appProperties.VGSEMS_PATH_API+constant.RESTURL.DWLND_PROVISION_INVENTORY,'GET',null,'Downloading Provision Inventory Data',null,constant.PROPERTIES.INVENTORY_FILE_NAME+filename);
	  }
	  this.locateSigModem=function(data){
		  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.SIG_MODEM_LOCATE + data,'POST', null, "Locating Signal Modem");
	  }
	  this.locateCommModem=function(data){
		  return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.COMM_MODEM_LOCATE + data,'POST', null, "Locating Communication Modem");
	  }
	  this.fetchCallDetailsByCallId=function(callId){
		  	return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.ACTIVE_CALL_BY_ID+callId,'GET', null, "Fetching Call Details");
	  }
}]);
