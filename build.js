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
      const isDisabled = /opacity:\s*0\.5/.test(span.style.cssText || "");
      const label = document.createElement("label");
      label.className = span.className;
      label.classList.remove("checked");
      if (span.style.cssText) label.style.cssText = span.style.cssText;
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "sgt-native";
      if (isChecked && !isMixed) input.checked = true;
      if (isDisabled) input.disabled = true;
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
      const isDisabled = /opacity:\s*0\.5/.test(span.style.cssText || "");
      const label = document.createElement("label");
      label.className = span.className;
      label.classList.remove("checked");
      if (span.style.cssText) label.style.cssText = span.style.cssText;
      const input = document.createElement("input");
      input.type = "radio";
      input.name = nameForGroup(span.parentElement);
      input.className = "sgt-native";
      if (isChecked) input.checked = true;
      if (isDisabled) input.disabled = true;
      while (span.firstChild) label.appendChild(span.firstChild);
      label.insertBefore(input, label.firstChild);
      span.replaceWith(label);
    });

    root.querySelectorAll("label.radio-rich").forEach(label => {
      if (label.querySelector('input[type="radio"]')) return;
      const isChecked = label.classList.contains("checked");
      const isDisabled = /opacity:\s*0\.5/.test(label.style.cssText || "");
      label.classList.remove("checked");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = nameForGroup(label.parentElement);
      input.className = "sgt-native";
      if (isChecked) input.checked = true;
      if (isDisabled) input.disabled = true;
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

    // ---- Select-all parents: a .check.check--mixed acts as the parent for
    // peer .check inputs. Clicking the parent toggles all peers; child changes
    // recompute the parent's checked / indeterminate state.
    root.querySelectorAll("label.check.check--mixed").forEach(parent => {
      const parentInput = parent.querySelector('input[type="checkbox"]');
      if (!parentInput) return;
      // Scope: the table's tbody when the parent sits inside a thead, or the
      // common ancestor that holds sibling .check labels otherwise.
      const table = parent.closest("table");
      const scope = table || parent.parentElement.parentElement || parent.parentElement;
      const peers = () => [...scope.querySelectorAll("label.check input[type='checkbox']")]
        .filter(i => i !== parentInput && !i.closest("label").classList.contains("check--mixed"));
      const sync = () => {
        const list = peers();
        if (!list.length) return;
        const checked = list.filter(i => i.checked).length;
        if (checked === 0) {
          parentInput.indeterminate = false;
          parentInput.checked = false;
        } else if (checked === list.length) {
          parentInput.indeterminate = false;
          parentInput.checked = true;
        } else {
          parentInput.indeterminate = true;
          parentInput.checked = false;
        }
      };
      parentInput.addEventListener("click", () => {
        // After the click event, parentInput.checked reflects the new state.
        const target = parentInput.checked;
        peers().forEach(i => { if (!i.disabled) i.checked = target; });
        parentInput.indeterminate = false;
      });
      peers().forEach(child => {
        child.addEventListener("change", sync);
      });
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
   * Each <div class="combo"> wraps a trigger (.input or .search) and an
   * optional <ul class="combo__results"> dropdown. Wire up:
   *   - clicking the trigger toggles the dropdown
   *   - clicking a result item updates the trigger label and closes the list
   *   - clicking outside closes any open dropdown
   */
  function bindCombos(root) {
    const combos = root.querySelectorAll(".combo");
    combos.forEach(combo => {
      const trigger = combo.querySelector(":scope > .input, :scope > .search");
      const list = combo.querySelector(":scope > .combo__results");
      if (!trigger) return;
      // Track open state. Treat presence of a results list at render time as
      // "open" demo state — keep it visible until the user toggles.
      if (list) combo.dataset.open = "true";

      trigger.addEventListener("click", e => {
        if (trigger.classList.contains("input--disabled")) return;
        // Don't toggle when the click landed on the inner editable field — the
        // user is trying to type, not toggle the dropdown.
        if (e.target.closest(".input__field, .search input, button, .chip")) return;
        e.stopPropagation();
        if (!list) return;
        const open = combo.dataset.open === "true";
        combo.dataset.open = open ? "false" : "true";
      });

      if (!list) return;
      list.querySelectorAll("li").forEach(li => {
        if (li.classList.contains("combo__group") ||
            li.classList.contains("combo__results__foot") ||
            li.classList.contains("combo__loading") ||
            li.classList.contains("combo__empty") ||
            li.classList.contains("combo__create")) return;
        li.addEventListener("click", e => {
          e.stopPropagation();
          list.querySelectorAll("li.sel").forEach(s => s.classList.remove("sel"));
          li.classList.add("sel");
          // Prefer a real <input> (post-normalization) over the visual span.
          const field = trigger.querySelector(".input__field, input, .input__value");
          const text = li.textContent.trim();
          if (field) {
            if ("value" in field && field.tagName !== "SPAN") {
              field.value = text;
            } else {
              field.textContent = text;
            }
          }
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

  /* ---------- Live character counter ----------
   * For each .field wrapper, find a hint that looks like "n / 200" and bind it
   * to the field's <input>/<textarea>: update n on input, flag --over when the
   * cap is exceeded. Also enforce maxlength on inputs to match the cap.
   */
  function bindCounters(root) {
    const counterRe = /^(\s*)(\d+)(\s*\/\s*)(\d+)(.*)$/;
    root.querySelectorAll(".field, .variant__stage").forEach(scope => {
      // Find a counter target: a span containing "n / m" inside .field__hint
      // or in a sibling .row that pairs hint+counter.
      const candidates = scope.querySelectorAll(".field__hint, .mono.small, .row > span");
      candidates.forEach(span => {
        if (span.dataset.sgtCounter) return;
        const m = span.textContent.match(counterRe);
        if (!m) return;
        const max = parseInt(m[4], 10);
        if (!max) return;
        // Find the closest input/textarea in the same field/stage.
        const field = scope.querySelector("input.input__field, textarea.input__field, textarea.textarea-stub, input[type='text'], textarea");
        if (!field) return;
        span.dataset.sgtCounter = "1";
        // Initialize maxlength so the user can't blow past the cap silently.
        if (!field.hasAttribute("maxlength") && field.tagName === "INPUT") {
          field.setAttribute("maxlength", String(max));
        }
        const update = () => {
          const len = (field.value || "").length;
          span.textContent = `${len} / ${max}`;
          const over = len > max;
          span.classList.toggle("counter--over", over);
          span.style.color = over ? "var(--danger)" : "";
        };
        field.addEventListener("input", update);
        update();
      });
    });
  }

  /* ---------- Line-item table recompute ----------
   * For each <table class="line-table">, on quantity / unit-price input,
   * recompute the row's amount and the footer subtotals + grand total.
   */
  function bindLineItem(root) {
    const parseNum = s => {
      if (!s) return 0;
      // Normalize full-width digits and strip commas/¥/whitespace.
      const norm = String(s).replace(/[０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
        .replace(/[,¥\s]/g, "");
      const n = Number(norm);
      return isFinite(n) ? n : 0;
    };
    const fmt = n => Math.round(n).toLocaleString("en-US");

    root.querySelectorAll("table.line-table").forEach(table => {
      const recalc = () => {
        const subtotals = {}; // { "10": n, "8": n, "0": n }
        table.querySelectorAll("tbody tr").forEach(tr => {
          if (tr.classList.contains("line-table__add")) return;
          const cells = tr.querySelectorAll(":scope > td");
          if (cells.length < 7) return;
          const qtyField = cells[2].querySelector("input, textarea");
          const priceField = cells[4].querySelector("input, textarea");
          const amountCell = cells[6];
          const ratePill = cells[5].querySelector(".rate-pill");
          if (!qtyField || !priceField || !amountCell) return;
          const qty = parseNum(qtyField.value);
          const price = parseNum(priceField.value);
          const amount = qty * price;
          amountCell.textContent = fmt(amount);
          const rate = ratePill ? (ratePill.textContent.match(/(\d+)/) || [0, "0"])[1] : "0";
          subtotals[rate] = (subtotals[rate] || 0) + amount;
        });
        // Update footer rows. Heuristic: a tfoot row with text "10%" is the
        // 10% subtotal; same for 8%; the .grand row is the grand total.
        table.querySelectorAll("tfoot tr").forEach(tr => {
          const label = tr.querySelector("td:not(.num)");
          const out = tr.querySelector("td.num.mono");
          if (!out) return;
          if (tr.classList.contains("grand")) {
            const tax = (subtotals["10"] || 0) * 0.10 + (subtotals["8"] || 0) * 0.08;
            const sum = Object.values(subtotals).reduce((a, b) => a + b, 0) + tax;
            out.textContent = "¥" + fmt(sum);
          } else {
            const txt = (label ? label.textContent : "") + (out.previousElementSibling ? out.previousElementSibling.textContent : "");
            const m = (tr.textContent || "").match(/(\d+)\s*%/);
            if (m) out.textContent = fmt(subtotals[m[1]] || 0);
            void txt;
          }
        });
      };
      table.querySelectorAll("tbody input, tbody textarea").forEach(el => {
        // Only watch numeric cells; both qty (idx 2) and price (idx 4) carry
        // the .input__field--num modifier when normalized from .mono numeric
        // mockups, but mockups varied — so re-recalc on any cell change.
        el.addEventListener("input", recalc);
      });
      // Initial sync (handles slight rounding differences in the mockup).
      recalc();
    });
  }

  /* ---------- Active-state toggles for tabs / pager / segmented buttons ---- */
  function bindActiveToggles(root) {
    // Main demo tabs (not usage tabs, which have their own binder).
    root.querySelectorAll(".tabs").forEach(group => {
      const tabs = group.querySelectorAll(":scope > .tabs__tab");
      tabs.forEach(tab => {
        if (tab.disabled) return;
        tab.addEventListener("click", () => {
          tabs.forEach(t => t.classList.remove("tabs__tab--active"));
          tab.classList.add("tabs__tab--active");
        });
      });
    });
    // Pagination: numeric and arrow buttons that aren't disabled.
    root.querySelectorAll(".pager").forEach(group => {
      const buttons = group.querySelectorAll(":scope > button");
      buttons.forEach(b => {
        if (b.disabled) return;
        // Skip prev/next/first/last — they shouldn't grab .active.
        const label = b.getAttribute("aria-label") || "";
        const isNav = /先頭|前|次|最終/.test(label) || /前へ|次へ/.test(b.textContent);
        if (isNav) return;
        if (b.classList.contains("ell") || b.classList.contains("muted")) return;
        b.addEventListener("click", () => {
          buttons.forEach(other => other.classList.remove("active"));
          b.classList.add("active");
        });
      });
    });
    // Generic segmented button groups: .btn-group, .prefs (47都道府県), and
    // any inline .row containing a single .btn--primary among siblings.
    const segmentedSelectors = [".btn-group", ".prefs"];
    segmentedSelectors.forEach(sel => {
      root.querySelectorAll(sel).forEach(group => {
        const buttons = group.querySelectorAll(":scope > button");
        buttons.forEach(b => {
          if (b.disabled) return;
          b.addEventListener("click", () => {
            buttons.forEach(o => {
              o.classList.remove("btn--primary", "prefs__btn--active");
              if (sel === ".btn-group" && !o.classList.contains("btn--ghost")) {
                o.classList.add("btn--ghost");
              }
            });
            if (sel === ".btn-group") {
              b.classList.remove("btn--ghost");
              b.classList.add("btn--primary");
            } else {
              b.classList.add("prefs__btn--active");
            }
          });
        });
      });
    });
    // Tax rate pills: clicking toggles --active among peers in the same row.
    root.querySelectorAll(".rate-pill").forEach(pill => {
      // Only rate-pills inside the dedicated tax demo are interactive; pills
      // sitting inside a table row stay decorative (the row knows its rate).
      if (pill.closest("td") || pill.closest("tr")) return;
      pill.style.cursor = "pointer";
      pill.addEventListener("click", () => {
        const peers = pill.parentElement
          ? pill.parentElement.querySelectorAll(":scope > .rate-pill")
          : [pill];
        peers.forEach(p => p.classList.remove("rate-pill--active"));
        pill.classList.add("rate-pill--active");
      });
    });
  }

  /* ---------- Stepper: clicking a done step makes it current ---------- */
  function bindStepper(root) {
    root.querySelectorAll(".stepper").forEach(ol => {
      const steps = ol.querySelectorAll(":scope > .stepper__step");
      steps.forEach(step => {
        if (!step.classList.contains("stepper__step--done")) return;
        step.style.cursor = "pointer";
        step.addEventListener("click", () => {
          // Demote the current marker to plain done (treat as completed).
          steps.forEach(s => {
            if (s.classList.contains("stepper__step--current")) {
              s.classList.remove("stepper__step--current");
              s.classList.add("stepper__step--done");
            }
          });
          step.classList.remove("stepper__step--done");
          step.classList.add("stepper__step--current");
        });
      });
    });
  }

  /* ---------- Dismissible widgets ----------
   * Delegated handler: clicking a close icon button removes the nearest
   * dismissible ancestor. Same handler covers chip removal.
   */
  function bindDismiss(root) {
    if (root.body && root.body.dataset.sgtDismissBound) return;
    if (root.body) root.body.dataset.sgtDismissBound = "1";
    const target = root.body || root;
    target.addEventListener("click", e => {
      // Chip × icon (any svg inside .chip).
      const chip = e.target.closest(".chip");
      if (chip && e.target.closest("svg, .icon")) {
        chip.remove();
        return;
      }
      const closeBtn = e.target.closest(
        '.btn--icon[aria-label="閉じる"], .btn--icon[aria-label="クリア"], button[aria-label="閉じる"], button[aria-label="クリア"]'
      );
      if (!closeBtn) return;
      const host = closeBtn.closest(
        ".alert, .banner, .toast, .modal-stub, .picker-card, .file-row, .drawer-frame"
      );
      if (host) {
        host.style.transition = "opacity 0.15s ease";
        host.style.opacity = "0";
        setTimeout(() => host.remove(), 150);
      }
    });
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

  /* ---------- Icons grid ----------
   * Renders the global ICON object as a clickable grid. Clicking a card
   * copies a JS template-literal snippet (e.g. "${ICON.search}") to the
   * clipboard and flashes a "Copied" indicator.
   */
  function renderIconsGrid() {
    const grid = document.querySelector("[data-icons-grid]");
    if (!grid) return;
    const ICONS = window.ICON || {};
    const names = Object.keys(ICONS).sort();
    grid.innerHTML = names.map(name => {
      const svg = ICONS[name].replace('class="icon"', 'class="icon-card__svg"');
      return `<button type="button" class="icon-card" data-icon-name="${name}" aria-label="アイコン ${name} をコピー">
        ${svg}
        <span class="icon-card__name mono">${name}</span>
      </button>`;
    }).join("");
    grid.addEventListener("click", e => {
      const card = e.target.closest(".icon-card");
      if (!card) return;
      const name = card.dataset.iconName;
      const snippet = "${ICON." + name + "}";
      const fallback = ICONS[name] || "";
      const copy = navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(snippet)
        : Promise.reject(new Error("clipboard unavailable"));
      copy.catch(() => {
        // Fallback for non-clipboard environments: use a hidden textarea.
        try {
          const ta = document.createElement("textarea");
          ta.value = snippet;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        } catch (_) { /* swallow */ }
      });
      card.classList.add("icon-card--copied");
      setTimeout(() => card.classList.remove("icon-card--copied"), 1200);
      // Suppress unused-warning by referencing fallback (kept for future use).
      void fallback;
    });

    // Local search box dedicated to this section.
    const filter = document.querySelector(".icon-grid__search");
    if (filter) {
      filter.addEventListener("input", () => {
        const q = filter.value.trim().toLowerCase();
        grid.querySelectorAll(".icon-card").forEach(c => {
          c.style.display = !q || c.dataset.iconName.includes(q) ? "" : "none";
        });
      });
    }
  }

  function bindSearch() {
    const input = document.querySelector(".app-header .search input");
    if (!input) return;
    const cards = [...document.querySelectorAll("article.card")];
    const iconCards = [...document.querySelectorAll(".icon-card")];
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        cards.forEach(c => c.style.display = "");
        iconCards.forEach(c => c.style.display = "");
        document.querySelectorAll("section.section").forEach(s => s.style.display = "");
        return;
      }
      cards.forEach(c => {
        const txt = c.textContent.toLowerCase();
        c.style.display = txt.includes(q) ? "" : "none";
      });
      iconCards.forEach(c => {
        c.style.display = c.dataset.iconName.includes(q) ? "" : "none";
      });
      document.querySelectorAll("section.section").forEach(s => {
        if (s.id === "icons") {
          const visible = s.querySelector(".icon-card:not([style*='display: none'])");
          s.style.display = visible ? "" : "none";
          return;
        }
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
    renderIconsGrid();
    normalizeFormControls(document);
    bindCombos(document);
    bindUsageTabs(document);
    bindCounters(document);
    bindLineItem(document);
    bindActiveToggles(document);
    bindStepper(document);
    bindDismiss(document);
    bindSearch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
