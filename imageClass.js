<script>
const IMG_SRC_TYPE_LOCAL  = "LOCAL";
const IMG_SRC_TYPE_SERVER = "SERVER";
const IMG_SRC_TYPE_GAS    = "GAS";
const IMG_SRC_TYPE_PHOTO  = "PHOTO";

class imageClass {
  /**
   * 画像の定義
   */
  width;      //画像の幅
  height;     //画像の高さ
  srcType;    //ファイル種別
  loaded;     //ロード済みか
  dispEleID;  //表示するエレメントID
  imgObj;
  fileName;   //ファイル名
  fileExt;    //ファイル名拡張子

  constructor() {
    this.width     = 0;     //画像の幅の初期化
    this.height    = 0;     //画像の高さの初期化
    this.srcType   = "";    //ファイル種別
    this.loaded    = false; //ロード済みか（初期値：未ロード）
    this.dispEleID = "";    //表示するエレメントID
    this.fileName  = "";    //ファイル名
    this.fileExt   = "";    //ファイル名拡張子
  }

  /**
   * <input type="file">で指定された画像ファイルの表示と属性の取り出し
   * @param inputFileID <input type="file">のID
   * @param dispWidth 画像ファイルの表示幅 0のときは高さに合わせる
   * @param dispHeight 画像ファイルの表示高さ 0のときは幅に合わせる
   * @param imgInstance base64で読み込んだ画像を表示するimgやcanvasのインスタンス
   * @param callback ファイルの属性を取り出した後に実行する関数
   */
  localImgFile(inputFileID ,dispWidth ,dispHeight ,imgInstance ,callback) {
    var self = this;
    const ele = document.getElementById(inputFileID);
    if(ele.files[0]) {
      self.fileName = ele.value;  //ファイル名
      self.fileExt  = self.getFileExtFromFileName(ele.value); //拡張子の取り出し
      self.imgObj = new Image();
      self.imgObj.src = URL.createObjectURL(ele.files[0]);

      self.imgObj.onload = function() {
        this.type   = IMG_SRC_TYPE_LOCAL;
        this.loaded = true;
        self.dispEleID = imgInstance.canvasID;
        //表示するエレメントIDが指定されていれば画像を表示する
        if(imgInstance !== undefined) {
          if (imgInstance.canvasEle instanceof HTMLCanvasElement) {
            self.width  = self.imgObj.naturalWidth;
            self.height = self.imgObj.naturalHeight;
            var dispDim = calcWidthHeight(this.width ,this.height ,dispWidth ,dispHeight);
            imgInstance.setDimensions(dispDim["width"] ,dispDim["height"] ,dispDim["width"] ,dispDim["height"]);
            imgInstance.showImageFullFromImgVal(self.imgObj ,this.width ,this.height);

            if(callback !== undefined) {
              callback(this);
            }
          }
        }
      }
    }
  }

  /**
   * this.fileNameの拡張子の取得
   * @param fileName ファイル名
   * @retunr ファイルの拡張子
   */
  getFileExtFromFileName() {
    let ret = "";

    let split = this.fileName.split(".");
    if(split.length >= 1) {
      ret = split[split.length-1];
    }

    return ret;
  }

  /**
   * imgタグで表示された画像ファイルの属性の取り出し
   * @param imgEleID imgタグのID
   * @param callback ファイルの属性を取り出した後に実行する関数
   */
  serverImgFile(imgEleID ,callback) {
    var imgObj = new Image();
    imgObj.src = document.getElementById(imgEleID).src;
    this.imgObj = imgObj;
    imgObj.onload = function() {
      this.width  = imgObj.naturalWidth;
      this.height = imgObj.naturalHeight;
      this.type   = IMG_SRC_TYPE_SERVER;
      this.loaded = true;
      this.dispEleID = imgEleID;
      if(callback !== undefined) {
        callback(this);
      }
    }
  }

