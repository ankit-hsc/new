'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : paginationCtrl.js
 --	DESCRIPTION   : Controller to handle datatables
 In case of server side pagination view controller need to register the 
 name of Function for server side fetching. Registered function will be
 called with page no,No of items for that page.
 To reset page to 1 one can broadcast message reset-pagination.
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017   | Suresh Ungarala           | initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems').controller(
		'paginationCtrl',
		['$scope', '$mdDialog', '$rootScope','httpService',function($scope, $mdDialog, $rootScope,httpService) {

			$scope.datatableObj = {
				"start" : 0,
				"limit" : 15,
				"records" : [5, 10,15, 20, 25, 50, 100],
				"defaultLimit" : 15,
				"defaultPage" : 1,
				"searchText" : '',
				"sortField" : '',
				"functionName" : null

			}		
			var parentScope = $scope.$parent;
			parentScope.child = $scope;
			$rootScope.defaultLimit = $scope.datatableObj.defaultLimit;
			$scope.$on('reset-pagination', function(event, args) {
				$scope.datatableObj.defaultPage = 1;
			});
			//For server side pagination registered funtion of controller will be called for fetching data from server on page change
			$scope.register = function(functionName) {
				$scope.datatableObj.functionName = functionName;
				if ($scope.datatableObj.functionName) {
					$scope.datatableObj.functionName($scope.datatableObj.start,
							$scope.datatableObj.limit);
				}
			}

			$scope.getUpdatedPage = function(page, limit) {
				$scope.datatableObj.limit = limit;
				if ($scope.datatableObj.functionName) {
					//For table page start from 1 but for mongo page start from 1
					$scope.datatableObj.functionName(page - 1, limit);
					httpService.setMessages();
				} else {
					$scope.datatableObj.start = (page * limit) - limit || 0;
				}
			}

			$scope.defaultSorting = function(e) {
				$scope.datatableObj.sortField = e;
			}

			$scope.updateSorting = function(e) {
				$scope.datatableObj.sortField = e;
			}
			/*
			 * Method to set default limit
			 */
			$scope.defaultLimit = function(e,f) {
				$scope.datatableObj.defaultLimit = e;
				$scope.datatableObj.limit = e;
				$scope.datatableObj.records=f;
			}

		}]);

