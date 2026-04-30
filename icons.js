/* Shigoto UI — minimal stroke icon set (SVG)
 * All icons use viewBox="0 0 16 16", stroke-width 1.4, round caps/joins,
 * and currentColor so they inherit the host's color via CSS.
 */
const ICON_BASE = 'class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"';
const ICON = {
  search:   `<svg ${ICON_BASE}><circle cx="7" cy="7" r="4"/><line x1="10" y1="10" x2="13.5" y2="13.5"/></svg>`,
  caret:    `<svg ${ICON_BASE}><polyline points="4,6.5 8,10.5 12,6.5"/></svg>`,
  plus:     `<svg ${ICON_BASE}><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>`,
  close:    `<svg ${ICON_BASE}><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>`,
  download: `<svg ${ICON_BASE}><line x1="8" y1="3" x2="8" y2="11"/><polyline points="4.5,7.5 8,11 11.5,7.5"/><line x1="3" y1="13.5" x2="13" y2="13.5"/></svg>`,
  upload:   `<svg ${ICON_BASE}><line x1="8" y1="13" x2="8" y2="5"/><polyline points="4.5,8.5 8,5 11.5,8.5"/><line x1="3" y1="2.5" x2="13" y2="2.5"/></svg>`,
  print:    `<svg ${ICON_BASE}><polyline points="4,6 4,2.5 12,2.5 12,6"/><rect x="2.5" y="6" width="11" height="6" rx="0.5"/><rect x="4.5" y="9.5" width="7" height="3.5"/></svg>`,
  check:    `<svg ${ICON_BASE} stroke-width="1.6"><polyline points="3,8.5 6.5,12 13,4.5"/></svg>`,
  warn:     `<svg ${ICON_BASE}><path d="M8 2.2 L14 13 L2 13 Z"/><line x1="8" y1="6.5" x2="8" y2="9.5"/><circle cx="8" cy="11.5" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  info:     `<svg ${ICON_BASE}><circle cx="8" cy="8" r="6"/><line x1="8" y1="7.5" x2="8" y2="11.5"/><circle cx="8" cy="5" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  arrow:    `<svg ${ICON_BASE}><line x1="3" y1="8" x2="13" y2="8"/><polyline points="9.5,4.5 13,8 9.5,11.5"/></svg>`,
  sort:     `<svg ${ICON_BASE}><polyline points="5,6 8,3 11,6"/><polyline points="5,10 8,13 11,10"/></svg>`,
  drag:     `<svg ${ICON_BASE} fill="currentColor" stroke="none"><circle cx="6" cy="4" r="1"/><circle cx="10" cy="4" r="1"/><circle cx="6" cy="8" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/></svg>`,
  yen:      `<svg ${ICON_BASE}><polyline points="4,3 8,8 12,3"/><line x1="8" y1="8" x2="8" y2="13"/><line x1="4.5" y1="9.5" x2="11.5" y2="9.5"/><line x1="4.5" y1="11.5" x2="11.5" y2="11.5"/></svg>`,
  calendar: `<svg ${ICON_BASE}><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><line x1="2.5" y1="6.5" x2="13.5" y2="6.5"/><line x1="5.5" y1="2.5" x2="5.5" y2="4.5"/><line x1="10.5" y1="2.5" x2="10.5" y2="4.5"/></svg>`,
  filter:   `<svg ${ICON_BASE}><path d="M2.5 3 L13.5 3 L9.5 8 L9.5 13 L6.5 11.5 L6.5 8 Z"/></svg>`
};
window.ICON = ICON;
