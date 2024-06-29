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
      console.log("size: ", size);
      return $http
        .get(
          `${url}/v1/songs`,
          {
            page: page,
            size: size,
            genreId: genreId,
            name: name,
          },
          {
            "Cache-Control": "no-cache",
          }
        )
        .then(function (data, status) {
          const res = data;
          if (res.status == 200) {
            return res.data;
          } else return;
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
