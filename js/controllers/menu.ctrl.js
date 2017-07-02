/**
 * menu.ctrl.js
 */
'use strict';

angular.module('app')
    .controller('MenuCtrl', function($scope) {
        $scope.custom = false;
        $scope.toggleMenu = function () {
            $scope.custom = !$scope.custom;
        };
    });


