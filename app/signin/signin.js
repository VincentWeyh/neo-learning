'use strict';

angular.module('NeoLearning.signin', [])
// Signin controller
.controller('SigninCtrl', ['$scope', '$location', '$window', 'UserService', 'jwtHelper', function($scope, $location, $window, UserService, jwtHelper) {
  // CHECK USER CREDENTIALS
  $scope.login = function(){
    var user = UserService.api('auth').post({email: $scope.email, password: $scope.password });
    user.$promise.then(function(result){
      if(result.success){
        
        $window.sessionStorage.token = result.data;
        $location.path('/dashboard');
      }else{
        $scope.errorMessage = 'Identifiants incorrects'
      }
    })
  }
}]);
