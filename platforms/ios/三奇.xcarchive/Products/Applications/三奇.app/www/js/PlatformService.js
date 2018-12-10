/**
 * Created by WG003 on 2018/7/20.
 */
angular.module('starter.PlatformService', [])
  .factory('platformService', function (userService) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return {
      all: function () {
          if(isAndroid==true || isiOS==true)
          {
            userService(9,'http://121.43.103.228:8089/');
          }
        return userService(0).address;
      },
      isAndroid:function () {
          return isAndroid;
      },
      isiOS:function () {
        return isiOS;
      }
    };
  });

