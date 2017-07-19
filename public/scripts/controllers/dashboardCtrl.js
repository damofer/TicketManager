(function() {
  'use strict';
  angular.module('app')

.controller('dashboardCtrl',function($scope,dataService,$location,$window){

	$scope.getAllTickets = function(){
	 dataService.getAllTickets(function(response){
	 	$scope.ticketList = response.data;
	 	console.log($scope.ticketList);
	 	
	 });
	}

	$scope.getAllTickets();

});

})();