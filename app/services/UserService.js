'use strict';

angular.module("NeoLearning")
.factory('UserService', ['$resource', function ($resource) {
        return function(url){
          return $resource('http://localhost\:7029/' + url, {}, {
                post: { method: "POST"},
                get: { method: "GET"},
                remove: { method: "DELETE"},
                update: { method: "PUT"}
            });
        }
      }


            // var service = {};


            // function (email, password, callback) {
            //     console.log("email :" + email, "password : " + password);
            //     $http({
            //       method: 'POST',
            //       url: 'localhost:7029/auth',
            //       headers: {
            //         'Access-Control-Allow-Headers': 'Content-Type',
            //         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            //         'Access-Control-Allow-Origin': '*'
            //       },
            //       data: { email: email, password: password }
            //     }).then(function (response) {
            //          callback(null, response);
            //     }, function(err){
            //          callback(err);
            //     });
            // };

          // return service;
]);
