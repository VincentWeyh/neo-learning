'use strict';

// Declare app level module which depends on views, and components
angular.module('NeoLearning', [
  'angular-jwt',
  'ngResource',
  'ui.router',
  'angularFileUpload',
  'NeoLearning.signin',
  'NeoLearning.upload'
]).
config(['$locationProvider', '$stateProvider', '$urlRouterProvider','$resourceProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $resourceProvider) {

  $urlRouterProvider.otherwise('/signin');

  $stateProvider.state('signin', {
    url: '/signin',
    views: {
       'signin': { templateUrl: '/signin/signin.html', controller: 'SigninCtrl' },
       'nav': { template: '<div class="header-band">' +
         '<img class="logo" src="assets/images/neo_logo.png"></img>' +
       '</div>'}
    },
  })

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    views : {
      'container': { templateUrl: '/dashboard/dashboard.html', controller: 'SigninCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html'}
    },
  })
  $stateProvider.state('upload', {
    url: '/upload',
    views : {
      'container': { templateUrl: '/upload/upload.html', controller: 'UploadCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html'}
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
