// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.services',
  'starter.factoryM',
  'starter.AMapService',
  'starter.RoleService',
  'starter.CssService',
  'starter.PlatformService',
  'starter.filter','angucomplete-alt',
  'starter.WxBills','starter.GTMapService','ngCordova','ngCookies',
  'starter.comlocation','ionic-datepicker','starter.ywMsg',
  'starter.FeeBills','starter.BFBills','starter.AuditBills',
  'starter.NearBills','ApiService','starter.PoiBills'])

/*自定义--判断用户是否有权限的属性指令*/
.directive('hasPermission', function () {
  return {
    link: function ($scope, element, attrs) {
      function toggleVisibilityBasedOnPermission() {
        var hasPermission;
        var str = localStorage.getItem("authorisedPages");

        if (str == null) {
          hasPermission = -1;
        }
        if (str != null) {
          var arr = str.split(",");
          hasPermission = arr;
        }

        $scope.$watch(attrs.hasPermission, function () {
          //这里通过监听 凡是使用了该自定义指令的地方，都会把传进来的值value,进行下面的判断，控制使用该指令的标签element是否显示在UI页面上
          // console.log("value= " + attrs.hasPermission);
          // console.log($.inArray(attrs.hasPermission, hasPermission));
          if ($.inArray(attrs.hasPermission, hasPermission) != -1) {
            $(element).show();
          }
          if ($.inArray(attrs.hasPermission, hasPermission) == -1) {
            $(element).hide();
          }
        });
      }
      toggleVisibilityBasedOnPermission();
      $scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
    }
  };
})
  .directive('scrollHeight',function($window){
    return{
      restrict:'AE',
      link:function(scope,element,attr){
        element[0].style.height=($window.innerHeight-44-38-49)+'px';
      }
    }
  })
  .provider('userService', function () {
    var data = {method:0,userInfo:"",pwd:"",userName:"",if_map:true,address:'http://121.43.103.228:8089/',lng:0,lat:0};
    var f = function (method,value) {
      if (method==1)
      {
        data.userInfo=value;
        // if(value=='lxd'||value=='046')//lxd时监听位置
        // {
        //   data.if_map=true;
        // }
        // else
        // {
        //   data.if_map=false;
        // }
      }
      if (method==2)
      {
        data.pwd=value;
      }
      if (method==3)
      {
        data.userName=value;
      }
      if (method==9)
      {
        data.address=value;
      }
      if (method=="lng,lat")
      {
        data.lng=value[0];
        data.lat=value[1];
      }
      // if (method=="lat")
      // {
      //   data.lat=value;
      // }

      return data;
    };
    this.$get = function () {
      return f;
    };
  })

