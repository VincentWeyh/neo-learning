'use strict';

angular.module("NeoLearning")
.factory('DocumentService', ['$http', '$rootScope', function ($http, $rootScope) {
        return {
          // api: function(url, data) {
            // return
            // {
              post: function(url, data) {
                    return $http({
                      method: 'GET',
                      url: $rootScope.url+'\:7029/' + url,
                      data: data
                    })
              },

              get: function(url) {
                    return $http({
                      method: 'GET',
                      url: $rootScope.url+'\:7029/' + url
                    })
              },
              download: function(url) {
                    return $http({
                      method: 'GET',
                      url: $rootScope.url+'\:7029/' + url,
                      responseType: 'blob'
                    })
              }
            }
}]);
