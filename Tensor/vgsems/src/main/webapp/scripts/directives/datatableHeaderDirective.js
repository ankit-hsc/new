'use strict';

/*
 ***********************************************************************************************
 -- FILENAME      : datatableHeaderDirective.js
 --	DESCRIPTION   : directive to be applied for creating header of datatables
 --
 --  Copyright	  : Copyright  (c) 2016.
 --  Company      : ISRO.
 --
 --  Revision History
 -- ---------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes			|
 -- ---------------------------------------------------------------------------------------------
 -- |	0.1 | 5th December, 2017	|	Suresh Ungarala			|	ISRO			| 
 --	---------------------------------------------------------------------------------------------
 --
 ************************************************************************************************
 */

angular.module('vgsems').directive('datatableHeader', function(){
	   return {
	      restrict:'E',
	      scope: {
	         title: '@',
	         search : '=?'
	      },
	      template:'<md-toolbar flex>'+
				      '<div class="md-toolbar-tools">'+
				    	  '<div class="owDataTableHeader">{{title}}</div>'+
				    	 ' <span flex></span>'+
				    	  '<i class="material-icons owDatatableSearchIcon" style="font-size:23px !important">search</i>'+
				    	  '<input class="owDatatableSearch" type="text" name="filter" placeholder="Search" ng-model="search">'+
				    	'</div>'+
				    '</md-toolbar>'
	   };
	});

