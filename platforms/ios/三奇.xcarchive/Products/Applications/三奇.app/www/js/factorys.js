angular.module('starter.factoryM', [])
  .factory('Houses', function () {
    var houseList = [
      { id: 0, title: '急售北二环 小区配套齐全 精装修', price: '88.0', describe: '2室1厅 120平米', img: 'img/ben.png' },
      { id: 1, title: '急售东二环 小区配套齐全 精装修', price: '88.0', describe: '2室1厅 120平米', img: 'img/max.png' },
      { id: 2, title: '急售南二环 小区配套齐全 精装修', price: '87.0', describe: '2室1厅 120平米', img: 'img/adam.jpg' },
      { id: 3, title: '急售西二环 小区配套齐全 精装修', price: '86.0', describe: '2室1厅 120平米', img: 'img/perry.png' },
      { id: 4, title: '急售北二环 小区配套齐全 精装修', price: '85.0', describe: '2室1厅 120平米', img: 'img/mike.png' }
    ];
    return {
      all: function () {
        return houseList;
      }
    };
  });
