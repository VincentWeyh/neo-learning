'use strict';

angular.module("NeoLearning")
.factory('CourseService', ['$resource', function ($resource) {
    return {
      api: function(url){
        console.log("api course");
        return $resource('http://localhost\:7029/' + url, {}, {
            post: { method: "POST"},
            get: { method: "GET"},
            remove: { method: "DELETE"},
            update: { method: "PUT"},
        });
      },
    }
  }
]);
