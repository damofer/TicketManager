(function() {
  'use strict';
  angular.module('app')

.controller('mainCtrl',function($scope,dataService,$location,$window){
	$scope.user =undefined;


	$scope.isLoggedIn = function(){


		dataService.isLoggedIn(function(response){	
			
		 	if(response.data.id){
		 		if(window.location !="/#!/dashboard")
		 			window.location = "/#!/dashboard";
		 		$scope.user = response.data;
		 	}

		 });
	}
	$scope.isLoggedIn();
});

})();