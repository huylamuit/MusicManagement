"use strict";
angular.module("MusicManagement").factory("AuthService", [
  "$http",
  "$window",
  "environment",
  function ($http, $window, environment) {
    const url = "https://music-manager-bk1r.onrender.com/api";

    // Helper function to parse stored user data
    function getStoredUser() {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error("Failed to parse stored user data", e);
        }
      }
      return null;
    }

    var storedUser = getStoredUser();

    var authService = {
      currentUser: {
        accessToken: storedUser ? storedUser.accessToken : null,
        refreshToken: storedUser ? storedUser.refreshToken : null,
      },
      login: login,
      logout: logout,
      updateCurrentUser: function (accessToken, refreshToken) {
        this.currentUser.accessToken = accessToken;
        this.currentUser.refreshToken = refreshToken;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        );
      },
      isAuthenticated: function () {
        return !!this.currentUser.accessToken;
      },
    };
    return authService;

    function login(username, password) {
      var config = {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      };
      return $http
        .post(
          `${url}/auth/authenticate`,
          {
            username: username,
            password: password,
          },
          config
        )
        .then(function (data) {
          var res = data;
          if (res.status == 200) {
            $http.defaults.headers.common.Authorization =
              "Bearer " + res.data.accessToken;
            localStorage.setItem(
              "currentUser",
              JSON.stringify({
                refreshToken: res.data.refreshToken,
                accessToken: res.data.accessToken,
              })
            );

            authService.updateCurrentUser(res.data.accessToken, res.data.refreshToken);
          }
          return;
        });
    }

    function logout() {
      $http.defaults.headers.common.Authorization = null;
      localStorage.removeItem("currentUser");
      authService.currentUser.accessToken = null;
      authService.currentUser.refreshToken = null;
      return;
    }
  },
]);

angular.module("MusicManagement").factory("AuthInterceptor", [
  "$q",
  "$injector",
  function ($q, $injector) {
    var interceptor = {
      request: function (config) {
        var AuthService = $injector.get("AuthService");

        if (AuthService.isAuthenticated()) {
          config.headers.Authorization =
            "Bearer " + AuthService.currentUser.accessToken;
        }

        return config;
      },
      responseError: function (response) {
        if (response.status === 401) {
          // Redirect or handle unauthorized requests
        }
        return $q.reject(response);
      },
    };

    return interceptor;
  },
]);
