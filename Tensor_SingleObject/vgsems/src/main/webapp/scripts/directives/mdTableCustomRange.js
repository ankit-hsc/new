'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : mdTableCustomRange.js
 --	DESCRIPTION   : Directive use custom range for date in md-table 
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date					|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 		| Suresh Ungarala 			| initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */
angular.module('vgsems').directive('customRange', ['$rootScope',function($rootScope){

	return {
		restrict:'E',
		scope: {
			startdate :'=',
			enddate :'=',
				
		},
		template:function (elem, attrs) {
			var value ='<md-datepicker  ng-model="startdate" md-min-date="minDate" md-max-date="maxDate"'+
				 'style="padding: 0px;margin-right:5px;" md-hide-icons="calendar" md-placeholder="from" md-open-on-focus ></md-datepicker>'+
					'<md-datepicker ng-model="enddate" md-min-date="startdate" md-max-date="maxDate"'+
					'style="padding: 0px;margin-right:5px;" md-hide-icons="calendar" md-placeholder="to" md-open-on-focus ></md-datepicker>';
			return value;
		},
		controller: ["$scope","$timeout","$rootScope", function($scope,$timeout,$rootScope) {
			
			$scope.init = function(){
				$timeout(function(){
					//adding 10 minutes buffer in current time
					$scope.maxDate =  new Date($rootScope.clock+1000*60*10);
					//subtracting 180 days from current time
					$scope.minDate = new Date($rootScope.clock - 1000*3600*24*180);
				}, 1000);
			};
			
			$scope.init();
			
			
		}]
	};
}]);
