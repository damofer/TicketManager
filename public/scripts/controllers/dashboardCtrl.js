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
 /*	$scope.recipes=[];


	$scope.getAllCategories = function(){
		 dataService.getAllCategories(function(response){
		 	$scope.categories = response.data;
		 	
		 });
	 }
	$scope.getAllRecipes = function(){
		 dataService.getAllRecipes(function(response){
		 	$scope.recipes = response.data;
		 	console.log($scope.recipes)
		 });
	}
	$scope.getRecipesByCategory = function(category){
			dataService.getRecipesByCategory(category,function(response){
				$scope.recipes = response.data;
			});
	}
 	//This piece of code allows you to get all the recipes from a selected category.
	var select = document.getElementsByTagName('select')[0];


	select.addEventListener('change',function(evt){
		$scope.getRecipesByCategory(evt.target.value);
		
	});

 

	$scope.deleteRecipe = function(recipe_id){
		$scope.deleteAlert(recipe_id);
		
	}
	$scope.deleteAlert = function(recipe_id){

		$.confirm({
		    title: 'Delete the recipe',
		    content: 'Are you sure you want to delete this recipe?',
		    buttons: {
		        confirm: function () {
		            dataService.deleteRecipe(recipe_id);
					if(select.value != ''){
						$scope.getRecipesByCategory(select.value);
					}else{
						$scope.getAllRecipes();
					}
		        },
		        cancel: function () {
		           
		        }
		    }
		}); 
	  
	       
	}
          
          
  //when click on add recipe link, routes to the add state.
	document.getElementById('addRecipe').addEventListener('click',function(){
		$window.location.href = '#!/add';
	});


 	$scope.getAllRecipes();
 	$scope.getAllCategories();*/
});

})();