/**
 * Created by WG003 on 2018/7/21.
 */
angular.module('starter.filter', [])
  .filter('wordPlace', function ($sce) {
    return function (input, word) {
      if (!word)
        return input;
      var result = input.replace(word, "<span style='color:#6CA4FF;'>" + word + "</span>");
      return $sce.trustAsHtml(result);
    };
  })
