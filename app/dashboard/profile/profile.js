'use strict';

angular.module('NeoLearning.profile', [])
.controller('ProfileCtrl', ['$scope', '$location', '$window', '$filter', 'UserService', 'SweetAlert', function($scope, $location, $window, $filter, UserService, SweetAlert) {

  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
      $scope.user = user;
      console.log('useruser', user);
  }
  $scope.editUser = function(){
    console.log('edit');
    console.log('$scope.user', $scope.user);
    var editUser = {
                firstName: $scope.user.firstName, lastName: $scope.user.lastName, city: $scope.user.city,
                phone: $scope.user.phone, address: $scope.user.address,
                birthdate: $scope.user.birthdate
               }

    if ($scope.user.password){
        editUser.password = $scope.user.password;
    }

    console.log('new user', editUser);

    UserService.api('user/' + $scope.user.idUser ).update(editUser).
    $promise.then(function(result){
       if(result.success){
         UserService.api('user/'+ $scope.user.idUser  + '/token').get().$promise
         .then(function(result){
           if(result.success){
             console.log('token' , result.data);
             $window.sessionStorage.token = result.data;
           }else{
              //Error
           }
         })
         SweetAlert.swal("Profil édité avec succès !", "", "success");
       }
    })
  }

}]);
