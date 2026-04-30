/* Shigoto UI — Catalog renderer
 * Reads CARDS (cards.js) + USAGE (usage.js) and injects component cards
 * into the slots <div data-component="<key>"> defined in the HTML.
 */
(function () {
  "use strict";

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  /* Generate basic stubs (HTML / Vanilla / React / Vue) from a card tag like
   * "<sgt-money-input>". Used as a fallback for entries in usage.js that only
   * have an HTML example so every card surfaces all four code panes.
   */
  function defaultUsage(rawTag) {
    if (!rawTag) return null;
    const tagText = String(rawTag).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const m = tagText.match(/<sgt-([a-z0-9-]+)>/);
    if (!m) return null;
    const kebab = m[1];
    const fullTag = "sgt-" + kebab;
    const pascal = kebab.split("-").map(s => s[0].toUpperCase() + s.slice(1)).join("");
    return {
      html:
        `<span class="k">&lt;${fullTag}&gt;&lt;/${fullTag}&gt;</span>`,
      vanilla:
        `<span class="k">import</span> <span class="s">'@shigoto-ui/elements/${kebab}'</span>;\n` +
        `\n` +
        `<span class="k">const</span> <span class="p">el</span> = <span class="p">document</span>.querySelector(<span class="s">'${fullTag}'</span>);\n` +
        `<span class="p">el</span>.addEventListener(<span class="s">'sgt:change'</span>, (<span class="p">e</span>) =&gt; {\n` +
        `  <span class="p">console</span>.log(<span class="p">e</span>.<span class="a">detail</span>);\n` +
        `});`,
      react:
        `<span class="k">import</span> { <span class="p">${pascal}</span> } <span class="k">from</span> <span class="s">'@shigoto-ui/react'</span>;\n` +
        `\n` +
        `<span class="k">function</span> <span class="p">Example</span>() {\n` +
        `  <span class="k">return</span> <span class="k">&lt;${pascal}</span> /<span class="k">&gt;</span>;\n` +
        `}`,
      vue:
        `<span class="k">&lt;script setup&gt;</span>\n` +
        `<span class="k">import</span> { <span class="p">${pascal}</span> } <span class="k">from</span> <span class="s">'@shigoto-ui/vue'</span>;\n` +
        `<span class="k">&lt;/script&gt;</span>\n` +
        `\n` +
        `<span class="k">&lt;template&gt;</span>\n` +
        `  <span class="k">&lt;${pascal}</span> /<span class="k">&gt;</span>\n` +
        `<span class="k">&lt;/template&gt;</span>`
    };
  }

  function usageBlock(key) {
    const written = (window.USAGE || {})[key] || {};
    const card = (window.CARDS || {})[key];
    const fallback = card ? defaultUsage(card.tag) : null;
    const merged = {};
    ["html", "vanilla", "react", "vue"].forEach(k => {
      const code = written[k] || (fallback && fallback[k]);
      if (code) merged[k] = code;
    });
    const order = ["html", "vanilla", "react", "vue"].filter(k => merged[k]);
    if (order.length === 0) {
      return `<div class="usage usage--empty">
        <p class="muted small">使用例は近日追加</p>
      </div>`;
    }
    const LABEL = { html: "HTML", vanilla: "Vanilla JS", react: "React", vue: "Vue" };
    const panes = order.map((k, i) => ({
      key: k,
      label: LABEL[k],
      tab: `<button class="usage__tab" role="tab" aria-selected="${i===0}" data-pane="${k}">${LABEL[k]}</button>`,
      pane: `<pre class="usage__pane" data-pane="${k}"${i===0?' data-active="true"':''}>${merged[k]}</pre>`
    }));
    return `
      <div class="usage" role="tablist" aria-label="使用例" data-langs="${order.join(',')}">
        <div class="usage__tabs">${panes.map(p => p.tab).join("")}</div>
        <div class="usage__panes">${panes.map(p => p.pane).join("")}</div>
      </div>`;
  }

  function renderCard(key, c) {
    const usage = usageBlock(key);
    const langMatch = usage.match(/data-langs="([^"]+)"/);
    const LABEL = { html: "HTML", vanilla: "Vanilla JS", react: "React", vue: "Vue" };
    const summaryLabel = langMatch
      ? `使用例（${langMatch[1].split(",").map(k => LABEL[k]).join(" / ")}）`
      : "使用例（近日追加）";
    return `
      <article class="card" data-key="${key}">
        <header class="card__head">
          <div class="card__title-row">
            <h3 class="card__title">${escapeHtml(c.name)}</h3>
            <code class="card__tag mono">${escapeHtml(c.tag)}</code>
          </div>
        </header>
        <p class="card__desc">${c.desc}</p>
        <div class="card__body">${c.body}</div>
        <p class="accept">${c.accept}</p>
        <details class="card__usage" open>
          <summary>${summaryLabel}</summary>
          ${usage}
        </details>
      </article>`;
  }

  /* ---------- Form-control normalization ----------
   * Catalog markup uses styled <span> elements as visual mock-ups for radios,
   * checkboxes, toggles, and combo-box dropdowns. To verify behavior in the
   * browser, replace those mock-ups with real <label> + <input> pairs (and
   * minimal click behavior for combos) so users can actually interact.
   */
  function normalizeFormControls(root) {
    // ---- Checkboxes: <span class="check[ checked]">…</span> -> <label> + input
    root.querySelectorAll("span.check").forEach(span => {
      const isChecked = span.classList.contains("checked");
      const isMixed = span.classList.contains("check--mixed") ||
                      span.classList.contains("tree__check--mixed");
      const label = document.createElement("label");
      label.className = span.className;
      label.classList.remove("checked");
      if (span.style.cssText) label.style.cssText = span.style.cssText;
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "sgt-native";
      if (isChecked && !isMixed) input.checked = true;
      while (span.firstChild) label.appendChild(span.firstChild);
      // CSS draws the check/dash glyph; clear any pre-baked icon markup.
      const box = label.querySelector(".check__box");
      if (box && !isMixed) box.innerHTML = "";
      label.insertBefore(input, label.firstChild);
      span.replaceWith(label);
      if (isMixed) {
        // indeterminate is not reflected by an HTML attribute.
        input.indeterminate = true;
      }
    });

    // ---- Rich checkboxes (already <label>): just inject an input.
    root.querySelectorAll("label.check-rich").forEach(label => {
      if (label.querySelector('input[type="checkbox"]')) return;
      const isChecked = label.classList.contains("checked");
      label.classList.remove("checked");
      const box = label.querySelector(".check__box");
      if (box) box.innerHTML = "";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "sgt-native";
      if (isChecked) input.checked = true;
      label.insertBefore(input, label.firstChild);
    });

    // ---- Radios: group by parent element so siblings share a name.
    const radioGroupName = new WeakMap();
    let radioGroupId = 0;
    function nameForGroup(parent) {
      let name = radioGroupName.get(parent);
      if (!name) {
        name = "sgt-rg-" + (++radioGroupId);
        radioGroupName.set(parent, name);
      }
      return name;
    }

    root.querySelectorAll("span.radio").forEach(span => {
      const isChecked = span.classList.contains("checked");
      const label = document.createElement("label");
      label.className = span.className;
      label.classList.remove("checked");
      if (span.style.cssText) label.style.cssText = span.style.cssText;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = nameForGroup(span.parentElement);
      input.className = "sgt-native";
      if (isChecked) input.checked = true;
      while (span.firstChild) label.appendChild(span.firstChild);
      label.insertBefore(input, label.firstChild);
      span.replaceWith(label);
    });

    root.querySelectorAll("label.radio-rich").forEach(label => {
      if (label.querySelector('input[type="radio"]')) return;
      const isChecked = label.classList.contains("checked");
      label.classList.remove("checked");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = nameForGroup(label.parentElement);
      input.className = "sgt-native";
      if (isChecked) input.checked = true;
      label.insertBefore(input, label.firstChild);
    });

    // ---- Toggles: <span class="toggle[ on]"></span> -> <input type="checkbox" class="toggle">
    root.querySelectorAll("span.toggle").forEach(span => {
      const isOn = span.classList.contains("on");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "toggle";
      if (isOn) input.checked = true;
      if (span.style.cssText) input.style.cssText = span.style.cssText;
      span.replaceWith(input);
    });

    // ---- Text inputs: every .input wrapper containing .input__value becomes
    // a real <input> (or <textarea> when wrapped in .textarea). The wrapper
    // keeps its prefix/suffix decorations.
    root.querySelectorAll(".input, .textarea").forEach(wrap => {
      const value = wrap.querySelector(":scope > .input__value");
      if (!value) return;
      // Strip any visual caret markers; the real <input> draws its own.
      value.querySelectorAll(".input__caret").forEach(c => c.remove());
      const nestedPh = value.querySelector(".input__placeholder");
      const isPh = value.classList.contains("input__placeholder");
      const isNum = value.classList.contains("input__value--num");
      const isMono = value.classList.contains("mono") || isNum;
      const text = (nestedPh ? value.textContent.replace(nestedPh.textContent, "") : value.textContent).trim();
      const placeholder = nestedPh ? nestedPh.textContent.trim()
                        : isPh    ? text
                        : "";
      const isTextarea = wrap.classList.contains("textarea");
      const field = document.createElement(isTextarea ? "textarea" : "input");
      if (!isTextarea) field.type = "text";
      field.className = "input__field" + (isNum ? " input__field--num" : "") + (isMono ? " mono" : "");
      if (!isPh) field.value = text;
      if (placeholder) field.placeholder = placeholder;
      if (wrap.classList.contains("input--disabled")) field.disabled = true;
      if (wrap.classList.contains("input--readonly")) field.readOnly = true;
      if (wrap.classList.contains("input--error")) field.setAttribute("aria-invalid", "true");
      if (isNum) field.inputMode = "numeric";
      value.replaceWith(field);
    });

    // ---- Textarea stubs: <div class="textarea-stub">…</div> -> <textarea>
    root.querySelectorAll(".textarea-stub").forEach(stub => {
      const ta = document.createElement("textarea");
      ta.className = "textarea-stub" +
        (stub.classList.contains("textarea-stub--error") ? " textarea-stub--error" : "");
      if (stub.style.cssText) ta.style.cssText = stub.style.cssText;
      ta.value = stub.textContent;
      if (stub.classList.contains("textarea-stub--error")) ta.setAttribute("aria-invalid", "true");
      stub.replaceWith(ta);
    });
  }

  /* ---------- Combobox click behavior ----------
   * Each <div class="combo"> wraps an <div class="input"> trigger and an
   * optional <ul class="combo__results"> dropdown. Wire up:
   *   - clicking the trigger toggles the dropdown
   *   - clicking a result item updates the trigger label and closes the list
   *   - clicking outside closes any open dropdown
   */
  function bindCombos(root) {
    const combos = root.querySelectorAll(".combo");
    combos.forEach(combo => {
      const trigger = combo.querySelector(":scope > .input");
      const list = combo.querySelector(":scope > .combo__results");
      if (!trigger) return;
      // Track open state. Treat presence of a results list at render time as
      // "open" demo state — keep it visible until the user toggles.
      if (list) combo.dataset.open = "true";

      trigger.addEventListener("click", e => {
        if (trigger.classList.contains("input--disabled")) return;
        e.stopPropagation();
        if (!list) return;
        const open = combo.dataset.open === "true";
        combo.dataset.open = open ? "false" : "true";
      });

      if (!list) return;
      list.querySelectorAll("li").forEach(li => {
        if (li.classList.contains("combo__group") ||
            li.classList.contains("combo__results__foot")) return;
        li.addEventListener("click", e => {
          e.stopPropagation();
          list.querySelectorAll("li.sel").forEach(s => s.classList.remove("sel"));
          li.classList.add("sel");
          const valueEl = trigger.querySelector(".input__value");
          if (valueEl) valueEl.textContent = li.textContent.trim();
          combo.dataset.open = "false";
        });
      });
    });

    // Single document listener: close any open combo on outside click.
    if (!document.body.dataset.sgtComboBound) {
      document.body.dataset.sgtComboBound = "1";
      document.addEventListener("click", e => {
        document.querySelectorAll('.combo[data-open="true"]').forEach(c => {
          if (!c.contains(e.target)) c.dataset.open = "false";
        });
      });
    }
  }

  function bindUsageTabs(root) {
    root.querySelectorAll(".usage").forEach(box => {
      const tabs = box.querySelectorAll(".usage__tab");
      const panes = box.querySelectorAll(".usage__pane");
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          const target = tab.dataset.pane;
          tabs.forEach(t => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
          panes.forEach(p => {
            if (p.dataset.pane === target) p.setAttribute("data-active", "true");
            else p.removeAttribute("data-active");
          });
        });
        tab.addEventListener("keydown", e => {
          const arr = [...tabs];
          const idx = arr.indexOf(tab);
          if (e.key === "ArrowRight") { e.preventDefault(); arr[(idx+1) % arr.length].focus(); arr[(idx+1) % arr.length].click(); }
          if (e.key === "ArrowLeft")  { e.preventDefault(); arr[(idx-1+arr.length) % arr.length].focus(); arr[(idx-1+arr.length) % arr.length].click(); }
        });
      });
    });
  }

  function bindSearch() {
    const input = document.querySelector(".app-header .search input");
    if (!input) return;
    const cards = [...document.querySelectorAll("article.card")];
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        cards.forEach(c => c.style.display = "");
        document.querySelectorAll("section.section").forEach(s => s.style.display = "");
        return;
      }
      cards.forEach(c => {
        const txt = c.textContent.toLowerCase();
        c.style.display = txt.includes(q) ? "" : "none";
      });
      document.querySelectorAll("section.section").forEach(s => {
        const visible = s.querySelector("article.card:not([style*='display: none'])");
        s.style.display = visible || s.id === "tokens" || s.id === "install" || s.id === "utils" || s.id === "mvp" ? "" : "none";
      });
    });
    document.addEventListener("keydown", e => {
      if (e.key === "/" && document.activeElement !== input && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  function init() {
    const slots = document.querySelectorAll("[data-component]");
    slots.forEach(slot => {
      const key = slot.dataset.component;
      const c = (window.CARDS || {})[key];
      if (!c) {
        slot.innerHTML = `<div class="card card--missing"><p class="muted small">未定義: <code class="mono">${escapeHtml(key)}</code></p></div>`;
        return;
      }
      // Use parent section's id when slot itself has none, otherwise keep the
      // anchor target the sidenav already points at.
      slot.innerHTML = renderCard(key, c);
    });
    normalizeFormControls(document);
    bindCombos(document);
    bindUsageTabs(document);
    bindSearch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
