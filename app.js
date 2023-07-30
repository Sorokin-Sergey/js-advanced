'use strict';

/* Необходимо поменять местами ключи и значения в Map */

const weatherMap = new Map([
    ['London', 10],
    ['Moscow', 7],
    ['Paris', 14],
]);

const reverseWeatherMap = new Map([...weatherMap].map(el => el.reverse()));
console.log(reverseWeatherMap);

// console.log(weatherMap);
// const newArray = [];
// for (const [key, value] of weatherMap) {
//     newArray.push([value, key])
// }
// const newMap = new Map(newArray);
// console.log(newMap);