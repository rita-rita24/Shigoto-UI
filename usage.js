/* Shigoto UI — Usage examples per component (HTML / Vanilla JS / React / Vue) */
const USAGE = {
  "money-input": {
    html: `<span class="k">&lt;sgt-money-input</span>
  <span class="a">label</span>=<span class="s">"見積金額"</span>
  <span class="a">value</span>=<span class="s">"1234567"</span>
  <span class="a">currency</span>=<span class="s">"JPY"</span>
  <span class="a">required</span><span class="k">&gt;&lt;/sgt-money-input&gt;</span>`,
    vanilla: `<span class="c">// Web Component直接利用</span>
<span class="k">import</span> <span class="s">'@shigoto-ui/elements/money-input'</span>;

<span class="k">const</span> <span class="p">el</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-money-input'</span>);
<span class="p">el</span>.<span class="a">value</span> = <span class="n">98000</span>;
<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; {
  <span class="p">console</span>.log(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">value</span>); <span class="c">// 数値</span>
});
<span class="p">el</span>.addEventListener(<span class="s">'sgt:validate'</span>, (<span class="p">e</span>) =&gt; {
  <span class="p">console</span>.log(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">issues</span>);
});`,
    react: `<span class="k">import</span> { <span class="p">MoneyInput</span> } <span class="k">from</span> <span class="s">'@shigoto-ui/react'</span>;

<span class="k">function</span> <span class="p">QuoteForm</span>() {
  <span class="k">const</span> [<span class="p">amount</span>, <span class="p">setAmount</span>] = <span class="p">React</span>.useState(<span class="n">0</span>);
  <span class="k">return</span> (
    <span class="k">&lt;MoneyInput</span>
      <span class="a">label</span>=<span class="s">"見積金額"</span>
      <span class="a">value</span>={<span class="p">amount</span>}
      <span class="a">currency</span>=<span class="s">"JPY"</span>
      <span class="a">required</span>
      <span class="a">onChange</span>={<span class="p">setAmount</span>}
    /<span class="k">&gt;</span>
  );
}`,
    vue: `<span class="k">&lt;script setup&gt;</span>
<span class="k">import</span> <span class="s">'@shigoto-ui/elements/money-input'</span>;
<span class="k">import</span> { ref } <span class="k">from</span> <span class="s">'vue'</span>;
<span class="k">const</span> <span class="p">amount</span> = ref(<span class="n">0</span>);
<span class="k">&lt;/script&gt;</span>

<span class="k">&lt;template&gt;</span>
  <span class="k">&lt;sgt-money-input</span>
    <span class="a">label</span>=<span class="s">"見積金額"</span>
    <span class="a">:value</span>=<span class="s">"amount"</span>
    <span class="a">currency</span>=<span class="s">"JPY"</span>
    <span class="a">required</span>
    <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (amount = e.detail.value)"</span>
  /<span class="k">&gt;</span>
<span class="k">&lt;/template&gt;</span>`
  },

  "phone-input": {
    html: `<span class="k">&lt;sgt-phone-input</span>
  <span class="a">label</span>=<span class="s">"代表電話"</span>
  <span class="a">value</span>=<span class="s">"0312345678"</span>
  <span class="a">type-detect</span><span class="k">&gt;&lt;/sgt-phone-input&gt;</span>`,
    vanilla: `<span class="k">import</span> <span class="s">'@shigoto-ui/elements/phone-input'</span>;
<span class="k">import</span> { phone } <span class="k">from</span> <span class="s">'@shigoto-ui/formatters'</span>;

phone.format(<span class="s">'０９０１２３４５６７８'</span>); <span class="c">// '090-1234-5678'</span>`,
    react: `<span class="k">import</span> { <span class="p">PhoneInput</span> } <span class="k">from</span> <span class="s">'@shigoto-ui/react'</span>;

<span class="k">&lt;PhoneInput</span>
  <span class="a">label</span>=<span class="s">"代表電話"</span>
  <span class="a">value</span>={<span class="p">phone</span>}
  <span class="a">typeDetect</span>
  <span class="a">onChange</span>={<span class="p">setPhone</span>}
/<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-phone-input</span>
  <span class="a">label</span>=<span class="s">"代表電話"</span>
  <span class="a">:value</span>=<span class="s">"phone"</span>
  <span class="a">type-detect</span>
  <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (phone = e.detail.value)"</span>
/<span class="k">&gt;</span>`
  },

  "postal-input": {
    html: `<span class="k">&lt;sgt-postal-code-input</span>
  <span class="a">label</span>=<span class="s">"郵便番号"</span>
  <span class="a">value</span>=<span class="s">"100-0001"</span>
  <span class="a">resolve</span><span class="k">&gt;&lt;/sgt-postal-code-input&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">el</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-postal-code-input'</span>);
<span class="p">el</span>.addEventListener(<span class="s">'sgt:postal-resolved'</span>, (<span class="p">e</span>) =&gt; {
  <span class="c">// e.detail = { prefecture, city, town }</span>
});`,
    react: `<span class="k">&lt;PostalCodeInput</span>
  <span class="a">label</span>=<span class="s">"郵便番号"</span>
  <span class="a">value</span>={<span class="p">zip</span>}
  <span class="a">resolve</span>
  <span class="a">onResolve</span>={(<span class="p">addr</span>) =&gt; <span class="p">setAddress</span>(<span class="p">addr</span>)}
/<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-postal-code-input</span>
  <span class="a">label</span>=<span class="s">"郵便番号"</span>
  <span class="a">:value</span>=<span class="s">"zip"</span>
  <span class="a">resolve</span>
  <span class="a">@sgt:postal-resolved</span>=<span class="s">"e =&gt; (address = e.detail)"</span>
/<span class="k">&gt;</span>`
  },

  "address-input": {
    html: `<span class="k">&lt;sgt-address-input</span>
  <span class="a">value</span>=<span class="s">'{"prefecture":"東京都","city":"千代田区"}'</span>
<span class="k">&gt;&lt;/sgt-address-input&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">el</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-address-input'</span>);
<span class="p">el</span>.<span class="a">value</span> = { <span class="p">prefecture</span>: <span class="s">'東京都'</span>, <span class="p">city</span>: <span class="s">'千代田区'</span>, <span class="p">street</span>: <span class="s">'千代田1-1'</span> };`,
    react: `<span class="k">&lt;AddressInput</span> <span class="a">value</span>={<span class="p">addr</span>} <span class="a">onChange</span>={<span class="p">setAddress</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-address-input</span> <span class="a">:value</span>=<span class="s">"addr"</span> <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (addr = e.detail.value)"</span> /<span class="k">&gt;</span>`
  },

  "date-input": {
    html: `<span class="k">&lt;sgt-date-input</span>
  <span class="a">label</span>=<span class="s">"発行日"</span>
  <span class="a">value</span>=<span class="s">"2026-04-26"</span>
  <span class="a">show-wareki</span><span class="k">&gt;&lt;/sgt-date-input&gt;</span>`,
    vanilla: `<span class="k">import</span> { date } <span class="k">from</span> <span class="s">'@shigoto-ui/formatters'</span>;
date.toWareki(<span class="s">'2026-04-26'</span>); <span class="c">// '令和8年4月26日'</span>`,
    react: `<span class="k">&lt;DateInput</span>
  <span class="a">label</span>=<span class="s">"発行日"</span>
  <span class="a">value</span>={<span class="p">issued</span>}
  <span class="a">showWareki</span>
  <span class="a">onChange</span>={<span class="p">setIssued</span>}
/<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-date-input</span> <span class="a">label</span>=<span class="s">"発行日"</span> <span class="a">:value</span>=<span class="s">"issued"</span> <span class="a">show-wareki</span> /<span class="k">&gt;</span>`
  },

  "line-item": {
    html: `<span class="k">&lt;sgt-line-item-table</span>
  <span class="a">tax-rate</span>=<span class="s">"0.10"</span>
  <span class="a">allow-csv</span><span class="k">&gt;</span>
  <span class="k">&lt;script type=</span><span class="s">"application/json"</span> <span class="k">slot=</span><span class="s">"items"</span><span class="k">&gt;</span>
    [{<span class="s">"name"</span>:<span class="s">"導入支援"</span>,<span class="s">"qty"</span>:<span class="n">2</span>,<span class="s">"price"</span>:<span class="n">1200000</span>}]
  <span class="k">&lt;/script&gt;</span>
<span class="k">&lt;/sgt-line-item-table&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">table</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-line-item-table'</span>);
<span class="p">table</span>.<span class="a">items</span> = [
  { <span class="p">name</span>: <span class="s">'導入支援'</span>, <span class="p">qty</span>: <span class="n">2</span>, <span class="p">price</span>: <span class="n">1200000</span> }
];
<span class="p">table</span>.addEventListener(<span class="s">'sgt:row-add'</span>, () =&gt; <span class="c">/* ... */</span>);`,
    react: `<span class="k">&lt;LineItemTable</span>
  <span class="a">items</span>={<span class="p">items</span>}
  <span class="a">taxRate</span>={<span class="n">0.10</span>}
  <span class="a">allowCsv</span>
  <span class="a">onChange</span>={<span class="p">setItems</span>}
/<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-line-item-table</span>
  <span class="a">:items</span>=<span class="s">"items"</span>
  <span class="a">tax-rate</span>=<span class="s">"0.10"</span>
  <span class="a">allow-csv</span>
  <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (items = e.detail.items)"</span>
/<span class="k">&gt;</span>`
  },

  "validation": {
    html: `<span class="k">&lt;sgt-validation-summary</span> <span class="a">target</span>=<span class="s">"#quote-form"</span><span class="k">&gt;&lt;/sgt-validation-summary&gt;</span>
<span class="k">&lt;form id=</span><span class="s">"quote-form"</span><span class="k">&gt;</span>...<span class="k">&lt;/form&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">vs</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-validation-summary'</span>);
<span class="p">vs</span>.<span class="a">issues</span> = [
  { <span class="p">field</span>: <span class="s">'amount'</span>, <span class="p">code</span>: <span class="s">'invalid'</span>, <span class="p">message</span>: <span class="s">'金額が不正です'</span>, <span class="p">severity</span>: <span class="s">'error'</span> }
];`,
    react: `<span class="k">&lt;ValidationSummary</span> <span class="a">issues</span>={<span class="p">issues</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-validation-summary</span> <span class="a">:issues</span>=<span class="s">"issues"</span> /<span class="k">&gt;</span>`
  },

  "status": {
    html: `<span class="k">&lt;sgt-status-badge</span> <span class="a">status</span>=<span class="s">"pending"</span><span class="k">&gt;&lt;/sgt-status-badge&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">badge</span> = <span class="p">document</span>.createElement(<span class="s">'sgt-status-badge'</span>);
<span class="p">badge</span>.<span class="a">status</span> = <span class="s">'approved'</span>; <span class="c">// draft|review|pending|approved|rejected|cancel</span>`,
    react: `<span class="k">&lt;StatusBadge</span> <span class="a">status</span>=<span class="s">"pending"</span> /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-status-badge</span> <span class="a">:status</span>=<span class="s">"quote.status"</span> /<span class="k">&gt;</span>`
  },

  "a4": {
    html: `<span class="k">&lt;sgt-a4-print-layout</span> <span class="a">size</span>=<span class="s">"A4"</span> <span class="a">orientation</span>=<span class="s">"portrait"</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-quote-preview</span> <span class="a">value</span>=<span class="s">"..."</span><span class="k">&gt;&lt;/sgt-quote-preview&gt;</span>
<span class="k">&lt;/sgt-a4-print-layout&gt;</span>`,
    vanilla: `<span class="p">document</span>.querySelector(<span class="s">'sgt-a4-print-layout'</span>).print();`,
    react: `<span class="k">&lt;A4PrintLayout&gt;</span>
  <span class="k">&lt;QuotePreview</span> <span class="a">value</span>={<span class="p">quote</span>} /<span class="k">&gt;</span>
<span class="k">&lt;/A4PrintLayout&gt;</span>`,
    vue: `<span class="k">&lt;sgt-a4-print-layout&gt;</span>
  <span class="k">&lt;sgt-quote-preview</span> <span class="a">:value</span>=<span class="s">"quote"</span> /<span class="k">&gt;</span>
<span class="k">&lt;/sgt-a4-print-layout&gt;</span>`
  },

  "csv-import": {
    html: `<span class="k">&lt;sgt-csv-import</span>
  <span class="a">accept</span>=<span class="s">".csv"</span>
  <span class="a">required-headers</span>=<span class="s">"name,qty,price"</span><span class="k">&gt;&lt;/sgt-csv-import&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">imp</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-csv-import'</span>);
<span class="p">imp</span>.addEventListener(<span class="s">'sgt:csv-loaded'</span>, (<span class="p">e</span>) =&gt; {
  <span class="p">console</span>.log(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">rows</span>);
});`,
    react: `<span class="k">&lt;CsvImport</span>
  <span class="a">requiredHeaders</span>={[<span class="s">'name'</span>, <span class="s">'qty'</span>, <span class="s">'price'</span>]}
  <span class="a">onLoaded</span>={(<span class="p">rows</span>) =&gt; <span class="p">setItems</span>(<span class="p">rows</span>)}
/<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-csv-import</span>
  <span class="a">required-headers</span>=<span class="s">"name,qty,price"</span>
  <span class="a">@sgt:csv-loaded</span>=<span class="s">"e =&gt; (items = e.detail.rows)"</span>
/<span class="k">&gt;</span>`
  },

  "csv-export": {
    html: `<span class="k">&lt;sgt-csv-export</span>
  <span class="a">filename</span>=<span class="s">"quote-001.csv"</span>
  <span class="a">encoding</span>=<span class="s">"utf-8-bom"</span><span class="k">&gt;</span>明細をCSVで出力<span class="k">&lt;/sgt-csv-export&gt;</span>`,
    vanilla: `<span class="k">import</span> { csv } <span class="k">from</span> <span class="s">'@shigoto-ui/csv'</span>;
csv.export(<span class="p">items</span>, { <span class="p">encoding</span>: <span class="s">'utf-8-bom'</span> });`,
    react: `<span class="k">&lt;CsvExport</span> <span class="a">rows</span>={<span class="p">items</span>} <span class="a">filename</span>=<span class="s">"quote.csv"</span> /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-csv-export</span> <span class="a">:rows</span>=<span class="s">"items"</span> <span class="a">filename</span>=<span class="s">"quote.csv"</span> /<span class="k">&gt;</span>`
  },

  "tax": {
    html: `<span class="k">&lt;sgt-tax-summary</span> <span class="a">subtotal</span>=<span class="s">"2769000"</span> <span class="a">rate</span>=<span class="s">"0.10"</span><span class="k">&gt;&lt;/sgt-tax-summary&gt;</span>`,
    vanilla: `<span class="k">import</span> { calcTax } <span class="k">from</span> <span class="s">'@shigoto-ui/core'</span>;
calcTax({ <span class="p">subtotal</span>: <span class="n">2769000</span>, <span class="p">rate</span>: <span class="n">0.10</span> });`,
    react: `<span class="k">&lt;TaxSummary</span> <span class="a">subtotal</span>={<span class="p">subtotal</span>} <span class="a">rate</span>={<span class="n">0.10</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-tax-summary</span> <span class="a">:subtotal</span>=<span class="s">"subtotal"</span> <span class="a">rate</span>=<span class="s">"0.10"</span> /<span class="k">&gt;</span>`
  },

  "confirm": {
    html: `<span class="k">&lt;sgt-confirmation-panel</span>
  <span class="a">before</span>=<span class="s">"..."</span> <span class="a">after</span>=<span class="s">"..."</span><span class="k">&gt;&lt;/sgt-confirmation-panel&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">cp</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-confirmation-panel'</span>);
<span class="p">cp</span>.<span class="a">before</span> = <span class="p">prevQuote</span>;
<span class="p">cp</span>.<span class="a">after</span> = <span class="p">nextQuote</span>;`,
    react: `<span class="k">&lt;ConfirmationPanel</span> <span class="a">before</span>={<span class="p">prev</span>} <span class="a">after</span>={<span class="p">next</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-confirmation-panel</span> <span class="a">:before</span>=<span class="s">"prev"</span> <span class="a">:after</span>=<span class="s">"next"</span> /<span class="k">&gt;</span>`
  },

  "timeline": {
    html: `<span class="k">&lt;sgt-approval-timeline</span> <span class="a">steps</span>=<span class="s">"..."</span><span class="k">&gt;&lt;/sgt-approval-timeline&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">steps</span> = [
  { <span class="p">who</span>: <span class="s">'佐藤'</span>, <span class="p">action</span>: <span class="s">'起票'</span>, <span class="p">at</span>: <span class="s">'2026-04-24'</span>, <span class="p">state</span>: <span class="s">'done'</span> },
  { <span class="p">who</span>: <span class="s">'山田'</span>, <span class="p">action</span>: <span class="s">'確認中'</span>, <span class="p">state</span>: <span class="s">'current'</span> }
];`,
    react: `<span class="k">&lt;ApprovalTimeline</span> <span class="a">steps</span>={<span class="p">steps</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-approval-timeline</span> <span class="a">:steps</span>=<span class="s">"steps"</span> /<span class="k">&gt;</span>`
  },

  "master": {
    html: `<span class="k">&lt;sgt-master-select</span>
  <span class="a">label</span>=<span class="s">"取引先"</span>
  <span class="a">placeholder</span>=<span class="s">"会社名 / コード"</span><span class="k">&gt;&lt;/sgt-master-select&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">fetcher</span> = <span class="k">async</span> (<span class="p">q</span>) =&gt; {
  <span class="k">const</span> <span class="p">r</span> = <span class="k">await</span> fetch(<span class="s">'/api/customers?q='</span> + <span class="p">q</span>);
  <span class="k">return</span> <span class="p">r</span>.json();
};`,
    react: `<span class="k">&lt;MasterSelect</span>
  <span class="a">label</span>=<span class="s">"取引先"</span>
  <span class="a">fetcher</span>={searchCustomers}
  <span class="a">value</span>={<span class="p">customer</span>}
  <span class="a">onChange</span>={<span class="p">setCustomer</span>}
/<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-master-select</span> <span class="a">label</span>=<span class="s">"取引先"</span> <span class="a">:fetcher</span>=<span class="s">"searchCustomers"</span> /<span class="k">&gt;</span>`
  },

  "name-input": {
    html: `<span class="k">&lt;sgt-name-input</span> <span class="a">value</span>=<span class="s">'{"sei":"佐藤","mei":"花子"}'</span> <span class="a">show-kana</span><span class="k">&gt;&lt;/sgt-name-input&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">value</span> = { <span class="p">sei</span>: <span class="s">'佐藤'</span>, <span class="p">mei</span>: <span class="s">'花子'</span>, <span class="p">seiKana</span>: <span class="s">'サトウ'</span>, <span class="p">meiKana</span>: <span class="s">'ハナコ'</span> };`,
    react: `<span class="k">&lt;NameInput</span> <span class="a">value</span>={<span class="p">name</span>} <span class="a">showKana</span> <span class="a">onChange</span>={<span class="p">setName</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-name-input</span> <span class="a">:value</span>=<span class="s">"name"</span> <span class="a">show-kana</span> /<span class="k">&gt;</span>`
  },

  "bank": {
    html: `<span class="k">&lt;sgt-bank-account-input</span> <span class="a">value</span>=<span class="s">"..."</span><span class="k">&gt;&lt;/sgt-bank-account-input&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">value</span> = {
  <span class="p">bankCode</span>: <span class="s">'0001'</span>, <span class="p">branchCode</span>: <span class="s">'001'</span>,
  <span class="p">type</span>: <span class="s">'futsu'</span>, <span class="p">number</span>: <span class="s">'1234567'</span>,
  <span class="p">holderKana</span>: <span class="s">'カ）シゴト'</span>
};`,
    react: `<span class="k">&lt;BankAccountInput</span> <span class="a">value</span>={<span class="p">bank</span>} <span class="a">onChange</span>={<span class="p">setBank</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-bank-account-input</span> <span class="a">:value</span>=<span class="s">"bank"</span> /<span class="k">&gt;</span>`
  },

  "invoice-id": {
    html: `<span class="k">&lt;sgt-invoice-id-input</span> <span class="a">value</span>=<span class="s">"T1234567890123"</span><span class="k">&gt;&lt;/sgt-invoice-id-input&gt;</span>`,
    vanilla: `<span class="k">import</span> { invoiceId } <span class="k">from</span> <span class="s">'@shigoto-ui/validators'</span>;
invoiceId.isValid(<span class="s">'T1234567890123'</span>); <span class="c">// true (T + 13桁)</span>`,
    react: `<span class="k">&lt;InvoiceIdInput</span> <span class="a">value</span>={<span class="p">id</span>} <span class="a">onChange</span>={<span class="p">setId</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-invoice-id-input</span> <span class="a">:value</span>=<span class="s">"id"</span> /<span class="k">&gt;</span>`
  },

  "period-select": {
    html: `<span class="k">&lt;sgt-period-select</span> <span class="a">presets</span>=<span class="s">"today,this-month,last-month,fy"</span><span class="k">&gt;&lt;/sgt-period-select&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; {
  <span class="c">// e.detail = { from, to, preset }</span>
});`,
    react: `<span class="k">&lt;PeriodSelect</span> <span class="a">value</span>={<span class="p">range</span>} <span class="a">onChange</span>={<span class="p">setRange</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-period-select</span> <span class="a">:value</span>=<span class="s">"range"</span> /<span class="k">&gt;</span>`
  },

  "search-filter": {
    html: `<span class="k">&lt;sgt-search-filter</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-filter-chip</span> <span class="a">field</span>=<span class="s">"status"</span> <span class="a">value</span>=<span class="s">"pending"</span><span class="k">&gt;</span>承認待ち<span class="k">&lt;/sgt-filter-chip&gt;</span>
<span class="k">&lt;/sgt-search-filter&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; { <span class="c">/* e.detail.filters */</span> });`,
    react: `<span class="k">&lt;SearchFilter</span>
  <span class="a">filters</span>={<span class="p">filters</span>}
  <span class="a">onChange</span>={<span class="p">setFilters</span>}
/<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-search-filter</span> <span class="a">:filters</span>=<span class="s">"filters"</span> /<span class="k">&gt;</span>`
  },

  "data-table": {
    html: `<span class="k">&lt;sgt-data-table</span>
  <span class="a">columns</span>=<span class="s">"..."</span> <span class="a">rows</span>=<span class="s">"..."</span>
  <span class="a">sticky-header</span> <span class="a">selectable</span><span class="k">&gt;&lt;/sgt-data-table&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">columns</span> = [
  { <span class="p">key</span>: <span class="s">'no'</span>, <span class="p">label</span>: <span class="s">'#'</span>, <span class="p">width</span>: <span class="n">40</span> },
  { <span class="p">key</span>: <span class="s">'name'</span>, <span class="p">label</span>: <span class="s">'品目'</span> },
  { <span class="p">key</span>: <span class="s">'amount'</span>, <span class="p">label</span>: <span class="s">'金額'</span>, <span class="p">align</span>: <span class="s">'right'</span> }
];
<span class="p">el</span>.<span class="a">rows</span> = <span class="p">data</span>;`,
    react: `<span class="k">&lt;DataTable</span> <span class="a">columns</span>={<span class="p">cols</span>} <span class="a">rows</span>={<span class="p">data</span>} <span class="a">selectable</span> /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-data-table</span> <span class="a">:columns</span>=<span class="s">"cols"</span> <span class="a">:rows</span>=<span class="s">"data"</span> <span class="a">selectable</span> /<span class="k">&gt;</span>`
  },

  "pagination": {
    html: `<span class="k">&lt;sgt-pagination</span> <span class="a">total</span>=<span class="s">"245"</span> <span class="a">page-size</span>=<span class="s">"20"</span> <span class="a">page</span>=<span class="s">"3"</span><span class="k">&gt;&lt;/sgt-pagination&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; <span class="p">load</span>(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">page</span>));`,
    react: `<span class="k">&lt;Pagination</span> <span class="a">total</span>={<span class="n">245</span>} <span class="a">pageSize</span>={<span class="n">20</span>} <span class="a">page</span>={<span class="p">page</span>} <span class="a">onChange</span>={<span class="p">setPage</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-pagination</span> <span class="a">:total</span>=<span class="s">"245"</span> <span class="a">page-size</span>=<span class="s">"20"</span> <span class="a">:page</span>=<span class="s">"page"</span> /<span class="k">&gt;</span>`
  },

  "tabs": {
    html: `<span class="k">&lt;sgt-tabs</span> <span class="a">active</span>=<span class="s">"items"</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-tab</span> <span class="a">name</span>=<span class="s">"basic"</span><span class="k">&gt;</span>基本情報<span class="k">&lt;/sgt-tab&gt;</span>
  <span class="k">&lt;sgt-tab</span> <span class="a">name</span>=<span class="s">"items"</span><span class="k">&gt;</span>明細<span class="k">&lt;/sgt-tab&gt;</span>
  <span class="k">&lt;sgt-tab</span> <span class="a">name</span>=<span class="s">"history"</span><span class="k">&gt;</span>履歴<span class="k">&lt;/sgt-tab&gt;</span>
<span class="k">&lt;/sgt-tabs&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; <span class="p">show</span>(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">name</span>));`,
    react: `<span class="k">&lt;Tabs</span> <span class="a">active</span>={<span class="p">tab</span>} <span class="a">onChange</span>={<span class="p">setTab</span>}<span class="k">&gt;</span>
  <span class="k">&lt;Tab</span> <span class="a">name</span>=<span class="s">"basic"</span><span class="k">&gt;</span>基本情報<span class="k">&lt;/Tab&gt;</span>
<span class="k">&lt;/Tabs&gt;</span>`,
    vue: `<span class="k">&lt;sgt-tabs</span> <span class="a">:active</span>=<span class="s">"tab"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-tabs&gt;</span>`
  },

  "breadcrumb": {
    html: `<span class="k">&lt;sgt-breadcrumb</span><span class="k">&gt;</span>
  <span class="k">&lt;a href=</span><span class="s">"/"</span><span class="k">&gt;</span>ホーム<span class="k">&lt;/a&gt;</span>
  <span class="k">&lt;a href=</span><span class="s">"/quotes"</span><span class="k">&gt;</span>見積一覧<span class="k">&lt;/a&gt;</span>
  <span class="k">&lt;span&gt;</span>Q-2026-0421<span class="k">&lt;/span&gt;</span>
<span class="k">&lt;/sgt-breadcrumb&gt;</span>`,
    vanilla: `<span class="c">// 子要素を順に並べるだけ。最後の要素が現在地として強調される。</span>`,
    react: `<span class="k">&lt;Breadcrumb</span> <span class="a">items</span>={[
  { <span class="p">label</span>: <span class="s">'ホーム'</span>, <span class="p">href</span>: <span class="s">'/'</span> },
  { <span class="p">label</span>: <span class="s">'見積一覧'</span>, <span class="p">href</span>: <span class="s">'/quotes'</span> },
  { <span class="p">label</span>: <span class="s">'Q-2026-0421'</span> }
]} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-breadcrumb</span> <span class="a">:items</span>=<span class="s">"crumbs"</span> /<span class="k">&gt;</span>`
  },

  "notice": {
    html: `<span class="k">&lt;sgt-notice</span> <span class="a">type</span>=<span class="s">"warning"</span> <span class="a">title</span>=<span class="s">"確認事項"</span><span class="k">&gt;</span>
  発行後の金額変更には承認が必要です。
<span class="k">&lt;/sgt-notice&gt;</span>`,
    vanilla: `<span class="p">document</span>.body.append(
  <span class="p">Object</span>.assign(<span class="p">document</span>.createElement(<span class="s">'sgt-notice'</span>), {
    <span class="p">type</span>: <span class="s">'success'</span>, <span class="p">title</span>: <span class="s">'保存しました'</span>
  })
);`,
    react: `<span class="k">&lt;Notice</span> <span class="a">type</span>=<span class="s">"warning"</span> <span class="a">title</span>=<span class="s">"確認事項"</span><span class="k">&gt;</span>
  発行後の金額変更には承認が必要です。
<span class="k">&lt;/Notice&gt;</span>`,
    vue: `<span class="k">&lt;sgt-notice</span> <span class="a">type</span>=<span class="s">"warning"</span> <span class="a">title</span>=<span class="s">"確認事項"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-notice&gt;</span>`
  },

  "dialog": {
    html: `<span class="k">&lt;sgt-dialog</span> <span class="a">open</span> <span class="a">title</span>=<span class="s">"見積を発行しますか？"</span><span class="k">&gt;</span>
  <span class="k">&lt;p&gt;</span>発行後は編集できません。<span class="k">&lt;/p&gt;</span>
  <span class="k">&lt;button slot=</span><span class="s">"cancel"</span><span class="k">&gt;</span>キャンセル<span class="k">&lt;/button&gt;</span>
  <span class="k">&lt;button slot=</span><span class="s">"confirm"</span><span class="k">&gt;</span>発行する<span class="k">&lt;/button&gt;</span>
<span class="k">&lt;/sgt-dialog&gt;</span>`,
    vanilla: `<span class="p">el</span>.show();
<span class="p">el</span>.addEventListener(<span class="s">'sgt:confirm'</span>, () =&gt; <span class="p">issue</span>());
<span class="p">el</span>.addEventListener(<span class="s">'sgt:cancel'</span>, () =&gt; <span class="p">el</span>.close());`,
    react: `<span class="k">&lt;Dialog</span> <span class="a">open</span>={<span class="p">open</span>} <span class="a">title</span>=<span class="s">"見積を発行しますか？"</span> <span class="a">onConfirm</span>={<span class="p">issue</span>} <span class="a">onCancel</span>={<span class="p">close</span>}<span class="k">&gt;</span>
  発行後は編集できません。
<span class="k">&lt;/Dialog&gt;</span>`,
    vue: `<span class="k">&lt;sgt-dialog</span> <span class="a">:open</span>=<span class="s">"open"</span> <span class="a">title</span>=<span class="s">"確認"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-dialog&gt;</span>`
  },

  "drawer": {
    html: `<span class="k">&lt;sgt-drawer</span> <span class="a">open</span> <span class="a">side</span>=<span class="s">"right"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-drawer&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">open</span> = <span class="k">true</span>;`,
    react: `<span class="k">&lt;Drawer</span> <span class="a">open</span>={<span class="p">open</span>} <span class="a">side</span>=<span class="s">"right"</span> <span class="a">onClose</span>={<span class="p">close</span>}<span class="k">&gt;</span>...<span class="k">&lt;/Drawer&gt;</span>`,
    vue: `<span class="k">&lt;sgt-drawer</span> <span class="a">:open</span>=<span class="s">"open"</span> <span class="a">side</span>=<span class="s">"right"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-drawer&gt;</span>`
  },

  "empty": {
    html: `<span class="k">&lt;sgt-empty-state</span>
  <span class="a">title</span>=<span class="s">"見積はまだありません"</span>
  <span class="a">action</span>=<span class="s">"新規作成"</span><span class="k">&gt;&lt;/sgt-empty-state&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:action'</span>, () =&gt; <span class="p">router</span>.push(<span class="s">'/quotes/new'</span>));`,
    react: `<span class="k">&lt;EmptyState</span> <span class="a">title</span>=<span class="s">"見積はまだありません"</span> <span class="a">action</span>=<span class="s">"新規作成"</span> <span class="a">onAction</span>={<span class="p">create</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-empty-state</span> <span class="a">title</span>=<span class="s">"見積はまだありません"</span> /<span class="k">&gt;</span>`
  },

  "skeleton": {
    html: `<span class="k">&lt;sgt-skeleton</span> <span class="a">lines</span>=<span class="s">"3"</span><span class="k">&gt;&lt;/sgt-skeleton&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">lines</span> = <span class="n">3</span>; <span class="p">el</span>.<span class="a">avatar</span> = <span class="k">true</span>;`,
    react: `<span class="k">&lt;Skeleton</span> <span class="a">lines</span>={<span class="n">3</span>} <span class="a">avatar</span> /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-skeleton</span> <span class="a">:lines</span>=<span class="s">"3"</span> /<span class="k">&gt;</span>`
  },

  "tooltip": {
    html: `<span class="k">&lt;sgt-tooltip</span> <span class="a">label</span>=<span class="s">"再計算します"</span><span class="k">&gt;</span>
  <span class="k">&lt;button&gt;</span>更新<span class="k">&lt;/button&gt;</span>
<span class="k">&lt;/sgt-tooltip&gt;</span>`,
    vanilla: `<span class="c">// hover/focus でラベルを表示。aria-describedby を自動付与。</span>`,
    react: `<span class="k">&lt;Tooltip</span> <span class="a">label</span>=<span class="s">"再計算します"</span><span class="k">&gt;&lt;button&gt;</span>更新<span class="k">&lt;/button&gt;&lt;/Tooltip&gt;</span>`,
    vue: `<span class="k">&lt;sgt-tooltip</span> <span class="a">label</span>=<span class="s">"再計算します"</span><span class="k">&gt;&lt;button&gt;</span>更新<span class="k">&lt;/button&gt;&lt;/sgt-tooltip&gt;</span>`
  },

  "inline-edit": {
    html: `<span class="k">&lt;sgt-inline-edit</span> <span class="a">value</span>=<span class="s">"株式会社サンプル"</span><span class="k">&gt;&lt;/sgt-inline-edit&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; <span class="p">save</span>(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">value</span>));`,
    react: `<span class="k">&lt;InlineEdit</span> <span class="a">value</span>={<span class="p">name</span>} <span class="a">onChange</span>={<span class="p">setName</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-inline-edit</span> <span class="a">:value</span>=<span class="s">"name"</span> /<span class="k">&gt;</span>`
  },

  "file-upload": {
    html: `<span class="k">&lt;sgt-file-upload</span>
  <span class="a">accept</span>=<span class="s">".pdf,.png,.jpg"</span>
  <span class="a">max-size</span>=<span class="s">"10MB"</span> <span class="a">multiple</span><span class="k">&gt;&lt;/sgt-file-upload&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:files'</span>, (<span class="p">e</span>) =&gt; <span class="p">upload</span>(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">files</span>));`,
    react: `<span class="k">&lt;FileUpload</span> <span class="a">accept</span>=<span class="s">".pdf"</span> <span class="a">maxSize</span>=<span class="s">"10MB"</span> <span class="a">onFiles</span>={<span class="p">upload</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-file-upload</span> <span class="a">accept</span>=<span class="s">".pdf"</span> <span class="a">max-size</span>=<span class="s">"10MB"</span> /<span class="k">&gt;</span>`
  },

  "select": {
    html: `<span class="k">&lt;sgt-select</span> <span class="a">label</span>=<span class="s">"支払条件"</span> <span class="a">value</span>=<span class="s">"end-of-next-month"</span><span class="k">&gt;</span>
  <span class="k">&lt;option value=</span><span class="s">"end-of-month"</span><span class="k">&gt;</span>当月末<span class="k">&lt;/option&gt;</span>
  <span class="k">&lt;option value=</span><span class="s">"end-of-next-month"</span><span class="k">&gt;</span>翌月末<span class="k">&lt;/option&gt;</span>
<span class="k">&lt;/sgt-select&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">value</span> = <span class="s">'end-of-next-month'</span>;`,
    react: `<span class="k">&lt;Select</span> <span class="a">label</span>=<span class="s">"支払条件"</span> <span class="a">value</span>={<span class="p">term</span>} <span class="a">onChange</span>={<span class="p">setTerm</span>} <span class="a">options</span>={<span class="p">opts</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-select</span> <span class="a">:value</span>=<span class="s">"term"</span> <span class="a">:options</span>=<span class="s">"opts"</span> /<span class="k">&gt;</span>`
  },

  "checkbox-radio-toggle": {
    html: `<span class="k">&lt;sgt-checkbox</span> <span class="a">checked</span><span class="k">&gt;</span>軽減税率対象<span class="k">&lt;/sgt-checkbox&gt;</span>
<span class="k">&lt;sgt-radio-group</span> <span class="a">name</span>=<span class="s">"tax"</span> <span class="a">value</span>=<span class="s">"included"</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-radio</span> <span class="a">value</span>=<span class="s">"included"</span><span class="k">&gt;</span>税込<span class="k">&lt;/sgt-radio&gt;</span>
  <span class="k">&lt;sgt-radio</span> <span class="a">value</span>=<span class="s">"excluded"</span><span class="k">&gt;</span>税抜<span class="k">&lt;/sgt-radio&gt;</span>
<span class="k">&lt;/sgt-radio-group&gt;</span>
<span class="k">&lt;sgt-toggle</span> <span class="a">checked</span><span class="k">&gt;</span>下書き自動保存<span class="k">&lt;/sgt-toggle&gt;</span>`,
    vanilla: `<span class="p">cb</span>.<span class="a">checked</span> = <span class="k">true</span>;
<span class="p">rg</span>.<span class="a">value</span> = <span class="s">'excluded'</span>;
<span class="p">tg</span>.<span class="a">checked</span> = <span class="k">false</span>;`,
    react: `<span class="k">&lt;Checkbox</span> <span class="a">checked</span>={<span class="p">v</span>} <span class="a">onChange</span>={<span class="p">setV</span>}<span class="k">&gt;</span>軽減税率対象<span class="k">&lt;/Checkbox&gt;</span>
<span class="k">&lt;RadioGroup</span> <span class="a">name</span>=<span class="s">"tax"</span> <span class="a">value</span>={<span class="p">tax</span>} <span class="a">onChange</span>={<span class="p">setTax</span>}<span class="k">&gt;</span>
  <span class="k">&lt;Radio</span> <span class="a">value</span>=<span class="s">"included"</span><span class="k">&gt;</span>税込<span class="k">&lt;/Radio&gt;</span>
<span class="k">&lt;/RadioGroup&gt;</span>`,
    vue: `<span class="k">&lt;sgt-checkbox</span> <span class="a">v-model</span>=<span class="s">"v"</span><span class="k">&gt;</span>軽減税率対象<span class="k">&lt;/sgt-checkbox&gt;</span>`
  }
};



