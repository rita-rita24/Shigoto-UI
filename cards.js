/* Shigoto UI — Component card definitions (wireframe demos) */
const CARDS = {
  "money-input": {
    id: "FR-001", tag: "<sgt-money-input>", name: "金額入力", priority: "must",
    desc: "円・カンマ区切り・全角→半角正規化・空値許可・不正値検出。税込/税抜と小数桁オプション。",
    accept: "受入: `1234567` を入力 → 表示は `1,234,567`。`abc` 入力 → `sgt:validate` で error 発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><div class="field">
            <label class="field__label">見積金額（税抜）</label>
            <div class="input"><span class="input__prefix">¥</span><span class="input__value input__value--num">1,234,567</span><span class="input__suffix">JPY</span></div>
            <span class="field__hint">半角・全角どちらでも可。カンマは自動付与。</span>
          </div></div>
        </div>
        <div class="variant"><div class="variant__label">focus</div>
          <div class="variant__stage"><div class="field">
            <label class="field__label">単価</label>
            <div class="input input--focus"><span class="input__prefix">¥</span><span class="input__value input__value--num">98,000<span class="input__caret"></span></span></div>
          </div></div>
        </div>
        <div class="variant"><div class="variant__label">error</div>
          <div class="variant__stage"><div class="field">
            <label class="field__label">合計金額 <span class="req">必須</span></label>
            <div class="input input--error"><span class="input__prefix">¥</span><span class="input__value">abc</span></div>
            <span class="field__error">数値以外の文字は入力できません。</span>
          </div></div>
        </div>
        <div class="variant"><div class="variant__label">disabled</div>
          <div class="variant__stage"><div class="field">
            <label class="field__label">確定済み金額</label>
            <div class="input input--disabled"><span class="input__prefix">¥</span><span class="input__value input__value--num">3,300,000</span></div>
          </div></div>
        </div>
      </div>`
  },
  "phone-input": {
    id: "FR-002", tag: "<sgt-phone-input>", name: "電話番号入力", priority: "must",
    desc: "ハイフン有無どちらでも可。全角数字を半角に正規化し、固定/携帯/フリーダイヤル種別を判定。",
    accept: "受入: `０９０１２３４５６７８` → 内部値 `09012345678`、表示 `090-1234-5678`、種別 `mobile`。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">入力前</div>
          <div class="variant__stage"><div class="field"><label class="field__label">代表電話</label>
            <div class="input"><span class="input__value input__placeholder mono">03-0000-0000</span></div></div></div>
        </div>
        <div class="variant"><div class="variant__label">正規化後</div>
          <div class="variant__stage"><div class="field"><label class="field__label">代表電話</label>
            <div class="input"><span class="input__value mono">090-1234-5678</span><span class="input__suffix">携帯</span></div>
            <span class="field__hint mono small">入力: ０９０１２３４５６７８ → 090-1234-5678</span></div></div>
        </div>
        <div class="variant"><div class="variant__label">error</div>
          <div class="variant__stage"><div class="field"><label class="field__label">FAX</label>
            <div class="input input--error"><span class="input__value mono">12-345</span></div>
            <span class="field__error">電話番号の桁数が不足しています。</span></div></div>
        </div>
      </div>`
  },
  "postal-input": {
    id: "FR-003", tag: "<sgt-postal-code-input>", name: "郵便番号入力", priority: "must",
    desc: "7桁固定。ハイフン正規化、全角→半角、`〒` 接頭辞。住所補完APIは外部注入。",
    accept: "受入: `1000001` / `100-0001` / `１００−０００１` 全て `100-0001` に正規化。7桁未満は error。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><div class="field"><label class="field__label">郵便番号</label>
            <div class="input"><span class="input__prefix">〒</span><span class="input__value mono">100-0001</span><span class="input__suffix">住所検索</span></div></div></div>
        </div>
        <div class="variant"><div class="variant__label">error</div>
          <div class="variant__stage"><div class="field"><label class="field__label">郵便番号 <span class="req">必須</span></label>
            <div class="input input--error"><span class="input__prefix">〒</span><span class="input__value mono">1000</span></div>
            <span class="field__error">郵便番号は7桁で入力してください。</span></div></div>
        </div>
        <div class="variant"><div class="variant__label">補完済</div>
          <div class="variant__stage"><div class="field"><label class="field__label">郵便番号</label>
            <div class="input"><span class="input__prefix">〒</span><span class="input__value mono">100-0001</span></div>
            <span class="field__hint">→ 東京都千代田区千代田 を補完しました。</span></div></div>
        </div>
      </div>`
  },
  "address-input": {
    id: "FR-004", tag: "<sgt-address-input>", name: "住所入力", priority: "must",
    desc: "都道府県セレクト・市区町村・番地・建物名を一塊で扱う。郵便番号からの補完イベントを受信できる。",
    accept: "受入: `sgt:postal-resolved` を受け取ると 都道府県/市区町村/町名 を自動で埋め、建物名にフォーカスを移す。",
    body: `
      <div class="variant__stage" style="border-style: solid; border-color: var(--line);">
        <div class="form-grid form-grid--label-1col">
          <div class="field"><label class="field__label">都道府県</label>
            <div class="input"><span class="input__value">東京都</span><span class="input__suffix mono">▾</span></div></div>
          <div class="field"><label class="field__label">市区町村</label>
            <div class="input"><span class="input__value">千代田区</span></div></div>
          <div class="field"><label class="field__label">町名・番地</label>
            <div class="input"><span class="input__value">千代田 1-1</span></div></div>
        </div>
        <div class="field" style="margin-top: 12px;">
          <label class="field__label">建物名・部屋番号 <span class="opt">任意</span></label>
          <div class="input"><span class="input__value input__placeholder">例：千代田ビル 8F</span></div>
        </div>
      </div>`
  },
  "date-input": {
    id: "FR-005", tag: "<sgt-date-input>", name: "日付入力", priority: "must",
    desc: "和暦ヒント・年度補助・有効期限の前後関係チェック。発行日と有効期限の整合を内部で扱える。",
    accept: "受入: 発行日 > 有効期限 の場合 `sgt:validate` が `code: \"expiry-before-issue\"` を発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">発行日</div>
          <div class="variant__stage"><div class="field"><label class="field__label">発行日</label>
            <div class="input"><span class="input__value mono">2026-04-26</span><span class="input__suffix">令和8年</span></div>
            <span class="field__hint">FY2026 第1四半期</span></div></div>
        </div>
        <div class="variant"><div class="variant__label">有効期限 (整合エラー)</div>
          <div class="variant__stage"><div class="field"><label class="field__label">有効期限</label>
            <div class="input input--error"><span class="input__value mono">2026-04-20</span></div>
            <span class="field__error">発行日より前の日付は指定できません。</span></div></div>
        </div>
        <div class="variant"><div class="variant__label">プリセット</div>
          <div class="variant__stage"><div class="row">
            <button class="btn btn--ghost btn--sm">+30日</button>
            <button class="btn btn--ghost btn--sm">+60日</button>
            <button class="btn btn--ghost btn--sm">月末</button>
            <button class="btn btn--ghost btn--sm">年度末</button>
          </div></div>
        </div>
      </div>`
  },
  "name-input": {
    id: "FR-017", tag: "<sgt-name-input>", name: "氏名入力（ふりがな連動）", priority: "should",
    desc: "姓・名と、ふりがな（カナ/ひらがな）を同時に扱う。漢字入力時にIME確定値からふりがなを推定。",
    accept: "受入: 「佐藤 花子」と入力 → ふりがな欄に「サトウ ハナコ」を提案（ユーザは編集可能）。",
    body: `
      <div class="variant__stage" style="border-style: solid;">
        <div class="form-grid form-grid--2">
          <div class="field"><label class="field__label">姓 <span class="req">必須</span></label>
            <div class="input"><span class="input__value">佐藤</span></div></div>
          <div class="field"><label class="field__label">名 <span class="req">必須</span></label>
            <div class="input"><span class="input__value">花子</span></div></div>
          <div class="field"><label class="field__label">セイ</label>
            <div class="input"><span class="input__value mono">サトウ</span></div></div>
          <div class="field"><label class="field__label">メイ</label>
            <div class="input"><span class="input__value mono">ハナコ</span></div></div>
        </div>
      </div>`
  },
  "bank": {
    id: "FR-018", tag: "<sgt-bank-account-input>", name: "銀行口座入力", priority: "should",
    desc: "金融機関コード・支店コード・種別（普通/当座）・口座番号・口座名義（カナ）を一括で扱う。",
    accept: "受入: 名義カナに小書き文字（ァィゥェォ等）が含まれる場合は警告を発火。",
    body: `
      <div class="variant__stage" style="border-style: solid;">
        <div class="form-grid form-grid--4">
          <div class="field"><label class="field__label">金融機関</label>
            <div class="input"><span class="input__value mono">0001</span><span class="input__suffix">みずほ銀行</span></div></div>
          <div class="field"><label class="field__label">支店</label>
            <div class="input"><span class="input__value mono">001</span><span class="input__suffix">東京営業部</span></div></div>
          <div class="field"><label class="field__label">種別</label>
            <div class="input"><span class="input__value">普通</span><span class="input__suffix mono">▾</span></div></div>
          <div class="field"><label class="field__label">口座番号</label>
            <div class="input"><span class="input__value mono">1234567</span></div></div>
        </div>
        <div class="field" style="margin-top: 12px;">
          <label class="field__label">口座名義（カナ） <span class="req">必須</span></label>
          <div class="input"><span class="input__value mono">カ）シゴトユーアイ</span></div>
          <span class="field__hint mono small">半角カナ・記号は自動正規化（カ） / ）/ ・）</span>
        </div>
      </div>`
  },
  "invoice-id": {
    id: "FR-019", tag: "<sgt-invoice-id-input>", name: "適格請求書発行事業者番号（インボイス）", priority: "should",
    desc: "T + 13桁の登録番号入力。形式チェックのみ（実在性検証は外部APIへ委譲）。",
    accept: "受入: `T1234567890123` 形式に一致しない場合 error。`T` 接頭辞は自動付与可。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><div class="field"><label class="field__label">インボイス登録番号</label>
            <div class="input"><span class="input__prefix mono">T</span><span class="input__value mono">1234567890123</span></div>
            <span class="field__hint mono small">T+13桁</span></div></div>
        </div>
        <div class="variant"><div class="variant__label">未登録（任意）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">インボイス登録番号 <span class="opt">任意</span></label>
            <div class="input"><span class="input__value input__placeholder mono">未登録</span></div></div></div>
        </div>
        <div class="variant"><div class="variant__label">error</div>
          <div class="variant__stage"><div class="field"><label class="field__label">登録番号</label>
            <div class="input input--error"><span class="input__prefix mono">T</span><span class="input__value mono">12345</span></div>
            <span class="field__error">登録番号は T + 13桁で入力してください。</span></div></div>
        </div>
      </div>`
  },
  "period-select": {
    id: "FR-020", tag: "<sgt-period-select>", name: "期間選択", priority: "should",
    desc: "今日 / 今月 / 先月 / 今年度 / 任意期間 を切替。一覧の絞込やレポートで頻出。",
    accept: "受入: プリセットを選ぶと from / to が自動で埋まり、`sgt:change` を発火。",
    body: `
      <div class="variant__stage" style="border-style: solid;">
        <div class="row" style="margin-bottom: 12px;">
          <button class="btn btn--ghost btn--sm">今日</button>
          <button class="btn btn--ghost btn--sm">今月</button>
          <button class="btn btn--ghost btn--sm">先月</button>
          <button class="btn btn--primary btn--sm">今年度</button>
          <button class="btn btn--ghost btn--sm">任意</button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
          <div class="input"><span class="input__value mono">2026-04-01</span></div>
          <span class="muted mono">〜</span>
          <div class="input"><span class="input__value mono">2027-03-31</span></div>
        </div>
        <span class="anno" style="margin-top: 8px;">FY2026（令和8年度）</span>
      </div>`
  },
  "select": {
    id: "FR-021", tag: "<sgt-select>", name: "セレクト", priority: "must",
    desc: "ネイティブ &lt;select&gt; 互換。グループ化、検索可、説明文付きアイテムに対応。",
    accept: "受入: キーボード（↑↓/Enter/Esc）で操作可能。`disabled` 属性が機能する。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><div class="field"><label class="field__label">支払条件</label>
            <div class="input"><span class="input__value">翌月末払い</span><span class="input__suffix mono">▾</span></div></div></div>
        </div>
        <div class="variant"><div class="variant__label">open</div>
          <div class="variant__stage"><div class="field"><label class="field__label">支払条件</label>
            <div class="combo"><div class="input" style="border:0; padding: 4px 6px;"><span class="input__value">翌月末払い</span><span class="input__suffix mono">▾</span></div>
              <ul class="combo__results">
                <li>当月末払い</li>
                <li class="sel">翌月末払い</li>
                <li>翌々月末払い</li>
                <li>都度払い</li>
              </ul></div></div></div>
        </div>
      </div>`
  },
  "checkbox-radio-toggle": {
    id: "FR-022", tag: "<sgt-checkbox> / <sgt-radio> / <sgt-toggle>", name: "選択（チェック・ラジオ・トグル）", priority: "must",
    desc: "ネイティブ&lt;input&gt;互換のラベル整列。`indeterminate`、グループ化、エラー表示に対応。",
    accept: "受入: ラベルクリックで状態が切り替わる。スペースキーで操作可能。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">checkbox</div>
          <div class="variant__stage"><div class="col">
            <span class="check"><span class="check__box"></span> 軽減税率対象</span>
            <span class="check checked"><span class="check__box"></span> 源泉徴収対象</span>
            <span class="check"><span class="check__box"></span> 内税表示</span>
          </div></div>
        </div>
        <div class="variant"><div class="variant__label">radio group</div>
          <div class="variant__stage"><div class="col">
            <span class="radio"><span class="radio__dot"></span> 税抜表示</span>
            <span class="radio checked"><span class="radio__dot"></span> 税込表示</span>
            <span class="radio"><span class="radio__dot"></span> 税抜＋税額</span>
          </div></div>
        </div>
        <div class="variant"><div class="variant__label">toggle</div>
          <div class="variant__stage"><div class="col">
            <span class="row"><span class="toggle on"></span> 下書き自動保存</span>
            <span class="row"><span class="toggle"></span> 印刷時に印影を表示</span>
          </div></div>
        </div>
      </div>`
  },
  "file-upload": {
    id: "FR-023", tag: "<sgt-file-upload>", name: "ファイルアップロード", priority: "should",
    desc: "ドラッグ&ドロップ・複数ファイル・サイズ/種別検証・進捗表示。",
    accept: "受入: 受付外の拡張子はその場で除外し、ユーザに理由を表示する。",
    body: `
      <div class="grid-2">
        <div class="csv-drop"><strong>ファイルをここにドロップ</strong>.pdf / .png / .jpg ／ 最大 10MB ／ 複数可</div>
        <div class="col">
          <div class="file-row"><span class="file-row__name">contract-2026-04.pdf</span><span class="file-row__size">2.1 MB</span><span class="file-row__bar"><span style="width: 100%;"></span></span><span class="badge badge--approved">完了</span></div>
          <div class="file-row"><span class="file-row__name">stamp.png</span><span class="file-row__size">340 KB</span><span class="file-row__bar"><span style="width: 60%;"></span></span><span class="badge badge--info">送信中</span></div>
          <div class="file-row"><span class="file-row__name">old.exe</span><span class="file-row__size">— </span><span class="file-row__bar"><span style="width:0;"></span></span><span class="badge badge--rejected">拒否</span></div>
        </div>
      </div>`
  },
  "inline-edit": {
    id: "FR-024", tag: "<sgt-inline-edit>", name: "インライン編集", priority: "could",
    desc: "一覧画面で項目を直接書き換える。Enterで確定、Escで取消、Tabで次セルへ。",
    accept: "受入: 編集中に他要素へblurされた場合は自動保存（オプション）／取消（既定）を切替可能。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">表示</div>
          <div class="variant__stage"><div class="row"><span>株式会社サンプル商事</span><button class="btn btn--ghost btn--sm">編集</button></div></div>
        </div>
        <div class="variant"><div class="variant__label">編集中</div>
          <div class="variant__stage"><div class="row"><div class="input input--focus" style="flex: 1;"><span class="input__value">株式会社サンプル商事<span class="input__caret"></span></span></div>
            <span class="anno"><kbd>Enter</kbd> 保存</span><span class="anno"><kbd>Esc</kbd> 取消</span></div></div>
        </div>
      </div>`
  },
  "line-item": {
    id: "FR-006", tag: "<sgt-line-item-table>", name: "明細テーブル", priority: "must",
    desc: "品目・数量・単価から行金額を自動計算。CSV入出力・行並び替え対応。",
    accept: "受入: 数量2・単価3,000 → 金額6,000 が自動計算。行削除直後は `sgt:row-remove` を発火。",
    body: `
      <table class="table">
        <thead><tr><th style="width:24px;">#</th><th>品目 / 摘要</th><th class="num" style="width:80px;">数量</th><th style="width:60px;">単位</th><th class="num" style="width:110px;">単価</th><th class="num" style="width:130px;">金額</th><th style="width:24px;"></th></tr></thead>
        <tbody>
          <tr><td class="row-handle">⋮</td><td>業務UIライブラリ導入支援</td><td class="num">2</td><td>人月</td><td class="num">1,200,000</td><td class="num">2,400,000</td><td class="row-del">×</td></tr>
          <tr><td class="row-handle">⋮</td><td>コンポーネント設計レビュー</td><td class="num">5</td><td>時間</td><td class="num">15,000</td><td class="num">75,000</td><td class="row-del">×</td></tr>
          <tr><td class="row-handle">⋮</td>
            <td><span class="input" style="padding:4px 8px;min-height:28px;"><span class="input__value input__placeholder">品目を入力…</span></span></td>
            <td class="num"><span class="input" style="padding:4px 6px;min-height:28px;justify-content:flex-end;"><span class="input__value input__value--num">3</span></span></td>
            <td><span class="input" style="padding:4px 6px;min-height:28px;"><span class="input__value">式</span></span></td>
            <td class="num"><span class="input input--focus" style="padding:4px 6px;min-height:28px;justify-content:flex-end;"><span class="input__value input__value--num">98,000<span class="input__caret"></span></span></span></td>
            <td class="num">294,000</td><td class="row-del">×</td></tr>
        </tbody>
      </table>
      <div class="row" style="margin-top: 10px;">
        <button class="btn btn--ghost btn--sm">＋ 行を追加</button>
        <button class="btn btn--ghost btn--sm">CSV取込</button>
        <button class="btn btn--ghost btn--sm">CSV出力</button>
        <span class="anno">行ドラッグ <kbd>⋮</kbd> で並び替え</span>
        <span class="anno">小計 ¥2,769,000</span>
      </div>`
  },
  "tax": {
    id: "FR-013", tag: "<sgt-tax-summary>", name: "税額サマリ", priority: "should",
    desc: "小計・消費税(10% / 8%軽減)・合計を行表示。法的保証はせず、税率は外部注入。",
    accept: "受入: 税率変更時に `sgt:change` を発火し、合計を再計算する。",
    body: `<div style="max-width: 360px;"><div class="tax">
      <div class="tax__row"><span>小計（税抜）</span><span class="num">¥2,769,000</span></div>
      <div class="tax__row"><span>消費税 10%</span><span class="num">¥276,900</span></div>
      <div class="tax__row"><span>消費税 8%（軽減）</span><span class="num">¥0</span></div>
      <div class="tax__row total"><span>合計</span><span class="num">¥3,045,900</span></div>
    </div></div>`
  },
  "data-table": {
    id: "FR-025", tag: "<sgt-data-table>", name: "汎用一覧テーブル", priority: "should",
    desc: "列定義・並び替え・選択・スティッキーヘッダ・行アクションを備えた一覧。",
    accept: "受入: ヘッダクリックでソートトグル。`selectable` 時にチェックボックス列が自動追加。",
    body: `
      <table class="table">
        <thead><tr>
          <th style="width: 24px;"><span class="check"><span class="check__box"></span></span></th>
          <th>見積番号 ▴</th><th>取引先</th><th>件名</th>
          <th class="num">合計</th><th>状態</th><th>更新</th><th></th>
        </tr></thead>
        <tbody>
          <tr><td><span class="check checked"><span class="check__box"></span></span></td>
            <td class="mono">Q-2026-0421</td><td>株式会社 サンプル商事</td><td>業務UI導入支援 一式</td>
            <td class="num">¥3,045,900</td><td><span class="badge badge--pending">承認待ち</span></td><td class="mono">04-26 10:12</td><td class="muted">⋯</td></tr>
          <tr class="zebra"><td><span class="check"><span class="check__box"></span></span></td>
            <td class="mono">Q-2026-0420</td><td>サンプル工業 株式会社</td><td>定期保守</td>
            <td class="num">¥220,000</td><td><span class="badge badge--approved">承認済</span></td><td class="mono">04-25 18:00</td><td class="muted">⋯</td></tr>
          <tr><td><span class="check"><span class="check__box"></span></span></td>
            <td class="mono">Q-2026-0419</td><td>合同会社 シゴト</td><td>初期相談</td>
            <td class="num">¥0</td><td><span class="badge badge--draft">下書き</span></td><td class="mono">04-24 09:30</td><td class="muted">⋯</td></tr>
          <tr class="zebra"><td><span class="check"><span class="check__box"></span></span></td>
            <td class="mono">Q-2026-0418</td><td>サンプルテック 合同会社</td><td>追加機能見積</td>
            <td class="num">¥1,540,000</td><td><span class="badge badge--rejected">差戻し</span></td><td class="mono">04-23 14:22</td><td class="muted">⋯</td></tr>
        </tbody>
      </table>`
  },
  "search-filter": {
    id: "FR-026", tag: "<sgt-search-filter>", name: "検索・フィルタ", priority: "should",
    desc: "検索ボックス・フィールド別フィルタチップ・絞込解除。一覧画面の頭で頻出。",
    accept: "受入: チップの × クリックで個別解除、`sgt:change` で確定された filter object を発火。",
    body: `
      <div class="row" style="margin-bottom: 12px;">
        <div class="search" style="flex: 1; min-width: 280px;"><span class="muted">⌕</span><input placeholder="見積番号 / 取引先で検索" /></div>
        <button class="btn btn--ghost btn--sm">絞り込み ▾</button>
      </div>
      <div class="row">
        <span class="badge badge--pending">状態: 承認待ち <span class="muted">×</span></span>
        <span class="badge badge--info">期間: 今月 <span class="muted">×</span></span>
        <span class="badge">担当: 佐藤 花子 <span class="muted">×</span></span>
        <span class="badge">金額: ¥100,000 〜 <span class="muted">×</span></span>
        <a class="muted small" href="#">すべてクリア</a>
      </div>`
  },
  "pagination": {
    id: "FR-027", tag: "<sgt-pagination>", name: "ページネーション", priority: "should",
    desc: "件数表示・ページ移動・ページサイズ切替。キーボード操作対応。",
    accept: "受入: 総件数0件のとき自動的に `disabled` 状態になり、操作不可になる。",
    body: `
      <div class="row" style="justify-content: space-between;">
        <span class="muted small">全 245 件中 <strong>41 - 60</strong> を表示</span>
        <div class="row">
          <span class="muted small">表示件数</span>
          <div class="input" style="min-height: 28px; padding: 4px 8px; min-width: 70px;"><span class="input__value">20</span><span class="input__suffix mono">▾</span></div>
          <div class="pager">
            <button>‹‹</button><button>‹</button>
            <span>1</span><span>2</span><span class="cur">3</span><span>4</span><span>5</span>
            <span class="ell">…</span><span>13</span>
            <button>›</button><button>››</button>
          </div>
        </div>
      </div>`
  },
  "tabs": {
    id: "FR-028", tag: "<sgt-tabs>", name: "タブ", priority: "should",
    desc: "見積詳細などで「基本情報 / 明細 / 履歴」を切替。バッジ付きタブ。",
    accept: "受入: ←→ キーでタブ移動、Home/End で先頭/末尾。",
    body: `
      <div class="tabs__bar">
        <button class="active">基本情報</button>
        <button>明細 <span class="badge badge--info">3</span></button>
        <button>添付ファイル <span class="badge badge--info">2</span></button>
        <button>履歴</button>
        <button class="muted">権限 <span class="anno">無効</span></button>
      </div>
      <div style="padding: 16px 4px; color: var(--muted);">アクティブなタブの中身がここに表示される。</div>`
  },
  "breadcrumb": {
    id: "FR-029", tag: "<sgt-breadcrumb>", name: "パンくず", priority: "should",
    desc: "深い階層の業務画面の現在地を示す。最後の項目は現在地として強調。",
    accept: "受入: 末尾要素は `aria-current=\"page\"` を付与。",
    body: `
      <div class="crumb">
        <a href="#">ホーム</a><span class="sep">/</span>
        <a href="#">取引先管理</a><span class="sep">/</span>
        <a href="#">株式会社 サンプル商事</a><span class="sep">/</span>
        <a href="#">見積</a><span class="sep">/</span>
        <span class="here">Q-2026-0421</span>
      </div>`
  },
  "validation": {
    id: "FR-007", tag: "<sgt-validation-summary>", name: "検証結果一覧", priority: "must",
    desc: "画面内の error / warning を集約。アンカークリックで該当項目へフォーカス。",
    accept: "受入: 必須漏れ3件 → 3件のエラーが一覧表示。`severity: \"warning\"` は別アイコンで区別。",
    body: `
      <div class="validation" role="alert">
        <p class="validation__title">入力内容を確認してください（3件のエラー）</p>
        <ol class="validation__list">
          <li><a href="#money">合計金額</a>に数値以外の文字が含まれています。</li>
          <li><a href="#postal">郵便番号</a>は7桁で入力してください。</li>
          <li><a href="#date">有効期限</a>は発行日より後の日付を指定してください。</li>
        </ol>
      </div>`
  },
  "status": {
    id: "FR-008", tag: "<sgt-status-badge>", name: "ステータスバッジ", priority: "must",
    desc: "下書き / 確認済 / 承認待ち / 承認済 / 差戻し / 取消 / 情報 を視覚＋テキストで表示。",
    accept: "受入: `status=\"pending\"` → 「承認待ち」と表示し、`aria-label` も同値。",
    body: `
      <div class="row">
        <span class="badge badge--draft">下書き</span>
        <span class="badge badge--review">確認済</span>
        <span class="badge badge--pending">承認待ち</span>
        <span class="badge badge--approved">承認済</span>
        <span class="badge badge--rejected">差戻し</span>
        <span class="badge badge--cancel">取消</span>
        <span class="badge badge--info">情報</span>
      </div>
      <p class="muted small" style="margin-top: 12px;">※ 色覚に依存せず、ドット形と語彙の双方で識別できる。</p>`
  },
  "notice": {
    id: "FR-030", tag: "<sgt-notice>", name: "通知 / アラート", priority: "should",
    desc: "ページ内の固定メッセージ。情報・成功・警告・エラーの4種。閉じるボタン任意。",
    accept: "受入: `type=\"error\"` のとき role=\"alert\" を自動付与し、支援技術に通知される。",
    body: `
      <div class="col">
        <div class="notice"><span class="notice__icon" style="color: var(--info);">i</span>
          <div><strong>下書きが自動保存されました</strong>30秒前 ／ 復元するには履歴から選択してください。</div>
          <button class="btn btn--ghost btn--sm">閉じる</button></div>
        <div class="notice notice--success"><span class="notice__icon" style="color: var(--ok);">✓</span>
          <div><strong>見積を発行しました</strong>取引先にメールが送信されました。</div></div>
        <div class="notice notice--warn"><span class="notice__icon" style="color: var(--warn);">!</span>
          <div><strong>承認期限が近づいています</strong>04-27 17:00 までに承認が必要です。</div></div>
        <div class="notice notice--error"><span class="notice__icon" style="color: var(--danger);">!</span>
          <div><strong>保存に失敗しました</strong>ネットワーク接続を確認してください。</div>
          <button class="btn btn--sm">再試行</button></div>
      </div>`
  },
  "dialog": {
    id: "FR-031", tag: "<sgt-dialog>", name: "ダイアログ", priority: "should",
    desc: "発行・削除など破壊的操作の確認。フォーカストラップ・Escで閉じる。",
    accept: "受入: 開いた瞬間にフォーカスが内部に入り、Tab移動はダイアログ内に閉じる。",
    body: `
      <div class="dialog" role="dialog" aria-labelledby="dlg">
        <div class="dialog__head"><h4 class="dialog__title" id="dlg">見積を発行しますか？</h4>
          <button class="btn btn--ghost btn--sm">×</button></div>
        <div class="dialog__body">
          発行後は <strong>編集ができなくなります</strong>。<br>
          取引先（株式会社 サンプル商事）に PDF 添付メールが自動送信されます。
        </div>
        <div class="dialog__foot">
          <button class="btn btn--ghost">キャンセル</button>
          <button class="btn btn--primary">発行する</button>
        </div>
      </div>`
  },
  "drawer": {
    id: "FR-032", tag: "<sgt-drawer>", name: "ドロワー", priority: "could",
    desc: "右からスライドする補助パネル。詳細閲覧・サブフォームに。",
    accept: "受入: Esc / 背景クリックで閉じる。`side=\"left|right\"` を指定可。",
    body: `
      <div style="display: grid; grid-template-columns: 1fr auto; gap: 0;">
        <div style="padding: 16px; background: var(--bg-2); border: 1px dashed var(--line); border-radius: var(--r-sm); color: var(--muted); font-size: 12px;">背景画面（一覧テーブルなど）</div>
        <div class="drawer">
          <div class="drawer__head">
            <h4 class="dialog__title">Q-2026-0421 詳細</h4>
            <button class="btn btn--ghost btn--sm">×</button>
          </div>
          <div class="drawer__body">
            <div class="col">
              <div><span class="muted small mono">取引先</span><br>株式会社 サンプル商事</div>
              <div><span class="muted small mono">合計</span><br><span class="mono">¥3,045,900</span></div>
              <div><span class="muted small mono">状態</span><br><span class="badge badge--pending">承認待ち</span></div>
            </div>
          </div>
          <div class="drawer__foot">
            <button class="btn btn--ghost btn--sm">編集</button>
            <button class="btn btn--primary btn--sm" style="margin-left: auto;">承認</button>
          </div>
        </div>
      </div>`
  },
  "tooltip": {
    id: "FR-033", tag: "<sgt-tooltip>", name: "ツールチップ", priority: "could",
    desc: "ホバー / フォーカスで補足。aria-describedby を自動付与。",
    accept: "受入: キーボードフォーカスでも表示される。Esc で閉じる。",
    body: `
      <div class="row" style="padding: 24px 0; gap: 32px;">
        <span class="tip-wrap">
          <span class="tip">税率は @shigoto-ui/core から注入</span>
          <button class="btn btn--ghost btn--sm">税率設定</button>
        </span>
        <span class="tip-wrap">
          <span class="tip">⌘ + S で保存</span>
          <button class="btn btn--primary btn--sm">下書き保存</button>
        </span>
        <span class="tip-wrap">
          <span class="tip">この値は読み取り専用</span>
          <span class="anno"><kbd>?</kbd> ヘルプ</span>
        </span>
      </div>`
  },
  "empty": {
    id: "FR-034", tag: "<sgt-empty-state>", name: "空状態", priority: "should",
    desc: "0件・初期状態の説明とアクション導線。アイコンは枠のみで装飾を抑える。",
    accept: "受入: アクションは1〜2個まで。誘導先がない場合は説明文のみ可。",
    body: `
      <div class="empty">
        <div class="empty__icon">∅</div>
        <strong>まだ見積はありません</strong>
        新しい見積を作成して取引先へ送付しましょう。<br>
        CSVから一括登録することもできます。
        <div class="row" style="justify-content: center; margin-top: 14px;">
          <button class="btn btn--primary btn--sm">新規作成</button>
          <button class="btn btn--ghost btn--sm">CSVから取込</button>
        </div>
      </div>`
  },
  "skeleton": {
    id: "FR-035", tag: "<sgt-skeleton>", name: "スケルトン", priority: "could",
    desc: "ロード中のレイアウトを保ったまま視覚的にフィードバック。",
    accept: "受入: prefers-reduced-motion 設定時はアニメーションを停止する。",
    body: `
      <div class="grid-2">
        <div class="col">
          <div class="skel w-40"></div>
          <div class="skel"></div>
          <div class="skel w-60"></div>
          <div class="skel h-32"></div>
        </div>
        <div class="col">
          <div class="skel h-32"></div>
          <div class="skel h-32"></div>
          <div class="skel h-32"></div>
          <div class="skel h-32"></div>
        </div>
      </div>`
  },
  "a4": {
    id: "FR-009 / FR-010", tag: "<sgt-a4-print-layout> / <sgt-quote-preview>", name: "A4印刷レイアウト・見積書プレビュー", priority: "must",
    desc: "画面表示と印刷表示を切替。改ページ補助、ページ番号、印刷時非表示領域。",
    accept: "受入: 主要情報がA4縦1ページに収まる。20行を超えると自動改ページ。",
    body: `
      <div class="grid-2">
        <div>
          <div class="variant__label">プレビュー（画面表示）</div>
          <div class="a4 a4__crop">
            <div class="a4__seal">承認印</div>
            <h3 class="a4__title">御見積書</h3>
            <div class="a4__meta">
              <div class="a4__block"><h5>宛先</h5><div>株式会社 サンプル商事 御中</div><div class="muted small">〒100-0001 東京都千代田区千代田1-1</div></div>
              <div class="a4__block"><h5>発行元 / 発行日</h5><div>合同会社 シゴト</div><div class="muted small">2026-04-26 / 有効期限 2026-05-26</div></div>
            </div>
            <div class="a4__block" style="margin-bottom: 8px;"><h5>件名</h5><div>業務UIライブラリ導入支援 一式</div></div>
            <table class="table" style="font-size: 9px;">
              <thead><tr><th>品目</th><th class="num">数量</th><th class="num">単価</th><th class="num">金額</th></tr></thead>
              <tbody>
                <tr><td>導入支援</td><td class="num">2</td><td class="num">1,200,000</td><td class="num">2,400,000</td></tr>
                <tr><td>設計レビュー</td><td class="num">5</td><td class="num">15,000</td><td class="num">75,000</td></tr>
                <tr><td>初期セットアップ</td><td class="num">3</td><td class="num">98,000</td><td class="num">294,000</td></tr>
              </tbody>
            </table>
            <div class="a4__total"><span>合計（税込）</span><span>¥3,045,900</span></div>
          </div>
        </div>
        <div>
          <div class="variant__label">印刷時の振る舞い</div>
          <div class="col" style="gap: 12px;">
            <div class="anno">@page A4 portrait / margin 15mm</div>
            <div class="anno">data-print-only / data-screen-only で領域切替</div>
            <div class="anno">明細20行までは1ページ、超過分は自動改ページ</div>
            <div class="anno">ヘッダ/フッタは page-break-inside: avoid</div>
            <div class="anno">ページ番号: 1 / 1（slotで上書き可）</div>
            <button class="btn btn--ghost btn--sm" style="align-self: flex-start;">⌘P 印刷プレビュー</button>
          </div>
        </div>
      </div>`
  },
  "csv-import": {
    id: "FR-011", tag: "<sgt-csv-import>", name: "CSV取込", priority: "should",
    desc: "ヘッダー検証、文字コード推定、不正行のプレビューと再編集。",
    accept: "受入: 必須列が欠落する場合 import を中断し、`sgt:csv-error` で `missing-headers` を発火。",
    body: `
      <div class="grid-2">
        <div class="csv-drop"><strong>ファイルをここにドロップ</strong>.csv / UTF-8・Shift_JIS 自動判定</div>
        <div>
          <div class="variant__label">ヘッダー検証</div>
          <table class="table small">
            <thead><tr><th>列</th><th>マップ先</th><th>状態</th></tr></thead>
            <tbody>
              <tr><td>品目</td><td class="mono">item.name</td><td><span class="badge badge--approved">OK</span></td></tr>
              <tr><td>数量</td><td class="mono">item.qty</td><td><span class="badge badge--approved">OK</span></td></tr>
              <tr><td>単価</td><td class="mono">item.unitPrice</td><td><span class="badge badge--approved">OK</span></td></tr>
              <tr><td>備考</td><td class="muted mono">— 未マッピング</td><td><span class="badge badge--review">スキップ</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>`
  },
  "csv-export": {
    id: "FR-012", tag: "<sgt-csv-export>", name: "CSV出力", priority: "should",
    desc: "文字コード（UTF-8 BOM / Shift_JIS）切替、行頭の `=, +, -, @` を安全エスケープ。",
    accept: "受入: 出力時に Formula injection 対象文字列の先頭へ `'` を自動付与（任意で無効化可能）。",
    body: `
      <div class="row" style="margin-bottom: 12px;">
        <span class="anno">エンコーディング: UTF-8 BOM</span>
        <span class="anno">区切り: , / TAB</span>
        <span class="anno">改行: CRLF</span>
        <span class="anno">Formula injection 自動エスケープ</span>
      </div>
      <pre class="accept">出力例:
item,qty,unitPrice,amount
"業務UI導入支援",2,1200000,2400000
"設計レビュー",5,15000,75000</pre>`
  },
  "confirm": {
    id: "FR-014", tag: "<sgt-confirmation-panel>", name: "確認パネル", priority: "should",
    desc: "登録前の最終確認・差分表示。前回値と新値を並べて、変更行のみハイライト。",
    accept: "受入: 変更ありの行は `data-changed` を付与し、件数を `sgt:diff-count` で公開。",
    body: `
      <div class="confirm">
        <div class="confirm__row"><span class="lbl">field</span><span>変更前</span><span>変更後</span></div>
        <div class="confirm__row"><span class="lbl">取引先</span><span>株式会社 サンプル商事</span><span>株式会社 サンプル商事</span></div>
        <div class="confirm__row changed"><span class="lbl">合計金額</span><span class="old">¥2,750,000</span><span class="new">¥3,045,900</span></div>
        <div class="confirm__row changed"><span class="lbl">有効期限</span><span class="old">2026-05-10</span><span class="new">2026-05-26</span></div>
        <div class="confirm__row"><span class="lbl">担当</span><span>佐藤 花子</span><span>佐藤 花子</span></div>
      </div>`
  },
  "timeline": {
    id: "FR-015", tag: "<sgt-approval-timeline>", name: "承認タイムライン", priority: "could",
    desc: "起票・確認・承認・差戻しの履歴を時系列で。コメント付き。",
    accept: "受入: `current` ステップは1件のみ。完了済みは `done`、未到達は無装飾。",
    body: `
      <ol class="timeline">
        <li class="timeline__step timeline__step--done"><div><span class="timeline__who">佐藤 花子</span> が起票しました</div><div class="timeline__when">2026-04-24 10:12</div></li>
        <li class="timeline__step timeline__step--done"><div><span class="timeline__who">山田 太郎</span> が確認しました</div><div class="timeline__when">2026-04-25 09:48</div><div class="timeline__note">「単価の根拠を備考欄に追記してください」</div></li>
        <li class="timeline__step timeline__step--current"><div><span class="timeline__who">部長 承認</span> 承認待ち</div><div class="timeline__when">— 2026-04-27 まで</div></li>
        <li class="timeline__step"><div class="muted">経理 確認</div></li>
      </ol>`
  },
  "master": {
    id: "FR-016", tag: "<sgt-master-select>", name: "マスタ選択", priority: "could",
    desc: "取引先・商品・部署などの参照選択。コード検索・かな検索・最近使った候補。",
    accept: "受入: コード（C-00321）でも名称でも検索可。最近使った候補は外部注入で扱う。",
    body: `
      <div style="max-width: 420px;">
        <div class="combo">
          <div class="input" style="border:0; padding: 4px 6px;"><span class="input__prefix mono">⌕</span><span class="input__value">サンプル</span><span class="input__caret"></span></div>
          <ul class="combo__results">
            <li class="sel"><span>株式会社 サンプル商事</span><span class="combo__code">C-00321</span></li>
            <li><span>サンプル工業 株式会社</span><span class="combo__code">C-00498</span></li>
            <li><span>サンプルテック 合同会社</span><span class="combo__code">C-01102</span></li>
          </ul>
        </div>
        <div class="row" style="margin-top: 8px;">
          <span class="anno"><kbd>↑</kbd><kbd>↓</kbd> 選択</span>
          <span class="anno"><kbd>Enter</kbd> 確定</span>
          <span class="anno"><kbd>Esc</kbd> 閉じる</span>
        </div>
      </div>`
  }
};


