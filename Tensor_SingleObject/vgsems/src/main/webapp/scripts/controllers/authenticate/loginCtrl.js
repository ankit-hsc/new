'use strict';

/*
 *******************************************************************************************************
 -- FILENAME      : loginCtrl.js
 --	DESCRIPTION   : Controller to handle login functions and data
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- -----------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes						|
 -- -----------------------------------------------------------------------------------------------------
 -- |	0.1 | 29th November, 2017	|	Suresh Ungarala	 		|	Changes for ISRO						|
 --	-----------------------------------------------------------------------------------------------------
 --
 ********************************************************************************************************
 */

angular.module('vgsems')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$cookies', '$localStorage', '$http', 'loginService', 'constant' , '$timeout', '$window','$interval',
	  function ($rootScope, $scope, $location, $cookies, $localStorage, $http, loginService, constant , $timeout, $window,$interval) {
	 
	//var appProperties = $rootScope.appProperties;
	var appProperties = $localStorage.appProperties;
	$rootScope.enableAllScreen=true;
	$rootScope.disableUnAuthEditGlobal=false;
	if(!$localStorage.access_token){
		$rootScope.showHeaderNavigation = false;
	}
	this.user={username:'',password:'',role:'',groupId:''};
	
	var onReSizeFunc=function(){
		$timeout(function(){
		var elements = document.getElementsByClassName("loginImages");
		var loginFormElem=document.getElementById('loginFormDivId');
		if(null!=loginFormElem){
		    for (var i = 0; i < elements.length; i++) {
		        elements[i].style.height= ((document.documentElement.clientHeight-loginFormElem.clientHeight))+"px";
		     }
		}
		},200);
	};
	$scope.init = function(){
			onReSizeFunc();
			$rootScope.displayName=$localStorage.displayName;
			$rootScope.activeAlarmCount=$localStorage.activeAlarmCount;
			$rootScope.showHeaderNavigation=null!=$localStorage.showHeaderNavigation ? ($localStorage.showHeaderNavigation==0 ? false:true) : false;
			$rootScope.enableAllScreen=null!=$localStorage.enableAllScreen ? ($localStorage.enableAllScreen==0 ? false:true) : false;
			$rootScope.disableUnAuthEditGlobal=null!=$localStorage.disableUnAuthEditGlobal ? ($localStorage.disableUnAuthEditGlobal==0 ? false:true) :true;
		}
	
	
	
	$scope.loginProgress = false;
	
	$scope.errorMessage = constant.MESSAGE.EMPTY;
	
    this.validateUser = function(){
    	
    	this.usernameRequired = appProperties.LOGIN_USERNAME_REQUIRED;
    	this.passwordRequired = appProperties.LOGIN_PASSWORD_REQUIRED;
    	
    	if(null==this.user.username || this.user.username.trim()==''){
    		$scope.errorMessage =this.usernameRequired;
    		onReSizeFunc();
    		return;
    	}else if(null==this.user.password || this.user.password.trim()==''){
    		$scope.errorMessage =this.passwordRequired;
    		onReSizeFunc();
    		return;
    	}else{
    		$scope.errorMessage = constant.MESSAGE.EMPTY;
    		onReSizeFunc();
    	}
    	loginService.validateLogin(this.user)
    	.then(loginSuccess, loginFail);
    	$scope.loginProgress = true;
    	$scope.errorMessage = constant.MESSAGE.EMPTY;
    }
    
    function loginSuccess(data){
    	$scope.loginProgress = false;
    	if(constant.STATUS.SUCCESS == data.data.status){
    		$localStorage.access_token ="Bearer "+ data.data.data;
    		$http.defaults.headers.common.Authorization =$localStorage.access_token;
    		$localStorage.userRole = data.data.role;
    		$localStorage.displayName = data.data.role;
    		$rootScope.displayName =data.data.role;
    		$localStorage.lastLoginTime = loginService.formatDate();
    		$location.path(constant.LOCATIONS.HOME_PAGE);
    		var roles=Object.keys(constant.ROLES);
    		for(var i in roles){
    			if(constant.ROLES[roles[i]]==data.data.role){
    				$rootScope.showHeaderNavigation = true;
    				$localStorage.showHeaderNavigation=1;
    				break;
    			}
    		}
    		if($localStorage.userRole!=constant.ROLES.SUPER_ADMIN && $localStorage.userRole!=constant.ROLES.GROUP_ADMIN){
    			if($localStorage.userRole==constant.ROLES.GROUP_RESTRICTED){
    				$rootScope.enableAllScreen=false;
    				$localStorage.enableAllScreen=0;
    			}
    			$rootScope.disableUnAuthEditGlobal=true;
    			$localStorage.disableUnAuthEditGlobal=1;
    		}else{
    			$rootScope.enableAllScreen=true;
    			$localStorage.enableAllScreen=1;
    			$rootScope.disableUnAuthEditGlobal=false;
    			$localStorage.disableUnAuthEditGlobal=0;
    		}
    		$interval(function(){
    			loginService.getActiveAlarmsCount();
    		},Math.round(appProperties.ALARM_COUNT_REFRESH_PERIOD)*1000);
    		
    	}else{
    		$scope.errorMessage = data.message;
    		onReSizeFunc();
    	}
    }
    function loginFail(){
    	$rootScope.enableAllScreen=false;
    	$scope.loginProgress = false;
    	$rootScope.showHeaderNavigation = false;
    	$rootScope.disableUnAuthEditGlobal=true;
    	$scope.errorMessage = appProperties.ERROR_LOGIN;
    	onReSizeFunc();
    }
    
    this.logOut = function(){
    	loginService.logOut();
    	$scope.loginProgress = false;
    }
    window.addEventListener("resize", onReSizeFunc);
    window.addEventListener('beforeunload',function(){
		loginService.logOut();
	});
    $scope.init();
}]);