/* ================================================================
   v3 additions (USAGE)
   ================================================================ */

/* Add usage examples for new components (HTML/Vanilla/React/Vue, in syntax-highlight spans) */
const USAGE_V3 = {
  "button": {
    html: `<span class="k">&lt;sgt-button</span> <span class="a">variant</span>=<span class="s">"primary"</span><span class="k">&gt;</span>発行する<span class="k">&lt;/sgt-button&gt;</span>
<span class="k">&lt;sgt-button</span> <span class="a">variant</span>=<span class="s">"danger"</span> <span class="a">size</span>=<span class="s">"sm"</span><span class="k">&gt;</span>削除<span class="k">&lt;/sgt-button&gt;</span>`,
    vanilla: `<span class="k">import</span> <span class="s">'@shigoto-ui/elements/button'</span>;
<span class="k">const</span> <span class="p">btn</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-button'</span>);
<span class="p">btn</span>.<span class="a">loading</span> = <span class="k">true</span>; <span class="c">// 送信中…表示</span>
<span class="p">btn</span>.addEventListener(<span class="s">'click'</span>, () =&gt; <span class="p">save</span>());`,
    react: `<span class="k">import</span> { <span class="p">Button</span> } <span class="k">from</span> <span class="s">'@shigoto-ui/react'</span>;
<span class="k">&lt;Button</span> <span class="a">variant</span>=<span class="s">"primary"</span> <span class="a">loading</span>={<span class="p">isSaving</span>} <span class="a">onClick</span>={<span class="p">save</span>}<span class="k">&gt;</span>
  発行する
<span class="k">&lt;/Button&gt;</span>`,
    vue: `<span class="k">&lt;sgt-button</span>
  <span class="a">variant</span>=<span class="s">"primary"</span>
  <span class="a">:loading</span>=<span class="s">"isSaving"</span>
  <span class="a">@click</span>=<span class="s">"save"</span><span class="k">&gt;</span>発行する<span class="k">&lt;/sgt-button&gt;</span>`
  },
  "card": {
    html: `<span class="k">&lt;sgt-card&gt;</span>
  <span class="k">&lt;span slot=</span><span class="s">"head"</span><span class="k">&gt;</span>Q-2026-0421<span class="k">&lt;/span&gt;</span>
  <span class="k">&lt;p&gt;</span>合計 ¥3,045,900<span class="k">&lt;/p&gt;</span>
<span class="k">&lt;/sgt-card&gt;</span>`,
    vanilla: `<span class="k">import</span> <span class="s">'@shigoto-ui/elements/card'</span>;`,
    react: `<span class="k">&lt;Card</span> <span class="a">head</span>=<span class="s">"Q-2026-0421"</span><span class="k">&gt;</span>
  <span class="k">&lt;p&gt;</span>合計 ¥3,045,900<span class="k">&lt;/p&gt;</span>
<span class="k">&lt;/Card&gt;</span>`,
    vue: `<span class="k">&lt;sgt-card&gt;</span>
  <span class="k">&lt;template #head&gt;</span>Q-2026-0421<span class="k">&lt;/template&gt;</span>
  <span class="k">&lt;p&gt;</span>合計 ¥3,045,900<span class="k">&lt;/p&gt;</span>
<span class="k">&lt;/sgt-card&gt;</span>`
  },
  "fiscal-year": {
    html: `<span class="k">&lt;sgt-fiscal-year-input</span> <span class="a">value</span>=<span class="s">"FY2026"</span> <span class="a">start-month</span>=<span class="s">"4"</span><span class="k">&gt;&lt;/sgt-fiscal-year-input&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; {
  <span class="p">console</span>.log(<span class="p">e</span>.<span class="a">detail</span>); <span class="c">// { fy: 2026, start: '2026-04-01', end: '2027-03-31' }</span>
});`,
    react: `<span class="k">&lt;FiscalYearInput</span> <span class="a">value</span>={<span class="p">fy</span>} <span class="a">startMonth</span>={<span class="n">4</span>} <span class="a">onChange</span>={<span class="p">setFy</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-fiscal-year-input</span> <span class="a">:value</span>=<span class="s">"fy"</span> <span class="a">start-month</span>=<span class="s">"4"</span> <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (fy = e.detail)"</span> /<span class="k">&gt;</span>`
  },
  "history-log": {
    html: `<span class="k">&lt;sgt-history-log</span> <span class="a">target-id</span>=<span class="s">"Q-2026-0421"</span><span class="k">&gt;&lt;/sgt-history-log&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">entries</span> = [
  { <span class="p">who</span>: <span class="s">'佐藤 花子'</span>, <span class="p">type</span>: <span class="s">'update'</span>, <span class="p">at</span>: <span class="s">'2026-04-26T10:12'</span>, <span class="p">diff</span>: { <span class="p">amount</span>: [<span class="n">2750000</span>, <span class="n">3045900</span>] } }
];`,
    react: `<span class="k">&lt;HistoryLog</span> <span class="a">entries</span>={<span class="p">log</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-history-log</span> <span class="a">:entries</span>=<span class="s">"log"</span> /<span class="k">&gt;</span>`
  },
  "tax-rate": {
    html: `<span class="k">&lt;sgt-tax-rate-select</span> <span class="a">value</span>=<span class="s">"0.10"</span> <span class="a">presets</span>=<span class="s">"0.10,0.08,0"</span><span class="k">&gt;&lt;/sgt-tax-rate-select&gt;</span>`,
    vanilla: `<span class="k">import</span> { calcTax } <span class="k">from</span> <span class="s">'@shigoto-ui/core'</span>;
calcTax(<span class="n">2769000</span>, <span class="n">0.10</span>); <span class="c">// 276900</span>`,
    react: `<span class="k">&lt;TaxRateSelect</span> <span class="a">value</span>={<span class="p">rate</span>} <span class="a">onChange</span>={<span class="p">setRate</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-tax-rate-select</span> <span class="a">:value</span>=<span class="s">"rate"</span> <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (rate = e.detail.value)"</span> /<span class="k">&gt;</span>`
  },
  "color-tokens": {
    html: `<span class="k">&lt;style&gt;</span>
  :root {
    --sgt-color-primary: #1f3a8a;
    --sgt-color-danger:  #b91c1c;
    --sgt-color-warn:    #b45309;
    --sgt-color-ok:      #166534;
  }
<span class="k">&lt;/style&gt;</span>`,
    vanilla: `<span class="k">import</span> { tokens } <span class="k">from</span> <span class="s">'@shigoto-ui/tokens'</span>;
<span class="p">tokens</span>.<span class="a">apply</span>({ <span class="p">primary</span>: <span class="s">'#005A9C'</span> }); <span class="c">// 上書き</span>`,
    react: `<span class="k">import</span> { ThemeProvider, tokens } <span class="k">from</span> <span class="s">'@shigoto-ui/react'</span>;
<span class="k">&lt;ThemeProvider</span> <span class="a">tokens</span>={{ <span class="p">primary</span>: <span class="s">'#005A9C'</span> }}<span class="k">&gt;</span>...<span class="k">&lt;/ThemeProvider&gt;</span>`,
    vue: `<span class="c">// CSS変数を上書きするだけで全コンポーネントに反映</span>`
  },
  "typography": {
    html: `<span class="k">&lt;style&gt;</span>
  :root {
    --sgt-font-family: <span class="s">"Noto Sans JP", system-ui, sans-serif</span>;
    --sgt-font-size-body: 14px;
    --sgt-line-height-body: 1.7;
  }
<span class="k">&lt;/style&gt;</span>`,
    vanilla: `<span class="c">// 定義済みクラスを使う</span>
<span class="k">&lt;h1 class=</span><span class="s">"sgt-title"</span><span class="k">&gt;</span>見積書を作成する<span class="k">&lt;/h1&gt;</span>`,
    react: `<span class="k">&lt;Heading</span> <span class="a">level</span>={<span class="n">1</span>}<span class="k">&gt;</span>見積書を作成する<span class="k">&lt;/Heading&gt;</span>`,
    vue: `<span class="k">&lt;h1 class=</span><span class="s">"sgt-title"</span><span class="k">&gt;</span>見積書を作成する<span class="k">&lt;/h1&gt;</span>`
  },
  "spacing": {
    html: `<span class="k">&lt;style&gt;</span>
  :root {
    --sgt-space-1: 4px;  --sgt-space-2: 8px;
    --sgt-space-3: 16px; --sgt-space-4: 24px;
    --sgt-space-5: 32px; --sgt-space-6: 48px;
  }
<span class="k">&lt;/style&gt;</span>`,
    vanilla: `<span class="c">// クラスでも変数でも同等に扱える</span>
<span class="k">&lt;div class=</span><span class="s">"sgt-stack-3"</span><span class="k">&gt;</span>...<span class="k">&lt;/div&gt;</span>`,
    react: `<span class="k">&lt;Stack</span> <span class="a">space</span>={<span class="n">3</span>}<span class="k">&gt;</span>...<span class="k">&lt;/Stack&gt;</span>`,
    vue: `<span class="k">&lt;sgt-stack</span> <span class="a">space</span>=<span class="s">"3"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-stack&gt;</span>`
  },
  "tpl-quote": { html: `<span class="c">&lt;!-- 見積書作成画面 — 部品の組み合わせサンプル --&gt;</span>
<span class="k">&lt;sgt-app-shell&gt;</span>
  <span class="k">&lt;sgt-breadcrumb</span> <span class="a">slot</span>=<span class="s">"crumb"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-breadcrumb&gt;</span>
  <span class="k">&lt;form&gt;</span>
    <span class="k">&lt;sgt-master-select</span> <span class="a">label</span>=<span class="s">"取引先"</span><span class="k">&gt;&lt;/sgt-master-select&gt;</span>
    <span class="k">&lt;sgt-line-item-table</span> <span class="a">tax-rate</span>=<span class="s">"0.10"</span><span class="k">&gt;&lt;/sgt-line-item-table&gt;</span>
    <span class="k">&lt;sgt-tax-summary&gt;&lt;/sgt-tax-summary&gt;</span>
    <span class="k">&lt;sgt-button</span> <span class="a">variant</span>=<span class="s">"primary"</span><span class="k">&gt;</span>確認に進む<span class="k">&lt;/sgt-button&gt;</span>
  <span class="k">&lt;/form&gt;</span>
<span class="k">&lt;/sgt-app-shell&gt;</span>` },
  "tpl-invoice":  { html: `<span class="c">&lt;!-- 請求書作成画面 — 見積から流用 --&gt;</span>
<span class="k">&lt;sgt-invoice-form</span> <span class="a">from-quote</span>=<span class="s">"Q-2026-0421"</span><span class="k">&gt;&lt;/sgt-invoice-form&gt;</span>` },
  "tpl-customer": { html: `<span class="c">&lt;!-- 一覧+詳細の2ペインレイアウト --&gt;</span>
<span class="k">&lt;sgt-master-list</span> <span class="a">resource</span>=<span class="s">"customers"</span><span class="k">&gt;&lt;/sgt-master-list&gt;</span>` },
  "tpl-product":  { html: `<span class="k">&lt;sgt-master-list</span> <span class="a">resource</span>=<span class="s">"products"</span><span class="k">&gt;&lt;/sgt-master-list&gt;</span>` },
  "tpl-approval": { html: `<span class="k">&lt;sgt-approval-request-form</span> <span class="a">target</span>=<span class="s">"Q-2026-0421"</span><span class="k">&gt;&lt;/sgt-approval-request-form&gt;</span>` },
  "tpl-csv-confirm": { html: `<span class="k">&lt;sgt-csv-import-confirm</span> <span class="a">file</span>=<span class="s">"customers.csv"</span><span class="k">&gt;&lt;/sgt-csv-import-confirm&gt;</span>` },
  "tpl-search":   { html: `<span class="k">&lt;sgt-search-results</span> <span class="a">query</span>=<span class="s">"サンプル"</span><span class="k">&gt;&lt;/sgt-search-results&gt;</span>` },
  "tpl-detail":   { html: `<span class="k">&lt;sgt-detail-view</span> <span class="a">resource</span>=<span class="s">"quotes"</span> <span class="a">id</span>=<span class="s">"Q-2026-0421"</span><span class="k">&gt;&lt;/sgt-detail-view&gt;</span>` },
  "tpl-print":    { html: `<span class="k">&lt;sgt-print-layout</span> <span class="a">size</span>=<span class="s">"A4"</span> <span class="a">orientation</span>=<span class="s">"portrait"</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-quote-preview</span> <span class="a">data</span>=<span class="s">"..."</span><span class="k">&gt;&lt;/sgt-quote-preview&gt;</span>
<span class="k">&lt;/sgt-print-layout&gt;</span>` }
};



