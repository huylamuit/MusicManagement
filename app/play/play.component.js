"use strict";

angular.module("play").component("play", {
  templateUrl: "play/play.template.html",
  controller: "playController",
});

angular.module("play").controller("playController", [
  "$scope",
  "$interval",
  "$routeParams",
  "PlayServices",
  "usSpinnerService",
  function playController(
    $scope,
    $interval,
    $routeParams,
    PlayServices,
    usSpinnerService
  ) {
    $scope.song = {
      songGenre: undefined,
      src: undefined,
      img: undefined,
      length: 0,
      songName: undefined,
    };

    $scope.isLoading = false;
    $scope.volume = 30;
    $scope.currentTime = 0;
    $scope.isPlaying = false; // Initialize as not playing

    let intervalPromise = undefined;
    let audio = undefined;

    $scope.secondsToMinutes = function (seconds) {
      let minutes =
        Math.floor(seconds / 60) < 10
          ? "0" + Math.floor(seconds / 60)
          : Math.floor(seconds / 60);
      let remainingSeconds = Math.floor(seconds % 60);
      let formattedSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      return minutes + ":" + formattedSeconds;
    };
    function startInterval() {
      if (!angular.isDefined(intervalPromise)) {
        intervalPromise = $interval(function () {
          if ($scope.isPlaying && audio && !audio.paused) {
            $scope.currentTime = audio.currentTime;
          }
        }, 1000);
      }
    }

    function stopInterval() {
      if (angular.isDefined(intervalPromise)) {
        $interval.cancel(intervalPromise);
        intervalPromise = undefined;
      }
    }

    $scope.togglePlaying = function () {
      $scope.isPlaying = !$scope.isPlaying;

      if ($scope.isPlaying) {
        audio.play().catch(function (error) {
          console.error("Failed to play audio:", error);
        });
        startInterval();
      } else {
        audio.pause();
        stopInterval();
      }
    };

    $scope.$on("$destroy", function () {
      stopInterval();
      if (audio) {
        audio.pause();
        audio = undefined;
      }
    });

    $scope.toggleMute = function () {
      if ($scope.volume == 0) {
        $scope.volume = 30;
      } else {
        $scope.volume = 0;
      }
      if (audio) {
        audio.volume = $scope.volume / 100;
      }
    };

    $scope.seekToTime = function () {
      audio.currentTime = $scope.currentTime;
    };
    $scope.setVolume = function () {
      audio.volume = $scope.volume / 100;
    };

    function getSongById() {
      const id = $routeParams.id;
      $scope.isLoading = true;
      usSpinnerService.spin("spinner-4");
      PlayServices.getSongById(id)
        .then(function (data) {
          console.log("Song data:", data);
          $scope.song.img = data.data.image;
          $scope.song.songName = data.data.songName;
          $scope.song.songGenre = data.data.genre.genreName;
          $scope.song.src = data.data.src;

          audio = new Audio($scope.song.src);
          audio.addEventListener("loadedmetadata", function () {
            console.log("Audio metadata loaded.");
            $scope.song.length = audio.duration;
            audio.volume = $scope.volume / 100;
          });
        })
        .catch(function (error) {
          console.log("Error loading song:", error);
          alert("Có lỗi xảy ra");
        })
        .finally(function () {
          $scope.isLoading = false;
          usSpinnerService.stop("spinner-4");
        });
    }

    // Call the function to load and play the song when the controller initializes
    getSongById();
  },
]);
