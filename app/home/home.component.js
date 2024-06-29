"use strict";

angular.module("home").component("home", {
  templateUrl: "home/home.template.html",
  controller: "homeController",
});

angular.module("home").controller("homeController", [
  "HomeServices",
  "$q",
  "usSpinnerService",
  "$routeParams",
  function homeController(HomeServices, $q, usSpinnerService, $routeParams) {
    this.songs = [];
    this.selectedSongs = [];
    this.selectAllChecked = false;
    this.page = parseInt($routeParams.page, 10) - 1 || 0; // Make sure page is 0-based
    this.size = 5;
    this.total_pages = 1;

    // Generate an array of page numbers based on totalPages
    this.getPageNumbers = function () {
      var pages = [];
      for (var i = 1; i <= this.total_pages; i++) {
        pages.push(i);
      }
      return pages;
    };

    // Function to navigate to a specific page
    this.goToPage = function (pageNumber) {
      if (pageNumber < 1 || pageNumber > this.total_pages) return;
      this.page = pageNumber - 1; // Make sure page is 0-based internally
      this.getSongs(this.page, this.size);
    };

    // Function to go to the previous page
    this.goToPreviousPage = function () {
      if (this.page > 0) {
        this.goToPage(this.page); // this.page is already 0-based
      }
    };

    // Function to go to the next page
    this.goToNextPage = function () {
      if (this.page < this.total_pages - 1) {
        this.goToPage(this.page + 2); // this.page is 0-based, so add 2
      }
    };

    this.getSongs = function (page, size, genreId = null, name = null) {
      const self = this;
      usSpinnerService.spin("spinner-2");
      HomeServices.getSongs(page, size, genreId, name)
        .then(function (response) {
          self.songs = response.data.content;
          self.songs.map((song) => (song.selected = false));
          self.total_pages = response.data.totalPages;
        })
        .catch(function (error) {
          alert("Cannot fetch data");
        })
        .finally(function () {
          usSpinnerService.stop("spinner-2");
        });
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
        })
        .catch(function (error) {
          alert("Có lỗi xảy ra")
        })
        .finally(function () {
          usSpinnerService.stop("spinner-2");
        });
    };

    this.changeSize = function (size) {
      this.page = 0;
      this.size = size;
      this.getSongs(this.page, size);
    };

    this.changePage = function (page) {
      this.page = page;
      this.getSongs(this.page, this.size);
    };

    this.getSongs(this.page, this.size);
  },
]);
