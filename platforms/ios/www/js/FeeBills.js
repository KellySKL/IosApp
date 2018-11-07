/**
 * Created by WG003 on 2018/8/30.
 */
angular.module('starter.FeeBills', [])
  .factory('feeBills', function($http,$rootScope,$q,userService) {
    var param = {};
    //页码
    param.curPage = 0;
    param.hasmore = false;
    param.pageSize=10;

    return {
      getList:function () {
        var q=$q.defer();
        var p = {
          userName: $rootScope.userName,
          curPage:param.curPage,
          pageSize:param.pageSize,
        };
        $http.post(userService(0).address+"AccountService.asmx/MyFeeBills",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      getState0:function () {
        var q=$q.defer();
        var p = {
          userName: $rootScope.userName,
          curPage:param.curPage,
          pageSize:param.pageSize,
        };
        $http.post(userService(0).address+"AccountService.asmx/BillsState0",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      param:param
    };
  });
