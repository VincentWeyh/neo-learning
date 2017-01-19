'use strict';

angular.module('NeoLearning.dashboard', [])
.controller('DashCtrl', ['$scope', '$location', '$window', 'UserService', function($scope, $location, $window, UserService) {

  console.log($window.sessionStorage.token);
  console.log("user", $window.sessionStorage.user);

  $scope.students = function(){
    console.log(UserService.api('user').get());
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
