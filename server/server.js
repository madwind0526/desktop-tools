const express = require('express');
const fetch = require('node-fetch');
const KoreanLunarCalendar = require('korean-lunar-calendar');

const app = express();
const PORT = 3001;
const lunarCal = new KoreanLunarCalendar();

const CURRENCIES = [
  { code: 'KRW', name: '대한민국 원',        flag: '🇰🇷' },
  { code: 'USD', name: '미국 달러',           flag: '🇺🇸' },
  { code: 'EUR', name: '유럽 유로',           flag: '🇪🇺' },
  { code: 'JPY', name: '일본 엔',             flag: '🇯🇵' },
  { code: 'GBP', name: '영국 파운드',         flag: '🇬🇧' },
  { code: 'CNY', name: '중국 위안',           flag: '🇨🇳' },
  { code: 'HKD', name: '홍콩 달러',           flag: '🇭🇰' },
  { code: 'AUD', name: '호주 달러',           flag: '🇦🇺' },
  { code: 'CAD', name: '캐나다 달러',         flag: '🇨🇦' },
  { code: 'CHF', name: '스위스 프랑',         flag: '🇨🇭' },
  { code: 'SGD', name: '싱가포르 달러',       flag: '🇸🇬' },
  { code: 'NZD', name: '뉴질랜드 달러',       flag: '🇳🇿' },
  { code: 'THB', name: '태국 바트',           flag: '🇹🇭' },
  { code: 'PHP', name: '필리핀 페소',         flag: '🇵🇭' },
  { code: 'MYR', name: '말레이시아 링깃',     flag: '🇲🇾' },
  { code: 'IDR', name: '인도네시아 루피아',   flag: '🇮🇩' },
  { code: 'INR', name: '인도 루피',           flag: '🇮🇳' },
  { code: 'VND', name: '베트남 동',           flag: '🇻🇳' },
  { code: 'SAR', name: '사우디 리얄',         flag: '🇸🇦' },
  { code: 'AED', name: '아랍에미리트 디르함', flag: '🇦🇪' },
  { code: 'SEK', name: '스웨덴 크로나',       flag: '🇸🇪' },
  { code: 'NOK', name: '노르웨이 크로네',     flag: '🇳🇴' },
  { code: 'MXN', name: '멕시코 페소',         flag: '🇲🇽' },
];

let ratesCache = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

async function getAllRates() {
  if (ratesCache && Date.now() - cacheTime < CACHE_DURATION) return ratesCache;

  const res = await fetch('https://open.er-api.com/v6/latest/USD');
  const data = await res.json();
  if (data.result !== 'success') throw new Error('환율 API 오류');

  const usdRates = data.rates;
  const krwPerUsd = usdRates['KRW'];
  const rates = {};
  for (const c of CURRENCIES) {
    if (usdRates[c.code]) rates[c.code] = krwPerUsd / usdRates[c.code];
  }

  const updated = new Date(data.time_last_update_utc).toLocaleString('ko-KR');
  ratesCache = { rates, updated, currencies: CURRENCIES };
  cacheTime = Date.now();
  return ratesCache;
}

app.get('/api/rates', async (req, res) => {
  try {
    res.json(await getAllRates());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── 음력 변환 API ──
app.get('/api/lunar/to-lunar', (req, res) => {
  try {
    const { year, month, day } = req.query;
    lunarCal.setSolarDate(+year, +month, +day);
    res.json(lunarCal.getLunarCalendar());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/api/lunar/to-solar', (req, res) => {
  try {
    const { year, month, day, leap } = req.query;
    lunarCal.setLunarDate(+year, +month, +day, leap === 'true');
    res.json(lunarCal.getSolarCalendar());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`API server: http://localhost:${PORT}`));
