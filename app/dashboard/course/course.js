'use strict';

angular.module('NeoLearning.course', ['oitozero.ngSweetAlert', 'ngFileSaver'])
.controller('CourseCtrl', ['$scope', '$state', '$stateParams',  '$window', '$filter', 'UserService', 'CourseService', 'DocumentService', 'SweetAlert', 'FileSaver', function($scope, $state, $stateParams, $window, $filter, UserService, CourseService, DocumentService, SweetAlert, FileSaver) {
  $scope.course;
  var courseRequest = CourseService.api('course/' + $stateParams.id).get()
  courseRequest.$promise.then(function(result){
    if(result.success){
      $scope.course = result.data;
      console.log('result', result.data);
    }
  })
  $scope.courseId = $stateParams.id;
  $scope.itemsByPage=7;

  var addedStudents = [];
  $scope.addedStudentsTxt = addedStudents.join(' - ');

  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }

  if ($scope.courseId) {
    // GET documents
    $scope.displayedDocuments = [];
    var documentsRequest = DocumentService.get('documents/' + $scope.courseId );
    documentsRequest.then(function(result){
      if(result.status){
        console.log('result.data',result.data);
        $scope.displayedDocuments = result.data.data;
        $scope.rowDocuments = result.data.data;
        // fillStudentsTable(result.data);
      }else{
        //ERROR
      }
    })
  }

  // $scope.displayedStudents = [];
  // var usersRequest = UserService.api('user').get();
  // usersRequest.$promise.then(function(result){
  //   if(result.success){
  //     console.log('course', result.data);
  //     $scope.course = result.data;
  //   }
  // })

  console.log('id',$stateParams.id);
  $scope.registeredStudents = [];
    var userInCourseRequest = CourseService.api('course/'+ $stateParams.id +'/user').get();
    userInCourseRequest.$promise.then(function(result){
     console.log('result',result);
     if(result.success){
        $scope.registeredStudents = result.data.studentCourses;
        $scope.rowRegisteredStudents = result.data.studentCourses;
        $scope.courseTeacher = result.data.teacherCourses
     }else{

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
      console.log('TATA : ' ,result.data);
      if(result.success){

      }
    })
    }
    })
  }

  $scope.goToCourseDetail = function(course) {
    $state.go("course", { id: course.idCourse });
  };
}]);
