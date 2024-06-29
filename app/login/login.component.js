"use strict";

angular
  .module("login", ["MusicManagement"])
  .component("login", {
    templateUrl: "login/login.template.html",
    controller: "loginController",
  })
  .controller("loginController", [
    "$http",
    "AuthService",
    "$location",
    "usSpinnerService",
    function loginController($http, AuthService, $location, usSpinnerService) {
      var vm = this;
      vm.username = "";
      vm.password = "";
      vm.isLoading = false;
      vm.login = function login() {
        usSpinnerService.spin("spinner-1");
        vm.isLoading = true;
        AuthService.login(vm.username, vm.password)
          .then(function (response) {
            $location.path("/home");
            console.log("Logged in successfully");
            usSpinnerService.stop("spinner-1");
            vm.isLoading = false;
          })
          .catch(function (error) {
            alert("Login failed. Please try again.");
          });
      };
    },
  ]);