/* ================================================================
   v3 additions (CARDS)
   ================================================================ */

/* Shigoto UI — v3 additions: buttons, cards, color/typography/spacing tokens, screen templates */
const CARDS_V3 = {
  /* ============ 設計の土台 ============ */
  "color-tokens": {
    id: "F-COLOR", tag: "@shigoto-ui/tokens / color", name: "色設定", priority: "must",
    desc: "業務系で必要なのは「意味の色」。アクセント・danger・warn・ok・info・muted を中心に、各色 soft 派生を1段持つ。グレーは10段階、業務帳票が読みやすいコントラストに調整。",
    accept: "受入: 全色は WCAG AA を白背景で満たす。`--sgt-color-*` 変数で全て上書き可能。",
    body: `
      <h4 class="sub">意味の色（Semantic）</h4>
      <div class="color-row">
        <div class="color-chip"><span class="sw" style="background: var(--accent);"></span><div class="meta"><strong>primary</strong><span class="mono">#1f3a8a</span></div></div>
        <div class="color-chip"><span class="sw" style="background: var(--accent-soft);"></span><div class="meta"><strong>primary-soft</strong><span class="mono">#dbeafe</span></div></div>
        <div class="color-chip"><span class="sw" style="background: var(--danger);"></span><div class="meta"><strong>danger</strong><span class="mono">#b91c1c</span></div></div>
        <div class="color-chip"><span class="sw" style="background: var(--warn);"></span><div class="meta"><strong>warn</strong><span class="mono">#b45309</span></div></div>
        <div class="color-chip"><span class="sw" style="background: var(--ok);"></span><div class="meta"><strong>ok</strong><span class="mono">#166534</span></div></div>
        <div class="color-chip"><span class="sw" style="background: var(--info);"></span><div class="meta"><strong>info</strong><span class="mono">#0c4a6e</span></div></div>
      </div>
      <h4 class="sub" style="margin-top: 16px;">グレースケール（10段）</h4>
      <div class="grayscale">
        <span style="background: #f8fafc;"></span>
        <span style="background: #f1f5f9;"></span>
        <span style="background: #e2e8f0;"></span>
        <span style="background: #cbd5e1;"></span>
        <span style="background: #94a3b8;"></span>
        <span style="background: #64748b;"></span>
        <span style="background: #475569;"></span>
        <span style="background: #334155;"></span>
        <span style="background: #1e293b;"></span>
        <span style="background: #0f172a;"></span>
      </div>`
  },
  "typography": {
    id: "F-TYPE", tag: "@shigoto-ui/tokens / type", name: "文字設計", priority: "must",
    desc: "和文ベース。本文 14px / 行高 1.7。等幅は数値・コードに限定使用。見出しは weight 600 で抑制し、業務系の落ち着きを出す。",
    accept: "受入: 行高は 1.6〜1.8。最小 12px（補助）/ 14px（本文）/ 16px（見出し）/ 24px（ページ見出し）。",
    body: `
      <table class="type-table">
        <tbody>
          <tr><td class="lbl">page-title / 24px / w600</td><td><span style="font-size: 24px; font-weight: 600;">見積書を作成する</span></td></tr>
          <tr><td class="lbl">section / 18px / w600</td><td><span style="font-size: 18px; font-weight: 600;">取引先・基本情報</span></td></tr>
          <tr><td class="lbl">label / 13px / w500</td><td><span style="font-size: 13px; font-weight: 500;">郵便番号</span></td></tr>
          <tr><td class="lbl">body / 14px / w400</td><td><span style="font-size: 14px;">業務UIライブラリ導入支援 一式（合計 ¥3,045,900）</span></td></tr>
          <tr><td class="lbl">caption / 12px / w400</td><td><span style="font-size: 12px; color: var(--muted);">最終更新 2026-04-26 10:12 by 佐藤 花子</span></td></tr>
          <tr><td class="lbl">mono / 13px</td><td><span class="mono" style="font-size: 13px;">¥3,045,900 / Q-2026-0421 / 100-0001</span></td></tr>
        </tbody>
      </table>`
  },
  "spacing": {
    id: "F-SPACE", tag: "@shigoto-ui/tokens / space", name: "余白設計", priority: "must",
    desc: "8px ベース、4の倍数。ラベルと入力の間は 4px、フィールド間は 16px、セクション間は 32px。罫線で区切るときはむしろ余白を狭める。",
    accept: "受入: 余白は --sgt-space-1..6 のみで構築でき、任意値を使わない。",
    body: `
      <div class="space-row">
        <div class="space-spec"><span class="bar" style="width:4px;"></span><span class="mono">--space-1 (4px)</span><span class="muted">label と要素の隙間</span></div>
        <div class="space-spec"><span class="bar" style="width:8px;"></span><span class="mono">--space-2 (8px)</span><span class="muted">アイコン + ラベル</span></div>
        <div class="space-spec"><span class="bar" style="width:16px;"></span><span class="mono">--space-3 (16px)</span><span class="muted">フィールド間</span></div>
        <div class="space-spec"><span class="bar" style="width:24px;"></span><span class="mono">--space-4 (24px)</span><span class="muted">カード内余白</span></div>
        <div class="space-spec"><span class="bar" style="width:32px;"></span><span class="mono">--space-5 (32px)</span><span class="muted">セクション間</span></div>
        <div class="space-spec"><span class="bar" style="width:48px;"></span><span class="mono">--space-6 (48px)</span><span class="muted">ページ上下</span></div>
      </div>`
  },

  /* ============ 基本画面部品 ============ */
  "button": {
    id: "C-BTN", tag: "<sgt-button>", name: "ボタン", priority: "must",
    desc: "primary（強調アクション・1画面に1つまで）/ secondary（同列の代替）/ ghost（ツールバー）/ danger（破壊的）の4種。サイズは sm / md / lg。",
    accept: "受入: `disabled` と `aria-busy` を区別。`loading` 中はアイコン回転＋ラベル変化、クリック無効。",
    body: `
      <h4 class="sub">種別 × 状態</h4>
      <table class="btn-grid">
        <thead><tr><th></th><th>default</th><th>hover</th><th>focus</th><th>disabled</th><th>loading</th></tr></thead>
        <tbody>
          <tr><th class="lbl">primary</th>
            <td><button class="btn btn--primary">発行する</button></td>
            <td><button class="btn btn--primary btn--hover">発行する</button></td>
            <td><button class="btn btn--primary btn--focus">発行する</button></td>
            <td><button class="btn btn--primary" disabled>発行する</button></td>
            <td><button class="btn btn--primary btn--loading"><span class="spinner"></span>送信中…</button></td>
          </tr>
          <tr><th class="lbl">secondary</th>
            <td><button class="btn">下書き保存</button></td>
            <td><button class="btn btn--hover">下書き保存</button></td>
            <td><button class="btn btn--focus">下書き保存</button></td>
            <td><button class="btn" disabled>下書き保存</button></td>
            <td><button class="btn btn--loading"><span class="spinner"></span>保存中…</button></td>
          </tr>
          <tr><th class="lbl">ghost</th>
            <td><button class="btn btn--ghost">キャンセル</button></td>
            <td><button class="btn btn--ghost btn--hover">キャンセル</button></td>
            <td><button class="btn btn--ghost btn--focus">キャンセル</button></td>
            <td><button class="btn btn--ghost" disabled>キャンセル</button></td>
            <td><button class="btn btn--ghost btn--loading"><span class="spinner"></span>キャンセル</button></td>
          </tr>
          <tr><th class="lbl">danger</th>
            <td><button class="btn btn--danger">削除する</button></td>
            <td><button class="btn btn--danger btn--hover">削除する</button></td>
            <td><button class="btn btn--danger btn--focus">削除する</button></td>
            <td><button class="btn btn--danger" disabled>削除する</button></td>
            <td><button class="btn btn--danger btn--loading"><span class="spinner"></span>削除中…</button></td>
          </tr>
        </tbody>
      </table>
      <h4 class="sub" style="margin-top: 16px;">サイズ</h4>
      <div class="row"><button class="btn btn--primary btn--sm">sm</button><button class="btn btn--primary">md</button><button class="btn btn--primary btn--lg">lg</button></div>
      <h4 class="sub" style="margin-top: 16px;">アイコン + ラベル</h4>
      <div class="row">
        <button class="btn btn--primary"><span class="mono">＋</span> 新規作成</button>
        <button class="btn"><span class="mono">⤓</span> CSV取込</button>
        <button class="btn btn--ghost"><span class="mono">⤒</span> CSV出力</button>
        <button class="btn btn--ghost"><span class="mono">🖨</span> 印刷</button>
        <button class="btn btn--danger"><span class="mono">×</span> 削除</button>
      </div>`
  },
  "card": {
    id: "C-CARD", tag: "<sgt-card>", name: "カード", priority: "should",
    desc: "情報のまとまり。header / body / footer の3スロット。罫線 1px、角丸は 4px、影は使わない（業務系はフラット）。",
    accept: "受入: header / footer が空のとき自動的に潰れる。`bordered=\"false\"` で罫線を消せる。",
    body: `
      <div class="grid-2">
        <div class="ex-card">
          <div class="ex-card__head"><strong>Q-2026-0421</strong><span class="badge badge--pending">承認待ち</span></div>
          <div class="ex-card__body">
            <div class="ex-card__row"><span class="muted small">取引先</span><span>株式会社 サンプル商事</span></div>
            <div class="ex-card__row"><span class="muted small">合計</span><span class="mono">¥3,045,900</span></div>
            <div class="ex-card__row"><span class="muted small">発行日</span><span class="mono">2026-04-26</span></div>
          </div>
          <div class="ex-card__foot"><a href="#" class="muted small">詳細を開く →</a></div>
        </div>
        <div class="ex-card ex-card--strong">
          <div class="ex-card__head"><strong>今月の見積件数</strong></div>
          <div class="ex-card__body" style="padding: 24px 20px;">
            <div style="font-size: 32px; font-weight: 600; line-height: 1;">42<span class="muted" style="font-size: 13px; margin-left: 6px;">件</span></div>
            <div class="muted small" style="margin-top: 6px;">前月比 +8 ／ 承認率 78%</div>
          </div>
        </div>
      </div>`
  },

  /* ============ 業務向け部品の追加 ============ */
  "fiscal-year": {
    id: "B-FY", tag: "<sgt-fiscal-year-input>", name: "年度入力", priority: "should",
    desc: "西暦・和暦・FY を切替。年度始まりは 4月 / 1月 / 任意月の3パターンに対応。会計年度の選択UIで頻出。",
    accept: "受入: 「FY2026」を選ぶと内部値は `{ start: '2026-04-01', end: '2027-03-31' }` を発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">FY 切替</div>
          <div class="variant__stage"><div class="row">
            <button class="btn btn--ghost btn--sm">FY2024</button>
            <button class="btn btn--ghost btn--sm">FY2025</button>
            <button class="btn btn--primary btn--sm">FY2026</button>
            <button class="btn btn--ghost btn--sm">FY2027</button>
          </div>
          <span class="anno" style="margin-top: 8px;">2026-04-01 〜 2027-03-31（令和8年度）</span>
          </div></div>
        <div class="variant"><div class="variant__label">和暦 / 西暦</div>
          <div class="variant__stage"><div class="row">
            <button class="btn btn--ghost btn--sm">西暦</button>
            <button class="btn btn--primary btn--sm">和暦</button>
          </div>
          <div class="field" style="margin-top: 8px;">
            <label class="field__label">年</label>
            <div class="input"><span class="input__prefix">令和</span><span class="input__value mono">8</span><span class="input__suffix">年</span></div>
          </div>
          </div></div>
      </div>`
  },
  "history-log": {
    id: "B-HIST", tag: "<sgt-history-log>", name: "操作履歴", priority: "should",
    desc: "誰が・いつ・何を変えたかを時系列で表示。差分（before → after）の最小表示と、全件展開リンク付き。",
    accept: "受入: 100件超は仮想スクロール。操作種別（create/update/delete/approve）でフィルタ可能。",
    body: `
      <div class="log">
        <div class="log__entry">
          <div class="log__bar"></div>
          <div class="log__body">
            <div class="log__head"><strong>佐藤 花子</strong><span class="badge badge--info">更新</span><span class="muted mono small">2026-04-26 10:12</span></div>
            <div class="log__diff"><span class="lbl">合計金額</span><span class="old">¥2,750,000</span><span class="arrow">→</span><span class="new">¥3,045,900</span></div>
            <div class="log__diff"><span class="lbl">有効期限</span><span class="old">2026-05-10</span><span class="arrow">→</span><span class="new">2026-05-26</span></div>
          </div>
        </div>
        <div class="log__entry">
          <div class="log__bar"></div>
          <div class="log__body">
            <div class="log__head"><strong>山田 太郎</strong><span class="badge badge--review">確認</span><span class="muted mono small">2026-04-25 09:48</span></div>
            <div class="muted small">コメント：「単価の根拠を備考欄に追記してください」</div>
          </div>
        </div>
        <div class="log__entry">
          <div class="log__bar"></div>
          <div class="log__body">
            <div class="log__head"><strong>佐藤 花子</strong><span class="badge badge--approved">作成</span><span class="muted mono small">2026-04-24 10:12</span></div>
            <div class="muted small">Q-2026-0421 を新規作成しました</div>
          </div>
        </div>
        <div style="text-align: center; padding-top: 8px;"><a href="#" class="muted small">すべての履歴（24件）を表示 →</a></div>
      </div>`
  },
  "tax-rate": {
    id: "B-RATE", tag: "<sgt-tax-rate-select>", name: "税率選択", priority: "should",
    desc: "10%（標準）/ 8%（軽減）/ 0%（非課税）/ 内税・外税 を切替。明細行に1つずつ持たせる用途。",
    accept: "受入: 行ごとに税率を変更すると `sgt:tax-change` が発火し、税額サマリ側で再計算される。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">行内（インライン）</div>
          <div class="variant__stage">
            <div class="row" style="font-size: 12px;">
              <span class="rate-pill rate-pill--active">10%</span>
              <span class="rate-pill">8%軽減</span>
              <span class="rate-pill">非課税</span>
              <span class="rate-pill">対象外</span>
            </div>
          </div>
        </div>
        <div class="variant"><div class="variant__label">税込／税抜</div>
          <div class="variant__stage"><div class="col">
            <span class="radio checked"><span class="radio__dot"></span> 外税（税抜＋消費税）</span>
            <span class="radio"><span class="radio__dot"></span> 内税（税込）</span>
            <span class="radio"><span class="radio__dot"></span> 非課税</span>
          </div></div>
        </div>
      </div>`
  },

  /* ============ 業務画面テンプレート ============ */
  "tpl-quote": {
    id: "T-QUOTE", tag: "Template / 見積書作成", name: "見積書作成画面", priority: "must",
    desc: "取引先 → 明細 → 税額 → 承認導線 を1画面で。MVP-001 と同等。基本部品の組み合わせ参考。",
    accept: "受入: 必須3項目（取引先・件名・明細1行以上）が埋まると「確認に進む」が活性化。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div class="crumb"><a href="#">ホーム</a><span class="sep">/</span><a href="#">見積一覧</a><span class="sep">/</span><span class="here">Q-2026-0421（新規）</span></div>
          <div class="row">
            <button class="btn btn--ghost btn--sm">下書き保存</button>
            <button class="btn btn--ghost btn--sm">プレビュー</button>
            <button class="btn btn--primary btn--sm">確認に進む</button>
          </div>
        </div>
        <div class="tpl__cols">
          <div class="tpl__main">
            <div class="tpl__sec"><h4>1. 取引先</h4>
              <div class="input"><span class="input__prefix mono">⌕</span><span class="input__value">株式会社 サンプル商事</span><span class="input__suffix mono">C-00321</span></div>
            </div>
            <div class="tpl__sec"><h4>2. 件名 / 期日</h4>
              <div class="row">
                <div class="input" style="flex:2;"><span class="input__value">業務UIライブラリ導入支援 一式</span></div>
                <div class="input" style="flex:1;"><span class="input__value mono">2026-05-26</span></div>
              </div>
            </div>
            <div class="tpl__sec"><h4>3. 明細</h4>
              <table class="table"><thead><tr><th>品目</th><th class="num">数量</th><th class="num">単価</th><th class="num">金額</th><th></th></tr></thead>
                <tbody>
                  <tr><td>導入支援</td><td class="num">2</td><td class="num">1,200,000</td><td class="num">2,400,000</td><td class="row-del">×</td></tr>
                  <tr><td>設計レビュー</td><td class="num">5</td><td class="num">15,000</td><td class="num">75,000</td><td class="row-del">×</td></tr>
                  <tr><td>初期セットアップ</td><td class="num">3</td><td class="num">98,000</td><td class="num">294,000</td><td class="row-del">×</td></tr>
                </tbody>
              </table>
              <div class="row" style="margin-top: 6px;"><button class="btn btn--ghost btn--sm">＋ 行を追加</button><button class="btn btn--ghost btn--sm">CSV取込</button></div>
            </div>
          </div>
          <aside class="tpl__side">
            <div class="tpl__sec"><h4>税額</h4>
              <div class="tax">
                <div class="tax__row"><span>小計</span><span class="num">¥2,769,000</span></div>
                <div class="tax__row"><span>消費税 10%</span><span class="num">¥276,900</span></div>
                <div class="tax__row total"><span>合計</span><span class="num">¥3,045,900</span></div>
              </div>
            </div>
            <div class="tpl__sec"><h4>承認</h4>
              <ol class="timeline timeline--compact">
                <li class="timeline__step timeline__step--done"><div><span class="timeline__who">佐藤</span> 起票</div></li>
                <li class="timeline__step timeline__step--current"><div><span class="timeline__who">山田</span> 確認中</div></li>
                <li class="timeline__step"><div class="muted">部長承認</div></li>
              </ol>
            </div>
          </aside>
        </div>
      </div>`
  },
  "tpl-invoice": {
    id: "T-INV", tag: "Template / 請求書作成", name: "請求書作成画面", priority: "must",
    desc: "見積書から請求書化、または独立して作成。インボイス番号・支払期日・振込先口座を必須項目に。",
    accept: "受入: 「見積から取込」を押すと取引先・明細・税額が引き継がれ、見積番号が `relatedQuoteId` に保持される。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div class="crumb"><a href="#">ホーム</a><span class="sep">/</span><a href="#">請求一覧</a><span class="sep">/</span><span class="here">INV-2026-0512（新規）</span></div>
          <div class="row">
            <button class="btn btn--ghost btn--sm">見積から取込</button>
            <button class="btn btn--primary btn--sm">発行する</button>
          </div>
        </div>
        <div class="tpl__cols">
          <div class="tpl__main">
            <div class="tpl__sec"><h4>請求先</h4>
              <div class="input"><span class="input__value">株式会社 サンプル商事</span><span class="input__suffix mono">C-00321</span></div></div>
            <div class="tpl__sec"><h4>支払条件</h4>
              <div class="row">
                <div class="input" style="flex:1;"><span class="input__value">翌月末払い</span><span class="input__suffix mono">▾</span></div>
                <div class="input" style="flex:1;"><span class="input__value mono">2026-06-30</span></div>
              </div></div>
            <div class="tpl__sec"><h4>振込先</h4>
              <div class="row">
                <div class="input" style="flex:1;"><span class="input__value mono">0001 みずほ</span></div>
                <div class="input" style="flex:1;"><span class="input__value mono">001 東京営業部</span></div>
                <div class="input" style="flex:1;"><span class="input__value">普通 1234567</span></div>
              </div></div>
            <div class="tpl__sec"><h4>明細</h4>
              <table class="table"><thead><tr><th>品目</th><th class="num">金額</th><th>税率</th></tr></thead>
                <tbody>
                  <tr><td>導入支援</td><td class="num">2,400,000</td><td><span class="rate-pill rate-pill--active">10%</span></td></tr>
                  <tr><td>設計レビュー</td><td class="num">75,000</td><td><span class="rate-pill rate-pill--active">10%</span></td></tr>
                  <tr><td>関連書籍（軽減）</td><td class="num">12,000</td><td><span class="rate-pill rate-pill--reduced">8%</span></td></tr>
                </tbody></table></div>
          </div>
          <aside class="tpl__side">
            <div class="tpl__sec"><h4>インボイス</h4>
              <div class="field"><label class="field__label">登録番号</label>
                <div class="input"><span class="input__prefix mono">T</span><span class="input__value mono">1234567890123</span></div></div>
            </div>
            <div class="tpl__sec"><h4>合計</h4>
              <div class="tax">
                <div class="tax__row"><span>10%対象</span><span class="num">¥2,475,000</span></div>
                <div class="tax__row"><span>8%対象</span><span class="num">¥12,000</span></div>
                <div class="tax__row total"><span>合計</span><span class="num">¥2,734,460</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>`
  },
  "tpl-customer": {
    id: "T-CUS", tag: "Template / 顧客マスタ", name: "顧客マスタ画面", priority: "should",
    desc: "一覧 + 詳細パネル の2ペイン構成。検索・絞込・新規登録・削除が同居。CSV取込との連携を想定。",
    accept: "受入: 一覧から行を選ぶと右ペインに詳細表示。新規ボタンで右ペインが「新規モード」になる。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div class="search" style="flex: 1; max-width: 360px;"><span class="muted">⌕</span><input placeholder="顧客名 / コードで検索" /></div>
          <div class="row">
            <button class="btn btn--ghost btn--sm">CSV取込</button>
            <button class="btn btn--primary btn--sm">＋ 新規顧客</button>
          </div>
        </div>
        <div class="tpl__split">
          <table class="table">
            <thead><tr><th>コード</th><th>顧客名</th><th>担当</th><th class="num">取引額</th></tr></thead>
            <tbody>
              <tr class="sel"><td class="mono">C-00321</td><td>株式会社 サンプル商事</td><td>佐藤</td><td class="num">¥12,400,000</td></tr>
              <tr><td class="mono">C-00498</td><td>サンプル工業 株式会社</td><td>山田</td><td class="num">¥3,200,000</td></tr>
              <tr><td class="mono">C-00712</td><td>合同会社 シゴト</td><td>佐藤</td><td class="num">¥780,000</td></tr>
              <tr><td class="mono">C-01102</td><td>サンプルテック 合同会社</td><td>鈴木</td><td class="num">¥5,420,000</td></tr>
            </tbody>
          </table>
          <aside class="tpl__detail">
            <h4>株式会社 サンプル商事 <span class="mono muted small">C-00321</span></h4>
            <div class="kv"><span class="muted small">郵便番号</span><span class="mono">100-0001</span></div>
            <div class="kv"><span class="muted small">住所</span><span>東京都千代田区千代田 1-1</span></div>
            <div class="kv"><span class="muted small">代表電話</span><span class="mono">03-1234-5678</span></div>
            <div class="kv"><span class="muted small">担当</span><span>佐藤 花子</span></div>
            <div class="kv"><span class="muted small">インボイス</span><span class="mono">T1234567890123</span></div>
            <div class="row" style="margin-top: 12px;">
              <button class="btn btn--ghost btn--sm">編集</button>
              <button class="btn btn--ghost btn--sm">取引履歴</button>
              <button class="btn btn--danger btn--sm" style="margin-left: auto;">削除</button>
            </div>
          </aside>
        </div>
      </div>`
  },
  "tpl-product": {
    id: "T-PROD", tag: "Template / 商品マスタ", name: "商品マスタ画面", priority: "should",
    desc: "品目・単価・税率・単位の管理。明細テーブルで参照される。カテゴリ分類とアーカイブ運用を想定。",
    accept: "受入: アーカイブ品は一覧から既定で除外。フィルタで再表示できる。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div class="search" style="flex: 1; max-width: 360px;"><span class="muted">⌕</span><input placeholder="品目名 / コード / カテゴリ" /></div>
          <div class="row">
            <span class="badge badge--info">カテゴリ: サービス <span class="muted">×</span></span>
            <span class="badge">アーカイブ含む <span class="muted">×</span></span>
            <button class="btn btn--primary btn--sm">＋ 新規商品</button>
          </div>
        </div>
        <table class="table">
          <thead><tr><th>コード</th><th>品名</th><th>カテゴリ</th><th class="num">単価</th><th>単位</th><th>税率</th><th>状態</th></tr></thead>
          <tbody>
            <tr><td class="mono">P-1001</td><td>導入支援</td><td>サービス</td><td class="num">1,200,000</td><td>人月</td><td><span class="rate-pill rate-pill--active">10%</span></td><td><span class="badge badge--approved">公開</span></td></tr>
            <tr><td class="mono">P-1002</td><td>設計レビュー</td><td>サービス</td><td class="num">15,000</td><td>時間</td><td><span class="rate-pill rate-pill--active">10%</span></td><td><span class="badge badge--approved">公開</span></td></tr>
            <tr><td class="mono">P-1003</td><td>初期セットアップ</td><td>サービス</td><td class="num">98,000</td><td>式</td><td><span class="rate-pill rate-pill--active">10%</span></td><td><span class="badge badge--approved">公開</span></td></tr>
            <tr class="muted"><td class="mono">P-2001</td><td>関連書籍</td><td>物販</td><td class="num">3,000</td><td>冊</td><td><span class="rate-pill rate-pill--reduced">8%</span></td><td><span class="badge badge--cancel">アーカイブ</span></td></tr>
          </tbody>
        </table>
      </div>`
  },
  "tpl-approval": {
    id: "T-APP", tag: "Template / 申請依頼", name: "申請依頼画面", priority: "should",
    desc: "申請者から承認者へ依頼するときの最小フォーム。対象業務（見積/請求/出張/購買…）と承認経路を選ぶ。",
    accept: "受入: 経路は組織マスタから引き当てるが、画面側では `route` 属性で外部注入で扱う。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div class="crumb"><a href="#">ホーム</a><span class="sep">/</span><a href="#">申請</a><span class="sep">/</span><span class="here">新規申請</span></div>
        </div>
        <div class="tpl__cols">
          <div class="tpl__main">
            <div class="tpl__sec"><h4>1. 申請種別</h4>
              <div class="row">
                <span class="radio checked"><span class="radio__dot"></span> 見積承認</span>
                <span class="radio"><span class="radio__dot"></span> 請求承認</span>
                <span class="radio"><span class="radio__dot"></span> 購買稟議</span>
                <span class="radio"><span class="radio__dot"></span> 出張</span>
              </div></div>
            <div class="tpl__sec"><h4>2. 対象</h4>
              <div class="input"><span class="input__prefix mono">⌕</span><span class="input__value">Q-2026-0421（株式会社 サンプル商事 / ¥3,045,900）</span></div></div>
            <div class="tpl__sec"><h4>3. 申請理由</h4>
              <div class="textarea"><span class="input__value">本件は新規顧客の初回案件のため、価格の妥当性を含めご確認をお願いします。</span></div></div>
            <div class="tpl__sec"><h4>4. 添付</h4>
              <div class="file-row"><span class="file-row__name">root-cause.pdf</span><span class="file-row__size">1.2MB</span><span class="file-row__bar"><span style="width: 100%;"></span></span><span class="badge badge--approved">添付済</span></div></div>
          </div>
          <aside class="tpl__side">
            <div class="tpl__sec"><h4>承認経路</h4>
              <ol class="timeline timeline--compact">
                <li class="timeline__step timeline__step--current"><div><span class="timeline__who">山田 太郎</span> 課長</div></li>
                <li class="timeline__step"><div class="muted">部長 承認</div></li>
                <li class="timeline__step"><div class="muted">経理 確認</div></li>
              </ol>
            </div>
            <div class="tpl__sec">
              <button class="btn btn--primary" style="width: 100%;">承認を依頼する</button>
              <button class="btn btn--ghost btn--sm" style="width: 100%; margin-top: 8px;">下書き保存</button>
            </div>
          </aside>
        </div>
      </div>`
  },
  "tpl-csv-confirm": {
    id: "T-CSV", tag: "Template / CSV取込確認", name: "CSV取込確認画面", priority: "should",
    desc: "CSVを取込む前のプレビュー画面。エラー行・警告行・成功行の件数を上部に固定し、行ごとに修正できる。",
    accept: "受入: エラー行が存在する場合、`取込実行` ボタンは disabled。`不正行をスキップして取込` を別途用意。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div class="row" style="gap: 16px;">
            <span><strong style="font-size: 16px;">customers-2026-04.csv</strong> <span class="muted small">UTF-8 / 1,240 行</span></span>
            <span class="badge badge--approved">成功 1,210</span>
            <span class="badge badge--warn">警告 24</span>
            <span class="badge badge--rejected">エラー 6</span>
          </div>
          <div class="row">
            <button class="btn btn--ghost btn--sm">不正行をスキップして取込</button>
            <button class="btn btn--primary btn--sm" disabled>取込実行</button>
          </div>
        </div>
        <table class="table">
          <thead><tr><th>#</th><th>状態</th><th>顧客名</th><th>郵便番号</th><th>電話</th><th>登録番号</th><th>理由</th></tr></thead>
          <tbody>
            <tr><td>1</td><td><span class="badge badge--approved">OK</span></td><td>株式会社 サンプル商事</td><td class="mono">100-0001</td><td class="mono">03-1234-5678</td><td class="mono">T1234567890123</td><td class="muted">—</td></tr>
            <tr class="warn-row"><td>2</td><td><span class="badge badge--warn">警告</span></td><td>サンプル工業 株式会社</td><td class="mono">1500001</td><td class="mono">090-1234-5678</td><td class="muted mono">—</td><td class="muted small">郵便番号にハイフンがありません（自動補正）</td></tr>
            <tr class="err-row"><td>3</td><td><span class="badge badge--rejected">エラー</span></td><td class="muted">（空欄）</td><td class="mono">100-0002</td><td class="mono">03-9999-0000</td><td class="mono">T9999999999999</td><td class="danger small">顧客名が必須です</td></tr>
            <tr class="err-row"><td>4</td><td><span class="badge badge--rejected">エラー</span></td><td>合同会社 シゴト</td><td class="mono">1234</td><td class="mono">abc</td><td class="mono">T123</td><td class="danger small">郵便番号 / 電話 / 登録番号の形式不正</td></tr>
          </tbody>
        </table>
      </div>`
  },
  "tpl-search": {
    id: "T-SRCH", tag: "Template / 検索結果", name: "検索結果画面", priority: "should",
    desc: "横断検索の結果ページ。グループ化（見積/請求/顧客/商品）し、件数バッジと絞込チップを上部に置く。",
    accept: "受入: グループの折りたたみ状態を URL クエリに保持し、リロードしても再現する。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div class="search" style="flex: 1; max-width: 480px;"><span class="muted">⌕</span><input value="サンプル" /></div>
          <span class="muted small">全 28 件</span>
        </div>
        <div class="row" style="margin: 0 4px 12px;">
          <span class="badge badge--info">すべて 28</span>
          <span class="badge">見積 12</span>
          <span class="badge">請求 9</span>
          <span class="badge">顧客 4</span>
          <span class="badge">商品 3</span>
        </div>
        <div class="search-group">
          <h5>見積（12）</h5>
          <ul class="search-list">
            <li><span class="mono small">Q-2026-0421</span><span>株式会社 <mark>サンプル</mark>商事</span><span class="num mono">¥3,045,900</span><span class="badge badge--pending">承認待ち</span></li>
            <li><span class="mono small">Q-2026-0418</span><span><mark>サンプル</mark>テック 合同会社</span><span class="num mono">¥1,540,000</span><span class="badge badge--rejected">差戻し</span></li>
            <li><span class="mono small">Q-2026-0410</span><span><mark>サンプル</mark>工業 株式会社</span><span class="num mono">¥220,000</span><span class="badge badge--approved">承認済</span></li>
          </ul>
        </div>
        <div class="search-group">
          <h5>顧客（4）</h5>
          <ul class="search-list">
            <li><span class="mono small">C-00321</span><span>株式会社 <mark>サンプル</mark>商事</span><span class="muted small">担当 佐藤</span></li>
            <li><span class="mono small">C-00498</span><span><mark>サンプル</mark>工業 株式会社</span><span class="muted small">担当 山田</span></li>
          </ul>
        </div>
      </div>`
  },
  "tpl-detail": {
    id: "T-DET", tag: "Template / 管理詳細", name: "管理詳細画面", priority: "should",
    desc: "見積・請求・申請などの詳細閲覧画面。タブで「概要 / 明細 / 履歴 / 添付」を切替。アクションは右上に固定。",
    accept: "受入: ステータスにより右上のアクションが変化する（下書き→発行 / 承認待ち→承認・差戻 / 承認済→PDF出力）。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <div>
            <div class="crumb"><a href="#">ホーム</a><span class="sep">/</span><a href="#">見積一覧</a><span class="sep">/</span><span class="here">Q-2026-0421</span></div>
            <h3 style="margin: 4px 0 0;">業務UIライブラリ導入支援 一式</h3>
            <div class="row" style="margin-top: 4px; gap: 8px;">
              <span class="mono muted small">Q-2026-0421</span>
              <span class="badge badge--pending">承認待ち</span>
              <span class="muted small">作成 2026-04-24 10:12 by 佐藤 花子</span>
            </div>
          </div>
          <div class="row">
            <button class="btn btn--ghost btn--sm">差戻し</button>
            <button class="btn btn--primary btn--sm">承認する</button>
          </div>
        </div>
        <div class="tabs__bar"><button class="active">概要</button><button>明細 <span class="badge badge--info">3</span></button><button>履歴</button><button>添付 <span class="badge badge--info">2</span></button></div>
        <div class="tpl__cols" style="margin-top: 16px;">
          <div class="tpl__main">
            <div class="grid-2">
              <div class="kv"><span class="muted small">取引先</span><span>株式会社 サンプル商事</span></div>
              <div class="kv"><span class="muted small">担当</span><span>佐藤 花子</span></div>
              <div class="kv"><span class="muted small">発行日</span><span class="mono">2026-04-26</span></div>
              <div class="kv"><span class="muted small">有効期限</span><span class="mono">2026-05-26</span></div>
              <div class="kv"><span class="muted small">支払条件</span><span>翌月末払い</span></div>
              <div class="kv"><span class="muted small">合計</span><span class="mono">¥3,045,900</span></div>
            </div>
          </div>
          <aside class="tpl__side">
            <div class="tpl__sec"><h4>承認</h4>
              <ol class="timeline timeline--compact">
                <li class="timeline__step timeline__step--done"><div><span class="timeline__who">佐藤</span> 起票</div></li>
                <li class="timeline__step timeline__step--current"><div><span class="timeline__who">山田</span> 確認中</div></li>
                <li class="timeline__step"><div class="muted">部長承認</div></li>
              </ol>
            </div>
          </aside>
        </div>
      </div>`
  },
  "tpl-print": {
    id: "T-PRINT", tag: "Template / 印刷用帳票", name: "印刷用帳票画面", priority: "should",
    desc: "画面表示と印刷出力を1ファイルで両立。`@media print` で操作系を隠し、A4縦に1ページで収める。",
    accept: "受入: <kbd>Ctrl/⌘ + P</kbd> でプレビュー表示と一致する。明細20行を超えると次ページへ自動改ページする。",
    body: `
      <div class="tpl">
        <div class="tpl__head">
          <span class="muted small">印刷プレビュー / A4縦 / 余白 15mm</span>
          <div class="row">
            <button class="btn btn--ghost btn--sm">${(window.ICON||{}).upload||''}<span>CSVで出力</span></button>
            <button class="btn btn--ghost btn--sm">${(window.ICON||{}).download||''}<span>PDFで保存</span></button>
            <button class="btn btn--primary btn--sm">${(window.ICON||{}).print||''}<span>印刷する</span><kbd style="margin-left:6px;">⌘P</kbd></button>
          </div>
        </div>
        <div style="display: flex; justify-content: center; padding: 24px; background: var(--bg-2); border: 1px solid var(--line);">
          <div class="a4 a4__print-preview">
            <h3 class="a4__title">御見積書</h3>
            <div class="a4__meta">
              <div class="a4__block"><h5>宛先</h5><div>株式会社 サンプル商事 御中</div><div class="muted small">〒100-0001 東京都千代田区千代田1-1</div></div>
              <div class="a4__block"><h5>発行元 / 発行日</h5><div>合同会社 シゴト</div><div class="muted small">2026-04-26 / 有効期限 2026-05-26</div><div class="mono small">登録番号 T1234567890123</div></div>
            </div>
            <div class="a4__block" style="margin-bottom: 8px;"><h5>件名</h5><div>業務UIライブラリ導入支援 一式</div></div>
            <table class="table" style="font-size: 10px;">
              <thead><tr><th>品目</th><th class="num">数量</th><th class="num">単価</th><th class="num">金額</th></tr></thead>
              <tbody>
                <tr><td>導入支援</td><td class="num">2</td><td class="num">1,200,000</td><td class="num">2,400,000</td></tr>
                <tr><td>設計レビュー</td><td class="num">5</td><td class="num">15,000</td><td class="num">75,000</td></tr>
                <tr><td>初期セットアップ</td><td class="num">3</td><td class="num">98,000</td><td class="num">294,000</td></tr>
              </tbody>
            </table>
            <div class="a4__total"><span>合計（税込）</span><span>¥3,045,900</span></div>
            <div class="a4__foot">
              <div class="muted small">備考: 上記金額は税込です。お振込手数料は貴社にてご負担ください。</div>
              <div class="a4__page">1 / 1</div>
            </div>
          </div>
        </div>
      </div>`
  }
};



