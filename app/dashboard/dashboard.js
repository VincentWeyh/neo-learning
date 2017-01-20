'use strict';

angular.module('NeoLearning.dashboard', [])
.controller('DashCtrl', ['$scope', '$location', '$window', 'UserService', function($scope, $location, $window, UserService) {

  var user = UserService.getUser($window.sessionStorage.token);

  if(user){
      $scope.userName = user.firstName;
  }

  // $scope.students  = [];

  var students = [];

  var users = UserService.api('user').get();
  users.$promise.then(function(result){
    if(result.success){
      fillStudentsTable(result.data);
    }else{
      //ERROR
    }
  })

  function fillStudentsTable(users){
    angular.forEach(users, function(user, key) {
      this.push(user);
    }, students);
    $scope.students = students;
    console.log('students', $scope.students);
  }

  console.log('Example collection', $scope.rowCollection);

  $scope.students = function(){
    console.log('users', UserService.api('user').get());
  }

  $scope.login = function(){
    var user = UserService('auth').post({email: $scope.email, password: $scope.password });
    user.$promise.then(function(result){
      $location.path('/dashboard');
    })
  }
}]);
