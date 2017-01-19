'use strict';

// Declare app level module which depends on views, and components
angular.module('NeoLearning', [
  'angular-jwt',
  'ngResource',
  'ui.router',
  'NeoLearning.home',
  'NeoLearning.signin'
]).
config(['$locationProvider', '$stateProvider', '$urlRouterProvider','$resourceProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $resourceProvider) {

  $urlRouterProvider.otherwise('/signin');

  $stateProvider.state('signin', {
    url: '/signin',
    views: {
       // the main template will be placed here (relatively named)
       '': { templateUrl: '/signin/signin.html', controller: 'SigninCtrl' },

       // the child views will be defined here (absolutely named)
       'header': { template: '<div class="header-band">' +
         '<img class="logo" src="assets/images/neo_logo.png"></img>' +
       '</div>'}
    },
  })

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    views : {
      // the main template will be placed here (relatively named)
      '': { templateUrl: '/dashboard/home.html', controller: 'SigninCtrl'},

      // // the child views will be defined here (absolutely named)
      // 'header': { template: '<div class="header-band">' +
      //   '<img class="logo" src="assets/images/neo_logo.png"></img>' +
      // '</div>', controller: 'headerCtrl'}
    },
  })

  $resourceProvider.defaults.actions = {
      create: {method: 'POST'},
      get:    {method: 'GET'},
      getAll: {method: 'GET', isArray:true},
      update: {method: 'PUT'},
      delete: {method: 'DELETE'}
    };
}]);
