---
name: storiap-annotator
description: >
  Automatically annotate place names in Three Kingdoms (三国志) biography texts for the "史图记·三国志" (Storiap) project.
  Use this skill whenever the user wants to:
  - Annotate or tag place names in Chinese historical texts (especially Three Kingdoms / 三国志)
  - Generate or update places.js entries with coordinates for historical Chinese locations
  - Convert raw biography text into HTML-annotated format with anchor tags for geographic visualization
  - Fetch biography text from gushiwen.cn by person name
  - Register new biographies in biographies.js
  - Work on the Storiap project or any task involving 三国志 地名标注
  Also trigger when the user mentions "史图记", "Storiap", "三国志标注", "地名标注", "historical place annotation",
  or asks to process Chinese historical biography files for map visualization.
  Even if the user just pastes raw classical Chinese text and asks to "mark the places" or "find the locations",
  or gives a person name like "帮我标注张辽传", use this skill.
---

# Storiap 三国志地名标注 Skill

You are helping annotate place names in Three Kingdoms biographies for the "史图记·三国志" project — a GIS visualization tool that maps historical events from the Sanguozhi onto interactive maps.

## Project File Structure

```
src/data/
├── places.js                        ← coordinates database (key-value)
├── biographies.js                   ← index file registering all biographies
└── biographies/
    ├── wei/  (魏书)  caocao.js, zhangliao.js, ...
    ├── shu/  (蜀书)  liubei.js, guanyu.js, ...
    └── wu/   (吴书)  sunquan.js, zhouyu.js, ...
```

## Your Complete Workflow

When given a person name or raw biography text, execute ALL five steps and produce all three output blocks in one response. Do not stop partway.

---

### STEP 1 — Obtain the biography text

If the user provides raw text: use it directly.

If the user gives only a person's name: fetch the biography from gushiwen.cn.
- Try: `https://so.gushiwen.cn/search/default.aspx?value=三国志+{人名}传`
- Extract classical Chinese text from the `<div class="contson">` element
- Keep the original classical Chinese; strip any modern annotations

---

### STEP 2 — Identify all place names

Read the full text carefully. Mark every place name occurrence, including:

| Type | Examples |
|------|---------|
| 州 (provinces) | 冀州、益州、荆州、扬州、并州、幽州 |
| 郡 (commanderies) | 南阳郡、涿郡、丹杨郡、琅邪 |
| 县/城 (counties/cities) | 许昌、下邳、成都、建业、合肥 |
| 关隘/山川 (passes/geography) | 阳平关、祁山、赤壁、官渡 |
| 具体地点 (specific sites) | 某营、某坞、某亭 |

**Note**: Annotate place names even when embedded in origin phrases (e.g. "涿郡人也" → annotate 涿郡).

For each place name, determine:
1. **Canonical key** — the form used in places.js (e.g. "丹杨" not "丹杨郡")
2. **Year** — approximate year of the associated event (use "XX年前" for early life)
3. **Location faction** — who controlled that place at that time (see below)

#### Faction Rules

| Value | Meaning | When to use |
|-------|---------|-------------|
| `wei` | 曹魏 | Location under Cao Wei control at event time |
| `shu` | 蜀汉 | Location under Shu Han control at event time |
| `wu` | 东吴 | Location under Eastern Wu control at event time |
| `neutral` | 中立/未定 | Eastern Han period, contested zones, or unclear control |

**Key principle**: Faction = who controlled the location **at the time of the event**, NOT the biography subject's kingdom.

---

### STEP 3 — Research coordinates for new places

Check `references/places_snapshot.md` for what already exists. For any place NOT already listed:

Search to find its modern location:
- Query: `{地名} 三国 东汉 现代地名` or `{地名} Three Kingdoms location China`
- Use Wikipedia / Baidu Baike to cross-check

Coordinate rules:
- `lat`: north latitude, 2 decimal places (e.g. `34.03`)
- `lng`: east longitude, 2 decimal places (e.g. `113.85`)
- `modernName`: full modern name — 省+市+县/区 (e.g. `'河南省许昌市'`)
- County/city precision is sufficient; no need for village-level accuracy

---

### STEP 4 — Produce the three output blocks

#### Block A: Biography JS file

Full `.js` file content with all place names wrapped in anchor tags.

**HTML annotation format**:
```html
<a class="place-name {subject_faction}" data-place="{地名}" data-year="{年份}" data-faction="{location_faction}">{地名}</a>
```

**Crucial distinction** (verified from existing files):
- `class="place-name {X}"` → X is the **biography subject's own faction** (e.g. all of 黄忠传 uses `shu`)
- `data-faction="{Y}"` → Y is the **actual controlling faction of that location** at that time

**File template**:
```javascript
/**
 * {人名}传记
 */
export default {
  id: '{faction}-{vol_number}-{name_pinyin}',
  name: '{人名}',
  content: {
    title: '{人名}传',
    text: `
      <p>...annotated text...</p>
    `
  }
}
```

The `id` format: `{faction}-{number}-{pinyin}` — match existing file conventions.

#### Block B: places.js additions

Only include entries NOT already in the existing places.js:
```javascript
// Add these entries to src/data/places.js (inside the export const places = { ... })
'新地名': { lat: XX.XX, lng: XXX.XX, modernName: '省市区全称' },
```

If all places already exist: write `// 所有地名已存在于 places.js，无需新增`

#### Block C: biographies.js registration

```javascript
// 1. Add import line to top section of biographies.js:
import {pinyin}  from './biographies/{faction}/{pinyin}.js'

// 2. Add to biographyData.{faction}.biographies array:
{
  id: '{faction}-{N}',
  title: '{传名第X}',
  persons: [{pinyin}]
}
```

If the person is already imported but commented out, indicate which line to uncomment instead.

---

### STEP 5 — Self-check before finalizing

- [ ] Every `data-place` value exactly matches a key in places.js (existing or newly added in Block B)
- [ ] No place name in the text is missed
- [ ] `class` uses subject's faction; `data-faction` uses location controller's faction
- [ ] Years are historically plausible
- [ ] The biography `id` follows existing naming conventions

---

## Reference Files

- `references/places_snapshot.md` — Full list of existing places.js entries (check before adding new ones)
- `references/faction_timeline.md` — Quick timeline of when key regions changed faction control

## Common Edge Cases

- **Same name, different places**: 赤壁 → use 湖北省咸宁市赤壁市 for the famous 208年 battle
- **Too-generic names**: Skip place names that are not specific named locations (e.g. bare 山, 水)
- **Person origin phrases**: "涿郡人也" → annotate 涿郡 only
- **Repeated occurrences**: Annotate EVERY occurrence, with the year appropriate to that specific event
- **Uncertain year**: Use best historical estimate; use "XX年前" for "before year XX"
- **郡 vs county key**: Match the canonical key form in places.js — e.g. "丹杨" (not "丹杨郡"), "琅邪" (not "琅邪郡")
