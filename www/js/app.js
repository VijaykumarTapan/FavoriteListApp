// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller("FavoritesList", function ($scope, $http) {

    $scope.fields = {};

    $http({
        method: 'GET',
        url: 'http://localhost:3000/favorites',
        headers: {
          'Content-Type': 'application/json'
        }
        }).then(function successCallback(response) {
          $scope.favorites = response.data;
          console.log($scope.favorites);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });


    $scope.submitMyForm = function () {

      var formData = $scope.fields;
      console.log(formData.name);
      console.log(formData.author);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/favorites',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { "name": formData.name, "author": formData.author }
      }).then(function successCallback(response) {
        $scope.fields = {};
        formData = {};
        console.log("Success: " + response);
        $http({
          method: 'GET',
          url: 'http://localhost:3000/favorites',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function successCallback(response) {
          $scope.favorites = response.data;
          console.log($scope.favorites);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }, function errorCallback(response) {
        console.log("Error: " + response);
      });


    };

    $scope.deleteEntry = function (id) {
      //console.log("Deleted: " + id);
      var deleteUrl = "http://localhost:3000/favorites/" + id;
      console.log("Delete URL: " + deleteUrl);
      $http.delete(deleteUrl).success(function (response) {
        console.log(response);
        $http({
          method: 'GET',
          url: 'http://localhost:3000/favorites',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function successCallback(response) {
          $scope.favorites = response.data;
          console.log($scope.favorites);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      });
    };



  });