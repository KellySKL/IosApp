/**
 * Created by WG003 on 2018/8/4.
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.gotomap = factory();
  }
}(this, function($rootScope) {

  //开启ios百度地图 http://lbsyun.baidu.com/index.php?title=uri/api/ios
  function startIOSBD(lat,lng,kflat,kflng,name) { // Success callback
     //原链接："baidumap://map/direction?origin=34.264642646862,108.95108518068&destination=40.007623,116.360582&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo"
    //驾车导航模式 ： "baidumap://map/navi?location="+kflat+","+kflng+"&coord_type=bd09ll&type=BLK&src=ios.baidu.openAPIdemo"
  var sApp = startApp.set("baidumap://map/direction?origin={{我的位置}}&destination=name:"+name+"|latlng:"+kflat+","+kflng+"&coord_type=bd09ll&mode=driving&src=ios.Scue.App");
    sApp.start(function() { /* success */
      //alert("OK");
    }, function(error) { /* fail */
      alert("请先安装百度地图！");
    });

  }

  //开启android百度地图
  function startAndroidBD(lat,lng,kflat,kflng,name) { // Success callback
    var sApp = startApp.set({ /* params */
      "action":"ACTION_VIEW",
      "category":"CATEGORY_DEFAULT",
      "type":"text/css",
      "package":"com.baidu.BaiduMap",
      // origin=name:当前位置|latlng:"+lat+","+lng+"&
      "uri":"baidumap://map/direction?destination=name:"+name+"|latlng:"+kflat+","+kflng+"&mode=driving&src=android.Scue.MyApp",
      "flags":["FLAG_ACTIVITY_CLEAR_TOP","FLAG_ACTIVITY_CLEAR_TASK"],
      "intentstart":"startActivity"
    });
    sApp.start(function() { /* success */
      //alert("OK");
    }, function(error) { /* fail */
      alert("请先安装百度地图！");
    });
  }

  //开启android高德地图
  function startAndroidGeo(lat,lng,kflat,kflng,name) {
    var sApp = startApp.set({  //跳转对应APP
      "action": "ACTION_VIEW",
      "category": "CATEGORY_DEFAULT",
      "type": "text/css",
      "package":'com.autonavi.minimap',
      // &slat=" + lat + "&slon=" + lng + "&sname=当前位置
      "uri": "amapuri://route/plan/?sid=BGVIS1&did=BGVIS2&dlat="+kflat+"&dlon="+kflng+"&dname="+name+"&dev=0&t=0",   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径
      "flags": ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
      "intentstart": "startActivity",
    }, {
      /* extras */
      "EXTRA_STREAM": "extraValue1",
      "extraKey2": "extraValue2"
    });
    sApp.start(function () { //跳转成功
    }, function (error) { //失败
      alert("请先安装高德地图！");
    });
  };
  //开启IOS高德地图 https://lbs.amap.com/api/amap-mobile/guide/ios/navi
  function startIosGeo(lat,lng,kflat,kflng,name) {
    // 原链接 ："iosamap://path?sourceApplication=applicationName&sid=BGVIS1&did=BGVIS2&dlat="+kflat+"&dlon="+kflng+"&dname="+name+"&dev=0&t=0"
    // &slat="+lat+"&slon="+lng+"&sname=当前位置
    var sApp = startApp.set("iosamap://navi?sourceApplication=ScueApp&poiname="+name+"&poiid=BGVIS&lat="+kflat+"&lon="+kflng+"&dev=0&style=2");
    sApp.start(function () {
      //alert("OK");
    }, function (error) {
      alert("请先安装高德地图！");
    });
  };



  var all = function all() {
    //定义一些常量
    var findMap = new Array();
    function app(plat,name,url){
      this.plat=plat;
      this.name=name;
      this.url=url;
    }
    //高德APP
    var schemeIntent;   // 地图APP Package Name
    var scheme;   // 地图APP Package Name
    var platform;
    if ($rootScope.platfrom=="IOS") {
      schemeIntent = "iosamap://"//高德
      scheme = 'baidu://';//百度
      platform="IOS";
      CheckIOS(schemeIntent);
      CheckIOSBD(scheme);
    } else if ($rootScope.platfrom=="Android") {
      platform="Android";
      schemeIntent = 'com.autonavi.minimap';//高德
      scheme= 'com.baidu.BaiduMap';//百度
      CheckAndroid(schemeIntent);
      CheckAndroidBD(scheme);
    };

    function CheckIOSBD(scheme)
    {
      appAvailability.check(scheme, hasAndroidPackage, notAndroidPackage);   //Android
      function hasAndroidPackage() {  // 存在对应APP
        findMap.push(new app(platform,"百度地图",scheme));
      };
      function notAndroidPackage() {  // 不存在对应APP
      };
    }

    function CheckAndroidBD(scheme)
    {
      appAvailability.check(scheme, hasAndroidPackage, notAndroidPackage);   //Android
      function hasAndroidPackage() {  // 存在对应APP
        findMap.push(new app(platform,"百度地图",scheme));
      };
      function notAndroidPackage() {  // 不存在对应APP
      };
    }

    function CheckAndroid(schemeIntent)
    {
      appAvailability.check(schemeIntent, hasAndroidPackage, notAndroidPackage);   //Android
      function hasAndroidPackage() {  // 存在对应APP
        findMap.push(new app(platform,"高德地图",schemeIntent));
      };
      function notAndroidPackage() {  // 不存在对应APP
      };
    }

    function CheckIOS(schemeIntent)
    {
      appAvailability.check(schemeIntent, hasIosPackage, notIosPackage);   //IOS
      function hasIosPackage() {  // 存在对应APP
        findMap.push(new app(platform,"高德地图",schemeIntent));
      };
      function notIosPackage() {  // 不存在对应APP
      };
    }
    return findMap;
  };

  var geo1 = function geo1 (app,lat,lng,kflat,kflng,name) {
    if (app.plat == "IOS") {
      if (app.name == "高德地图") {
        startIosGeo(lat, lng, kflat, kflng, name);
      }
      else if (app.name == "百度地图") {
        startIOSBD(lat, lng, kflat, kflng, name);
      }
    }
    else if (app.plat == "Android") {
      if (app.name == "高德地图") {
        startAndroidGeo(lat, lng, kflat, kflng, name);
      }
      else if (app.name == "百度地图") {
        startAndroidBD(lat, lng, kflat, kflng, name);
      }
    }
  }

  return {
    all: all,
    geo1: geo1
  }
}));
/**
 * Created by WG003 on 2018/8/18.
 */
