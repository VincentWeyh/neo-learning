'use strict';

angular.module('NeoLearning.course', ['oitozero.ngSweetAlert', 'ngFileSaver'])
.factory('socket', function (socketFactory) {
    return socketFactory({
      ioSocket: io.connect('localhost:7050')
    });
}).controller('CourseCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$window', '$filter', 'UserService', 'CourseService', 'DocumentService', 'SweetAlert', 'FileSaver', 'socket', function($scope, $rootScope, $state, $stateParams, $window, $filter, UserService, CourseService, DocumentService, SweetAlert, FileSaver, socket) {

  $scope.users = [];
  $scope.usersConnected = [];
  $scope.messages = {};
  $scope.messages[UserService.getUser($window.sessionStorage.token).idUser] = {};
  $scope.messages[UserService.getUser($window.sessionStorage.token).idUser].message = '';

  $scope.$on('$destroy', function(event) {
    socket.emit('disconnect');
  });

  $scope.getMessage = function(data) {
    if(typeof data !== 'undefined') {
      $scope.messages[UserService.getUser($window.sessionStorage.token).idUser].message = data;
    }
    return $scope.messages[UserService.getUser($window.sessionStorage.token).idUser].message;
  };

  $scope.enter = function(keyEvent, message) {
    if (keyEvent.which === 13) {
      $scope.doPost($scope.getMessage());
    }
  };

  socket.on('connect', function () {
    $scope.joinRoom({});
  });

  socket.on('updatechat', function (username, data, usersConnected) {
    var user = {};
    $scope.usersConnected = Object.assign({}, usersConnected);
    user.username = username;
    user.message = data;
    user.date = new Date().getTime();
    user.image = 'http://dummyimage.com/100x100/000/fff&text=' + username.charAt(0).toUpperCase();
    $scope.users.push(user);
    setTimeout(function() {
     var element = document.getElementById("yourDivID");
     var inputData = document.getElementById("data");
     element.scrollTop = element.scrollHeight;
    }, 0);
  });

  socket.on('roomcreated', function (data) {
    socket.emit('adduser', data);
  });

  $scope.joinRoom = function (data) {
    var user = UserService.getUser($window.sessionStorage.token);
    data.username = user.firstName + '_' + user.lastName;
    data.room = $stateParams.id;
    $scope.currentUser = data.username;
    console.log(data.username);
    socket.emit('userconnect', data.username);
    socket.emit('adduser', data);
  }

  $scope.doPost = function (message) {
    if(!message) {
      return;
    }
    socket.emit('sendchat', message);
    setTimeout(function() {
     var element = document.getElementById("yourDivID");
     var inputData = document.getElementById("data");
     inputData.value = '';
     $scope.messages[UserService.getUser($window.sessionStorage.token).idUser].message = '';
     element.scrollTop = element.scrollHeight;
    }, 0);
  }

  CourseService.api('course/' + $stateParams.id).get()
  .$promise.then(function(result){
    if(result.success){
      $scope.course = result.data;
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

  CourseService.api('course/'+ $scope.courseId).get().$promise
  .then(function(result){
     if(result.success){
       $scope.course= result.data;
     }else{
       //ERROR
     }
   })

  $rootScope.resfreshDocument = function(){
    var documentsRequest = DocumentService.get('documents/' + $scope.courseId );
    documentsRequest.then(function(result){
      if(result.status){
        $scope.displayedDocuments = result.data.data;
        $scope.rowDocuments = result.data.data;
        // fillStudentsTable(result.data);
      }else{
        //ERROR
      }
    })
  };

  $scope.displayedDocuments = [];
  if ($scope.courseId) {
    $rootScope.resfreshDocument();
  }

  $scope.registeredStudents = [];
    CourseService.api('course/'+ $stateParams.id +'/user').get()
    .$promise.then(function(result){
     if(result.success){
        $scope.registeredStudents = result.data.studentCourses;
        $scope.rowRegisteredStudents = result.data.studentCourses;
        $scope.courseTeacher = result.data.teacherCourses
     }else{
       //ERROR
     }
  })

  $scope.displayedCourses = [];
  CourseService.api('course').get()
  .$promise.then(function(result){
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
    })
  }

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

  $scope.download = function(document){
    var documentRequest = DocumentService.download('document/' + document.idDocument  );
    documentRequest.then(function(result){
      if(result.status){
        var blob = new Blob([result.data], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, document.originalName);
        }else{
          //ERROR
          var documentRequest = DocumentService.api('document/' + document.idDocument ).get();
          documentRequest.$promise.then(function(result){
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
