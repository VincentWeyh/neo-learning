'use strict';

angular.module('NeoLearning.signin', [])
// Signin controller
.controller('SigninCtrl', ['$scope', '$location', function($scope, $location) {
  console.log("signin ctrl")
  // CHECK USER CREDENTIALS
  $scope.login = function(){
    console.log("login attempt");
    $location.path('/dashboard');
  }
}]);
