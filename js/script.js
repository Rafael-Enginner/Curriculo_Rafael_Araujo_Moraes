(function(){
  var root=document.documentElement, body=document.body, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  try{var s=localStorage.getItem('theme'); if(s) root.setAttribute('data-theme',s);}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);
    var next=dark?'light':'dark'; root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next);}catch(e){}
  });
  document.getElementById('print').addEventListener('click',function(){try{window.print();}catch(e){}});
  var cp=document.getElementById('copy');
  cp.addEventListener('click',function(){
    function ok(){cp.textContent='E-mail copiado';setTimeout(function(){cp.textContent='Copiar e-mail';},2000);}
    try{navigator.clipboard.writeText('rafael_tj@outlook.com').then(ok,function(){cp.textContent='rafael_tj@outlook.com';});}catch(e){cp.textContent='rafael_tj@outlook.com';}
  });

  var chips=[].slice.call(document.querySelectorAll('.chip[data-tag]')), items=[].slice.call(document.querySelectorAll('#exp li, .edu div')),
      status=document.getElementById('status'), focusEl=document.getElementById('focus'), seg=[].slice.call(document.querySelectorAll('#seg button'));
  var BASE=focusEl.textContent;
  var P={
    geral:{n:'Visão geral',t:[],x:BASE},
    adm:{n:'Administrativo',t:['documentacao','comunicacao','sistemas','excel'],x:'Foco administrativo: organização documental, contato com fornecedores e operadoras, rotinas rastreáveis e uso de sistemas e Office no dia a dia.'},
    fin:{n:'Financeiro',t:['financeiro','compliance','dados'],x:'Foco financeiro: pagamentos, faturamento, contas a receber, inadimplência e acompanhamento contratual em empresas de grande porte.'},
    proc:{n:'Processos',t:['processos','melhoria','documentacao'],x:'Foco em processos: POPs, fluxogramas, indicadores e melhoria contínua de rotinas operacionais.'}
  };
  chips.forEach(function(c){
    c.dataset.label=c.textContent;
    var n=items.filter(function(li){return li.dataset.tags.split(' ').indexOf(c.dataset.tag)>-1;}).length;
    c.insertAdjacentHTML('beforeend','<span class="n">'+n+'</span>');
  });
  function apply(tags,label,text){
    links(tags.length?label:'');
    var n=0;
    items.forEach(function(li){var m=li.dataset.tags.split(' ').some(function(t){return tags.indexOf(t)>-1;}); li.classList.toggle('match',m); if(m)n++;});
    chips.forEach(function(c){c.setAttribute('aria-pressed',String(tags.indexOf(c.dataset.tag)>-1));});
    body.classList.toggle('filtering',tags.length>0);
    focusEl.textContent=text||BASE;
    status.textContent=tags.length?n+(n===1?' ponto em destaque':' pontos em destaque')+' para "'+label+'".':'';
    if(tags.length) document.querySelectorAll('#exp details').forEach(function(d){d.open=true;});
  }

  var WA='5561993316047', EM='rafael_tj@outlook.com';
  function links(label){
    var foco=label?' com foco em '+label:'';
    var msg='Olá, Rafael! Vi seu currículo e gostaria de conversar sobre uma oportunidade'+foco+'.';
    var sub='Oportunidade'+(label?' – '+label:'')+' | Contato pelo seu currículo';
    var wa='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
    var ml='mailto:'+EM+'?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(msg+'\n\nMeu nome é ');
    [].forEach.call(document.querySelectorAll('.js-wa'),function(a){a.href=wa;});
    [].forEach.call(document.querySelectorAll('.js-mail'),function(a){a.href=ml;});
  }
  links('');
  function setSeg(k){seg.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.p===k));});}
  seg.forEach(function(b){b.addEventListener('click',function(){var p=P[b.dataset.p]; setSeg(b.dataset.p); apply(p.t,p.n,p.x);});});
  chips.forEach(function(c){c.addEventListener('click',function(){
    var on=c.getAttribute('aria-pressed')==='true'&&body.classList.contains('filtering')&&!seg.some(function(b){return b.getAttribute('aria-pressed')==='true'&&b.dataset.p!=='geral';});
    setSeg(on?'geral':''); apply(on?[]:[c.dataset.tag],c.dataset.label); links('');
  });});
  document.getElementById('clear').addEventListener('click',function(){setSeg('geral');apply([]);});

})();
