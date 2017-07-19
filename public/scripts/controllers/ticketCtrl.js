(function() {
  'use strict';
  angular.module("app")
.controller('ticketCtrl',function($scope,dataService,$location,$window, $routeParams,$route){
	$scope.messages =[];
	var ticket_id = $routeParams.id
	$scope.getTicket = function(id) {

  	    dataService.getTicket(id,function(response){
			$scope.ticket = response.data;		
			console.log($scope.ticket);	
			dataService.getTicketMessages(id,function(response){
				$scope.messages = response.data;
				console.log($scope.messages);		

			});
			
			
		});


	}
	$scope.addMessage = function (message) {

		
		var user_id = 1;
		
		var obj ={
			user_id: user_id,
			ticket_id: ticket_id,
			message: message
		}
	    dataService.addMessage(obj,function(response){
			
	    	
			dataService.getTicketMessages(ticket_id,function(response){
				$scope.messages = response.data;
				$('#configform')[0].reset();
				

			});
			
			
		});

   
    }

$(document).ready(function(){
	 $scope.getTicket(ticket_id);

    $("#message_form").on('submit',function(evt){
    	
    	evt.preventDefault();

    	var message =$("textarea[name='message']")[0].value ;
    	if(message.length < 1){
    		alert("no empty messages please ")
    	}else{
    	$scope.addMessage(message);
    	}
    });
})
   
	
	/*$scope.type = $route.current.data;*/


});

})();