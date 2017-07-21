(function() {
  'use strict';
  angular.module("app")
.controller('ticketCtrl',function($scope,dataService,$location,$window, $routeParams,$route){
		$scope.user;
		$scope.messages =[];
		var ticket_id = $routeParams.id;
		
		
		$scope.getTicket = function(id) {

	  	    dataService.getTicket(id,function(response){
				$scope.ticket = response.data[0];	

				
				dataService.getTicketMessages(id,function(response){
					$scope.messages = response.data;
					
					
						

				});
				
				
			});


		}
		$scope.addMessage = function (message) {

			
			var user_id = $scope.user.id;
			
			var obj ={
				user_id: user_id,
				ticket_id: ticket_id,
				message: message
			};
		    dataService.addMessage(obj,function(response){
				
		    	
				dataService.getTicketMessages(ticket_id,function(response){
					$scope.messages = response.data;
					$('#message_form')[0].reset();
					

				});
				
				
			});

	   
	    }
	    $scope.isLoggedIn = function(){
			dataService.isLoggedIn(function(response){	
				
			 	if(response.data.id){
			 		
			 		$scope.user=response.data;
			 	}else{
			 		 window.location = "/";
			 	}
			 });
		}
		$scope.isLoggedIn();

		$scope.getMessages =function(ticket_id,currentMessageCount){

			dataService.getTicketMessages(ticket_id,function(response){
						if(response.data>currentMessageCount){
							$('.ticket__messages').stop().animate({
							  scrollTop: $('.ticket__messages')[0].scrollHeight
							}, 800);
						}
						$scope.messages = response.data;
						
						

					});
		}
		$scope.closeTicket = function(){
			var obj ={
				ticket_id:ticket_id
			};
			dataService.closeTicket(obj,function(response){
					$scope.getTicket(ticket_id);					
						

					});
		}
		$(document).ready(function(){
			$scope.getTicket(ticket_id)
			/*this will allow a chat effect*/
		 	setInterval(function(){ $scope.getMessages(ticket_id,$scope.messages); }, 5000);

		    $("#message_form").on('submit',function(evt){
		    	$scope.getTicket(ticket_id)
		    	evt.preventDefault();

		    	

		    	var message =$("textarea[name='message']")[0].value ;
		    	if(message.length < 1){
		    		alert("no empty messages please ")
		    	}else{
		    	$scope.addMessage(message);

		    	$('.ticket__messages').stop().animate({
				  scrollTop: $('.ticket__messages')[0].scrollHeight
				}, 800);
		    	
		    	
		    	}

		    	$('#message_form')[0].reset();
		    });
		})
   
	


})
.controller('ticketCreationCtrl',function($scope,dataService,$location,$window, $routeParams,$route){
	$scope.user;
	 $scope.isLoggedIn = function(){
			dataService.isLoggedIn(function(response){	
				
			 	if(response.data.id){
			 		
			 		$scope.user=response.data;
			 		/*if($scope.user.ROL != 1)
			 			window.location = "/";*/
			 	}else{
			 		 window.location = "/";
			 	}
			 });
		}
	$scope.addTicket = function (inquiry) {
			
		var user_id = $scope.user.id;
		
		var obj ={
			user_id: user_id,			
			inquiry: inquiry
		}
	    dataService.addTicket(obj,function(response){
	    	
			
			 window.location = "/"
			
		});

	   
	}
		$scope.isLoggedIn();

		$(document).ready(function(){
			
		 	

		    $("#ticket__creation__form").on('submit',function(evt){		    	
		    	evt.preventDefault();

		    	var inquiry = $('textarea[name="inquiry"]')[0].value;
		    	$scope.addTicket(inquiry);

		    

		    	
		    });
		});

})})();