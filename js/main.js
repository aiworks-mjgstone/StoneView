/* MJG Stone — shared behaviour for every page */
(function(){
  var root=document.documentElement;
  // cursor light
  if(matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',function(e){root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px');},{passive:true});
  }
  // mobile menu
  var nav=document.querySelector('.nav'),burger=document.getElementById('burger');
  if(burger)burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  // reveal
  if('IntersectionObserver' in window){
    root.classList.add('js');
    setTimeout(function(){document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in');});},2500);
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.rv').forEach(function(el){
      var r=el.getBoundingClientRect(); if(r.top<innerHeight){el.classList.add('in');} else io.observe(el);
    });
  }
  // quote form (front-end only; wire to your mail handler or WordPress form endpoint)
  var form=document.getElementById('quote-form'),toast=document.getElementById('toast');
  if(!form)return;
  // preselect the project type when arriving from a link such as quote.html?project=Bathroom%20vanity
  var want=new URLSearchParams(location.search).get('project');
  if(want)Array.prototype.forEach.call(form.project.options,function(o){if(o.text===want)o.selected=true;});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=form.name.value.trim(),email=form.email.value.trim();
    if(!name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){toast.textContent='Please add your name and a valid email so we can reply.';toast.classList.add('show');return;}
    toast.textContent='Thanks '+name+'. Your request is ready to send to sales@mjgstone.com.au once the form is connected to your mail handler.';
    toast.classList.add('show');
  });
})();
