// テキストのアニメーションを管理する基本クラス
class TextAnimation {
    constructor(el) {
        this.DOM = {};
        // エレメントが直接渡されたか、セレクタ文字列が渡されたかを確認
        this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el);
        // HTML内のテキストを文字配列として取得
        this.chars = this.DOM.el.innerHTML.trim().split("");
        // 分割したテキストをHTMLに再設定
        this.DOM.el.innerHTML = this._splitText();
    }

    // テキストを<span>タグで囲むためのメソッド
    _splitText() {
        return this.chars.reduce((acc, curr) => {
            curr = curr.replace(/\s+/, '&nbsp;');  // 空白文字をHTMLエンティティに置き換え
            return `${acc}<span class="char">${curr}</span>`;  // 各文字を<span>で囲む
        }, "");
    }

    // アニメーションのトリガーメソッド
    animate() {
        this.DOM.el.classList.toggle('inview');
    }
}

// TextAnimationクラスを拡張し、gsapを使用してアニメーションを追加
class TweenTextAnimation extends TextAnimation {
    constructor(el) {
        super(el);
        // charクラスを持つすべての要素への参照を取得
        this.DOM.chars = this.DOM.el.querySelectorAll('.char');
    }

    // gsapを使用してのアニメーション実行メソッド
    animate() {
        this.DOM.el.classList.add('inview');
        this.DOM.chars.forEach((c, i) => {
            // gsapを使用して各文字にアニメーションを適用
            gsap.to(c, .6, {
                ease: Back.easeOut,      // アニメーションのイージング
                delay: i * .05,          // 各文字のアニメーションの遅延
                startAt: { y: '-50%', opacity: 0},  // アニメーション開始位置
                y: '0%',                 // アニメーション終了位置
                opacity: 1               // 最終的な透明度
            });
        });
    }
}
