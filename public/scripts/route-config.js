
(function() {
  'use strict';

  // The Angular $routeProvider is used to configure routes for your application.
  
  // Three routes are configured below:
  // 1) The root of the application "/" which serves up the "Recipes" view.
  // 2) The recipe edit route "/edit/:id" which serves up the "Recipe Detail" view.
  // 3) The recipe add route "/add" which also serves up the "Recipe Detail" view.

  // TODO Uncomment this code after you've configured the `app` module.
  
  angular
    .module('app')
    .config(config);

  function config($routeProvider) {
    $routeProvider
      
      .when('/login', {
        controller: 'loginCtrl',
        controllerAs: 'vm',
        templateUrl: 'templates/login.html'
      })
      .when('/signup', {
        controller: 'signupCtrl',
        controllerAs: 'vm',
        templateUrl: 'templates/signup.html'
      })
      .when('/ticket/:id', {
        controller: 'ticketCtrl',
        controllerAs: 'vm',
        templateUrl: 'templates/ticket.html',
        data: 'edit'
      })
      .when('/dashboard', {
        controller: 'dashboardCtrl',
        controllerAs: 'vm',
        templateUrl: 'templates/dashboard.html',
        data: 'add'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }
})();
