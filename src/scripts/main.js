(function(){
  const storage = {
    getHistory(){
      try{ return JSON.parse(localStorage.getItem('smarttype_history')||'[]'); }catch{ return []; }
    }
  };

  function calcTodayStats(){
    const list = storage.getHistory();
    if(list.length===0) return {sessions:0, avgWpm:0, avgAcc:0};
    const todayStr = new Date().toISOString().slice(0,10);
    const today = list.filter(x=> (x.date||'').startsWith(todayStr));
    if(today.length===0) return {sessions:0, avgWpm:0, avgAcc:0};
    const avg = (arr, key)=> Math.round(arr.reduce((s,i)=>s+(i[key]||0),0)/arr.length);
    return {sessions: today.length, avgWpm: avg(today,'wpm'), avgAcc: avg(today,'accuracy')};
  }

  function renderStats(){
    const s = calcTodayStats();
    const $ = id=> document.getElementById(id);
    if($("statSessions")) $("statSessions").textContent = String(s.sessions);
    if($("statAvgWpm")) $("statAvgWpm").textContent = String(s.avgWpm);
    if($("statAvgAcc")) $("statAvgAcc").textContent = String(s.avgAcc)+"%";
  }

  function renderNewsPreview(){
    const el = document.getElementById('newsPreview');
    if(!el) return;
    const items = [
      {title:'科技 | 新一代芯片加速AI应用落地', source:'IT之家', url:'#'},
      {title:'时政 | 数据要素加快释放产业活力', source:'新华社', url:'#'},
      {title:'社会 | 城市绿色出行比例再提升', source:'人民网', url:'#'},
    ];
    el.innerHTML = items.map(x=>`<article class="card"><h3>${x.title}</h3><p style="color:#64748b">来源：${x.source}</p></article>`).join('');
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const y = document.getElementById('year'); if(y) y.textContent = String(new Date().getFullYear());
    renderStats();
    renderNewsPreview();
  });
})();