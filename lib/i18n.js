// Bilingual content dictionary + product catalog.
// Kept as a plain ES module — server and client components can both import.

export const I18N = {
  nav: {
    story:   { en: "Our Story",   zh: "我們的故事" },
    products:{ en: "Products",    zh: "腊味精選" },
    craft:   { en: "The Craft",   zh: "製作工藝" },
    visit:   { en: "Visit Us",    zh: "歡迎光臨" },
    contact: { en: "Contact",     zh: "聯絡我們" },
  },
  hero: {
    eyebrow:    { en: "Established 1856 · Chinese Cured Meats",
                  zh: "創立於一八五六年 · 傳統中式腊味" },
    nameZh:     "茂利號腊味",
    nameEn:     "Mow Lee & Co.",
    tagline:    { en: "Cured by tradition since 1856",
                  zh: "百年傳統，精心製作" },
    blurb:      { en: "Six generations of one family, one Chinatown storefront, one craft. Every link, breast, and belly is hung and oven-dried by hand at 774 Commercial Street — the way it has been done since the year before the Civil War.",
                  zh: "一個家族，六代相傳。一間唐人街老舖，一門手藝。每一條腊腸、每一塊腊肉，皆於 774 Commercial Street 親手懸掛、慢火烘焙——自一八五六年至今，從未改變。" },
    ctaShop:    { en: "Shop Now",      zh: "立即選購" },
    ctaStory:   { en: "Our Story",     zh: "了解我們" },
    cornerTL:   { en: "GUM SAAN",      zh: "大埠" },
    cornerTR:   { en: "SAN FRANCISCO", zh: "金山" },
  },
  ticker: {
    en: ["Established 1856", "Six generations", "No MSG", "No artificial coloring", "No preservatives", "Hand-hung, oven-dried", "774 Commercial Street", "Wholesale & Retail", "Shipping available", "Open 7 days, 10am–6pm", "Inspected & Passed · S.F.H.D.", "App. Estab. 53"],
    zh: ["創立於一八五六年", "六代相傳", "無味精", "無人工色素", "無防腐劑", "人手懸掛 · 慢火烘焙", "Commercial 街 七七四號", "批發零售", "可郵寄全美", "七天營業 · 10:00–18:00", "衛生局員查驗批准", "美國加省"],
  },
  why: {
    title: { en: "Why Mow Lee", zh: "茂利號之選" },
    items: [
      { kZh: "無味精", kEn: "No MSG",        bZh: "純天然調味，不含味精。", bEn: "Soy sauce, Shaoxing wine, salt, sugar. Nothing else." },
      { kZh: "店內製作", kEn: "Made Onsite", bZh: "前店後廠，於原址親手製作。", bEn: "Hung, dried, and packed at 774 Commercial — never outsourced." },
      { kZh: "自一八五六", kEn: "Since 1856", bZh: "六代家族傳承，未曾間斷。",   bEn: "Six unbroken generations of one family, one recipe, one block." },
    ],
  },
  story: {
    title:    { en: "168 Years of Tradition", zh: "一百六十八年的傳統" },
    subtitle: { en: "One family. One block of Chinatown. One craft.",
                zh: "一個家族，一條街，一門手藝。" },
    body: [
      { en: "Mow Lee Shing Kee & Co. was founded in 1856 by members of the Pon family at 745 Sacramento Street, when San Francisco's Chinatown was still finding its shape. The shop sold cured pork and dried provisions to the laborers, merchants, and miners of Gum Saan — the Gold Mountain.",
        zh: "茂利號腊味創立於一八五六年，由番氏家族於沙加緬度街七四五號創辦。彼時，三藩市唐人街尚在草創之初。本號專營臘味乾貨，供奉勞工、商賈、礦夫，是「金山」初代華人之口糧。" },
      { en: "The 1906 earthquake and fire flattened Chinatown. Mow Lee rebuilt — first at 730 Grant Avenue, then between 1949 and 1953 settling into 774 Commercial Street, inside the post-quake Six Companies Building of 1907. We have not moved since.",
        zh: "一九零六年大地震焚毀唐人街，本號隨眾重建。先遷都板街七三零號，後於一九四九至一九五三年間，遷入 Commercial 街七七四號（一九零七年災後重建之中華六大公司樓）。自此再未遷址。" },
      { en: "Six generations have stood behind this counter — Pon Dai Guen, Pon Get, Pon Yee Zhong, Yee Dor Lam & Tina Jew, Jian Lian Cheng & Pun Wun Lee, and today George, Gerald, Warren, and Lien Lee. The recipes have not changed. Neither have we.",
        zh: "六代人守此櫃枱：番大根、番杰、番義忠、余多林與周婷、鄭健聯與李潘穩，及今日之李哲、李傑勞、李偉倫、李蓮。配方未改，吾家未變。" },
    ],
    timeline: [
      { years: "1856–1900", who: "Pon Dai Guen",                       whoZh: "番大根",          note: "Founded at 745 Sacramento St.",      noteZh: "創立於沙加緬度街七四五號" },
      { years: "1900–1930", who: "Pon Get",                            whoZh: "番杰",            note: "Survived & rebuilt after 1906 fire", noteZh: "歷一九零六年大火，重建" },
      { years: "1930–1950", who: "—",                                  whoZh: "—",               note: "Records lost; trade continued",        noteZh: "戰時記載散佚，營業未斷" },
      { years: "1950–1975", who: "Pon Yee Zhong",                      whoZh: "番義忠",          note: "Settled at 774 Commercial St.",      noteZh: "遷入 Commercial 街七七四號" },
      { years: "1975–1999", who: "Yee Dor Lam · Tina Jew",             whoZh: "余多林 · 周婷",   note: "Modernized the curing room",         noteZh: "革新烘焙室" },
      { years: "1999–2015", who: "Jian Lian Cheng · Pun Wun Lee",      whoZh: "鄭健聯 · 李潘穩", note: "Began wholesale to SF restaurants",  noteZh: "開始供應三藩市食肆" },
      { years: "2015–今",   who: "George · Gerald · Warren · Lien Lee", whoZh: "李哲 · 李傑勞 · 李偉倫 · 李蓮", note: "Sixth generation. Same counter.",  noteZh: "第六代，同一櫃枱。" },
    ],
    pressTitle: { en: "As Featured In", zh: "媒體報導" },
    press: ["NBC Bay Area", "KTVU", "SF Examiner", "SFGATE", "Hungry Ones"],
    chefsTitle: { en: "On the menu at", zh: "供應於" },
    chefs: ["R&G Lounge", "China Live", "Mister Jiu's"],
  },
  shop: {
    title:    { en: "Cured Selections", zh: "腊味精選" },
    subtitle: { en: "Sold by the pound or each. Wholesale & retail. Shipping available.",
                zh: "按磅、按隻計價。批發零售，可郵寄全美。" },
    bywt:     { en: "by the lb",  zh: "每磅" },
    byea:     { en: "each",       zh: "每隻" },
    add:      { en: "Add",        zh: "加入" },
    added:    { en: "Added ✓",    zh: "已加入 ✓" },
    cart:     { en: "Cart",       zh: "購物車" },
    empty:    { en: "Your cart is empty", zh: "您的購物車是空的" },
    subtotal: { en: "Subtotal",   zh: "小計" },
    checkout: { en: "Checkout",   zh: "結帳" },
    shippingNote: { en: "Estimated. Shipping & tax calculated at checkout.",
                    zh: "未含運費及稅項，結帳時計算。" },
  },
  craft: {
    title:    { en: "The Art of Curing", zh: "製作工藝" },
    subtitle: { en: "Four steps. Four to six days. No shortcuts.",
                zh: "四道工序，四至六日，毫不取巧。" },
    steps: [
      { n: "壹", en: "Marination",        zh: "醃制",  body: "Soy sauce and Shaoxing wine, salt, sugar. 24–48 hours.",  bodyZh: "頭抽、紹興酒、鹽、糖。醃二十四至四十八小時。" },
      { n: "貳", en: "Hanging",           zh: "掛起",  body: "Hung on bamboo for airflow and even cure.",                bodyZh: "懸於竹竿，使空氣流通、入味均勻。" },
      { n: "參", en: "Slow Oven Drying",  zh: "烤製",  body: "Temperature-controlled. Several days.",                    bodyZh: "控溫慢焙，歷數日方成。" },
      { n: "肆", en: "Finished",          zh: "完成",  body: "No MSG. No coloring. No preservatives.",                   bodyZh: "無味精、無色素、無防腐劑。" },
    ],
  },
  visit: {
    title:    { en: "Come Visit Us", zh: "歡迎光臨" },
    address:  "774 Commercial Street\nSan Francisco, CA 94108",
    phone:    "(415) 982-5767",
    hoursLabel: { en: "Open 7 Days", zh: "七天營業" },
    hours:    "10:00 AM – 6:00 PM",
    wr:       { en: "Wholesale & Retail", zh: "批發零售" },
    ship:     { en: "Shipping Available · Inspected & Passed S.F.H.D.", zh: "可郵寄 · 衛生局員查驗批准" },
    direction:{ en: "Get Directions", zh: "查看地圖" },
  },
  footer: {
    tagline: { en: "Traditional Chinese cured meats since 1856",
               zh: "傳統中式腊味，自一八五六年" },
    seal:    { en: "App. Estab. 53 · S.F.H.D. CA 94108", zh: "美國加省 · 三藩市衛生局批准" },
  },
};

