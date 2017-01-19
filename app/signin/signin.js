'use strict';

angular.module('NeoLearning.signin', [])
// Signin controller
.controller('SigninCtrl', ['$scope', '$location' , 'AuthService', 'jwtHelper', function($scope, $location, AuthService, jwtHelper) {
  console.log("signin ctrl")
  // CHECK USER CREDENTIALS
  console.log(jwtHelper);
  $scope.login = function(){
    // AuthService.post({ email: $scope.email, password: $scope.password});
      console.log('$scope.password ', $scope.password , $scope.email);
    var user = AuthService('auth').post({email: $scope.email, password: $scope.password });
    user.$promise.then(function(result){
      var decryptedToken = jwtHelper.decodeToken(result.data)
      console.log(decryptedToken);
    })
    // AuthService.Login($scope.email, $scope.password, function(err, token){
    //   console.log(err);
    //   console.log(token);
    //   if(err){
    //
    //   }else{
    //     $location.path('/dashboard');
    //   }
  }
}]);
