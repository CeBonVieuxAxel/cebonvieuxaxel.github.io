(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  var words = ['HTML', 'Applications web', 'Virtualisation', 'Réseaux', 'Cybersécurité', 'Chiffrement', 'Undercover', 'IA', 'LLM locaux', 'Microsoft Office', 'BTS SIO SLAM'];
  var track = document.getElementById('track');
  var html = words.map(function (w) { return '<span>' + w + '</span>'; }).join('');
  track.innerHTML = html + html;

  document.querySelectorAll('.pips').forEach(function (p) {
    var n = +p.dataset.n, s = '';
    for (var i = 0; i < 5; i++) s += '<i' + (i < n ? ' class="on"' : '') + '></i>';
    p.innerHTML = s;
    p.setAttribute('role', 'img');
    p.setAttribute('aria-label', 'Niveau ' + n + ' sur 5');
  });

  var rvs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    rvs.forEach(function (el) { io.observe(el); });
  } else {
    rvs.forEach(function (el) { el.classList.add('in'); });
  }

  var roles = ['développement web', 'cybersécurité', 'réseaux', 'IA en local', 'support informatique'];
  var typed = document.getElementById('typed');
  if (reduce) {
    typed.textContent = roles[0];
  } else {
    var ri = 0, ci = roles[0].length, del = true;
    (function tick() {
      var w = roles[ri];
      if (del) { ci--; } else { ci++; }
      typed.textContent = w.slice(0, Math.max(ci, 0));
      var wait = del ? 45 : 85;
      if (!del && ci >= w.length) { del = true; wait = 1400; }
      else if (del && ci <= 0) { del = false; ri = (ri + 1) % roles.length; wait = 250; }
      setTimeout(tick, wait);
    })();
  }

  var xp = document.getElementById('xp');
  var lvl = document.getElementById('lvl');
  var secs = Array.prototype.slice.call(document.querySelectorAll('section[data-lvl]'));
  var path = document.getElementById('path');
  var fill = document.getElementById('pathfill');
  var nodes = document.querySelectorAll('.node');
  var shapes = document.querySelectorAll('.shape');
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY || 0;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    xp.style.setProperty('--p', Math.max(p, 0.04));

    var mid = y + window.innerHeight * 0.4, cur = secs[0];
    secs.forEach(function (s) { if (s.offsetTop <= mid) cur = s; });
    var txt = 'NIV ' + cur.dataset.lvl + ' · ' + cur.dataset.name;
    if (lvl.textContent !== txt) lvl.textContent = txt;

    var r = path.getBoundingClientRect();
    var prog = (window.innerHeight * 0.6 - r.top) / r.height;
    prog = Math.min(1, Math.max(0, prog));
    fill.style.height = (prog * (r.height - 20)) + 'px';

    if (!reduce) {
      shapes.forEach(function (s) {
        var sp = parseFloat(s.dataset.speed);
        s.style.transform = 'translateY(' + (y * sp) + 'px) rotate(' + (y * sp * 0.4) + 'deg)';
      });
    }
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();

  document.getElementById('theme').addEventListener('click', function () {
    var cur = root.getAttribute('data-theme');
    if (!cur) cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });

  var colors = ['#FFD23F', '#FF8AC4', '#45E0B4', '#5B5BFF'];
  document.querySelectorAll('[data-confetti]').forEach(function (b) {
    b.addEventListener('click', function (ev) {
      if (reduce) return;
      var x = ev.clientX || window.innerWidth / 2, y = ev.clientY || window.innerHeight / 2;
      for (var i = 0; i < 36; i++) {
        var c = document.createElement('i');
        c.className = 'confetti';
        c.style.left = x + 'px'; c.style.top = y + 'px';
        c.style.background = colors[i % colors.length];
        document.body.appendChild(c);
        var a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 190;
        c.animate([
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + Math.cos(a) * d + 'px,' + (Math.sin(a) * d + 160) + 'px) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 }
        ], { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = (function (el) { return function () { el.remove(); }; })(c);
      }
    });
  });

  var copied = document.getElementById('copied');
  document.getElementById('copy').addEventListener('click', function () {
    var mail = document.getElementById('mail');
    var ok = function () { copied.textContent = 'Adresse copiée.'; };
    var fallback = function () {
      var rg = document.createRange(); rg.selectNodeContents(mail);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(rg);
      copied.textContent = 'Adresse sélectionnée, copie-la avec Ctrl+C.';
    };
    try {
      navigator.clipboard.writeText(mail.textContent.trim()).then(ok, fallback);
    } catch (e) { fallback(); }
  });
})();
