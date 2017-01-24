'use strict';

angular.module("NeoLearning")
.factory('UserCourseService', ['$resource', function ($resource) {
        return {
          documents: null,

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
