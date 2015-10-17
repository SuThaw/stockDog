'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //[1]Helper Load Watchlist from local Stroage

    var loadModel = function(){
    	var model = {
    		watchlists: localStorage['StockDog.watchlists'] ? JSON.parse(localStroage['StockDog.watchlists']) : [],
    		nextId : localStorage['StockDog.nextId'] ? JSON.parse(localStorage['StockDog.nextId']) : 0,

    	}
    	return model;
    };

    //[2] Helper: Save watchlist to localStorage
    var saveModel = function(){
    	localStorage['StockDog.wathclists'] = JSON.stringify(Model.watchlists);
    	localStorage['StockDog.nextId'] = Model.nextId; 
    };

    //[3] Helper: Use lodash to find a watchlist with given ID

    var findById = function(listId){
    	return _.find(Model.watchlists,function(watchlist){
    		return watchlist.id === parseInt(listId);
    	});
    };

    //[4] Return all watchlists or find by given ID
    this.query = function(listId){
    	if(listId){
    		return findByid(listId);
    	}else{
    		return Model.watchlists;
    	}
    };

    //[5] Save new watchlist to model
    this.save = function(watchlist){
    	watchlist.id = Model.nextId++;
    	Model.watchlists.push(watchlist);
    	saveModel();

    };

    //[6] Remove given watchlist from watchlists model
    this.remove = function(watchlist){
    	_.remove(Model.watchlists,function(list){
    		return list.id === watchlist.id;
    	});
    	saveModel();
    };
 
    //[7] Initialize Model for this singleton Service
    var Model = loadModel();

  });
