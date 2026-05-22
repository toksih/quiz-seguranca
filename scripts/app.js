
(function () {
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function sanitizeName(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 30);
  }

  function getLevelLabel(xp) {
    if (xp < 20) return "MUITO BAIXA";
    if (xp < 40) return "BAIXA";
    if (xp < 60) return "QUASE LÁ";
    if (xp < 80) return "POR POUCO";
    if (xp == 80) return "EFICIENTE";
    return "ELITE";
  }

  function setBodyScene(scene, extraState) {
    if (document.body) {
      document.body.dataset.scene = scene;
      if (extraState) {
        document.body.dataset.outcome = extraState;
      } else {
        document.body.removeAttribute("data-outcome");
      }
    }
  }

  function setCssVars(vars) {
    const root = document.documentElement;
    Object.entries(vars || {}).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  function svgDataUri(svg) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function createOptionArt(questionIndex, optionIndex, label, accent, secondary) {
    const safeLabel = String(label || "OP").trim().toUpperCase().slice(0, 2) || "OP";
    const glyphs = ["✦", "◆", "▲", "◈", "⬢", "✳", "⚡", "✚"];
    const glyph = glyphs[(questionIndex + optionIndex) % glyphs.length];
    const accentColor = accent || "#68f0ff";
    const secondaryColor = secondary || "#ffd44c";

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${safeLabel}">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0.9"/>
          </linearGradient>
          <radialGradient id="rg" cx="50%" cy="25%" r="75%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect x="6" y="6" width="116" height="116" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)"/>
        <path d="M24 28h80l-8 72H32z" fill="url(#g)" opacity="0.95"/>
        <path d="M28 20h72l10 18H18z" fill="rgba(255,255,255,0.12)"/>
        <circle cx="64" cy="54" r="28" fill="rgba(4,10,24,0.42)" stroke="rgba(255,255,255,0.2)"/>
        <circle cx="64" cy="54" r="18" fill="url(#rg)"/>
        <text x="64" y="60" text-anchor="middle" font-size="24" font-family="Arial, sans-serif" font-weight="900" fill="#ffffff">${glyph}</text>
        <text x="64" y="96" text-anchor="middle" font-size="22" font-family="Arial, sans-serif" font-weight="900" fill="#ffffff">${safeLabel}</text>
      </svg>
    `.trim();

    return svgDataUri(svg);
  }

  function animateValue(element, from, to, duration = 650, formatter = (value) => value) {
    if (!element) return;
    const start = performance.now();
    const delta = to - from;

    function frame(now) {
      const progress = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + delta * eased);
      element.textContent = formatter(value);
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  function flashElement(element, className, duration = 700) {
    if (!element) return;
    element.classList.add(className);
    window.setTimeout(() => element.classList.remove(className), duration);
  }

  function vibrate(pattern = 18) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  window.appHelpers = {
    clamp,
    sanitizeName,
    getLevelLabel,
    setBodyScene,
    setCssVars,
    createOptionArt,
    animateValue,
    flashElement,
    vibrate
  };
})();