/* ================================================================
   v4 additions (USAGE)
   ================================================================ */

const USAGE_V4 = {
  "text-input": {
    html: `<span class="k">&lt;sgt-input</span> <span class="a">label</span>=<span class="s">"件名"</span> <span class="a">value</span>=<span class="s">"業務UI導入支援"</span> <span class="a">required</span><span class="k">&gt;&lt;/sgt-input&gt;</span>`,
    vanilla: `<span class="k">const</span> <span class="p">el</span> = <span class="p">document</span>.querySelector(<span class="s">'sgt-input'</span>);
<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; <span class="p">save</span>(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">value</span>));`,
    react: `<span class="k">&lt;Input</span> <span class="a">label</span>=<span class="s">"件名"</span> <span class="a">value</span>={<span class="p">v</span>} <span class="a">onChange</span>={<span class="p">setV</span>} <span class="a">required</span> /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-input</span> <span class="a">label</span>=<span class="s">"件名"</span> <span class="a">:value</span>=<span class="s">"v"</span> <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (v = e.detail.value)"</span> <span class="a">required</span> /<span class="k">&gt;</span>`
  },
  "textarea": {
    html: `<span class="k">&lt;sgt-textarea</span> <span class="a">label</span>=<span class="s">"備考"</span> <span class="a">autosize</span> <span class="a">maxlength</span>=<span class="s">"200"</span><span class="k">&gt;&lt;/sgt-textarea&gt;</span>`,
    vanilla: `<span class="p">el</span>.<span class="a">autosize</span> = <span class="k">true</span>;
<span class="p">el</span>.<span class="a">maxlength</span> = <span class="n">200</span>;`,
    react: `<span class="k">&lt;Textarea</span> <span class="a">label</span>=<span class="s">"備考"</span> <span class="a">autosize</span> <span class="a">maxLength</span>={<span class="n">200</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-textarea</span> <span class="a">label</span>=<span class="s">"備考"</span> <span class="a">autosize</span> <span class="a">maxlength</span>=<span class="s">"200"</span> /<span class="k">&gt;</span>`
  },
  "radio": {
    html: `<span class="k">&lt;sgt-radio-group</span> <span class="a">name</span>=<span class="s">"tax"</span> <span class="a">value</span>=<span class="s">"included"</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-radio</span> <span class="a">value</span>=<span class="s">"excluded"</span><span class="k">&gt;</span>外税<span class="k">&lt;/sgt-radio&gt;</span>
  <span class="k">&lt;sgt-radio</span> <span class="a">value</span>=<span class="s">"included"</span><span class="k">&gt;</span>内税<span class="k">&lt;/sgt-radio&gt;</span>
<span class="k">&lt;/sgt-radio-group&gt;</span>`,
    vanilla: `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; <span class="p">setTax</span>(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">value</span>));`,
    react: `<span class="k">&lt;RadioGroup</span> <span class="a">name</span>=<span class="s">"tax"</span> <span class="a">value</span>={<span class="p">tax</span>} <span class="a">onChange</span>={<span class="p">setTax</span>}<span class="k">&gt;</span>
  <span class="k">&lt;Radio</span> <span class="a">value</span>=<span class="s">"excluded"</span><span class="k">&gt;</span>外税<span class="k">&lt;/Radio&gt;</span>
  <span class="k">&lt;Radio</span> <span class="a">value</span>=<span class="s">"included"</span><span class="k">&gt;</span>内税<span class="k">&lt;/Radio&gt;</span>
<span class="k">&lt;/RadioGroup&gt;</span>`,
    vue: `<span class="k">&lt;sgt-radio-group</span> <span class="a">name</span>=<span class="s">"tax"</span> <span class="a">:value</span>=<span class="s">"tax"</span> <span class="a">@sgt:change</span>=<span class="s">"e =&gt; (tax = e.detail.value)"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-radio-group&gt;</span>`
  },
  "checkbox": {
    html: `<span class="k">&lt;sgt-checkbox</span> <span class="a">checked</span> <span class="a">indeterminate</span><span class="k">&gt;</span>全選択<span class="k">&lt;/sgt-checkbox&gt;</span>`,
    vanilla: `<span class="p">cb</span>.<span class="a">indeterminate</span> = (<span class="p">selected</span> &gt; <span class="n">0</span> &amp;&amp; <span class="p">selected</span> &lt; <span class="p">total</span>);
<span class="p">cb</span>.<span class="a">checked</span> = (<span class="p">selected</span> === <span class="p">total</span>);`,
    react: `<span class="k">&lt;Checkbox</span> <span class="a">checked</span>={<span class="p">all</span>} <span class="a">indeterminate</span>={<span class="p">some</span>} <span class="a">onChange</span>={<span class="p">toggle</span>}<span class="k">&gt;</span>全選択<span class="k">&lt;/Checkbox&gt;</span>`,
    vue: `<span class="k">&lt;sgt-checkbox</span> <span class="a">:checked</span>=<span class="s">"all"</span> <span class="a">:indeterminate</span>=<span class="s">"some"</span><span class="k">&gt;</span>全選択<span class="k">&lt;/sgt-checkbox&gt;</span>`
  },
  "form-field": {
    html: `<span class="k">&lt;sgt-field</span> <span class="a">label</span>=<span class="s">"取引先"</span> <span class="a">required</span> <span class="a">hint</span>=<span class="s">"顧客マスタから選択"</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-master-select</span><span class="k">&gt;&lt;/sgt-master-select&gt;</span>
<span class="k">&lt;/sgt-field&gt;</span>`,
    vanilla: `<span class="p">field</span>.<span class="a">error</span> = <span class="s">'取引先を選択してください'</span>; <span class="c">// 設定でエラー表示</span>`,
    react: `<span class="k">&lt;Field</span> <span class="a">label</span>=<span class="s">"取引先"</span> <span class="a">required</span> <span class="a">error</span>={<span class="p">err</span>}<span class="k">&gt;</span>...<span class="k">&lt;/Field&gt;</span>`,
    vue: `<span class="k">&lt;sgt-field</span> <span class="a">label</span>=<span class="s">"取引先"</span> <span class="a">required</span> <span class="a">:error</span>=<span class="s">"err"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-field&gt;</span>`
  },
  "required-badge": {
    html: `<span class="k">&lt;label&gt;</span>取引先 <span class="k">&lt;sgt-required-badge</span> <span class="a">type</span>=<span class="s">"required"</span><span class="k">/&gt;&lt;/label&gt;</span>`,
    vanilla: `<span class="c">// 4種: required / optional / recommended / review</span>`,
    react: `<span class="k">&lt;RequiredBadge</span> <span class="a">type</span>=<span class="s">"required"</span> /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-required-badge</span> <span class="a">type</span>=<span class="s">"required"</span> /<span class="k">&gt;</span>`
  },
  "input-error": {
    html: `<span class="k">&lt;sgt-field</span> <span class="a">label</span>=<span class="s">"郵便番号"</span> <span class="a">error</span>=<span class="s">"7桁で入力してください"</span><span class="k">&gt;</span>
  <span class="k">&lt;sgt-postal-code-input</span><span class="k">/&gt;</span>
<span class="k">&lt;/sgt-field&gt;</span>`,
    vanilla: `<span class="p">field</span>.addEventListener(<span class="s">'sgt:invalid'</span>, (<span class="p">e</span>) =&gt; <span class="p">field</span>.<span class="a">error</span> = <span class="p">e</span>.<span class="a">detail</span>.<span class="a">message</span>);`,
    react: `<span class="k">&lt;Field</span> <span class="a">error</span>={<span class="p">errors</span>.<span class="a">postal</span>}<span class="k">&gt;&lt;PostalCodeInput</span><span class="k">/&gt;&lt;/Field&gt;</span>`,
    vue: `<span class="k">&lt;sgt-field</span> <span class="a">:error</span>=<span class="s">"errors.postal"</span><span class="k">&gt;&lt;sgt-postal-code-input</span><span class="k">/&gt;&lt;/sgt-field&gt;</span>`
  },
  "error-list": {
    html: `<span class="k">&lt;sgt-validation-summary</span> <span class="a">target</span>=<span class="s">"#quote-form"</span><span class="k">&gt;&lt;/sgt-validation-summary&gt;</span>`,
    vanilla: `<span class="p">summary</span>.<span class="a">errors</span> = [{ <span class="p">field</span>: <span class="s">'money'</span>, <span class="p">message</span>: <span class="s">'数値以外の文字が含まれています'</span> }];`,
    react: `<span class="k">&lt;ValidationSummary</span> <span class="a">errors</span>={<span class="p">errors</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-validation-summary</span> <span class="a">:errors</span>=<span class="s">"errors"</span> /<span class="k">&gt;</span>`
  },
  "alert": {
    html: `<span class="k">&lt;sgt-alert</span> <span class="a">type</span>=<span class="s">"warning"</span> <span class="a">dismissible-key</span>=<span class="s">"q-expire-warn"</span><span class="k">&gt;</span>
  有効期限が近づいています
<span class="k">&lt;/sgt-alert&gt;</span>`,
    vanilla: `<span class="p">alert</span>.addEventListener(<span class="s">'sgt:dismiss'</span>, () =&gt; <span class="p">localStorage</span>.setItem(<span class="s">'q-expire-warn'</span>, <span class="s">'1'</span>));`,
    react: `<span class="k">&lt;Alert</span> <span class="a">type</span>=<span class="s">"warning"</span> <span class="a">dismissibleKey</span>=<span class="s">"q-expire-warn"</span><span class="k">&gt;</span>...<span class="k">&lt;/Alert&gt;</span>`,
    vue: `<span class="k">&lt;sgt-alert</span> <span class="a">type</span>=<span class="s">"warning"</span> <span class="a">dismissible-key</span>=<span class="s">"q-expire-warn"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-alert&gt;</span>`
  },
  "modal": {
    html: `<span class="k">&lt;sgt-dialog</span> <span class="a">open</span> <span class="a">title</span>=<span class="s">"見積を発行しますか？"</span><span class="k">&gt;</span>
  <span class="k">&lt;p&gt;</span>発行後は編集できません。<span class="k">&lt;/p&gt;</span>
  <span class="k">&lt;sgt-button</span> <span class="a">slot</span>=<span class="s">"primary"</span> <span class="a">variant</span>=<span class="s">"primary"</span><span class="k">&gt;</span>発行する<span class="k">&lt;/sgt-button&gt;</span>
<span class="k">&lt;/sgt-dialog&gt;</span>`,
    vanilla: `<span class="p">dlg</span>.<span class="a">open</span> = <span class="k">true</span>;
<span class="p">dlg</span>.addEventListener(<span class="s">'sgt:confirm'</span>, () =&gt; <span class="p">issue</span>());`,
    react: `<span class="k">&lt;Dialog</span> <span class="a">open</span>={<span class="p">open</span>} <span class="a">onConfirm</span>={<span class="p">issue</span>} <span class="a">onClose</span>={() =&gt; <span class="p">setOpen</span>(<span class="k">false</span>)}<span class="k">&gt;</span>...<span class="k">&lt;/Dialog&gt;</span>`,
    vue: `<span class="k">&lt;sgt-dialog</span> <span class="a">:open</span>=<span class="s">"open"</span> <span class="a">@sgt:confirm</span>=<span class="s">"issue"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-dialog&gt;</span>`
  },
  "search-box": {
    html: `<span class="k">&lt;sgt-search-box</span> <span class="a">placeholder</span>=<span class="s">"取引先を検索"</span> <span class="a">debounce</span>=<span class="s">"250"</span><span class="k">&gt;&lt;/sgt-search-box&gt;</span>`,
    vanilla: `<span class="p">box</span>.addEventListener(<span class="s">'sgt:search'</span>, (<span class="p">e</span>) =&gt; <span class="p">load</span>(<span class="p">e</span>.<span class="a">detail</span>.<span class="a">query</span>));`,
    react: `<span class="k">&lt;SearchBox</span> <span class="a">onSearch</span>={<span class="p">load</span>} <span class="a">debounce</span>={<span class="n">250</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-search-box</span> <span class="a">@sgt:search</span>=<span class="s">"e =&gt; load(e.detail.query)"</span> /<span class="k">&gt;</span>`
  },
  "total-amount": {
    html: `<span class="k">&lt;sgt-total-amount</span> <span class="a">subtotal-10</span>=<span class="s">"2475000"</span> <span class="a">subtotal-8</span>=<span class="s">"12000"</span><span class="k">&gt;&lt;/sgt-total-amount&gt;</span>`,
    vanilla: `<span class="k">import</span> { calcTotal } <span class="k">from</span> <span class="s">'@shigoto-ui/core'</span>;
calcTotal({ <span class="p">items</span> }); <span class="c">// → { subtotal10, tax10, subtotal8, tax8, total }</span>`,
    react: `<span class="k">&lt;TotalAmount</span> <span class="a">items</span>={<span class="p">lineItems</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-total-amount</span> <span class="a">:items</span>=<span class="s">"lineItems"</span> /<span class="k">&gt;</span>`
  }
};



