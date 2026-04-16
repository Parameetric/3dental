// 3Dental – main.js

// ===== NAV =====
(function(){
  const nav = document.querySelector('.navbar');
  if(!nav) return;
  function update(){
    if(window.scrollY > 60){ nav.classList.add('solid'); }
    else { nav.classList.remove('solid'); }
  }
  update();
  window.addEventListener('scroll', update, {passive:true});
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if(ham && links){
    ham.addEventListener('click', ()=> links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> links.classList.remove('open')));
  }
})();

// ===== POPUP =====
(function(){
  const popup = document.getElementById('popup');
  if(!popup) return;
  function show(){ popup.classList.add('show'); }
  function hide(){ popup.classList.remove('show'); }
  setTimeout(show, 2500);
  setInterval(show, 60000);
  document.querySelectorAll('.popup-x, .popup-skip').forEach(el => el.addEventListener('click', hide));
  popup.addEventListener('click', e => { if(e.target === popup) hide(); });
})();

// ===== REVEAL ON SCROLL =====
(function(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// ===== SERVICES SLIDER =====
(function(){
  const track = document.getElementById('servicesTrack');
  const prevBtn = document.getElementById('svcPrev');
  const nextBtn = document.getElementById('svcNext');
  if(!track) return;
  const cards = Array.from(track.querySelectorAll('.service-card'));
  let cur = 0;
  const GAP = 24;

  function getVisible(){
    if(window.innerWidth > 1024) return 3;
    if(window.innerWidth > 640) return 2;
    return 1;
  }
  function update(){
    const vis = getVisible();
    const max = Math.max(0, cards.length - vis);
    cur = Math.min(cur, max);
    const wrap = track.parentElement;
    const cardW = (wrap.offsetWidth - GAP*(vis-1)) / vis;
    cards.forEach(c => c.style.flex = `0 0 ${cardW}px`);
    track.style.transform = `translateX(-${cur*(cardW+GAP)}px)`;
    if(prevBtn) prevBtn.style.opacity = cur===0 ? '0.35' : '1';
    if(nextBtn) nextBtn.style.opacity = cur>=max ? '0.35' : '1';
  }
  if(prevBtn) prevBtn.addEventListener('click', ()=>{ if(cur>0){cur--;update();} });
  if(nextBtn) nextBtn.addEventListener('click', ()=>{ const m=Math.max(0,cards.length-getVisible()); if(cur<m){cur++;update();} });
  update();
  window.addEventListener('resize', update);
})();

// ===== FAQ =====
(function(){
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if(!open) item.classList.add('open');
    });
  });
})();

// ===== CONTACT FORM =====
(function(){
  const submitBtn = document.getElementById('formSubmit');
  const formWrap = document.getElementById('formInner');
  const formSuccess = document.getElementById('formSuccess');
  if(!submitBtn) return;
  submitBtn.addEventListener('click', ()=>{
    const nombre = (document.getElementById('nombre')||{}).value?.trim();
    const whatsapp = (document.getElementById('whatsapp')||{}).value?.trim();
    if(!nombre||!whatsapp){ alert('Por favor completa nombre y WhatsApp.'); return; }
    const servicio = (document.getElementById('servicio')||{}).value || 'Por definir';
    const fecha = (document.getElementById('fecha')||{}).value || 'Flexible';
    const msg = (document.getElementById('mensaje')||{}).value || '';
    const waText = encodeURIComponent(`Hola 3Dental! 👋 Quiero agendar una cita.\n\n👤 Nombre: ${nombre}\n📱 WhatsApp: ${whatsapp}\n🦷 Servicio: ${servicio}\n📅 Fecha preferida: ${fecha}\n💬 ${msg}`);
    window.open(`https://wa.me/573128917294?text=${waText}`, '_blank');
    if(formWrap && formSuccess){ formWrap.style.display='none'; formSuccess.style.display='block'; }
  });
})();

// ===== NEWSLETTER =====
(function(){
  const btn = document.getElementById('nlBtn');
  const inp = document.getElementById('nlEmail');
  if(!btn||!inp) return;
  btn.addEventListener('click', ()=>{
    if(!inp.value||!inp.value.includes('@')){ alert('Por favor ingresa un correo válido.'); return; }
    alert('¡Gracias! Pronto recibirás consejos de salud dental. 🦷');
    inp.value='';
  });
})();

// ===== COUNTER ANIMATION =====
(function(){
  const counters = document.querySelectorAll('[data-count]');
  if(!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now-start)/duration, 1);
        const ease = 1 - Math.pow(1-p, 3);
        el.textContent = prefix + Math.floor(ease*target) + suffix;
        if(p<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, {threshold:0.5});
  counters.forEach(c => obs.observe(c));
})();
