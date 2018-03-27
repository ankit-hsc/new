/*
 ***************************************************************************************************
 -- FILENAME      : appConstants.js
 --	DESCRIPTION   : Constants file to be used for whole ISRO VGS Application
 --
 --  Copyright	  : Copyright  (c) 2017. 
 --  Company      : ISRO.
 --
 --  Revision History
 -- -------------------------------------------------------------------------------------------------
 -- |VERSION|	Date				|	Author    				|	Reason for Changes				|
 -- -------------------------------------------------------------------------------------------------
 -- |	0.1 | 28th November, 2017  	|	Suresh Ungarala			|	initial draft  					|
 --	-------------------------------------------------------------------------------------------------
 --
 ****************************************************************************************************
 */

angular.module('vgsems')
.constant('constant',{
	IMAGES:{
		ADMIN_STATE_POPUP:'images/Left-side-Arrow-Ver2--Close.png',
		ADMIN_STATE_FILTER:'images/61+ss5iSfaL._SL1000_.jpg',
		NEW_FILTER:'images/application_add.png',
		CLOSE_NEW_FILTER:'images/cross.png'
	},
	LOCATIONS:{
		INIT_LINK:'/',
		EMPTY_LINK:'',
		NO_ACCESS:'/noaccess',
		HOME_PAGE:'/home',
		COTS_VIEW:'/cotsView/',
		COTS_DIST:'/cotsDistribution/',
		SIB_CONFIG:'/sibconfig',
		BLANK_PAGE:'/blank',
		SAP_STATUS:'/sap/satellite',
		SOFTWARE_MANAGEMENT:'/softwaremanagement/'
		
	},
	METHOD:{
		HTTP_GET:'GET',
		HTTP_POST:'POST'
	},
	ROLES:{
		SUPER_ADMIN:'ROLE_SUPER_ADMIN',
		GROUP_ADMIN:'ROLE_GROUP_ADMIN',
		GROUP_STAN:'ROLE_GROUP_STAN',
		GROUP_RESTRICTED:'ROLE_GROUP_RESTRICTED'
	},
	PROPERTIES:{
		MESSAGES:'properties/messages.properties',
		TIMEZONE:'UTC/GMT',
		MAX_FILE_SIZE:5,
		XLS_EXTN:'XLS',
		XLSX_EXTN:'XLSX',
		ZERO:0,
		SIG_MODEM: 'SIG_MODEM',
		COMM_MODEM: 'COMM_MODEM',
		TERMINAL_FILE_NAME:'Provisiong-Terminal-Template',
		FREQ_FILE_NAME:'Provisiong-Frequency-Template',
		INVENTORY_FILE_NAME:'Provisioning-Inventory-Template'
	},
	SOFTWARE:{
		DATEPICKER_FORMAT:'YYYY-MM-DD HH:mm',
		ACTIVATION_DATE_FORMAT:'yyyy-MM-dd HH:mm',
		STATISTICS_DATE_FORMAT:'YYYY-MM-DD',
		FILE_NAME_DATE_FORMAT:'DD-MM-YYYY HH-mm-ss'
	},
	STATUS:{
		SUCCESS:1,
		FAILURE:0
	},
	MESSAGE:{
		EMPTY:''
	},
	COOKIES:{
		ACCESS_TOKEN:'access_token'
	},
	RESTURL : {
		LOGIN : 'ems/auth/login',
		LOGOUT : 'ems/auth/logout',
		REFRESH_TOKEN : 'refreshtoken',
		HOME_PAGE : 'homepage',
		SIG_MODEM:'ems/inventory/sigModem/',
		COMM_MODEM:'ems/inventory/commModem',
		PSTN:'ems/inventory/pstn',
		ACTIVE_CALLS:'ems/calls/active',
		CLEAR_ACTIVE_CALL:'ems/calls/active/',
		ACTIVE_CALL_BY_ID:'ems/calls/',
		RECENT_CALLS:'ems/calls/archived',
		SMS_STATUS:'ems/sms/smsDetails',
		ACTIVE_ALARMS:'ems/alarms/',
		ACTIVE_ALARM_COUNT:'ems/alarms/count',
		RECENT_ALARMS:'ems/alarms/archived',
		BEAM:'ems/beams',
		TERMINAL:'ems/terminals',
		TERMINAL_CALL_DETAIL:'ems/terminals/calls',
		BEAM_COMM_CHANNEL:'ems/beams/beamIds',
		COMM_CHANNEL:'ems/beams/:beamId/commChannel',
		SMS_GATEWAY:'ems/smsGateway',
		ORG_TERMINAL:'ems/terminals/group',
		GET_TERMINALS:'ems/terminals',
		PROVISION_FREQ:'ems/provisioning/freq',
		PROVISION_TERMINAL:'ems/provisioning/terminal',
		PROVISION_INVENTORY:'ems/provisioning/inventory',
		DWLND_PROVISION_FREQ:'ems/provisioning/freq',
		DWLND_PROVISION_TERMINAL:'ems/provisioning/terminal',
		DWLND_PROVISION_INVENTORY:'ems/provisioning/inventory',
		STATISTICS:'ems/statistics/hourly/',
		DASHBOARD_STATS: 'ems/dashboard/services',
		BEAM_MAP_DATA: 'ems/dashboard/beammap',
		SIG_MODEM_LOCATE: 'ems/inventory/sigModem/locate/',
		COMM_MODEM_LOCATE: 'ems/inventory/commModem/locate/',
		AUDIT_LOG: 'ems/auditLog'
	},
	ROUTES:{
		RESTRICT:'restrict',
		ALLOW:'allow'
	}


});
