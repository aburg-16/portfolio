let CONTENT = null;
let currentGallery = [];
let currentImageIndex = 0;

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const esc = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

async function loadContent(){
  const res = await fetch('content.json', {cache:'no-store'});
  if(!res.ok) throw new Error(`Could not load content.json (${res.status})`);
  return res.json();
}

function nav(page){
  const s=CONTENT.site;
  return `<nav><div class="container nav-inner">
    <a class="brand" href="index.html">${esc(s.brandFirst)} <span>${esc(s.brandLast)}</span></a>
    <div class="nav-links">${s.navigation.map(n=>`<a class="${n.page===page?'active':''}" href="${esc(n.href)}">${esc(n.label)}</a>`).join('')}</div>
  </div></nav>`;
}
function footer(){
  return `<footer><div class="container footer-inner"><span>${esc(CONTENT.site.footerLeft)}</span><span>${esc(CONTENT.site.footerRight)}</span></div></footer>`;
}
function resolveLink(b){ return b.href || CONTENT.site.links[b.linkKey] || '#'; }
function buttons(items, centered=false){
  return `<div class="cta-row"${centered?' style="justify-content:center"':''}>${items.map(b=>`<a class="btn ${b.style==='primary'?'primary':''}" href="${esc(resolveLink(b))}"${resolveLink(b).startsWith('http')||resolveLink(b).endsWith('.pdf')?' target="_blank"':''}>${esc(b.label)}</a>`).join('')}</div>`;
}
function projectCard(id){
  const p=CONTENT.projects[id]; if(!p) return '';
  const img=(p.images&&p.images[0])||'';
  return `<button class="project-card" data-project="${esc(id)}" aria-label="Open ${esc(p.title)}">
    <img class="card-image" src="${esc(img)}" alt="${esc(p.title)}">
    <div class="card-image-fallback" style="display:none">Add image:<br>${esc(img)}</div>
    <div class="card-title-band"><div class="project-org">${esc(p.org)}</div><h3>${esc(p.title)}</h3></div>
  </button>`;
}
function projectGrid(ids){ return `<div class="project-grid">${ids.map(projectCard).join('')}</div>`; }
function sectionHead(kicker,title){return `<div class="section-head"><div><div class="section-kicker">${esc(kicker)}</div><h2 class="section-title">${esc(title)}</h2></div></div>`;}

