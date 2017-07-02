/**
 * filters.js
 */
'use strict';
angular.module('app')
.factory('filters', function() {
    return [
        {name: 'Все', label: 'Ваш баланс', method: function() {return true;}},
        {name: 'Доходы', label: 'Ваш доход', method: function(elem) {return parseFloat(elem.value) > 0;}},
        {name: 'Траты', label: 'Ваши расходы', method: function(elem) {return parseFloat(elem.value) < 0;}}
    ];
})
.factory('timeFilters', function() {
    return [
        {name: "За всё время", method: function() {return true;}},
        {name: "В этом году", method: function(elem) {
            var year = new Date().getFullYear();
            return elem.time.getFullYear() === year;
        }},
        {name: "В этом месяце", method: function(elem) {
            var today = new Date();
            return elem.time.getFullYear() === today.getFullYear() &&
                elem.time.getMonth() === today.getMonth();
        }},
        {name: "На этой неделе", method: function(elem) {
            var today = new Date();
            var weekdaySeconds = (today.getDay() - 1) * 24 * 60 * 60
                + today.getHours() * 60 * 60 + today.getMinutes() * 60 + today.getSeconds();

            return elem.time.getTime() / 1000 >= today.getTime() / 1000 - weekdaySeconds;
        }},
        {name: "Сегодня", method: function(elem) {
            var today = new Date();
            return elem.time.getFullYear() === today.getFullYear()
                && elem.time.getMonth() === today.getMonth()
                && elem.time.getDate() === today.getDate();
        }}
    ];
})
.filter('startFrom', function(){
    return function(input, start){
        start = +start;
        return input.slice(start);
    }
});
