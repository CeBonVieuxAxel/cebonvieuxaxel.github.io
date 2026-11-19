import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";
(function(){
'use strict';
var root=document.documentElement,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
root.classList.add('js-ready');
var words=['HTML','Applications web','Virtualisation','Réseaux','Cybersécurité','Chiffrement','Undercover','IA','LLM locaux','Microsoft Office','BTS SIO SLAM'],track=document.getElementById('track');
var ticker=words.map(function(w){return '<span>'+w+'</span>';}).join('');track.innerHTML=ticker+ticker;
document.querySelectorAll('.pips').forEach(function(p){var n=+p.dataset.n,s='';for(var i=0;i<5;i++)s+='<i'+(i<n?' class="on"':'')+'></i>';p.innerHTML=s;p.setAttribute('role','img');p.setAttribute('aria-label','Niveau '+n+' sur 5');});
var rvs=document.querySelectorAll('.rv');
if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});rvs.forEach(function(el){io.observe(el);});}else rvs.forEach(function(el){el.classList.add('in');});
var roles=['développement web','cybersécurité','réseaux','IA en local','support informatique'],typed=document.getElementById('typed');
if(reduce)typed.textContent=roles[0];else{var ri=0,ci=roles[0].length,del=true;(function tick(){var w=roles[ri];ci+=del?-1:1;typed.textContent=w.slice(0,Math.max(ci,0));var wait=del?45:85;if(!del&&ci>=w.length){del=true;wait=1400;}else if(del&&ci<=0){del=false;ri=(ri+1)%roles.length;wait=250;}setTimeout(tick,wait);})();}
var xp=document.getElementById('xp'),lvl=document.getElementById('lvl'),secs=[].slice.call(document.querySelectorAll('section[data-lvl]')),path=document.getElementById('path'),fill=document.getElementById('pathfill'),ticking=false,scrollProgress=0;
function update(){ticking=false;var y=window.scrollY||0,max=document.documentElement.scrollHeight-window.innerHeight,p=max>0?Math.min(1,Math.max(0,y/max)):0;scrollProgress=p;xp.style.setProperty('--p',Math.max(p,.04));var mid=y+window.innerHeight*.4,cur=secs[0];secs.forEach(function(s){if(s.offsetTop<=mid)cur=s;});var label='NIV '+cur.dataset.lvl+' · '+cur.dataset.name;if(lvl.textContent!==label)lvl.textContent=label;if(path&&fill){var r=path.getBoundingClientRect(),prog=Math.min(1,Math.max(0,(window.innerHeight*.6-r.top)/r.height));fill.style.height=(prog*Math.max(0,r.height-20))+'px';}}
window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update);update();
document.getElementById('theme').addEventListener('click',function(){if(root.getAttribute('data-theme')==='rose')root.removeAttribute('data-theme');else root.setAttribute('data-theme','rose');});
var viewer=document.getElementById('viewer'),viewerBody=document.getElementById('viewer-body'),closeBtn=document.getElementById('viewer-close'),opener=null;
function openCV(from){opener=from||null;viewer.hidden=false;document.body.classList.add('locked');viewerBody.scrollTop=0;closeBtn.focus();}
function closeCV(){viewer.hidden=true;document.body.classList.remove('locked');if(opener&&opener.focus)opener.focus();}
document.querySelectorAll('[data-cv]').forEach(function(b){b.addEventListener('click',function(){openCV(b);});});closeBtn.addEventListener('click',closeCV);viewerBody.addEventListener('click',function(e){if(e.target===viewerBody)closeCV();});
document.addEventListener('keydown',function(e){if(viewer.hidden)return;if(e.key==='Escape'){closeCV();return;}if(e.key==='Tab'){var f=viewer.querySelectorAll('a[href],button:not([disabled])');if(!f.length)return;var first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
var copied=document.getElementById('copied');document.getElementById('copy').addEventListener('click',function(){var mail=document.getElementById('mail'),ok=function(){copied.textContent='Adresse copiée.';},fallback=function(){var rg=document.createRange();rg.selectNodeContents(mail);var sel=window.getSelection();sel.removeAllRanges();sel.addRange(rg);copied.textContent='Adresse sélectionnée, copie-la avec Ctrl+C.';};try{if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(mail.textContent.trim()).then(ok,fallback);else fallback();}catch(e){fallback();}});
if(!reduce&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.sticker').forEach(function(card){card.addEventListener('pointermove',function(e){var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(900px) rotateX('+(-y*4)+'deg) rotateY('+(x*5)+'deg) translateY(-3px)';});card.addEventListener('pointerleave',function(){card.style.transform='';});});}
/* Genuine WebGL scene: loaded as an ES module so it works with current Three.js releases. */
var canvas=document.getElementById('scene3d');
if(canvas){
var renderer,scene,camera,heroRig,bg;
try{
renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.35;
scene=new THREE.Scene();
camera=new THREE.PerspectiveCamera(38,window.innerWidth/window.innerHeight,.1,100);
camera.position.set(0,0,14);
scene.add(new THREE.HemisphereLight(0xe8ddff,0x170b2b,2.1));
var keyLight=new THREE.PointLight(0xff78ba,85,45);keyLight.position.set(4,5,8);scene.add(keyLight);
var fillLight=new THREE.PointLight(0x7b61ff,75,45);fillLight.position.set(-6,-3,5);scene.add(fillLight);
var rimLight=new THREE.PointLight(0x5bffd0,55,35);rimLight.position.set(1,-5,-3);scene.add(rimLight);
var gold=new THREE.MeshPhysicalMaterial({color:0xffd34f,metalness:.72,roughness:.19,clearcoat:1,clearcoatRoughness:.12});
var pink=new THREE.MeshPhysicalMaterial({color:0xff58ae,metalness:.52,roughness:.2,clearcoat:1,clearcoatRoughness:.12});
var mint=new THREE.MeshPhysicalMaterial({color:0x4ce5bd,metalness:.48,roughness:.2,clearcoat:1});
var violet=new THREE.MeshPhysicalMaterial({color:0x9875ff,metalness:.65,roughness:.18,clearcoat:1});
var pearl=new THREE.MeshPhysicalMaterial({color:0xf4eaff,metalness:.38,roughness:.16,clearcoat:1});
heroRig=new THREE.Group();scene.add(heroRig);
var central=new THREE.Group();heroRig.add(central);
/* Large sculptural object: torus knot, polished sphere and three tilted 3D rings. */
var knot=new THREE.Mesh(new THREE.TorusKnotGeometry(.92,.32,180,24,2,3),pink);central.add(knot);
var orb=new THREE.Mesh(new THREE.SphereGeometry(.43,48,32),gold);orb.position.set(.1,.05,.8);central.add(orb);
var ring1=new THREE.Mesh(new THREE.TorusGeometry(1.65,.045,16,140),mint);ring1.rotation.set(.9,.35,.15);central.add(ring1);
var ring2=new THREE.Mesh(new THREE.TorusGeometry(1.95,.025,12,140),violet);ring2.rotation.set(1.35,-.5,-.45);central.add(ring2);
var ring3=new THREE.Mesh(new THREE.TorusGeometry(1.28,.022,12,120),gold);ring3.rotation.set(.25,1.1,.8);central.add(ring3);
var satellites=[];
for(var si=0;si<9;si++){
 var geo=si%3===0?new THREE.BoxGeometry(.27,.27,.27):si%3===1?new THREE.OctahedronGeometry(.22,0):new THREE.IcosahedronGeometry(.2,0);
 var sat=new THREE.Mesh(geo,[gold,mint,violet,pink][si%4]);heroRig.add(sat);satellites.push(sat);
}
/* Smaller 3D confetti is distributed in depth across the whole page. */
bg=new THREE.Group();scene.add(bg);
var mats=[pink,mint,violet,gold,pearl];
for(var i=0;i<54;i++){
 var k=i%5,size=.12+Math.random()*.23;
 var geom=k===0?new THREE.TorusGeometry(size,.035,9,28):k===1?new THREE.OctahedronGeometry(size):k===2?new THREE.IcosahedronGeometry(size):k===3?new THREE.BoxGeometry(size*1.5,size*1.5,size*1.5):new THREE.TetrahedronGeometry(size);
 var mesh=new THREE.Mesh(geom,mats[k]);
 mesh.position.set((Math.random()-.5)*18,(Math.random()-.5)*17,-2-Math.random()*10);
 mesh.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6);
 mesh.userData={phase:Math.random()*Math.PI*2,amp:.12+Math.random()*.28,speed:.35+Math.random()*.65,baseY:mesh.position.y};bg.add(mesh);
}
var pointer={x:0,y:0},target={x:0,y:0},confetti=[];
window.addEventListener('pointermove',function(e){target.x=(e.clientX/window.innerWidth-.5)*2;target.y=(e.clientY/window.innerHeight-.5)*2;},{passive:true});
var confettiColors=[0xff58ae,0xffd34f,0x4ce5bd,0x9875ff,0xffffff];
document.querySelectorAll('[data-confetti]').forEach(function(b){b.addEventListener('click',function(e){if(reduce)return;var nx=e.clientX/window.innerWidth*2-1,ny=-(e.clientY/window.innerHeight)*2+1,origin=new THREE.Vector3(nx,ny,.15).unproject(camera),dir=origin.clone().sub(camera.position).normalize();for(var n=0;n<64;n++){var col=confettiColors[n%confettiColors.length],mat=new THREE.MeshPhysicalMaterial({color:col,metalness:.4,roughness:.22,clearcoat:1}),piece=new THREE.Mesh(n%2?new THREE.BoxGeometry(.09,.15,.035):new THREE.TetrahedronGeometry(.09),mat);piece.position.copy(origin);piece.velocity=dir.clone().multiplyScalar(2+Math.random()*4).add(new THREE.Vector3((Math.random()-.5)*3,Math.random()*3,(Math.random()-.5)*2));piece.spin=new THREE.Vector3(Math.random()*12,Math.random()*12,Math.random()*12);piece.life=2.3+Math.random()*.8;scene.add(piece);confetti.push(piece);}});});
var clock=new THREE.Clock();
function resize(){camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));}
window.addEventListener('resize',resize);
function animate(){requestAnimationFrame(animate);var dt=Math.min(clock.getDelta(),.04),t=clock.elapsedTime;
 if(!reduce){
  pointer.x+=(target.x-pointer.x)*.045;pointer.y+=(target.y-pointer.y)*.045;
  var mobile=window.innerWidth<760;
  heroRig.position.set(mobile?0:3.55,.05+Math.sin(t*.72)*.18-scrollProgress*.34,0);
  heroRig.rotation.y=t*.19+pointer.x*.22;heroRig.rotation.x=Math.sin(t*.31)*.1+pointer.y*.13;
  central.rotation.y=t*.28;central.rotation.x=Math.sin(t*.45)*.12;knot.rotation.z=t*.18;
  ring1.rotation.z=t*.16;ring2.rotation.y=-t*.12;ring3.rotation.x=t*.14;
  satellites.forEach(function(s,j){var a=t*(.36+j*.025)+j*Math.PI*2/9,r=2.05+(j%3)*.18;s.position.set(Math.cos(a)*r,Math.sin(a*1.3)*.48,Math.sin(a)*r*.62);s.rotation.x=t*.65+j;s.rotation.y=t*.8+j*.7;});
  bg.children.forEach(function(m,j){m.rotation.x+=dt*(.13+j%3*.025);m.rotation.y+=dt*.11;m.position.y=m.userData.baseY+Math.sin(t*m.userData.speed+m.userData.phase)*m.userData.amp;});
  bg.position.y=scrollProgress*1.35;
 }
 for(var c=confetti.length-1;c>=0;c--){var p=confetti[c];p.life-=dt;p.velocity.y-=5.2*dt;p.position.addScaledVector(p.velocity,dt);p.rotation.x+=p.spin.x*dt;p.rotation.y+=p.spin.y*dt;p.rotation.z+=p.spin.z*dt;if(p.life<=0){scene.remove(p);p.geometry.dispose();p.material.dispose();confetti.splice(c,1);}}
 renderer.render(scene,camera);
}
if(reduce){heroRig.position.set(window.innerWidth<760?0:3.55,0,0);heroRig.rotation.set(.16,.28,0);}
animate();
}catch(err){canvas.classList.add('scene-failed');console.error('Initialisation de la scène 3D impossible :',err);}
}
})();