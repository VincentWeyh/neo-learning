'use strict';

angular.module('NeoLearning.uploadCourse', [])
      .controller('UploadCourseCtrl', ['$scope', '$stateParams', '$window', 'FileUploader', 'UserService', 'UserCourseService', 'DocumentService', '$rootScope', function($scope, $stateParams, $window, FileUploader, UserService, UserCourseService, DocumentService, $rootScope) {

        // COURSE ID (URL)
        var courseId = $stateParams.id;
        console.log('PARAMS : ', $stateParams);
        var uploader = $scope.uploader = new FileUploader({
            url: $rootScope.url+'\:7029/document'
        });

        var user = UserService.getUser($window.sessionStorage.token);
        if(user){
          //on recupere le userId

            var userID = user.idUser;

        }

        // on recupere le idUserCourse
        var userCourseRequest = UserCourseService.api('userCourse/'+ userID + '/' + courseId).get()
        .$promise.then(function(result){
          console.log('ALLO : ', result);
          if(result.success){

            console.log('result.data',result.data);
            // FILTERS
            // a sync filter
            uploader.filters.push({
                name: 'syncFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    console.log('syncFilter');
                    return this.queue.length < 10;
                }
            });

            // an async filter
            uploader.filters.push({
                name: 'asyncFilter',
                fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                    console.log('asyncFilter');
                    setTimeout(deferred.resolve, 1e3);
                }
            });
            // CALLBACKS

            uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);

            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem', item);
                item.formData = [{
                    idUserCourse: result.data[0].idUserCourse,
                    idCourse: courseId,
                    description: 'desc'
                  }];
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                // on refresh document du $scope Course.js
                $rootScope.resfreshDocument();

            };
            uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
            };
          }else{
            //ERROR
            console.log('ERROR');
          }
        })

    }]);
