'use strict';

angular.module('NeoLearning.navigation', [])
.controller('NavCtrl', ['$scope', '$location', '$window', '$filter', 'UserService', 'CourseService', function($scope, $location, $window, $filter, UserService, CourseService) {

  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }

  // GET STUDENTS
  $scope.displayedStudents = [];
  var usersRequest = UserService.api('user').get();
  usersRequest.$promise.then(function(result){
    if(result.success){
      console.log(result.data);
      $scope.displayedStudents = result.data;
      $scope.rowStudents = result.data;
      // fillStudentsTable(result.data);
    }else{
      //ERROR
    }
  })

}]);
