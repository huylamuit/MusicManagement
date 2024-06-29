"use strict";

// Register `phoneDetail` component, along with its associated controller and template
angular.module("home").component("infoBar", {
  templateUrl: "home/info-bar/info-bar.template.html",
  bindings: {
    selectedSongs: "<",
    totalSongs: "<",
    selectedSize: "<",
    changeSize: "&",
  },
  controller: "infoBarController",
});

angular.module("home").controller("infoBarController", [
  "$scope",
  function infoBarController($scope) {
    $scope.onChangeSize = function (size) {
      if ($scope.changeSize) {
        $scope.changeSize(size);
      }
    };
  },
]);
