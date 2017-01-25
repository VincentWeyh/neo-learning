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

  // // GET COURSES
  // $scope.displayedCourses = [];
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
  $scope.displayedCoursesStudent = [];
  $scope.displayedCoursesTeacher = [];
  var userCourseRequest = CourseService.api('user/' + user.idUser + '/course').get();

  userCourseRequest.$promise.then(function(result){
    if(result.success){
      console.log('result mes cours ', result);
      // si user = teacher
      // if (user.idRole == 1111 ){
      //   $scope.displayedCoursesTeacher = result.data.teacherCourses;
      //   $scope.rowCoursesTeacher = result.data.teacherCourses;
      // }else{
        $scope.displayedCoursesTeacher = result.data.teacherCourses;
        $scope.rowCoursesTeacher =  result.data.teacherCourses;
        $scope.displayedCoursesStudent = result.data.studentCourses;
        $scope.rowCoursesStudent = result.data.studentCourses;
      // }

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
