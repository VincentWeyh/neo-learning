'use strict';

angular.module("NeoLearning")
.factory('UploadService', ['$resource', function ($resource) {
        return {
          users: null,

          api: function(url){
            return $resource('http://localhost\:7029/' + url, {}, {
                  post: { method: "POST"},
                  get: { method: "GET"},
                  remove: { method: "DELETE"},
                  update: { method: "PUT"},
              });
          }
        }
      }
]);
