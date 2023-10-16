// スクロール位置に基づいて要素が表示領域に入ったかどうかを監視するクラス
class ScrollObserver {
    // コンストラクタ関数
    constructor(els, cb, options) {
        // 監視対象となる要素への参照を取得
        this.els = document.querySelectorAll(els);
        
        // IntersectionObserverのデフォルトのオプション
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        };
        
        // コールバック関数を保存
        this.cb = cb;
        
        // デフォルトのオプションとユーザーからのオプションをマージ
        this.options = Object.assign(defaultOptions, options);
        
        // 一度だけ実行するかどうかのフラグを保存
        this.once = this.options.once;
        
        // 初期化メソッドを呼び出し
        this._init();
    }

    // 初期化メソッド
    _init() {
        // IntersectionObserverのコールバック関数
        const callback = function (entries, observer) {
            // すべての監視対象要素に対して処理を行う
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // ターゲット要素が表示領域に入っている場合
                    this.cb(entry.target, true);
                    
                    // onceオプションがtrueの場合、監視を終了
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    // ターゲット要素が表示領域から出ている場合
                    this.cb(entry.target, false);
                }
            });
        };

        // IntersectionObserverのインスタンスを作成
        this.io = new IntersectionObserver(callback.bind(this), this.options);
        
        // ポーリングの間隔を設定（特定の環境下でのフォールバック）
        this.io.POLL_INTERVAL = 100;
        
        // 監視対象の要素すべてをIntersectionObserverに登録
        this.els.forEach(el => this.io.observe(el));
    }

    // オブザーバーを破棄するメソッド
    destroy() {
        this.io.disconnect();
    }
}
