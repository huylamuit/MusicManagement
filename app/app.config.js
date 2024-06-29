"use strict";
//config router
angular.module("MusicManagement").config([
  "$routeProvider",
  "$locationProvider",
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when("/home/:page", {
        template: "<home></home>",
      })
      .when("/login", {
        template: "<login></login>",
        resolve: {
          auth: function ($q, AuthService, $location) {
            var defer = $q.defer();
            if (AuthService.isAuthenticated()) {
              defer.reject();
              $location.path("/home");
            } else {
              defer.resolve();
            }
            return defer.promise;
          },
        },
      })
      .when("/play/:id", {
        template: "<play></play>",
        controller: "playController",
        resolve: {
          auth: function ($q, AuthService, $location) {
            var defer = $q.defer();
            if (AuthService.isAuthenticated()) {
              defer.resolve();
            } else {
              defer.reject();
              $location.path("/login");
            }
            return defer.promise;
          },
        },
      })
      .when("/add", {
        template: "<add></add>",
        resolve: {
          auth: function ($q, AuthService, $location) {
            var defer = $q.defer();
            if (AuthService.isAuthenticated()) {
              defer.resolve();
            } else {
              defer.reject();
              $location.path("/login");
            }
            return defer.promise;
          },
        },
      })
      .when("/edit/:id", {
        template: "<add></add>",
        resolve: {
          auth: function ($q, AuthService, $location) {
            var defer = $q.defer();
            if (AuthService.isAuthenticated()) {
              defer.resolve();
            } else {
              defer.reject();
              $location.path("/login");
            }
            return defer.promise;
          },
        },
      })
      .otherwise({
        redirectTo: "/home/1",
      });

    // Uncomment the following lines to enable HTML5 mode for routing (removes the hash from URLs)
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false,
    // });
  },
]);

//config i18n
angular.module("MusicManagement").config([
  "$translateProvider",
  function ($translateProvider) {
    $translateProvider.translations("en", {
      LANG: "En",
      SONG_NAME: "Name",
      SONG_GENRE: "Genre",
      THUMBNAIL: "Thumbnail",
      AUDIO_FILE: "Audio file",
      ADD: "Add",
      EDIT: "Edit",
      DELETE: "Delete",
      CANCEL: "Cancel",
      PLACEHOLDER: {
        SONG_NAME: "Input name of song",
        SONG_GENRE: "Select genre",
      },
    });

    $translateProvider.translations("vi", {
      LANG: "Vi",
      SONG_NAME: "Tên bài hát",
      SONG_GENRE: "Thể loại",
      THUMBNAIL: "Ảnh nền",
      AUDIO_FILE: "Tệp âm thanh",
      ADD: "Thêm",
      EDIT: "Chỉnh sửa",
      DELETE: "Xóa",
      CANCEL: "Hủy",
      PLACEHOLDER: {
        SONG_NAME: "Nhập tên bài hát",
        SONG_GENRE: "Chọn thể loại",
      },
    });

    $translateProvider.preferredLanguage("en");
  },
]);

//config authenticate
angular.module("MusicManagement").config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
  },
]);
//config controller
angular.module("MusicManagement").controller("LangController", [
  "$scope",
  "$translate",
  "AuthService",
  function ($scope, $translate, AuthService) {
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    $scope.logout = function () {
      AuthService.logout();
    };
  },
]);
