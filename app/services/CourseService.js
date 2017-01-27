'use strict';

angular.module("NeoLearning")
.factory('CourseService', ['$resource', '$rootScope','$http', function ($resource, $rootScope, $http) {
    return {
      api: function(url){
        return $resource($rootScope.url+'\:7029/' + url, {}, {
            post: { method: "POST"},
            get: { method: "GET"},
            update: { method: "PUT"},
            remove: { method: "DELETE"}
        });
      },
      remove: function(url, data){
        return $http({
            method: 'DELETE',
            url: $rootScope.url+'\:7029/' + url,
            data: data,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        })
      }
    }
  }
]);
