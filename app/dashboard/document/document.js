'use strict';

angular.module('NeoLearning.document', [])
    .controller('DocumentCtrl', ['$scope', '$stateParams', '$window', 'FileUploader', 'UserService', 'UserCourseService', 'DocumentService', '$rootScope', 'FileSaver', function($scope, $stateParams, $window, FileUploader, UserService, UserCourseService, DocumentService, $rootScope, FileSaver) {


    // GET USER INFO
    var user = UserService.getUser($window.sessionStorage.token);

    // GET documents
     $scope.displayedDocuments = [];
     var documentsRequest = DocumentService.get('documents/user/' + user.idUser );
     documentsRequest.then(function(result){
       if(result.status){
         console.log('result.data',result.data);
         $scope.displayedDocuments = result.data.data;
         //$scope.rowDocuments = result.data.data;
         // fillStudentsTable(result.data);
       }else{
         //ERROR
       }
     })
     $scope.download = function(document){

       var documentRequest = DocumentService.download('document/' + document.idDocument  );
       documentRequest.then(function(result){
         if(result.status){
            var blob = new Blob([result.data], { type: 'application/octet-stream' });
            FileSaver.saveAs(blob, document.originalName);
         }else{
           //ERROR

       console.log('document', document);
       var documentRequest = DocumentService.api('document/' + document.idDocument ).get();
       documentRequest.$promise.then(function(result){
         if(result.success){


             }
           })
         }
       })
     }

}]);
