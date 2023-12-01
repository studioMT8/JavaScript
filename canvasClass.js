<script>
class canvasClass {
  /**
   * カンバスの定義
   * @param canvasEleID カンバスのエレメントID
   */
  constructor(canvasEleID) {
    this.canvasID  = canvasEleID;                           //カンバスのエレメントID
    this.canvasEle = document.getEleById(canvasElementID);  //カンバスのエレメント
  }

  /**
   * カンバスの大きさの指定
   * @param canvasWidth カンバスの横方向の画素数
   * @param canvasHeight カンバスの縦方向の画素数
   * @param showWidth 見た目の横方向の画素数
   * @param showHeight 見た目の縦方向の画素数
   */
  setDimensions(canvasWidth ,canvasHeight ,showWidth ,showHeight) {
    //カンバスエレメントの大きさ
    this.canvasEle.style.width  = showWidth  + "px";
    this.canvasEle.style.height = showHeight + "px";

    //カンバス自体の大きさ
    this.canvasEle.width  = canvasWidth;
    this.canvasEle.height = canvasHeight;
  }

  /**
   * imgタグの画像表示
   * @param pictEleID 表示する画像があるエレメントID
   * @param imgDispWidth 画像の横方向の表示範囲
   * @param imgDispHeight 画像の縦方向の表示範囲
   */
  showImageFullFromImgTag(pictEleID ,imgDispWidth ,imgDispHeight) {
    const pictEle = document.getElementById(pictEleID);
    this.clear();
    this.canvasEle.getContext("2d").drawImage(pictEle,
      0, 0, imgDispWidth ,imgDispHeight , //画像のどの範囲を表示するか
      0, 0, this.canvasEle.width, this.canvasEle.height   //カンバスのどの範囲に表示するか
    );
  }

  /**
   * imageオブジェクトの画像表示
   * @param imgObj Imageオブジェクト
   * @param imgDispWidth 画像の横方向の表示範囲
   * @param imgDispHeight 画像の縦方向の表示範囲
   */
  showImageFullFromImgVal(imgObj ,imgDispWidth ,imgDispHeight) {
    this.clear();
    this.canvasEle.getContext("2d").drawImage(imgObj,
      0, 0, imgDispWidth ,imgDispHeight , //画像のどの範囲を表示するか
      0, 0, this.canvasEle.width, this.canvasEle.height   //カンバスのどの範囲に表示するか
    );
  }

  /**
   * 画像全域をクリア
   * canvasタグの左上からの領域をクリア
   * @param clearWidth 画像の横方向のクリア範囲
   * @param clearHeight 画像の縦方向のクリア範囲
   */
  clear(clearWidth ,clearHeight) {
    this.canvasEle.getContext("2d").clearRect(0, 0, clearWidth ,clearHeight);
  }

  /**
   * 画像全域をクリア
   * canvasタグの全領域をクリア
   */
  clearAll() {
    this.canvasEle.getContext("2d").clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);
  }
}
</script>