export const CATEGORIES = [
  {
    id: "sausage", zh: "腸類", en: "Sausages",
    items: [
      { id:"s1", zh:"豬肉腸",      en:"Pork Sausage",        unit:"lb", price:13.50, note:{en:"The house standard. Sweet, smoky, marbled.", zh:"本號招牌。甜香微煙，肥瘦相間。"} },
      { id:"s2", zh:"瘦豬肉腸",    en:"Lean Pork Sausage",   unit:"lb", price:18.00, note:{en:"All lean. No visible fat.",                  zh:"全瘦肉，不見肥膏。"} },
      { id:"s3", zh:"鴨肝腸",      en:"Duck Liver Sausage",  unit:"lb", price:14.50, note:{en:"Pork sausage threaded with duck liver.",     zh:"豬肉腸內鑲鴨肝，風味獨特。"} },
    ],
  },
  {
    id: "pork", zh: "豬肉", en: "Pork",
    items: [
      { id:"p1", zh:"腊肉",        en:"Pork Belly",          unit:"lb", price:14.50, note:{en:"Belly cut. Marinated, hung, oven-dried.",    zh:"五花腩，醃製、懸掛、慢焙。"} },
      { id:"p2", zh:"只瘦腊肉",    en:"Lean Cured Pork",     unit:"lb", price:18.00, note:{en:"Lean cut, no fat.",                          zh:"全瘦肉，無肥膏。"} },
    ],
  },
  {
    id: "duck", zh: "鴨類 · 禽類", en: "Duck & Poultry",
    items: [
      { id:"d01", zh:"雞腿",       en:"Chicken Leg",         unit:"ea", price:12.50 },
      { id:"d02", zh:"繩鴨腿",     en:"Duck Leg (String)",   unit:"ea", price:15.00 },
      { id:"d03", zh:"鹽鴨腿",     en:"Salt Duck Leg",       unit:"lb", price:35.00 },
      { id:"d04", zh:"醬油鴨腿",   en:"Soy Duck Leg",        unit:"lb", price:35.00 },
      { id:"d05", zh:"腊鴨",       en:"Whole Cured Duck",    unit:"ea", price:42.00, note:{en:"Whole bird. Pressed flat, dried 5–7 days.", zh:"整鴨拍扁，烘焙五至七日。"} },
      { id:"d06", zh:"腊鴨餅",     en:"Duck Cookie",         unit:"lb", price:28.00 },
      { id:"d07", zh:"腊鴨胸",     en:"Duck Breast",         unit:"lb", price:35.00 },
      { id:"d08", zh:"腊鴨腎",     en:"Duck Gizzard",        unit:"lb", price:35.00 },
      { id:"d09", zh:"鴨肝",       en:"Duck Liver",          unit:"lb", price:39.00 },
      { id:"d10", zh:"鴨舌",       en:"Duck Tongue",         unit:"ea", price:0.50 },
      { id:"d11", zh:"鴨頸",       en:"Duck Neck",           unit:"ea", price:3.00 },
      { id:"d12", zh:"鴨尾",       en:"Duck Tail",           unit:"ea", price:0.50 },
      { id:"d13", zh:"鴨腳/翅",    en:"Duck Feet / Wing",    unit:"ea", price:0.20 },
      { id:"d14", zh:"鵪鶉",       en:"Quail",               unit:"ea", price:4.00 },
    ],
  },
  {
    id: "dry", zh: "乾貨", en: "Dried Goods",
    items: [
      { id:"g1", zh:"蝦米",        en:"Dried Shrimp",        unit:"lb", price:35.00 },
      { id:"g2", zh:"鹹魚",        en:"Dried Salted Fish",   unit:"lb", price:29.00 },
    ],
  },
];

