/**
 * Created by WG003 on 2018/9/22.
 */

angular.module('starter.NearBills', [])
  .factory('nearBills', function($http,$rootScope,$q,userService) {
    var param = {};
    //页码
    param.curPage = 0;
    param.hasmore = false;
    param.pageSize=10;

    var param_m = {};
    //页码
    param_m.curPage = 0;
    param_m.hasmore = false;
    param_m.pageSize=10;
    return {
      getList:function () {
        var q=$q.defer();
        var p = {
          id: $rootScope.userinfo,
          lng: $rootScope.lng,
          lat: $rootScope.lat,
          userName: $rootScope.userName,
          curPage:param.curPage,
          pageSize:param.pageSize,
        };
        $http.post(userService(0).address+"MessageService.asmx/NeighborBill",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      param:param,
      getList_m:function () {
        var q=$q.defer();
        var p = {
          id: $rootScope.userinfo,
          lng: $rootScope.lng,
          lat: $rootScope.lat,
          userName: $rootScope.userName,
          curPage:param_m.curPage,
          pageSize:param_m.pageSize,
        };
        $http.post(userService(0).address+"MessageService.asmx/LLBill_Mine",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      param_m:param_m
    };
  });
