/**
 * graphs.ctrl.js
 */

'use strict';
angular.module('app')
    .controller("allCtrl", function ($scope, transactions) {

        $scope.$watchCollection('transactionsData', function () {
            var graph = transactions.balanceChange();

            $scope.labels = graph.labels;
            $scope.series = ['Ваш баланс в этот день'];
            $scope.data = [
                graph.values
            ];
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }
                    ]
                }
            };
        });
    })
    .controller('spendCtrl', function($scope, spendings, transactions) {
        $scope.labels = spendings;

        $scope.$watchCollection('transactionsData', function() {
            $scope.data = transactions.categoriesData(spendings);
        });

    })
    .controller('profitCtrl', function($scope, profits, transactions) {
        $scope.labels = profits;

        $scope.$watchCollection('transactionsData', function() {
            $scope.data = transactions.categoriesData(profits);
        });
    });