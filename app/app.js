'use strict';

// Declare app level module which depends on views, and components
angular.module('NeoLearning', [
  'angular-jwt',
  'ngResource',
  'LocalStorageModule',
  'ui.router',
  'smart-table',
  'angularFileUpload',
  'NeoLearning.signin',
  'NeoLearning.upload',
  'NeoLearning.dashboard',
  'NeoLearning.student',
  'NeoLearning.document',
  'NeoLearning.course',
  'NeoLearning.chat',
  'NeoLearning.navigation',
  'btford.socket-io',
  'ngFileSaver'
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
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    authenticate: true,
  })
  $stateProvider.state('upload', {
    url: '/dashboard/upload',
    views : {
      'container': { templateUrl: 'dashboard/upload/upload.html', controller: 'UploadCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    authenticate: true,
  })
  $stateProvider.state('students', {
    url: '/dashboard/students',
    views : {
      'container': { templateUrl: 'dashboard/student/students.html', controller: 'StudentCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    authenticate: true,
  })
  $stateProvider.state('student', {
    url: '/dashboard/student?id',
    views : {
      'container': { templateUrl: 'dashboard/student/student.html', controller: 'StudentCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    // params: {
    //   student: null
    // },
    authenticate: true,
  })
  $stateProvider.state('courses', {
    url: '/dashboard/courses',
    views : {
      'container': { templateUrl: 'dashboard/course/courses.html', controller: 'CourseCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    authenticate: true,
  })
  $stateProvider.state('chat', {
    url: '/dasboard/chat',
    views : {
      'container': { templateUrl: 'dashboard/chat/chat.html', controller: 'ChatCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    authenticate: true,
  })
  $stateProvider.state('course', {
    url: '/dashboard/course?id',
    views : {
      'container': { templateUrl: 'dashboard/course/course.html', controller: 'CourseCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
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
