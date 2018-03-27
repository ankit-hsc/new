'use strict';

/*
 ********************************************************************************************************************
 -- FILENAME      : utilityService.js
 --	DESCRIPTION   : Service for containing all utility functions for whole application
 --
 --  Copyright	  : Copyright  (c) 2017.
 --  Company      : ISRO.
 --
 --  Revision History
 -- -----------------------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes								 |
 -- -----------------------------------------------------------------------------------------------------------------
 -- | 0.1 	| 30th November, 2017 	| Suresh Ungarala 			| initial draft 									|
 --	-----------------------------------------------------------------------------------------------------------------
 --
 *********************************************************************************************************************
 */

angular.module('vgsems').service('utilityService', ['$q', '$http', '$localStorage', '$location', 'constant', '$mdToast', function($q, $http, $localStorage, $location, constant,$mdToast) {
	
	this.getErrorMessageHTML = function(message) {
		var html="";
		
		if(Object.prototype.toString.call(message) === '[object Array]') {
			var length = message.length;
			for(var i=0;i<length;i++){
				if(i==0){
					html = html + "<strong>"+ message[i] + "</strong><br><br>";
				}else{
					html = html + message[i] + "<br>";
				}
			}
		}else {
			html = message;
		}
		
		return html;
	}
	
	
	
}]);
