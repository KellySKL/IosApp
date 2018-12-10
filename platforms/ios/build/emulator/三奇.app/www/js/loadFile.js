/**
 * Created by WG003 on 2018/9/10.
 */
/*
 * 文件读取模块
 * file  文件对象
 * events 事件回掉对象 包含 success , load, progress
 */
var FileLoader = function (file, events) {
  this.reader = new FileReader();
  this.file = file;
  this.loaded = 0;
  this.total = file.size;
  //每次读取1M
  this.step = 1024 * 1024;
  this.events = events || {};
  //读取第一块
  this.readBlob(0);
  this.bindEvent();
}

FileLoader.prototype = {
  bindEvent: function (events) {
    var _this = this,
      reader = this.reader;

    reader.onload = function (e) {
      _this.onLoad();
    };

    reader.onprogress = function (e) {
      _this.onProgress(e.loaded);
    };

    // start 、abort、error 回调暂时不加
  },
  // progress 事件回掉
  onProgress: function (loaded) {
    var percent,
      handler = this.events.progress;//进度条

    this.loaded += loaded;
    percent = (this.loaded / this.total) * 100;
    handler && handler(percent);
  },
  // 读取结束（每一次执行read结束时调用，并非整体）
  onLoad: function () {
    var handler = this.events.load;

    // 应该在这里发送读取的数据
    handler && handler(this.reader.result);



    // 如果未读取完毕继续读取
    if (this.loaded < this.total) {
      this.readBlob(this.loaded);
    } else {
      // 读取完毕
      this.loaded = this.total;
      // 如果有success回掉则执行
      this.events.success && this.events.success();
    }
  },
  // 读取文件内容
  readBlob: function (start) {
    var blob,
      file = this.file;

    // 如果支持 slice 方法，那么分步读取，不支持的话一次读取
    if (file.slice) {
      blob = file.slice(start, start + this.step);
    } else {
      blob = file;
    }

    this.reader.readAsText(blob);
  },
  // 中止读取
  abort: function () {
    var reader = this.reader;

    if(reader) {
      reader.abort();
    }
  }
}
