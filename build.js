/* Shigoto UI — Catalog renderer
 * Reads CARDS (cards.js) + USAGE (usage.js) and injects component cards
 * into the slots <div data-component="<key>"> defined in the HTML.
 */
(function () {
  "use strict";

  const PRIORITY_LABEL = {
    must:   { label: "MUST",   cls: "priority--must" },
    should: { label: "SHOULD", cls: "priority--should" },
    could:  { label: "COULD",  cls: "priority--could" }
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function usageBlock(key) {
    const u = (window.USAGE || {})[key];
    if (!u) {
      return `<div class="usage usage--empty">
        <p class="muted small">使用例は近日追加（HTML / Vanilla / React / Vue）</p>
      </div>`;
    }
    const panes = ["html", "vanilla", "react", "vue"]
      .filter(k => u[k])
      .map((k, i) => {
        const label = { html: "HTML", vanilla: "Vanilla JS", react: "React", vue: "Vue" }[k];
        return {
          tab: `<button class="usage__tab" role="tab" aria-selected="${i===0}" data-pane="${k}">${label}</button>`,
          pane: `<pre class="usage__pane" data-pane="${k}"${i===0?' data-active="true"':''}>${u[k]}</pre>`
        };
      });
    return `
      <div class="usage" role="tablist" aria-label="使用例">
        <div class="usage__tabs">${panes.map(p => p.tab).join("")}</div>
        <div class="usage__panes">${panes.map(p => p.pane).join("")}</div>
      </div>`;
  }

  function renderCard(key, c) {
    const pr = PRIORITY_LABEL[c.priority] || PRIORITY_LABEL.should;
    return `
      <article class="card" data-key="${key}">
        <header class="card__head">
          <div class="card__title-row">
            <div class="card__id mono">${escapeHtml(c.id)}</div>
            <h3 class="card__title">${escapeHtml(c.name)}</h3>
            <code class="card__tag mono">${escapeHtml(c.tag)}</code>
          </div>
          <span class="priority ${pr.cls}">${pr.label}</span>
        </header>
        <p class="card__desc">${c.desc}</p>
        <div class="card__body">${c.body}</div>
        <p class="accept">${c.accept}</p>
        <details class="card__usage" open>
          <summary>使用例（HTML / Vanilla / React / Vue）</summary>
          ${usageBlock(key)}
        </details>
      </article>`;
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
    bindUsageTabs(document);
    bindSearch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
