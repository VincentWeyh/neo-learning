'use strict';

angular.module('NeoLearning.document', [])
.controller('CourseCtrl', ['$scope', '$stateParams',  '$window', '$filter', 'UserService', 'CourseService', function($scope, $stateParams, $window, $filter, UserService, CourseService) {
  $scope.courseId = $stateParams.id;

  var addedStudents = [];
  $scope.addedStudentsTxt = addedStudents.join(' - ');

  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }

  // GET STUDENTS
  $scope.displayedCourses = [];
  var coursesRequest = CourseService.api('course').get();
  coursesRequest.$promise.then(function(result){
    if(result.success){
      $scope.displayedCourses = result.data;
      $scope.rowCourses = result.data;
      // fillStudentsTable(result.data);
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
      // fillStudentsTable(result.data);
    }else{
      //ERROR
    }
  })

  $scope.addStudent = function(student){
    if(addedStudents.length > 0){
    for(var i = 0; i < addedStudents.length; i++) {
        if (addedStudents[i].idUser == student.idUser) {
          addedStudents.splice(i,1);
          break;
        }
        else
        {
          addedStudents.push(student);
        }
      }
    }else{
      addedStudents.push(student);
    }
  }

  $scope.addCourse = function(course){
    console.log('addcourse');
    console.log('courseName', $scope.courseName);
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
           $('#addCourseModal').modal('hide')
         }
       })
      }
      else
      {
        console.log('result error', result);
      }
    })
  }

  $scope.removeCourse = function(course){
    var courseDeleteRequest = CourseService.api('course/' + course.idCourse).remove();
    courseDeleteRequest.$promise.then(function(result){
      if(result.success){
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

}]);
