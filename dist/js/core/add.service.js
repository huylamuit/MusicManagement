"use strict";
angular.module("add").factory("AddServices", [
  "$http",
  "Upload",
  function ($http, Upload) {
    const url = "https://music-manager-bk1r.onrender.com/api";
    return {
      addNewSong: addNewSong,
      getGenres: getGenres,
      getSongById: getSongById,
      editSong: editSong,
    };
    function addNewSong(formData) {
      return Upload.upload({
        url: `${url}/v1/songs/create-new-song`,
        method: "POST",
        headers: {
          "Content-Type": undefined, // Sử dụng undefined để angular-file-upload tự định dạng
          accept: "*/*",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        data: formData,
      })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error("Error uploading song: ", error);
          throw error;
        });
    }

    function getGenres() {
      return $http.get(`${url}/v1/genres/all`).then(function (data) {
        const res = data;
        if (res.status == 200) {
          return res.data;
        } else return;
      });
    }
    function editSong(songId, formData) {
      return $http
        .post(`${url}/v1/songs/update-song/${songId}`, formData)
        .then(function (data) {
          const res = data;
          if (res == 200) {
            return data.data;
          } else return;
        });
    }
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
