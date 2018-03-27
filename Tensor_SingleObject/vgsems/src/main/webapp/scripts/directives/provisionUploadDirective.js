'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : provisionUploadDirective.js
 --	DESCRIPTION   : directive to be applied for creating header of pages
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- | 0.1 	| 5th December, 2017 	| Suresh Ungarala 			| initial draft 				|
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */
angular.module('vgsems').directive('browseFile', ['$parse',function($parse) {
	return {
		restrict:'A',
		link:function(scope, elm, attrs) {
			elm.bind('change',function(){
				$parse(attrs.browseFile).assign(scope,elm[0].files);
				scope.$apply();
			});
		}

	};
}]);