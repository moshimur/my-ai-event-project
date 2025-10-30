/**
 * AI用語辞書のアコーディオン機能
 *
 * このスクリプトは、各AI用語の詳細説明の表示/非表示を切り替える
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

    // ==========================================
    // Wikipedia検索機能
    // ==========================================

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResult = document.getElementById('search-result');

    // 検索フォームの送信イベント
    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return;

        // 検索中の表示
        searchResult.innerHTML = '<div class="loading">検索中...</div>';
        searchResult.style.display = 'block';

        try {
            // Wikipedia APIで情報を取得
            const data = await searchWikipedia(searchTerm);

            if (data) {
                displaySearchResult(data, searchTerm);
            } else {
                searchResult.innerHTML = `
                    <div class="error">
                        <h3>⚠️ 検索結果が見つかりませんでした</h3>
                        <p>「${escapeHtml(searchTerm)}」に関する情報がWikipediaで見つかりませんでした。</p>
                        <p>別の用語で検索してみてください。</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('検索エラー:', error);
            searchResult.innerHTML = `
                <div class="error">
                    <h3>⚠️ エラーが発生しました</h3>
                    <p>情報の取得中にエラーが発生しました。しばらくしてから再度お試しください。</p>
                </div>
            `;
        }
    });

    /**
     * Wikipedia APIで情報を検索
     * @param {string} searchTerm - 検索語
     * @returns {Promise<Object|null>} 検索結果
     */
    async function searchWikipedia(searchTerm) {
        // Wikipedia API: 記事の概要を取得
        const apiUrl = `https://ja.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                // 404の場合は検索候補を試す
                if (response.status === 404) {
                    return await searchWikipediaByQuery(searchTerm);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Wikipedia API エラー:', error);
            return null;
        }
    }

    /**
     * Wikipedia検索APIで候補を取得
     * @param {string} searchTerm - 検索語
     * @returns {Promise<Object|null>} 検索結果
     */
    async function searchWikipediaByQuery(searchTerm) {
        // OpenSearch APIで検索候補を取得
        const searchUrl = `https://ja.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(searchTerm)}&limit=1&format=json&origin=*`;

        try {
            const response = await fetch(searchUrl);
            const data = await response.json();

            // 検索結果がある場合、最初の候補で記事を取得
            if (data[1] && data[1].length > 0) {
                const firstResult = data[1][0];
                return await searchWikipedia(firstResult);
            }

            return null;
        } catch (error) {
            console.error('Wikipedia Search API エラー:', error);
            return null;
        }
    }

    /**
     * 検索結果を初心者向けに表示
     * @param {Object} data - Wikipedia APIのレスポンス
     * @param {string} searchTerm - 検索語
     */
    function displaySearchResult(data, searchTerm) {
        const title = data.title || searchTerm;
        const extract = data.extract || '';
        const thumbnail = data.thumbnail ? data.thumbnail.source : '';
        const pageUrl = data.content_urls ? data.content_urls.desktop.page : '';

        // 初心者向けに整形された情報を生成
        const simplifiedContent = simplifyContent(extract);

        let html = `
            <div class="result-card">
                <div class="result-header">
                    <h3>${escapeHtml(title)}</h3>
                </div>
                ${thumbnail ? `<img src="${thumbnail}" alt="${escapeHtml(title)}" class="result-image">` : ''}
                <div class="result-content">
                    <h4>📖 概要</h4>
                    ${simplifiedContent}
                </div>
                ${pageUrl ? `
                    <div class="result-footer">
                        <a href="${pageUrl}" target="_blank" rel="noopener noreferrer" class="wiki-link">
                            📚 Wikipediaで詳しく読む →
                        </a>
                    </div>
                ` : ''}
            </div>
        `;

        searchResult.innerHTML = html;

        // 検索結果までスクロール
        searchResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * コンテンツを初心者向けに簡略化
     * @param {string} text - 元のテキスト
     * @returns {string} 簡略化されたHTML
     */
    function simplifyContent(text) {
        if (!text) return '<p>情報を取得できませんでした。</p>';

        // テキストを段落に分割
        const paragraphs = text.split('\n').filter(p => p.trim().length > 0);

        // 最初の2-3段落を表示（長すぎる場合は制限）
        const displayParagraphs = paragraphs.slice(0, 3);

        let html = displayParagraphs.map(p => {
            // HTMLエスケープ
            const escaped = escapeHtml(p);
            return `<p>${escaped}</p>`;
        }).join('');

        // 重要な用語を強調（簡易版）
        html = highlightKeyTerms(html);

        return html;
    }

    /**
     * 重要な用語を強調表示
     * @param {string} html - HTML文字列
     * @returns {string} 強調表示されたHTML
     */
    function highlightKeyTerms(html) {
        // AI関連の重要用語のリスト
        const keyTerms = [
            '人工知能', 'AI', '機械学習', 'ディープラーニング', '深層学習',
            'ニューラルネットワーク', '学習', 'モデル', 'アルゴリズム',
            'データ', 'パターン', '予測', '分類', '認識', 'LLM',
            'トランスフォーマー', 'Transformer', 'プロンプト', 'トークン',
            'ファインチューニング', 'エンベディング', 'RAG', 'ハルシネーション'
        ];

        let result = html;
        keyTerms.forEach(term => {
            // 正規表現で用語を検索して強調（既に強調されていないものだけ）
            const regex = new RegExp(`(?<!<strong>)${term}(?!</strong>)`, 'g');
            result = result.replace(regex, `<strong>${term}</strong>`);
        });

        return result;
    }

    /**
     * HTMLエスケープ処理
     * @param {string} text - エスケープするテキスト
     * @returns {string} エスケープされたテキスト
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    console.log('Wikipedia検索機能が初期化されました。');
});
