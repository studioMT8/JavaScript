<script>
  class canvas {
    canvasID  = null;  //カンバスのhtmlElementID
    canvasEle = null;  //カンバスのhtmlElement

    /**
     * カンバスの定義
     * @param {HTMLElement} canvasElementID カンバスのエレメントID
     */
    open(canvasElementID) {
      this.canvasID  = canvasElementID;
      this.canvasEle = document.getElementById(canvasElementID);
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
      this.canvasEle.style.width  = showWidth  + "px";
      this.canvasEle.style.height = showHeight + "px";

      //カンバス自体の大きさ
      this.canvasEle.width  = canvasWidth;
      this.canvasEle.height = canvasHeight;
    }

    /**
     * 画像全域表示
     * @param {HTMLElement} pictEleID 表示する画像があるエレメントID
     * @param {number} showWidth 表示する幅
     * @param {number} showHeight 表示する高さ
     */
    showImageFull(pictEleID ,showWidth ,showHeight) {
      const pictEle = document.getElementById(pictEleID);
      this.canvasEle.getContext("2d").clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);
      this.canvasEle.getContext("2d").drawImage(pictEleID,
        0, 0, showWidth ,showHeight , //画像のどの範囲を表示するか
        0, 0, this.canvasEle.width, this.canvasEle.height   //カンバスのどの範囲に表示するか
      );
    }
  }
</script>
