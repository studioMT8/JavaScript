<script>
class image {
  /**
   * 画像の定義
   */

  width;  //画像の幅の初期化
  height;  //画像の高さの初期化
  type;  //画像種別
  loaded;  //ロード済みか（初期値：未ロード）
  dispEleID;  //表示するエレメントID
  imgObj;

  constructor() {
    Object.defineProperty(this ,'TYPE_LOCAL'   ,{value: "LOCAL"});
    Object.defineProperty(this ,'TYPE_SERVER' ,{value: "SERVER"});
    Object.defineProperty(this ,'TYPE_GAS'    ,{value: "GAS"});

    this.width  = 0;  //画像の幅の初期化
    this.height = 0;  //画像の高さの初期化
    this.type = "";  //画像種別
    this.loaded = false;  //ロード済みか（初期値：未ロード）
    this.dispEleID = "";  //表示するエレメントID
  }

  /**
   * <input type="file">で指定された画像ファイルの表示と属性の取り出し
   * @param inputFileID <input type="file">のID
   * @param imgEleID 画像を表示するimgタグのID
   * @param nextFunc ファイルの属性を取り出した後に実行する関数
   */
  localImgFile(inputFileID ,imgEleID ,nextFunc) {
    const ele = document.getElementById(inputFileID);
    if(ele.files[0]) {
      const ID = document.getElementById(imgEleID);
      ID.src = URL.createObjectURL(ele.files[0]);     //this.image.src;
      ID.onload = function() {
        this.width  = ID.naturalWidth;
        this.height = ID.naturalHeight;
        this.type   = this.TYPE_LOCAL;
        this.loaded = true;
        this.dispEleID = imgEleID;
        if(nextFunc !== undefined) {
          nextFunc(this);
        }
      }
    }
  }

  /**
   * imgタグで表示された画像ファイルの属性の取り出し
   * @param imgEleID imgタグのID
   * @param nextFunc ファイルの属性を取り出した後に実行する関数
   */
  serverImgFile(imgEleID ,nextFunc) {
    var imgObj = new Image();
    imgObj.src = document.getElementById(imgEleID).src;
    this.imgObj = imgObj;
    imgObj.onload = function() {
      this.width  = imgObj.naturalWidth;
      this.height = imgObj.naturalHeight;
      this.type   = this.TYPE_SERVER;
      this.loaded = true;
      this.dispEleID = imgEleID;
      if(nextFunc !== undefined) {
        nextFunc(this);
      }
    }
  }

  /**
   * GASの画像ファイルIDの内容をbase64での読み込み
   * @param GASFileID GASの画像ファイルID
   * @param imgEleID base64で読み込んだ画像を表示するimgタグのID
   * @param nextFunc 画像を表示した後に実行する関数
   */
  GASImgFile(GASFileID ,imgEleID ,nextFunc) {
    var self = this;
    google.script.run
      .withSuccessHandler(base64Data => {
        var imgObj = new Image();
        imgObj.src = "data:image/png;base64," + base64Data;
        this.imgObj = imgObj;

        imgObj.onload = function() {
          this.width  = imgObj.naturalWidth;
          this.height = imgObj.naturalHeight;
          this.type   = this.TYPE_GAS;
          this.loaded = true;

          //表示するエレメントIDが指定されていれば画像を表示する
          if(imgEleID !== undefined) {
            self.showGASImg(imgObj ,imgEleID ,nextFunc);
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
   * @param nextFunc 画像を表示した後に実行する関数
   */
  showGASImg(imgObj ,imgEleID ,nextFunc) {
    this.dispEleID = imgEleID;
    const ID = document.getElementById(imgEleID);
    ID.src = imgObj.src;

    ID.onload = function() {
      this.dispEleID = imgEleID;
      if(nextFunc !== undefined) {
        nextFunc(this);
      }
    }
  }
}
</script>