/* ================================================================
   v5 additions (USAGE)
   ================================================================ */

const USAGE_V5 = {
  "file-upload": {
    html: `<span class="k">&lt;sgt-file-upload</span> <span class="a">accept</span>=<span class="s">".csv,.xlsx,.pdf"</span> <span class="a">max-size</span>=<span class="s">"10MB"</span> <span class="a">multiple</span><span class="k">&gt;&lt;/sgt-file-upload&gt;</span>`,
    react: `<span class="k">&lt;FileUpload</span> <span class="a">accept</span>=<span class="s">".csv,.xlsx,.pdf"</span> <span class="a">maxSize</span>=<span class="s">"10MB"</span> <span class="a">multiple</span> <span class="a">onChange</span>={<span class="p">handle</span>} /<span class="k">&gt;</span>`,
    vue: `<span class="k">&lt;sgt-file-upload</span> <span class="a">accept</span>=<span class="s">".csv,.xlsx,.pdf"</span> <span class="a">@sgt:upload</span>=<span class="s">"handle"</span> /<span class="k">&gt;</span>`
  },
  "csv-import-btn": { html: `<span class="k">&lt;sgt-csv-import-button</span> <span class="a">target</span>=<span class="s">"customers"</span><span class="k">&gt;&lt;/sgt-csv-import-button&gt;</span>` },
  "csv-export-btn": { html: `<span class="k">&lt;sgt-csv-export-button</span> <span class="a">target</span>=<span class="s">"#quotes-table"</span> <span class="a">filename</span>=<span class="s">"quotes-202604.csv"</span><span class="k">&gt;&lt;/sgt-csv-export-button&gt;</span>` },
  "csv-preview": { html: `<span class="k">&lt;sgt-csv-preview</span> <span class="a">file</span>=<span class="s">"./customers.csv"</span> <span class="a">target</span>=<span class="s">"customers"</span><span class="k">&gt;&lt;/sgt-csv-preview&gt;</span>` },
  "csv-error-list": { html: `<span class="k">&lt;sgt-csv-error-list</span> <span class="a">.errors</span>=<span class="s">"errors"</span><span class="k">&gt;&lt;/sgt-csv-error-list&gt;</span>` },
  "diff-view": { html: `<span class="k">&lt;sgt-diff-view</span> <span class="a">.before</span>=<span class="s">"oldData"</span> <span class="a">.after</span>=<span class="s">"newData"</span> <span class="a">compact</span><span class="k">&gt;&lt;/sgt-diff-view&gt;</span>` },
  "customer-picker": { html: `<span class="k">&lt;sgt-customer-picker</span> <span class="a">value</span>=<span class="s">"C-00321"</span><span class="k">&gt;&lt;/sgt-customer-picker&gt;</span>` },
  "product-picker": { html: `<span class="k">&lt;sgt-product-picker</span> <span class="a">multiple</span> <span class="a">.value</span>=<span class="s">"selectedIds"</span><span class="k">&gt;&lt;/sgt-product-picker&gt;</span>` },
  "assignee-picker": { html: `<span class="k">&lt;sgt-assignee-picker</span> <span class="a">team-mode</span><span class="k">&gt;&lt;/sgt-assignee-picker&gt;</span>` },
  "prefecture-select": { html: `<span class="k">&lt;sgt-prefecture-select</span> <span class="a">value</span>=<span class="s">"JP-13"</span><span class="k">&gt;&lt;/sgt-prefecture-select&gt;</span>` },
  "fiscal-year-picker": { html: `<span class="k">&lt;sgt-fiscal-year-picker</span> <span class="a">value</span>=<span class="s">"FY2026"</span> <span class="a">start-month</span>=<span class="s">"4"</span><span class="k">&gt;&lt;/sgt-fiscal-year-picker&gt;</span>` },
  "company-input": { html: `<span class="k">&lt;sgt-company-input</span> <span class="a">.value</span>=<span class="s">"company"</span> <span class="a">corporate-number-lookup</span><span class="k">&gt;&lt;/sgt-company-input&gt;</span>` },
  "name-input": { html: `<span class="k">&lt;sgt-name-input</span> <span class="a">split</span> <span class="a">with-furigana</span><span class="k">&gt;&lt;/sgt-name-input&gt;</span>` },
  "kana-input": { html: `<span class="k">&lt;sgt-kana-input</span> <span class="a">value</span>=<span class="s">"ヤマダ タロウ"</span><span class="k">&gt;&lt;/sgt-kana-input&gt;</span>` },
  "invoice-header": { html: `<span class="k">&lt;sgt-invoice-header</span> <span class="a">.invoice</span>=<span class="s">"data"</span><span class="k">&gt;&lt;/sgt-invoice-header&gt;</span>` },
  "quote-header": { html: `<span class="k">&lt;sgt-quote-header</span> <span class="a">.quote</span>=<span class="s">"data"</span><span class="k">&gt;&lt;/sgt-quote-header&gt;</span>` },
  "approval-log": { html: `<span class="k">&lt;sgt-approval-log</span> <span class="a">.steps</span>=<span class="s">"steps"</span><span class="k">&gt;&lt;/sgt-approval-log&gt;</span>` },
  "comment-thread": { html: `<span class="k">&lt;sgt-comment-thread</span> <span class="a">target</span>=<span class="s">"Q-2026-0421"</span> <span class="a">mention</span><span class="k">&gt;&lt;/sgt-comment-thread&gt;</span>` },
  "confirm-panel": { html: `<span class="k">&lt;sgt-confirm-panel</span> <span class="a">.before</span>=<span class="s">"old"</span> <span class="a">.after</span>=<span class="s">"new"</span><span class="k">&gt;&lt;/sgt-confirm-panel&gt;</span>` },
  "audit-log": { html: `<span class="k">&lt;sgt-audit-log</span> <span class="a">target</span>=<span class="s">"quotes"</span> <span class="a">days</span>=<span class="s">"30"</span><span class="k">&gt;&lt;/sgt-audit-log&gt;</span>` },
  "search-panel": { html: `<span class="k">&lt;sgt-search-panel</span> <span class="a">.fields</span>=<span class="s">"fields"</span> <span class="a">savable</span><span class="k">&gt;&lt;/sgt-search-panel&gt;</span>` },
  "filter-panel": { html: `<span class="k">&lt;sgt-filter-panel</span> <span class="a">.facets</span>=<span class="s">"facets"</span> <span class="a">sync-url</span><span class="k">&gt;&lt;/sgt-filter-panel&gt;</span>` },
  "sort-control": { html: `<span class="k">&lt;sgt-sort-control</span> <span class="a">.fields</span>=<span class="s">"fields"</span> <span class="a">multi</span><span class="k">&gt;&lt;/sgt-sort-control&gt;</span>` },
  "bulk-actions": { html: `<span class="k">&lt;sgt-bulk-actions</span> <span class="a">target</span>=<span class="s">"#quotes-table"</span><span class="k">&gt;&lt;/sgt-bulk-actions&gt;</span>` },
  "empty-state": { html: `<span class="k">&lt;sgt-empty-state</span> <span class="a">type</span>=<span class="s">"no-result"</span><span class="k">&gt;&lt;/sgt-empty-state&gt;</span>` }
};



