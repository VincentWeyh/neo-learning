'use strict';

angular.module('NeoLearning.chat', ['btford.socket-io'])
  .factory('socket', function (socketFactory) {
    return socketFactory({
      ioSocket: io.connect('localhost:7050')
    });
}).controller('ChatCtrl', ['$scope', '$stateParams',  '$window', '$filter', 'UserService', 'CourseService', 'socket', function($scope, $stateParams, $window, $filter, UserService, CourseService, socket) {
  $scope.courseId = $stateParams.id;

  $scope.users = [];

  $scope.enter = function(keyEvent, message) {
    if (keyEvent.which === 13) {
      $scope.doPost(message);
    }
  }

  socket.on('connect', function () { });

  socket.on('updatechat', function (username, data) {
    var user = {};
    user.username = username;
    user.message = data;
    user.date = new Date().getTime();
    user.image = 'http://dummyimage.com/100x100/000/fff&text=' + username.charAt(0).toUpperCase();
    $scope.users.push(user);
    setTimeout(function() {
     var element = document.getElementById("yourDivID");
     var inputData = document.getElementById("data");
     inputData.value = '';
     $scope.message = '';
     element.scrollTop = element.scrollHeight;
    }, 0);
  });

  socket.on('roomcreated', function (data) {
    socket.emit('adduser', data);
  });

  $scope.joinRoom = function (data) {
    var user = UserService.getUser($window.sessionStorage.token);
    data.username = user.firstName + '_' + user.lastName;
    $scope.currentUser = data.username;
    socket.emit('adduser', data);
  }

  $scope.doPost = function (message) {
    if(!message) {
      return;
    }
    socket.emit('sendchat', message);
    setTimeout(function() {
     var element = document.getElementById("yourDivID");
     var inputData = document.getElementById("data");
     inputData.value = '';
     $scope.message = '';
     element.scrollTop = element.scrollHeight;
    }, 0);
  }

}]);
