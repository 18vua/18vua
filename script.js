(() => {
  "use strict";
  const d = document,
    w = window;
  function q(s) {
    return d.querySelector(s);
  }
  function qa(s) {
    return d.querySelectorAll(s);
  }
  function createParticles() {
    let pc = d.createElement("div");
    pc.className = "floating-particles";
    d.body.appendChild(pc);
    for (let i = 0; i < 40; i++) {
      let p = d.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 30 + "s";
      p.style.animationDuration = Math.random() * 20 + 20 + "s";
      p.style.background = "#fff";
      p.style.boxShadow = "0 0 8px rgba(255,255,255,0.3)";
      pc.appendChild(p);
    }
  }
  const hamburger = q(".hamburger"),
    navMenu = q(".nav-menu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  qa(".nav-menu a").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
  qa('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const href = a.getAttribute("href");
      if (href && href !== "#") {
        let tgt = d.querySelector(href);
        if (tgt)
          tgt.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }
    });
  });
  w.addEventListener("scroll", () => {
    const navbar = q(".navbar");
    if (w.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
  );
  let trailArr = [];
  function createTrail(e) {
    let t = d.createElement("div");
    t.style.position = "fixed";
    t.style.left = e.clientX + "px";
    t.style.top = e.clientY + "px";
    t.style.width = "4px";
    t.style.height = "4px";
    t.style.background = "#fff";
    t.style.borderRadius = "50%";
    t.style.pointerEvents = "none";
    t.style.opacity = ".6";
    t.style.transform = "scale(1)";
    t.style.transition = "all .8s cubic-bezier(.4,0,.2,1)";
    t.style.zIndex = "9999";
    t.style.boxShadow = "0 0 8px rgba(255,255,255,.4)";
    d.body.appendChild(t);
    trailArr.push(t);
    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transform = "scale(0)";
    }, 100);
    setTimeout(() => {
      if (t.parentNode) t.parentNode.removeChild(t);
      trailArr = trailArr.filter((x) => x !== t);
    }, 800);
    if (trailArr.length > 10) {
      let old = trailArr.shift();
      if (old && old.parentNode) old.parentNode.removeChild(old);
    }
  }
  function glitchEffect() {
    let hero = q(".hero h1");
    if (!hero) return;
    const orig = hero.textContent;
    const chars = '{}<>/\\=;()[]#*&%$@!+-_|~`^"\'.?,:';
    let iter = 0,
      max = orig.length;
    const interval = setInterval(() => {
      if (iter >= max) {
        clearInterval(interval);
        hero.textContent = orig;
        return;
      }
      hero.textContent = orig
        .split("")
        .map((c, i) => (i < iter ? orig[i] : chars[Math.floor(Math.random() * chars.length)]))
        .join("");
      iter += 1 / 3;
    }, 50);
  }
  function revealText() {
    qa(".hero-subtitle,.hero-description").forEach((el, idx) => {
      const text = el.textContent;
      el.innerHTML = "";
      text.split("").forEach((c, i) => {
        let span = d.createElement("span");
        span.textContent = c === " " ? "\u00A0" : c;
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        span.style.transition = `all .8s cubic-bezier(.4,0,.2,1) ${(i * 0.02) + idx}s`;
        span.style.display = "inline-block";
        el.appendChild(span);
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        }, 100);
      });
    });
  }
  function animateSkillTags() {
    qa(".skill-tag").forEach((tag, i) => {
      tag.style.opacity = "0";
      tag.style.transform = "scale(.8) translateY(20px)";
      tag.style.transition = `all 1s cubic-bezier(.4,0,.2,1) ${i * 0.1}s`;
      const ob = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "scale(1) translateY(0)";
          }
        });
      });
      ob.observe(tag);
    });
  }
  function animateProjectCards() {
    qa(".project-card").forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px) scale(.95)";
      card.style.transition = `all 1s cubic-bezier(.4,0,.2,1) ${i * 0.2}s`;
      const ob = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0) scale(1)";
          }
        });
      });
      ob.observe(card);
    });
  }
  function animateStats() {
    qa(".stat-number").forEach((stat) => {
      const ob = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            let val = e.target.textContent;
            let num = parseFloat(val);
            let dec = val.includes(".");
            let dur = 2500,
              start = Date.now();
            function update() {
              let elapsed = Date.now() - start;
              let prog = Math.min(elapsed / dur, 1);
              let curr = num * prog;
              if (dec) e.target.textContent = curr.toFixed(1) + "+";
              else e.target.textContent = Math.floor(curr) + "+";
              if (prog < 1) requestAnimationFrame(update);
              else e.target.textContent = val;
            }
            update();
            ob.unobserve(e.target);
          }
        });
      });
      ob.observe(stat);
    });
  }
  function minimalParallax() {
    let scrolled = w.pageYOffset;
    qa(".floating-cubes").forEach((el) => {
      let spd = 0.2;
      let y = -scrolled * spd;
      el.style.transform = `translateY(${y}px)`;
    });
  }
  // ** Advanced Anti-Debugging Block **
  (() => {
    const isDevToolsOpen = () => {
      // Timing check
      const threshold = 160;
      const start = performance.now();
      debugger;
      const end = performance.now();
      return end - start > threshold;
    };
    let devtoolsOpen = false;
    // Loop to check
    setInterval(() => {
      if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160 ||
        isDevToolsOpen()
      ) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          alert("Developer tools detected and blocked.");
          // Freeze page or redirect
          document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20vh;'>Access Denied</h1>";
          throw new Error("DevTools is not allowed.");
        }
      } else devtoolsOpen = false;
    }, 1000);

    // Disable common shortcuts for devtools
    w.addEventListener(
      "keydown",
      (e) => {
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
          (e.ctrlKey && e.key.toUpperCase() === "U") ||
          (e.ctrlKey && e.key.toUpperCase() === "S")
        ) {
          e.preventDefault();
          alert("This action is disabled.");
        }
      },
      false
    );

    // Disable right click context menu globally
    d.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
        alert("Right-click is disabled.");
      },
      false
    );

    // Obfuscate console.log and debugger attempts
    (function () {
      const originalLog = console.log;
      console.log = function () {
        originalLog.apply(console, arguments);
        if (devtoolsOpen) {
          throw "Console usage blocked.";
        }
      };
      const detectDebugger = function () {
        const start = Date.now();
        debugger;
        const end = Date.now();
        if (end - start > 100) {
          alert("Debugger detected.");
          throw new Error("Debugger detected.");
        }
      };
      setInterval(detectDebugger, 2000);
    })();
  })();

  // DOM ready initialization
  d.addEventListener("DOMContentLoaded", () => {
    createParticles();
    qa(".about-content,.contact-content,.skill-category").forEach((el) => {
      el.classList.add("fade-in-up");
      observer.observe(el);
    });
    animateProjectCards();
    animateSkillTags();
    animateStats();
    setTimeout(() => glitchEffect(), 1000);
    setTimeout(() => revealText(), 2500);
    d.addEventListener("mousemove", createTrail);
    w.addEventListener("scroll", minimalParallax);
    qa(".contact-link").forEach((link, i) => {
      link.style.opacity = "0";
      link.style.transform = "translateY(30px)";
      link.style.transition = `all 1s cubic-bezier(.4,0,.2,1) ${i * 0.2}s`;
      const ob = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      });
      ob.observe(link);
    });
    qa(".placeholder-image.roblox-themed i").forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        icon.style.transform = "scale(1.1)";
        icon.style.color = "#fff";
      });
      icon.addEventListener("mouseleave", () => {
        icon.style.transform = "scale(1)";
        icon.style.color = "rgba(255,255,255,.7)";
      });
    });
    qa(".skill-category").forEach((category) => {
      category.addEventListener("mouseenter", () => {
        let icon = category.querySelector(".skill-icon i");
        if (icon) {
          icon.style.transform = "scale(1.2)";
          icon.style.color = "#fff";
        }
      });
      category.addEventListener("mouseleave", () => {
        let icon = category.querySelector(".skill-icon i");
        if (icon) {
          icon.style.transform = "scale(1)";
          icon.style.color = "rgba(255,255,255,.8)";
        }
      });
    });
  });
  setInterval(() => {
    let logo = q(".nav-logo");
    if (logo) {
      logo.style.textShadow = "0 0 20px rgba(255,255,255,.3)";
    }
  }, 4000);
  w.addEventListener("beforeunload", () => {
    d.body.style.opacity = "0";
    d.body.style.transform = "scale(1.02)";
  });
})();
