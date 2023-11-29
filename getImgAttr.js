<script>
/**
 * imgタグで表示された画像ファイルの属性を取り出す
 * @param {string} imgID imgタグのID
 * @param {function} nextFunc ファイルの属性を取り出した後に実行する関数
 */
function getImgAttr(imgID ,nextFunc) {
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
</script>
