'use strict';

angular.module("NeoLearning")
.factory('UserService', ['$resource', '$window','jwtHelper', '$rootScope', function ($resource, $window, jwtHelper, $rootScope) {
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
      return $resource($rootScope.url+'\:7029/' + url, {}, {
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
}]);
