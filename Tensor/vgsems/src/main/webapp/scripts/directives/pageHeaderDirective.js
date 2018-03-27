'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : pageHeaderDirective.js
 --	DESCRIPTION   : directive to be applied for creating header of pages
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

angular.module('vgsems').directive('pageHeader', function(){
	   return {
	      restrict:'E',
	      scope: {
	         header: '@',
	         success : '=?',
	         error : '=?'
	      },
	      template:'<div style="height:15px;padding-left:10px;"></div><div layout="row" style="padding-left: 10px;"><div flex="25" align="left"><span class="owPageHeader">{{header}}</span></div><div flex="50" align="center"><div style="height:10px;"></div><span ng-show="error.length>0" class="errorMessage" ng-bind-html="error"></span><span ng-show="success.length>0" class="successMessage" ng-bind-html="success"></span></div><div flex="25"></div></div><div class="singleLineSpace"></div>'
	   };
	});