function carousel(id, title, items, kind){
  const cardClass = kind === 'skills' ? 'skill-group' : kind === 'certifications' ? 'cert-card' : 'award-card';
  const cards = items.map(x => `<article class="${cardClass} carousel-card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('');
  return `<div class="carousel-section"><div class="carousel-heading-row"><h3 class="split-heading">${esc(title)}</h3><div class="carousel-controls"><button class="carousel-btn" type="button" data-carousel-prev="${esc(id)}" aria-label="Scroll ${esc(title)} left">←</button><button class="carousel-btn" type="button" data-carousel-next="${esc(id)}" aria-label="Scroll ${esc(title)} right">→</button></div></div><div class="content-carousel" id="${esc(id)}" tabindex="0">${cards}</div></div>`;
}

function renderHome(){
  const h=CONTENT.home;
  return `${nav('home')}
  <header class="hero"><div class="container hero-grid"><div>
    <div class="eyebrow">${esc(h.hero.eyebrow)}</div><h1>${esc(h.hero.name)}</h1><h2>${esc(h.hero.headline)}</h2><p>${esc(h.hero.intro)}</p>${buttons(h.hero.buttons)}
  </div><div class="portrait-frame">
    <img src="${esc(h.hero.portrait)}" alt="${esc(h.hero.portraitAlt)}">
    <div class="image-fallback"><div><strong>Portrait photo</strong><br>Upload:<br><code>${esc(h.hero.portrait)}</code></div></div>
    <div class="portrait-label">${esc(h.hero.portraitLabel)}</div>
  </div></div></header>
  <main>
    <section id="about"><div class="container">${sectionHead(h.about.kicker,h.about.title)}<div class="about-grid">${h.about.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div></div></section>
    <section id="stay-tuned"><div class="container">${sectionHead(h.active.kicker,h.active.title)}${h.active.text?`<p class="section-intro">${esc(h.active.text)}</p>`:''}${projectGrid(h.active.projectIds)}</div></section>
    <section id="featured"><div class="container">${sectionHead(h.featured.kicker,h.featured.title)}${projectGrid(h.featured.projectIds)}</div></section>
    <section id="skills"><div class="container">${sectionHead(h.skills.kicker,h.skills.title)}
      ${carousel('skills-carousel', 'Skills', h.skills.groups, 'skills')}
      ${carousel('certifications-carousel', h.certifications.title, h.certifications.items, 'certifications')}
      ${carousel('awards-carousel', h.awards.title, h.awards.items, 'awards')}
    </div></section>
    <section><div class="container">${sectionHead(h.library.kicker,h.library.title)}<div class="category-grid">${h.library.categories.map(c=>`<a class="category-card" href="${esc(c.href)}"><div class="eyebrow">${esc(c.eyebrow)}</div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><div class="arrow">Explore →</div></a>`).join('')}</div></div></section>
    <section><div class="container"><div class="contact-box"><div class="section-kicker">${esc(h.contact.kicker)}</div><h2>${esc(h.contact.title)}</h2><p class="motto-note">${esc(h.contact.mottoNote)}</p><p>${esc(h.contact.text)}</p>${buttons(h.contact.buttons,true)}</div></div></section>
  </main>${footer()}`;
}

function renderProjectPage(page){
  const p=CONTENT.pages[page];
  return `${nav(page)}<header class="page-hero"><div class="container"><div class="eyebrow">${esc(p.eyebrow)}</div><h1>${esc(p.title)}</h1><p>${esc(p.intro)}</p></div></header>
  <main><section><div class="container">${p.note?`<div class="note-box">${esc(p.note)}</div>`:''}${p.groups.map(g=>`<div class="org-section"><h2 class="org-title">${esc(g.title)}</h2>${projectGrid(g.projectIds)}</div>`).join('')}</div></section></main>${footer()}`;
}

function renderHobbies(){
  const p=CONTENT.pages.hobbies;
  return `${nav('hobbies')}<header class="page-hero"><div class="container"><div class="eyebrow">${esc(p.eyebrow)}</div><h1>${esc(p.title)}</h1><p>${esc(p.intro)}</p></div></header>
  <main><section><div class="container">${p.note?`<div class="note-box">${esc(p.note)}</div>`:''}<div class="hobby-grid">${p.hobbies.map(h=>`<article class="hobby-card"><div class="hobby-image"><img src="${esc(h.image)}" alt="${esc(h.title)}"><div class="card-image-fallback" style="display:none">Add image:<br>${esc(h.image)}</div></div><div class="hobby-body"><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></div></article>`).join('')}</div></div></section></main>${footer()}`;
}

function bindImageFallbacks(){
  $$('img').forEach(img=>{
    const fallback=img.nextElementSibling;
    const fail=()=>{ img.style.display='none'; if(fallback && (fallback.classList.contains('card-image-fallback')||fallback.classList.contains('image-fallback'))) fallback.style.display='flex'; };
    img.addEventListener('error',fail);
    if(img.complete && img.naturalWidth===0) fail();
    else if(fallback && fallback.classList.contains('image-fallback')) fallback.style.display='none';
  });
}
function bindCards(){ $$('.project-card').forEach(card=>card.addEventListener('click',()=>openProject(card.dataset.project))); }

function bindCarousels(){
  $$('.content-carousel').forEach(track=>{
    const scrollAmount=()=>Math.max(track.clientWidth*0.82, 280);
    const prev=$(`[data-carousel-prev="${track.id}"]`);
    const next=$(`[data-carousel-next="${track.id}"]`);
    prev?.addEventListener('click',()=>track.scrollBy({left:-scrollAmount(),behavior:'smooth'}));
    next?.addEventListener('click',()=>track.scrollBy({left:scrollAmount(),behavior:'smooth'}));
    track.addEventListener('keydown',e=>{
      if(e.key==='ArrowRight'){e.preventDefault();track.scrollBy({left:scrollAmount(),behavior:'smooth'});}
      if(e.key==='ArrowLeft'){e.preventDefault();track.scrollBy({left:-scrollAmount(),behavior:'smooth'});}
    });
  });
}

function openProject(id){
  const p=CONTENT.projects[id]; if(!p) return;
  $('.modal-type').textContent=p.type||'';
  $('.modal-title').textContent=p.title||'';
  $('.modal-org').textContent=p.org||'';
  $('.modal-desc').textContent=p.desc||'';
  $('.modal-contrib').textContent=p.contrib||'';
  $('.modal-result').textContent=p.result||'';
  $('.modal-tags').innerHTML=(p.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('');
  const attachments=p.attachments||[];
  $('.modal-attachments-section').style.display=attachments.length?'block':'none';
  $('.modal-attachments').innerHTML=attachments.map(a=>`<a class="attachment-link" href="${esc(a[1])}" target="_blank">${esc(a[0])} ↗</a>`).join('');
  currentGallery=p.images||[]; currentImageIndex=0; renderGallery();
  $('.modal-backdrop').classList.add('open'); document.body.classList.add('modal-open');
}
function closeProject(){ $('.modal-backdrop').classList.remove('open'); document.body.classList.remove('modal-open'); }
function renderGallery(){
  const g=$('.gallery');
  if(!currentGallery.length){g.innerHTML='<div class="gallery-placeholder">Add project images in content.json</div>';return;}
  const src=currentGallery[currentImageIndex];
  g.innerHTML=`<div class="gallery-stage"><div class="gallery-blur" aria-hidden="true"></div><img src="${esc(src)}" alt="Project image ${currentImageIndex+1}"><div class="gallery-placeholder" style="display:none">Add image:<br>${esc(src)}</div>${currentGallery.length>1?`<button class="gallery-arrow prev" aria-label="Previous image">‹</button><button class="gallery-arrow next" aria-label="Next image">›</button><div class="gallery-count">${currentImageIndex+1} / ${currentGallery.length}</div>`:''}</div>`;
  const img=$('.gallery img'); const ph=$('.gallery-placeholder'); const blur=$('.gallery-blur');
  blur.style.backgroundImage=`url("${src}")`;
  img.addEventListener('error',()=>{img.style.display='none';blur.style.display='none';ph.style.display='flex';});
  $('.gallery .prev')?.addEventListener('click',()=>{currentImageIndex=(currentImageIndex-1+currentGallery.length)%currentGallery.length;renderGallery();});
  $('.gallery .next')?.addEventListener('click',()=>{currentImageIndex=(currentImageIndex+1)%currentGallery.length;renderGallery();});
}

async function init(){
  try{
    CONTENT=await loadContent();
    const page=document.body.dataset.page||'home';
    const root=$('#site-root');
    root.innerHTML=page==='home'?renderHome():page==='hobbies'?renderHobbies():renderProjectPage(page);
    bindImageFallbacks(); bindCards(); bindCarousels();
    $('.modal-close').addEventListener('click',closeProject);
    $('.modal-backdrop').addEventListener('click',e=>{if(e.target.classList.contains('modal-backdrop'))closeProject();});
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape') closeProject();
      if(!$('.modal-backdrop').classList.contains('open') || currentGallery.length<2) return;
      if(e.key==='ArrowRight'){currentImageIndex=(currentImageIndex+1)%currentGallery.length;renderGallery();}
      if(e.key==='ArrowLeft'){currentImageIndex=(currentImageIndex-1+currentGallery.length)%currentGallery.length;renderGallery();}
    });
  }catch(err){
    $('#site-root').innerHTML=`<div class="load-error"><h1>Portfolio content could not load.</h1><p>${esc(err.message)}</p><p>If you opened the HTML file directly from your computer, preview it through GitHub Pages or a local web server. Browsers block fetch() from local file URLs.</p></div>`;
    console.error(err);
  }
}
init();
