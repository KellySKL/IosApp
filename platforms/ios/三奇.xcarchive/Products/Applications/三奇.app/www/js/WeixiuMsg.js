/**
 * Created by WG003 on 2018/8/30.
 */
angular.module('starter.WxBills', [])
  .factory('wxBills', function($http,$rootScope,$q,userService) {
    var paramA = {};
    //页码
    paramA.curPage = 0;
    paramA.hasmore = false;
    paramA.pageSize=7;
    var paramB = {};
    //页码
    paramB.curPage = 0;
    paramB.hasmore = false;
    paramB.pageSize=7;
    var paramC = {};
    //页码
    paramC.curPage = 0;
    paramC.hasmore = false;
    paramC.pageSize=7;

    return {
      getState0:function (type) {
        var param_N;
        if(type==0)
        {
          param_N=paramA;
        }
        else  if(type==1)
        {
          param_N=paramB;
        }
        else
        {
          param_N=paramC;
        }
        var q=$q.defer();
        var p = {
          userName: $rootScope.userName,
          type:type,
          curPage:param_N.curPage,
          pageSize:param_N.pageSize
        };
        $http.post(userService(0).address+"WeixiuService.asmx/AfterSRepair_P",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },
      paramA:paramA,
      paramB:paramB,
      paramC:paramC
    };
  });


