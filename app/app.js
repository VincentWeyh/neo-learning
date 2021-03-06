'use strict';

// Declare app level module which depends on views, and components
angular.module('NeoLearning', [
  'angular-jwt',
  'ngResource',
  'LocalStorageModule',
  'ui.router',
  'ngMaterial',
  'smart-table',
  'angularFileUpload',
  'ui.bootstrap',
  'NeoLearning.signin',
  'NeoLearning.board',
  'NeoLearning.uploadCourse',
  'NeoLearning.dashboard',
  'NeoLearning.student',
  'NeoLearning.document',
  'NeoLearning.course',
  'NeoLearning.courses',
  'NeoLearning.navigation',
  'NeoLearning.chat',
  'NeoLearning.board',
  'NeoLearning.profile',
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
  $stateProvider.state('profile', {
    url: '/profile',
    views : {
      'container': { templateUrl: '/dashboard/profile/profile.html', controller: 'ProfileCtrl'},
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
      'container': { templateUrl: 'dashboard/course/courses.html', controller: 'CoursesCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    authenticate: true,
  })
  $stateProvider.state('chat', {
    url: '/dasboard/chat?id',
    views : {
      'container': { templateUrl: 'dashboard/chat/chat.html', controller: 'ChatCtrl'},
      'nav': { templateUrl: 'shared/navigation/navigation.html', controller: 'NavCtrl'}
    },
    authenticate: true,
  })
  $stateProvider.state('board', {
    url: '/dasboard/board?id',
    views : {
      'container': { templateUrl: 'dashboard/board/board.html', controller: 'BoardCtrl'},
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
  $stateProvider.state('myDocuments', {
    url: '/dashboard/documents',
    views : {
      'container': { templateUrl: 'dashboard/document/document.html', controller: 'DocumentCtrl'},
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
.run(function ($rootScope, $state, UserService ) {
  $rootScope.url = 'http://localhost';
  //$rootScope.url = 'http://192.168.85.1';
  //$rootScope.url ='http://34.248.83.191';

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !UserService.isAuth()){
      // User isn’t authenticated
      $state.transitionTo("signin");
      event.preventDefault();
    }
  });
});
