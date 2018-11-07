/**
 * Created by WG003 on 2018/9/28.
 */
angular.module('ApiService', [])

  .factory('apiService', function($rootScope,$http,$q,userService) {
    return {
      getServerVersion: function (curVersion) {
        var q = $q.defer();
        var p ={curVersion:curVersion};
        $http.post(userService(0).address+"LoginService.asmx/AppVersion",p).success(function (response, status, headers, config) {
          q.resolve(response);
        }).error(function (response, status, headers, config) {
          q.reject(response);
        });
        return q.promise;
      },

      getLocalVersion: function () {
        var deferred = $q.defer();
        cordova.getAppVersion.getVersionNumber()
          .then(function (localVersion) {
            deferred.resolve(localVersion);
          }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },

      checkUpdate: function () {
        var self = this,
          localVersion;

        this.getLocalVersion().then(function (response) {
          localVersion = response;
          return self.getServerVersion(response);
        }).then(function (serverVersions) {
          var latestVersion = _.isArray(serverVersions) ? _.first(serverVersions) : serverVersions,
            laterThanServer = commonService.laterThan(localVersion, latestVersion.number),
            isForceUpdate = _.some(_.initial(serverVersions), function (item) {
              return item.flag === 1;
            });

          commonService.setItem("latestVersion", latestVersion);
          return laterThanServer && isForceUpdate;
        }).then(function (isForce) {
          isForce && commonService.confirm(i18n.need_update_label, i18n.force_update_tip).then(function (res) {
            if (res) {
              checkUpdateEnv(isForce);
            } else {
              ionic.Platform.exitApp();
            }
          });
        }).catch(function (reason) {
          console.log("version compare filed : " + JSON.stringify(reason));
        });
      }
    }
  })

// https://blog.csdn.net/jiaen188/article/details/76560066?utm_source=copy
