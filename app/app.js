'use strict';

// Declare app level module which depends on views, and components
angular.module('NeoLearning', [
  'angular-jwt',
  'ngResource',
  'ui.router',
  'smart-table',
  'angularFileUpload',
  'NeoLearning.signin',
  'NeoLearning.upload',
  'NeoLearning.dashboard'
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
    authenticate: false
  })

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    views : {
      'container': { templateUrl: '/dashboard/dashboard.html', controller: 'DashCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html'}
    },
    authenticate: true,
  })
  $stateProvider.state('upload', {
    url: '/upload',
    views : {
      'container': { templateUrl: '/upload/upload.html', controller: 'UploadCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html'}
    },
    authenticate: true,
  })

  $resourceProvider.defaults.actions = {
      create: {method: 'POST'},
      get:    {method: 'GET'},
      getAll: {method: 'GET', isArray:true},
      update: {method: 'PUT'},
      delete: {method: 'DELETE'}
    };
}])
.run(function ($rootScope, $state, UserService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    console.log("route changed", UserService.isAuth());
    if (toState.authenticate && !UserService.isAuth()){
      // User isn’t authenticated
      $state.transitionTo("signin");
      event.preventDefault();
    }
  });
});
