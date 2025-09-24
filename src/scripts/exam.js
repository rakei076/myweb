(function(){
  // ------- 语料生成（内置，难度占比：简60%/中30%/难10%） -------
  const SIMPLE = ['我们','你们','他们','今天','学习','提高','速度','练习','方法','电脑','手机','网络','信息','中心','学校','学生','朋友','家庭','时间','计划','目标','成功','努力','坚持','简单','清晰','准确','快速','安全','健康'];
  const MEDIUM = ['效率','专注','节奏','逻辑','数据','分析','系统','功能','体验','优化','质量','稳定','反馈','策略','内容','流程','接口','结构','布局','语法','段落','全文','素材','新闻','更新','平台','浏览','优化','趋势','能力'];
  const HARD = ['协同','兼容','可视化','标准化','可维护','可扩展','鲁棒性','一致性','可用性','可达性','参数化','序列化','模块化','工程化','自动化'];

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function makeSentence(){
    const total = 12 + Math.floor(Math.random()*8); // 12-19 词
    const parts = [];
    for(let i=0;i<total;i++){
      const r = Math.random();
      if(r<0.6) parts.push(pick(SIMPLE));
      else if(r<0.9) parts.push(pick(MEDIUM));
      else parts.push(pick(HARD));
    }
    const punct = ['。','，','、','；'];
    const text = parts.join('');
    return text.slice(0,Math.max(10,Math.min(50,text.length))) + pick(punct);
  }
  function generateCorpus(charsNeeded){
    let out = '';
    while(out.length < charsNeeded){ out += makeSentence(); }
    return out;
  }

  // ------- 状态与元素 -------
  const $ = id=> document.getElementById(id);
  const durationEl = $('duration');
  const startBtn = $('startBtn');
  const resetBtn = $('resetBtn');
  const inputEl = $('typingInput');
  const textBlock = $('textBlock');
  const progressBar = $('progressBar');
  const stat = { wpm:$('statWpm'), acc:$('statAcc'), keys:$('statKeys'), time:$('statTime') };
  const resultCard = $('resultCard');

  let target = '';
  let cursor = 0;
  let errors = 0;
  let keyCount = 0;
  let startedAt = 0;
  let timer = null;
  let totalSeconds = 60;

  function renderText(){
    const done = target.slice(0,cursor);
    const current = target[cursor]||'';
    const rest = target.slice(cursor+1);
    textBlock.innerHTML = `<span class="done">${escapeHtml(done)}</span>`+
      `<span class="current">${escapeHtml(current)}</span>`+
      `${escapeHtml(rest)}`;
  }
  function escapeHtml(s){ return s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }

  function start(){
    totalSeconds = parseInt(durationEl.value,10) || 60;
    target = generateCorpus(totalSeconds*6*5); // 估算每秒6击、5字符/词
    cursor = 0; errors = 0; keyCount = 0; startedAt = Date.now();
    inputEl.disabled = false; inputEl.value=''; inputEl.focus();
    startBtn.disabled = true; resetBtn.disabled = false; resultCard.style.display='none';
    tick();
    timer = setInterval(tick,250);
    renderText();
  }
  function reset(){
    clearInterval(timer); timer=null;
    startBtn.disabled=false; resetBtn.disabled=true; inputEl.disabled=true; inputEl.value='';
    progressBar.style.width='0%';
    stat.wpm.textContent='0'; stat.acc.textContent='100%'; stat.keys.textContent='0'; stat.time.textContent='0s';
    textBlock.innerHTML='';
  }
  function stop(){
    if(timer){ clearInterval(timer); timer=null; }
    inputEl.disabled = true;
    const {wpm,acc} = computeStats();
    const grade = gradeBy(wpm,acc);
    saveHistory({mode:'exam', duration: totalSeconds, wpm, accuracy: Math.round(acc), keys:keyCount, grade});
    resultCard.style.display='block';
    resultCard.innerHTML = `<h2>成绩</h2><p>WPM：<b>${wpm}</b> · 准确率：<b>${Math.round(acc)}%</b> · 评级：<b>${grade}</b></p>`;
  }
  function tick(){
    const elapsed = Math.floor((Date.now()-startedAt)/1000);
    const left = Math.max(0, totalSeconds - elapsed);
    const pct = Math.min(100, (elapsed/totalSeconds)*100);
    progressBar.style.width = pct + '%';
    stat.time.textContent = left + 's';
    const {wpm,acc} = computeStats();
    stat.wpm.textContent = String(wpm);
    stat.acc.textContent = Math.round(acc) + '%';
    stat.keys.textContent = String(keyCount);
    if(left<=0){ stop(); }
  }
  function computeStats(){
    const elapsedMin = Math.max(1/60, (Date.now()-startedAt)/60000);
    const wordsTyped = Math.max(0, cursor/5);
    const wpm = Math.round(wordsTyped/elapsedMin);
    const total = Math.max(1, cursor+errors);
    const acc = (cursor/total)*100;
    return {wpm, acc};
  }
  function gradeBy(wpm, acc){
    if(acc>=98 && wpm>=80) return 'A+';
    if(acc>=96 && wpm>=65) return 'A';
    if(acc>=94 && wpm>=50) return 'B';
    if(acc>=90 && wpm>=35) return 'C';
    return 'D';
  }
  function saveHistory(rec){
    try{
      const list = JSON.parse(localStorage.getItem('smarttype_history')||'[]');
      list.push({date:new Date().toISOString(), ...rec});
      localStorage.setItem('smarttype_history', JSON.stringify(list));
    }catch{}
  }

  inputEl.addEventListener('input',()=>{
    const val = inputEl.value;
    if(!target) return;
    const expected = target[cursor]||'';
    const got = val.slice(-1);
    if(!got) return;
    keyCount++;
    if(got === expected){
      cursor++; renderText();
    }else{
      errors++;
      // 瞬时错误高亮
      textBlock.querySelector('.current')?.classList.add('error');
      setTimeout(()=>{ textBlock.querySelector('.current')?.classList.remove('error'); },120);
    }
    inputEl.value='';
  });

  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', reset);
  document.addEventListener('DOMContentLoaded',()=>{ const y=document.getElementById('year'); if(y) y.textContent=String(new Date().getFullYear()); });
})();