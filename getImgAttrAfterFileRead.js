<script>
/**
 * <input type="file"> で指定された画像ファイルの属性を取り出す
 * @param {string} inputFileID <input type="file">のID
 * @param {function} nextFunc ファイルの属性を取り出した後に実行する関数
 */
function getImgAttrAfterFileRead(inputFileID ,nextFunc) {
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
</script>
