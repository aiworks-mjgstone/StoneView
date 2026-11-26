/* MJG Stone: shared behaviour for every page */
(function(){
  var root=document.documentElement;
  // cursor light
  if(matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',function(e){root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px');},{passive:true});
  }
  // header: transparent at the top of the page, compact dark bar once scrolled
  var hdr=document.querySelector('.nav');
  if(hdr){var onScroll=function(){hdr.classList.toggle('scrolled',scrollY>40);};onScroll();addEventListener('scroll',onScroll,{passive:true});}
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
  // sign-in form (front-end only; connect to your account system before going live)
  var si=document.getElementById('signin-form'),siToast=document.getElementById('signin-toast');
  if(si)si.addEventListener('submit',function(e){
    e.preventDefault();
    var email=si.email.value.trim(),pw=si.password.value;
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||!pw){siToast.textContent='Please enter your email and password.';siToast.classList.add('show');return;}
    siToast.textContent='Sign-in is not connected yet. Link this form to your account system to enable it.';
    siToast.classList.add('show');
  });
  // quote form (front-end only; wire to your mail handler or WordPress form endpoint)
  var form=document.getElementById('quote-form'),toast=document.getElementById('toast');
  if(!form)return;
  // file upload: keep to 5 files of 10 MB each
  var files=document.getElementById('f-files'),fnote=document.getElementById('f-files-note');
  if(files){var fhint=fnote.textContent;files.addEventListener('change',function(){
    var list=Array.prototype.slice.call(files.files),big=list.filter(function(f){return f.size>10*1024*1024;}),msg='';
    if(list.length>5)msg='Please choose 5 files or fewer.';
    else if(big.length)msg=big[0].name+' is larger than 10 MB. Please choose a smaller file.';
    if(msg){files.value='';fnote.textContent=msg;fnote.classList.add('bad');}
    else{fnote.classList.remove('bad');fnote.textContent=list.length?list.map(function(f){return f.name;}).join(', '):fhint;}
  });}
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
