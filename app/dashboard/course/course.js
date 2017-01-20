'use strict';

angular.module('NeoLearning.document', [])
.controller('CourseCtrl', ['$scope', '$stateParams',  '$window', '$filter', 'UserService', 'CourseService', function($scope, $stateParams, $window, $filter, UserService, CourseService) {
  $scope.courseId = $stateParams.id;
  console.log('id', $stateParams);
  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }
}]);
