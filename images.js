<script>
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
