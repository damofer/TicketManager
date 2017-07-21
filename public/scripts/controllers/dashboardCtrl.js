(function() {
  'use strict';
  angular.module('app')

.controller('dashboardCtrl',function($scope,dataService,$location,$window){
	$scope.status="ALL";
	$scope.user =undefined;
	$scope.getAllTickets = function(){
	 dataService.getAllTickets(function(response){
	 	$scope.ticketList = response.data;
	 	console.log($scope.ticketList);
	 	
	 });
	};

	$scope.getAllTickets();

	$scope.isLoggedIn = function(){
		dataService.isLoggedIn(function(response){	
			
		 	if(response.data.id){
		 		console.log(response.data.id);
		 		$scope.user=response.data;
		 	}else{
		 		 window.location = "/";
		 	}
		 });
	}
	$scope.isLoggedIn();
});

})();