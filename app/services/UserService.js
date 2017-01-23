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


          
]);
