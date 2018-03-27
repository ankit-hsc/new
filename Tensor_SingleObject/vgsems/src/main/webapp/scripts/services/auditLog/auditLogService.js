'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : auditLogService.js
 --	DESCRIPTION   : Service to handle audit log functionalities
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- |	0.1 | 2nd January, 2018   |	AKHILANAND PRASAD			|	initial draft  				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems').service('auditLogService', ['$rootScope', '$window', 'httpService', 'constant', '$localStorage', function ($rootScope, $window, httpService, constant, $localStorage) {
	//var appProperties = $rootScope.appProperties;
	var appProperties = $localStorage.appProperties;
	var uri='data:application/vnd.ms-excel;base64,',
	    template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
	    base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
	    format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
	
	this.fetchAuditLogs = function(pageNo, noOfRecords){
		return httpService.http(appProperties.VGSEMS_PATH_API + constant.RESTURL.AUDIT_LOG + '?pagen=' + pageNo +'&&pagerecord=' + noOfRecords, 'GET', null, "Fetching Audit Logs");
	}
	
	this.tableToExcel = function(tableId, worksheetName){
		var table = $(tableId),
        ctx = {worksheet: worksheetName, table: table.html()},
        href = uri + base64(format(template, ctx));
		
		return href;
	}
}]);
