angular.module("MusicManagement").directive("modal", function () {
  return {
    restrict: "E",
    transclude: true,
    scope: {
      header: "@",
      action: "@",
      callback: "&",
      buttonType: "@",
    },
    templateUrl: "directives/modal/modal.template.html",
    link: function ($scope) {
      $scope.actionFn = function (callBackFn) {
        callBackFn();
      };
      $scope.getButtonClass = function () {
        return `btn btn-${$scope.buttonType}`;
      };
    },
  };
});
