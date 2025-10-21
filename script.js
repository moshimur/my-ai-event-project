/**
 * RAG解説ページのアコーディオン機能
 *
 * このスクリプトは、セクションの表示/非表示を切り替える
 * アコーディオン機能を実装します。
 */

document.addEventListener('DOMContentLoaded', function() {
    // すべてのアコーディオンヘッダーを取得
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // 各ヘッダーにクリックイベントを追加
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            // クリックされたヘッダーの親要素（.accordion）を取得
            const accordion = this.parentElement;

            // activeクラスをトグル（追加/削除を切り替え）
            accordion.classList.toggle('active');

            // アニメーション効果のために、アクティブ状態を確認
            const isActive = accordion.classList.contains('active');

            // アクセシビリティのためのaria属性を更新
            this.setAttribute('aria-expanded', isActive);

            // スクリーンリーダー用のテキストを更新
            if (isActive) {
                console.log('アコーディオンが開かれました:', this.textContent);
            } else {
                console.log('アコーディオンが閉じられました:', this.textContent);
            }
        });

        // 初期状態でaria属性を設定（アクセシビリティ向上）
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');

        // キーボードアクセシビリティ: EnterキーとSpaceキーでも開閉できるようにする
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ページ読み込み時のメッセージ
    console.log('アコーディオン機能が初期化されました。' + accordionHeaders.length + '個のセクションが見つかりました。');
});
