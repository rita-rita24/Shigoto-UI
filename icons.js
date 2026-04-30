/* Shigoto UI — minimal stroke icon set (SVG)
 * All icons use viewBox="0 0 16 16", stroke-width 1.4, round caps/joins,
 * and currentColor so they inherit the host's color via CSS.
 *
 * Icons are organized by category for the icons page; the registry is a flat
 * map (window.ICON) so callers can do `ICON.search` etc. without grouping.
 * window.ICON_GROUPS is an ordered array used to render the icons page with
 * section headings; flat ICON consumers can ignore it.
 */
const ICON_BASE = 'class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';

const ICON = {
  /* ===== ナビゲーション ===== */
  home:           `<svg ${ICON_BASE}><polyline points="2.5,8 8,3 13.5,8"/><polyline points="4,7.5 4,13 12,13 12,7.5"/></svg>`,
  menu:           `<svg ${ICON_BASE}><line x1="2.5" y1="4" x2="13.5" y2="4"/><line x1="2.5" y1="8" x2="13.5" y2="8"/><line x1="2.5" y1="12" x2="13.5" y2="12"/></svg>`,
  more:           `<svg ${ICON_BASE} fill="currentColor" stroke="none"><circle cx="3.5" cy="8" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="12.5" cy="8" r="1"/></svg>`,
  "more-v":       `<svg ${ICON_BASE} fill="currentColor" stroke="none"><circle cx="8" cy="3.5" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="8" cy="12.5" r="1"/></svg>`,
  expand:         `<svg ${ICON_BASE}><polyline points="3,5.5 3,3 5.5,3"/><polyline points="10.5,3 13,3 13,5.5"/><polyline points="13,10.5 13,13 10.5,13"/><polyline points="5.5,13 3,13 3,10.5"/></svg>`,
  external:       `<svg ${ICON_BASE}><polyline points="9,3 13,3 13,7"/><line x1="13" y1="3" x2="7.5" y2="8.5"/><path d="M11 9.5v3h-7.5v-7.5h3"/></svg>`,

  /* ===== 矢印・キャレット ===== */
  arrow:          `<svg ${ICON_BASE}><line x1="3" y1="8" x2="13" y2="8"/><polyline points="9.5,4.5 13,8 9.5,11.5"/></svg>`,
  "arrow-left":   `<svg ${ICON_BASE}><line x1="13" y1="8" x2="3" y2="8"/><polyline points="6.5,4.5 3,8 6.5,11.5"/></svg>`,
  "arrow-up":     `<svg ${ICON_BASE}><line x1="8" y1="13" x2="8" y2="3"/><polyline points="4.5,6.5 8,3 11.5,6.5"/></svg>`,
  "arrow-down":   `<svg ${ICON_BASE}><line x1="8" y1="3" x2="8" y2="13"/><polyline points="4.5,9.5 8,13 11.5,9.5"/></svg>`,
  caret:          `<svg ${ICON_BASE}><polyline points="4,6.5 8,10.5 12,6.5"/></svg>`,
  "caret-up":     `<svg ${ICON_BASE}><polyline points="4,9.5 8,5.5 12,9.5"/></svg>`,
  "caret-left":   `<svg ${ICON_BASE}><polyline points="9.5,4 5.5,8 9.5,12"/></svg>`,
  "caret-right":  `<svg ${ICON_BASE}><polyline points="6.5,4 10.5,8 6.5,12"/></svg>`,

  /* ===== アクション ===== */
  search:         `<svg ${ICON_BASE}><circle cx="7" cy="7" r="4"/><line x1="10" y1="10" x2="13.5" y2="13.5"/></svg>`,
  filter:         `<svg ${ICON_BASE}><path d="M2.5 3 L13.5 3 L9.5 8 L9.5 13 L6.5 11.5 L6.5 8 Z"/></svg>`,
  sort:           `<svg ${ICON_BASE}><polyline points="5,6 8,3 11,6"/><polyline points="5,10 8,13 11,10"/></svg>`,
  refresh:        `<svg ${ICON_BASE}><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9"/><polyline points="14,2.5 14,5 11.5,5"/></svg>`,
  edit:           `<svg ${ICON_BASE}><path d="M3 13l2 0 7.5-7.5-2-2L3 11z"/><line x1="9.5" y1="4" x2="11.5" y2="6"/></svg>`,
  trash:          `<svg ${ICON_BASE}><polyline points="3,4.5 13,4.5"/><polyline points="5.5,4.5 5.5,3 10.5,3 10.5,4.5"/><path d="M4.5 4.5l0.7 9h5.6l0.7-9"/><line x1="7" y1="7" x2="7" y2="11.5"/><line x1="9" y1="7" x2="9" y2="11.5"/></svg>`,
  copy:           `<svg ${ICON_BASE}><rect x="5" y="5" width="8" height="8" rx="0.5"/><path d="M3 10.5V3.5h7"/></svg>`,
  save:           `<svg ${ICON_BASE}><path d="M3 3h8l2 2v8H3z"/><polyline points="5,3 5,7 10.5,7 10.5,3"/><rect x="5.5" y="9" width="5" height="4"/></svg>`,
  send:           `<svg ${ICON_BASE}><path d="M14 2L2 7.5l5 1.5z"/><path d="M14 2L7 9l1.5 5z"/></svg>`,
  share:          `<svg ${ICON_BASE}><circle cx="4" cy="8" r="1.5"/><circle cx="12" cy="4" r="1.5"/><circle cx="12" cy="12" r="1.5"/><line x1="5.4" y1="7.2" x2="10.6" y2="4.8"/><line x1="5.4" y1="8.8" x2="10.6" y2="11.2"/></svg>`,
  link:           `<svg ${ICON_BASE}><path d="M9 7l-2 2"/><path d="M7 5L5.5 6.5a2.5 2.5 0 0 0 3.5 3.5L10.5 8.5"/><path d="M9 11l1.5-1.5a2.5 2.5 0 0 0-3.5-3.5L5.5 7.5"/></svg>`,
  attach:         `<svg ${ICON_BASE}><path d="M11.5 6L6 11.5a2.2 2.2 0 0 1-3.1-3.1l6.5-6.5a1.5 1.5 0 0 1 2.1 2.1L5.5 9.5a0.7 0.7 0 0 1-1-1L9 4"/></svg>`,
  download:       `<svg ${ICON_BASE}><line x1="8" y1="3" x2="8" y2="11"/><polyline points="4.5,7.5 8,11 11.5,7.5"/><line x1="3" y1="13.5" x2="13" y2="13.5"/></svg>`,
  upload:         `<svg ${ICON_BASE}><line x1="8" y1="13" x2="8" y2="5"/><polyline points="4.5,8.5 8,5 11.5,8.5"/><line x1="3" y1="2.5" x2="13" y2="2.5"/></svg>`,
  print:          `<svg ${ICON_BASE}><polyline points="4,6 4,2.5 12,2.5 12,6"/><rect x="2.5" y="6" width="11" height="6" rx="0.5"/><rect x="4.5" y="9.5" width="7" height="3.5"/></svg>`,

  /* ===== 入出力・記号 ===== */
  plus:           `<svg ${ICON_BASE}><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>`,
  minus:          `<svg ${ICON_BASE}><line x1="3" y1="8" x2="13" y2="8"/></svg>`,
  close:          `<svg ${ICON_BASE}><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>`,
  check:          `<svg ${ICON_BASE} stroke-width="1.6"><polyline points="3,8.5 6.5,12 13,4.5"/></svg>`,
  drag:           `<svg ${ICON_BASE} fill="currentColor" stroke="none"><circle cx="6" cy="4" r="1"/><circle cx="10" cy="4" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/></svg>`,

  /* ===== ステータス ===== */
  warn:           `<svg ${ICON_BASE}><path d="M8 2.2 L14 13 L2 13 Z"/><line x1="8" y1="6.5" x2="8" y2="9.5"/><circle cx="8" cy="11.5" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  info:           `<svg ${ICON_BASE}><circle cx="8" cy="8" r="6"/><line x1="8" y1="7.5" x2="8" y2="11.5"/><circle cx="8" cy="5" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  "check-circle": `<svg ${ICON_BASE}><circle cx="8" cy="8" r="6"/><polyline points="5,8 7.2,10.2 11,6.4"/></svg>`,
  "x-circle":     `<svg ${ICON_BASE}><circle cx="8" cy="8" r="6"/><line x1="6" y1="6" x2="10" y2="10"/><line x1="10" y1="6" x2="6" y2="10"/></svg>`,
  bell:           `<svg ${ICON_BASE}><path d="M4 11V8a4 4 0 0 1 8 0v3l1.2 1.2H2.8z"/><path d="M6.5 13.2a1.5 1.5 0 0 0 3 0"/></svg>`,
  star:           `<svg ${ICON_BASE}><polygon points="8,2.5 9.7,6 13.5,6.5 10.7,9.2 11.5,13 8,11.2 4.5,13 5.3,9.2 2.5,6.5 6.3,6"/></svg>`,
  bookmark:       `<svg ${ICON_BASE}><path d="M4 2.5v11l4-3 4 3v-11z"/></svg>`,

  /* ===== 業務アイテム ===== */
  yen:            `<svg ${ICON_BASE}><polyline points="4,3 8,8 12,3"/><line x1="8" y1="8" x2="8" y2="13"/><line x1="4.5" y1="9.5" x2="11.5" y2="9.5"/><line x1="4.5" y1="11.5" x2="11.5" y2="11.5"/></svg>`,
  calendar:       `<svg ${ICON_BASE}><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><line x1="2.5" y1="6.5" x2="13.5" y2="6.5"/><line x1="5.5" y1="2.5" x2="5.5" y2="4.5"/><line x1="10.5" y1="2.5" x2="10.5" y2="4.5"/></svg>`,
  clock:          `<svg ${ICON_BASE}><circle cx="8" cy="8" r="6"/><polyline points="8,4.5 8,8 11,9.5"/></svg>`,
  tag:            `<svg ${ICON_BASE}><path d="M2.5 6.5V2.5h4l7 7-4 4z"/><circle cx="5" cy="5" r="0.8"/></svg>`,
  folder:         `<svg ${ICON_BASE}><path d="M2 4.5h4l1 1.5h7v6.5H2z"/></svg>`,
  file:           `<svg ${ICON_BASE}><path d="M4 2h5.5L13 5.5V14H4z"/><polyline points="9,2 9,6 13,6"/></svg>`,
  "credit-card":  `<svg ${ICON_BASE}><rect x="2" y="4" width="12" height="8" rx="0.5"/><line x1="2" y1="7" x2="14" y2="7"/><line x1="4" y1="9.5" x2="6.5" y2="9.5"/></svg>`,
  database:       `<svg ${ICON_BASE}><ellipse cx="8" cy="3.5" rx="5.5" ry="1.5"/><path d="M2.5 3.5v9c0 0.8 2.5 1.5 5.5 1.5s5.5-0.7 5.5-1.5v-9"/><path d="M2.5 8c0 0.8 2.5 1.5 5.5 1.5s5.5-0.7 5.5-1.5"/></svg>`,
  building:       `<svg ${ICON_BASE}><rect x="3" y="2.5" width="10" height="11"/><line x1="6" y1="5" x2="6" y2="6"/><line x1="6" y1="8" x2="6" y2="9"/><line x1="6" y1="11" x2="6" y2="12"/><line x1="10" y1="5" x2="10" y2="6"/><line x1="10" y1="8" x2="10" y2="9"/><line x1="10" y1="11" x2="10" y2="12"/></svg>`,
  globe:          `<svg ${ICON_BASE}><circle cx="8" cy="8" r="6"/><line x1="2" y1="8" x2="14" y2="8"/><path d="M8 2c2 2.2 2 9.8 0 12M8 2c-2 2.2-2 9.8 0 12"/></svg>`,

  /* ===== ユーザ・コミュニケーション ===== */
  user:           `<svg ${ICON_BASE}><circle cx="8" cy="6" r="2.5"/><path d="M3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4"/></svg>`,
  users:          `<svg ${ICON_BASE}><circle cx="6" cy="6" r="2"/><circle cx="11.2" cy="6.5" r="1.5"/><path d="M2 13c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5"/><path d="M10 13c0-1.3 1-2.5 3.5-2.5"/></svg>`,
  mail:           `<svg ${ICON_BASE}><rect x="2" y="4" width="12" height="9" rx="0.5"/><polyline points="2.5,5 8,9 13.5,5"/></svg>`,
  phone:          `<svg ${ICON_BASE}><path d="M3 3.5a1.5 1.5 0 0 1 1.5-1.5h1.5l1.2 3-1.4 1c1 2 2.5 3.5 4.5 4.5l1-1.4 3 1.2v1.5a1.5 1.5 0 0 1-1.5 1.5C5 13.5 3 11 3 3.5z"/></svg>`,
  chat:           `<svg ${ICON_BASE}><path d="M2 4h12v8H7l-3 2.5V12H2z"/></svg>`,

  /* ===== 設定・権限 ===== */
  settings:       `<svg ${ICON_BASE}><circle cx="8" cy="8" r="2"/><path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4L11.2 4.8M4.8 11.2L3.4 12.6M12.6 12.6L11.2 11.2M4.8 4.8L3.4 3.4"/></svg>`,
  lock:           `<svg ${ICON_BASE}><rect x="3" y="7" width="10" height="6.5" rx="0.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg>`,
  unlock:         `<svg ${ICON_BASE}><rect x="3" y="7" width="10" height="6.5" rx="0.5"/><path d="M5 7V5a3 3 0 0 1 5.5-1.5"/></svg>`,
  eye:            `<svg ${ICON_BASE}><path d="M1.5 8s2.5-4 6.5-4 6.5 4 6.5 4-2.5 4-6.5 4-6.5-4-6.5-4z"/><circle cx="8" cy="8" r="2"/></svg>`,
  "eye-off":      `<svg ${ICON_BASE}><path d="M2 6.5c1.5-1.5 3.5-2.5 6-2.5 1.4 0 2.7 0.4 3.8 1"/><path d="M14 9.5c-0.5 0.6-1.2 1.3-2 1.9"/><path d="M9.5 11.9c-0.5 0.07-1 0.1-1.5 0.1-4 0-6.5-4-6.5-4 0.5-0.7 1.1-1.4 1.9-2"/><line x1="2.5" y1="2.5" x2="13.5" y2="13.5"/></svg>`,

  /* ===== 表示・分析 ===== */
  table:          `<svg ${ICON_BASE}><rect x="2.5" y="3" width="11" height="10"/><line x1="2.5" y1="7" x2="13.5" y2="7"/><line x1="8" y1="3" x2="8" y2="13"/></svg>`,
  list:           `<svg ${ICON_BASE} fill="currentColor"><circle cx="3" cy="4" r="0.8" stroke="none"/><circle cx="3" cy="8" r="0.8" stroke="none"/><circle cx="3" cy="12" r="0.8" stroke="none"/><line x1="5.5" y1="4" x2="13" y2="4" fill="none" stroke="currentColor"/><line x1="5.5" y1="8" x2="13" y2="8" fill="none" stroke="currentColor"/><line x1="5.5" y1="12" x2="13" y2="12" fill="none" stroke="currentColor"/></svg>`,
  chart:          `<svg ${ICON_BASE}><line x1="2.5" y1="13" x2="13.5" y2="13"/><rect x="4" y="9" width="2" height="4"/><rect x="7" y="6" width="2" height="7"/><rect x="10" y="3" width="2" height="10"/></svg>`,
  "trending-up":  `<svg ${ICON_BASE}><polyline points="2.5,11 6,7.5 8.5,10 13,5.5"/><polyline points="9.5,5.5 13,5.5 13,9"/></svg>`
};

