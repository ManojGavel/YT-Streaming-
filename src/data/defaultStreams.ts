export interface StreamData {
  id: string;
  videoId: string;
  label: string;
  location: string;
  category: 'news' | 'temple' | 'music';
}

let _c = 0;
const s = (videoId: string, label: string, location: string, category: StreamData['category']): StreamData => ({
  id: `s-${++_c}`,
  videoId,
  label,
  location,
  category,
});

const defaultStreams: StreamData[] = [
  // News
  s('X6U_ufG4bDk', 'Aaj Tak', 'New Delhi', 'news'),
  s('eJGJ0rtOK_U', 'NDTV 24x7', 'New Delhi', 'news'),
  s('lq6F5S0v68o', 'Republic Bharat', 'New Delhi', 'news'),
  s('H9bLaloxvc8', 'IndiaTV', 'New Delhi', 'news'),
  s('241Qgc9dYWQ', 'News18 India', 'New Delhi', 'news'),
  s('ANrZ4S-SzdI', 'Times Now', 'New Delhi', 'news'),
  s('PGHraXz3Ok8', 'ABP News', 'New Delhi', 'news'),
  s('WquRAK-XoV4', 'Zee News', 'New Delhi', 'news'),
  s('nSpwwcHVp80', 'TV9 Bharatvarsh', 'New Delhi', 'news'),
  s('Io-G_aiF8HA', 'News18 Aar Paar', 'New Delhi', 'news'),
  s('b2CNZHW0tks', 'News18 Debate', 'New Delhi', 'news'),
  s('UkdPITIsSsY', 'Zee News Top', 'New Delhi', 'news'),
  s('B2Z7zgNPN1w', 'TV9 Updates', 'New Delhi', 'news'),

  // Temple / Spiritual
  s('7e49g5QwBe4', 'Somnath Temple', 'Gujarat', 'temple'),
  s('41dgX-3yER0', 'Vaishno Devi', 'Katra, J&K', 'temple'),
  s('59MySSkC_to', 'Mahakaleshwar', 'Ujjain, MP', 'temple'),
  s('nfuxz-Jki7w', 'ISKCON Bangalore', 'Bangalore', 'temple'),
  s('SXALgikY3NM', 'Hare Krsna TV', 'Mumbai', 'temple'),
  s('iAWLlP76OPw', 'Swaminarayan Live', 'Surat', 'temple'),
  s('HATWLjmnih8', 'Swaminarayan Bavla', 'Gujarat', 'temple'),
];

export default defaultStreams;
