"use strict";
angular.module("MusicManagement").factory("AuthService", [
  "$http",
  "$window",
  "environment",
  function ($http, environment, $window) {
    const url = "https://music-manager-bk1r.onrender.com/api";

    var authService = {
      currentUser: {
        accessToken: localStorage.getItem("currentUser")
          ? JSON.parse(localStorage.getItem("currentUser")).accessToken
          : null,
        refreshToken: localStorage.getItem("currentUser")
          ? JSON.parse(localStorage.getItem("currentUser")).refreshToken
          : null,
      },
      login: login,
      logout: logout,
      updateCurrentUser: function (accessToken, refreshToken) {
        this.currentUser.accessToken = accessToken;
        this.currentUser.refreshToken = refreshToken;
      },
      isAuthenticated: function () {
        return this.currentUser.accessToken ? true : false;
      },
    };
    return authService;

    function login(username, password) {
      var config = {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          "Cache-Control": "no-cache, no-store, must-revalidate", // Adding cache control headers
          Pragma: "no-cache", // HTTP 1.0 compatibility
          Expires: "0", // Proxies
          // Add any additional headers if needed (e.g., authorization headers)
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

            authService.currentUser.accessToken = res.data.accessToken;
            authService.currentUser.refreshToken = res.data.refreshToken;
          }
          return;
        });
    }

    function logout() {
      $http.defaults.headers.common.Authorization = null;
      localStorage.setItem("currentUser", null);
      authService.currentUser.accessToken = null;
      authService.currentUser.refreshToken = null;
      console.log("logout");
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
        // Xử lý lỗi 401 (Unauthorized) nếu cần thiết
        if (response.status === 401) {
          // Redirect or handle unauthorized requests
        }
        return $q.reject(response);
      },
    };

    return interceptor;
  },
]);
