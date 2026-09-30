const pages = [...document.querySelectorAll('.page')];
const goButtons = document.querySelectorAll('[data-go]');

function goTo(id){
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  window.scrollTo({top:0, behavior:'smooth'});
}

goButtons.forEach(btn => btn.addEventListener('click', () => goTo(btn.dataset.go)));

const input = document.getElementById('selfieInput');
const preview = document.getElementById('previewImage');
const placeholder = document.getElementById('uploadPlaceholder');
const analyzeBtn = document.getElementById('analyzeBtn');

input?.addEventListener('change', e => {
  const file = e.target.files?.[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.hidden = false;
    placeholder.hidden = true;
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
});

analyzeBtn?.addEventListener('click', () => {
  analyzeBtn.textContent = '分析中...';
  analyzeBtn.disabled = true;
  setTimeout(() => {
    analyzeBtn.textContent = '開始 AI 分析';
    analyzeBtn.disabled = false;
    goTo('analysis');
  }, 900);
});

const styles = [
  {name:'韓系清透', code:'K', desc:'自然透亮 · 柔霧柔和'},
  {name:'日系甜美', code:'J', desc:'粉嫩明亮 · 溫柔可人'},
  {name:'歐美個性', code:'E', desc:'立體深邃 · 氣場強烈'},
  {name:'高級裸妝', code:'N', desc:'低調質感 · 日常百搭'},
  {name:'Clean Girl', code:'C', desc:'乾淨清爽 · 自然光澤'},
  {name:'Date Night', code:'D', desc:'柔和浪漫 · 上鏡有神'}
];

const styleGrid = document.getElementById('styleGrid');
const createLookBtn = document.getElementById('createLookBtn');
let selectedStyle = null;

styles.forEach((s, index) => {
  const btn = document.createElement('button');
  btn.className = 'style-card';
  btn.innerHTML = `<div class="style-art">${s.code}</div><h3>${s.name}</h3><p>${s.desc}</p>`;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    selectedStyle = s;
    createLookBtn.disabled = false;
  });
  styleGrid.appendChild(btn);
});

const recommendationSets = {
  '韓系清透': [
    ['BASE','薄透半光澤底妝','混合性肌膚適合局部控油、兩頰保留自然光澤。'],
    ['EYES','柔和米棕眼影','暖中性膚色與杏仁眼型適合低飽和棕色，乾淨又放大雙眼。'],
    ['BLUSH','蜜桃玫瑰腮紅','提升氣色但不會過度搶眼，能維持清透感。'],
    ['LIPS','柔霧玫瑰唇','低飽和玫瑰色能平衡整體妝感，也很日常。'],
    ['BROW','柔和平眉','柔化臉部線條，讓整體更接近韓系妝容比例。'],
    ['GLOW','局部提亮','在顴骨與鼻樑少量提亮，避免整臉過度油亮。']
  ]
};

createLookBtn?.addEventListener('click', () => {
  const s = selectedStyle || styles[0];
  document.getElementById('lookTitle').textContent = s.name === '韓系清透' ? 'Soft Korean Glow' : `${s.name} Look`;
  document.getElementById('lookBadge').textContent = s.name;
  document.getElementById('lookReason').textContent = `根據你的暖中性膚色、混合性肌膚與杏仁眼型，我們將「${s.name}」調整成更適合你的版本。`;
  const items = recommendationSets[s.name] || [
    ['BASE','輕薄底妝','保持自然膚質，讓妝容更貼合你的混合性肌膚。'],
    ['EYES','柔和眼妝','依照杏仁眼型調整暈染範圍，讓眼神更有精神。'],
    ['BLUSH','自然腮紅','使用與暖中性膚色協調的色系，提升氣色。'],
    ['LIPS','低飽和唇色','避免過度搶眼，讓妝感保持平衡。'],
    ['BROW','自然眉型','順著原生眉型修飾，提升整體完成度。'],
    ['GLOW','局部提亮','將高光放在需要的位置，營造自然立體感。']
  ];
  const grid = document.getElementById('recommendGrid');
  grid.innerHTML = items.map(i => `<article class="recommend-item"><span>${i[0]}</span><h3>${i[1]}</h3><p>${i[2]}</p></article>`).join('');
  goTo('recommendation');
});

const tutorial = [
  ['BASE','BASE MAKEUP','薄透底妝','從臉部中央向外薄薄推開粉底，T 字部位少量疊加即可。','Recommended: Lightweight Foundation'],
  ['BROW','EYEBROWS','柔和平眉','眉峰不要太高，沿著原生眉型填補空隙，尾端稍微拉長。','Recommended: Soft Brown Brow Pencil'],
  ['EYES','EYESHADOW','米棕眼影','用淺米色打底，棕色集中在眼尾 1/3，暈染邊界保持柔和。','Recommended: Beige Brown Palette'],
  ['LINE','EYELINER','自然眼線','沿著睫毛根部畫細眼線，眼尾只延伸 2–3 mm。','Recommended: Brown Liquid Liner'],
  ['BLUSH','BLUSH','蜜桃腮紅','從顴骨上方往太陽穴方向輕掃，位置稍高能更顯精神。','Recommended: Peach Rose Blush'],
  ['LIPS','LIPS','玫瑰唇','先薄塗整唇，再把顏色集中在唇中央，做出自然漸層。','Recommended: Soft Rose Tint']
];
let tutorialIndex = 0;
function renderTutorial(){
  const t = tutorial[tutorialIndex];
  document.getElementById('tutorialStepLabel').textContent = `Step ${tutorialIndex+1} / ${tutorial.length}`;
  document.getElementById('tutorialProgress').style.width = `${((tutorialIndex+1)/tutorial.length)*100}%`;
  document.getElementById('tutorialVisual').textContent = t[0];
  document.getElementById('tutorialCategory').textContent = t[1];
  document.getElementById('tutorialTitle').textContent = t[2];
  document.getElementById('tutorialText').textContent = t[3];
  document.getElementById('tutorialProduct').textContent = t[4];
  document.getElementById('prevTutorial').disabled = tutorialIndex === 0;
  document.getElementById('nextTutorial').textContent = tutorialIndex === tutorial.length - 1 ? '完成並進入出片指導' : '下一步';
}
renderTutorial();

document.getElementById('prevTutorial')?.addEventListener('click', () => { if(tutorialIndex>0){tutorialIndex--;renderTutorial();} });
document.getElementById('nextTutorial')?.addEventListener('click', () => {
  if(tutorialIndex < tutorial.length-1){tutorialIndex++;renderTutorial();}
  else{goTo('shoot');}
});
