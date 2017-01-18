'use strict';
angular.module('myApp.chat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {
        templateUrl: 'chat/chat.html',
        controller: 'ChatCtrl'
    });
}])
/* Controllers */
.controller('ChatCtrl', function ($scope, socket) {
  console.log('SOCKET : ', socket);
  $scope.users = [];
  $scope.curtrentUser = '';

  socket.on('connect', function () { });

  socket.on('updatechat', function (username, data) {
    var user = {};
    user.username = username;
    user.message = data;
    user.date = new Date().getTime();
    user.image = 'http://dummyimage.com/250x250/000/fff&text=' + username.charAt(0).toUpperCase();
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

  $scope.createRoom = function (data) {
    $scope.curtrentUser = data.username;
    socket.emit('createroom', data);
  }

  $scope.joinRoom = function (data) {
    $scope.curtrentUser = data.username;
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
})


/* Services */
.factory('socket', function ($rootScope) {
  var socket = io.connect('http://127.0.0.1:9000');

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            alert('callback');
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
