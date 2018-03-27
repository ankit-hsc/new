'use strict';

/*
 *******************************************************************************************************************
 -- FILENAME      : app.js
 --	DESCRIPTION   : File to create and start the Angular application, configures the
 					routes and also loads properties file
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ----------------------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes								|
 -- ----------------------------------------------------------------------------------------------------------------
 -- |	0.1 | 30th November, 2017  	|	Suresh Ungarala			|	initial draft  									|
 ********************************************************************************************************************
 */
angular
  .module('vgsems', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'ngStorage',
    'md.data.table',
    'angularjs-datetime-picker',
    'ngMaterialDatePicker',
    'ui.mask'
  ])
  .config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, "MM/DD/YYYY", true);
        return m.isValid() ? m.toDate() : new Date(NaN);
      };
	  $mdDateLocaleProvider.formatDate = function(date) {
		  return date ? moment(date).format("MM/DD/YYYY") : null;
	  };
  }).config(['$routeProvider', '$locationProvider','constant',function ($routeProvider, $locationProvider,constant) {
	$locationProvider.hashPrefix('!');
	  
    $routeProvider
      .when('/', {
        templateUrl: 'views/authenticate/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'ctrl',
        resolve:{
        	appProps:function(loginService){
        		return loginService.appProperties;
        	}
        },
        restrictAccess:constant.ROUTES.RESTRICT
      })
      .when('/noaccess', {
          templateUrl: 'views/authenticate/noaccess.html'
       })
	  .when('/home', {
    	templateUrl: 'views/home/dashboard.html',
    	controller: 'DashboardCtrl',
    	restrictAccess:constant.ROUTES.ALLOW
      })
      .when('/currentalarm', {
        templateUrl: 'views/alarm/currentAlarm.html',
        controller: 'CurrentAlarmCtrl',
        restrictAccess:constant.ROUTES.ALLOW
      })
      .when('/alarmhistory', {
        templateUrl: 'views/alarm/alarmHistory.html',
        controller: 'AlarmHistoryCtrl',
        restrictAccess:constant.ROUTES.RESTRICT
        })
      .when('/beamConfig',{
    	  templateUrl:'views/config/beam.html',
    	  controller:'BeamConfigCtrl',
    	  restrictAccess:constant.ROUTES.RESTRICT
      })
      .when('/commChannelconfig',{
    	  templateUrl:'views/config/commChannel.html',
    	  controller:'CommChannelconfigCtrl',
    	  restrictAccess:constant.ROUTES.RESTRICT
      })
      .when('/terminalConfig',{
    	  templateUrl:'views/config/terminal.html',
    	  controller:'terminalConfigCtrl',
    	  restrictAccess:constant.ROUTES.RESTRICT
      })
      .when('/sigModem',{
    	  templateUrl:'views/inventory/sigModem.html',
    	  controller:'SigModemCtrl',
    	  restrictAccess:constant.ROUTES.RESTRICT
      })
      .when('/dataModem',{
    	  templateUrl:'views/inventory/commModem.html',
    	  controller:'CommModemCtrl',
    	  restrictAccess:constant.ROUTES.RESTRICT
      })
      .when('/pstn',{
    	  templateUrl:'views/inventory/pstn.html',
    	  controller:'pstnCtrl',
    	  restrictAccess:constant.ROUTES.ALLOW
      })
      .when('/activeCallStatus',{
    	  templateUrl:'views/status/activeCallsStatus.html',
    	  controller:'activeCallsStatusCtrl',
    	  restrictAccess:constant.ROUTES.RESTRICT
      })
      .when('/recentCallStatus',{
    	  templateUrl:'views/status/recentCallsStatus.html',
    	  controller:'recentCallsStatusCtrl',
    	  restrictAccess:constant.ROUTES.ALLOW
      })
      .when('/smsStatus',{
    	  templateUrl:'views/status/smsStatus.html',
    	  controller:'smsStatusCtrl',
    	  restrictAccess:constant.ROUTES.ALLOW
      })
      .when('/smsGateway',{
    	  templateUrl:'views/inventory/smsGateway.html',
    	  controller:'smsGatewayConfigCtrl',
    	  restrictAccess:'restrict'
      })
      .when('/provision',{
    	  templateUrl:'views/inventory/provisionUpload.html',
    	  controller:'provisionCtrl',
    	  restrictAccess:constant.ROUTES.ALLOW
      })
      .when('/statistics',{
    	  templateUrl:'views/statistics/statistics.html',
    	  controller:'statisticsCtrl',
    	  restrictAccess:constant.ROUTES.ALLOW
      })
	  .when('/auditLog',{
    	  templateUrl:'views/auditLog/auditLogs.html',
    	  controller:'AuditLogCtrl',
    	  restrictAccess:constant.ROUTES.ALLOW
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        restrictAccess:constant.ROUTES.ALLOW
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).config(['$mdThemingProvider',function($mdThemingProvider) {
	  
	  var orangeMap = $mdThemingProvider.extendPalette('orange', {
		    '500': '#f37216'
		  });
	  
	  var lightBlueMap = $mdThemingProvider.extendPalette('blue-grey', {
		    '500': '#158bd3'
		  });
	  
	  $mdThemingProvider.definePalette('orange', orangeMap);
	  $mdThemingProvider.definePalette('lightBlue', lightBlueMap);

	   
	  $mdThemingProvider.theme('default')
	    .primaryPalette('orange')
	    .accentPalette('lightBlue');
	  	  
	  
	}]).run(['$route', '$http', '$rootScope', '$location','$localStorage', 'constant', '$templateCache','$mdToast','loginService',
		function($route, $http, $rootScope, $location,$localStorage, constant, $templateCache,$mdToast,loginService) {
		if(!$localStorage.access_token){
			$rootScope.showHeaderNavigation = false;
		}else if($location.path()!=constant.LOCATIONS.INIT_LINK && $location.path()!=constant.LOCATIONS.EMPTY_LINK){
			$rootScope.showHeaderNavigation = true;
		}
		$rootScope.errorMessage = "";
		$rootScope.headDisplayName="";
		$rootScope.headLoginTime="";

		AmCharts.useUTC = true;
		
		$http.get("views/popups/loadingPage.html", {cache:$templateCache});
		
		$rootScope.$on('$locationChangeStart', function (event, next,current) {
			var path=next.split('#!')[1];
			var routeObj=$route.routes[path];
			$rootScope.successMessage = "";
			$rootScope.errorMessage = "";
			if(constant.LOCATIONS.INIT_LINK!=path){
			if(!routeObj || !$localStorage.access_token || !routeObj.restrictAccess 
					|| !$localStorage.userRole || ($localStorage.userRole==constant.ROLES.GROUP_RESTRICTED && routeObj.restrictAccess!=constant.ROUTES.ALLOW)){
				//loginService.logOut();
				event.preventDefault();
				$location.path(constant.LOCATIONS.INIT_LINK);
			}
			}else{
				delete $localStorage.access_token;
				delete $localStorage.userRole;
				delete $localStorage.activeAlarmCount;
				delete $localStorage.showHeaderNavigation;
				delete $localStorage.enableAllScreen;
				delete $localStorage.disableUnAuthEditGlobal;
				console.log('Refreshing OR on login page');
			}
		});
	}]);

