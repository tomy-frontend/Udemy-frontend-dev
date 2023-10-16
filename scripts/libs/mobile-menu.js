// MobileMenuというクラスの定義
class MobileMenu {
  // コンストラクタ関数
  constructor() {
    // DOM要素への参照を保存するためのオブジェクトを初期化
    this.DOM = {};
    // モーバイルメニューボタンへの参照を取得
    this.DOM.btn = document.querySelector(".mobile-menu__btn");
    // モーバイルメニューのカバー部分への参照を取得
    this.DOM.cover = document.querySelector(".mobile-menu__cover");
    // グローバルコンテナへの参照を取得
    this.DOM.container = document.querySelector("#global-container");
    // イベントタイプを取得（タッチデバイスかどうかを判断）
    this.eventType = this._getEventType();
    // イベントリスナーを追加
    this._addEvent();
  }

  // タッチデバイスかどうかをチェックして、対応するイベントタイプを返すメソッド
  _getEventType() {
    const isTouchCapable = "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);

    // タッチデバイスなら"touchstart"を、そうでないなら"click"を返す
    return isTouchCapable ? "touchstart" : "click";
  }

  // メニューの開閉をトグルするメソッド
  _toggle() {
    this.DOM.container.classList.toggle("menu-open");
  }

  // イベントリスナーを追加するメソッド
  _addEvent() {
    // メニューボタンとカバーにイベントリスナーを追加
    // クリック/タッチ時に_toggleメソッドを呼び出す
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }
}