export const FEATURED = ["s1", "p1", "d05", "s3", "d15", "g1"];

export const PALETTES = {
  pink: {
    "--paper": "#f4c5d8", "--paper-2": "#e89cb9",
    "--ink": "#b71b56", "--ink-2": "#7a1338",
    "--cream": "#f5ead0", "--oxblood": "#5e1620", "--gold": "#b8893b",
    "--line": "rgba(122,19,56,0.35)", "--line-2": "rgba(122,19,56,0.15)",
  },
  cream: {
    "--paper": "#f3e9cf", "--paper-2": "#e6d4a4",
    "--ink": "#a01e1e", "--ink-2": "#5e1620",
    "--cream": "#fbf3da", "--oxblood": "#3a0f15", "--gold": "#a07a30",
    "--line": "rgba(94,22,32,0.4)", "--line-2": "rgba(94,22,32,0.18)",
  },
  oxblood: {
    "--paper": "#1c0a0e", "--paper-2": "#2a0e15",
    "--ink": "#e89cb9", "--ink-2": "#f4c5d8",
    "--cream": "#f5ead0", "--oxblood": "#0d0608", "--gold": "#c8a84b",
    "--line": "rgba(244,197,216,0.3)", "--line-2": "rgba(244,197,216,0.15)",
  },
};
