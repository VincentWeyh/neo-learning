'use strict';

angular.module("NeoLearning")
.factory('ExamService', ['$resource' ,'$rootScope', function ($resource, $rootScope) {
        return {
          users: null,

          api: function(url){
            return $resource($rootScope.url+'\:7029/' + url, {}, {
                  post: { method: "POST"},
                  get: { method: "GET"},
                  remove: { method: "DELETE"},
                  update: { method: "PUT"},
              });
          }
        }
      }
]);
