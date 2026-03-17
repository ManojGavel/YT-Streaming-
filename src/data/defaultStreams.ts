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
  s('Nq2wYlWFucg', 'Aaj Tak', 'New Delhi', 'news'),
  s('10T3CfmgDlc', 'NDTV 24x7', 'New Delhi', 'news'),
  s('Kw2tcW4OmfU', 'Republic Bharat', 'New Delhi', 'news'),
  s('e1FIApIafWE', 'IndiaTV', 'New Delhi', 'news'),
  s('241Qgc9dYWQ', 'News18 India', 'New Delhi', 'news'),
  s('vze6x-3BfPA', 'Times Now', 'New Delhi', 'news'),
  s('iOmtxPLKk8k', 'ABP News', 'New Delhi', 'news'),
  s('UIvQ-xt-vfo', 'Zee News', 'New Delhi', 'news'),
  s('nSpwwcHVp80', 'TV9 Bharatvarsh', 'New Delhi', 'news'),
  s('Io-G_aiF8HA', 'News18 Aar Paar', 'New Delhi', 'news'),
  s('b2CNZHW0tks', 'News18 Debate', 'New Delhi', 'news'),
  s('TxoAYWg64Ao', 'DD News', 'New Delhi', 'news'),
  s('v6c_DOAgIpI', 'WION', 'New Delhi', 'news'),
  s('UNDPXlT1F4I', 'NDTV India', 'New Delhi', 'news'),
  s('xRzSfiYJRQw', 'News24', 'New Delhi', 'news'),
  s('dtDwzu8UEsc', 'Firstpost', 'New Delhi', 'news'),
  s('gCNeDWCI0vo', 'Al Jazeera', 'Doha', 'news'),

  s('QRHv08zLoU4', 'Somnath Temple', 'Gujarat', 'temple'),
  s('41dgX-3yER0', 'Vaishno Devi', 'Katra, J&K', 'temple'),
  s('wWqOz9_nudI', 'Mahakaleshwar', 'Ujjain, MP', 'temple'),
  s('j1q1dE_eGew', 'ISKCON Vrindavan', 'Vrindavan', 'temple'),
  s('SXALgikY3NM', 'Hare Krsna TV', 'Mumbai', 'temple'),
  s('v9yY2GC_a5Y', 'SVBC Tirumala', 'Tirupati', 'temple'),
  s('gxgoTvSzC84', 'Shirdi Sai Baba', 'Shirdi', 'temple'),
  s('yxunyAckFcg', 'Kashi Vishwanath', 'Varanasi', 'temple'),
];

export default defaultStreams;
