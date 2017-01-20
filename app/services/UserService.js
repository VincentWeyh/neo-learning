'use strict';

angular.module("NeoLearning")
.factory('UserService', ['$resource', '$window','jwtHelper', function ($resource, $window, jwtHelper) {
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
      return $resource('http://localhost\:7029/' + url, {}, {
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
