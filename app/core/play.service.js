"use strict";
angular.module("play").factory("PlayServices", [
  "$http",

  function ($http) {
    const url = "https://music-manager-bk1r.onrender.com/api";
    return {
      getSongById: getSongById,
    };

    function getSongById(songId) {
      return $http.get(`${url}/v1/songs/${songId}`).then(function (data) {
        const res = data;
        if (res.status == 200) {
          return res.data;
        } else return;
      });
    }
  },
]);
