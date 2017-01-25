'use strict';

angular.module('NeoLearning.dashboard', [])
.controller('DashCtrl', ['$scope', '$state', '$window', '$filter', 'UserService', 'CourseService', function($scope, $state, $window, $filter, UserService, CourseService) {

  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }

  // GET STUDENTS
  $scope.displayedStudents = [];
  var usersRequest = UserService.api('user').get();
  usersRequest.$promise.then(function(result){
    if(result.success){
      console.log('usersRequest :' , result.data);
      $scope.displayedStudents = result.data;
      $scope.rowStudents = result.data;
      // fillStudentsTable(result.data);
    }else{
      //ERROR
    }
  })

  // GET COURSES
  $scope.displayedCourses = [];
  // var coursesRequest = CourseService.api('course').get();
  // coursesRequest.$promise.then(function(result){
  //   if(result.success){
  //     $scope.displayedCourses = result.data;
  //     $scope.rowCourses = result.data;
  //   }
  //   else{
  //     // ERROR
  //   }
  // })

  // GET USER COURSES
  console.log('idUser',user);
  var userCourseRequest = CourseService.api('user/' + user.idUser + '/course').get();

  userCourseRequest.$promise.then(function(result){
    if(result.success){
      console.log('result mes cours ', result);
      // si user = teacher
      if (user.idRole == 1111 ){
        $scope.displayedCourses = result.data.teacherCourses;
        $scope.rowCourses = result.data.teacherCourses;
      }else{
        $scope.displayedCourses = result.data.studentCourses;
        $scope.rowCourses = result.data.studentCourses;
      }

    }
    else{
      // ERROR
    }
  })
  //GO TO USER DETAIL
  $scope.goToStudentDetail = function(user) {
    $state.go("student", { id: user.idUser });
  };

  // GO TO COURSE DETAIL
  $scope.goToCourseDetail = function(course) {
    $state.go("course", { id: course.idCourse });
  };



}]);
