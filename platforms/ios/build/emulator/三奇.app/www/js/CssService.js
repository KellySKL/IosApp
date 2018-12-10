/**
 * Created by WG003 on 2018/7/18.
 */
angular.module('starter.CssService', [])
  .factory('cssService',function ($http) {
      return {
        weixiu:function () {
          var p = {
            userId: userService(0).userInfo
          };
          $http.post(userService(0).address+"FormService.asmx/WeixiuForm",p).success(function (response, status, headers, config) {
            alert(response.d);
            //return response.d;
          }).error(function (response, status, headers, config) {
            return null;
          });
        }
      };
  })
  // .factory('cssService',function ($http) {
  //   // var p = {
  //   //   userId: userService(0).userInfo
  //   // };
  //   return {
  //     weixiu:function () {
  //       // $http.post(userService(0).address+"FormService.asmx/WeixiuForm",p).success(function (response, status, headers, config) {
  //       //   return response.d;
  //       // }).error(function (response, status, headers, config) {
  //       //   return null;
  //       // });
  //     }
  //   };
  // })
