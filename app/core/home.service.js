"use strict";
angular.module("home").factory("HomeServices", [
  "$http",
  function ($http) {
    const url = "https://music-manager-bk1r.onrender.com/api";
    return {
      getSongs: getSongs,
      deleteSongs: deleteSongs,
    };
    function getSongs(page, size, genreId = null, name = null) {

      return $http({
        method: 'GET',
        url: `${url}/v1/songs`,
        params: {
          page: page,
          size: size,
          genreId: genreId,
          name: name
        },
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then(function (response) {
        if (response.status === 200) {
          return response.data;
        } else {
          return;
        }
      });
    }

    function deleteSongs(id) {
      return $http({
        url: `${url}/v1/songs/delete`,
        method: "DELETE",
        data: id,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (data) {
        const res = data;
        if (res.status == 200) {
          return res;
        } else return;
      });
    }
  },
]);
