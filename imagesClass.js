<script>
class imageClass {
  TYPE_FILE   = "FILE";    //<input type="file">で選択されたファイル
  TYPE_SERVER = "SERVER";  //サーバにあるファイル
  TYPE_GAS    = "GAS";    //GASの画像ファイル

  /**
   * 画像の定義
   */
  constructor() {
    this.width  = 0;  //画像の幅の初期化
    this.height = 0;  //画像の高さの初期化
    this.type = "";  //画像種別
    this.loaded = false;  //ロード済みか（初期値：未ロード）
    this.dispEleID = "";  //表示するエレメントID
    this.image = new Image();
  }

  /**
   * <input type="file">で指定された画像ファイルの属性を取り出す
   * @param inputFileID <input type="file">のID
   * @param imgEleID 画像を表示するimgタグのID
   * @param nextFunc ファイルの属性を取り出した後に実行する関数
   */
  getLocalImgFileAttr(inputFileID ,imgEleID ,nextFunc) {
    const ele = document.getElementById(inputFileID);
    if(ele.files[0]) {
      this.image.src = URL.createObjectURL(ele.files[0]);

      this.image.onload = function() {
        this.width  = image.naturalWidth;
        this.height = image.naturalHeight;
        this.type   = TYPE_FILE;
        this.loaded = true;

        if(imgEleID !== undefined) {
          showLocalImgFile(imgEleID ,nextFunc);
        }
      }
    }
  }

  /**
   * <input type="file">で指定された画像ファイルを表示する
   * @param imgEleID 画像を表示するimgタグのID
   * @param nextFunc 画像を表示した後に実行する関数
   */
  showLocalImgFile(imgEleID ,nextFunc) {
    const ID = document.getElementById(imgEleID);
    ID.src = this.image.src;

    ID.onload = function() {
      this.dispEleID = imgEleID;
      if(nextFunc !== undefined) {
        nextFunc(this);
      }
    }
  }


  /**
   * imgタグで表示された画像ファイルの属性を取り出す
   * @param imgEleID imgタグのID
   * @param nextFunc ファイルの属性を取り出した後に実行する関数
   */
  getServerImgFileAttr(imgEleID ,nextFunc) {
    const ID = document.getElementById(imgEleID);
    this.image.src = ID.src;

    this.image.onload = function() {
      this.width  = image.naturalWidth;
      this.height = image.naturalHeight;
      this.type   = TYPE_SERVER;
      this.loaded = true;
      this.dispEleID = imgEleID;
      if(nextFunc !== undefined) {
        nextFunc(this);
      }
    }
  }


  /**
   * GASの画像ファイルIDの内容をbase64で読み込む
   * @param GASFileID GASの画像ファイルID
   * @param imgEleID base64で読み込んだ画像を表示するimgタグのID
   * @param nextFunc 画像を表示した後に実行する関数
   */
  getGASImgFileAttr(GASFileID ,imgEleID ,nextFunc) {
    const url = google.script.run
      .withSuccessHandler(base64Data => {
      this.image.src = "data:image/png;base64," + imgBase64;

      this.image.onload = function() {
        this.width  = image.naturalWidth;
        this.height = image.naturalHeight;
        this.type   = TYPE_GAS;
        this.loaded = true;

        if(imgEleID !== undefined) {
          this.showGASImgFile(imgEleID ,base64Data ,nextFunc);
        }
      })
      .withFailureHandler(console.error)
      .loadImgInBase64Format(GASFileID); 
  }

  /**
   * GASの画像ファイルの表示
   * @param imgEleID 画像を表示するimgタグのID
   * @param imgBase64 画像データ
   * @param nextFunc 画像を表示した後に実行する関数
   */
  showGASImgFile(imgEleID ,imgBase64 ,nextFunc) {
    const ID = document.getElementById(imgID);
    ID.src = "data:image/png;base64," + imgBase64);

    ID.onload = function() {
      this.dispEleID = imgEleID;
      if(nextFunc !== undefined) {
        nextFunc(this);
      }
    }
  }
}


/////////////////////////////////////////////////////////////////////


/**
 * <input type="file"> で指定された画像ファイルの属性を取り出す
 * @param {string} inputFileID <input type="file">のID
 * @param {function} nextFunc ファイルの属性を取り出した後に実行する関数
 */
function getImgFileAttrAfterFileRead(inputFileID ,nextFunc) {
  const ID = document.getElementById(inputFileID);
  if(ID.files[0]) {
    let image = new Image();
    image.src = URL.createObjectURL(ID.files[0]);

    image.onload = function() {
      let result = {
        width  : image.naturalWidth ,
        height : image.naturalHeight
      };

      if(nextFunc !== undefined) {
        nextFunc(result);
      }
    }
  }
}

/**
 * imgタグで表示された画像ファイルの属性を取り出す
 * @param {string} imgID imgタグのID
 * @param {function} nextFunc ファイルの属性を取り出した後に実行する関数
 */
function getImgFileAttrAfterFileLoaded(imgID ,nextFunc) {
  const ID = document.getElementById(imgID);
  let image = new Image();
  image.src = ID.src;

  let result = {
    width  : image.naturalWidth ,
    height : image.naturalHeight
  };

  if(nextFunc !== undefined) {
    nextFunc(result);
  }
}

/**
 * GASの画像ファイルIDの内容をbase64で読み込む
 * @param {string} GASFileID GASの画像ファイルID
 * @param {string} imgID imgタグのID
 * @param {function} nextFunc base64で読み込んだファイルの属性を取り出した後に実行する関数
 */
function loadImgInBase64Image(GASFileID ,imgID ,nextFunc) {
  const url = google.script.run
    .withSuccessHandler(base64Data => {
      if(nextFunc !== undefined) {
        nextFunc(GASFileID ,imgID ,base64Data);
      }
    })
    .withFailureHandler(console.error)
    .loadImgInBase64Format(GASFileID); 
}

/**
 * GASの画像ファイルの表示
 * @param {string} imgID 表示するimgタグのID
 * @param {string} GASFileID GASの画像ファイルID
 * @param {bin} imgBase64 画像データ
 */
function showGASImageFile(GASFileID ,imgID ,imgBase64) {
  const ID = document.getElementById(imgID);
  ID.setAttribute("src", "data:image/png;base64," + imgBase64);

  ID.onload = function() {
    getImgFileAttrAfterFileLoaded(imgID ,dispDimension);
  }
}
</script>