/* Ordered grouping for the icons page. Keep order consistent with the
 * categories above. Names appear in the order listed; consumers that just
 * need name -> svg can ignore this map and read window.ICON directly. */
const ICON_GROUPS = [
  { id: "nav",      label: "ナビゲーション",        names: ["home", "menu", "more", "more-v", "expand", "external"] },
  { id: "arrow",    label: "矢印・キャレット",      names: ["arrow", "arrow-left", "arrow-up", "arrow-down", "caret", "caret-up", "caret-left", "caret-right"] },
  { id: "action",   label: "アクション",            names: ["search", "filter", "sort", "refresh", "edit", "trash", "copy", "save", "send", "share", "link", "attach", "download", "upload", "print"] },
  { id: "io",       label: "入出力・記号",          names: ["plus", "minus", "close", "check", "drag"] },
  { id: "status",   label: "ステータス",            names: ["warn", "info", "check-circle", "x-circle", "bell", "star", "bookmark"] },
  { id: "biz",      label: "業務アイテム",          names: ["yen", "calendar", "clock", "tag", "folder", "file", "credit-card", "database", "building", "globe"] },
  { id: "people",   label: "ユーザ・コミュニケーション", names: ["user", "users", "mail", "phone", "chat"] },
  { id: "perm",     label: "設定・権限",            names: ["settings", "lock", "unlock", "eye", "eye-off"] },
  { id: "view",     label: "表示・分析",            names: ["table", "list", "chart", "trending-up"] }
];

window.ICON = ICON;
window.ICON_GROUPS = ICON_GROUPS;
