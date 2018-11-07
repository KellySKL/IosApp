/**
 * Created by WG003 on 2018/9/11.
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
    root.imgturn = factory();
  }
}(this, function($rootScope) {

  // canvas转dataURL：canvas对象、转换格式、图像品质
  var canvasToDataURL =function canvasToDataURL(canvas, format, quality) {
    return canvas.toDataURL(format||'image/jpeg', quality||1.0);
  }
  // DataURL转canvas
  var dataURLToCanvas = function dataURLToCanvas(dataurl, cb){
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = function(){
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      cb(canvas);
    };
    img.src = dataurl;
  }
  // image转canvas：图片地址
  var imageToCanvas = function imageToCanvas(src, cb){
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = src;
    img.onload = function (){
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      cb(canvas);
    };
  }
  // canvas转image
  var canvasToImage = function canvasToImage(canvas){
    var img = new Image();
    img.src = canvas.toDataURL('image/jpeg', 1.0);
    return img;
  }
  // File/Blob对象转DataURL
  var fileOrBlobToDataURL = function fileOrBlobToDataURL(obj, cb){
    var a = new FileReader();
    a.readAsDataURL(obj);
    a.onload = function (e){
      cb(e.target.result);
    };
  }
  // DataURL转Blob对象
  var dataURLToBlob = function dataURLToBlob(dataurl){
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }
  // Blob转image
  var blobToImage = function blobToImage(blob, cb){
    fileOrBlobToDataURL(blob, function (dataurl){
      var img = new Image();
      img.src = dataurl;
      cb(img);
    });
  }
  // image转Blob
  var imageToBlob = function imageToBlob(src, cb){
    imageToCanvas(src, function (canvas){
      cb(dataURLToBlob(canvasToDataURL(canvas)));
    });
  }
  // Blob转canvas
  var BlobToCanvas = function BlobToCanvas(blob, cb){
    fileOrBlobToDataURL(blob, function (dataurl){
      dataURLToCanvas(dataurl, cb);
    });
  }
  // canvas转Blob
  var canvasToBlob = function canvasToBlob(canvas, cb){
    cb(dataURLToBlob(canvasToDataURL(canvas)));
  }
  // image转dataURL
  var imageToDataURL = function imageToDataURL(src, cb){
    imageToCanvas(src, function (canvas){
      cb(canvasToDataURL(canvas));
    });
  }
  // dataURL转image，这个不需要转，直接给了src就能用
  var dataURLToImage = function dataURLToImage(dataurl){
    var img = new Image();
    img.src = d;
    return img;
  }

  return {
    canvasToDataURL: canvasToDataURL,
    dataURLToCanvas: dataURLToCanvas,
    imageToCanvas: imageToCanvas,
    canvasToImage: canvasToImage,
    fileOrBlobToDataURL: fileOrBlobToDataURL,
    dataURLToBlob: dataURLToBlob,
    blobToImage: blobToImage,
    imageToBlob: imageToBlob,
    BlobToCanvas: BlobToCanvas,
    canvasToBlob: canvasToBlob,
    imageToDataURL: imageToDataURL,
    dataURLToImage: dataURLToImage,
  }
}));
