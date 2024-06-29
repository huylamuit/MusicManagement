"use strict";

// Register `phoneDetail` component, along with its associated controller and template
angular.module("add").component("add", {
  templateUrl: "add/add.template.html",
  controller: "addController",
});

angular.module("add").controller("addController", [
  "$scope",
  "$routeParams",
  "$location",
  "$http",
  "$log",
  "AddServices",
  "usSpinnerService",
  function addController(
    $scope,
    $routeParams,
    $location,
    $http,
    $log,
    AddServices,
    usSpinnerService
  ) {
    $scope.isSelectingGenre = true;
    $scope.genre = [];
    $scope.newGenre;
    $scope.currentRoute = $location.path().split("/")[1];
    $scope.formData = {
      songName: undefined,
      genreId: undefined,
      src: undefined,
      img: undefined,
    };
    $scope.isLoading = false;
    $scope.toggleSelectingGenre = function () {
      $scope.isSelectingGenre = !$scope.isSelectingGenre;
    };
    $scope.addNewGenre = function () {
      if ($scope.newGenre) {
        $scope.genre.push($scope.newGenre);
      }
      $scope.newGenre = undefined;
      $scope.toggleSelectingGenre();
    };

    function getGenres() {
      AddServices.getGenres()
        .then(function (data) {
          $scope.genre = data.data;
        })
        .catch(function (error) {
          console.log(error);
          alert("Có lỗi xảy ra");
        });
    }
    getGenres();
    if ($scope.currentRoute == "add") {
      $scope.submit = function () {
        $scope.isLoading = true;
        usSpinnerService.spin("spinner-3");
        AddServices.addNewSong($scope.formData).finally(function () {
          usSpinnerService.stop("spinner-3");
          $scope.isLoading = false;
        });
      };
    } else {
      const id = $routeParams.id;
      AddServices.getSongById(id).then(function (data) {
        $scope.formData.songName = data.data.songName;
      });
      $scope.submit = function () {
        $scope.isLoading = true;
        usSpinnerService.spin("spinner-3");
        AddServices.editSong(id, {
          songName: $scope.formData.songName,
          genreId: $scope.formData.genreId,
        })
          .then(function (data) {
            alert("Thành công");
          })
          .catch(function (error) {
            alert("Có lỗi xảy ra");
          })
          .finally(function () {
            usSpinnerService.stop("spinner-3");
            $scope.isLoading = false;
          });
      };
    }
  },
]);
