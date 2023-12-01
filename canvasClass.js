<script>
class canvasClass {
  /**
   * カンバスの定義
   * @param {HTMLElement} canvasElementID カンバスのエレメントID
   */
  constructor(canvasElementID) {
    this.canvasID  = canvasElementID;                           //カンバスのhtmlElementID
    this.canvasEle = document.getElementById(canvasElementID);  //カンバスのhtmlElement
  }

  /**
   * カンバスの大きさの指定
   * @param {number} canvasWidth カンバスの横方向の画素数
   * @param {number} canvasHeight カンバスの縦方向の画素数
   * @param {number} showWidth 見た目の横方向の画素数
   * @param {number} showHeight 見た目の縦方向の画素数
   */
  setDimensions(canvasWidth ,canvasHeight ,showWidth ,showHeight) {
    //表示の大きさ
    this.canvasEle.style.width  = showWidth  + "px";
    this.canvasEle.style.height = showHeight + "px";

    //カンバス自体の大きさ
    this.canvasEle.width  = canvasWidth;
    this.canvasEle.height = canvasHeight;
  }

  /**
   * 画像全域表示
   * @param {HTMLElement} pictEleID 表示する画像があるエレメントID
   * @param {number} imgDispWidth 画像の表示幅
   * @param {number} imgDispHeight 画像の表示高さ
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
   * 画像全域表示
   * @param {HTMLElement} imgObj Imageオブジェクト
   * @param {number} imgDispWidth 画像の表示幅
   * @param {number} imgDispHeight 画像の表示高さ
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
   */
  clear() {
    this.canvasEle.getContext("2d").clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);
  }

  /**
   * 画像全域をクリア
   * canvasタグの全領域をクリア
   */
  clearAll() {
    var width  = this.canvasEle.clientWidth;
    var height = this.canvasEle.clientHeight;

    this.canvasEle.getContext("2d").clearRect(0, 0, width, height);
  }
}
</script>
