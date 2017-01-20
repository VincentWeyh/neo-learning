'use strict';

angular.module('NeoLearning.document', [])
.controller('DocumentCtrl', ['$scope', '$location', '$window', '$filter', 'UserService', 'CourseService', function($scope, $location, $window, $filter, UserService, CourseService) {
  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }
}]);
