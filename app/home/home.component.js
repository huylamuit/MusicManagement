"use strict";

angular.module("home").component("home", {
  templateUrl: "home/home.template.html",
  controller: "homeController",
});

angular.module("home").controller("homeController", [
  "HomeServices",
  "$q",
  "usSpinnerService",
  function homeController(HomeServices, $q, usSpinnerService) {
    this.songs = [];
    this.selectedSongs = [];
    this.selectAllChecked = false;
    this.page = 0;
    this.size = 5;
    this.getSongs = function (page, size, genreId = null, name = null) {
      const self = this;
      usSpinnerService.spin("spinner-2");
      HomeServices.getSongs(page, size, genreId, name)
        .then(function (response) {
          console.log(response);
          self.songs = response.data.content;
          self.songs.map((song) => (song.selected = false));
        })
        .catch(function (error) {
          alert("Cannot fetch data");
        });
      console.log(this.songs);
      usSpinnerService.stop("spinner-2");
    };
    this.selectSong = function selectSong(id) {
      const selectedIdx = this.selectedSongs.findIndex((item) => item === id);
      if (selectedIdx !== -1) {
        this.selectedSongs.splice(selectedIdx, 1);
      } else {
        this.selectedSongs.push(id);
      }
      const songIdx = this.songs.findIndex((item) => item.songId === id);
      this.songs[songIdx].selected = !this.songs[songIdx].selected;
    };

    this.toggleSelectAll = function toggleSelectAll() {
      this.selectedSongs = [];
      this.songs.forEach((item) => {
        item.selected = !this.selectAllChecked;
        if (!this.selectAllChecked) {
          this.selectedSongs.push(item.id);
        }
      });
      this.selectAllChecked = !this.selectAllChecked;
    };

    this.deleteSongs = function () {
      const self = this;
      usSpinnerService.spin("spinner-2");
      HomeServices.deleteSongs(this.selectedSongs)
        .then(function (result) {
          self.getSongs(self.page, self.size);
          self.selectedSongs = [];
          usSpinnerService.stop("spinner-2");
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    this.changeSize = function (size) {
      this.page = 0;
      this.size = size;
      this.getSongs(this.page, size);
    };

    this.getSongs(this.page, this.size);
  },
]);
