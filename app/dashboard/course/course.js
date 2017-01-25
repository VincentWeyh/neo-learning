'use strict';

angular.module('NeoLearning.course', ['ngFileSaver'])
.controller('CourseCtrl', ['$scope', '$stateParams',  '$window', '$filter', 'UserService', 'CourseService', 'DocumentService' , 'FileSaver' ,function($scope, $stateParams, $window, $filter, UserService, CourseService, DocumentService, FileSaver) {
  $scope.courseId = $stateParams.id;

  var addedStudents = [];
  $scope.addedStudentsTxt = addedStudents.join(' - ');

  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }
  
  if ($scope.courseId){
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

   //console.log('documentsRequest: ',documentsRequest)
  // GET STUDENTS
  $scope.displayedCourses = [];
  var coursesRequest = CourseService.api('course').get();
  coursesRequest.$promise.then(function(result){
    if(result.success){
      $scope.displayedCourses = result.data;
      $scope.rowCourses = result.data;
    }else{
      //ERROR
    }
  })

	$scope.itemsByPage=7;

  // GET STUDENTS
  $scope.displayedStudents = [];
  var usersRequest = UserService.api('user').get();
  usersRequest.$promise.then(function(result){
    if(result.success){
      $scope.displayedStudents = result.data;
      $scope.rowStudents = result.data;
    }else{
      //ERROR
    }
  })

  $scope.addStudent = function(student){
    if(addedStudents.length > 0){
    for(var i = 0; i < addedStudents.length; i++) {
        if (addedStudents[i] == student.idUser) {
          addedStudents.splice(i,1);
          break;
        }
        else
        {
          addedStudents.push(student.idUser);
          break;
        }
      }
    }else{
      addedStudents.push(student.idUser);
    }
  }

  $scope.addCourse = function(course){
    console.log('addcourse');
      console.log('addcourse' , addedStudents);
      /*console.log('courseName', $scope.courseName);
    console.log('courseDescription', $scope.courseDescription);
    var courseAddRequest = CourseService.api('course').post({label: $scope.courseName, description: $scope.courseDescription });
    courseAddRequest.$promise.then(function(result){
      if(result.success){
        console.log('result success', result.data);
        var coursesRequest = CourseService.api('course/' + result.data).get();
        coursesRequest.$promise.then(function(result){
         if(result.success){
           console.log('result', result.data);
           $scope.displayedCourses.push(result.data);
           $scope.rowCourses.push(result.data);
           $('#addCourseModal').modal('hide')
         }
       })
      }
      else
      {
        console.log('result error', result);
      }
    })*/
  }

  $scope.removeCourse = function(course){
    console.log('deletedcourse', course);
    var courseDeleteRequest = CourseService.api('course/' + course.idCourse).remove();
    courseDeleteRequest.$promise.then(function(result){
      if(result.success){
        console.log('result', result.data);
        var index = $scope.rowCourses.indexOf(course);
          if(index !== -1){
            $scope.rowCourses.splice(index, 1);
          }
      }
      else
      {

      }
    })
  }

  $scope.download = function(document){
    var documentRequest = DocumentService.download('document/' + document.idDocument  );
    documentRequest.then(function(result){
      if(result.status){
         var blob = new Blob([result.data], { type: 'application/octet-stream' });
         FileSaver.saveAs(blob, document.originalName);
      }else{
        //ERROR
      }
    })
  }

}]);
