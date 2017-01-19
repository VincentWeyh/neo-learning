'use strict';

angular.module('NeoLearning.signin', [])
// Signin controller
.controller('SigninCtrl', ['$scope', '$location' , 'UserService', 'jwtHelper', function($scope, $location, UserService, jwtHelper) {
  // CHECK USER CREDENTIALS
  $scope.login = function(){
    var user = UserService('auth').post({email: $scope.email, password: $scope.password });
    user.$promise.then(function(result){
      console.log(result);
      if(result.success){
        $location.path('/dashboard');
        var decryptedToken = jwtHelper.decodeToken(result.data)
      }else{
        $scope.errorMessage = 'Identifiants incorrects'
      }
    })
  }
}]);