.run(function(userService,$ionicPopup,$ionicLoading,$cordovaFileTransfer,$cordovaFileOpener2,apiService,feeBills,$ionicNavBarDelegate,$timeout,$interval,comlocation,$ionicLoading,$cordovaGeolocation,$ionicPlatform,$state,$stateParams,$location, $http,$ionicPopup, $rootScope) {
  var isWebView = ionic.Platform.isWebView();
  var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();
  //alert(isWebView+"::"+isIPad+"::"+isIOS+"::"+isAndroid+"::")
  $http.get("AppConfig.xml")
    .success(function(data){
      $rootScope.ConfigList = [];
      var productsElements = angular.element(data.trim()).find("property");
      for(var i=0;i<productsElements.length;i++){
        var conf = productsElements.eq(i);
        $rootScope.ConfigList.push({
          name:conf.attr("name"),
          server_url:conf.attr("server_url"),
          update_url:conf.attr("update_url"),
          apk_url:conf.attr("apk_url"),
        });
      }
    })
    .error(function(){
      alert("获取配置错误，请联系管理员!");
    })
    .then(function () {
      userService(9,$rootScope.ConfigList[0].server_url);
    })

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.userinfo='';
  $rootScope.pwd='';
  $rootScope.uuid='';
  $rootScope.authorised='';
  if (localStorage.getItem("userId")){
    $rootScope.userinfo = localStorage.getItem("userId");
  }
  if (localStorage.getItem("password")) {
    $rootScope.pwd = localStorage.getItem("password");
  }
  if (localStorage.getItem("uuid")) {
    $rootScope.uuid = localStorage.getItem("uuid");
  }
  if (localStorage.getItem("dept")){
    $rootScope.dept = localStorage.getItem("dept");
  }
  if (localStorage.getItem("authorisedPages")){
    $rootScope.authorised = localStorage.getItem("authorisedPages");
  }
  var needLoginView = ["tab.dash", "tab.account"];
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    $state.previous = fromState;
    $state.previousParams = fromParams;
    //needLoginView.indexOf(toState.name)>=0
    if(toState.name=="tab.dash")
    {
      if($rootScope.userinfo==''||$rootScope.pwd==''||$rootScope.uuid==''||$rootScope.dept==''||$rootScope.authorised=='') {
        $state.go('login', {}, {
          reload: true
        });
        event.preventDefault();
      }
      if(fromState.name=='') {
        $ionicLoading.show({
          template: '正在身份验证!'
        });
        var user = {
          userId: $rootScope.userinfo,
          password: $rootScope.pwd,
          uuid: $rootScope.uuid
        }
        $http.post(userService(0).address+"LoginService.asmx/WS3_P", user)
          .success(function (response, status, headers, config) {
            var 原来权限 =$rootScope.authorised;
            var 原来职位 =$rootScope.dept;
            // if(response.d)
            // {
            //   $ionicLoading.hide(); // 3秒后关闭弹窗
            //   $rootScope.userName=localStorage.getItem("userName");
            // }
            if (response.d.status == 10) {
              localStorage.clear();
              $rootScope.userName = response.d.name;
              $rootScope.dept = response.d.dept;
              $rootScope.authorised = response.d.authorised;
              localStorage.setItem("userName", response.d.name);
              localStorage.setItem("userId", $rootScope.userinfo);
              localStorage.setItem("password", $rootScope.pwd);
              localStorage.setItem("uuid", $rootScope.uuid);
              localStorage.setItem("dept", response.d.dept);
              localStorage.setItem("authorisedPages", response.d.authorised);
              $ionicLoading.hide(); // 3秒后关闭弹窗
              if(原来权限!=localStorage.getItem("authorisedPages")||原来职位!=localStorage.getItem("dept"))
              {
                $ionicLoading.show({template: '权限已修改，请重新登录系统！',duration: 2000});
                $timeout(function () {
                  $state.go('login', {}, {
                    reload: true
                  });
                  event.preventDefault();
                },2000)
              }
            }
            else {
              $ionicLoading.hide(); // 3秒后关闭弹窗
              $state.go('login', {}, {
                reload: true
              });
              event.preventDefault();
            }
          }).error(function (response, status, headers, config) {
          $ionicLoading.show({
            template: '网络连接失败!'
          });
        });
      }
    }
  });
  // stateChangeSuccess  当模板解析完成后触发
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
     //alert('success')
  })

  // $stateChangeError  当模板解析过程中发生错误时触发
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
     //alert('error')
  })


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      ionic.Platform.isIOS() ? StatusBar.overlaysWebView(true) : StatusBar.overlaysWebView(false);
    }
    apiService.getLocalVersion().then(function (response) {
      var curVersion = response;
      return apiService.getServerVersion(curVersion);
    })
      .then(function (response) {
      if(response.d)
      {
        // 一个提示对话框
          var alertPopup = $ionicPopup.alert({
            title: '应用提醒',
            template: '检查到版本更新！'
          });
          alertPopup.then(function(res) {
            $ionicLoading.show({
              template: "已经下载：0%"
            });
            var url = encodeURI($rootScope.ConfigList[0].apk_url);
            var targetPath = cordova.file.externalRootDirectory + "/download/" + url.substr(url.lastIndexOf("/") + 1);
            var trustHosts = true
            var options = {};
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
              // 打开下载下来的APP
              $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
              ).then(function () {
                // 成功
              }, function (err) {
                // 错误
              });
              $ionicLoading.hide();
            }, function (err) {
              $ionicLoading.show({
                noBackdrop: true,
                template: "下载失败,请检查网络后，重新打开应用！"
              });
            }, function (progress) {
              //进度，这里使用文字显示下载百分比
              $timeout(function () {
                var downloadProgress = (progress.loaded / progress.total) * 100;
                $ionicLoading.show({
                  template: "已经下载：" + Math.floor(downloadProgress) + "%"
                });
                if (downloadProgress > 99) {
                  $ionicLoading.hide();
                }
              })
            });
          });

        // var confirmPopup = $ionicPopup.confirm({
        //   title: '应用提醒',
        //   template: '检查到更新！',
        //   // cancelText: '下次再说',
        //   okText: '立即更新'
        // });
        // confirmPopup.then(function (res) {
        //   if (res) {
        //     $ionicLoading.show({
        //       template: "已经下载：0%"
        //     });
        //     var url = encodeURI('http://121.43.103.228/android-debug.apk');
        //     var targetPath = cordova.file.externalRootDirectory + "/download/" + url.substr(url.lastIndexOf("/") + 1);
        //     var trustHosts = true
        //     var options = {};
        //     $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
        //       // 打开下载下来的APP
        //       $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
        //       ).then(function () {
        //         // 成功
        //       }, function (err) {
        //         // 错误
        //       });
        //       $ionicLoading.hide();
        //     }, function (err) {
        //       $ionicLoading.show({
        //         noBackdrop: true,
        //         template: "下载失败,请检查网络",
        //         duration: 1500
        //       });
        //     }, function (progress) {
        //       //进度，这里使用文字显示下载百分比
        //       $timeout(function () {
        //         var downloadProgress = (progress.loaded / progress.total) * 100;
        //         $ionicLoading.show({
        //           template: "已经下载：" + Math.floor(downloadProgress) + "%"
        //         });
        //         if (downloadProgress > 99) {
        //           $ionicLoading.hide();
        //         }
        //       })
        //     });
        //   } else {
        //     // 取消更新
        //   }
        // });
      }
      else {}
    });
    // Run when the device is ready
    readyRun();
  });
  // app进入后台运行
  $ionicPlatform.on('pause',function () {
   // $interval(setPositon,120000);
  });

  function readyRun() {
    document.addEventListener('deviceready', function () {
      if( ionic.Platform.isAndroid() ){
        // Android customization
        // To indicate that the app is executing tasks in background and being paused would disrupt the user.
        // The plug-in has to create a notification while in background - like a download progress bar.
        cordova.plugins.backgroundMode.setDefaults({
          title:  '三奇',
          text:   '正在后台运行，点击进入应用！'
        });
        // alert('setDefaults');
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
        // alert('enable');
        cordova.plugins.backgroundMode.enable();
        window.powerManagement.dim(function() {
          // alert('Wakelock acquired');
        }, function() {
          // alert('Failed to acquire wakelock');
        });
        window.powerManagement.setReleaseOnPause(false, function() {
          // alert('setReleaseOnPause successfully');
        }, function() {
          // alert('Failed to set');
        });
        // alert('onactivate');
        // Called when background mode has been activated
        // cordova.plugins.backgroundMode.onactivate = function () {
        //   // Set an interval of 3 seconds (3000 milliseconds)
        //   setInterval($rootScope.LoadMsg(), 10000);
        // }
      }
    }, false);
    $rootScope.getMyPosition = function () {
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
          return  $rootScope.positionObj;
        }, function (err) {
        });
    };
    $rootScope.sendMyPosition =  function() {
      return $http.post(userService(0).address+"LocationService.asmx/GetLocation",$rootScope.positionObj)
        .success(function (response, status, headers, config) {
          //alert('send');
        }).error(function (response, status, headers, config) {
          // alert(angular.toJson(response));
        });
    }
    $rootScope.timer=$interval(setPositon,120000);
    function setPositon () {
      comlocation.exec().then(function (success) {
        $rootScope.sendMyPosition().then(
          function (success) {
            $timeout($rootScope.LoadMsg(), 30000);//30秒后调用
          },function (error) {
            $timeout($rootScope.LoadMsg(), 30000);//30秒后调用
          }
        );
      },function (error) {
        // alert('获取当前位置失败!');
      })
    }
    $rootScope.LoadMsg =  function() {//是否存在未接收的单子
      var p = {
        userName: $rootScope.userName,
      };
      if($rootScope.dept=='业务员'||$rootScope.dept=='销售内勤'
        ||$rootScope.dept=='销售文员'||$rootScope.dept=='行政文员') {
        $http.post(userService(0).address+"MessageService.asmx/MsgGet", p).success(function (response, status, headers, config) {
          if (response.d != null) {
            cordova.plugins.notification.local.schedule({
              id: 1,
              title: '应用提醒',
              text: response.d,
              at: new Date(),
              badge: 1,//默认值为0  不显示
              autoClear: true,//默认值是false
              data: {url: ''}
              // sound:,
              // every:,
              // data:,
              // first,
            });
            //shedule事件在每次调用时触发
            cordova.plugins.notification.local.on('schedule', function (notification) {
              // alert('scheduled:' + notification.id);
            });
            //通知触发事件
            cordova.plugins.notification.local.on('trigger', function (notification) {
              //alert('triggered:' + notification.id);
              // alert(JSON.stringify(notification));
            });
            //监听点击事件
            cordova.plugins.notification.local.on('click', function (notification) {
              // alert(JSON.stringify(notification));
              // document.getElementById('title').innerHTML = JSON.stringify(notification.data);
            });
          }
        }).error(function (response, status, headers, config) {
          // alert('ERROR '+angular.toJson(response));
        });
      }
      if($rootScope.dept=='维修员'||$rootScope.dept=='服务部经理') {
        $http.post(userService(0).address+"MessageService.asmx/WxGet", p).success(function (response, status, headers, config) {
          if (response.d != null) {
            cordova.plugins.notification.local.schedule({
              id: 2,
              title: '应用提醒',
              text: response.d,
              at: new Date(),
              badge: 1,//默认值为0  不显示
              autoClear: true,//默认值是false
              data: {url: ''}
              // sound:,
              // every:,
              // data:,
              // first,
            });
            //shedule事件在每次调用时触发
            cordova.plugins.notification.local.on('schedule', function (notification) {
              // alert('scheduled:' + notification.id);
            });
            //通知触发事件
            cordova.plugins.notification.local.on('trigger', function (notification) {
              //alert('triggered:' + notification.id);
              // alert(JSON.stringify(notification));
            });
            //监听点击事件
            cordova.plugins.notification.local.on('click', function (notification) {
              // alert(JSON.stringify(notification));
              // document.getElementById('title').innerHTML = JSON.stringify(notification.data);
            });
          }
        }).error(function (response, status, headers, config) {
          // alert('ERROR '+angular.toJson(response));
        });
      }
    }
    $timeout($rootScope.LoadMsg(), 1000);//30秒后调用
  }
 // $ionicPlatform.on('resume',function () { console.log("app进入前台运行"); });

  // // 设置物理硬件后退按钮,只有安卓有效
  // var exitFlag = false;
  // $ionicPlatform.registerBackButtonAction(function(e) {
  //   e.preventDefault();
  //   if (exitFlag) {
  //     return ionic.Platform.exitApp();
  //   }
  //   /* your-tab-path 如 : /tab/home */
  //   if ($location.path() == "your-tab-path1" || $location.path() == "your-tab-path2") {
  //     exitFlag = true;
  //     $cordovaToast.showShortBottom('再按一次退出!');
  //     $timeout(function() {
  //       exitFlag = false;
  //     }, 2000);
  //   } else {
  //     $ionicNativeTransitions.goBack(); // 执行后退
  //   }
  // }, 110);
  //主页面显示退出提示框
  $ionicPlatform.registerBackButtonAction(function (e) {
    e.preventDefault();
    function showConfirm() {
      var confirmPopup = $ionicPopup.confirm({
        title: '<strong>退出应用?</strong>',
        template: '你确定要退出应用吗?',
        okText: '退出',
        cancelText: '取消'
      });

      confirmPopup.then(function (res) {
        if (res) {
          ionic.Platform.exitApp();
        } else {
          // Don't close
        }
      });
    }

    // Is there a page to go back to?
    if ($location.path() == '/tab/dash' ) {
      showConfirm();
    }
    else {
      if ($location.path() == '/tab/account' ||$location.path() == '/tab/chats'||$location.path() == '/tab/msg'
        ||$location.path() == '/dash/weixiu1'||$location.path() == '/dash/weixiu2'
        ||$location.path() == '/dash/yewu1'||$location.path() == '/dash/yewu2'||$location.path() == '/dash/feeaudit'
        ||$location.path() == '/dash/sign'||$location.path() == '/dash/Route'||$location.path() == '/dash/Near'
        ||$location.path() == '/dash/msgD'||$location.path() == '/dash/PoiAudit'
        ||$location.path() == '/dash/NearBill_0')
      {
          $state.go('tab.dash');
      }
      else  if($location.path() =='/enclosure')
      {
        $state.go('weixiu2',{item:$rootScope.wx_item,wx_note:$rootScope.wx_note},{reload:true});
      }
      else if($location.path() == '/dash/Route/line'||$location.path() == '/dash/PoiAudit/Detail')
      {
        history.back(-1);
      }
      // else if($location.path() == '/dash/NearBill_0' ||$location.path() == '/dash/NearBill_1')
      // {
      //   history.back(-1);
      //  // $state.go('Near');
      // }
      else
      {
        $ionicNavBarDelegate.back();
        //history.back(-1);
      }
    }
    // } else if ($rootScope.$viewHistory.backView ) {
    //   window.history.back();
    //   // Go back in history
    //  // $rootScope.$viewHistory.backView.go();
    // } else {
    //   // This is the last page: Show confirmation popup
    //   showConfirm();
    // }

    return false;
  }, 101);
})

