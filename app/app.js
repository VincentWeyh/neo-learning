'use strict';

// Declare app level module which depends on views, and components
angular.module('NeoLearning', [
  'ui.router',
  'angularFileUpload',
  'NeoLearning.signin',
  'NeoLearning.upload'
]).
config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/signin');

  $stateProvider.state('signin', {
    url: '/signin',
    views: {
       // the main template will be placed here (relatively named)
       'container': { templateUrl: '/signin/signin.html', controller: 'SigninCtrl' },

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
      'container': { templateUrl: '/dashboard/partial/dashboard/dashboard.html', controller: 'SigninCtrl'},
      'nav': { templateUrl: '/navigation/navigation.html'}
      // the child views will be defined here (absolutely named)
      //'nav': { templateUrl: '/navigation/navigation.html'}
    },
  })
  $stateProvider.state('upload', {
    url: '/upload',
    views : {
      // the main template will be placed here (relatively named)
      'container': { templateUrl: '/upload/upload.html', controller: 'UploadCtrl'},

      // the child views will be defined here (absolutely named)
      'nav': { templateUrl: '/navigation/navigation.html'}
    },
  })
}]);
