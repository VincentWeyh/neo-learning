'use strict';

angular.module('NeoLearning.courses', ['oitozero.ngSweetAlert'])
.controller('CoursesCtrl', ['$scope', '$state', '$stateParams',  '$window', '$filter', 'UserService', 'CourseService', 'SweetAlert', function($scope, $state, $stateParams, $window, $filter, UserService, CourseService, SweetAlert) {
  $scope.courseId = $stateParams.id;
  $scope.itemsByPage=7;

  var oldRegisteredStudents = [];
  var addedStudents = [];
  var studentsToAdd= [];
  var studentsToRemove = [];

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
      $scope.addedStudentsTxt = registeredStudentsNames.join(' - ');
      // $scope.addedStudentsTxt = addedStudents.join(' - ').lastName;
    }
    for(var i = 0; i < addedStudents.length; i++) {
      registeredStudentsNames.push(addedStudents[i].firstName + " " + addedStudents[i].lastName);
    }
      $scope.registeredStudentCount = addedStudents.length;
      $scope.addedStudentsTxt = registeredStudentsNames.join(' - ');
  }

  $scope.addMoreStudent = function(student){
    var registeredStudentsNames = [];
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
          studentsToRemove.push(student);
          addedStudents.splice(iteration,1);
        }else{
          studentsToAdd.push(student);
          addedStudents.push(student);
        }
    }
    else
    {
      studentsToAdd.push(student);
      addedStudents.push(student);
      $scope.addedStudentsTxt = addedStudents.join(' - ').lastName;
    }
    for(var i = 0; i < addedStudents.length; i++) {
      registeredStudentsNames.push(addedStudents[i].firstName + " " + addedStudents[i].lastName);
    }
      $scope.registeredStudentCount = addedStudents.length;
      $scope.addedStudentsTxt = registeredStudentsNames.join(' - ');
  }

  $scope.openEditModalCourse = function(selectedEditableCourse){
    var registeredStudentsNames= [];
    $scope.registeredStudentCount = null;
    $scope.addedStudentsTxt = null;
    $(".selectable-row").removeClass("st-selected");
    $scope.selectedEditableCourse = selectedEditableCourse;
    CourseService.api('course/'+ selectedEditableCourse.idCourse +'/user').get()
    .$promise.then(function(result){
     if(result.success){
        addedStudents = result.data.studentCourses;
        oldRegisteredStudents = JSON.parse(JSON.stringify(result.data.studentCourses));
          for(var i = 0; i < addedStudents.length; i++) {
            registeredStudentsNames.push(addedStudents[i].lastName + " " + addedStudents[i].firstName);
          }
        $scope.addedStudentsTxt = registeredStudentsNames.join(' - ')
        $('#editModalCourse').modal('show');
     }
   })}

  $scope.editCourse = function(){
    var studentsToRemove = [];

    if(addedStudents.length > 0){
      if(oldRegisteredStudents.length == 0){
        studentsToAdd = addedStudents;
      }
      //Eleve a supprimer
      if(oldRegisteredStudents.length > 0 ){
        for(var i = 0; i < oldRegisteredStudents.length; i++) {
          var isRemove = true;
          for(var j = 0; j < addedStudents.length; j++) {
            if(addedStudents[j].idUser == oldRegisteredStudents[i].idUser) {
              isRemove = false;
            }
          }
          if(isRemove){
            studentsToRemove.push(oldRegisteredStudents[i]);
          }
        }
      }
      addedStudents = addedStudents.filter(function(val) {
        for(var i = 0; i < oldRegisteredStudents.length; i++){
          if(val.idUser == oldRegisteredStudents[i].idUser){
              return false;
          }
        }
        return true;
      });
    }else{
        studentsToRemove = oldRegisteredStudents;
    }

    var studentsIdToAdd = [];
    addedStudents.forEach(function(studentToAdd){
      studentsIdToAdd.push(studentToAdd.idUser);
    })

    var studentsIdToRemove = [];
    studentsToRemove.forEach(function(studentToRemove){
      studentsIdToRemove.push(studentToRemove.idUser);
    })

    CourseService.api('course/' + $scope.selectedEditableCourse.idCourse ).update({label: $scope.selectedEditableCourse.label, description: $scope.selectedEditableCourse.description})
    .$promise.then(function(resultEditCourse){
     if(resultEditCourse.success){
       CourseService.api('course/' + $scope.selectedEditableCourse.idCourse + '/user').post({ idUsers: studentsIdToAdd})
       .$promise.then(function(resultStudentToAdd){
         if(resultStudentToAdd.success){
           CourseService.remove('course/' + $scope.selectedEditableCourse.idCourse + '/user', {idUsers: studentsIdToRemove})
           .then(function(resultStudentToRemove){
             if(resultStudentToRemove.status === 200){
               SweetAlert.swal("Classe éditée avec succès !", "", "success");
             }else{
               SweetAlert.swal("Une erreur est survenue (" + resultStudentToRemove.message + ")", "", "error");
             }
           });
         }else{
           SweetAlert.swal("Une erreur est survenue (" + resultStudentToAdd.message + ")", "", "error");
         }
       })
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
           var addedStudentsId = [];
           addedStudents.forEach(function(value, key){
             addedStudentsId.push(value.idUser);
           })
           var usersCourseAddRequest = CourseService.api('course/' + resultId.data + '/user').post({ idUsers: addedStudentsId});
           usersCourseAddRequest.$promise.then(function(result){
             if(result.success){
               SweetAlert.swal("La classe " + $scope.courseName + " ajoutée avec succès !", "", "success");
             }else{
               SweetAlert.swal("Une erreur est survenue (" + result.message + ")", "", "error");
             }
           })
           $('#newModalCourse').modal('hide');
         }
       })
      }
      else
      {
        SweetAlert.swal("Une erreur est survenue (" + resultId.message + ")", "", "error");
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
