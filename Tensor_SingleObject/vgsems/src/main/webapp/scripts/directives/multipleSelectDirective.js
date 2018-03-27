'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : multipleSelectDirective.js
 --	DESCRIPTION   : directive to be applied for select to give multi select with all option
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 	| Suresh Ungarala			 | initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */
angular.module('vgsems').directive('multiSelect', function(){

	return {
		restrict:'E',
		scope: {
			data :'=datamodel',//its used to populate the select box.
			model :'=selectmodel',//Selected value's will be bind to this model
			isvaluesonly:'=isvaluesonly',//it should be true if your datamodel contains only values.else it can be false or undefined
			mdOnClose:'&mdOnClose' //if you want to call a function on close of multi select drop down
		},
		template:function (elem, attrs) {
			var value ='<md-select multiple md-on-open="checkAllOptionSel()" style="margin:0px 0px 0px 0px;" ng-model="model" ng-change="checkAllOptionSel()" md-on-close="onCloseEvent()">'+
			'<md-input-container style="padding: 6px 0px 0px 6px;"><md-checkbox  ng-change="selectAll()" class="dashMiniHeader" ng-model="isAllSelected" >ALL</md-checkbox></md-input-container>'+
			(attrs.isvaluesonly=='true'?'<md-option class="dashMiniHeader" ng-value="value" ng-repeat="value in data" >'
					:'<md-option  class="dashMiniHeader" ng-value="key" " ng-repeat="(key, value) in data" >')+
					'{{value}}</md-option></md-select>';
			return value;
		},
		controller: ["$scope", function($scope) {

			//To check is all the option in drop down are selected
			$scope.checkAllOptionSel = function(){
				if( $scope.model && $scope.data && Object.keys($scope.data).length > 0 && $scope.model.length == Object.keys($scope.data).length){
					$scope.isAllSelected = true;
				} else {
					$scope.isAllSelected = false;
				}
			};

			//To select all the option on selection of all checkBox
			$scope.selectAll=function(){
				if( $scope.isAllSelected && $scope.data ){
					$scope.model = $scope.isvaluesonly?angular.copy($scope.data) :angular.copy(Object.keys($scope.data));
				}else{
					$scope.model=[];
				}
			};
			
			//will be called on close of md-select
			$scope.onCloseEvent = function(){
				if($scope.mdOnClose){
					$scope.mdOnClose();
				}
			};
			
		}]
	};
});