/* ================================================================
   v4 additions (CARDS)
   ================================================================ */

/* Shigoto UI — v4 expanded cards (icon-replaced, more variants per request) */

const I = window.ICON;

const CARDS_V4 = {
  /* ===== ボタン (拡張) ===== */
  "button": {
    id: "C-BTN", tag: "<sgt-button>", name: "ボタン", priority: "must",
    desc: "primary（強調・1画面1つ）/ secondary（同列）/ ghost（ツールバー）/ link（インライン）/ danger（破壊的）の5種。サイズ sm / md / lg。アイコン付き / アイコンのみ / 全幅 / ボタングループに対応。",
    accept: "受入: `disabled` と `aria-busy` を区別。`loading` 中はスピナー＋クリック無効。`icon-only` は `aria-label` 必須。",
    body: `
      <h4 class="sub">種別 × 状態</h4>
      <table class="btn-grid">
        <thead><tr><th></th><th>default</th><th>hover</th><th>focus</th><th>disabled</th><th>loading</th></tr></thead>
        <tbody>
          <tr><th class="lbl">primary</th>
            <td><button class="btn btn--primary">発行する</button></td>
            <td><button class="btn btn--primary btn--hover">発行する</button></td>
            <td><button class="btn btn--primary btn--focus">発行する</button></td>
            <td><button class="btn btn--primary" disabled>発行する</button></td>
            <td><button class="btn btn--primary btn--loading"><span class="spinner"></span>送信中…</button></td></tr>
          <tr><th class="lbl">secondary</th>
            <td><button class="btn">下書き保存</button></td>
            <td><button class="btn btn--hover">下書き保存</button></td>
            <td><button class="btn btn--focus">下書き保存</button></td>
            <td><button class="btn" disabled>下書き保存</button></td>
            <td><button class="btn btn--loading"><span class="spinner"></span>保存中…</button></td></tr>
          <tr><th class="lbl">ghost</th>
            <td><button class="btn btn--ghost">キャンセル</button></td>
            <td><button class="btn btn--ghost btn--hover">キャンセル</button></td>
            <td><button class="btn btn--ghost btn--focus">キャンセル</button></td>
            <td><button class="btn btn--ghost" disabled>キャンセル</button></td>
            <td><button class="btn btn--ghost btn--loading"><span class="spinner"></span>キャンセル</button></td></tr>
          <tr><th class="lbl">link</th>
            <td><a class="btn btn--link" href="#">詳細を見る</a></td>
            <td><a class="btn btn--link btn--hover" href="#">詳細を見る</a></td>
            <td><a class="btn btn--link btn--focus" href="#">詳細を見る</a></td>
            <td><a class="btn btn--link" aria-disabled="true">詳細を見る</a></td>
            <td><a class="btn btn--link"><span class="spinner"></span>読込中</a></td></tr>
          <tr><th class="lbl">danger</th>
            <td><button class="btn btn--danger">削除する</button></td>
            <td><button class="btn btn--danger btn--hover">削除する</button></td>
            <td><button class="btn btn--danger btn--focus">削除する</button></td>
            <td><button class="btn btn--danger" disabled>削除する</button></td>
            <td><button class="btn btn--danger btn--loading"><span class="spinner"></span>削除中…</button></td></tr>
        </tbody>
      </table>
      <h4 class="sub" style="margin-top: 16px;">サイズ</h4>
      <div class="row"><button class="btn btn--primary btn--sm">sm</button><button class="btn btn--primary">md</button><button class="btn btn--primary btn--lg">lg</button></div>
      <h4 class="sub" style="margin-top: 16px;">アイコン付き</h4>
      <div class="row">
        <button class="btn btn--primary">${I.plus}<span>新規作成</span></button>
        <button class="btn">${I.download}<span>CSV取込</span></button>
        <button class="btn btn--ghost">${I.upload}<span>CSV出力</span></button>
        <button class="btn btn--ghost">${I.print}<span>印刷</span></button>
        <button class="btn btn--danger">${I.close}<span>削除</span></button>
      </div>
      <h4 class="sub" style="margin-top: 16px;">アイコンのみ / 全幅 / グループ</h4>
      <div class="row">
        <button class="btn btn--icon" aria-label="検索">${I.search}</button>
        <button class="btn btn--icon" aria-label="絞り込み">${I.filter}</button>
        <button class="btn btn--icon" aria-label="ダウンロード">${I.download}</button>
        <div class="btn-group">
          <button class="btn btn--ghost btn--sm">日</button>
          <button class="btn btn--ghost btn--sm">週</button>
          <button class="btn btn--primary btn--sm">月</button>
          <button class="btn btn--ghost btn--sm">年</button>
        </div>
      </div>
      <button class="btn btn--primary btn--block" style="margin-top: 12px;">承認を依頼する（全幅）</button>`
  },

  /* ===== 入力欄 (拡張) ===== */
  "text-input": {
    id: "C-INP", tag: "<sgt-input>", name: "入力欄", priority: "must",
    desc: "1行テキスト入力の素地。default / focus / filled / disabled / readonly / error / success / with-prefix / with-suffix / with-counter / 全角→半角の自動補正の状態を網羅。",
    accept: "受入: `aria-invalid` と `--error` クラスは同期。`maxlength` 指定時はカウンタを自動表示。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><div class="field"><label class="field__label">件名</label>
            <div class="input"><span class="input__value muted">業務UIライブラリ導入支援</span></div></div></div></div>
        <div class="variant"><div class="variant__label">focus</div>
          <div class="variant__stage"><div class="field"><label class="field__label">件名</label>
            <div class="input input--focus"><span class="input__value">業務UIライブラリ導入支援<span class="input__caret"></span></span></div></div></div></div>
        <div class="variant"><div class="variant__label">filled</div>
          <div class="variant__stage"><div class="field"><label class="field__label">件名</label>
            <div class="input"><span class="input__value">業務UIライブラリ導入支援 一式</span></div></div></div></div>
        <div class="variant"><div class="variant__label">readonly</div>
          <div class="variant__stage"><div class="field"><label class="field__label">見積番号</label>
            <div class="input input--readonly"><span class="input__value mono">Q-2026-0421</span></div></div></div></div>
        <div class="variant"><div class="variant__label">disabled</div>
          <div class="variant__stage"><div class="field"><label class="field__label">担当者</label>
            <div class="input input--disabled"><span class="input__value">佐藤 花子</span></div></div></div></div>
        <div class="variant"><div class="variant__label">error</div>
          <div class="variant__stage"><div class="field"><label class="field__label">件名 <span class="req">必須</span></label>
            <div class="input input--error"><span class="input__value muted">空欄</span></div>
            <span class="field__error">件名を入力してください。</span></div></div></div>
        <div class="variant"><div class="variant__label">success</div>
          <div class="variant__stage"><div class="field"><label class="field__label">件名</label>
            <div class="input input--ok"><span class="input__value">業務UIライブラリ導入支援</span><span class="input__suffix" style="color: var(--ok)">${I.check}</span></div></div></div></div>
        <div class="variant"><div class="variant__label">prefix / suffix</div>
          <div class="variant__stage"><div class="field"><label class="field__label">URL</label>
            <div class="input"><span class="input__prefix">https://</span><span class="input__value">shigoto.example.jp</span><span class="input__suffix">/admin</span></div></div></div></div>
        <div class="variant"><div class="variant__label">counter</div>
          <div class="variant__stage"><div class="field"><label class="field__label">備考</label>
            <div class="input"><span class="input__value">支払期限を5月末に変更</span></div>
            <span class="field__hint" style="text-align: right; display: block;"><span class="mono">14 / 200</span></span></div></div></div>
        <div class="variant"><div class="variant__label">全角→半角 自動</div>
          <div class="variant__stage"><div class="field"><label class="field__label">電話</label>
            <div class="input"><span class="input__value mono">０３－１２３４</span></div>
            <span class="field__hint">確定時に <span class="mono">03-1234</span> に正規化</span></div></div></div>
      </div>`
  },

  /* ===== テキストエリア ===== */
  "textarea": {
    id: "C-TXTA", tag: "<sgt-textarea>", name: "テキストエリア", priority: "must",
    desc: "複数行入力。auto-resize（行数で自動拡張）/ 固定行数 / 最大文字数カウンタ / 改行禁止モード（IME 確定改行のみ）。",
    accept: "受入: `rows` または `autosize` のいずれか。最大文字到達時は赤色カウンタ表示。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default（rows=3）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">備考</label>
            <div class="textarea-stub">本件は新規顧客の初回案件のため、価格の妥当性を含めご確認をお願いします。
納期は柔軟に調整可能です。
追加要件は別途見積もりとさせてください。</div>
          </div></div></div>
        <div class="variant"><div class="variant__label">autosize（最小1行 / 最大8行）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">コメント</label>
            <div class="textarea-stub" style="min-height: 30px;">確認しました。</div>
          </div></div></div>
        <div class="variant"><div class="variant__label">counter（200文字）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">差戻しコメント</label>
            <div class="textarea-stub">単価の根拠となる見積書原本を備考欄に添付してください。次回承認時に確認します。</div>
            <div class="row" style="justify-content: space-between; margin-top: 4px;"><span class="muted small">改行可</span><span class="mono small">38 / 200</span></div>
          </div></div></div>
        <div class="variant"><div class="variant__label">error（上限超過）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">差戻しコメント</label>
            <div class="textarea-stub textarea-stub--error">この度ご提示いただいた内容について…（中略）…再度ご検討いただけますでしょうか。</div>
            <div class="row" style="justify-content: space-between; margin-top: 4px;"><span class="field__error">200文字を超えています。</span><span class="mono small" style="color: var(--danger);">214 / 200</span></div>
          </div></div></div>
      </div>`
  },

  /* ===== セレクト (拡張) ===== */
  "select": {
    id: "C-SEL", tag: "<sgt-select>", name: "セレクト", priority: "must",
    desc: "単一選択 / 複数選択 / グループ化 / 検索可能 / 値クリア / disabled の各バリエーション。combobox パターンで実装。",
    accept: "受入: ↑↓ で候補移動、Enter で選択、Esc で閉じる。`searchable` は前方一致＋部分一致を両立。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">single</div>
          <div class="variant__stage"><div class="field"><label class="field__label">支払条件</label>
            <div class="input"><span class="input__value">翌月末払い</span><span class="input__suffix">${I.caret}</span></div></div></div></div>
        <div class="variant"><div class="variant__label">open</div>
          <div class="variant__stage"><div class="field"><label class="field__label">支払条件</label>
            <div class="combo">
              <div class="input input--focus"><span class="input__value">翌月末払い</span><span class="input__suffix">${I.caret}</span></div>
              <ul class="combo__results">
                <li>当月末払い</li>
                <li class="sel">${I.check}<span>翌月末払い</span></li>
                <li>翌々月末払い</li>
                <li>都度払い</li>
              </ul></div></div></div></div>
        <div class="variant"><div class="variant__label">searchable</div>
          <div class="variant__stage"><div class="field"><label class="field__label">取引先</label>
            <div class="combo">
              <div class="input input--focus"><span class="input__prefix">${I.search}</span><span class="input__value">サンプル</span><span class="input__caret"></span></div>
              <ul class="combo__results">
                <li class="sel"><mark>サンプル</mark>商事 株式会社<span class="combo__code">C-00321</span></li>
                <li><mark>サンプル</mark>工業 株式会社<span class="combo__code">C-00498</span></li>
                <li><mark>サンプル</mark>テック 合同会社<span class="combo__code">C-01102</span></li>
              </ul></div></div></div></div>
        <div class="variant"><div class="variant__label">multi（チップ）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">担当（複数可）</label>
            <div class="input"><div class="chips">
              <span class="chip">佐藤 花子${I.close}</span>
              <span class="chip">山田 太郎${I.close}</span>
              <span class="chip">鈴木 一郎${I.close}</span>
            </div><span class="input__suffix">${I.caret}</span></div></div></div></div>
        <div class="variant"><div class="variant__label">grouped</div>
          <div class="variant__stage"><div class="field"><label class="field__label">通知先</label>
            <div class="combo">
              <div class="input input--focus"><span class="input__value">経理部 / 山田 太郎</span><span class="input__suffix">${I.caret}</span></div>
              <ul class="combo__results">
                <li class="combo__group">経理部</li>
                <li class="sel">${I.check}<span>山田 太郎</span></li>
                <li>佐々木 良子</li>
                <li class="combo__group">営業部</li>
                <li>佐藤 花子</li>
                <li>鈴木 一郎</li>
              </ul></div></div></div></div>
        <div class="variant"><div class="variant__label">disabled</div>
          <div class="variant__stage"><div class="field"><label class="field__label">承認経路</label>
            <div class="input input--disabled"><span class="input__value">部長承認 → 経理確認</span><span class="input__suffix">${I.caret}</span></div></div></div></div>
      </div>`
  },

  /* ===== ラジオボタン ===== */
  "radio": {
    id: "C-RDO", tag: "<sgt-radio-group>", name: "ラジオボタン", priority: "must",
    desc: "単一選択。縦・横レイアウト、説明文付き、カード型（リッチ選択）の3スタイル。3〜5選択肢が目安。",
    accept: "受入: `name` 属性が同じものでグループ化。Tab はグループ単位、↑↓で項目間移動。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">縦並び</div>
          <div class="variant__stage"><div class="field"><label class="field__label">税表示</label>
            <div class="col">
              <span class="radio checked"><span class="radio__dot"></span> 外税（税抜＋消費税）</span>
              <span class="radio"><span class="radio__dot"></span> 内税（税込）</span>
              <span class="radio"><span class="radio__dot"></span> 非課税</span>
            </div></div></div></div>
        <div class="variant"><div class="variant__label">横並び</div>
          <div class="variant__stage"><div class="field"><label class="field__label">優先度</label>
            <div class="row">
              <span class="radio"><span class="radio__dot"></span> 高</span>
              <span class="radio checked"><span class="radio__dot"></span> 中</span>
              <span class="radio"><span class="radio__dot"></span> 低</span>
            </div></div></div></div>
        <div class="variant"><div class="variant__label">説明付き</div>
          <div class="variant__stage"><div class="field"><label class="field__label">承認経路</label>
            <div class="col">
              <label class="radio-rich checked"><span class="radio__dot"></span><div><strong>標準経路</strong><div class="muted small">課長 → 部長</div></div></label>
              <label class="radio-rich"><span class="radio__dot"></span><div><strong>簡易経路</strong><div class="muted small">課長のみ（10万円未満）</div></div></label>
              <label class="radio-rich"><span class="radio__dot"></span><div><strong>役員経路</strong><div class="muted small">課長 → 部長 → 役員（500万円以上）</div></div></label>
            </div></div></div></div>
        <div class="variant"><div class="variant__label">disabled</div>
          <div class="variant__stage">
            <div class="col">
              <span class="radio"><span class="radio__dot"></span> 通常</span>
              <span class="radio checked" style="opacity: 0.5"><span class="radio__dot"></span> 中（固定）</span>
              <span class="radio" style="opacity: 0.5"><span class="radio__dot"></span> 低</span>
            </div></div></div>
      </div>`
  },

  /* ===== チェックボックス ===== */
  "checkbox": {
    id: "C-CHK", tag: "<sgt-checkbox>", name: "チェックボックス", priority: "must",
    desc: "単独・グループ・全選択（indeterminate 含む）・カード型・disabled 状態。テーブル先頭列との連携を想定。",
    accept: "受入: 親が全選択／一部選択／未選択を表現できる（indeterminate 状態）。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">基本</div>
          <div class="variant__stage"><div class="col">
            <span class="check checked"><span class="check__box">${I.check}</span> 軽減税率対象</span>
            <span class="check"><span class="check__box"></span> 源泉徴収あり</span>
            <span class="check checked"><span class="check__box">${I.check}</span> 経費精算対象</span>
            <span class="check" style="opacity: 0.5"><span class="check__box"></span> 確定（システムロック）</span>
          </div></div></div>
        <div class="variant"><div class="variant__label">全選択 / 一部選択</div>
          <div class="variant__stage"><div class="col">
            <span class="check check--mixed"><span class="check__box"><span class="check__dash"></span></span> <strong>全選択</strong> <span class="muted small">（3 / 5 選択中）</span></span>
            <div class="muted small" style="padding-left: 24px; display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
              <span class="check checked"><span class="check__box">${I.check}</span> Q-2026-0421</span>
              <span class="check"><span class="check__box"></span> Q-2026-0420</span>
              <span class="check checked"><span class="check__box">${I.check}</span> Q-2026-0419</span>
              <span class="check checked"><span class="check__box">${I.check}</span> Q-2026-0418</span>
              <span class="check"><span class="check__box"></span> Q-2026-0417</span>
            </div>
          </div></div></div>
        <div class="variant"><div class="variant__label">カード型</div>
          <div class="variant__stage"><div class="col">
            <label class="check-rich checked"><span class="check__box">${I.check}</span><div><strong>軽減税率対象品目を含む</strong><div class="muted small">食品・新聞などの売上を別集計します</div></div></label>
            <label class="check-rich"><span class="check__box"></span><div><strong>適格請求書を発行する</strong><div class="muted small">登録番号 T+13桁が必要です</div></div></label>
          </div></div></div>
      </div>`
  },

  /* ===== フォーム項目 ===== */
  "form-field": {
    id: "C-FF", tag: "<sgt-field>", name: "フォーム項目", priority: "must",
    desc: "label + input + hint + error + req-badge を1単位にまとめる。横並び・縦並びの2レイアウトを切替可能。",
    accept: "受入: ラベルと入力は `for` / `aria-describedby` で対応付け。エラー表示時は赤縁＋アイコン＋メッセージ。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">vertical（既定）</div>
          <div class="variant__stage" style="max-width: 320px;">
            <div class="field"><label class="field__label">取引先 <span class="req">必須</span></label>
              <div class="input"><span class="input__value muted">未選択</span><span class="input__suffix">${I.caret}</span></div>
              <span class="field__hint">顧客マスタから選択してください。</span></div></div></div>
        <div class="variant"><div class="variant__label">horizontal（帳票風）</div>
          <div class="variant__stage">
            <div class="hf"><label class="hf__label">郵便番号 <span class="req">必須</span></label>
              <div class="hf__ctrl"><div class="input" style="max-width: 180px;"><span class="input__prefix">〒</span><span class="input__value mono">100-0001</span></div></div></div>
            <div class="hf"><label class="hf__label">住所</label>
              <div class="hf__ctrl"><div class="input"><span class="input__value">東京都千代田区千代田1-1</span></div></div></div>
            <div class="hf"><label class="hf__label">電話</label>
              <div class="hf__ctrl"><div class="input" style="max-width: 220px;"><span class="input__value mono">03-1234-5678</span></div></div></div>
          </div></div>
        <div class="variant"><div class="variant__label">error</div>
          <div class="variant__stage" style="max-width: 320px;">
            <div class="field"><label class="field__label">合計金額 <span class="req">必須</span></label>
              <div class="input input--error"><span class="input__prefix">${I.yen}</span><span class="input__value muted">空欄</span></div>
              <span class="field__error">${I.warn}<span>合計金額を入力してください。</span></span></div></div></div>
      </div>`
  },

  /* ===== 必須バッジ ===== */
  "required-badge": {
    id: "C-REQ", tag: "<sgt-required-badge>", name: "必須バッジ", priority: "must",
    desc: "必須 / 任意 / 推奨 / 確認待ち の4種を統一フォーマットで表現。テキスト色＋ボーダーで地味に主張する。",
    accept: "受入: 色だけに頼らない（文字でも区別可能）。スクリーンリーダーには `必須項目` を読み上げる。",
    body: `
      <h4 class="sub">単独表示</h4>
      <div class="row">
        <span class="req">必須</span>
        <span class="req req--optional">任意</span>
        <span class="req req--rec">推奨</span>
        <span class="req req--review">確認待ち</span>
      </div>
      <h4 class="sub" style="margin-top: 16px;">ラベルと組み合わせ</h4>
      <div class="col" style="max-width: 320px;">
        <div class="field"><label class="field__label">取引先 <span class="req">必須</span></label>
          <div class="input"><span class="input__value muted">未選択</span></div></div>
        <div class="field"><label class="field__label">担当部署 <span class="req req--optional">任意</span></label>
          <div class="input"><span class="input__value muted">未選択</span></div></div>
        <div class="field"><label class="field__label">補足コメント <span class="req req--rec">推奨</span></label>
          <div class="textarea-stub" style="min-height: 32px;"></div></div>
      </div>`
  },

  /* ===== 入力エラー ===== */
  "input-error": {
    id: "C-IE", tag: "field error states", name: "入力エラー", priority: "must",
    desc: "1項目に発生するエラーの最小表現。inline（即時）/ on-blur（離脱時）/ on-submit（送信時）の3トリガに対応。",
    accept: "受入: 同じ項目で複数のエラーが出ても1つに集約（最も致命的なものを優先）。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">必須未入力</div>
          <div class="variant__stage"><div class="field"><label class="field__label">件名 <span class="req">必須</span></label>
            <div class="input input--error"><span class="input__value muted">空欄</span></div>
            <span class="field__error">${I.warn}<span>件名を入力してください。</span></span></div></div></div>
        <div class="variant"><div class="variant__label">形式不正</div>
          <div class="variant__stage"><div class="field"><label class="field__label">郵便番号 <span class="req">必須</span></label>
            <div class="input input--error"><span class="input__prefix">〒</span><span class="input__value mono">123</span></div>
            <span class="field__error">${I.warn}<span>郵便番号は7桁で入力してください。</span></span></div></div></div>
        <div class="variant"><div class="variant__label">範囲外</div>
          <div class="variant__stage"><div class="field"><label class="field__label">数量</label>
            <div class="input input--error"><span class="input__value mono">0</span></div>
            <span class="field__error">${I.warn}<span>1以上の値を入力してください。</span></span></div></div></div>
        <div class="variant"><div class="variant__label">サーバ検証</div>
          <div class="variant__stage"><div class="field"><label class="field__label">登録番号</label>
            <div class="input input--error"><span class="input__prefix mono">T</span><span class="input__value mono">9999999999999</span></div>
            <span class="field__error">${I.warn}<span>このインボイス番号は国税庁DBで確認できません。</span></span></div></div></div>
        <div class="variant"><div class="variant__label">警告（送信は可）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">合計金額</label>
            <div class="input input--warn"><span class="input__prefix">${I.yen}</span><span class="input__value mono">12,000,000</span></div>
            <span class="field__warn">${I.warn}<span>過去6か月で最高額です。承認に時間がかかる可能性があります。</span></span></div></div></div>
        <div class="variant"><div class="variant__label">解決済み</div>
          <div class="variant__stage"><div class="field"><label class="field__label">郵便番号</label>
            <div class="input input--ok"><span class="input__prefix">〒</span><span class="input__value mono">100-0001</span><span class="input__suffix" style="color: var(--ok)">${I.check}</span></div>
            <span class="field__ok">住所を自動入力しました。</span></div></div></div>
      </div>`
  },

  /* ===== エラー一覧 ===== */
  "error-list": {
    id: "C-EL", tag: "<sgt-validation-summary>", name: "エラー一覧", priority: "must",
    desc: "送信時に画面冒頭で全エラーを集約。クリックで該当項目にジャンプ＋フォーカス。MVPで重要。",
    accept: "受入: 0件のとき非表示。1件以上で `role=\"alert\"` を出し、フォーカスを集約箱に移す。",
    body: `
      <div class="validation">
        <div class="validation__head">
          ${I.warn}
          <p class="validation__title">入力内容に <strong>4件のエラー</strong>と<strong>1件の警告</strong>があります</p>
        </div>
        <ol class="validation__list">
          <li><span class="badge badge--rejected">エラー</span><a href="#money">合計金額</a> に数値以外の文字が含まれています。</li>
          <li><span class="badge badge--rejected">エラー</span><a href="#postal">郵便番号</a> は7桁で入力してください。</li>
          <li><span class="badge badge--rejected">エラー</span><a href="#date">有効期限</a> は発行日より後の日付を指定してください。</li>
          <li><span class="badge badge--rejected">エラー</span>明細1行目の<a href="#line-item">単価</a> は1以上の値を入力してください。</li>
          <li><span class="badge badge--warn">警告</span><a href="#money">合計金額</a> は過去6か月で最高額です。</li>
        </ol>
        <div class="row" style="padding: 0 16px 12px;">
          <button class="btn btn--primary btn--sm">最初のエラーへ</button>
          <span class="muted small" style="align-self: center;">5件 / すべての項目を確認できます</span>
        </div>
      </div>`
  },

  /* ===== テーブル (拡張) ===== */
  "data-table": {
    id: "C-TBL", tag: "<sgt-data-table>", name: "テーブル", priority: "must",
    desc: "業務一覧の標準。並び替え / 行選択 / 行アクション / 固定ヘッダ / ゼブラ / 空状態 / 読込中。",
    accept: "受入: ヘッダクリックで `sgt:sort` 発火。100件超は仮想スクロールに切替（option）。",
    body: `
      <div class="row" style="margin-bottom: 8px;">
        <span class="muted small">3件選択中</span>
        <button class="btn btn--ghost btn--sm">${I.upload}<span>CSV出力</span></button>
        <button class="btn btn--ghost btn--sm">${I.print}<span>印刷</span></button>
        <button class="btn btn--danger btn--sm">${I.close}<span>削除</span></button>
      </div>
      <table class="table table--sticky">
        <thead><tr>
          <th><span class="check check--mixed"><span class="check__box"><span class="check__dash"></span></span></span></th>
          <th><span class="th-sort">見積番号 ${I.sort}</span></th>
          <th><span class="th-sort">取引先 ${I.sort}</span></th>
          <th>件名</th>
          <th class="num"><span class="th-sort">合計 ${I.sort}</span></th>
          <th>状態</th>
          <th><span class="th-sort">更新日時 ${I.sort}</span></th>
          <th></th>
        </tr></thead>
        <tbody>
          <tr class="sel"><td><span class="check checked"><span class="check__box">${I.check}</span></span></td>
            <td class="mono">Q-2026-0421</td><td>株式会社 サンプル商事</td><td>業務UI導入支援 一式</td>
            <td class="num mono">¥3,045,900</td><td><span class="badge badge--pending">承認待ち</span></td><td class="mono small">04-26 10:12</td>
            <td><button class="btn btn--icon btn--sm" aria-label="操作">${I.drag}</button></td></tr>
          <tr class="zebra sel"><td><span class="check checked"><span class="check__box">${I.check}</span></span></td>
            <td class="mono">Q-2026-0420</td><td>サンプル工業 株式会社</td><td>定期保守</td>
            <td class="num mono">¥220,000</td><td><span class="badge badge--approved">承認済</span></td><td class="mono small">04-25 18:00</td>
            <td><button class="btn btn--icon btn--sm" aria-label="操作">${I.drag}</button></td></tr>
          <tr class="sel"><td><span class="check checked"><span class="check__box">${I.check}</span></span></td>
            <td class="mono">Q-2026-0419</td><td>合同会社 シゴト</td><td>初期相談</td>
            <td class="num mono">¥0</td><td><span class="badge badge--draft">下書き</span></td><td class="mono small">04-24 09:30</td>
            <td><button class="btn btn--icon btn--sm" aria-label="操作">${I.drag}</button></td></tr>
          <tr class="zebra"><td><span class="check"><span class="check__box"></span></span></td>
            <td class="mono">Q-2026-0418</td><td>サンプルテック 合同会社</td><td>追加機能見積</td>
            <td class="num mono">¥1,540,000</td><td><span class="badge badge--rejected">差戻し</span></td><td class="mono small">04-23 14:22</td>
            <td><button class="btn btn--icon btn--sm" aria-label="操作">${I.drag}</button></td></tr>
          <tr><td><span class="check"><span class="check__box"></span></span></td>
            <td class="mono">Q-2026-0417</td><td>株式会社 サンプル商事</td><td>追加導入支援</td>
            <td class="num mono">¥980,000</td><td><span class="badge badge--cancel">取消</span></td><td class="mono small">04-22 11:08</td>
            <td><button class="btn btn--icon btn--sm" aria-label="操作">${I.drag}</button></td></tr>
        </tbody>
      </table>
      <h4 class="sub" style="margin-top: 18px;">読込中 / 空状態</h4>
      <div class="grid-2">
        <table class="table"><thead><tr><th>見積番号</th><th>取引先</th><th class="num">合計</th></tr></thead>
          <tbody>
            <tr><td><span class="skeleton" style="width: 80px;"></span></td><td><span class="skeleton" style="width: 140px;"></span></td><td class="num"><span class="skeleton" style="width: 60px;"></span></td></tr>
            <tr><td><span class="skeleton" style="width: 80px;"></span></td><td><span class="skeleton" style="width: 100px;"></span></td><td class="num"><span class="skeleton" style="width: 60px;"></span></td></tr>
            <tr><td><span class="skeleton" style="width: 80px;"></span></td><td><span class="skeleton" style="width: 160px;"></span></td><td class="num"><span class="skeleton" style="width: 60px;"></span></td></tr>
          </tbody></table>
        <div class="empty">
          <div class="empty__art">${I.search}</div>
          <h4>該当する見積はありません</h4>
          <p class="muted small">条件を変更するか、新規作成してください。</p>
          <button class="btn btn--primary btn--sm">${I.plus}<span>見積を新規作成</span></button>
        </div>
      </div>`
  },

  /* ===== 明細テーブル (拡張) ===== */
  "line-item": {
    id: "C-LIT", tag: "<sgt-line-item-table>", name: "明細テーブル", priority: "must",
    desc: "見積・請求の明細。行追加・削除・並び替え・税率変更・キーボード移動（Tab/Enter）。フッタに小計を固定。",
    accept: "受入: Tab で右、Enter で次行。最終行末尾で Tab → 自動的に新規行追加。`sgt:total` を発火。",
    body: `
      <table class="line-table">
        <thead><tr><th></th><th>品目</th><th class="num" style="width: 80px;">数量</th><th>単位</th><th class="num" style="width: 110px;">単価</th><th>税率</th><th class="num" style="width: 130px;">金額</th><th></th></tr></thead>
        <tbody>
          <tr><td class="drag">${I.drag}</td>
            <td><div class="input input--cell"><span class="input__value">導入支援</span></div></td>
            <td class="num"><div class="input input--cell"><span class="input__value mono">2</span></div></td>
            <td><div class="input input--cell"><span class="input__value">人月</span></div></td>
            <td class="num"><div class="input input--cell"><span class="input__value mono">1,200,000</span></div></td>
            <td><span class="rate-pill rate-pill--active">10%</span></td>
            <td class="num mono">2,400,000</td>
            <td><button class="btn btn--icon btn--sm" aria-label="削除">${I.close}</button></td></tr>
          <tr><td class="drag">${I.drag}</td>
            <td><div class="input input--cell"><span class="input__value">設計レビュー</span></div></td>
            <td class="num"><div class="input input--cell"><span class="input__value mono">5</span></div></td>
            <td><div class="input input--cell"><span class="input__value">時間</span></div></td>
            <td class="num"><div class="input input--cell"><span class="input__value mono">15,000</span></div></td>
            <td><span class="rate-pill rate-pill--active">10%</span></td>
            <td class="num mono">75,000</td>
            <td><button class="btn btn--icon btn--sm" aria-label="削除">${I.close}</button></td></tr>
          <tr><td class="drag">${I.drag}</td>
            <td><div class="input input--cell"><span class="input__value">関連書籍</span></div></td>
            <td class="num"><div class="input input--cell"><span class="input__value mono">4</span></div></td>
            <td><div class="input input--cell"><span class="input__value">冊</span></div></td>
            <td class="num"><div class="input input--cell"><span class="input__value mono">3,000</span></div></td>
            <td><span class="rate-pill rate-pill--reduced">8%</span></td>
            <td class="num mono">12,000</td>
            <td><button class="btn btn--icon btn--sm" aria-label="削除">${I.close}</button></td></tr>
          <tr class="line-table__add"><td colspan="8"><button class="btn btn--ghost btn--sm">${I.plus}<span>行を追加（Tabキーでも追加できます）</span></button></td></tr>
        </tbody>
        <tfoot>
          <tr><td colspan="6" class="num muted">10%対象 小計</td><td class="num mono">2,475,000</td><td></td></tr>
          <tr><td colspan="6" class="num muted">8%対象 小計</td><td class="num mono">12,000</td><td></td></tr>
          <tr class="grand"><td colspan="6" class="num">合計（税込）</td><td class="num mono">¥2,734,460</td><td></td></tr>
        </tfoot>
      </table>`
  },

  /* ===== カード (拡張: 4型) ===== */
  "card": {
    id: "C-CARD", tag: "<sgt-card>", name: "カード", priority: "should",
    desc: "header / body / footer の3スロット。standard / metric / list / status の4型。罫線 1px・角丸 4px・フラット（影無し）。",
    accept: "受入: header / footer が空のとき自動で潰れる。`bordered=\"false\"` で罫線を消せる。",
    body: `
      <div class="grid-2">
        <div class="ex-card">
          <div class="ex-card__head"><strong>Q-2026-0421</strong><span class="badge badge--pending">承認待ち</span></div>
          <div class="ex-card__body">
            <div class="ex-card__row"><span class="muted small">取引先</span><span>株式会社 サンプル商事</span></div>
            <div class="ex-card__row"><span class="muted small">合計</span><span class="mono">¥3,045,900</span></div>
            <div class="ex-card__row"><span class="muted small">発行日</span><span class="mono">2026-04-26</span></div>
          </div>
          <div class="ex-card__foot"><a href="#" class="muted small">詳細を開く ${I.arrow}</a></div>
        </div>
        <div class="ex-card ex-card--strong">
          <div class="ex-card__head"><strong>今月の見積件数</strong><span class="muted small">2026-04</span></div>
          <div class="ex-card__body" style="padding: 24px 20px;">
            <div style="font-size: 32px; font-weight: 600; line-height: 1;">42<span class="muted" style="font-size: 13px; margin-left: 6px;">件</span></div>
            <div class="muted small" style="margin-top: 6px;">前月比 +8 ／ 承認率 78%</div>
          </div>
        </div>
        <div class="ex-card">
          <div class="ex-card__head"><strong>最近の更新</strong></div>
          <ul class="ex-card__list">
            <li><span class="badge badge--info">更新</span><span>Q-2026-0421 の合計が変更されました</span><span class="mono small muted">10:12</span></li>
            <li><span class="badge badge--approved">承認</span><span>Q-2026-0418 が承認されました</span><span class="mono small muted">09:48</span></li>
            <li><span class="badge badge--rejected">差戻</span><span>Q-2026-0417 が差し戻されました</span><span class="mono small muted">昨日</span></li>
          </ul>
        </div>
        <div class="ex-card">
          <div class="ex-card__head" style="background: var(--warn-soft); border-bottom-color: var(--warn);">
            <strong>承認待ち</strong><span class="badge badge--warn">3件</span></div>
          <div class="ex-card__body">
            <div class="muted small">3件の見積が承認を待っています。最も古い案件は2日前です。</div>
            <button class="btn btn--primary btn--sm" style="margin-top: 8px;">承認画面を開く</button>
          </div>
        </div>
      </div>`
  },

  /* ===== アラート ===== */
  "alert": {
    id: "C-ALR", tag: "<sgt-alert>", name: "アラート", priority: "must",
    desc: "info / success / warning / error / system の5種。閉じる / リンク / アクションボタン付与。インラインで挿入される設計。",
    accept: "受入: 閉じた状態は localStorage で保持できる（`dismissible-key` 指定時）。",
    body: `
      <div class="col">
        <div class="alert alert--info">${I.info}<div><strong>下書き保存しました</strong><div class="muted small">「下書き一覧」から再開できます。</div></div></div>
        <div class="alert alert--ok">${I.check}<div><strong>請求書を発行しました</strong><div class="muted small">取引先にメール通知済みです。</div></div></div>
        <div class="alert alert--warn">${I.warn}<div><strong>有効期限が近づいています</strong><div class="muted small">2件の見積が3日以内に期限切れになります。</div></div><a href="#" class="btn btn--link btn--sm">確認する</a></div>
        <div class="alert alert--err">${I.warn}<div><strong>送信に失敗しました</strong><div class="muted small">通信エラーです。時間を置いて再試行してください。</div></div><button class="btn btn--ghost btn--sm">再試行</button></div>
        <div class="alert alert--sys">${I.info}<div><strong>システムメンテナンスのお知らせ</strong><div class="muted small">2026-05-01 02:00〜04:00 はサービスを停止します。</div></div><button class="btn btn--icon btn--sm" aria-label="閉じる">${I.close}</button></div>
      </div>`
  },

  /* ===== モーダル (拡張) ===== */
  "modal": {
    id: "C-MDL", tag: "<sgt-dialog>", name: "モーダル", priority: "must",
    desc: "確認 / フォーム / 警告 / 全画面 の4パターン。フォーカストラップ・Esc 閉じ・スクロールロックを内蔵。",
    accept: "受入: open 時は最初のフォーカス可能要素にフォーカス。背景クリックの close 可否は `static` で制御。",
    body: `
      <div class="grid-2">
        <div class="modal-stub">
          <div class="modal__head"><strong>見積を発行しますか？</strong><button class="btn btn--icon btn--sm" aria-label="閉じる">${I.close}</button></div>
          <div class="modal__body">
            <p>発行後は明細・金額の編集ができなくなります。</p>
            <div class="muted small mono">Q-2026-0421 / 株式会社 サンプル商事 / ¥3,045,900</div>
          </div>
          <div class="modal__foot"><button class="btn btn--ghost">キャンセル</button><button class="btn btn--primary">発行する</button></div>
        </div>
        <div class="modal-stub modal-stub--danger">
          <div class="modal__head"><strong>本当に削除しますか？</strong><button class="btn btn--icon btn--sm" aria-label="閉じる">${I.close}</button></div>
          <div class="modal__body">
            <p>この操作は取り消せません。Q-2026-0419 を完全に削除します。</p>
            <div class="field" style="margin-top: 8px;"><label class="field__label">確認のため <span class="mono">DELETE</span> と入力</label>
              <div class="input"><span class="input__value mono">DELETE</span></div></div>
          </div>
          <div class="modal__foot"><button class="btn btn--ghost">キャンセル</button><button class="btn btn--danger">削除する</button></div>
        </div>
        <div class="modal-stub" style="grid-column: span 2;">
          <div class="modal__head"><strong>顧客を新規登録</strong><button class="btn btn--icon btn--sm" aria-label="閉じる">${I.close}</button></div>
          <div class="modal__body">
            <div class="grid-2" style="gap: 12px;">
              <div class="field"><label class="field__label">顧客名 <span class="req">必須</span></label><div class="input"><span class="input__value muted">未入力</span></div></div>
              <div class="field"><label class="field__label">担当 <span class="req req--optional">任意</span></label><div class="input"><span class="input__value">佐藤 花子</span><span class="input__suffix">${I.caret}</span></div></div>
              <div class="field"><label class="field__label">郵便番号</label><div class="input"><span class="input__prefix">〒</span><span class="input__value mono">100-0001</span></div></div>
              <div class="field"><label class="field__label">電話</label><div class="input"><span class="input__value mono">03-1234-5678</span></div></div>
            </div>
          </div>
          <div class="modal__foot"><button class="btn btn--ghost">キャンセル</button><button class="btn">下書き保存</button><button class="btn btn--primary">登録する</button></div>
        </div>
      </div>`
  },

  /* ===== ページ送り (拡張) ===== */
  "pagination": {
    id: "C-PG", tag: "<sgt-pagination>", name: "ページ送り", priority: "must",
    desc: "数字ナビゲーション / 前後ボタンのみ / 件数選択 / 件数表示「1-20 / 245件」を1コンポーネントに集約。",
    accept: "受入: 1ページ目では『前へ』disabled、最終ページでは『次へ』disabled。`sgt:change` で `{page, pageSize}` を発火。",
    body: `
      <h4 class="sub">標準</h4>
      <div class="row" style="justify-content: space-between;">
        <span class="muted small">1 - 20 / 245 件</span>
        <div class="row">
          <span class="muted small">表示件数</span>
          <div class="input" style="min-height: 28px; padding: 4px 8px; min-width: 70px;"><span class="input__value mono">20</span><span class="input__suffix">${I.caret}</span></div>
          <div class="pager">
            <button aria-label="先頭ページ" disabled>${I.arrow}<span style="display: none;">先頭</span></button>
            <button aria-label="前のページ">前へ</button>
            <button class="active">1</button><button>2</button><button>3</button><span class="muted">…</span><button>13</button>
            <button aria-label="次のページ">次へ</button>
            <button aria-label="最終ページ">${I.arrow}</button>
          </div>
        </div>
      </div>
      <h4 class="sub" style="margin-top: 16px;">前後のみ（モバイル / 簡易）</h4>
      <div class="row" style="justify-content: space-between;">
        <button class="btn btn--ghost btn--sm">前のページ</button>
        <span class="muted small mono">3 / 13</span>
        <button class="btn btn--ghost btn--sm">次のページ</button>
      </div>
      <h4 class="sub" style="margin-top: 16px;">読込中 / 単一ページ</h4>
      <div class="row" style="justify-content: space-between;">
        <span class="muted small">12 件 / 1 ページ</span>
        <div class="pager">
          <button disabled>前へ</button>
          <button class="active">1</button>
          <button disabled>次へ</button>
        </div>
      </div>`
  },

  /* ===== 検索ボックス (拡張) ===== */
  "search-box": {
    id: "C-SR", tag: "<sgt-search-box>", name: "検索ボックス", priority: "must",
    desc: "default / focus / typing / suggesting / loading / no-result / 履歴付き の状態を網羅。Enter で確定、Esc でクリア。",
    accept: "受入: 検索開始は debounce 250ms。`sgt:search` で `{query, source}` を発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><div class="search" style="max-width: 380px;">${I.search}<input placeholder="見積番号 / 取引先で検索" /><span class="key">/</span></div></div></div>
        <div class="variant"><div class="variant__label">typing</div>
          <div class="variant__stage"><div class="search search--focus" style="max-width: 380px;">${I.search}<input value="サンプル商" /><button class="btn btn--icon btn--sm" aria-label="クリア">${I.close}</button></div></div></div>
        <div class="variant"><div class="variant__label">suggesting</div>
          <div class="variant__stage"><div style="max-width: 420px;"><div class="combo">
            <div class="search search--focus">${I.search}<input value="サンプル" /></div>
            <ul class="combo__results">
              <li><span class="muted small">最近の検索</span></li>
              <li><span><mark>サンプル</mark>商事</span><span class="combo__code muted">2 時間前</span></li>
              <li><span class="muted small">候補</span></li>
              <li class="sel"><span>株式会社 <mark>サンプル</mark>商事</span><span class="combo__code">C-00321</span></li>
              <li><span><mark>サンプル</mark>工業 株式会社</span><span class="combo__code">C-00498</span></li>
              <li><span><mark>サンプル</mark>テック 合同会社</span><span class="combo__code">C-01102</span></li>
            </ul></div></div></div></div>
        <div class="variant"><div class="variant__label">loading</div>
          <div class="variant__stage"><div class="search search--focus" style="max-width: 380px;">${I.search}<input value="サンプル" /><span class="spinner spinner--mute"></span></div></div></div>
        <div class="variant"><div class="variant__label">no-result</div>
          <div class="variant__stage"><div style="max-width: 420px;"><div class="combo">
            <div class="search search--focus">${I.search}<input value="該当なし" /></div>
            <ul class="combo__results"><li class="muted small" style="text-align: center; padding: 16px;">「該当なし」に一致する結果はありません</li></ul></div></div></div></div>
        <div class="variant"><div class="variant__label">フィルタ付き</div>
          <div class="variant__stage"><div class="row" style="max-width: 480px;">
            <div class="search" style="flex: 1;">${I.search}<input placeholder="見積を検索" /></div>
            <button class="btn btn--ghost">${I.filter}<span>絞り込み</span><span class="badge badge--info">3</span></button></div></div></div>
      </div>`
  },

  /* ===== 合計金額表示 ===== */
  "total-amount": {
    id: "C-TOT", tag: "<sgt-total-amount>", name: "合計金額表示", priority: "must",
    desc: "見積・請求・帳票の合計欄。税率内訳・通貨表示・桁ぞろえ・印刷時のレイアウト崩れ防止。",
    accept: "受入: 桁を `tabular-nums` で固定。10%/8%対象を別行に分けて表示。負数は赤色＋三角。",
    body: `
      <div class="grid-2">
        <div>
          <h4 class="sub">標準（10% + 8% 内訳）</h4>
          <div class="tax">
            <div class="tax__row"><span>10%対象 小計</span><span class="num mono">¥2,475,000</span></div>
            <div class="tax__row"><span>消費税（10%）</span><span class="num mono">¥247,500</span></div>
            <div class="tax__row"><span>8%対象 小計</span><span class="num mono">¥12,000</span></div>
            <div class="tax__row"><span>消費税（8%）</span><span class="num mono">¥960</span></div>
            <div class="tax__row total"><span>合計（税込）</span><span class="num mono">¥2,735,460</span></div>
          </div>
        </div>
        <div>
          <h4 class="sub">大型（ヘッダ表示）</h4>
          <div class="total-hero">
            <div class="muted small">合計（税込）</div>
            <div class="total-hero__num">¥3,045,900</div>
            <div class="muted small">うち消費税 ¥276,900</div>
          </div>
          <h4 class="sub" style="margin-top: 12px;">差額（負数）</h4>
          <div class="tax">
            <div class="tax__row"><span>前回見積</span><span class="num mono">¥3,045,900</span></div>
            <div class="tax__row"><span>今回見積</span><span class="num mono">¥2,750,000</span></div>
            <div class="tax__row total"><span>差額</span><span class="num mono" style="color: var(--danger);">▲ ¥295,900</span></div>
          </div>
        </div>
      </div>`
  },

  /* ===== ステータス表示 (拡張) ===== */
  "status": {
    id: "C-STS", tag: "<sgt-status-badge>", name: "ステータス表示", priority: "must",
    desc: "業務フローの状態。下書き / 申請中 / 確認中 / 承認済 / 差戻し / 取消 / 期限切れ / 発行済 / 入金済。色 + 文字 + アイコンの3要素で表現。",
    accept: "受入: 色だけに頼らない。文字でも状態が判別できる。`size=\"sm\"` でテーブル内表示に最適化。",
    body: `
      <h4 class="sub">バッジ（一覧表示用）</h4>
      <div class="row" style="flex-wrap: wrap;">
        <span class="badge badge--draft">下書き</span>
        <span class="badge badge--review">申請中</span>
        <span class="badge badge--pending">確認中</span>
        <span class="badge badge--approved">${I.check}<span>承認済</span></span>
        <span class="badge badge--rejected">${I.warn}<span>差戻し</span></span>
        <span class="badge badge--cancel">取消</span>
        <span class="badge badge--expired">期限切れ</span>
        <span class="badge badge--issued">発行済</span>
        <span class="badge badge--paid">${I.check}<span>入金済</span></span>
      </div>
      <h4 class="sub" style="margin-top: 16px;">大型（詳細画面ヘッダ用）</h4>
      <div class="status-line">
        <span class="status-dot status-dot--pending"></span>
        <strong>承認待ち</strong>
        <span class="muted small">山田 太郎が確認中・依頼から 4時間経過</span>
      </div>
      <h4 class="sub" style="margin-top: 16px;">タイムライン形式</h4>
      <ol class="timeline timeline--compact">
        <li class="timeline__step timeline__step--done"><div><span class="timeline__who">佐藤</span> 起票<span class="muted small mono"> 04-24 10:12</span></div></li>
        <li class="timeline__step timeline__step--done"><div><span class="timeline__who">山田</span> 確認<span class="muted small mono"> 04-25 09:48</span></div></li>
        <li class="timeline__step timeline__step--current"><div><span class="timeline__who">部長</span> 承認待ち</div></li>
        <li class="timeline__step"><div class="muted">経理確認</div></li>
        <li class="timeline__step"><div class="muted">取引先送付</div></li>
      </ol>`
  }
};

