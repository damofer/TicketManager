(function() {
  'use strict';
  angular.module("app")
.controller('ticketCtrl',function($scope,dataService,$location,$window, $routeParams,$route){

	$scope.getTicket = function (id) {

    dataService.getTicket(id,function(response){
			$scope.ticket = response.data;			
			dataService.getMessages(id,function(response){
				$scope.messages = response.data;			
			});
			
			
		});
	}

	/*$scope.type = $route.current.data;

	//if the data obtained in the $route is 'add', then it will create a recipe object with all attributes empty.
	if($scope.type =='add'){
		$scope.recipe ={

			"name":"My New Awesome Recipe!",
			"description":"",
			"category":"",
			"prepTime":'',
			"cookTime":'',
			"ingredients":[],
			"steps":[],
			"_id":""};

		
	}else{
		$scope.recipe ={};
	}

	$scope.categories = [];


	$scope.foodItems = [];

	$scope.getAllCategories = function(){
	 dataService.getAllCategories(function(response){
	 	$scope.categories = response.data;
	 	
	 });
	}

	$scope.getRecipe = function (id) {
    dataService.getRecipe(id,function(response){
			$scope.recipe = response.data;
			
			
			$scope.ingredients = $scope.recipe.ingredients;
		});
	}
 	
 	$scope.getFoodItems = function(){
	 	dataService.getFoodItems(function(response){
				$scope.foodItems = response.data;
				
				
				
			});
 	}
 
 	$scope.deleteRecipe = function(id){
	 	dataService.getFoodItems(function(response){
				$scope.foodItems = response.data;
				
				
				
			});
 	}

	$scope.delete= function(item,list) { 
	  var index = list.indexOf(item);
	  list.splice(index, 1);     
	}

	$scope.updateRecipe = function(recipe){
		dataService.updateRecipe(recipe ,function(){
				console.log("recipe has been updated!");
				
				
			},function(err){
				console.error("an error ocurred when updating data : " , err);
			});
	}
	$scope.saveRecipe =function(recipe){
		dataService.addRecipe(recipe ,function(){
				console.log("recipe has been saved!");
				$window.location.href = '/#!';
				
			},function(err){
				console.error("an error ocurred when saving data : " , err);
			});
	}

	$scope.addIngredient=function(){
		var ingredient = {
			"amount":"",
			"condition":"",
			"foodItem":"Select a food Item"
		};
		 $scope.recipe.ingredients.push(ingredient);
		
	}
	$scope.addStep = function(){
		var step = {
			"description":""
		};
		 $scope.recipe.steps.push(step);
	}


 	$scope.getAllCategories();

 	//if the $route param is edit, then it will bring the data of the recipe from the db
 	if($scope.type =='edit')
 		$scope.getRecipe($routeParams.id);
 	$scope.getFoodItems();*/
});

})();