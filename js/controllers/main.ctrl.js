/**
 * main.ctrl.js
 */
'use strict';
angular.module('app')
    .controller('main', function ($scope, transactions, spendings, profits, filters, timeFilters) {

        $scope.filters = filters;
        $scope.timeFilters = timeFilters;
        $scope.selectedTimeFilter = $scope.timeFilters[0];
        $scope.label = "Ваш баланс " + $scope.selectedTimeFilter.name.toLowerCase();
        $scope.selectedGraph = "Все";

        $scope.selectTimeFilter = function (filter) {
            $scope.currentPage = 0;
            transactions.setTimeFilter(filter);
            $scope.selectedTimeFilter = filter;
        };

        $scope.selectedFilter = $scope.filters[0];
        $scope.graphTitle = "Изменение вашего баланса";

        $scope.selectFilter = function (filter) {
            $scope.currentPage = 0;

            switch (filter.name) {
                case "Все":
                    $scope.graphTitle = "Изменение вашего баланса";
                    break;
                case "Доходы":
                    $scope.graphTitle = "Диаграмма доходов";
                    break;
                case "Траты":
                    $scope.graphTitle = "Диаграмма расходов";
                    break;
            }

            transactions.setFilter(filter);
            $scope.selectedFilter = filter;
            $scope.selectedGraph = filter.name;
        };

        $scope.transactionsData = transactions.data;

        $scope.getFilteredTransactions = function () {
            $scope.label = $scope.selectedFilter.label + " " + $scope.selectedTimeFilter.name.toLowerCase();
            $scope.balance = updateBalance();
            $scope.transactionsData = transactions.data
                .filter($scope.selectedTimeFilter.method)
                .filter($scope.selectedFilter.method);
            return $scope.transactionsData;
        };

        function add(a, b) {
            return a + b;
        }

        function updateBalance() {
            var result =  transactions.data
                .filter($scope.selectedTimeFilter.method)
                .filter($scope.selectedFilter.method)
                .map(function (elem) { return parseFloat(elem.value); })
                .reduce(add, 0);
            if ($scope.selectedFilter.name == "Траты") {
                result = - result;
            }
            return result;
        }

        $scope.balance = updateBalance();

        $scope.addTransaction = function() {
            transactions.addTransaction($scope.money, $scope.action, $scope.category, $scope.description);
            $scope.balance = updateBalance();
            $scope.money = "";
            $scope.category = "";
            $scope.description = "";
        };

        $scope.spendings = spendings;
        $scope.profits = profits;

        $scope.categories = spendings;
        $scope.action = "spent";

        $scope.changeCategories = function () {
            if ($scope.action == "spent") {
                $scope.categories = $scope.spendings;
            } else {
                $scope.categories = $scope.profits;
            }
        };

        $scope.deleteTransaction = function(index) {
            transactions.deleteTransaction(index);
            $scope.balance = updateBalance();
        };

        $scope.currentPage = 0;
        $scope.itemsPerPage = 5;

        $scope.firstPage = function() {
            return $scope.currentPage == 0;
        };

        $scope.lastPage = function() {
            var lastPageNum = Math.ceil($scope.transactionsData.length / $scope.itemsPerPage - 1);
            return $scope.currentPage == lastPageNum || $scope.currentPage == lastPageNum + 1;
        };

        $scope.numberOfPages = function() {
            return Math.ceil($scope.transactionsData.length / $scope.itemsPerPage);
        };

        $scope.startingItem = function() {
            return $scope.currentPage * $scope.itemsPerPage;
        };
        $scope.pageBack = function() {
            $scope.currentPage = $scope.currentPage - 1;
        };

        $scope.pageForward = function() {
            $scope.currentPage = $scope.currentPage + 1;
        };

    });