  /**
   * GASの画像ファイルIDの内容をbase64での読み込み
   * @param GASFileID GASの画像ファイルID
   * @param dispWidth 画像ファイルの表示幅 0のときは高さに合わせる
   * @param dispHeight 画像ファイルの表示高さ 0のときは幅に合わせる
   * @param imgWidth 画像ファイルの幅 不明のときは0
   * @param imgHeight 画像ファイルの高さ 不明のときは0
   * @param imgInstance base64で読み込んだ画像を表示するimgやcanvasのインスタンス
   * @param callback 画像を表示した後に実行する関数
   */
  GASImgFile(GASFileID ,dispWidth ,dispHeight ,imgWidth ,imgHeight ,imgInstance ,callback) {
    var self = this;
    google.script.run
      .withSuccessHandler(base64Data => {
        self.imgObj = new Image();
        self.imgObj.src = "data:image/png;base64," + base64Data;

        self.imgObj.onload = function() {
          if(imgWidth <= 0) {
            self.width = self.imgObj.naturalWidth;
          } else {
            self.width = imgWidth;
          }

          if(imgHeight <= 0) {
            self.height = self.imgObj.naturalHeight;
          } else {
            self.height = imgHeight;
          }

          this.type   = IMG_SRC_TYPE_GAS;
          this.loaded = true;

          //表示するエレメントIDが指定されていれば画像を表示する
          if(imgInstance !== undefined) {
            if (imgInstance.canvasEle instanceof HTMLCanvasElement) {
              var dispDim = calcWidthHeight(this.width ,this.height ,dispWidth ,dispHeight);
              imgInstance.setDimensions(dispDim["width"] ,dispDim["height"] ,dispDim["width"] ,dispDim["height"]);
              imgInstance.showImageFullFromImgVal(self.imgObj ,this.width ,this.height);
            } else {
              self.showGASImg(self.imgObj ,imgInstance.canvasID ,callback);
            }
          }
        }
      })
      .withFailureHandler(console.error)
      .loadImgInBase64Format(GASFileID);
  }

  /**
   * GASの画像の表示
   * @param imgObj 画像オブジェクト
   * @param imgEleID base64で読み込んだ画像を表示するimgタグのID
   * @param callback 画像を表示した後に実行する関数
   */
  showGASImg(imgObj ,imgEleID ,callback) {
    this.dispEleID = imgEleID;
    const ID = document.getElementById(imgEleID);
    ID.src = imgObj.src;

    ID.onload = function() {
      this.dispEleID = imgEleID;
      if(callback !== undefined) {
        callback(this);
      }
    }
  }

  /**
   * カメラで撮影した画像の表示と属性の取り出し
   * @param cameraClass カメラクラス
   * @param videoTagID カメラのvideoタグのID
   * @param dispWidth 画像の表示幅 0のときは高さに合わせる
   * @param dispHeight 画像の表示高さ 0のときは幅に合わせる
   * @param imgInstance 撮影した画像を表示するimgやcanvasのインスタンス
   * @param callback ファイルの属性を取り出した後に実行する関数
   */
  cameraImg(cameraClass ,videoTagID ,dispWidth ,dispHeight ,imgInstance ,callback) {
    var self = this;
    const ele = document.getElementById(videoTagID);
    self.imgObj = new Image();
    self.imgObj.src = ele.src;          //URL.createObjectURL(ele.files[0]);

    //正味の大きさ
    let longSide  = cameraClass.getPictWidth();
    let shortSide = cameraClass.getPictHeight();

    if(longSide <= shortSide) {
      let tmp = longSide;
      longSide = shortSide;
      shortSide = tmp;
    }
    if(dispWidth >= dispHeight) {
      //横長のとき
      this.width  = longSide;
      this.height = shortSide;
    } else {
      //縦長のとき
      this.width  = shortSide;
      this.height = longSide;
    }

    this.type   = IMG_SRC_TYPE_PHOTO;
    this.loaded = true;
    self.dispEleID = imgInstance.canvasID;
    //表示するエレメントIDが指定されていれば画像を表示する
    if(imgInstance !== undefined) {
      if(imgInstance.canvasEle instanceof HTMLCanvasElement) {
        var dispDim = calcWidthHeight(this.width ,this.height ,dispWidth ,dispHeight);
        imgInstance.setDimensions(dispWidth ,dispHeight ,dispWidth ,dispHeight);
        imgInstance.showImageFullFromImgVal(cameraClass.finderEle ,this.width ,this.height);
      }

      if(callback !== undefined) {
        callback(this);
      }
    }
  }

  /**
   * 画素数の取り出し
   * @return 画像の画素数
   */
  getPixels() {
    return {WIDTH : this.width ,HEIGHT : this.height};
  }
}
</script>
