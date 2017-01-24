'use strict';

angular.module("NeoLearning")
.factory('DocumentService', ['$http', function ($http) {
        return {
          // api: function(url, data) {
            // return
            // {
              post: function(url, data) {
                    return $http({
                      method: 'GET',
                      url: 'http://localhost\:7029/' + url,
                      data: data
                    })
              },

              get: function(url) {
                    return $http({
                      method: 'GET',
                      url: 'http://localhost\:7029/' + url
                    })
              },
              download: function(url) {
                    return $http({
                      method: 'GET',
                      url: 'http://localhost\:7029/' + url,
                      responseType: 'blob'
                    })
              }
            }
}]);
