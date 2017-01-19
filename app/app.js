'use strict';

// Declare app level module which depends on views, and components
angular.module('NeoLearning', [
  'ui.router',
  'NeoLearning.home',
  'NeoLearning.signin'
]).
config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/signin');

  $stateProvider.state('signin', {
    url: '/signin',
    views: {
       // the main template will be placed here (relatively named)
       '': { templateUrl: '/signin/signin.html', controller: 'SigninCtrl' },

       // the child views will be defined here (absolutely named)
       'header': { template: '<div class="header-band">' +
         '<img class="logo" src="assets/images/neo_logo.png"></img>' +
       '</div>', controller: 'headerCtrl' }
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
}]);
