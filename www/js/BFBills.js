/**
 * Created by WG003 on 2018/8/31.
 */
/**
 * Created by WG003 on 2018/8/30.
 */
angular.module('starter.BFBills', [])
  .factory('bfBills', function($http,$rootScope,$q,userService) {
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
        $http.post(userService(0).address+"YewuService.asmx/P_HisVisit",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      getContact:function (client) {
        var q=$q.defer();
        var p = {
          client: client
        };
        $http.post(userService(0).address+"YewuService.asmx/GetContact",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      NewContact:function (person) {
        var q=$q.defer();
        $http.post(userService(0).address+"YewuService.asmx/NewContact",person).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      Sign:function (p) {
        var q=$q.defer();
        $http.post(userService(0).address+"AccountService.asmx/Sign",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      NearBy:function () {
        var q=$q.defer();
        var p = {
          userName: $rootScope.userName,
          id: $rootScope.userinfo,
          lng: $rootScope.lng,
          lat: $rootScope.lat
        };
        $http.post(userService(0).address+"MessageService.asmx/NeighborBill",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      ReplyGet:function (fid) {
        var q=$q.defer();
        var p = {
         fid:fid
        };
        $http.post(userService(0).address+"MessageService.asmx/GetReply",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      param:param
    };
  });
