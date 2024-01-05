<script>
class cameraDeviceClass {
  /**
   * コンストラクタ
   * @param pictWidth 撮影する幅の画素数
   * @param pictHeight 撮影する高さの画素数
   * @param finderWidth ファインダーの幅の画素数
   * @param finderHeight ファインダーの高さの画素数
   * @param finderElementID ファインダーとして使うvideoのelementID
   */
  constructor(pictWidth ,pictHeight ,finderWidth ,finderHeight ,finderElementID) {
    this.finderEleID = null;  //ファインダーのhtmlElementID
    this.finderEle   = null;  //ファインダーのhtmlElement

    this.pictWidth  = 0;  //撮影する画像の幅
    this.pictHeight = 0;  //撮影する画像の高さ

    this.finderWidth  = 0;  //ファインダーの幅
    this.finderHeight = 0;  //ファインダーの高さ

    this.stream      = null;  //ビデオストリーム
    this.usingCamera = null; //使っているカメラの仕様

    this.setFinderElementID(finderElementID);
    this.setPictureDimension(pictWidth ,pictHeight);
    this.setFinderDimension(finderWidth ,finderHeight);
  }

  /**
   * ファインダーの画素数の指定
   * @param finderWidth ファインダーの幅の画素数
   * @param finderHeight ファインダーの高さの画素数
   */
  setFinderDimension(finderWidth ,finderHeight) {
    this.finderWidth  = finderWidth;
    this.finderHeight = finderHeight;
  }

  /**
   * 撮影する画素数の指定
   * @param pictWidth 撮影する幅の画素数
   * @param pictHeight 撮影する高さの画素数
   */
  setPictureDimension(pictWidth ,pictHeight) {
    this.pictWidth  = pictWidth;
    this.pictHeight = pictHeight;
  }

  /**
   * ファインダーとして使うcanvasのelementID
   * @param finderElementID elementID
   */
  setFinderElementID(finderElementID) {
    this.finderEleID = finderElementID;
    this.finderEle   = document.getElementById(finderElementID);
  }

  /**
   * カメラを使えるようにする
   * @param openFinder ファインダーを開くか
   */
  prepare(openFinder) {
    /* カメラの選択 */
    //リアカメラの仕様の定義
    const rearCameraSpec = {
      audio: false,
      video: {
        width : this.pictWidth  ,
        height: this.pictHeight ,
        /*
        width : {ideal: this.pictWidth },
        height: {ideal: this.pictHeight},
        */

        facingMode: {exact: "environment"}
      }
    };

    //フロントカメラの仕様の定義
    const frontCameraSpec = {
      audio: false,
      video: {
        width : this.pictWidth  ,
        height: this.pictHeight ,
        /*
        width : {ideal: this.pictWidth },
        height: {ideal: this.pictHeight},
        */

        facingMode: "user"
      }
    };

    if(this.usingCamera == null) {
      //使っているカメラがなければ、どのカメラを使うかを判定する
      navigator.mediaDevices.getUserMedia(rearCameraSpec)
        .then((stream) => {
          //リアカメラがあればそれを使う
          this.stream = stream;
          this.usingCamera = rearCameraSpec;
          //console.log("リアカメラあり");
          if(openFinder) {
            var self = this;
            self.openFinder();
          }
        })
        .catch((err) => {
          //リアカメラがなければフロントカメラを使う
          navigator.mediaDevices.getUserMedia(frontCameraSpec)
            .then((stream) => {
              this.stream = stream;
              this.usingCamera = frontCameraSpec;
              if(openFinder) {
                var self = this;
                self.openFinder();
              }
            })
          });
    } else {
      //リアカメラ、フロントカメラのいずれかが使われていたらそれを起動する
      //カメラON
      navigator.mediaDevices.getUserMedia(this.usingCamera)
        .then((stream) => {
          this.stream = stream;
          if(openFinder) {
            var self = this;
            self.openFinder();
          }
        })
    }
  }

  /**
   * カメラファインダーの表示
   */
  openFinder() {
    //ファインダーの画素数の指定
    this.finderEle.style.width  = this.finderWidth  + "px";
    this.finderEle.style.height = this.finderHeight + "px";

    this.finderEle.width  = this.finderWidth;
    this.finderEle.height = this.finderHeight;

    //ビデオストリームを取り出してカメラを表示
    this.finderEle.srcObject = this.stream;

    this.finderEle.onloadedmetadata = (e) => {
      this.finderEle.play();
    };
  }

  /**
   * シャッターボタン押下
   */
  takePicture() {
    // 演出的な目的で一度映像を止めてSEを再生する
    this.finderEle.pause();  // 映像を停止
    //se.play();      // シャッター音
    setTimeout( () => {
      this.finderEle.play();    // 0.5秒後にカメラ再開
    }, 500);
  }

  /***
   * カメラファインダーを閉じる
   */
  closeFinder() {
    this.finderEle.srcObject.getTracks().forEach(function(track) {
      track.stop();
    });
    this.finderEle.srcObject = null;
  }

  /**
   * ビデオストリームの取得
   */
  getStream() {
    return this.stream;
  }

  getFinderEleID() {
    return this.finderEleID;
  }

  getFinderEle() {
    return this.finderEle;
  }


  getPictWidth() {
    return this.pictWidth;
  }

  getPictHeight() {
    return this.pictHeight;
  }

  getFinderWidth() {
    return this.finderWidth;
  }

  getFinderHeight() {
    return this.finderHeight;
  }
}
</script>
