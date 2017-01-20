'use strict';

angular.module("NeoLearning")
.factory('UserService', ['$resource', '$window','jwtHelper', function ($resource, $window, jwtHelper) {
        return {
          getUser: function(token){
            if(token){
              return jwtHelper.decodeToken(token);
            }else{
              return 'no user data found';
            }
          },
          getUserToken: function(){
            if($window.sessionStorage.token){
              return $window.sessionStorage.token;
            }else{
              return 'no token found';
            }
          },
          api: function(url){
            return $resource('http://localhost\:7029/' + url, {}, {
                  post: { method: "POST"},
                  get: { method: "GET"},
                  remove: { method: "DELETE"},
                  update: { method: "PUT"},
              });
          },
          isAuth: function() {
            return true;
          }
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
