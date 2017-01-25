'use strict';

angular.module("NeoLearning")
.factory('CourseService', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return {
      api: function(url){
        return $resource($rootScope.url+'\:7029/' + url, {}, {
            post: { method: "POST"},
            get: { method: "GET"},
            remove: { method: "DELETE"},
            update: { method: "PUT"},
        });
      },
    }
  }
]);
