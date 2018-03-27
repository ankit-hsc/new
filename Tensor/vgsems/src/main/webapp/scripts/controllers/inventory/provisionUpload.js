'use strict';

/*
 * ********************************************************************************************** --
 * FILENAME : provisionUpload.js -- DESCRIPTION : Controller to upload provision docs
 * configuration and data -- -- Copyright : Copyright (c) 2017. --
 * Company : ISRO. -- -- Revision History --
 * --------------------------------------------------------------------------------------------- --
 * |VERSION| Date                | Author      		| Reason for Changes | --
 * --------------------------------------------------------------------------------------------- -- |
 * 0.1     | 5th December, 2017 | Suresh Ungarala  | initial draft       | --
 * --------------------------------------------------------------------------------------------- --
 * ***********************************************************************************************
 */
angular.module('vgsems').controller('provisionCtrl',['$scope', '$controller', 'InventoryService','$timeout','constant',function($scope, $controller, InventoryService,$timeout,constant) {

$scope.init=function(){
	$scope.freqFiles=[];
	$scope.terminalFiles=[];
	$scope.inventoryFiles=[];
};
$scope.browse=function(id){
	$timeout(function(){
		document.getElementById(id).click();
	},100);
};
var validateFileExtension=function(file){
	var nameArr=file.split(".");
	if(constant.PROPERTIES.XLS_EXTN==nameArr[nameArr.length-1].toUpperCase() || constant.PROPERTIES.XLSX_EXTN==nameArr[nameArr.length-1].toUpperCase())return true;
	return false;
}
var validateFileSize=function(file){
	if(Math.round(constant.PROPERTIES.MAX_FILE_SIZE)>=file.size*1024*1024)return true;
	return false;
}
$scope.uploadFreqFiles=function(){
	var file=$scope.freqFiles[0];
	InventoryService.uploadProvisionFreq(file).then(function(file){
		console.log('Uploaded successfully (freq)');
	});
};
$scope.uploadTerminalFiles=function(){
	InventoryService.uploadProvisionTerminal($scope.terminalFiles[0]).then(function(data){
		console.log('Uploaded successfully (terminal)');
	});
};
$scope.uploadInventoryFiles=function(){
	InventoryService.uploadProvisionInventory($scope.inventoryFiles[0]).then(function(data){
		console.log('Uploaded successfully (inventory)');
	});
};
$scope.downloadFreqData=function(){
	InventoryService.downloadProvisionFreq();
};
$scope.downloadTerminalData=function(){
	InventoryService.downloadProvisionTerminal();
};
$scope.downloadInventoryData=function(){
	InventoryService.downloadProvisionInventory();
};
$scope.init();
}]);