/* Override existing CARDS keys with v4 versions */


/* ================================================================
   v5 additions (CARDS)
   ================================================================ */

/* Shigoto UI — v5 cards: 25 more components */

const I5 = window.ICON || {};

const CARDS_V5 = {
  /* ===== ファイルアップロード ===== */
  "file-upload": {
    id: "C-UP", tag: "<sgt-file-upload>", name: "ファイルアップロード", priority: "must",
    desc: "ドラッグ&ドロップ + クリック選択。サイズ・拡張子の制限、複数ファイル、進捗、エラー、再試行に対応。",
    accept: "受入: 制限超過時 `sgt:reject` を発火し、許容外ファイルは弾く。`accept` プロパティで MIME 限定。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">empty</div>
          <div class="variant__stage"><div class="dropzone">
            <div class="dropzone__icon">${I5.upload}</div>
            <div><strong>ここにファイルをドロップ</strong> または <a href="#">ファイルを選択</a></div>
            <div class="muted small">CSV / Excel / PDF / 各最大 10MB ／ 同時5ファイルまで</div>
          </div></div></div>
        <div class="variant"><div class="variant__label">drag-over</div>
          <div class="variant__stage"><div class="dropzone dropzone--over">
            <div class="dropzone__icon" style="color: var(--accent);">${I5.upload}</div>
            <strong style="color: var(--accent);">離してアップロード</strong>
          </div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">uploading（複数ファイル）</div>
          <div class="variant__stage"><ul class="file-list">
            <li><span class="file-icon mono">CSV</span><div class="file__main"><div class="file__name">customers_2026Q1.csv <span class="muted small">(2.4MB)</span></div><div class="progress"><div class="progress__bar" style="width: 100%;"></div></div></div><span class="badge badge--approved">${I5.check}<span>完了</span></span></li>
            <li><span class="file-icon mono">XLS</span><div class="file__main"><div class="file__name">products_master.xlsx <span class="muted small">(8.1MB)</span></div><div class="progress"><div class="progress__bar" style="width: 64%;"></div></div></div><span class="muted small mono">64%</span></li>
            <li><span class="file-icon mono file-icon--err">CSV</span><div class="file__main"><div class="file__name">orders.csv <span class="muted small">(12.4MB)</span></div><div class="field__error">${I5.warn}<span>10MB を超えています</span></div></div><button class="btn btn--icon btn--sm" aria-label="削除">${I5.close}</button></li>
            <li><span class="file-icon mono">PDF</span><div class="file__main"><div class="file__name">contract_v2.pdf <span class="muted small">(0.6MB)</span></div><div class="progress"><div class="progress__bar progress__bar--paused" style="width: 30%;"></div></div></div><button class="btn btn--ghost btn--sm">再試行</button></li>
          </ul></div></div>
      </div>`
  },

  /* ===== CSV取込ボタン ===== */
  "csv-import-btn": {
    id: "C-CSVI", tag: "<sgt-csv-import-button>", name: "CSV取込ボタン", priority: "must",
    desc: "CSV/Excel取り込み専用ボタン。ファイル選択 → 文字コード自動判定 → ヘッダ確認モーダルへ遷移するパターンを内包。",
    accept: "受入: Shift_JIS と UTF-8 を自動判定。`sgt:csv-loaded` で `{rows, columns, encoding}` を発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><button class="btn">${I5.download}<span>CSV取込</span></button></div></div>
        <div class="variant"><div class="variant__label">primary</div>
          <div class="variant__stage"><button class="btn btn--primary">${I5.download}<span>CSVから登録</span></button></div></div>
        <div class="variant"><div class="variant__label">progress</div>
          <div class="variant__stage"><button class="btn btn--loading"><span class="spinner"></span>読込中… <span class="muted small">(124 / 320行)</span></button></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">テンプレ DL 付き（推奨）</div>
          <div class="variant__stage"><div class="row">
            <button class="btn btn--primary">${I5.download}<span>CSVを取込む</span></button>
            <a href="#" class="btn btn--link btn--sm">${I5.download}<span>テンプレートをダウンロード</span></a>
            <span class="muted small">Shift_JIS / UTF-8（BOM有無不問）対応</span>
          </div></div></div>
      </div>`
  },

  /* ===== CSV出力ボタン ===== */
  "csv-export-btn": {
    id: "C-CSVE", tag: "<sgt-csv-export-button>", name: "CSV出力ボタン", priority: "must",
    desc: "現在の一覧やフィルタ結果をCSVで出力。文字コード・区切り文字・列の選択肢付きドロップダウンを推奨。",
    accept: "受入: フィルタが効いている場合は『絞込結果のみ』『全件』のどちらか選べる。`sgt:csv-export` を発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><button class="btn btn--ghost">${I5.upload}<span>CSV出力</span></button></div></div>
        <div class="variant"><div class="variant__label">split-button</div>
          <div class="variant__stage"><div class="btn-group">
            <button class="btn btn--ghost">${I5.upload}<span>CSV出力</span></button>
            <button class="btn btn--ghost btn--icon" aria-label="出力オプション">${I5.caret}</button>
          </div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">option panel（open）</div>
          <div class="variant__stage"><div class="popover" style="max-width: 360px;">
            <h5 class="popover__head">CSV 出力オプション</h5>
            <div class="popover__body">
              <div class="field"><label class="field__label">対象</label>
                <div class="col">
                  <span class="radio checked"><span class="radio__dot"></span>絞込結果のみ <span class="muted small">（24件）</span></span>
                  <span class="radio"><span class="radio__dot"></span>全件 <span class="muted small">（245件）</span></span>
                </div></div>
              <div class="field"><label class="field__label">文字コード</label>
                <div class="row">
                  <span class="radio checked"><span class="radio__dot"></span>UTF-8（BOM付）</span>
                  <span class="radio"><span class="radio__dot"></span>Shift_JIS</span>
                </div></div>
              <div class="field"><label class="field__label">出力する列</label>
                <div class="col">
                  <span class="check checked"><span class="check__box">${I5.check}</span>見積番号</span>
                  <span class="check checked"><span class="check__box">${I5.check}</span>取引先</span>
                  <span class="check checked"><span class="check__box">${I5.check}</span>合計</span>
                  <span class="check"><span class="check__box"></span>担当者</span>
                  <span class="check"><span class="check__box"></span>承認経路</span>
                </div></div>
            </div>
            <div class="popover__foot">
              <button class="btn btn--ghost btn--sm">キャンセル</button>
              <button class="btn btn--primary btn--sm">${I5.upload}<span>出力する</span></button>
            </div>
          </div></div></div>
      </div>`
  },

  /* ===== CSV取込プレビュー ===== */
  "csv-preview": {
    id: "C-CSVP", tag: "<sgt-csv-preview>", name: "CSV取込プレビュー", priority: "must",
    desc: "ヘッダマッピング → 行プレビュー → 確定の3ステップ。型ミスマッチや必須欠損を即座に表示する。",
    accept: "受入: 列の対応関係を保存し、次回取り込み時に自動適用（プロジェクト単位）。",
    body: `
      <div class="row" style="margin-bottom: 12px;">
        <span class="badge badge--info">customers_2026Q1.csv</span>
        <span class="muted small">320行 ／ エンコード: UTF-8（BOM付）／ 区切り: , ／ 改行: CRLF</span>
      </div>
      <h4 class="sub">列マッピング</h4>
      <div class="map-grid">
        <div class="map-row">
          <div class="map-row__src"><span class="muted small mono">CSV列 1</span><div class="mono">顧客コード</div></div>
          <div class="map-row__arrow">${I5.arrow}</div>
          <div class="map-row__dst"><div class="input"><span class="input__value">顧客コード（code）</span><span class="input__suffix">${I5.caret}</span></div></div>
          <div class="map-row__status"><span class="badge badge--approved">${I5.check}<span>マッチ</span></span></div>
        </div>
        <div class="map-row">
          <div class="map-row__src"><span class="muted small mono">CSV列 2</span><div class="mono">顧客名</div></div>
          <div class="map-row__arrow">${I5.arrow}</div>
          <div class="map-row__dst"><div class="input"><span class="input__value">顧客名（name）</span><span class="input__suffix">${I5.caret}</span></div></div>
          <div class="map-row__status"><span class="badge badge--approved">${I5.check}<span>マッチ</span></span></div>
        </div>
        <div class="map-row">
          <div class="map-row__src"><span class="muted small mono">CSV列 3</span><div class="mono">電話番号</div></div>
          <div class="map-row__arrow">${I5.arrow}</div>
          <div class="map-row__dst"><div class="input"><span class="input__value">電話番号（phone）</span><span class="input__suffix">${I5.caret}</span></div></div>
          <div class="map-row__status"><span class="badge badge--warn">${I5.warn}<span>形式要確認</span></span></div>
        </div>
        <div class="map-row">
          <div class="map-row__src"><span class="muted small mono">CSV列 4</span><div class="mono">フリガナ</div></div>
          <div class="map-row__arrow">${I5.arrow}</div>
          <div class="map-row__dst"><div class="input input--warn"><span class="input__value muted">未指定（取込しない）</span><span class="input__suffix">${I5.caret}</span></div></div>
          <div class="map-row__status"><span class="muted small">スキップ</span></div>
        </div>
      </div>
      <h4 class="sub" style="margin-top: 16px;">プレビュー（先頭5行）</h4>
      <table class="table">
        <thead><tr><th>#</th><th>顧客コード</th><th>顧客名</th><th>電話番号</th><th>状態</th></tr></thead>
        <tbody>
          <tr><td class="mono small">1</td><td class="mono">C-00321</td><td>株式会社 サンプル商事</td><td class="mono">03-1234-5678</td><td><span class="badge badge--approved">${I5.check}<span>OK</span></span></td></tr>
          <tr class="zebra"><td class="mono small">2</td><td class="mono">C-00498</td><td>サンプル工業 株式会社</td><td class="mono">06-2345-6789</td><td><span class="badge badge--approved">${I5.check}<span>OK</span></span></td></tr>
          <tr class="row--err"><td class="mono small">3</td><td class="mono">C-01102</td><td>サンプルテック 合同会社</td><td class="mono" style="color: var(--danger);">tel：080-12345</td><td><span class="badge badge--rejected">${I5.warn}<span>形式不正</span></span></td></tr>
          <tr class="zebra"><td class="mono small">4</td><td class="mono">C-01203</td><td>株式会社 シゴト</td><td class="mono">03-9999-0000</td><td><span class="badge badge--approved">${I5.check}<span>OK</span></span></td></tr>
          <tr class="row--warn"><td class="mono small">5</td><td class="mono"></td><td>個人事業主 鈴木</td><td class="mono">090-1234-5678</td><td><span class="badge badge--warn">${I5.warn}<span>コード自動採番</span></span></td></tr>
        </tbody>
      </table>
      <div class="row" style="justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--line);">
        <div>
          <span class="badge badge--approved">OK 314件</span>
          <span class="badge badge--warn">警告 4件</span>
          <span class="badge badge--rejected">エラー 2件</span>
        </div>
        <div class="row">
          <button class="btn btn--ghost">キャンセル</button>
          <button class="btn">エラー行をスキップして取込</button>
          <button class="btn btn--primary">取込を確定する</button>
        </div>
      </div>`
  },

  /* ===== CSVエラー一覧 ===== */
  "csv-error-list": {
    id: "C-CSVL", tag: "<sgt-csv-error-list>", name: "CSVエラー一覧", priority: "must",
    desc: "取込に失敗した行を、行番号・列名・原因とともに一覧表示。クリックで該当行にジャンプ。",
    accept: "受入: エラーCSVをダウンロードできる（同フォーマット＋エラー列を末尾に追加）。",
    body: `
      <div class="alert alert--err" style="margin-bottom: 12px;">${I5.warn}<div><strong>2件のエラーで取込できませんでした</strong><div class="muted small">エラー行をスキップして登録するか、ファイルを修正して再度アップロードしてください。</div></div>
        <button class="btn btn--ghost btn--sm">${I5.upload}<span>エラーCSVをDL</span></button>
      </div>
      <table class="table">
        <thead><tr><th style="width: 50px;">行</th><th style="width: 140px;">列</th><th>原因</th><th>値</th><th></th></tr></thead>
        <tbody>
          <tr><td class="mono">3</td><td>電話番号</td><td>形式が不正です。半角ハイフン区切りで入力してください。</td><td class="mono" style="color: var(--danger);">tel：080-12345</td><td><a href="#" class="btn btn--link btn--sm">行へ移動</a></td></tr>
          <tr class="zebra"><td class="mono">17</td><td>顧客コード</td><td>すでに同じコード（C-00321）が存在します。</td><td class="mono">C-00321</td><td><a href="#" class="btn btn--link btn--sm">既存と比較</a></td></tr>
          <tr><td class="mono">42</td><td>登録番号</td><td>T+13桁の形式ではありません。</td><td class="mono" style="color: var(--danger);">T123</td><td><a href="#" class="btn btn--link btn--sm">行へ移動</a></td></tr>
          <tr class="zebra"><td class="mono">88</td><td>請求先</td><td>顧客マスタに該当する取引先が見つかりません。</td><td>サンプル合同会社</td><td><a href="#" class="btn btn--link btn--sm">新規作成</a></td></tr>
        </tbody>
      </table>`
  },

  /* ===== 差分表示 ===== */
  "diff-view": {
    id: "C-DIFF", tag: "<sgt-diff-view>", name: "差分表示", priority: "must",
    desc: "編集前 / 編集後の差分。フィールド単位 / 並列表示 / 統合表示の3レイアウト。承認・操作履歴と組み合わせて使う。",
    accept: "受入: 変更フィールドのみ表示する `compact` モードを持つ。同値はグレーアウト。",
    body: `
      <div class="variants">
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">フィールド単位（compact）</div>
          <div class="variant__stage"><div class="confirm">
            <div class="confirm__row"><span class="lbl">field</span><span>変更前</span><span>変更後</span></div>
            <div class="confirm__row changed"><span class="lbl">合計金額</span><span class="old">¥2,750,000</span><span class="new">¥3,045,900</span></div>
            <div class="confirm__row changed"><span class="lbl">有効期限</span><span class="old">2026-05-10</span><span class="new">2026-05-26</span></div>
            <div class="confirm__row"><span class="lbl">取引先</span><span class="muted">株式会社 サンプル商事</span><span class="muted">株式会社 サンプル商事</span></div>
            <div class="confirm__row"><span class="lbl">担当</span><span class="muted">佐藤 花子</span><span class="muted">佐藤 花子</span></div>
            <div class="confirm__row added"><span class="lbl">備考</span><span class="muted">—</span><span class="new">支払期限を5月末に変更</span></div>
            <div class="confirm__row removed"><span class="lbl">割引欄</span><span class="old">¥50,000</span><span class="muted">—</span></div>
          </div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">並列（テキスト差分）</div>
          <div class="variant__stage"><div class="diff-pair">
            <div class="diff-pane">
              <div class="diff-pane__head">変更前 / v3</div>
              <pre class="diff-body">本件は新規顧客の<span class="diff-rm">初回</span>案件のため、
価格の妥当性を含めご<span class="diff-rm">検討</span>をお願いします。</pre>
            </div>
            <div class="diff-pane">
              <div class="diff-pane__head">変更後 / v4</div>
              <pre class="diff-body">本件は新規顧客の<span class="diff-add">第二回</span>案件のため、
価格の妥当性を含めご<span class="diff-add">確認</span>をお願いします。
<span class="diff-add">納期は柔軟に調整可能です。</span></pre>
            </div>
          </div></div></div>
      </div>`
  },

  /* ===== 顧客選択 ===== */
  "customer-picker": {
    id: "B-CUS", tag: "<sgt-customer-picker>", name: "顧客選択", priority: "must",
    desc: "顧客マスタからの選択。コード・カナ・取引先名で検索、最近選択した取引先・お気に入りを上位表示。",
    accept: "受入: ↑↓で移動、Enter で選択、Cmd/Ctrl+K で開く。`sgt:select` で `{code, name, billing}` を発火。",
    body: `
      <div class="row" style="align-items: flex-start; gap: 16px;">
        <div style="flex: 1; max-width: 480px;">
          <div class="combo">
            <div class="search search--focus">${I5.search}<input value="サンプル" /></div>
            <ul class="combo__results combo__results--rich">
              <li><span class="muted small">最近選択した取引先</span></li>
              <li>
                <div class="picker-item"><strong>株式会社 サンプル商事</strong><span class="muted small mono">C-00321</span></div>
                <div class="muted small">〒100-0001 東京都千代田区千代田1-1 ／ 担当: 佐藤 花子</div>
              </li>
              <li><span class="muted small">候補（3件）</span></li>
              <li class="sel">
                <div class="picker-item"><strong>株式会社 <mark>サンプル</mark>商事</strong><span class="muted small mono">C-00321</span><span class="badge badge--info">主要</span></div>
                <div class="muted small">業務UI導入支援 ／ 締日: 月末 ／ 支払: 翌月末</div>
              </li>
              <li>
                <div class="picker-item"><strong><mark>サンプル</mark>工業 株式会社</strong><span class="muted small mono">C-00498</span></div>
                <div class="muted small">定期保守 ／ 締日: 20日 ／ 支払: 翌月20日</div>
              </li>
              <li>
                <div class="picker-item"><strong><mark>サンプル</mark>テック 合同会社</strong><span class="muted small mono">C-01102</span></div>
                <div class="muted small">追加機能見積 ／ 締日: 月末 ／ 支払: 翌々月末</div>
              </li>
              <li class="combo__results__foot"><a href="#" class="btn btn--link btn--sm">${I5.plus}<span>新しい取引先を登録</span></a><span class="muted small">3 / 245件 表示</span></li>
            </ul></div>
        </div>
        <div style="flex: 1; max-width: 360px;">
          <div class="variant__label">選択後</div>
          <div class="picker-card">
            <div class="row" style="justify-content: space-between;">
              <strong>株式会社 サンプル商事</strong>
              <button class="btn btn--icon btn--sm" aria-label="クリア">${I5.close}</button>
            </div>
            <div class="muted small mono">C-00321 ／ 東京営業所</div>
            <div class="muted small">〒100-0001 東京都千代田区千代田1-1</div>
            <div class="muted small">担当: 佐藤 花子 (sato@example.com)</div>
            <div class="row" style="margin-top: 6px;">
              <span class="badge badge--info">支払: 翌月末</span>
              <span class="badge badge--issued">適格事業者</span>
            </div>
          </div>
        </div>
      </div>`
  },

  /* ===== 商品選択 ===== */
  "product-picker": {
    id: "B-PRD", tag: "<sgt-product-picker>", name: "商品選択", priority: "must",
    desc: "商品マスタからの選択。カテゴリ・税率（10%/8%）・在庫を一覧で確認しながら選べる。",
    accept: "受入: 単一・複数モード切替可。複数モードでは選択済みチップを上部に並べる。",
    body: `
      <div class="row" style="margin-bottom: 8px;">
        <div class="search" style="flex: 1; max-width: 360px;">${I5.search}<input placeholder="品目名 / コード / カテゴリ" /></div>
        <div class="btn-group">
          <button class="btn btn--ghost btn--sm">すべて</button>
          <button class="btn btn--primary btn--sm">サービス</button>
          <button class="btn btn--ghost btn--sm">物品</button>
          <button class="btn btn--ghost btn--sm">経費</button>
        </div>
        <span class="muted small">3件選択中</span>
      </div>
      <div class="chips" style="margin-bottom: 8px;">
        <span class="chip">導入支援${I5.close}</span>
        <span class="chip">設計レビュー${I5.close}</span>
        <span class="chip">関連書籍${I5.close}</span>
      </div>
      <table class="table">
        <thead><tr><th></th><th>コード</th><th>品名</th><th>カテゴリ</th><th class="num">標準単価</th><th>税率</th><th>状態</th></tr></thead>
        <tbody>
          <tr class="sel"><td><span class="check checked"><span class="check__box">${I5.check}</span></span></td>
            <td class="mono">P-1001</td><td>導入支援</td><td>サービス</td>
            <td class="num mono">¥1,200,000</td><td><span class="rate-pill rate-pill--active">10%</span></td><td><span class="badge badge--approved">${I5.check}<span>取扱中</span></span></td></tr>
          <tr class="zebra sel"><td><span class="check checked"><span class="check__box">${I5.check}</span></span></td>
            <td class="mono">P-1002</td><td>設計レビュー</td><td>サービス</td>
            <td class="num mono">¥15,000</td><td><span class="rate-pill rate-pill--active">10%</span></td><td><span class="badge badge--approved">${I5.check}<span>取扱中</span></span></td></tr>
          <tr><td><span class="check"><span class="check__box"></span></span></td>
            <td class="mono">P-1003</td><td>初期セットアップ</td><td>サービス</td>
            <td class="num mono">¥98,000</td><td><span class="rate-pill rate-pill--active">10%</span></td><td><span class="badge badge--warn">${I5.warn}<span>個別見積推奨</span></span></td></tr>
          <tr class="zebra sel"><td><span class="check checked"><span class="check__box">${I5.check}</span></span></td>
            <td class="mono">P-2014</td><td>関連書籍</td><td>物品</td>
            <td class="num mono">¥3,000</td><td><span class="rate-pill rate-pill--reduced">8%</span></td><td><span class="badge badge--info">在庫: 24冊</span></td></tr>
          <tr><td><span class="check"><span class="check__box"></span></span></td>
            <td class="mono">P-3007</td><td>研修旅費</td><td>経費</td>
            <td class="num mono">—</td><td><span class="rate-pill">非課税</span></td><td><span class="badge badge--draft">取扱停止</span></td></tr>
        </tbody>
      </table>
      <div class="row" style="justify-content: flex-end; margin-top: 12px;">
        <button class="btn btn--ghost btn--sm">キャンセル</button>
        <button class="btn btn--primary btn--sm">3件を明細に追加</button>
      </div>`
  },

  /* ===== 担当者選択 ===== */
  "assignee-picker": {
    id: "B-ASG", tag: "<sgt-assignee-picker>", name: "担当者選択", priority: "must",
    desc: "ユーザーディレクトリからの選択。アバター・役職・部署をカード化。チームを丸ごと指定するモードも持つ。",
    accept: "受入: 不在期間中は注意マークを出し、選択しても警告アラートを表示。",
    body: `
      <div class="row" style="align-items: flex-start; gap: 16px;">
        <div style="flex: 1; max-width: 460px;">
          <div class="search" style="margin-bottom: 8px;">${I5.search}<input value="営業" /></div>
          <ul class="people-list">
            <li><span class="avatar" data-init="佐">佐</span>
              <div class="people__main"><strong>佐藤 花子</strong> <span class="muted small">／ 営業部 課長</span><div class="muted small">sato@example.com ／ 東京</div></div>
              <span class="badge badge--approved">${I5.check}<span>選択中</span></span></li>
            <li><span class="avatar" data-init="山">山</span>
              <div class="people__main"><strong>山田 太郎</strong> <span class="muted small">／ 営業部 部長</span><div class="muted small">yamada@example.com ／ 東京</div></div>
              <button class="btn btn--ghost btn--sm">選択</button></li>
            <li><span class="avatar avatar--out" data-init="鈴">鈴</span>
              <div class="people__main"><strong>鈴木 一郎</strong> <span class="badge badge--warn">${I5.warn}<span>不在 〜04/30</span></span><div class="muted small">suzuki@example.com ／ 大阪</div></div>
              <button class="btn btn--ghost btn--sm">選択</button></li>
            <li><span class="avatar" data-init="高">高</span>
              <div class="people__main"><strong>高橋 美咲</strong> <span class="muted small">／ 営業部 主任</span><div class="muted small">takahashi@example.com ／ 福岡</div></div>
              <button class="btn btn--ghost btn--sm">選択</button></li>
          </ul>
        </div>
        <div style="flex: 1; max-width: 320px;">
          <div class="variant__label">team モード</div>
          <div class="picker-card">
            <strong>営業部 全体</strong>
            <div class="muted small">12名 ／ 課長: 佐藤 花子</div>
            <div class="row" style="margin: 8px 0;">
              <span class="avatar avatar--xs" data-init="佐">佐</span>
              <span class="avatar avatar--xs" data-init="山">山</span>
              <span class="avatar avatar--xs" data-init="鈴">鈴</span>
              <span class="avatar avatar--xs" data-init="高">高</span>
              <span class="muted small">+8</span>
            </div>
            <button class="btn btn--ghost btn--sm" style="width: 100%;">この部署をまるごと指定</button>
          </div>
        </div>
      </div>`
  },

  /* ===== 都道府県選択 ===== */
  "prefecture-select": {
    id: "B-PREF", tag: "<sgt-prefecture-select>", name: "都道府県選択", priority: "must",
    desc: "47都道府県のセレクト。地方ごとにグループ化、地方フィルタ、コードと名前のどちらでも検索可。",
    accept: "受入: 値は ISO-3166-2:JP コード（例: JP-13）。`label-only` で表示名のみ返す。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">セレクト（select）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">都道府県</label>
            <div class="combo">
              <div class="input input--focus"><span class="input__value">東京都</span><span class="input__suffix">${I5.caret}</span></div>
              <ul class="combo__results">
                <li class="combo__group">関東</li>
                <li>茨城県</li><li>栃木県</li><li>群馬県</li><li>埼玉県</li><li>千葉県</li>
                <li class="sel">${I5.check}<span>東京都</span></li>
                <li>神奈川県</li>
                <li class="combo__group">中部</li>
                <li>新潟県</li><li>富山県</li>
              </ul></div></div></div></div>
        <div class="variant"><div class="variant__label">地方フィルタ</div>
          <div class="variant__stage">
            <div class="row" style="flex-wrap: wrap; margin-bottom: 8px;">
              <button class="btn btn--ghost btn--sm">北海道・東北</button>
              <button class="btn btn--primary btn--sm">関東</button>
              <button class="btn btn--ghost btn--sm">中部</button>
              <button class="btn btn--ghost btn--sm">近畿</button>
              <button class="btn btn--ghost btn--sm">中国・四国</button>
              <button class="btn btn--ghost btn--sm">九州・沖縄</button>
            </div>
            <div class="prefs">
              <button class="prefs__btn">茨城</button><button class="prefs__btn">栃木</button>
              <button class="prefs__btn">群馬</button><button class="prefs__btn">埼玉</button>
              <button class="prefs__btn">千葉</button>
              <button class="prefs__btn prefs__btn--active">${I5.check}<span>東京</span></button>
              <button class="prefs__btn">神奈川</button>
            </div></div></div>
      </div>`
  },

  /* ===== 年度選択 ===== */
  "fiscal-year-picker": {
    id: "B-FY", tag: "<sgt-fiscal-year-picker>", name: "年度選択", priority: "must",
    desc: "和暦/西暦切替、年度開始月（4月始まり等）、`今年度`/`前年度`/`期間指定` のクイックボタン。",
    accept: "受入: 値は ISO 期間文字列 `2026-04-01/2027-03-31`。`startMonth` で年度開始月を変更可能。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">標準（4月始まり）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">対象年度</label>
            <div class="row">
              <div class="input"><span class="input__value mono">FY2026</span><span class="input__suffix">${I5.caret}</span></div>
              <span class="muted small">2026-04-01 〜 2027-03-31</span>
            </div></div></div></div>
        <div class="variant"><div class="variant__label">和暦表示</div>
          <div class="variant__stage"><div class="field"><label class="field__label">対象年度</label>
            <div class="combo">
              <div class="input input--focus"><span class="input__value">令和8年度</span><span class="input__suffix mono small">FY2026</span><span class="input__suffix">${I5.caret}</span></div>
              <ul class="combo__results">
                <li>令和10年度 <span class="combo__code mono">FY2028</span></li>
                <li>令和9年度 <span class="combo__code mono">FY2027</span></li>
                <li class="sel">${I5.check}<span>令和8年度</span><span class="combo__code mono">FY2026</span></li>
                <li>令和7年度 <span class="combo__code mono">FY2025</span></li>
                <li>令和6年度 <span class="combo__code mono">FY2024</span></li>
              </ul></div></div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">クイック + 期間指定</div>
          <div class="variant__stage"><div class="row" style="flex-wrap: wrap;">
            <button class="btn btn--ghost btn--sm">前年度</button>
            <button class="btn btn--primary btn--sm">今年度</button>
            <button class="btn btn--ghost btn--sm">来年度</button>
            <button class="btn btn--ghost btn--sm">直近12か月</button>
            <span style="border-left: 1px solid var(--line); height: 24px;"></span>
            <span class="muted small">期間</span>
            <div class="input" style="min-width: 120px;"><span class="input__prefix">${I5.calendar}</span><span class="input__value mono">2026-04-01</span></div>
            <span class="muted small">〜</span>
            <div class="input" style="min-width: 120px;"><span class="input__prefix">${I5.calendar}</span><span class="input__value mono">2027-03-31</span></div>
          </div></div></div>
      </div>`
  },

  /* ===== 会社情報入力 ===== */
  "company-input": {
    id: "B-CO", tag: "<sgt-company-input>", name: "会社情報入力", priority: "must",
    desc: "法人名・法人番号・代表者・住所・電話・登録番号 を1セットで管理。法人番号 → 商号・所在地 自動補完を内包。",
    accept: "受入: 法人番号 13桁から国税庁API経由で商号・本店所在地を取得し確認後反映。",
    body: `
      <div class="form-section">
        <div class="hf"><label class="hf__label">法人番号 <span class="req req--rec">推奨</span></label>
          <div class="hf__ctrl row">
            <div class="input" style="max-width: 220px;"><span class="input__value mono">9012301234567</span></div>
            <button class="btn btn--sm">${I5.search}<span>商号を取得</span></button>
            <span class="muted small">国税庁の登録情報から自動で取得します</span>
          </div></div>
        <div class="hf"><label class="hf__label">商号 / 法人名 <span class="req">必須</span></label>
          <div class="hf__ctrl"><div class="input"><span class="input__value">合同会社 シゴト</span></div></div></div>
        <div class="hf"><label class="hf__label">商号フリガナ</label>
          <div class="hf__ctrl"><div class="input"><span class="input__value">ゴウドウガイシャ シゴト</span></div></div></div>
        <div class="hf"><label class="hf__label">代表者</label>
          <div class="hf__ctrl row">
            <div class="input" style="max-width: 200px;"><span class="input__value">山田 太郎</span></div>
            <span class="muted small">役職: 代表社員</span>
          </div></div>
        <div class="hf"><label class="hf__label">所在地 <span class="req">必須</span></label>
          <div class="hf__ctrl col">
            <div class="input" style="max-width: 200px;"><span class="input__prefix">〒</span><span class="input__value mono">100-0001</span></div>
            <div class="input"><span class="input__value">東京都千代田区千代田1-1 シゴトビル 5F</span></div>
          </div></div>
        <div class="hf"><label class="hf__label">電話 / FAX</label>
          <div class="hf__ctrl row">
            <div class="input" style="max-width: 180px;"><span class="input__value mono">03-1234-5678</span></div>
            <span class="muted small">FAX</span>
            <div class="input" style="max-width: 180px;"><span class="input__value mono">03-1234-5679</span></div>
          </div></div>
        <div class="hf"><label class="hf__label">適格請求書 登録番号</label>
          <div class="hf__ctrl"><div class="input"><span class="input__prefix mono">T</span><span class="input__value mono">9012301234567</span><span class="input__suffix" style="color: var(--ok)">${I5.check}</span></div>
            <span class="field__ok">${I5.check}<span>国税庁DBで確認できました（最終確認: 2026-04-26）</span></span></div></div>
      </div>`
  },

  /* ===== 氏名入力 ===== */
  "name-input": {
    id: "B-NAME", tag: "<sgt-name-input>", name: "氏名入力", priority: "must",
    desc: "姓・名を分割管理。スペース有無で1欄入力も許容し内部で分割。半角/全角の自動判定とフリガナ自動生成オプション。",
    accept: "受入: 「山田　太郎」「山田 太郎」「やまだ たろう」を吸収し `{lastName, firstName}` を返す。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">分割（推奨）</div>
          <div class="variant__stage">
            <div class="row">
              <div class="field"><label class="field__label">姓 <span class="req">必須</span></label>
                <div class="input" style="max-width: 140px;"><span class="input__value">山田</span></div></div>
              <div class="field"><label class="field__label">名 <span class="req">必須</span></label>
                <div class="input" style="max-width: 140px;"><span class="input__value">太郎</span></div></div>
            </div></div></div>
        <div class="variant"><div class="variant__label">単一欄（自動分割）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">氏名 <span class="req">必須</span></label>
            <div class="input"><span class="input__value">山田　太郎</span></div>
            <span class="field__hint">スペース（半角/全角）で姓・名を区切ります。確定時に <span class="mono">山田 / 太郎</span> に分割。</span></div></div></div>
        <div class="variant"><div class="variant__label">氏名 + フリガナ</div>
          <div class="variant__stage">
            <div class="row" style="margin-bottom: 8px;">
              <div class="input" style="flex: 1;"><span class="input__value">山田</span></div>
              <div class="input" style="flex: 1;"><span class="input__value">太郎</span></div>
            </div>
            <div class="row">
              <div class="input" style="flex: 1;"><span class="input__prefix muted small">セイ</span><span class="input__value">ヤマダ</span></div>
              <div class="input" style="flex: 1;"><span class="input__prefix muted small">メイ</span><span class="input__value">タロウ</span></div>
            </div>
            <span class="field__hint">${I5.info}<span>漢字を入力すると自動でフリガナを生成します（編集可）</span></span></div></div>
        <div class="variant"><div class="variant__label">敬称付き</div>
          <div class="variant__stage"><div class="row">
            <div class="input" style="max-width: 110px;"><span class="input__value">山田</span></div>
            <div class="input" style="max-width: 110px;"><span class="input__value">太郎</span></div>
            <div class="input" style="max-width: 80px;"><span class="input__value">様</span><span class="input__suffix">${I5.caret}</span></div>
          </div></div></div>
      </div>`
  },

  /* ===== フリガナ入力 ===== */
  "kana-input": {
    id: "B-KANA", tag: "<sgt-kana-input>", name: "フリガナ入力", priority: "must",
    desc: "全角カタカナ専用入力。ひらがな・半角カナを自動変換し、漢字混入は警告。氏名欄と連動して自動生成も可能。",
    accept: "受入: `やまだ` → `ヤマダ`、`ﾔﾏﾀﾞ` → `ヤマダ`。漢字混入時は `sgt:invalid` を発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">default</div>
          <div class="variant__stage"><div class="field"><label class="field__label">フリガナ <span class="req">必須</span></label>
            <div class="input"><span class="input__value">ヤマダ タロウ</span></div>
            <span class="field__hint">全角カタカナで入力してください。</span></div></div></div>
        <div class="variant"><div class="variant__label">ひらがな自動変換</div>
          <div class="variant__stage"><div class="field"><label class="field__label">フリガナ</label>
            <div class="input input--focus"><span class="input__value">やまだ たろう<span class="input__caret"></span></span></div>
            <span class="field__hint">${I5.info}<span>確定時に <span class="mono">ヤマダ タロウ</span> に変換します</span></span></div></div></div>
        <div class="variant"><div class="variant__label">半角カナ自動変換</div>
          <div class="variant__stage"><div class="field"><label class="field__label">フリガナ</label>
            <div class="input"><span class="input__value mono">ﾔﾏﾀﾞ ﾀﾛｳ</span></div>
            <span class="field__hint">半角カタカナは全角に正規化されます。</span></div></div></div>
        <div class="variant"><div class="variant__label">エラー（漢字混入）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">フリガナ <span class="req">必須</span></label>
            <div class="input input--error"><span class="input__value">山田 タロウ</span></div>
            <span class="field__error">${I5.warn}<span>カタカナのみで入力してください（漢字「山田」が含まれています）。</span></span></div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">氏名連動（自動生成 + 編集可）</div>
          <div class="variant__stage"><div class="row" style="align-items: flex-end;">
            <div class="field"><label class="field__label">氏名</label>
              <div class="row"><div class="input" style="max-width: 110px;"><span class="input__value">山田</span></div>
              <div class="input" style="max-width: 110px;"><span class="input__value">太郎</span></div></div></div>
            <div style="color: var(--muted);">${I5.arrow}</div>
            <div class="field"><label class="field__label">フリガナ</label>
              <div class="row"><div class="input" style="max-width: 130px;"><span class="input__value">ヤマダ</span></div>
              <div class="input" style="max-width: 130px;"><span class="input__value">タロウ</span></div></div>
              <span class="field__hint">自動生成しました（編集可）</span></div>
          </div></div></div>
      </div>`
  },

  /* ===== 請求書ヘッダー ===== */
  "invoice-header": {
    id: "C-IHDR", tag: "<sgt-invoice-header>", name: "請求書ヘッダー", priority: "must",
    desc: "請求書詳細・編集画面の最上部。ステータス・番号・取引先・期日・操作ボタンを定型化。",
    accept: "受入: ステータスに応じて表示する操作ボタンが切り替わる（下書き → 編集／承認済 → 発行 etc）。",
    body: `
      <div class="page-hdr">
        <div class="page-hdr__crumb">
          <a href="#" class="muted small">請求書</a> <span class="muted">/</span>
          <a href="#" class="muted small">2026年4月</a> <span class="muted">/</span>
          <span class="muted small">INV-2026-0421</span>
        </div>
        <div class="page-hdr__main">
          <div class="page-hdr__title">
            <h1>請求書 <span class="mono">INV-2026-0421</span></h1>
            <span class="badge badge--pending">確認中</span>
            <span class="muted small">04-26 10:12 更新 ／ 佐藤 花子</span>
          </div>
          <div class="row">
            <button class="btn btn--ghost">${I5.print}<span>印刷</span></button>
            <button class="btn btn--ghost">${I5.upload}<span>PDFで保存</span></button>
            <button class="btn">下書き保存</button>
            <button class="btn btn--primary">発行する</button>
            <button class="btn btn--icon" aria-label="その他">${I5.drag}</button>
          </div>
        </div>
        <div class="page-hdr__meta">
          <div><span class="muted small">取引先</span><div>株式会社 サンプル商事</div></div>
          <div><span class="muted small">発行日</span><div class="mono">2026-04-26</div></div>
          <div><span class="muted small">支払期日</span><div class="mono">2026-05-31</div></div>
          <div><span class="muted small">請求金額</span><div class="mono"><strong>¥3,045,900</strong></div></div>
        </div>
      </div>`
  },

  /* ===== 見積書ヘッダー ===== */
  "quote-header": {
    id: "C-QHDR", tag: "<sgt-quote-header>", name: "見積書ヘッダー", priority: "must",
    desc: "見積書詳細・編集画面の最上部。発行日・有効期限・改定回数・取引先を1ブロックで集約。",
    accept: "受入: 改定回数 ≥ 2 で「改定履歴」リンクを自動表示。",
    body: `
      <div class="page-hdr">
        <div class="page-hdr__crumb">
          <a href="#" class="muted small">見積</a> <span class="muted">/</span>
          <a href="#" class="muted small">2026年4月</a> <span class="muted">/</span>
          <span class="muted small">Q-2026-0421</span>
        </div>
        <div class="page-hdr__main">
          <div class="page-hdr__title">
            <h1>見積書 <span class="mono">Q-2026-0421</span></h1>
            <span class="badge badge--review">申請中</span>
            <span class="badge badge--info">改定 v3 <a href="#" class="muted small" style="margin-left: 4px;">履歴を見る</a></span>
          </div>
          <div class="row">
            <button class="btn btn--ghost btn--sm">${I5.upload}<span>PDF</span></button>
            <button class="btn btn--ghost btn--sm">${I5.print}<span>印刷</span></button>
            <button class="btn btn--ghost btn--sm">複製して新規</button>
            <button class="btn">下書き保存</button>
            <button class="btn btn--primary">承認を依頼</button>
          </div>
        </div>
        <div class="page-hdr__meta">
          <div><span class="muted small">取引先</span><div>株式会社 サンプル商事</div></div>
          <div><span class="muted small">件名</span><div>業務UIライブラリ導入支援</div></div>
          <div><span class="muted small">発行日</span><div class="mono">2026-04-26</div></div>
          <div><span class="muted small">有効期限</span><div class="mono">2026-05-26 <span class="badge badge--warn">残8日</span></div></div>
          <div><span class="muted small">合計（税込）</span><div class="mono"><strong>¥3,045,900</strong></div></div>
        </div>
      </div>`
  },

  /* ===== 承認履歴 ===== */
  "approval-log": {
    id: "C-APV", tag: "<sgt-approval-log>", name: "承認履歴", priority: "must",
    desc: "申請 → 承認 → 発行 までの推移をタイムラインで可視化。差戻しコメントも同じ列に並ぶ。",
    accept: "受入: 各ステップに `who / when / comment / decision` を保持。承認/差戻しでステップアイコンが変化。",
    body: `
      <ol class="apv">
        <li class="apv__step apv__step--done">
          <div class="apv__head"><span class="avatar avatar--xs" data-init="佐">佐</span><strong>佐藤 花子</strong><span class="badge badge--info">起票</span><span class="muted small mono">04-24 10:12</span></div>
          <div class="muted small">取引先・明細を入力し、承認を依頼しました。</div>
        </li>
        <li class="apv__step apv__step--done">
          <div class="apv__head"><span class="avatar avatar--xs" data-init="山">山</span><strong>山田 太郎</strong><span class="badge badge--approved">${I5.check}<span>承認</span></span><span class="muted small mono">04-25 09:48</span></div>
          <div class="muted small">課長承認。金額・条件ともに問題ありません。</div>
        </li>
        <li class="apv__step apv__step--rejected">
          <div class="apv__head"><span class="avatar avatar--xs" data-init="高">高</span><strong>高橋 部長</strong><span class="badge badge--rejected">${I5.warn}<span>差戻し</span></span><span class="muted small mono">04-25 16:30</span></div>
          <div class="apv__comment">単価の根拠となる見積書原本を備考欄に添付してください。次回承認時に確認します。</div>
        </li>
        <li class="apv__step apv__step--done">
          <div class="apv__head"><span class="avatar avatar--xs" data-init="佐">佐</span><strong>佐藤 花子</strong><span class="badge badge--info">再申請</span><span class="muted small mono">04-26 09:00</span></div>
          <div class="muted small">原本PDFを添付し、合計金額を ¥2,750,000 → ¥3,045,900 に修正して再申請しました。</div>
        </li>
        <li class="apv__step apv__step--current">
          <div class="apv__head"><span class="avatar avatar--xs" data-init="高">高</span><strong>高橋 部長</strong><span class="badge badge--pending">承認待ち</span></div>
          <div class="muted small">SLA: 24時間以内（残 18時間）</div>
        </li>
        <li class="apv__step">
          <div class="apv__head"><span class="avatar avatar--xs avatar--mute" data-init="経">経</span><strong class="muted">経理確認</strong><span class="muted small">未着手</span></div>
        </li>
      </ol>`
  },

  /* ===== コメント欄 ===== */
  "comment-thread": {
    id: "C-CMT", tag: "<sgt-comment-thread>", name: "コメント欄", priority: "should",
    desc: "申請・案件単位のスレッド。@メンション・添付・引用・編集・既読を備える。",
    accept: "受入: @ 入力で候補リスト表示、選択で人物を関連付け（通知される）。",
    body: `
      <ul class="cmt">
        <li class="cmt__item"><span class="avatar" data-init="山">山</span>
          <div class="cmt__body">
            <div class="cmt__head"><strong>山田 太郎</strong><span class="muted small mono">04-25 09:48</span></div>
            <div class="cmt__text">課長承認しました。金額・条件ともに問題ありません。<br><strong style="color: var(--accent);">@佐藤花子</strong> 部長確認に進めてください。</div>
            <div class="cmt__actions"><a href="#" class="btn btn--link btn--sm">返信</a><a href="#" class="btn btn--link btn--sm">編集</a><span class="muted small">既読 3</span></div>
          </div></li>
        <li class="cmt__item"><span class="avatar" data-init="佐">佐</span>
          <div class="cmt__body">
            <div class="cmt__head"><strong>佐藤 花子</strong><span class="muted small mono">04-25 10:05</span></div>
            <div class="cmt__quote">課長承認しました。金額・条件ともに問題ありません。</div>
            <div class="cmt__text">承知しました。部長へ申請を回します。</div>
            <div class="cmt__attachment">${I5.upload}<span>quote_v2_supporting.pdf</span><span class="muted small">(0.6 MB)</span></div>
          </div></li>
        <li class="cmt__item cmt__item--err"><span class="avatar" data-init="高">高</span>
          <div class="cmt__body">
            <div class="cmt__head"><strong>高橋 部長</strong><span class="muted small mono">04-25 16:30</span><span class="badge badge--rejected">差戻し</span></div>
            <div class="cmt__text">単価の根拠となる見積書原本を備考欄に添付してください。<br>来月以降は同様の案件が増えるため、テンプレート化も検討してください。</div>
          </div></li>
        <li class="cmt__compose">
          <span class="avatar" data-init="あ">あ</span>
          <div class="cmt__body">
            <div class="textarea-stub" style="min-height: 64px;">@</div>
            <div class="popover popover--inline" style="margin-top: 4px;">
              <div class="popover__body" style="padding: 4px 0;">
                <div class="picker-row sel">${I5.check}<span class="avatar avatar--xs" data-init="山">山</span><strong>山田 太郎</strong><span class="muted small">営業部 部長</span></div>
                <div class="picker-row"><span class="avatar avatar--xs" data-init="鈴">鈴</span><strong>鈴木 一郎</strong><span class="muted small">営業部 主任</span></div>
                <div class="picker-row"><span class="avatar avatar--xs" data-init="高">高</span><strong>高橋 美咲</strong><span class="muted small">営業部 主任</span></div>
              </div></div>
            <div class="row" style="justify-content: flex-end; margin-top: 6px;">
              <button class="btn btn--ghost btn--sm">${I5.upload}<span>添付</span></button>
              <button class="btn btn--primary btn--sm">送信</button>
            </div></div></li>
      </ul>`
  },

  /* ===== 確認パネル ===== */
  "confirm-panel": {
    id: "C-CFM", tag: "<sgt-confirm-panel>", name: "確認パネル", priority: "must",
    desc: "送信前に内容をまとめて確認するためのパネル。フォームと同じ構造で読取専用化、変更箇所をハイライト。",
    accept: "受入: 編集ボタンを押すと該当セクションへスクロール+フォーカス。確定時は二重送信を防ぐ。",
    body: `
      <div class="alert alert--info" style="margin-bottom: 12px;">${I5.info}<div><strong>送信前の最終確認</strong><div class="muted small">下記の内容で承認を依頼します。一度送信すると編集には差戻しが必要です。</div></div></div>
      <div class="cfm">
        <section class="cfm__sec">
          <header class="cfm__head"><h4>取引先</h4><a href="#" class="btn btn--link btn--sm">編集</a></header>
          <div class="cfm__row"><span class="lbl">名称</span><span>株式会社 サンプル商事</span></div>
          <div class="cfm__row"><span class="lbl">担当</span><span>佐藤 花子</span></div>
          <div class="cfm__row"><span class="lbl">住所</span><span>〒100-0001 東京都千代田区千代田1-1</span></div>
        </section>
        <section class="cfm__sec">
          <header class="cfm__head"><h4>件名 / 期日</h4><a href="#" class="btn btn--link btn--sm">編集</a></header>
          <div class="cfm__row"><span class="lbl">件名</span><span>業務UIライブラリ導入支援 一式</span></div>
          <div class="cfm__row cfm__row--changed"><span class="lbl">合計金額</span><div><span class="old">¥2,750,000</span> ${I5.arrow} <span class="new"><strong>¥3,045,900</strong></span></div></div>
          <div class="cfm__row cfm__row--changed"><span class="lbl">有効期限</span><div><span class="old">2026-05-10</span> ${I5.arrow} <span class="new">2026-05-26</span></div></div>
        </section>
        <section class="cfm__sec">
          <header class="cfm__head"><h4>添付資料</h4><a href="#" class="btn btn--link btn--sm">編集</a></header>
          <div class="cfm__row"><span class="lbl">PDF</span><span>quote_v2_supporting.pdf <span class="muted small">(0.6 MB)</span></span></div>
        </section>
      </div>
      <div class="row" style="margin-top: 12px; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--line);">
        <span class="check checked"><span class="check__box">${I5.check}</span>承認内容を確認しました</span>
        <div class="row">
          <button class="btn btn--ghost">編集に戻る</button>
          <button class="btn btn--primary">この内容で承認を依頼する</button>
        </div>
      </div>`
  },

  /* ===== 操作履歴 ===== */
  "audit-log": {
    id: "C-AUD", tag: "<sgt-audit-log>", name: "操作履歴", priority: "must",
    desc: "誰が・いつ・何を・どう変えたかの監査ログ。フィルタ（人・期間・操作種別）と差分表示を統合。",
    accept: "受入: 1件あたりの差分は折りたたみ可能。CSV出力で監査対応。",
    body: `
      <div class="row" style="margin-bottom: 8px;">
        <span class="muted small">期間</span>
        <div class="input"><span class="input__prefix">${I5.calendar}</span><span class="input__value mono">2026-04-01</span></div>
        <span class="muted small">〜</span>
        <div class="input"><span class="input__prefix">${I5.calendar}</span><span class="input__value mono">2026-04-26</span></div>
        <span class="muted small">操作</span>
        <div class="input"><span class="input__value">すべて</span><span class="input__suffix">${I5.caret}</span></div>
        <button class="btn btn--ghost btn--sm">${I5.upload}<span>監査CSV</span></button>
      </div>
      <ul class="audit">
        <li class="audit__item">
          <span class="audit__when mono">04-26 10:12</span>
          <span class="avatar avatar--xs" data-init="佐">佐</span>
          <div class="audit__body">
            <div><strong>佐藤 花子</strong> が <a href="#">Q-2026-0421</a> を <span class="badge badge--info">更新</span></div>
            <div class="muted small">合計金額 ¥2,750,000 → ¥3,045,900 ／ 有効期限 2026-05-10 → 2026-05-26</div>
          </div>
        </li>
        <li class="audit__item">
          <span class="audit__when mono">04-26 09:48</span>
          <span class="avatar avatar--xs" data-init="山">山</span>
          <div class="audit__body">
            <div><strong>山田 太郎</strong> が <a href="#">Q-2026-0418</a> を <span class="badge badge--approved">${I5.check}<span>承認</span></span></div>
          </div>
        </li>
        <li class="audit__item">
          <span class="audit__when mono">04-25 18:00</span>
          <span class="avatar avatar--xs avatar--sys">SYS</span>
          <div class="audit__body">
            <div><strong>システム</strong> が <a href="#">products.csv</a> を <span class="badge badge--info">取込</span> <span class="muted small">320行（成功 314 / 警告 4 / エラー 2）</span></div>
          </div>
        </li>
        <li class="audit__item audit__item--danger">
          <span class="audit__when mono">04-25 14:08</span>
          <span class="avatar avatar--xs" data-init="高">高</span>
          <div class="audit__body">
            <div><strong>高橋 部長</strong> が <a href="#">Q-2026-0410</a> を <span class="badge badge--rejected">削除</span></div>
            <div class="muted small">削除理由: 重複案件のため。元データは30日間 ゴミ箱に保管。</div>
          </div>
        </li>
        <li class="audit__item">
          <span class="audit__when mono">04-25 09:30</span>
          <span class="avatar avatar--xs" data-init="鈴">鈴</span>
          <div class="audit__body">
            <div><strong>鈴木 一郎</strong> が <a href="#">顧客マスタ</a> から <strong>株式会社 旧商号工業</strong> を <span class="badge badge--info">改名</span></div>
            <div class="muted small">→ サンプル工業 株式会社 ／ 法人番号は同一（9012301234567）</div>
          </div>
        </li>
      </ul>`
  },

  /* ===== 検索条件パネル ===== */
  "search-panel": {
    id: "C-SP", tag: "<sgt-search-panel>", name: "検索条件パネル", priority: "must",
    desc: "複数条件のAND/OR検索。条件の保存・呼び出し（保存検索）を内蔵し、業務ユーザーの再利用を促す。",
    accept: "受入: 保存検索は名前付きで再呼び出し可能。`sgt:search` で条件オブジェクトを発火。",
    body: `
      <div class="search-panel">
        <header class="search-panel__head">
          <strong>検索条件</strong>
          <div class="row">
            <span class="muted small">保存検索</span>
            <div class="input" style="min-width: 200px;"><span class="input__value">今月の承認待ち</span><span class="input__suffix">${I5.caret}</span></div>
          </div>
        </header>
        <div class="search-panel__body">
          <div class="hf"><label class="hf__label">取引先</label>
            <div class="hf__ctrl"><div class="input"><span class="input__prefix">${I5.search}</span><span class="input__value">株式会社 サンプル商事</span></div></div></div>
          <div class="hf"><label class="hf__label">期間</label>
            <div class="hf__ctrl row">
              <div class="input"><span class="input__prefix">${I5.calendar}</span><span class="input__value mono">2026-04-01</span></div>
              <span class="muted small">〜</span>
              <div class="input"><span class="input__prefix">${I5.calendar}</span><span class="input__value mono">2026-04-30</span></div>
              <button class="btn btn--ghost btn--sm">今月</button>
              <button class="btn btn--ghost btn--sm">先月</button>
            </div></div>
          <div class="hf"><label class="hf__label">金額</label>
            <div class="hf__ctrl row">
              <div class="input" style="max-width: 160px;"><span class="input__prefix">${I5.yen}</span><span class="input__value mono">100,000</span></div>
              <span class="muted small">〜</span>
              <div class="input" style="max-width: 160px;"><span class="input__prefix">${I5.yen}</span><span class="input__value mono"></span></div>
            </div></div>
          <div class="hf"><label class="hf__label">状態</label>
            <div class="hf__ctrl">
              <div class="row" style="flex-wrap: wrap;">
                <span class="check"><span class="check__box"></span>下書き</span>
                <span class="check checked"><span class="check__box">${I5.check}</span>承認待ち</span>
                <span class="check"><span class="check__box"></span>承認済</span>
                <span class="check checked"><span class="check__box">${I5.check}</span>差戻し</span>
                <span class="check"><span class="check__box"></span>取消</span>
              </div></div></div>
          <div class="hf"><label class="hf__label">担当者</label>
            <div class="hf__ctrl">
              <div class="input"><div class="chips">
                <span class="chip">佐藤 花子${I5.close}</span>
                <span class="chip">山田 太郎${I5.close}</span>
              </div><span class="input__suffix">${I5.caret}</span></div></div></div>
        </div>
        <footer class="search-panel__foot">
          <a href="#" class="btn btn--link btn--sm">条件をクリア</a>
          <button class="btn btn--ghost btn--sm">条件を保存…</button>
          <span style="flex: 1;"></span>
          <span class="muted small">推定 24件 / 245件中</span>
          <button class="btn btn--primary">${I5.search}<span>検索する</span></button>
        </footer>
      </div>`
  },

  /* ===== 絞り込みパネル ===== */
  "filter-panel": {
    id: "C-FP", tag: "<sgt-filter-panel>", name: "絞り込みパネル", priority: "must",
    desc: "一覧の脇に常駐。クリック1つで絞り込みが効くファセット型。各ファセットには件数を併記。",
    accept: "受入: チェック変更時に一覧を即時更新。条件は URL クエリに同期し共有可能。",
    body: `
      <aside class="facet">
        <div class="facet__group">
          <h5>状態</h5>
          <ul>
            <li class="facet__item facet__item--active"><span class="check checked"><span class="check__box">${I5.check}</span>承認待ち</span><span class="facet__count">12</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>下書き</span><span class="facet__count">3</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>承認済</span><span class="facet__count">142</span></li>
            <li class="facet__item facet__item--active"><span class="check checked"><span class="check__box">${I5.check}</span>差戻し</span><span class="facet__count">4</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>取消</span><span class="facet__count">8</span></li>
          </ul>
        </div>
        <div class="facet__group">
          <h5>取引先</h5>
          <div class="search">${I5.search}<input placeholder="取引先で絞り込み" /></div>
          <ul>
            <li class="facet__item facet__item--active"><span class="check checked"><span class="check__box">${I5.check}</span>株式会社 サンプル商事</span><span class="facet__count">8</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>サンプル工業 株式会社</span><span class="facet__count">5</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>合同会社 シゴト</span><span class="facet__count">3</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>サンプルテック 合同会社</span><span class="facet__count">2</span></li>
            <li><a href="#" class="btn btn--link btn--sm">+ さらに表示（24件）</a></li>
          </ul>
        </div>
        <div class="facet__group">
          <h5>金額帯</h5>
          <ul>
            <li class="facet__item"><span class="check"><span class="check__box"></span>10万円未満</span><span class="facet__count">42</span></li>
            <li class="facet__item facet__item--active"><span class="check checked"><span class="check__box">${I5.check}</span>10万〜100万円</span><span class="facet__count">128</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>100万〜1000万円</span><span class="facet__count">62</span></li>
            <li class="facet__item"><span class="check"><span class="check__box"></span>1000万円以上</span><span class="facet__count">13</span></li>
          </ul>
        </div>
        <footer class="facet__foot">
          <span class="muted small">5件選択中</span>
          <a href="#" class="btn btn--link btn--sm">すべて解除</a>
        </footer>
      </aside>`
  },

  /* ===== 並び替え ===== */
  "sort-control": {
    id: "C-SORT", tag: "<sgt-sort-control>", name: "並び替え", priority: "should",
    desc: "テーブルヘッダ／独立ボタン／ドロップダウン／複数キー編集の4スタイル。複数キー時は順位を表示。",
    accept: "受入: 並びは URL クエリに `?sort=updated:-,total:+` 形式で保存。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">ヘッダクリック型</div>
          <div class="variant__stage"><table class="table" style="font-size: 12px;">
            <thead><tr>
              <th><span class="th-sort">見積番号 ${I5.sort}</span></th>
              <th><span class="th-sort th-sort--active">取引先 <span class="mono">↑</span></span></th>
              <th class="num"><span class="th-sort th-sort--active th-sort--secondary">合計 <span class="mono">↓ 2</span></span></th>
              <th><span class="th-sort">更新日時 ${I5.sort}</span></th>
            </tr></thead></table>
            <span class="muted small">主キー: 取引先 ↑ ／ 副キー: 合計 ↓</span></div></div>
        <div class="variant"><div class="variant__label">ドロップダウン型</div>
          <div class="variant__stage"><div class="row">
            <span class="muted small">並び替え</span>
            <div class="input" style="min-width: 200px;"><span class="input__value">更新日時（新しい順）</span><span class="input__suffix">${I5.caret}</span></div>
          </div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">複数キー編集</div>
          <div class="variant__stage"><div class="popover" style="max-width: 460px;">
            <h5 class="popover__head">並び替え（複数キー）</h5>
            <div class="popover__body" style="padding: 0;">
              <ul class="sort-list">
                <li><span class="sort-list__order mono">1</span>
                  <div class="input" style="flex: 1;"><span class="input__value">取引先</span><span class="input__suffix">${I5.caret}</span></div>
                  <div class="btn-group">
                    <button class="btn btn--primary btn--sm">昇順</button>
                    <button class="btn btn--ghost btn--sm">降順</button>
                  </div>
                  <button class="btn btn--icon btn--sm" aria-label="削除">${I5.close}</button></li>
                <li><span class="sort-list__order mono">2</span>
                  <div class="input" style="flex: 1;"><span class="input__value">合計金額</span><span class="input__suffix">${I5.caret}</span></div>
                  <div class="btn-group">
                    <button class="btn btn--ghost btn--sm">昇順</button>
                    <button class="btn btn--primary btn--sm">降順</button>
                  </div>
                  <button class="btn btn--icon btn--sm" aria-label="削除">${I5.close}</button></li>
                <li><span class="sort-list__order mono">3</span>
                  <div class="input" style="flex: 1;"><span class="input__value">更新日時</span><span class="input__suffix">${I5.caret}</span></div>
                  <div class="btn-group">
                    <button class="btn btn--ghost btn--sm">昇順</button>
                    <button class="btn btn--primary btn--sm">降順</button>
                  </div>
                  <button class="btn btn--icon btn--sm" aria-label="削除">${I5.close}</button></li>
              </ul>
              <div class="popover__add"><a href="#" class="btn btn--link btn--sm">${I5.plus}<span>並び替え条件を追加</span></a></div>
            </div>
            <div class="popover__foot">
              <button class="btn btn--ghost btn--sm">リセット</button>
              <button class="btn btn--primary btn--sm">適用する</button>
            </div>
          </div></div></div>
      </div>`
  },

  /* ===== 一括操作 ===== */
  "bulk-actions": {
    id: "C-BLK", tag: "<sgt-bulk-actions>", name: "一括操作", priority: "must",
    desc: "テーブル上で複数行選択時に出現する操作バー。固定・浮動の2スタイル。破壊的操作は確認モーダル必須。",
    accept: "受入: 選択0件で非表示、選択1件以上で出現。`sgt:bulk` で `{action, ids}` を発火。",
    body: `
      <div class="variants">
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">浮動バー（標準）</div>
          <div class="variant__stage" style="padding: 24px 0;">
            <div class="bulk-bar">
              <span class="bulk-bar__count"><strong>3</strong> 件選択中</span>
              <button class="btn btn--ghost btn--sm">${I5.upload}<span>CSV出力</span></button>
              <button class="btn btn--ghost btn--sm">${I5.print}<span>印刷</span></button>
              <button class="btn btn--ghost btn--sm">担当を変更…</button>
              <button class="btn btn--ghost btn--sm">タグ付け…</button>
              <span style="flex: 1;"></span>
              <button class="btn btn--danger btn--sm">${I5.close}<span>削除</span></button>
              <button class="btn btn--icon btn--sm" aria-label="閉じる">${I5.close}</button>
            </div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">確認モーダル（破壊的操作）</div>
          <div class="variant__stage"><div class="modal-stub modal-stub--danger">
            <div class="modal__head"><strong>選択した3件の見積を削除しますか？</strong><button class="btn btn--icon btn--sm" aria-label="閉じる">${I5.close}</button></div>
            <div class="modal__body">
              <p>削除すると元には戻せません。30日間はゴミ箱から復元できます。</p>
              <ul class="bulk-list">
                <li><span class="check checked"><span class="check__box">${I5.check}</span></span><span class="mono">Q-2026-0421</span><span>株式会社 サンプル商事 / ¥3,045,900</span></li>
                <li><span class="check checked"><span class="check__box">${I5.check}</span></span><span class="mono">Q-2026-0419</span><span>合同会社 シゴト / ¥0</span></li>
                <li><span class="check checked"><span class="check__box">${I5.check}</span></span><span class="mono">Q-2026-0417</span><span>株式会社 サンプル商事 / ¥980,000</span></li>
              </ul>
              <div class="check checked" style="margin-top: 8px;"><span class="check__box">${I5.check}</span>関連する添付資料も削除する</div>
            </div>
            <div class="modal__foot"><button class="btn btn--ghost">キャンセル</button><button class="btn btn--danger">3件まとめて削除</button></div>
          </div></div></div>
      </div>`
  },

  /* ===== 空状態表示 ===== */
  "empty-state": {
    id: "C-EMP", tag: "<sgt-empty-state>", name: "空状態表示", priority: "must",
    desc: "no-data / no-result / first-time / loading-failed の4種を統一フォーマットで。次のアクションを必ず提示する。",
    accept: "受入: 第一視点を「次の一手」に置く。説明は1〜2行に抑える。",
    body: `
      <div class="grid-2">
        <div class="empty">
          <div class="empty__art">${I5.search}</div>
          <h4>該当する見積はありません</h4>
          <p class="muted small">条件を変えるか、絞り込みを解除してください。</p>
          <div class="row" style="justify-content: center;">
            <button class="btn btn--ghost btn--sm">絞込を解除</button>
            <button class="btn btn--primary btn--sm">${I5.plus}<span>見積を新規作成</span></button>
          </div>
        </div>
        <div class="empty">
          <div class="empty__art">${I5.upload}</div>
          <h4>はじめての顧客マスタ</h4>
          <p class="muted small">CSV取込で一括登録するか、1社ずつ手動で追加できます。</p>
          <div class="row" style="justify-content: center;">
            <a href="#" class="btn btn--link btn--sm">テンプレートDL</a>
            <button class="btn btn--ghost btn--sm">${I5.download}<span>CSV取込</span></button>
            <button class="btn btn--primary btn--sm">${I5.plus}<span>1社追加</span></button>
          </div>
        </div>
        <div class="empty">
          <div class="empty__art" style="color: var(--ok);">${I5.check}</div>
          <h4>すべての差戻しに対応しました</h4>
          <p class="muted small">承認待ち案件は0件です。お疲れさまでした。</p>
          <button class="btn btn--ghost btn--sm">承認済一覧を見る</button>
        </div>
        <div class="empty" style="border-color: var(--danger); background: #fff7f7;">
          <div class="empty__art" style="background: #fbe9e7; color: var(--danger);">${I5.warn}</div>
          <h4>データを取得できませんでした</h4>
          <p class="muted small">通信エラーです。少し時間を置いて再試行してください。</p>
          <button class="btn btn--ghost btn--sm">再試行</button>
        </div>
      </div>`
  }
};



