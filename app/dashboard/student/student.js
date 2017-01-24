'use strict';

angular.module('NeoLearning.student', [])
.controller('StudentCtrl', ['$scope', '$stateParams', '$location', '$window', '$filter', 'UserService', 'CourseService', function($scope, $stateParams, $location, $window, $filter, UserService, CourseService) {
  console.log($stateParams.id);
  var user = $stateParams.student;
  console.log('user', user);
}]);
