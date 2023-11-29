<script>
  class cameraDevice {
    constructor() {
      this.stream      = null;  //ビデオストリーム
      this.finderEleID = null;  //ファインダーのhtmlElementID
      this.finderEle   = null;  //ファインダーのhtmlElement
      this.usingCamera = null; //使っているカメラ

      this.pictureWidth  = 0;  //撮影する画像の幅
      this.pictureHeight = 0;  //撮影する画像の高さ

      this.finderWidth  = 0;  //ファインダーの幅
      this.finderHeight = 0;  //ファインダーの高さ
    }


    /**
     * ファインダーの画素数の指定
     * @param {number} finderWidth ファインダーの幅の画素数
     * @param {number} finderHeight ファインダーの高さの画素数
     */
    setFinderDimension(finderWidth ,finderHeight) {
      this.finderWidth  = finderWidth;
      this.finderHeight = finderHeight;
    }

    /**
     * 撮影する画素数の指定
     * @param {number} pictureWidth 撮影する幅の画素数
     * @param {number} pictureHeight 撮影する高さの画素数
     */
    setPictureDimension(pictureWidth ,pictureHeight) {
      this.pictureWidth  = pictureWidth;
      this.pictureHeight = pictureHeight;
    }

    /**
     * ファインダーとして使うcanvasのelementID
     * @param {string} finderElementID elementID
     */
    setFinderElementID(finderElementID) {
      this.finderEleID = finderElementID;
      this.finderEle   = document.getElementById(finderElementID);
    }

    /**
     * カメラを使えるようにする
     * @param {bool} openFinder ファインダーを開くか
     */
    open(openFinder) {
      /* カメラの選択 */
      //リアカメラの仕様の定義
      const rearCameraSpec = {
        audio: false,
        video: {
          width : this.pictureWidth  ,
          height: this.pictureHeight ,
          facingMode: {exact: "environment"}
        }
      };

      //フロントカメラの仕様の定義
      const frontCameraSpec = {
        audio: false,
        video: {
          width : this.pictureWidth  ,
          height: this.pictureHeight ,
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
            console.log("リアカメラあり");
            if(openFinder) {
              this.openFinder();
            }
          })
          .catch((err) => {
            console.log(err.name + ": " + err.message + "　リアカメラなし");

            //リアカメラがなければフロントカメラを使う
            navigator.mediaDevices.getUserMedia(frontCameraSpec)
              .then((stream) => {
                this.stream = stream;
                this.usingCamera = frontCameraSpec;
                console.log("フロントカメラあり");
                if(openFinder) {
                  this.openFinder();
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
              this.openFinder();
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
        console.log("撮影開始");
        this.finderEle.play();
      };
    }

    /**
     * シャッターボタン押下
     * @param {HTMLElement} takenPictureCanvasID 撮影した画像を表示するcanvasエレメントID
     */
    takePicture(takenPictureCanvasID) {
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
      /*
      this.finderEle.srcObject.getTracks().forEach(function(track) {
        track.stop();
      });
      */

      //      this.finderEle.pause();
      //      this.finderEle.stop();

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
  }
</script>
