'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : confirmPromptCtrl.js
 --	DESCRIPTION   : Controller to handle confirm prompts in ISRO
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

angular.module('vgsems')
  .controller('confirmPromptCtrl', ['$scope', '$mdDialog','$rootScope',function ($scope, $mdDialog,$rootScope) {
		$scope.confirmPrompt = function(title) {

			var confirm = $mdDialog.confirm()
		    	  .parent(angular.element(document.body))
		          .title(title)
		          .ok('Yes')
		          .cancel('No');

		    $mdDialog.show(confirm).then(function() {
		      $scope.okConfirm();
		    }, function() {
		      $scope.cancelConfirm();
		    });
		};
		  
		$scope.cancelConfirm = function() {
			$mdDialog.cancel();
		}
		
	  $scope.showAlert = function(title) {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.body))
		        .clickOutsideToClose(true)
		        .title(title)
		        .ok('Ok')
		    );
		  };
}]);