/* ================================================================
   v6 additions (USAGE)
   ================================================================ */

const USAGE_V6 = {
  "combobox": { html: `<span class="k">&lt;sgt-combobox</span> <span class="a">.options</span>=<span class="s">"customers"</span> <span class="a">creatable</span><span class="k">&gt;&lt;/sgt-combobox&gt;</span>` },
  "autocomplete": { html: `<span class="k">&lt;sgt-autocomplete</span> <span class="a">src</span>=<span class="s">"/api/customers"</span> <span class="a">debounce</span>=<span class="s">"200"</span> <span class="a">min-chars</span>=<span class="s">"2"</span><span class="k">&gt;&lt;/sgt-autocomplete&gt;</span>` },
  "drawer": { html: `<span class="k">&lt;sgt-drawer</span> <span class="a">open</span> <span class="a">size</span>=<span class="s">"lg"</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-drawer&gt;</span>` },
  "tabs": { html: `<span class="k">&lt;sgt-tabs</span> <span class="a">value</span>=<span class="s">"overview"</span> <span class="a">sync-hash</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-tabs&gt;</span>` },
  "accordion": { html: `<span class="k">&lt;sgt-accordion</span> <span class="a">multi</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-accordion&gt;</span>` },
  "tooltip": { html: `<span class="k">&lt;sgt-tooltip</span> <span class="a">placement</span>=<span class="s">"top"</span> <span class="a">delay</span>=<span class="s">"300"</span><span class="k">&gt;</span>説明文<span class="k">&lt;/sgt-tooltip&gt;</span>` },
  "spinner": { html: `<span class="k">&lt;sgt-spinner</span> <span class="a">size</span>=<span class="s">"md"</span> <span class="a">label</span>=<span class="s">"読込中"</span><span class="k">&gt;&lt;/sgt-spinner&gt;</span>` },
  "skeleton": { html: `<span class="k">&lt;sgt-skeleton</span> <span class="a">preset</span>=<span class="s">"table"</span> <span class="a">rows</span>=<span class="s">"4"</span><span class="k">&gt;&lt;/sgt-skeleton&gt;</span>` },
  "stepper": { html: `<span class="k">&lt;sgt-stepper</span> <span class="a">.steps</span>=<span class="s">"steps"</span> <span class="a">current</span>=<span class="s">"3"</span><span class="k">&gt;&lt;/sgt-stepper&gt;</span>` },
  "breadcrumb": { html: `<span class="k">&lt;sgt-breadcrumb</span> <span class="a">.items</span>=<span class="s">"items"</span> <span class="a">sticky</span><span class="k">&gt;&lt;/sgt-breadcrumb&gt;</span>` },
  "banner": { html: `<span class="k">&lt;sgt-banner</span> <span class="a">id</span>=<span class="s">"maintenance-0430"</span> <span class="a">type</span>=<span class="s">"info"</span> <span class="a">dismissible</span><span class="k">&gt;</span>...<span class="k">&lt;/sgt-banner&gt;</span>` },
  "toast": { html: `<span class="k">&lt;sgt-toast</span> <span class="a">type</span>=<span class="s">"ok"</span> <span class="a">duration</span>=<span class="s">"4000"</span><span class="k">&gt;</span>下書き保存しました<span class="k">&lt;/sgt-toast&gt;</span>` },
  "org-tree": { html: `<span class="k">&lt;sgt-org-tree</span> <span class="a">.data</span>=<span class="s">"orgData"</span> <span class="a">selectable</span> <span class="a">draggable</span><span class="k">&gt;&lt;/sgt-org-tree&gt;</span>` },
  "perm-matrix": { html: `<span class="k">&lt;sgt-permission-matrix</span> <span class="a">.roles</span>=<span class="s">"roles"</span> <span class="a">.actions</span>=<span class="s">"actions"</span><span class="k">&gt;&lt;/sgt-permission-matrix&gt;</span>` },
  "audit-list": { html: `<span class="k">&lt;sgt-audit-list</span> <span class="a">scope</span>=<span class="s">"global"</span> <span class="a">days</span>=<span class="s">"30"</span><span class="k">&gt;&lt;/sgt-audit-list&gt;</span>` },
  "biz-calendar": { html: `<span class="k">&lt;sgt-business-calendar</span> <span class="a">value</span>=<span class="s">"2026-05-29"</span> <span class="a">company-holidays</span>=<span class="s">"holidays"</span><span class="k">&gt;&lt;/sgt-business-calendar&gt;</span>` },
  "closing-day": { html: `<span class="k">&lt;sgt-closing-day</span> <span class="a">closing</span>=<span class="s">"month-end"</span> <span class="a">site</span>=<span class="s">"next-month-end"</span> <span class="a">on-holiday</span>=<span class="s">"forward"</span><span class="k">&gt;&lt;/sgt-closing-day&gt;</span>` },
  "bank-account": { html: `<span class="k">&lt;sgt-bank-account</span> <span class="a">.value</span>=<span class="s">"account"</span> <span class="a">code-lookup</span><span class="k">&gt;&lt;/sgt-bank-account&gt;</span>` },
  "corp-number": { html: `<span class="k">&lt;sgt-corporate-number</span> <span class="a">value</span>=<span class="s">"9012301234567"</span> <span class="a">verify-with-nta</span><span class="k">&gt;&lt;/sgt-corporate-number&gt;</span>` },
  "seal": { html: `<span class="k">&lt;sgt-seal</span> <span class="a">type</span>=<span class="s">"round"</span> <span class="a">name</span>=<span class="s">"佐藤"</span> <span class="a">state</span>=<span class="s">"applied"</span><span class="k">&gt;&lt;/sgt-seal&gt;</span>` }
};



/* ================================================================
   Merge all USAGE versions
   ================================================================ */
Object.assign(USAGE, USAGE_V3, USAGE_V4, USAGE_V5, USAGE_V6);
window.USAGE = USAGE;
