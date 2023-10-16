// Mainクラスの定義
class Main {
  // プライベートフィールドでobservers配列を初期化
  #observers = [];

  // コンストラクタ
  constructor() {
    // ヘッダー要素を取得
    this.header = document.querySelector(".header");
    // HeroSliderクラスのインスタンスを生成して、this.heroに保存
    this.hero = new HeroSlider(".swiper");
    // sideクラスを持つすべての要素を取得
    this.sides = document.querySelectorAll(".side");
    // 初期化メソッドを実行
    this.#init();
  }

  // プライベートメソッドで初期化を行う
  #init() {
    // モバイルメニューを生成
    new MobileMenu();
    // Pace.jsがロード完了したら、スクロールの初期化メソッドを実行
    Pace.on("done", this.#scrollInit.bind(this));
  }

  // スクロールの初期化を行うプライベートメソッド
  #scrollInit() {
    // ScrollObserverのインスタンスを生成して、observers配列に追加
    this.#observers.push(
      new ScrollObserver("#main-content", this.#sideAnimation.bind(this), { once: false, rootMargin: "-300px 0px" }),
      new ScrollObserver(".nav-trigger", this.#navAnimation.bind(this), { once: false }),
      new ScrollObserver(".swiper", this.#toggleSlideAnimation.bind(this), { once: false }),
      new ScrollObserver(".cover-slide", this.#inviewAnimation),
      new ScrollObserver(".appear", this.#inviewAnimation),
      new ScrollObserver(".tween-animate-title", this.#textAnimation)
    );
    // コンソールにobservers配列を出力
    console.log(this.#observers);
  }

  // スライダーのアニメーションをトグルするプライベートメソッド
  #toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  // テキストのアニメーションを行うプライベートメソッド
  #textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  // ナビゲーションのアニメーションを行うプライベートメソッド
  #navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }

  // サイド要素のアニメーションを行うプライベートメソッド
  #sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach((side) => side.classList.add("inview"));
    } else {
      // typoがあります: tthis → this
      this.sides.forEach((side) => side.classList.remove("inview"));
    }
  }

  // inviewクラスの付与・削除を行うプライベートメソッド
  #inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }
}

// Mainクラスのインスタンスを生成
new Main();
