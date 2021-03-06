/**
 * Created by WG003 on 2018/8/31.
 */
/**
 * Created by WG003 on 2018/8/30.
 */
angular.module('starter.PoiBills', [])
  .factory('poiBills', function($http,$rootScope,$q,userService) {
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
        $http.post(userService(0).address+"AuditService.asmx/AuditPoi",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      param:param
    };
  });
