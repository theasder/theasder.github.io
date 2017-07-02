'use strict';
var app = angular.module('app', []);

app.controller('MenuCtrl', function($scope) {
    $scope.custom = false;
    $scope.toggleMenu = function () {
        $scope.custom = !$scope.custom;
    };
});


app.controller('main', function ($scope, $http) {

    $scope.city = "";
    $scope.language = "";
    $scope.itemsPerPage = 20;
    $scope.currentPage = 0;

    $scope.cityFilter = function(proger) {
        if ($scope.city === "") {
            return true;
        } else if (proger['location'] == null) {
            return false;
        } else if ($scope.city != "" && proger['location'] !== null) {
            // console.log(proger['location'], $scope.city);
            if ($scope.city.toLowerCase() == "москва" || $scope.city.toLowerCase() == "moscow") {
                return proger['location'].toLowerCase().indexOf("moscow") !== -1 ||
                        proger['location'].toLowerCase().indexOf("москва") !== -1;
            }
            return proger['location'].toLowerCase().indexOf($scope.city.toLowerCase()) !== -1;
        } else {
            return true;
        }
    }

    $scope.langFilter = function(proger) {
        if ($scope.language === "") {
            return true;
        } else if (proger['languages'] == null) {
            return false;
        } else if ($scope.language != "" && proger['languages'] !== null) {
            return proger['languages'].toLowerCase().indexOf($scope.language.toLowerCase() + "'") !== -1 || 
                   proger['languages'].toLowerCase().indexOf($scope.language.toLowerCase() + ':') !== -1 || 
                   proger['languages'].toLowerCase().indexOf($scope.language.toLowerCase() + ' ') !== -1;
        } else {
            return true;
        }
    }

    function loadPage(page) {
        $http.get('data/data.json')
            .then(function(res){
                // $scope.len = res.data.length;
                $scope.progers = res.data; //.slice(page * $scope.itemsPerPage, (page + 1) * $scope.itemsPerPage);
        });
    }
    

    loadPage(0);

    // $scope.firstPage = function() {
    //     return $scope.currentPage == 0;
    // };

    // $scope.lastPage = function() {
    //     var lastPageNum = Math.ceil($scope.len / $scope.itemsPerPage - 1);
    //     return $scope.currentPage == lastPageNum || $scope.currentPage == lastPageNum + 1;
    // };

    // $scope.numberOfPages = function() {
    //     return Math.ceil($scope.len / $scope.itemsPerPage);
    // };

    // $scope.startingItem = function() {
    //     return $scope.currentPage * $scope.itemsPerPage;
    // };
    // $scope.pageBack = function() {
    //     $scope.currentPage = $scope.currentPage - 1;
    //     loadPage($scope.currentPage);
    // };

    // $scope.pageForward = function() {
    //     $scope.currentPage = $scope.currentPage + 1;
    //     loadPage($scope.currentPage);
    // };
});
