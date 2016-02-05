var myApp = angular.module("myApp", ["firebase"]);

myApp.controller("MyController", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    //CREATE A FIREBASE REFERENCE
    var ref = new Firebase("https://glaring-torch-6272.firebaseio.com");

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // the access token will allow us to make Open Graph API calls
        console.log(authData.facebook.accessToken);
      }
    }, {
      scope: "email,user_likes" // the permissions requested
    });
    // GET MESSAGES AS AN ARRAY
    $scope.messages = $firebaseArray(ref);

    //ADD MESSAGE METHOD
    $scope.addMessage = function(e) {

      //LISTEN FOR RETURN KEY
      if (e.keyCode === 13 && $scope.msg) {
        //ALLOW CUSTOM OR ANONYMOUS USER NAMES
        var name = $scope.name || "anonymous";

        //ADD TO FIREBASE
        $scope.messages.$add({
          from: name,
          body: $scope.msg
        });

        //RESET MESSAGE
        $scope.msg = "";
      }
    }
  }
]);
