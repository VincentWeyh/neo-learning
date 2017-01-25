'use strict';

angular.module('NeoLearning.courses', ['oitozero.ngSweetAlert'])
.controller('CoursesCtrl', ['$scope', '$state', '$stateParams',  '$window', '$filter', 'UserService', 'CourseService', 'SweetAlert', function($scope, $state, $stateParams, $window, $filter, UserService, CourseService, SweetAlert) {
  $scope.courseId = $stateParams.id;
  $scope.itemsByPage=7;

  var addedStudents = [];
  $scope.addedStudentsTxt = addedStudents.join(' - ');

  // GET USER INFO
  var user = UserService.getUser($window.sessionStorage.token);
  if(user){
      $scope.userName = user.firstName;
  }

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
    var registeredStudentsNames= [] ;
    var isFound = false;
    var iteration = 0;
    if(addedStudents.length > 0){
      for(var i = 0; i < addedStudents.length; i++) {
          if (addedStudents[i].idUser == student.idUser) {
            isFound = true;
            iteration = i;
          }
        }
        if (isFound){
            addedStudents.splice(iteration,1);
        }else{
            addedStudents.push(student);
        }
    }
    else
    {
      addedStudents.push(student);
      $scope.addedStudentsTxt = addedStudents.join(' - ').lastName;
    }
    for(var i = 0; i < addedStudents.length; i++) {
      registeredStudentsNames.push(addedStudents[i].lastName);
    }
      $scope.registeredStudentCount = addedStudents.length;
      $scope.addedStudentsTxt = registeredStudentsNames.join(' - ');
  }

  $scope.openEditModalCourse = function(selectedEditableCourse){
    var registeredStudentsNames= [];
    $scope.registeredStudentCount = null;
    $scope.addedStudentsTxt = null;
    addedStudents = [];
    $(".selectable-row").removeClass("st-selected");
    $scope.selectedEditableCourse = selectedEditableCourse;
    console.log('selectedCourse', $scope.selectedEditableCourse);
    var courseStudentAddRequest = CourseService.api('course/'+ selectedEditableCourse.idCourse +'/user').get();
    courseStudentAddRequest.$promise.then(function(result){
     if(result.success){
        console.log('registeredStudent', result.data.studentCourses);
        addedStudents = result.data.studentCourses;
          for(var i = 0; i < addedStudents.length; i++) {
            registeredStudentsNames.push(addedStudents[i].firstName);
          }
        $scope.addedStudentsTxt = registeredStudentsNames.join(' - ')
        $('#editModalCourse').modal('show');
     }
   })}

  $scope.editCourse = function(){
    var courseEditRequest = CourseService.api('course/' + $scope.selectedEditableCourse.idCourse ).update({label: $scope.selectedEditableCourse.label, description: $scope.selectedEditableCourse.description});
    courseEditRequest.$promise.then(function(result){
       if(result.success){
         SweetAlert.swal("Classe éditée avec succès !", "", "success");
       }
      $('#editModalCourse').modal('hide');
    })
  }

  $scope.openNewModalCourse = function(){
    $scope.registeredStudentCount = null;
    $scope.addedStudentsTxt = null;
    addedStudents = [];
    $(".selectable-row").removeClass("st-selected");
    $('#newModalCourse').modal('show');
  }

  $scope.addCourse = function(){
    var courseAddRequest = CourseService.api('course').post({label: $scope.courseName, description: $scope.courseDescription , idTeacher: user.idUser});
    courseAddRequest.$promise.then(function(resultId){
      if(resultId.success){
        var coursesRequest = CourseService.api('course/' + resultId.data).get();
        coursesRequest.$promise.then(function(result){
         if(result.success){
           $scope.displayedCourses.push(result.data);
           $scope.rowCourses.push(result.data);
           console.log('courseId', resultId.data);
           console.log('addedStudent', addedStudents);
           var addedStudentsId = [];
           addedStudents.forEach(function(value, key){
             addedStudentsId.push(value.idUser);
           })
           var usersCourseAddRequest = CourseService.api('course/' + resultId.data + '/user').post({ idUsers: addedStudentsId});
           usersCourseAddRequest.$promise.then(function(result){
             if(result.success){
               SweetAlert.swal("La classe " + $scope.courseName + " ajoutée avec succès !", "", "success");
             }else{
               SweetAlert.swal("Une erreur est survenue (" + result + ")", "", "error");
             }
           })
           $('#newModalCourse').modal('hide');
         }
       })
      }
      else
      {
        SweetAlert.swal("Une erreur est survenue ()", "", "error");
      }
    })
  }

  $scope.removeCourse = function(course){
    SweetAlert.swal({
          title: "Êtes-vous sûr de vouloir supprimer la classe " + course.label + "?",
          text: "Vous ne pourrez pas restaurer cette classe !",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Oui, supprimer la classe!",
          cancelButtonText: "Annuler",
          closeOnConfirm: false,
          closeOnCancel: false
      },
      function(isConfirm){
          if(isConfirm){
            var courseDeleteRequest = CourseService.api('course/' + course.idCourse).remove();
            courseDeleteRequest.$promise.then(function(result){
              if(result.success){
                var index = $scope.rowCourses.indexOf(course);
                  if(index !== -1){
                    $scope.rowCourses.splice(index, 1);
                  }
                  SweetAlert.swal("Classe supprimée !", "", "success");
              }
              else
              {
                SweetAlert.swal("Erreur lors de la suppression!");
                console.log('result error', result);
              }
            })
          }
           else
          {
              SweetAlert.swal("Classe conservée!");
          }
      });
    }

    $scope.goToCourseDetail = function(course) {
      $state.go("course", { id: course.idCourse });
    };
}]);
