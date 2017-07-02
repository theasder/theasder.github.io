/**
 * transactions.factory.js
 */

'use strict';
angular.module('app').factory('transactions', function($filter) {
    function createTransaction(value, time, category, description) {
        var decoration, val, dt = new Date(time);
        if (value > 0) {
            val = "+" + value + " руб.";
            decoration = "up";
        } else if (value < 0) {
            val = value + " руб.";
            decoration = "down";
        }

        return {
            value: val,
            time: dt,
            category: category,
            description: description,
            decoration: decoration
        }
    }

    var compareOpersByDate = function (a, b) {
        return Date.parse(a.time) < Date.parse(b.time);
    };

    var data = [
        createTransaction(28400.00, "2016-08-25T08:22:26Z", "Работа", "Зарплата"),
        createTransaction(-17000.00, "2016-08-25T20:22:26Z", "Квартира", "Аренда"),
        createTransaction(12040.00, "2016-08-22T20:22:26Z", "Еще одна работа", "Выполнил заказ на фрилансе"),
        createTransaction(-7000.00, "2016-08-21T20:22:26Z", "Кафе и рестораны", "День Рождения Ларисы Ивановны"),
        createTransaction(-1975.00, "2016-08-20T20:22:26Z", "Еда и напитки", "Букварь Вкуса"),
        createTransaction(-1890.00, "2016-08-19T20:22:26Z", "Одежда и обувь", "Ostin"),
        createTransaction(-400.00, "2016-08-18T20:22:26Z", "Мобильная связь", "Телефон"),
        createTransaction(-35.00, "2016-07-31T20:24:02Z", "Транспорт", "Проезд на маршрутке")
    ].sort(compareOpersByDate);

    function addTransaction(value, action, category, description) {
        if (parseFloat(value) != 0 && value != "" && category != undefined) {
            var time = new Date();

            if (action == 'spent') {
                value = -value;
            }

            if (description === undefined) {
                description = category;
            }

            var newTransaction = createTransaction(parseFloat(value), time, category, description);
            data.unshift(newTransaction);
        }
    }

    function deleteTransaction(index) {
        data.splice(index, 1);
    }
    var filter = {name: 'Все', label: 'Ваш баланс', method: function() {return true;}};
    var timeFilter = {name: "За всё время", method: function() {return true;}};

    function getFilter() {
        return filter;
    }

    function getTimeFilter() {
        return timeFilter;
    }

    function setFilter(fltr) {
        filter = fltr;
    }

    function setTimeFilter(fltr) {
        timeFilter = fltr;
    }

    function add(a, b) {
        return a + b;
    }

    function balanceChange() {
        var dataGroupByDates = data
            .filter(timeFilter.method)
            .reduce(function(res, obj) {
                var time = $filter('date')(obj.time, 'dd.MM.yyyy');
                if (!(time in res)) {
                    res.__array.push(time);
                    res[time] = parseFloat(obj.value);
                } else {
                    res[time] += parseFloat(obj.value);
                }
                return res;
            }, {__array:[]});

        var labels = dataGroupByDates.__array.reverse();

        var values = [], i;

        for (i = 0; i < labels.length; i++) {
            values.push(dataGroupByDates[labels[i]]);
        }

        for (i = 1; i < values.length; i++) {
            values[i] += values[i - 1];
        }
        return {
            labels: labels,
            values: values
        };
    }

    function categoriesData(categoryList) {
        var categoryValue, result = [];

        for (var i = 0; i < categoryList.length; i++) {

            categoryValue = data
                .filter(timeFilter.method)
                .filter(function (elem) {
                    return elem.category == categoryList[i];
                })
                .map(function (elem) {
                    return Math.abs(parseFloat(elem.value));
                })
                .reduce(add, 0);

            result.push(categoryValue);
        }
        return result;
    }

    return {
        data: data,
        createTransaction: createTransaction,
        addTransaction: addTransaction,
        deleteTransaction: deleteTransaction,
        setFilter: setFilter,
        setTimeFilter: setTimeFilter,
        getFilter: getFilter,
        getTimeFilter: getTimeFilter,
        categoriesData: categoriesData,
        timeFilter: timeFilter,
        balanceChange: balanceChange
    }
});