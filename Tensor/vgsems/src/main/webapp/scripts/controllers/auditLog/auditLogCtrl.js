'use strict';

/*
 * ********************************************************************************************** 
 * -- FILENAME : auditLogCtrl.js 
 * -- DESCRIPTION : Controller to handle audit logs
 * -- Copyright : Copyright (c) 2017.
 * -- Company : ISRO. 
 * -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION	| Date 				  | Author 			| Reason for Changes 							|
 * --------------------------------------------------------------------------------------------- -- |
 * | 0.1 	| 2nd January, 2018   | AKHILANAND PRASAD | initial draft 								|						
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */

angular.module('vgsems').controller('AuditLogCtrl', ['$scope', '$timeout', '$controller', 'auditLogService',function($scope, $timeout, $controller, auditLogService) {
	$controller('paginationCtrl', {$scope: $scope})
	$scope.totalRecords = 0;
	$scope.init = function(){
		$scope.fetchAuditRecords($scope.datatableObj.defaultPage, $scope.datatableObj.limit);
	};
	
	$scope.exportToExcel=function(tableId){
        var exportHref=auditLogService.tableToExcel(tableId,'WireWorkbenchDataExport');
        $timeout(function(){
        	//location.href=exportHref;
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = 'AuditLogs';
            a.target = '_blank';
            a.click();
    	},100);
    };
	
    $scope.fetchAuditRecords = function(pageNo, noOfRecords){
		auditLogService.fetchAuditLogs(pageNo, noOfRecords).then(function(res){
			$scope.auditRecords = res.auditList;
			$scope.totalRecords = res.count;
		})
	}
	
	$scope.init();
}]);


