<script>
/**
 * GASの画像ファイルIDの内容をbase64で読み込む
 * @param {string} GASFileID GASの画像ファイルID
 * @param {string} imgID imgタグのID
 * @param {function} nextFunc base64で読み込んだ後に実行する関数
 */
function loadImgInBase64Format(GASFileID ,imgID ,nextFunc) {
  const url = google.script.run
    .withSuccessHandler(base64Data => {
      if(nextFunc !== undefined) {
        nextFunc(base64Data ,imgID ,GASFileID);
      }
    })
    .withFailureHandler(console.error)
    .loadImgInBase64Format(GASFileID);  //see https://github.com/studioMT8/googleAppsScript/blob/main/loadImgInBase64Format.gs
}
</script>
