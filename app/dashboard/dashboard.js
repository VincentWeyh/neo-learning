'use strict';

angular.module('NeoLearning.dashboard', [])
// Signin controller
.controller('DashCtrl', ['$scope', '$location' , 'UserService', function($scope, $location, UserService) {
  $scope.students = function(){

  }

  $scope.login = function(){
    var user = UserService('auth').post({email: $scope.email, password: $scope.password });
    user.$promise.then(function(result){
      var decryptedToken = jwtHelper.decodeToken(result.data)
      console.log(decryptedToken);
      $location.path('/dashboard');
    })
  }
}]);
