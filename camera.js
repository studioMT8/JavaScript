<script>
  class cameraDevice {
    stream    = null;  //ビデオストリーム
    finderID  = null;  //ファインダーのhtmlElementID
    finderEle = null;  //ファインダーのhtmlElement
    usingCamera = null; //使っているカメラ

    /**
     * カメラを使えるようにする
     * @param {number} width 撮影する幅の画素数
     * @param {number} height 撮影する高さの画素数
     * @param {function} afterOpenCamera カメラ選択後に起動する関数
     */
    open(width ,height ,afterOpenCamera) {
      /* カメラの選択 */
        //リアカメラの仕様の定義
      const rearCameraSpec = {
        audio: false,
        video: {
          width : width  ,
          height: height ,
          facingMode: {exact: "environment"}
        }
      };

      //フロントカメラの仕様の定義
      const frontCameraSpec = {
        audio: false,
        video: {
          width : width  ,
          height: height ,
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
            if(afterOpenCamera !== undefined) {
              afterOpenCamera();
            }
          })
          .catch((err) => {
            //console.log(err.name + ": " + err.message + "　リアカメラなし");

            //リアカメラがなければフロントカメラを使う
            navigator.mediaDevices.getUserMedia(frontCameraSpec)
              .then((stream) => {
                this.stream = stream;
                this.usingCamera = frontCameraSpec;
                if(afterOpenCamera !== undefined) {
                  afterOpenCamera();
                }
              })
            });
      } else {
        //リアカメラ、フロントカメラのいずれかが使われていたらそれを起動する
        //カメラON
        navigator.mediaDevices.getUserMedia(this.usingCamera)
          .then((stream) => {
            this.stream = stream;
            if(afterOpenCamera !== undefined) {
              afterOpenCamera();
            }
          })
      }
    }


    /**
     * ビデオストリームの取得
     *
     */
    getStream() {
      return this.stream;
    }

    getFinderID() {
      return this.finderID;
    }

    getFinderEle() {
      return this.finderEle;
    }

    /**
     * カメラファインダーの表示
     *
     * @param {HTMLElement} finderElementID ファインダーのvideoエレメントID
     * @param {number} finderWidth ファインダーの横方向の画素数
     * @param {number} finderHeight ファインダーの縦方向の画素数
     */
    openFinder(finderElementID ,finderWidth ,finderHeight) {
      this.finderID  = finderElementID;
      this.finderEle = document.getElementById(finderElementID);

      //ファインダーの画素数の指定
      this.finderEle.style.width  = finderWidth  + "px";
      this.finderEle.style.height = finderHeight + "px";

      //ビデオストリームを取り出してカメラを表示
      this.finderEle.srcObject = this.stream;
      this.finderEle.onloadedmetadata = (e) => {
        this.finderEle.play();
      };
    }


    /**
     * シャッターボタン押下
     *
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
  }
</script>
