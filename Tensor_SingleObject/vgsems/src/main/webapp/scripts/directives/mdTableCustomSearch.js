'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : mdTableCustomSearch.js
 --	DESCRIPTION   : Directive use custom search for md-table 
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 	| Suresh Ungarala 			| initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */
angular.module('vgsems').directive('customSearch', function(){

	return {
		restrict:'E',
		scope: {
			data :'=datamodel',//its used to populate the select box.
			model :'=selectmodel',//Selected value's will be bind to this model
			filterkey:'@',//key on basis of which you want to filter
		},
		template:function (elem, attrs) {
			var value ='<md-input-container align="left" class="customFilter" >'+
				' <md-select ng-model="model" style="border-bottom: 0px;border-bottom-width:0px;">'+
				'<md-option value="">All</md-option> <md-option ng-value="getValue(value)"'+
				'ng-repeat="(key, value) in data| unique:filterkey ">{{getValue(value)}}</md-option> </md-select>'+ 
				'</md-input-container>';
			return value;
		},
		controller: ["$scope", function($scope) {
			
			$scope.getValue = function(value){
				var myValue;
				if($scope.filterkey.indexOf('.') != -1){
					var res = $scope.filterkey.split('.');
					myValue = value[res[0]][res[1]];
				}else{
					myValue = value[$scope.filterkey];
				}
				return myValue;
			};
			
		}]
	};
});


angular.module('vgsems').filter('unique', function() {
	   // we will return a function which will take in a collection
	   // and a keyname
	   return function(collection, keyname) {
	      // we define our output and keys array;
	      var output = [], 
	          keys = [];
	      
	      // we utilize angular's foreach function
	      // this takes in our original collection and an iterator function
	      angular.forEach(collection, function(item) {
	          // we check to see whether our object exists
	    	  var key;
	    	  if(keyname.indexOf('.') != -1){
	    		  var res = keyname.split('.');
	    		  key = item[res[0]][res[1]];
	    	  }else{
	    		  key = item[keyname];
		          // if it's not already part of our keys array
	    	  }
	    	  
	    	  if(keys.indexOf(key) === -1) {
	              // add it to our keys array
	              keys.push(key); 
	              // push this item to our final output array
	              output.push(item);
	          }
	          
	      });
	      // return our array which should be devoid of
	      // any duplicates
	      return output;
	   };
	});