.config(function($httpProvider,$stateProvider, $urlRouterProvider,$ionicConfigProvider,ionicDatePickerProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('myInterceptor');

  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: '选择日期',
    setLabel: '确定',
    todayLabel: '今天',
    closeLabel: '关闭',
    mondayFirst: false,
    weeksList: ["日", "一", "二", "三", "四", "五", "六"],
    monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    //to: new Date(2018, 8, 1),
    showTodayButton: true,
    dateFormat: 'yyyy-MM-dd',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);

  // var mycookies="";
  // if($cookies.get("guid")!=null)
  // {
  //   mycookies = $cookies.get("guid");
  // }
  // $httpProvider.defaults.withCredentials = true;
  // $httpProvider.defaults.headers.common['Authorization'] = "89757";
  // $httpProvider.defaults.headers.common['Authorization'] = "Scue";
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      cache:'false',
      templateUrl: 'templates/tabs.html',
      controller: 'TabsCtrl'
  })
    /**
     * 0-登录页
     */
    //登录
    .state('login', {
      url: '/login',
      cache:'false',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    //提交完成
    .state('submit-ok', {
      url: '/submit-ok',
      cache:'false',
      templateUrl: 'templates/submit-ok.html',
      controller: 'SubCtrl'
    })
    //上传照片
    .state('enclosure', {
      url: '/enclosure',
      cache:'false',
      templateUrl: 'templates/enclosure.html',
      controller: 'EnclosureCtrl',
      params: {item:null,wx_note:null}
    })


    //定位位置
    .state('location', {
      url: '/location',
      cache:'false',
      //cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-location.html',
      controller: 'AMapCtrl'
     // controller: 'LocationCtrl'
    })
    //测试
    .state('test', {
      url: '/test',
      cache:'true', //是否缓存页面信息
      templateUrl: 'templates/test.html',
      controller: 'TestCtrl'
    })
    // //业务--2   拜访历史
    // .state('yewu2', {
    //   url: '/dash/yewu2',
    //   views: {
    //     'yewu2': {
    //       templateUrl: 'templates/dash-yewu2.html',
    //       controller: 'YW_2_Ctrl'
    //     }
    //   }
    // })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
  //  cache:'true', //是否缓存页面信息
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl',
        // AMapCtrl
      }
    }
  })
    .state('tab.kf', {
      url: '/dash/kf',
      views: {
        'tab-dash': {
          templateUrl: 'templates/dash-kf.html',
          controller: 'KFCtrl',
        }
      }
    })

  //维修--1 维修申请单
    .state('weixiu1', {
      url: '/dash/weixiu1',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-weixiu1.html',
      controller: 'WX_1_Ctrl'
    })
    //维修--1  维修总结
    .state('weixiu2', {
      url: '/dash/weixiu2',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-weixiu2.html',
      controller: 'WX_2_Ctrl',
      params: {item:null,wx_note:null}
    })
    /**
     * 我的签到
     */
    .state('sign', {
      url: '/dash/sign',
      cache:'false',
      templateUrl: 'templates/dash-sign.html',
      controller: 'MySignCtrl'
    })
    /**
     * 路径查询
     */
    .state('Route', {
      url: '/dash/Route',
      cache:'false',
      templateUrl: 'templates/dash-route.html',
      controller: 'RouteCtrl'
    })
    /**
     * 路径显示
     */
    .state('line', {
      url: '/dash/Route/line',
      cache:'false',
      templateUrl: 'templates/lcus-line.html',
      controller: 'LcusLineCtrl',
      params: {list:null}
    })

    //业务--1   客户拜访
    .state('yewu1', {
      url: '/dash/yewu1',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-yewu1.html',
      controller: 'YW_1_Ctrl',
      params: {item:null,wx_item:null,db_item:null}
    })

    //业务  客户拜访 选择联系人
    .state('contact', {
      url: '/dash/contact',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/Contact.html',
      controller: 'Contact_Ctrl',
      params: {res:null,db_item:null}
    })


    //业务  附近的待办事项-目录
    .state('Near', {
      url: '/dash/Near',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-Near.html',
      controller: 'NearCtrl',
    })

    //业务  附近的待办事项-待办
    .state('NearBill_0', {
      url: '/dash/NearBill_0',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-NearBill_0.html',
      controller: 'NearBill_0_Ctrl',
    })

    //业务  附近的待办事项-我的
    .state('NearBill_1', {
      url: '/dash/NearBill_1',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-NearBill_1.html',
      controller: 'NearBill_1_Ctrl',
    })

    //业务  待办事项 detail
    .state('NearDetail', {
      url: '/dash/NearDetail',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-NearDetail.html',
      controller: 'NearBill_D_Ctrl',
      params: {from:null,item:null,myVar:false}
    })

    //业务  待办事项 所有回复
    .state('Reply', {
      url: '/dash/Reply',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-Reply.html',
      controller: 'ReplyCtrl',
      params: {item:null,myVar:false}
    })


    //业务--2   客户拜访历史
    .state('yewu2', {
      url: '/dash/yewu2',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/dash-yewu2.html',
      controller: 'YW_2_Ctrl'
    })

    .state('tab.msg', {
      url: '/msg',
      views: {
        'tab-msg': {
          templateUrl: 'templates/tab-msg.html',
          controller: 'YW_ChatsCtrl'
        }
      },
      params: {refresh:null}
    })

    //独立页面
    .state('msg-detail', {
      url: '/dash/msgD',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/msg-detail-0.html',
      controller: 'MsgDetailCtrl',
      params: {item:null,myVar:null,myBill:null,myComplete:null}
    })

    .state('tab.msg-detail', {
      url: '/msg/detail',
      views: {
        'tab-msg': {
          templateUrl: 'templates/msg-detail.html',
          controller: 'MsgDetailCtrl'
        }
      },
      params: {item:null,myVar:null,myBill:null,myComplete:null}
    })

    //业务  待办事项 detail
    .state('tab.msg-NearDetail', {
      url: '/msg/detail/NearDetail',
      views: {
        'tab-msg': {
          templateUrl: 'templates/dash-NearDetail.html',
          controller: 'NearBill_D_Ctrl',
        }
      },
      params: {from:null,item:null,myVar:false}
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.wx-detail', {
      url: '/chats/detail',
      views: {
        'tab-chats': {
          templateUrl: 'templates/wx-detail.html',
          controller: 'WxDetailCtrl'
        }
      },
      params: {item:null,myVar:null,myBill:null,myComplete:null}
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
    .state('tab.conference', {
      url: '/account/conference',
      views: {
        'tab-account': {
          templateUrl: 'templates/account-conference.html',
          controller: 'ConferenceCtrl'
        }
      }
    })

    .state('tab.signBill', {
      url: '/account/signBill',
      views: {
        'tab-account': {
          templateUrl: 'templates/account-signBill.html',
          controller: 'SignBillCtrl'
        }
      },
      params: {item:null,myVar:null}
    })

    .state('tab.fee', {
      url: '/account/feesubmit',
      views: {
        'tab-account': {
          templateUrl: 'templates/fee-submit.html',
          controller: 'FeeCtrl'
        }
      }
    })
    //事务 报备明细 内嵌页面
    .state('tab.fee-detail', {
      url: '/fee/detail',
      views: {
        'tab-account': {
          templateUrl: 'templates/fee-detail.html',
          controller: 'FeeDetailCtrl',
        }
      },
      params: {item:null,myVar:null,Sign:null}
    })

    //报备审核
    .state('feeaudit', {
      url: '/dash/feeaudit',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/fee-audit.html',
      controller: 'AuditCtrl'
    })

    //定位审核
    .state('PoiAudit', {
      url: '/dash/PoiAudit',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/poi-audit.html',
      controller: 'PoiAuditCtrl'
    })

    //定位审核明细
    .state('poiDetail', {
      url: '/dash/PoiAudit/Detail',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/poiAudit-detail.html',
      controller: 'PoiAuditDetailCtrl',
      params:{list:null,item:null}
    })



    //事务 报备明细 独立页面
    .state('feeDetail', {
      url: '/dash/feeaudit/feeDetail',
      cache:'false', //是否缓存页面信息
      templateUrl: 'templates/fee-detail.html',
      controller: 'FeeDetailCtrl',
      params: {item:null,myVar:null,Sign:null}
    })
  ;



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

  // 用于将ion-tabs置于页面底下
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('icon ion-chevron-left');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  // false 默认所有的滚动使用native，会比js的滚动快很多，并且很平滑 ; 安卓使用,ios不使用
  $ionicConfigProvider.scrolling.jsScrolling(!ionic.Platform.isAndroid());

})

.factory('myInterceptor', ["$rootScope", function ($rootScope) {
  var timestampMarker = {
    request: function (config) {
      //start
      //$ionicLoading.show();
      $rootScope.loading = true;
      return config;
    },
    response: function (response) {
      //end
      //$ionicLoading.hide();
      $rootScope.loading = false;
      return response;
    }
  };
  return timestampMarker;
}]);
;
