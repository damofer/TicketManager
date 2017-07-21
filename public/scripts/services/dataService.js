(function() {
  'use strict';
    angular
    .module('app')
  .service('dataService', function($http) {
  	  var base_uri = 'http://localhost:3000';
      this.isLoggedIn = function (callback) {
         $http.get(base_uri + '/isLoggedIn')
         .then(callback);
      };
      this.getTicket = function (id,callback) {
         $http.get(base_uri + '/getTicket/'+id)
         .then(callback);
      };
      this.getTicketMessages = function (id,callback) {
         $http.get(base_uri + '/getTicketMessages/'+id)
         .then(callback);
      };
      this.getTicketsFromUser = function (id,callback) {
         $http.get(base_uri + '/getTicketsFromUser/'+id)
         .then(callback);
      };
      this.getAllTickets = function (callback) {
         $http.get(base_uri + '/getAllTickets')
         .then(callback);
      };
     
      this.addMessage = function (message,callback,err) {
         $http.post(base_uri + '/addMessage',message )
         .then(callback,err);
      };
      this.addTicket = function (inquiry,callback,err) {
         $http.post(base_uri + '/addTicket',inquiry )
         .then(callback,err);
      };

      this.closeTicket = function (ticketId,callback,err) {
         $http.post(base_uri + '/closeTicket',ticketId )
         .then(callback,err);
      };
    
  });

})();









