// HeroSliderというクラスの定義
class HeroSlider {
    // コンストラクタ関数
    constructor(el) {
        // 引数として受け取った要素をthis.elに保存
        this.el = el;
        // _initSwiperメソッドを実行して、その結果をthis.swiperに保存
        this.swiper = this._initSwiper();
    }

    // Swiperのインスタンスを初期化するメソッド
    _initSwiper() {
        // Swiperのインスタンスを生成して返す
        return new Swiper(this.el, {
            // Swiperの設定オプション
            // direction: 'vertical',  // 垂直方向のスライダーにする場合にコメントを外す
            loop: true,  // ループモードを有効に
            grabCursor: true,  // カーソルがグラブ状態になるよう設定
            effect: 'coverflow',  // エフェクトをカバーフローに設定
            centeredSlides: true,  // アクティブなスライドを中央に配置
            slidesPerView: 1,  // 一度に表示するスライドの数
            speed: 1000,  // トランジションの速度 (ms)
            breakpoints: {
                1024: {
                    slidesPerView: 2,  // 画面幅が1024px以上の場合、スライドを2つ表示
                }
            },
        });
    }

    // スライダーの自動再生を開始するメソッド
    start(options = {}) {
        // デフォルトのオプションと引数として渡されたオプションをマージ
        options = Object.assign({
            delay: 4000,  // 再生の間隔 (ms)
            disableOnInteraction: false  // インタラクション時に自動再生を停止しない
        }, options);
        
        // オプションをSwiperのautoplayプロパティに設定
        this.swiper.params.autoplay = options;
        // Swiperの自動再生を開始
        this.swiper.autoplay.start();
    }
    
    // スライダーの自動再生を停止するメソッド
    stop() {
        this.swiper.autoplay.stop();
    }
}
