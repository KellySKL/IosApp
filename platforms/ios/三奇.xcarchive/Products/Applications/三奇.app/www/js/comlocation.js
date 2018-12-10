/**
 * Created by WG003 on 2018/8/10.
 */
angular.module('starter.comlocation', [])

  .factory('comlocation', function($rootScope,$cordovaGeolocation,$http,$q) {
    return{
      exec:function () {
        var q=$q.defer();
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var gcj = coordtransform.wgs84togcj02(position.coords.longitude, position.coords.latitude);
            // $rootScope.$broadcast('selfLocation:update', position);
              $rootScope.lng = gcj[0];$rootScope.lat = gcj[1];
               $rootScope.positionObj = {
              userId: $rootScope.userinfo,
              x: $rootScope.lng,
              y: $rootScope.lat
            };
            q.resolve($rootScope.positionObj);
          }, function (error) {
            q.reject(error);
          });
        return q.promise;
      }
    }
  });
