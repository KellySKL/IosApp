/**
 * Created by WG003 on 2018/7/18.
 */
angular.module('starter.RoleService', [])
  .factory('roleService',function ($http,userService) {
    var userid = userService(0).userInfo;
    var if_initAMap;
    if(userid=="lxd"){
      if_initAMap = true;
    }
    else
    {
      if_initAMap = false;
    }
    return {
      check:function () {
        return if_initAMap;
      }
    };
  })
