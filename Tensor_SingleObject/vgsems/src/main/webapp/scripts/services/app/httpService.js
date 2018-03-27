'use strict';

/*
 ********************************************************************************************************************
 -- FILENAME      : httpService.js
 --	DESCRIPTION   : Common service to send http requests and handle error scenarios for whole application
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- -----------------------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    			|	Reason for Changes									 |
 -- -----------------------------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 	| Suresh Ungarala 		| initial draft 										|
 --	-----------------------------------------------------------------------------------------------------------------
 --
 *********************************************************************************************************************
 */

angular.module('vgsems').service('httpService', ['$q', '$mdDialog', '$http', '$rootScope', '$localStorage', '$location', 'constant', '$mdToast', 'utilityService', function($q, $mdDialog, $http, $rootScope, $localStorage, $location, constant, $mdToast, utilityService) {

	var httpservice = this;
	
	this.http = function(url, method, data, loadingTitle, displayMessage) {
		
		var requestData = new Object();
		requestData.url = url;
		requestData.method  = method;
		requestData.data  = data;
		requestData.loadingTitle  = loadingTitle;
		requestData.displayMessage  = displayMessage;
		
		var deferred = $q.defer();
		$http.defaults.headers.common.Authorization=$localStorage.access_token;
		initializeRequest(loadingTitle, displayMessage);
		
		$http({
			'url' : url.indexOf('?')>-1 ? url: url+'?cd='+(new Date()).getTime(),
			'method' : method,
			'data' : data,
			'headers': { 'Content-Type': 'application/json' },
		}).then(function successCallback(response) {
			var output = promiseSuccess(response, displayMessage, loadingTitle,method);
			if(null == output){
				deferred.reject();
			}else{
				deferred.resolve(output);
			}
		}, function errorCallback(response) {
			promiseFailure(response, requestData, loadingTitle).then(function(output){
				deferred.resolve(output);
			},function(){
				deferred.reject();
			});
		});
		return deferred.promise;
	}
	
	this.httpFileDownload = function(url, method, data, loadingTitle, displayMessage,filename) {
		var deferred = $q.defer();
		$http.defaults.headers.common.Authorization=$localStorage.access_token;
		var promise = $http({
			'url':url+'?cd='+(new Date()).getTime(), 
			'method' : method,
			'data' : data,
			'withCredentials':false,
			'headers': { 'Content-Type': undefined },
			'transformRequest': angular.identity,
			'responseType':'arraybuffer'
		}).success(function(data, status, headers, config,response) {
			var blob=new Blob([data],{type:'application/vmd.ms-excel'});
			var url=URL.createObjectURL(blob);
			var link=document.createElement('a');
			link.href=url;
			link.target='_blank';
			link.download=filename;
			document.body.appendChild(link);
			link.click();
			deferred.resolve(status);
		  }).
		  error(function(data, status, headers, config) {
			  console.error(status);
			  deferred.reject(status);
		  });
		return deferred.promise;
	}
	
	
	this.httpFileUpload = function(url, method, data, loadingTitle, displayMessage) {
		var deferred = $q.defer();
		$http.defaults.headers.common.Authorization=$localStorage.access_token;
		initializeRequest(loadingTitle, displayMessage);
		$http({
			'url' : url+'?cd='+(new Date()).getTime(),
			'method' : method,
			'data' : data,
			'withCredentials':false,
			'headers': { 'Content-Type': undefined },
			'transformRequest': angular.identity
			
		}).then(function successCallback(response) {
			var output = promiseSuccess(response, displayMessage, loadingTitle,method);
			if(null == output){
				deferred.reject();
			}else{
				deferred.resolve(output);
			}
		}, function errorCallback(response) {
			promiseFailure(response, data, loadingTitle).then(function(output){
				deferred.resolve(output);
			},function(){
				deferred.reject();
			});
		});
		return deferred.promise;
	}
	
	this.setMessages = function(successMessage,errorMessage){
		$rootScope.successMessage = successMessage;
		$rootScope.errorMessage = errorMessage;
	};
	
	function initializeRequest(loadingTitle, displayMessage){
		/*if(false!=displayMessage){
			$rootScope.successMessage = "";
			$rootScope.errorMessage = "";
		}*/
		if(loadingTitle && null!=loadingTitle){
			$rootScope.loadingTitle = loadingTitle;
			$mdDialog.cancel();
			$mdDialog.show({
				templateUrl : 'views/popups/loadingPage.html',
				parent : angular.element(document.body),
				scope:$rootScope,
				preserveScope : true
			});
		}
	}
	
	function promiseSuccess(response, displayMessage, loadingTitle,method){
		if(loadingTitle && null!=loadingTitle){
			$mdDialog.cancel();
		}
		if(constant.STATUS.SUCCESS == response.data.status){
			if(false!=displayMessage){
				$rootScope.errorMessage = "";
				if(method.toUpperCase()!=constant.METHOD.HTTP_GET){
					$rootScope.successMessage = utilityService.getErrorMessageHTML(response.data.message);
				}
			}
			return response.data.data;
		}else{
			if(false!=displayMessage){
				$rootScope.successMessage = "";
				$rootScope.errorMessage = utilityService.getErrorMessageHTML(response.data.message);
			}
			return null;
		}
	}
	
	function promiseFailure(response, requestData, loadingTitle){
		if(loadingTitle && null!=loadingTitle){
			$mdDialog.cancel();
		}
		var deferredFail = $q.defer();
		if (response.status == 400) {
				$rootScope.errorMessage = "Bad Request. Please check url and hit again.";
				deferredFail.reject();
		} else if (response.status == 401) {
			resetLogin();
			$mdToast.show(
				      $mdToast.simple()
				        .textContent('Authentication Error.')
				        .hideDelay(3000).position('bottom right')
				        .theme('warning')
				    );
			deferredFail.reject();
		} else if (response.status == 403) {
			resetLogin();
			$mdToast.show(
				      $mdToast.simple()
				        .textContent('Access Denied.')
				        .hideDelay(3000).position('bottom right')
				        .theme('warning')
				    );
			deferredFail.reject();
		} else if (response.status == 405) {
			$rootScope.errorMessage = "Method sent with header is not allowed. Check acceptable header and try again.";
			deferredFail.reject();
		} else if (response.status == 406) {
			$rootScope.errorMessage = "Response content not acceptable. Check acceptable header and try again.";
			deferredFail.reject();
		} else if (response.status == 407) {
			resetLogin();
			$mdToast.show(
				      $mdToast.simple()
				        .textContent('Proxy Authentication Error. Please Sign In again.')
				        .hideDelay(3000).position('bottom right')
				        .theme('warning')
				    );
			deferredFail.reject();
		} else if (response.status == 408) {
			$rootScope.errorMessage = "Bad request. Please check url and hit again.";
			deferredFail.reject();
		} else if (response.status == 413) {
			$rootScope.errorMessage = "Request entity is too large. Check acceptable header and try again.";
			deferredFail.reject();
		} else if (response.status == 414) {
			$rootScope.errorMessage = "Request URI is too large. Check acceptable header and try again.";
			deferredFail.reject();
		} else if (response.status == 415) {
			$rootScope.errorMessage = "Unsupported media type. Check acceptable header and try again.";
			deferredFail.reject();
		} else if (response.status == 500) {
			$rootScope.errorMessage = "Internal Server Error.";	
			deferredFail.reject();
		} else if (response.status == 502) {
			$rootScope.errorMessage = "Bad Gateway. Please try again after some time.";
			deferredFail.reject();
		} else if (response.status == 503) {
			$rootScope.errorMessage = "Server overloaded. Please try again after some time.";
			deferredFail.reject();
		} else if (response.status == 504) {
			$rootScope.errorMessage = "Gateway request timedout. Please try again after some time.";
			deferredFail.reject();
		} else if (response.status == 505) {
			$rootScope.errorMessage = "HTTP version not supported. Please check server configuration.";
			deferredFail.reject();
		}
		return deferredFail.promise;
	}
	
	function resetLogin(){
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
