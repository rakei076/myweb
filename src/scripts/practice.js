(function(){
  const $ = id=> document.getElementById(id);
  const categoryEl = $('category');
  const durationEl = $('duration');
  const startBtn = $('startBtn');
  const inputEl = $('typingInput');
  const textBlock = $('textBlock');
  const stat = { wpm:$('statWpm'), acc:$('statAcc'), keys:$('statKeys') };

  // 占位新闻数据（后续可替换为每日静态生成或服务端API）
  const NEWS = {
    headline: [
      '各地加快推进新型基础设施建设，数据要素释放新动能。',
      '公共服务数字化水平提升，民生获得感显著增强。',
      '绿色低碳转型稳步推进，产业结构持续优化升级。'
    ],
    tech: [
      '国内团队发布新一代人工智能模型，推理效率显著提升。',
      '芯片工艺迭代带动算力升级，终端应用体验更流畅。',
      '开源生态繁荣发展，开发者协同创新加速成果落地。'
    ],
    society: [
      '城市更新改善出行环境，公共交通便捷度持续上升。',
      '社区服务网格化管理提升效率，居民参与度不断提高。',
      '全民健身设施完善，科学运动理念深入人心。'
    ]
  };

  function sanitize(text){
    return text
      .replace(/https?:\/\/\S+/g,'')
      .replace(/[#_*`~<>\[\]\(\)]/g,'')
      .trim();
  }
  function limitSentence(text){
    const t = sanitize(text);
    if(t.length<=50 && t.length>=10) return t;
    const slice = t.slice(0,50);
    return slice.replace(/[，。；、,.!]?$/,'') + '。';
  }
  function filterSensitive(text){
    // 预留敏感词过滤，可接入词表
    return text;
  }

  let target = '';
  let cursor = 0;
  let errors = 0;
  let keyCount = 0;
  let startedAt = 0;

  function buildCorpus(){
    const cat = categoryEl.value || 'headline';
    const items = (NEWS[cat]||[]).map(limitSentence).map(filterSensitive);
    // 拼接 6 段，足够几分钟练习
    return Array(6).fill(0).map(()=> items[Math.floor(Math.random()*items.length)]).join('\n');
  }

  function render(){
    const done = target.slice(0,cursor);
    const current = target[cursor]||'';
    const rest = target.slice(cursor+1);
    textBlock.innerHTML = `<span class="done">${escapeHtml(done)}</span>`+
      `<span class="current">${escapeHtml(current)}</span>`+
      `${escapeHtml(rest)}`;
  }
  function escapeHtml(s){ return s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }

  function start(){
    target = buildCorpus();
    cursor=0; errors=0; keyCount=0; startedAt=Date.now();
    inputEl.disabled=false; inputEl.value=''; inputEl.focus();
    render();
  }

  function compute(){
    const elapsedMin = Math.max(1/60, (Date.now()-startedAt)/60000);
    const wordsTyped = Math.max(0, cursor/5);
    const wpm = Math.round(wordsTyped/elapsedMin);
    const total = Math.max(1, cursor+errors);
    const acc = (cursor/total)*100;
    return {wpm,acc};
  }

  inputEl.addEventListener('input',()=>{
    const val = inputEl.value; if(!target) return; const got = val.slice(-1); if(!got) return;
    const expected = target[cursor]||''; keyCount++;
    if(got === expected){ cursor++; render(); }
    else{ errors++; textBlock.querySelector('.current')?.classList.add('error'); setTimeout(()=>{ textBlock.querySelector('.current')?.classList.remove('error'); },120); }
    inputEl.value='';
    const {wpm,acc} = compute();
    stat.wpm.textContent = String(wpm);
    stat.acc.textContent = Math.round(acc) + '%';
    stat.keys.textContent = String(keyCount);
  });

  startBtn.addEventListener('click', start);
  document.addEventListener('DOMContentLoaded',()=>{ const y=document.getElementById('year'); if(y) y.textContent=String(new Date().getFullYear()); });
})();