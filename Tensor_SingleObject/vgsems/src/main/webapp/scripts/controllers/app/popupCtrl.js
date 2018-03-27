'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : popupCtrl.js
 --	DESCRIPTION   : Controller to handle pop ups in ISRO
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017   | Suresh Ungarala 			| initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems')
  .controller('popupCtrl', ['$scope', '$mdDialog',function ($scope, $mdDialog) {
	  var alert;
	  $scope.popUp = function(popUpPage) {
		  
			$mdDialog.show({
						templateUrl : 'views/popups/'+popUpPage+'.html',
						parent : angular.element(document.body),
						scope : $scope,
						preserveScope : true,
						autoWrap: false
					});
		}
		
		$scope.cancelPopUp = function() {
			$mdDialog.cancel();
		}
		
		
		/*Below method is generic to be used for displaying prompt message 
		 * 
		 */
		
		$scope.showPromptMsg = function(msg){
						alert = $mdDialog.alert()
						  .title('Attention!')
						  .content(msg)
						  .clickOutsideToClose(true)
						  .ok('Close');

						$mdDialog
							.show( alert )
							.then(function() {
							  alert = undefined;
							});
		}
}]);