/* ================================================================
   v6 additions (CARDS)
   ================================================================ */

/* Shigoto UI — v6 cards: 20 more components
 * combobox / autocomplete / drawer / tabs / accordion / tooltip
 * spinner / skeleton / stepper / breadcrumb / banner / toast
 * org-tree / perm-matrix / audit-list / biz-calendar / closing-day
 * bank-account / corporate-number / seal
 */

const I6 = window.ICON || {};

const CARDS_V6 = {

  /* ===== コンボボックス ===== */
  "combobox": {
    id: "C-CMB", tag: "<sgt-combobox>", name: "コンボボックス", priority: "must",
    desc: "リストから選ぶ + 自由入力 を1つにまとめた入力。マスタ未登録の値も「新規として保存」できる。",
    accept: "受入: ↑↓ で候補移動、Enter で確定。`creatable` で「新規追加」項目を末尾に表示し、選択で `sgt:create` を発火。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">closed</div>
          <div class="variant__stage"><div class="field"><label class="field__label">取引先</label>
            <div class="input"><span class="input__value">株式会社 サンプル商事</span><span class="input__suffix">${I6.caret}</span></div></div></div></div>
        <div class="variant"><div class="variant__label">open</div>
          <div class="variant__stage"><div class="field"><label class="field__label">取引先</label>
            <div class="combo">
              <div class="input input--focus"><span class="input__value">株式会社 サンプル商事</span><span class="input__suffix">${I6.caret}</span></div>
              <ul class="combo__results">
                <li>合同会社 シゴト</li>
                <li class="sel">${I6.check}<span>株式会社 サンプル商事</span></li>
                <li>サンプル工業 株式会社</li>
                <li>サンプルテック 合同会社</li>
              </ul></div></div></div></div>
        <div class="variant"><div class="variant__label">creatable（新規追加）</div>
          <div class="variant__stage"><div class="combo">
            <div class="input input--focus"><span class="input__value">新規 物産</span></div>
            <ul class="combo__results">
              <li class="muted small">該当する候補はありません</li>
              <li class="combo__create">${I6.plus}<span>「<strong>新規 物産</strong>」を新規取引先として追加</span></li>
            </ul></div></div></div>
        <div class="variant"><div class="variant__label">multi（複数選択）</div>
          <div class="variant__stage"><div class="combo">
            <div class="input"><div class="chips">
              <span class="chip">経理部${I6.close}</span>
              <span class="chip">情シス${I6.close}</span>
              <span class="chip">総務${I6.close}</span>
            </div><span class="input__suffix">${I6.caret}</span></div></div></div></div>
      </div>`
  },

  /* ===== オートコンプリート ===== */
  "autocomplete": {
    id: "C-ACP", tag: "<sgt-autocomplete>", name: "オートコンプリート", priority: "must",
    desc: "サーバ側を都度クエリして候補を絞り込む入力。debounce / loading / no-result / 履歴 をすべて備える。",
    accept: "受入: 200ms debounce、Cmd/Ctrl+K で起動、Enter で先頭候補確定。`min-chars` で発動文字数を制御。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">loading</div>
          <div class="variant__stage"><div class="combo">
            <div class="search search--focus">${I6.search}<input value="サンプ" /></div>
            <ul class="combo__results">
              <li class="combo__loading"><span class="spinner"></span><span class="muted small">候補を検索中…</span></li>
            </ul></div></div></div>
        <div class="variant"><div class="variant__label">results</div>
          <div class="variant__stage"><div class="combo">
            <div class="search search--focus">${I6.search}<input value="サンプル" /></div>
            <ul class="combo__results">
              <li class="sel"><strong>株式会社 <mark>サンプル</mark>商事</strong><span class="muted small mono">C-00321</span></li>
              <li><strong><mark>サンプル</mark>工業 株式会社</strong><span class="muted small mono">C-00498</span></li>
              <li><strong><mark>サンプル</mark>テック 合同会社</strong><span class="muted small mono">C-01102</span></li>
              <li class="combo__results__foot">
                <span class="muted small">3 / 12件 一致</span>
                <a href="#" class="btn btn--link btn--sm">すべて表示</a>
              </li>
            </ul></div></div></div>
        <div class="variant"><div class="variant__label">no result</div>
          <div class="variant__stage"><div class="combo">
            <div class="search search--focus">${I6.search}<input value="該当なし123" /></div>
            <ul class="combo__results">
              <li class="combo__empty">
                <div class="muted small">該当する取引先はありません</div>
                <a href="#" class="btn btn--link btn--sm">${I6.plus}<span>取引先を新規登録</span></a>
              </li>
            </ul></div></div></div>
        <div class="variant"><div class="variant__label">最近検索した（履歴）</div>
          <div class="variant__stage"><div class="combo">
            <div class="search search--focus">${I6.search}<input placeholder="取引先 / 案件 / 担当を検索" /></div>
            <ul class="combo__results">
              <li class="combo__group">最近検索した</li>
              <li><span class="muted small">${I6.search}</span><span>サンプル商事</span></li>
              <li><span class="muted small">${I6.search}</span><span>導入支援 4月</span></li>
              <li><span class="muted small">${I6.search}</span><span>佐藤 花子</span></li>
              <li class="combo__results__foot"><span class="muted small">⌘K で起動</span><a href="#" class="btn btn--link btn--sm">履歴をクリア</a></li>
            </ul></div></div></div>
      </div>`
  },

  /* ===== ドロワー ===== */
  "drawer": {
    id: "C-DRW", tag: "<sgt-drawer>", name: "ドロワー", priority: "must",
    desc: "右からせり出すサブパネル。一覧 → 詳細 を遷移ではなく重ね表示で見せ、コンテキストを失わせない。",
    accept: "受入: ESC または背景クリックで閉じる。複数開けず、深い詳細は別画面に遷移させる。幅は固定 480/640/800 の3段階。",
    body: `
      <div class="drawer-frame">
        <div class="drawer-frame__bg">
          <div class="muted small" style="padding: 16px;">背景の一覧（abstract）</div>
          <div class="bg-table">
            <div class="bg-table__row"></div><div class="bg-table__row"></div>
            <div class="bg-table__row bg-table__row--active"></div>
            <div class="bg-table__row"></div><div class="bg-table__row"></div>
          </div>
        </div>
        <aside class="drawer">
          <header class="drawer__head">
            <button class="btn btn--icon btn--sm" aria-label="閉じる">${I6.close}</button>
            <strong>Q-2026-0421</strong>
            <span class="badge badge--review">申請中</span>
            <span style="flex: 1;"></span>
            <button class="btn btn--icon btn--sm" aria-label="新しいタブで開く">${I6.upload}</button>
            <button class="btn btn--icon btn--sm" aria-label="その他">${I6.drag}</button>
          </header>
          <div class="drawer__body">
            <div class="hf"><label class="hf__label">取引先</label>
              <div class="hf__ctrl"><strong>株式会社 サンプル商事</strong><div class="muted small">C-00321 ／ 担当: 佐藤 花子</div></div></div>
            <div class="hf"><label class="hf__label">件名</label>
              <div class="hf__ctrl">業務UIライブラリ導入支援 一式</div></div>
            <div class="hf"><label class="hf__label">合計金額</label>
              <div class="hf__ctrl"><strong class="mono">¥3,045,900</strong> <span class="muted small">（税込）</span></div></div>
            <div class="hf"><label class="hf__label">有効期限</label>
              <div class="hf__ctrl"><span class="mono">2026-05-26</span> <span class="badge badge--warn">残8日</span></div></div>
            <div class="hf"><label class="hf__label">承認状況</label>
              <div class="hf__ctrl">
                <ol class="apv apv--mini">
                  <li class="apv__step apv__step--done"><div class="apv__head"><strong>佐藤 花子</strong><span class="muted small mono">04-24</span></div></li>
                  <li class="apv__step apv__step--done"><div class="apv__head"><strong>山田 太郎</strong><span class="muted small mono">04-25</span></div></li>
                  <li class="apv__step apv__step--current"><div class="apv__head"><strong>高橋 部長</strong><span class="muted small">承認待ち</span></div></li>
                </ol></div></div>
          </div>
          <footer class="drawer__foot">
            <button class="btn btn--ghost">編集</button>
            <button class="btn btn--ghost">差戻し</button>
            <button class="btn btn--primary">承認する</button>
          </footer>
        </aside>
      </div>`
  },

  /* ===== タブ ===== */
  "tabs": {
    id: "C-TAB", tag: "<sgt-tabs>", name: "タブ", priority: "must",
    desc: "詳細画面の切替に。border-bottom型 / pill型 / 縦タブの3スタイル。バッジ・件数表示を内蔵。",
    accept: "受入: ←→ で移動。`role=tablist`, `aria-controls` を自動付与。URL ハッシュにアクティブを同期可能。",
    body: `
      <div class="variants">
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">border-bottom（標準）</div>
          <div class="variant__stage"><div class="tabs tabs--border" role="tablist">
            <button class="tabs__tab tabs__tab--active" role="tab" aria-selected="true">概要</button>
            <button class="tabs__tab" role="tab">明細 <span class="tabs__count">12</span></button>
            <button class="tabs__tab" role="tab">承認履歴 <span class="tabs__count tabs__count--alert">2</span></button>
            <button class="tabs__tab" role="tab">添付 <span class="tabs__count">3</span></button>
            <button class="tabs__tab" role="tab" disabled>請求 <span class="muted small">(発行後)</span></button>
          </div></div></div>
        <div class="variant"><div class="variant__label">pill</div>
          <div class="variant__stage"><div class="tabs tabs--pill" role="tablist">
            <button class="tabs__tab tabs__tab--active">日次</button>
            <button class="tabs__tab">週次</button>
            <button class="tabs__tab">月次</button>
            <button class="tabs__tab">年次</button>
          </div></div></div>
        <div class="variant"><div class="variant__label">vertical</div>
          <div class="variant__stage"><div class="tabs tabs--vertical" role="tablist">
            <button class="tabs__tab tabs__tab--active">基本情報</button>
            <button class="tabs__tab">取引先</button>
            <button class="tabs__tab">支払条件</button>
            <button class="tabs__tab">通知設定 <span class="badge badge--warn">未設定</span></button>
          </div></div></div>
      </div>`
  },

  /* ===== アコーディオン ===== */
  "accordion": {
    id: "C-ACC", tag: "<sgt-accordion>", name: "アコーディオン", priority: "must",
    desc: "長い設定画面の整理に。単一展開 / 複数展開 を切替。サマリー行に状態バッジを並べられる。",
    accept: "受入: Space/Enter で開閉。アンカーリンクから直接該当パネルを開いた状態で表示できる。",
    body: `
      <div class="acc">
        <details class="acc__item" open>
          <summary class="acc__sum">
            <span class="acc__icn">${I6.caret}</span>
            <strong>基本情報</strong>
            <span class="badge badge--approved">${I6.check}<span>入力済</span></span>
            <span class="muted small" style="margin-left: auto;">最終更新: 04-26 10:12</span>
          </summary>
          <div class="acc__body">
            <div class="hf"><label class="hf__label">商号</label><div class="hf__ctrl">合同会社 シゴト</div></div>
            <div class="hf"><label class="hf__label">所在地</label><div class="hf__ctrl">東京都千代田区千代田1-1</div></div>
            <div class="hf"><label class="hf__label">代表者</label><div class="hf__ctrl">山田 太郎</div></div>
          </div>
        </details>
        <details class="acc__item">
          <summary class="acc__sum">
            <span class="acc__icn">${I6.caret}</span>
            <strong>支払・締日</strong>
            <span class="badge badge--info">月末締 / 翌月末払</span>
          </summary>
          <div class="acc__body"><span class="muted small">（折りたたみ中）</span></div>
        </details>
        <details class="acc__item">
          <summary class="acc__sum">
            <span class="acc__icn">${I6.caret}</span>
            <strong>承認経路</strong>
            <span class="badge badge--warn">${I6.warn}<span>未設定</span></span>
          </summary>
          <div class="acc__body"><span class="muted small">（折りたたみ中）</span></div>
        </details>
        <details class="acc__item acc__item--err">
          <summary class="acc__sum">
            <span class="acc__icn">${I6.caret}</span>
            <strong>権限・ロール</strong>
            <span class="badge badge--rejected">${I6.warn}<span>3件のエラー</span></span>
          </summary>
          <div class="acc__body"><span class="muted small">（折りたたみ中）</span></div>
        </details>
      </div>`
  },

  /* ===== ツールチップ ===== */
  "tooltip": {
    id: "C-TIP", tag: "<sgt-tooltip>", name: "ツールチップ", priority: "should",
    desc: "アイコンや略称への補足。短文用（吹き出し）と長文用（情報カード型）の2種。300ms遅延でホバー表示。",
    accept: "受入: フォーカスでも開く。`data-trigger=click` でクリック開閉に切替。ESC で閉じる。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">短文（top）</div>
          <div class="variant__stage" style="padding: 36px 12px 12px;">
            <button class="btn btn--icon" aria-label="ヘルプ">${I6.info}</button>
            <div class="tip tip--top">この欄は適格請求書発行事業者の番号です</div>
          </div></div>
        <div class="variant"><div class="variant__label">短文（right）</div>
          <div class="variant__stage" style="padding: 12px;">
            <span class="badge badge--warn">未対応 ${I6.info}</span>
            <div class="tip tip--right">部長の承認後に発行できます</div>
          </div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">情報カード型（rich）</div>
          <div class="variant__stage" style="padding: 24px 12px;">
            <span style="border-bottom: 1px dotted var(--muted);">適格請求書 ${I6.info}</span>
            <div class="tip tip--card tip--right">
              <strong>適格請求書（インボイス）とは</strong>
              <p>2023年10月1日から始まったインボイス制度で必要となる、登録番号付きの請求書のこと。「T+13桁」の登録番号、税率ごとの税額・対価などが必須項目です。</p>
              <a href="#" class="btn btn--link btn--sm">詳しくはヘルプ ${I6.arrow}</a>
            </div></div></div>
      </div>`
  },

  /* ===== スピナー ===== */
  "spinner": {
    id: "C-SPN", tag: "<sgt-spinner>", name: "スピナー", priority: "must",
    desc: "短い読み込みに。サイズは sm/md/lg、ラベル付き、ボタン内蔵、ページ全体オーバーレイの4スタイル。",
    accept: "受入: 1秒未満の待ちにはスピナー、それ以上はスケルトン+進捗を推奨。`prefers-reduced-motion` 対応。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">sm / md / lg</div>
          <div class="variant__stage" style="display: flex; align-items: center; gap: 24px; justify-content: center;">
            <span class="spinner spinner--sm"></span>
            <span class="spinner spinner--md"></span>
            <span class="spinner spinner--lg"></span>
          </div></div>
        <div class="variant"><div class="variant__label">ラベル付き</div>
          <div class="variant__stage" style="text-align: center;">
            <span class="spinner spinner--md"></span>
            <div class="muted small" style="margin-top: 8px;">CSV を読み込んでいます…</div>
            <div class="muted small mono">12,400 / 32,000 行</div>
          </div></div>
        <div class="variant"><div class="variant__label">ボタン内蔵</div>
          <div class="variant__stage"><div class="row" style="justify-content: center; flex-wrap: wrap;">
            <button class="btn btn--primary btn--loading"><span class="spinner"></span>送信中…</button>
            <button class="btn btn--ghost btn--loading"><span class="spinner"></span>確認中…</button>
          </div></div></div>
        <div class="variant"><div class="variant__label">ページオーバーレイ</div>
          <div class="variant__stage">
            <div class="overlay-frame">
              <div class="overlay-frame__bg">
                <div class="muted small" style="padding: 8px;">ページ全体（ぼかし）</div>
                <div class="bg-table"><div class="bg-table__row"></div><div class="bg-table__row"></div><div class="bg-table__row"></div></div>
              </div>
              <div class="overlay">
                <span class="spinner spinner--lg"></span>
                <div>承認処理中です…</div>
                <div class="muted small">この画面を閉じないでください</div>
              </div>
            </div></div></div>
      </div>`
  },

  /* ===== スケルトン表示 ===== */
  "skeleton": {
    id: "C-SKL", tag: "<sgt-skeleton>", name: "スケルトン表示", priority: "must",
    desc: "1秒以上の読み込みに。レイアウトを保ったまま「いずれ何が入るか」を示す。文字行 / 表 / カード / フォームのプリセットを用意。",
    accept: "受入: アニメは prefers-reduced-motion で停止。実データ到着時にフェードでスワップ。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">テキスト行</div>
          <div class="variant__stage">
            <div class="skel skel--line skel--w90"></div>
            <div class="skel skel--line skel--w70"></div>
            <div class="skel skel--line skel--w80"></div>
            <div class="skel skel--line skel--w50"></div>
          </div></div>
        <div class="variant"><div class="variant__label">カード</div>
          <div class="variant__stage"><div class="card-stub">
            <div class="row"><div class="skel skel--circle"></div><div style="flex: 1;"><div class="skel skel--line skel--w60"></div><div class="skel skel--line skel--w40 skel--sm"></div></div></div>
            <div class="skel skel--block"></div>
            <div class="skel skel--line skel--w90"></div>
            <div class="skel skel--line skel--w70"></div>
          </div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">テーブル</div>
          <div class="variant__stage"><table class="table">
            <thead><tr><th class="skel-th">見積番号</th><th class="skel-th">取引先</th><th class="skel-th num">合計</th><th class="skel-th">状態</th><th class="skel-th">更新</th></tr></thead>
            <tbody>
              <tr><td><div class="skel skel--line skel--w70"></div></td><td><div class="skel skel--line skel--w90"></div></td><td><div class="skel skel--line skel--w50"></div></td><td><div class="skel skel--pill"></div></td><td><div class="skel skel--line skel--w60"></div></td></tr>
              <tr class="zebra"><td><div class="skel skel--line skel--w60"></div></td><td><div class="skel skel--line skel--w80"></div></td><td><div class="skel skel--line skel--w40"></div></td><td><div class="skel skel--pill"></div></td><td><div class="skel skel--line skel--w50"></div></td></tr>
              <tr><td><div class="skel skel--line skel--w80"></div></td><td><div class="skel skel--line skel--w70"></div></td><td><div class="skel skel--line skel--w60"></div></td><td><div class="skel skel--pill"></div></td><td><div class="skel skel--line skel--w50"></div></td></tr>
              <tr class="zebra"><td><div class="skel skel--line skel--w50"></div></td><td><div class="skel skel--line skel--w90"></div></td><td><div class="skel skel--line skel--w50"></div></td><td><div class="skel skel--pill"></div></td><td><div class="skel skel--line skel--w70"></div></td></tr>
            </tbody></table></div></div>
      </div>`
  },

  /* ===== ステップナビゲーション ===== */
  "stepper": {
    id: "C-STP", tag: "<sgt-stepper>", name: "ステップナビゲーション", priority: "must",
    desc: "新規申請・初期セットアップ等の多段フォーム。横並び / 縦並び / コンパクト の3レイアウト。",
    accept: "受入: 完了済ステップへは戻れる（クリックで遷移）。未到達ステップへはスキップ不可。",
    body: `
      <div class="variants">
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">horizontal</div>
          <div class="variant__stage"><ol class="stepper">
            <li class="stepper__step stepper__step--done"><span class="stepper__num">${I6.check}</span><div><div class="stepper__t">取引先選択</div><div class="muted small">サンプル商事</div></div></li>
            <li class="stepper__step stepper__step--done"><span class="stepper__num">${I6.check}</span><div><div class="stepper__t">明細入力</div><div class="muted small">12行 / ¥3,045,900</div></div></li>
            <li class="stepper__step stepper__step--current"><span class="stepper__num">3</span><div><div class="stepper__t">支払条件</div><div class="muted small">入力中</div></div></li>
            <li class="stepper__step"><span class="stepper__num">4</span><div><div class="stepper__t">添付資料</div><div class="muted small">未着手</div></div></li>
            <li class="stepper__step"><span class="stepper__num">5</span><div><div class="stepper__t">確認 → 申請</div><div class="muted small">未着手</div></div></li>
          </ol></div></div>
        <div class="variant"><div class="variant__label">vertical</div>
          <div class="variant__stage"><ol class="stepper stepper--v">
            <li class="stepper__step stepper__step--done"><span class="stepper__num">${I6.check}</span><div><div class="stepper__t">取引先選択</div></div></li>
            <li class="stepper__step stepper__step--done"><span class="stepper__num">${I6.check}</span><div><div class="stepper__t">明細入力</div></div></li>
            <li class="stepper__step stepper__step--current"><span class="stepper__num">3</span><div><div class="stepper__t">支払条件</div><div class="muted small">入力中</div></div></li>
            <li class="stepper__step"><span class="stepper__num">4</span><div><div class="stepper__t">添付資料</div></div></li>
            <li class="stepper__step"><span class="stepper__num">5</span><div><div class="stepper__t">確認 → 申請</div></div></li>
          </ol></div></div>
        <div class="variant"><div class="variant__label">compact（dot）</div>
          <div class="variant__stage" style="text-align: center;">
            <div class="stepper-dots">
              <span class="dot dot--done"></span>
              <span class="bar bar--done"></span>
              <span class="dot dot--done"></span>
              <span class="bar bar--done"></span>
              <span class="dot dot--current"></span>
              <span class="bar"></span>
              <span class="dot"></span>
              <span class="bar"></span>
              <span class="dot"></span>
            </div>
            <div class="muted small" style="margin-top: 8px;">ステップ 3 / 5 ・支払条件</div>
          </div></div>
      </div>`
  },

  /* ===== パンくず ===== */
  "breadcrumb": {
    id: "C-BC", tag: "<sgt-breadcrumb>", name: "パンくず", priority: "should",
    desc: "深い階層のページの居場所表示。最下段は現在地（リンクなし）。長すぎる場合は中略表示に。",
    accept: "受入: スクロールで上部固定する `sticky` 属性を持つ。Schema.org BreadcrumbList を自動出力。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">通常</div>
          <div class="variant__stage"><nav class="bc">
            <a href="#">ホーム</a><span class="bc__sep">/</span>
            <a href="#">見積</a><span class="bc__sep">/</span>
            <a href="#">2026年4月</a><span class="bc__sep">/</span>
            <span class="bc__cur">Q-2026-0421</span>
          </nav></div></div>
        <div class="variant"><div class="variant__label">中略</div>
          <div class="variant__stage"><nav class="bc">
            <a href="#">ホーム</a><span class="bc__sep">/</span>
            <button class="bc__more" aria-label="中略">${I6.drag}</button><span class="bc__sep">/</span>
            <a href="#">2026年4月</a><span class="bc__sep">/</span>
            <span class="bc__cur">Q-2026-0421</span>
          </nav></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">アイコン付き + ステータス</div>
          <div class="variant__stage"><nav class="bc bc--rich">
            <a href="#">${I6.search}<span>すべて</span></a><span class="bc__sep">/</span>
            <a href="#">取引先</a><span class="bc__sep">/</span>
            <a href="#">サンプル商事</a><span class="bc__sep">/</span>
            <a href="#">案件</a><span class="bc__sep">/</span>
            <span class="bc__cur">業務UI導入支援</span>
            <span class="badge badge--review" style="margin-left: 8px;">申請中</span>
          </nav></div></div>
      </div>`
  },

  /* ===== 通知バナー ===== */
  "banner": {
    id: "C-BNR", tag: "<sgt-banner>", name: "通知バナー", priority: "must",
    desc: "ページ全幅で出る常駐通知。メンテ・障害・期限切れ・利用上の注意などに使う。",
    accept: "受入: dismiss すると localStorage に記録し、再表示しない（バナーIDで管理）。",
    body: `
      <div class="banners">
        <div class="banner banner--info">
          ${I6.info}
          <div><strong>4月30日（火）22:00 〜 23:00</strong> にメンテナンスを行います。<a href="#">詳細</a></div>
          <button class="btn btn--icon btn--sm" aria-label="閉じる">${I6.close}</button>
        </div>
        <div class="banner banner--warn">
          ${I6.warn}
          <div>適格請求書 登録番号が <strong>未設定</strong> の取引先が <strong>3社</strong> あります。 <a href="#">マスタを確認する ${I6.arrow}</a></div>
          <button class="btn btn--icon btn--sm" aria-label="閉じる">${I6.close}</button>
        </div>
        <div class="banner banner--err">
          ${I6.warn}
          <div><strong>認証エラー</strong>：会計連携が切断されました。再連携が必要です。 <a href="#">設定を開く ${I6.arrow}</a></div>
        </div>
        <div class="banner banner--ok">
          ${I6.check}
          <div>本日のCSV取込（顧客マスタ）が <strong>正常に完了しました</strong>（314件 / 取込時刻 04-26 18:00）。</div>
          <button class="btn btn--icon btn--sm" aria-label="閉じる">${I6.close}</button>
        </div>
      </div>`
  },

  /* ===== トースト ===== */
  "toast": {
    id: "C-TST", tag: "<sgt-toast>", name: "トースト", priority: "must",
    desc: "操作に対する一時的なフィードバック。デフォルト 4秒で自動消滅。重要な通知はバナーへ。",
    accept: "受入: 同種の連続発火はマージ表示（×3 等）。スクリーンリーダーには aria-live=polite で通知。",
    body: `
      <div class="toast-stack">
        <div class="toast toast--ok">
          ${I6.check}
          <div class="toast__body">
            <strong>下書きを保存しました</strong>
            <div class="muted small">04-26 10:12 ／ 自動保存も有効です</div>
          </div>
          <button class="btn btn--link btn--sm">元に戻す</button>
          <button class="btn btn--icon btn--sm" aria-label="閉じる">${I6.close}</button>
        </div>
        <div class="toast toast--info">
          ${I6.info}
          <div class="toast__body">
            <strong>承認を依頼しました</strong>
            <div class="muted small">山田 太郎 さんに通知しました</div>
          </div>
          <button class="btn btn--icon btn--sm" aria-label="閉じる">${I6.close}</button>
        </div>
        <div class="toast toast--err">
          ${I6.warn}
          <div class="toast__body">
            <strong>送信に失敗しました</strong>
            <div class="muted small">通信エラー（408）</div>
          </div>
          <button class="btn btn--ghost btn--sm">再試行</button>
          <button class="btn btn--icon btn--sm" aria-label="閉じる">${I6.close}</button>
        </div>
        <div class="toast toast--warn">
          ${I6.warn}
          <div class="toast__body">
            <strong>3件まとめて削除しました</strong>
            <span class="muted small">30秒以内に元に戻すことができます</span>
          </div>
          <button class="btn btn--link btn--sm">元に戻す（28s）</button>
        </div>
      </div>`
  },

  /* ===== 組織ツリー ===== */
  "org-tree": {
    id: "B-ORG", tag: "<sgt-org-tree>", name: "組織ツリー", priority: "must",
    desc: "部署・チーム・ユーザーの階層表示。展開・折りたたみ、ドラッグ移動、件数バッジ、選択状態に対応。",
    accept: "受入: 子ノードの選択時、親に「一部選択」状態（−）を伝播。`sgt:move` で親変更を発火。",
    body: `
      <ul class="tree" role="tree">
        <li class="tree__node tree__node--open" role="treeitem" aria-expanded="true">
          <div class="tree__row">
            <button class="tree__chev">${I6.caret}</button>
            <span class="tree__icn">${I6.drag}</span>
            <strong>合同会社 シゴト</strong>
            <span class="tree__count">42名</span>
          </div>
          <ul>
            <li class="tree__node tree__node--open" role="treeitem" aria-expanded="true">
              <div class="tree__row">
                <button class="tree__chev">${I6.caret}</button>
                <span class="tree__icn">${I6.drag}</span>
                <strong>営業本部</strong>
                <span class="tree__count">18名</span>
              </div>
              <ul>
                <li class="tree__node tree__node--open" role="treeitem" aria-expanded="true">
                  <div class="tree__row tree__row--active">
                    <button class="tree__chev">${I6.caret}</button>
                    <span class="check checked"><span class="check__box">${I6.check}</span></span>
                    <strong>営業1課（東京）</strong>
                    <span class="tree__count">8名</span>
                    <span class="tree__hover">
                      <button class="btn btn--ghost btn--sm">${I6.plus}<span>追加</span></button>
                      <button class="btn btn--icon btn--sm" aria-label="その他">${I6.drag}</button>
                    </span>
                  </div>
                  <ul>
                    <li class="tree__leaf"><span class="check checked"><span class="check__box">${I6.check}</span></span><span class="avatar avatar--xs" data-init="佐">佐</span><span>佐藤 花子</span><span class="muted small">課長</span></li>
                    <li class="tree__leaf"><span class="check checked"><span class="check__box">${I6.check}</span></span><span class="avatar avatar--xs" data-init="山">山</span><span>山田 太郎</span><span class="muted small">部長</span></li>
                    <li class="tree__leaf"><span class="check"><span class="check__box"></span></span><span class="avatar avatar--xs" data-init="高">高</span><span>高橋 美咲</span><span class="muted small">主任</span></li>
                  </ul>
                </li>
                <li class="tree__node">
                  <div class="tree__row">
                    <button class="tree__chev tree__chev--closed">${I6.caret}</button>
                    <span class="check tree__check--mixed"><span class="check__box">−</span></span>
                    <strong>営業2課（大阪）</strong>
                    <span class="tree__count">6名</span>
                    <span class="muted small">(2名選択中)</span>
                  </div>
                </li>
                <li class="tree__node">
                  <div class="tree__row">
                    <button class="tree__chev tree__chev--closed">${I6.caret}</button>
                    <span class="check"><span class="check__box"></span></span>
                    <strong>カスタマーサクセス</strong>
                    <span class="tree__count">4名</span>
                  </div>
                </li>
              </ul>
            </li>
            <li class="tree__node">
              <div class="tree__row">
                <button class="tree__chev tree__chev--closed">${I6.caret}</button>
                <span class="check"><span class="check__box"></span></span>
                <strong>管理本部</strong>
                <span class="tree__count">14名</span>
              </div>
            </li>
            <li class="tree__node">
              <div class="tree__row">
                <button class="tree__chev tree__chev--closed">${I6.caret}</button>
                <span class="check"><span class="check__box"></span></span>
                <strong>開発本部</strong>
                <span class="tree__count">10名</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>`
  },

  /* ===== 権限マトリクス ===== */
  "perm-matrix": {
    id: "B-PRM", tag: "<sgt-permission-matrix>", name: "権限マトリクス", priority: "must",
    desc: "ロール × 機能 の権限を一覧で編集。閲覧/作成/編集/削除/承認 の5動作を1セルで表現。",
    accept: "受入: 行・列ヘッダ固定でスクロール可能。継承（上位ロールから）はチェックを薄表示。",
    body: `
      <table class="matrix">
        <thead><tr>
          <th class="matrix__corner">機能 ＼ ロール</th>
          <th>閲覧者</th>
          <th>担当者</th>
          <th>承認者</th>
          <th class="matrix__col--admin">管理者</th>
          <th>監査</th>
        </tr></thead>
        <tbody>
          <tr class="matrix__group"><td colspan="6">案件管理</td></tr>
          <tr><th>見積を閲覧する</th>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td class="matrix__col--admin"><span class="cell-yes cell-yes--inherit">${I6.check}</span></td>
            <td><span class="cell-yes">${I6.check}</span></td></tr>
          <tr><th>見積を新規作成する</th>
            <td></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td class="matrix__col--admin"><span class="cell-yes cell-yes--inherit">${I6.check}</span></td>
            <td></td></tr>
          <tr><th>承認を行う</th>
            <td></td><td></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td class="matrix__col--admin"><span class="cell-yes cell-yes--inherit">${I6.check}</span></td>
            <td></td></tr>
          <tr><th>取引先を編集する</th>
            <td></td>
            <td><span class="cell-partial">${I6.warn}<span class="muted small">担当のみ</span></span></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td class="matrix__col--admin"><span class="cell-yes cell-yes--inherit">${I6.check}</span></td>
            <td></td></tr>
          <tr><th>削除する</th>
            <td></td><td></td><td></td>
            <td class="matrix__col--admin"><span class="cell-yes">${I6.check}</span></td>
            <td></td></tr>
          <tr class="matrix__group"><td colspan="6">マスタ管理</td></tr>
          <tr><th>顧客マスタを編集する</th>
            <td></td>
            <td></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td class="matrix__col--admin"><span class="cell-yes">${I6.check}</span></td>
            <td></td></tr>
          <tr><th>商品マスタを編集する</th>
            <td></td><td></td>
            <td><span class="cell-yes">${I6.check}</span></td>
            <td class="matrix__col--admin"><span class="cell-yes">${I6.check}</span></td>
            <td></td></tr>
          <tr><th>ロール・権限を編集する</th>
            <td></td><td></td><td></td>
            <td class="matrix__col--admin"><span class="cell-yes">${I6.check}</span></td>
            <td></td></tr>
          <tr><th>監査ログを閲覧する</th>
            <td></td><td></td><td></td>
            <td class="matrix__col--admin"><span class="cell-yes">${I6.check}</span></td>
            <td><span class="cell-yes">${I6.check}</span></td></tr>
        </tbody>
      </table>
      <div class="row" style="margin-top: 8px;">
        <span class="cell-yes" style="display: inline-flex;">${I6.check}</span><span class="muted small">許可</span>
        <span class="cell-yes cell-yes--inherit" style="display: inline-flex;">${I6.check}</span><span class="muted small">上位ロールから継承</span>
        <span class="cell-partial" style="display: inline-flex;">${I6.warn}</span><span class="muted small">条件付き</span>
      </div>`
  },

  /* ===== 監査ログ一覧 ===== */
  "audit-list": {
    id: "B-AUL", tag: "<sgt-audit-list>", name: "監査ログ一覧", priority: "must",
    desc: "全社レベルの監査画面。誰が・いつ・どこで・何を・どこから の5W1Hを列で揃える。",
    accept: "受入: フィルタ条件は URL に保存。月次でCSV出力（タイムゾーン込み）が可能。",
    body: `
      <div class="row" style="margin-bottom: 8px;">
        <span class="muted small">期間</span>
        <div class="input"><span class="input__prefix">${I6.calendar}</span><span class="input__value mono">2026-04-01</span></div>
        <span class="muted small">〜</span>
        <div class="input"><span class="input__prefix">${I6.calendar}</span><span class="input__value mono">2026-04-26</span></div>
        <span class="muted small">操作者</span>
        <div class="input"><span class="input__value">すべて</span><span class="input__suffix">${I6.caret}</span></div>
        <span class="muted small">対象</span>
        <div class="input"><span class="input__value">すべて</span><span class="input__suffix">${I6.caret}</span></div>
        <span class="muted small">重要度</span>
        <div class="input"><span class="input__value">高 ＋ 中</span><span class="input__suffix">${I6.caret}</span></div>
        <button class="btn btn--ghost btn--sm">${I6.upload}<span>監査CSV</span></button>
      </div>
      <table class="table">
        <thead><tr>
          <th style="width: 140px;">日時</th>
          <th>操作者</th>
          <th>操作</th>
          <th>対象</th>
          <th style="width: 110px;">IP</th>
          <th style="width: 80px;">重要度</th>
          <th></th>
        </tr></thead>
        <tbody>
          <tr><td class="mono small">2026-04-26 10:12:31</td>
            <td><span class="avatar avatar--xs" data-init="佐">佐</span> 佐藤 花子</td>
            <td><span class="badge badge--info">更新</span> 見積金額・有効期限</td>
            <td><a href="#" class="mono">Q-2026-0421</a></td>
            <td class="mono small">203.0.113.12</td>
            <td><span class="sev sev--low">低</span></td>
            <td><a href="#" class="btn btn--link btn--sm">差分</a></td></tr>
          <tr class="zebra audit-row--high"><td class="mono small">2026-04-25 18:30:08</td>
            <td><span class="avatar avatar--xs" data-init="管">管</span> 管理者</td>
            <td><span class="badge badge--rejected">権限変更</span> 高橋 美咲 を <strong>承認者</strong> に</td>
            <td><a href="#">高橋 美咲</a></td>
            <td class="mono small">203.0.113.7</td>
            <td><span class="sev sev--high">高</span></td>
            <td><a href="#" class="btn btn--link btn--sm">詳細</a></td></tr>
          <tr><td class="mono small">2026-04-25 14:08:42</td>
            <td><span class="avatar avatar--xs" data-init="高">高</span> 高橋 部長</td>
            <td><span class="badge badge--rejected">削除</span> 重複案件のため</td>
            <td><a href="#" class="mono">Q-2026-0410</a></td>
            <td class="mono small">203.0.113.34</td>
            <td><span class="sev sev--mid">中</span></td>
            <td><a href="#" class="btn btn--link btn--sm">詳細</a></td></tr>
          <tr class="zebra"><td class="mono small">2026-04-25 09:30:00</td>
            <td><span class="avatar avatar--xs avatar--sys">SYS</span> システム</td>
            <td><span class="badge badge--info">CSV取込</span> 顧客マスタ 320行</td>
            <td><a href="#">customers_2026Q1.csv</a></td>
            <td class="mono small">—</td>
            <td><span class="sev sev--low">低</span></td>
            <td><a href="#" class="btn btn--link btn--sm">レポート</a></td></tr>
          <tr class="audit-row--high"><td class="mono small">2026-04-24 22:14:11</td>
            <td><span class="avatar avatar--xs" data-init="？">?</span> <span class="muted">不明</span></td>
            <td><span class="badge badge--rejected">${I6.warn}<span>ログイン失敗</span></span> 5回連続</td>
            <td><a href="#">sato@example.com</a></td>
            <td class="mono small">198.51.100.87</td>
            <td><span class="sev sev--high">高</span></td>
            <td><a href="#" class="btn btn--link btn--sm">対応</a></td></tr>
        </tbody>
      </table>`
  },

  /* ===== 営業日カレンダー ===== */
  "biz-calendar": {
    id: "B-CAL", tag: "<sgt-business-calendar>", name: "営業日カレンダー", priority: "must",
    desc: "祝日・会社の休業日を反映した日付選択。営業日ベースの「翌5営業日」「月末営業日」が選べる。",
    accept: "受入: 祝日マスタは内蔵 + 会社固有の休業日を上書き。日付セルに祝日名をツールチップ表示。",
    body: `
      <div class="cal">
        <header class="cal__head">
          <button class="btn btn--icon btn--sm" aria-label="前月">${I6.caret}</button>
          <strong>2026年 5月</strong>
          <button class="btn btn--icon btn--sm" aria-label="翌月">${I6.caret}</button>
          <span style="flex: 1;"></span>
          <div class="row">
            <button class="btn btn--ghost btn--sm">今日</button>
            <button class="btn btn--ghost btn--sm">翌5営業日</button>
            <button class="btn btn--primary btn--sm">月末営業日</button>
          </div>
        </header>
        <div class="cal__grid">
          <div class="cal__dow cal__dow--sun">日</div><div class="cal__dow">月</div><div class="cal__dow">火</div><div class="cal__dow">水</div><div class="cal__dow">木</div><div class="cal__dow">金</div><div class="cal__dow cal__dow--sat">土</div>
          <div class="cal__d cal__d--out">26</div><div class="cal__d cal__d--out">27</div><div class="cal__d cal__d--out">28</div><div class="cal__d cal__d--out">29</div><div class="cal__d cal__d--out">30</div><div class="cal__d cal__d--out">1</div><div class="cal__d cal__d--out">2</div>
          <div class="cal__d cal__d--sun">3<span class="cal__hol">憲法</span></div><div class="cal__d cal__d--hol">4<span class="cal__hol">みどり</span></div><div class="cal__d cal__d--hol">5<span class="cal__hol">こども</span></div><div class="cal__d cal__d--hol">6<span class="cal__hol">振替</span></div><div class="cal__d">7</div><div class="cal__d">8</div><div class="cal__d cal__d--sat">9</div>
          <div class="cal__d cal__d--sun">10</div><div class="cal__d">11</div><div class="cal__d">12</div><div class="cal__d cal__d--today">13</div><div class="cal__d">14</div><div class="cal__d">15</div><div class="cal__d cal__d--sat">16</div>
          <div class="cal__d cal__d--sun">17</div><div class="cal__d">18</div><div class="cal__d">19</div><div class="cal__d">20</div><div class="cal__d">21</div><div class="cal__d">22</div><div class="cal__d cal__d--sat">23</div>
          <div class="cal__d cal__d--sun">24</div><div class="cal__d">25</div><div class="cal__d cal__d--biz-off">26<span class="cal__hol">創立</span></div><div class="cal__d">27</div><div class="cal__d">28</div><div class="cal__d cal__d--sel">29</div><div class="cal__d cal__d--sat">30</div>
          <div class="cal__d cal__d--sun">31</div><div class="cal__d cal__d--out">1</div><div class="cal__d cal__d--out">2</div><div class="cal__d cal__d--out">3</div><div class="cal__d cal__d--out">4</div><div class="cal__d cal__d--out">5</div><div class="cal__d cal__d--out">6</div>
        </div>
        <footer class="cal__foot">
          <div class="row" style="flex-wrap: wrap;">
            <span class="cal__legend"><span class="lg lg--today"></span>今日</span>
            <span class="cal__legend"><span class="lg lg--sel"></span>選択中</span>
            <span class="cal__legend"><span class="lg lg--hol"></span>祝日</span>
            <span class="cal__legend"><span class="lg lg--off"></span>休業日</span>
          </div>
          <span class="muted small mono">選択: 2026-05-29（金） ／ 月末営業日</span>
        </footer>
      </div>`
  },

  /* ===== 締め日選択 ===== */
  "closing-day": {
    id: "B-CLS", tag: "<sgt-closing-day>", name: "締め日選択", priority: "must",
    desc: "請求の締日と支払サイトをまとめて設定。月末・10日・20日のプリセット + 任意日 + サイト（即日 / 翌月末 / 翌々月10日 等）。",
    accept: "受入: 「締日 + 支払サイト」から実際の支払期日（営業日換算）を即時表示。",
    body: `
      <div class="cls">
        <div class="hf"><label class="hf__label">締日</label>
          <div class="hf__ctrl">
            <div class="row" style="flex-wrap: wrap;">
              <button class="btn btn--ghost btn--sm">10日</button>
              <button class="btn btn--ghost btn--sm">15日</button>
              <button class="btn btn--ghost btn--sm">20日</button>
              <button class="btn btn--ghost btn--sm">25日</button>
              <button class="btn btn--primary btn--sm">月末</button>
              <span style="border-left: 1px solid var(--line); height: 24px;"></span>
              <span class="muted small">任意の日</span>
              <div class="input" style="max-width: 100px;"><span class="input__value mono">31</span><span class="input__suffix small">日</span></div>
            </div></div></div>
        <div class="hf"><label class="hf__label">支払サイト</label>
          <div class="hf__ctrl">
            <div class="row" style="flex-wrap: wrap;">
              <span class="radio"><span class="radio__dot"></span>即日（締日と同日）</span>
              <span class="radio"><span class="radio__dot"></span>当月末</span>
              <span class="radio checked"><span class="radio__dot"></span>翌月末</span>
              <span class="radio"><span class="radio__dot"></span>翌々月末</span>
              <span class="radio"><span class="radio__dot"></span>翌月10日</span>
              <span class="radio"><span class="radio__dot"></span>翌々月10日</span>
            </div></div></div>
        <div class="hf"><label class="hf__label">支払期日が休業日の場合</label>
          <div class="hf__ctrl row">
            <span class="radio checked"><span class="radio__dot"></span>翌営業日に繰下げ</span>
            <span class="radio"><span class="radio__dot"></span>前営業日に繰上げ</span>
            <span class="radio"><span class="radio__dot"></span>そのまま</span>
          </div></div>
        <div class="cls__preview">
          <div class="cls__preview__head">プレビュー（4月〜6月の請求書を例に）</div>
          <table class="table" style="margin: 0;">
            <thead><tr><th>請求月</th><th>締日</th><th>支払サイト</th><th>本来の支払期日</th><th>営業日換算</th></tr></thead>
            <tbody>
              <tr><td>2026-04</td><td class="mono">04-30 (木)</td><td class="muted small">翌月末</td><td class="mono">2026-05-31 (日)</td><td class="mono"><strong>2026-06-01 (月)</strong> <span class="badge badge--warn">繰下げ</span></td></tr>
              <tr class="zebra"><td>2026-05</td><td class="mono">05-31 (日)</td><td class="muted small">翌月末</td><td class="mono">2026-06-30 (火)</td><td class="mono"><strong>2026-06-30 (火)</strong></td></tr>
              <tr><td>2026-06</td><td class="mono">06-30 (火)</td><td class="muted small">翌月末</td><td class="mono">2026-07-31 (金)</td><td class="mono"><strong>2026-07-31 (金)</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>`
  },

  /* ===== 銀行口座入力 ===== */
  "bank-account": {
    id: "B-BNK", tag: "<sgt-bank-account>", name: "銀行口座入力", priority: "must",
    desc: "銀行コード4桁・支店コード3桁・口座種別・口座番号7桁・名義カナ。コード入力で名称を自動補完。",
    accept: "受入: 全銀協のフォーマット（半角・桁数）に正規化。チェックデジット検証の警告あり。",
    body: `
      <div class="form-section">
        <div class="hf"><label class="hf__label">金融機関 <span class="req">必須</span></label>
          <div class="hf__ctrl row">
            <div class="input" style="max-width: 90px;"><span class="input__prefix small muted">CD</span><span class="input__value mono">0001</span></div>
            <div style="color: var(--muted);">${I6.arrow}</div>
            <div class="input" style="flex: 1; max-width: 280px;"><span class="input__value">みずほ銀行</span></div>
            <button class="btn btn--ghost btn--sm">${I6.search}<span>金融機関を検索</span></button>
          </div></div>
        <div class="hf"><label class="hf__label">支店 <span class="req">必須</span></label>
          <div class="hf__ctrl row">
            <div class="input" style="max-width: 90px;"><span class="input__prefix small muted">CD</span><span class="input__value mono">001</span></div>
            <div style="color: var(--muted);">${I6.arrow}</div>
            <div class="input" style="flex: 1; max-width: 280px;"><span class="input__value">東京営業部</span></div>
          </div></div>
        <div class="hf"><label class="hf__label">口座種別 <span class="req">必須</span></label>
          <div class="hf__ctrl row">
            <span class="radio checked"><span class="radio__dot"></span>普通</span>
            <span class="radio"><span class="radio__dot"></span>当座</span>
            <span class="radio"><span class="radio__dot"></span>貯蓄</span>
            <span class="radio"><span class="radio__dot"></span>その他</span>
          </div></div>
        <div class="hf"><label class="hf__label">口座番号 <span class="req">必須</span></label>
          <div class="hf__ctrl col">
            <div class="input" style="max-width: 200px;"><span class="input__value mono">1234567</span></div>
            <span class="field__hint">${I6.info}<span>半角数字7桁。先頭の0も省略しないでください。</span></span></div></div>
        <div class="hf"><label class="hf__label">口座名義 <span class="req">必須</span></label>
          <div class="hf__ctrl col">
            <div class="input"><span class="input__value mono">ｶ)ｻﾝﾌﾟﾙｼｮｳｼﾞ</span></div>
            <span class="field__hint">${I6.info}<span>全銀フォーマット（半角カナ・記号）に自動変換します。「株式会社」は「ｶ)」「(ｶ」、「合同会社」は「ﾄﾞ)」など。</span></span></div></div>
        <div class="hf"><label class="hf__label">プレビュー</label>
          <div class="hf__ctrl">
            <div class="bank-card">
              <div class="bank-card__row"><span class="muted small">金融機関</span><strong>みずほ銀行（0001）</strong></div>
              <div class="bank-card__row"><span class="muted small">支店</span><strong>東京営業部（001）</strong></div>
              <div class="bank-card__row"><span class="muted small">種別 / 番号</span><strong class="mono">普通 1234567</strong></div>
              <div class="bank-card__row"><span class="muted small">名義</span><strong class="mono">ｶ)ｻﾝﾌﾟﾙｼｮｳｼﾞ</strong></div>
            </div></div></div>
      </div>`
  },

  /* ===== 法人番号入力 ===== */
  "corp-number": {
    id: "B-CN", tag: "<sgt-corporate-number>", name: "法人番号入力", priority: "must",
    desc: "13桁の法人番号入力。チェックデジット検証 + 国税庁 法人番号公表サイト連携で商号・所在地を取得。",
    accept: "受入: 入力中はチェックデジット計算結果をリアルタイム表示。検証OKで「商号を取得」ボタン活性化。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">未入力</div>
          <div class="variant__stage"><div class="field"><label class="field__label">法人番号</label>
            <div class="row">
              <div class="input" style="max-width: 220px;"><span class="input__value mono muted">_____________</span></div>
              <button class="btn btn--ghost btn--sm" disabled>${I6.search}<span>商号を取得</span></button>
            </div>
            <span class="field__hint">${I6.info}<span>13桁の半角数字（先頭の「T」は不要）</span></span></div></div></div>
        <div class="variant"><div class="variant__label">入力中（検証中）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">法人番号</label>
            <div class="row">
              <div class="input input--focus" style="max-width: 220px;"><span class="input__value mono">901230123456</span></div>
              <span class="muted small">12 / 13桁</span>
              <button class="btn btn--ghost btn--sm" disabled>${I6.search}<span>商号を取得</span></button>
            </div></div></div></div>
        <div class="variant"><div class="variant__label">検証OK</div>
          <div class="variant__stage"><div class="field"><label class="field__label">法人番号</label>
            <div class="row">
              <div class="input" style="max-width: 220px;"><span class="input__value mono">9012301234567</span><span class="input__suffix" style="color: var(--ok);">${I6.check}</span></div>
              <button class="btn btn--sm">${I6.search}<span>商号を取得</span></button>
            </div>
            <span class="field__ok">${I6.check}<span>チェックデジットOK（13桁形式）</span></span></div></div></div>
        <div class="variant"><div class="variant__label">取得後（読取専用）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">法人番号</label>
            <div class="input" style="max-width: 220px;"><span class="input__value mono">9012301234567</span><span class="input__suffix" style="color: var(--ok);">${I6.check}</span></div>
            <div class="corp-card">
              <div class="row" style="justify-content: space-between;">
                <strong>合同会社 シゴト</strong>
                <span class="badge badge--issued">適格事業者</span>
              </div>
              <div class="muted small">法人種別: 合同会社 ／ 設立年月日: 2015-04-01</div>
              <div class="muted small">本店: 〒100-0001 東京都千代田区千代田1-1</div>
              <div class="muted small">最終確認: 2026-04-26 ／ <a href="#">国税庁法人番号公表サイトで確認</a></div>
            </div></div></div></div>
        <div class="variant" style="grid-column: span 2;"><div class="variant__label">エラー（チェックデジット不一致）</div>
          <div class="variant__stage"><div class="field"><label class="field__label">法人番号</label>
            <div class="input input--error" style="max-width: 220px;"><span class="input__value mono">9012301234560</span><span class="input__suffix" style="color: var(--danger);">${I6.warn}</span></div>
            <span class="field__error">${I6.warn}<span>チェックデジットが一致しません（正しくは末尾「7」）。入力をご確認ください。</span></span></div></div></div>
      </div>`
  },

  /* ===== 印影プレースホルダー ===== */
  "seal": {
    id: "B-SEAL", tag: "<sgt-seal>", name: "印影プレースホルダー", priority: "should",
    desc: "印鑑の電子化に伴う表示部品。担当印・部署印・代表印の3種、`未捺印`/`電子印影`/`捺印待ち` の状態を表現。",
    accept: "受入: 画像登録があれば差し替え。CSS のみで赤丸 + 縦書きテキストの「角印・丸印」を再現。",
    body: `
      <div class="variants">
        <div class="variant"><div class="variant__label">担当印（丸印・電子）</div>
          <div class="variant__stage" style="text-align: center;">
            <div class="seal seal--round">佐藤</div>
            <div class="muted small" style="margin-top: 8px;">電子印影 ／ 04-26 10:12 押印</div>
          </div></div>
        <div class="variant"><div class="variant__label">代表印（丸印 / 二重円）</div>
          <div class="variant__stage" style="text-align: center;">
            <div class="seal seal--round seal--double">代表<br>取締<br>役印</div>
            <div class="muted small" style="margin-top: 8px;">山田 太郎</div>
          </div></div>
        <div class="variant"><div class="variant__label">部署印（角印）</div>
          <div class="variant__stage" style="text-align: center;">
            <div class="seal seal--square">合同<br>会社<br>シゴト之印</div>
            <div class="muted small" style="margin-top: 8px;">経理部 ／ 04-26</div>
          </div></div>
        <div class="variant"><div class="variant__label">捺印待ち（点線）</div>
          <div class="variant__stage" style="text-align: center;">
            <div class="seal seal--round seal--empty">${I6.plus}</div>
            <div class="muted small" style="margin-top: 8px;">部長承認後に自動押印</div>
          </div></div>
        <div class="variant"><div class="variant__label">3つ並び（A4帳票内）</div>
          <div class="variant__stage">
            <div class="seal-row">
              <div class="seal-row__cell"><div class="muted small">担当</div><div class="seal seal--round seal--sm">佐藤</div></div>
              <div class="seal-row__cell"><div class="muted small">課長</div><div class="seal seal--round seal--sm">山田</div></div>
              <div class="seal-row__cell"><div class="muted small">部長</div><div class="seal seal--round seal--sm seal--empty">${I6.plus}</div></div>
            </div></div></div>
        <div class="variant"><div class="variant__label">取消線付き</div>
          <div class="variant__stage" style="text-align: center;">
            <div class="seal seal--round seal--void">高橋</div>
            <div class="muted small" style="margin-top: 8px;">04-25 16:30 取消（差戻しのため）</div>
          </div></div>
      </div>`
  }
};



/* ================================================================
   Merge all CARDS versions
   ================================================================ */
Object.assign(CARDS, CARDS_V3, CARDS_V4, CARDS_V5, CARDS_V6);
window.CARDS = CARDS;
