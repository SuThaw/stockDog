'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockDogApp')
  //[1] Register Directive and inject dependencies
  .directive('stkWatchlistPanel', function ($location,$modal,$routeParams,WatchlistService) {
  	return {
  		templateUrl:'views/templates/watchlist-panel.html',
  		retrict:'E',
  		scope:{},
  		link:function($scope){
  			//[2] Initialize variables
  			$scope.watchlist = {};
  			var addListModal = $modal({
  				scope:$scope,
  				templateUrl:'views/templates/addlist-modal.html',
  				show:false
  			});

  			//[3] Bind model from service to this scope
  			$scope.watchlists = WatchlistService.query();

  			//[4] Display addlist Modal
  			$scope.showModal = function(){
  				addListModal.$promise.then(addListModal.show);

  			};

  			//[5] Create a new list from fields in modal
  			$scope.createList = function(){
  				WatchlistService.save($scope.watchlist);
  				
  				addListModal.hide();
  				$scope.watchlist = {};

  			};

  			//[6] Delete desired that and redirect to home
  			$scope.deleteList = function(list){
  				WatchlistService.remove(list);
  				$location.path('dashboard');
  			};

  			$scope.currentList = $routeParams.listId;

  			$scope.gotoList = function(listId){
  				$location.path('watchlist/' + listId);
  			};

  		}
  	};
    
  });
