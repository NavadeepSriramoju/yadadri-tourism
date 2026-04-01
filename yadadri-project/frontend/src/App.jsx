import { useState, useEffect, useRef } from "react";

const BASE_URL = "http://localhost:8080";

// Futuristic color palette with neon effects
const COLORS = `
  :root {
    --saffron: #FF6B1A;
    --saffron-light: #FF8C42;
    --gold: #D4AF37;
    --gold-light: #F0D060;
    --maroon: #6B1A1A;
    --maroon-dark: #4A0E0E;
    --maroon-mid: #8B2020;
    --cream: #FDF6E3;
    --cream-dark: #F5E6C8;
    --text-dark: #2C1A0E;
    --text-mid: #5C3A1E;
    --white: #FFFDF7;
    --shadow: rgba(107,26,26,0.18);
    --cyan: #00D9FF;
    --purple: #9D4EDD;
    --pink: #FF006E;
  }
`;

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&family=Cinzel:wght@400;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--cream);
    color: var(--text-dark);
    font-family: 'Crimson Pro', Georgia, serif;
    font-size: 18px;
    min-height: 100vh;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--cream-dark); }
  ::-webkit-scrollbar-thumb { background: var(--maroon); border-radius: 4px; }

  /* ── Navbar ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 60%, var(--maroon-mid) 100%);
    border-bottom: 3px solid var(--gold);
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }
  .navbar-brand {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Cinzel Decorative', serif;
    color: var(--gold-light);
    font-size: 1.1rem;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.05em;
  }
  .om-symbol {
    font-size: 2rem;
    color: var(--gold);
    filter: drop-shadow(0 0 6px var(--gold));
    animation: omGlow 3s ease-in-out infinite, float 4s ease-in-out infinite;
  }
  @keyframes omGlow {
    0%,100% { filter: drop-shadow(0 0 6px var(--gold)); }
    50% { filter: drop-shadow(0 0 14px var(--gold-light)) drop-shadow(0 0 20px rgba(0,217,255,0.3)); }
  }
  .nav-links { display: flex; gap: 4px; align-items: center; }
  .nav-link {
    background: none; border: none; cursor: pointer;
    font-family: 'Cinzel', serif;
    font-size: 0.82rem; letter-spacing: 0.1em; font-weight: 600;
    color: var(--cream);
    padding: 8px 14px; border-radius: 4px;
    transition: all 0.25s ease;
    position: relative;
    text-transform: uppercase;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 2px; left: 14px; right: 14px;
    height: 2px; background: linear-gradient(90deg, var(--gold), var(--saffron), var(--gold));
    transform: scaleX(0); transition: transform 0.25s ease;
    border-radius: 2px;
  }
  .nav-link::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,107,26,0.1));
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.25s ease;
    z-index: -1;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--gold-light);
    transform: scale(1.05);
  }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
  .nav-link:hover::before, .nav-link.active::before { opacity: 1; }
  .nav-link.admin-link { color: var(--saffron-light); }

  /* ── Page Wrapper ── */
  .page { min-height: 100vh; padding-top: 68px; }

  /* ── Hero ── */
  .hero {
    min-height: calc(100vh - 68px);
    background:
      linear-gradient(160deg, rgba(107,26,26,0.82) 0%, rgba(74,14,14,0.65) 40%, rgba(212,175,55,0.18) 100%),
      repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,175,55,0.04) 40px, rgba(212,175,55,0.04) 80px),
      linear-gradient(180deg, #4A0E0E 0%, #7A3010 50%, #C46010 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 4rem 2rem;
    position: relative; overflow: hidden;
  }
  .hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0,217,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(157,78,221,0.08) 0%, transparent 50%);
    animation: aurora 8s ease-in-out infinite;
    pointer-events: none;
  }
  .hero::before {
    content: 'ॐ';
    position: absolute; font-size: 40vw; color: rgba(212,175,55,0.04);
    font-family: serif; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: bgOmRotate 60s linear infinite;
    z-index: 1;
  }
  @keyframes bgOmRotate {
    from { transform: translate(-50%,-50%) rotate(0deg); }
    to   { transform: translate(-50%,-50%) rotate(360deg); }
  }
  @keyframes aurora {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
  .hero-badge {
    display: inline-block;
    border: 2px solid var(--gold);
    color: var(--gold-light);
    font-family: 'Cinzel', serif;
    font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase;
    padding: 10px 24px; border-radius: 50px;
    margin-bottom: 1.5rem;
    background: rgba(212,175,55,0.12);
    animation: fadeSlideDown 0.8s ease both, floatUp 3s ease-in-out infinite 0.8s;
    position: relative;
    z-index: 10;
    box-shadow: 0 0 20px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.1);
  }
  .hero-badge::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, var(--gold), var(--saffron), var(--gold));
    border-radius: 50px;
    opacity: 0;
    animation: badgeGlow 2s ease-in-out infinite;
    z-index: -1;
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes badgeGlow {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.6; }
  }
  .hero-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(2rem, 6vw, 4.5rem);
    color: var(--gold-light);
    line-height: 1.2;
    text-shadow: 0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.3);
    margin-bottom: 1rem;
    animation: fadeSlideDown 0.9s 0.1s ease both, textGlow 3s ease-in-out infinite 0.9s;
    position: relative;
    z-index: 10;
    background: linear-gradient(135deg, var(--gold-light), var(--saffron-light), var(--gold-light));
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  @keyframes textGlow {
    0%, 100% { filter: drop-shadow(0 0 8px rgba(212,175,55,0.4)); }
    50% { filter: drop-shadow(0 0 20px rgba(255,107,26,0.6)); }
  }
  .hero-deity {
    font-family: 'Cinzel', serif;
    font-size: clamp(0.9rem, 2.5vw, 1.4rem);
    color: var(--saffron-light);
    letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 1.5rem;
    animation: fadeSlideDown 1s 0.2s ease both, pulseColor 2.5s ease-in-out infinite 1.2s;
    position: relative;
    z-index: 10;
  }
  @keyframes pulseColor {
    0%, 100% { color: var(--saffron-light); text-shadow: 0 0 10px rgba(255,107,26,0.3); }
    50% { color: var(--gold-light); text-shadow: 0 0 20px rgba(255,107,26,0.6); }
  }
  .hero-tagline {
    font-family: 'Crimson Pro', serif; font-style: italic;
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    color: rgba(253,246,227,0.85);
    max-width: 600px; margin: 0 auto 3rem;
    line-height: 1.6;
    animation: fadeSlideDown 1.1s 0.3s ease both;
    position: relative;
    z-index: 10;
  }
  .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; animation: fadeSlideDown 1.2s 0.4s ease both; }
  .btn-primary {
    background: linear-gradient(135deg, var(--saffron) 0%, var(--saffron-light) 100%);
    color: white; border: none; cursor: pointer;
    font-family: 'Cinzel', serif; font-size: 0.85rem; letter-spacing: 0.12em; font-weight: 700;
    padding: 14px 32px; border-radius: 3px;
    text-transform: uppercase;
    box-shadow: 0 4px 15px rgba(255,107,26,0.4);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--saffron-light), var(--saffron));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.3), transparent);
    opacity: 0;
    animation: buttonShine 0.6s ease;
  }
  .btn-primary:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255,107,26,0.6), 0 0 30px rgba(255,107,26,0.4);
  }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:active { transform: translateY(0) scale(0.98); }
  .btn-secondary {
    background: transparent;
    color: var(--gold-light); border: 2px solid var(--gold);
    cursor: pointer;
    font-family: 'Cinzel', serif; font-size: 0.85rem; letter-spacing: 0.12em; font-weight: 700;
    padding: 12px 32px; border-radius: 3px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .btn-secondary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(212,175,55,0.2), rgba(255,107,26,0.1));
    left: -100%;
    transition: left 0.4s ease;
    z-index: -1;
  }
  .btn-secondary:hover {
    background: rgba(212,175,55,0.15);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 4px 15px rgba(212,175,55,0.3);
    border-color: var(--saffron-light);
    color: var(--saffron-light);
  }
  .btn-secondary:hover::before { left: 0; }
  @keyframes buttonShine {
    0% { opacity: 1; transform: translateX(-100%); }
    100% { opacity: 0; transform: translateX(100%); }
  }

  /* ── Section Divider ── */
  .divider {
    display: flex; align-items: center; gap: 1rem;
    margin: 2.5rem auto; max-width: 400px;
    color: var(--gold);
    animation: expandIn 0.8s ease;
  }
  .divider-line {
    flex: 1; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), var(--saffron), var(--gold), transparent);
    animation: shimmer 3s ease infinite;
  }
  .divider-symbol {
    font-size: 1.4rem;
    animation: rotate3d 6s linear infinite;
  }

  /* ── Features Strip ── */
  .features {
    background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
  }
  .features::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 0% 0%, rgba(0,217,255,0.08) 0%, transparent 50%),
      radial-gradient(circle at 100% 100%, rgba(157,78,221,0.08) 0%, transparent 50%);
    animation: featuresBg 8s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes featuresBg {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem; max-width: 1100px; margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  .feature-card {
    text-align: center; padding: 2rem 1.5rem;
    border: 1px solid rgba(212,175,55,0.3); border-radius: 4px;
    background: rgba(255,255,255,0.04);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(255,107,26,0.1));
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .feature-card::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(0,217,255,0.3), transparent);
    opacity: 0;
    transition: all 0.6s ease;
  }
  .feature-card:hover {
    background: rgba(212,175,55,0.12);
    border-color: var(--gold);
    transform: translateY(-8px) rotateY(5deg);
    box-shadow: 0 12px 30px rgba(212,175,55,0.2), 0 0 40px rgba(0,217,255,0.15);
  }
  .feature-card:hover::before { opacity: 1; }
  .feature-card:hover::after {
    opacity: 1;
    top: 20%;
    right: 10%;
  }
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    transition: all 0.4s ease;
    animation: floatIcon 3s ease-in-out infinite;
  }
  @keyframes floatIcon {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-10px) scale(1.1); }
  }
  .feature-card:hover .feature-icon { animation: spinRotate 0.6s ease forwards; }
  @keyframes spinRotate {
    0% { transform: rotateY(0) scale(1); }
    100% { transform: rotateY(360deg) scale(1.2); }
  }
  .feature-title { font-family: 'Cinzel', serif; color: var(--gold-light); font-size: 0.95rem; letter-spacing: 0.08em; margin-bottom: 0.5rem; transition: all 0.3s ease; }
  .feature-card:hover .feature-title { color: var(--saffron-light); }
  .feature-desc { color: rgba(253,246,227,0.7); font-size: 0.95rem; line-height: 1.5; transition: all 0.3s ease; }
  .feature-card:hover .feature-desc { color: rgba(253,246,227,0.95); }

  /* ── Section Heading ── */
  .section-heading {
    text-align: center; padding: 4rem 2rem 2rem;
    animation: fadeSlideUp 0.6s ease;
  }
  .section-heading h2 {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.6rem, 4vw, 2.8rem);
    color: var(--maroon-dark);
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, var(--maroon-dark), var(--maroon-mid));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: glow 3s ease-in-out infinite;
  }
  .section-heading p {
    color: var(--text-mid); font-style: italic; font-size: 1.1rem;
    animation: fadeSlideUp 0.8s 0.2s ease both;
  }

  /* ── Cards ── */
  .cards-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem 4rem; }
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  .timing-card {
    background: var(--white);
    border: 1px solid var(--cream-dark);
    border-top: 4px solid var(--saffron);
    border-radius: 4px;
    padding: 1.5rem;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 2px 8px var(--shadow);
    position: relative;
    overflow: hidden;
  }
  .timing-card::before {
    content: ''; position: absolute; top: 0; right: 0;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%);
    border-radius: 50%; transform: translate(20px,-20px);
    transition: all 0.4s ease;
  }
  .timing-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,217,255,0.05), rgba(157,78,221,0.05));
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .timing-card:hover {
    transform: translateY(-8px) rotateX(5deg);
    box-shadow: 0 12px 32px var(--shadow), 0 0 30px rgba(212,175,55,0.2);
    border-top-color: var(--gold);
  }
  .timing-card:hover::before { transform: translate(10px, -30px) scale(1.2); }
  .timing-card:hover::after { opacity: 1; }
  .card-seva { font-family: 'Cinzel', serif; font-size: 1.1rem; color: var(--maroon); font-weight: 700; margin-bottom: 0.8rem; transition: all 0.3s ease; }
  .timing-card:hover .card-seva { color: var(--saffron); }
  .card-row { display: flex; align-items: center; gap: 8px; margin: 6px 0; font-size: 0.95rem; color: var(--text-mid); transition: all 0.3s ease; }
  .timing-card:hover .card-row { color: var(--text-dark); }
  .card-row .icon { font-size: 1rem; animation: iconBounce 2s ease-in-out infinite; }
  @keyframes iconBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  .badge {
    display: inline-block; padding: 3px 12px; border-radius: 20px;
    font-family: 'Cinzel', serif; font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .badge-free { background: rgba(34,139,34,0.12); color: #228B22; border: 1px solid rgba(34,139,34,0.3); }
  .badge-paid { background: rgba(212,175,55,0.15); color: var(--maroon-dark); border: 1px solid rgba(212,175,55,0.4); }
  .badge-inactive { background: rgba(150,150,150,0.15); color: #888; border: 1px solid rgba(150,150,150,0.3); }

  /* ── Filter Bar ── */
  .filter-bar {
    display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
    margin: 0 auto 2rem; max-width: 700px; padding: 0 2rem;
    animation: fadeSlideUp 0.6s ease;
  }
  .filter-btn {
    background: var(--white); border: 2px solid var(--cream-dark);
    color: var(--text-mid); cursor: pointer;
    font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 0.1em;
    padding: 8px 18px; border-radius: 3px;
    text-transform: uppercase; font-weight: 600;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
  }
  .filter-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--maroon), var(--maroon-mid));
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: right;
    z-index: -1;
  }
  .filter-btn:hover {
    border-color: var(--maroon);
  }
  .filter-btn:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }
  .filter-btn:hover, .filter-btn.active {
    background: var(--maroon);
    color: var(--gold-light);
    border-color: var(--maroon);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(107,26,26,0.3);
  }

  /* ── Spinner ── */
  .spinner-wrap { text-align: center; padding: 4rem; }
  .spinner {
    display: inline-block; width: 48px; height: 48px;
    border: 4px solid var(--cream-dark);
    border-top-color: var(--saffron); border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Booking ── */
  .booking-wrap { max-width: 640px; margin: 0 auto; padding: 0 2rem 4rem; animation: slideInLeft 0.6s ease; }
  .booking-form {
    background: var(--white);
    border: 1px solid var(--cream-dark);
    border-top: 5px solid var(--maroon);
    border-radius: 4px;
    padding: 2.5rem;
    box-shadow: 0 4px 20px var(--shadow);
    animation: bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  }
  .booking-form::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,175,55,0.05), rgba(255,107,26,0.03));
    border-radius: 4px;
    z-index: 0;
  }
  .form-group {
    margin-bottom: 1.4rem;
    animation: fadeSlideUp 0.6s ease backwards;
  }
  .form-group:nth-child(1) { animation-delay: 0.1s; }
  .form-group:nth-child(2) { animation-delay: 0.2s; }
  .form-group:nth-child(3) { animation-delay: 0.3s; }
  .form-group:nth-child(4) { animation-delay: 0.4s; }
  .form-label {
    display: block; margin-bottom: 6px;
    font-family: 'Cinzel', serif; font-size: 0.78rem; letter-spacing: 0.1em;
    color: var(--maroon); font-weight: 600; text-transform: uppercase;
  }
  .form-input, .form-select {
    width: 100%; padding: 12px 14px;
    border: 1.5px solid var(--cream-dark); border-radius: 3px;
    background: var(--cream); color: var(--text-dark);
    font-family: 'Crimson Pro', serif; font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    outline: none;
    position: relative;
  }
  .form-input:focus, .form-select:focus {
    border-color: var(--maroon);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1), 0 4px 12px rgba(107,26,26,0.15);
    transform: translateY(-2px);
  }
  .form-input.error {
    border-color: #E53E3E;
    box-shadow: 0 0 0 3px rgba(229,62,62,0.1);
  }
  .error-msg { color: #E53E3E; font-size: 0.85rem; margin-top: 4px; animation: slideInLeft 0.3s ease; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  
  .form-input::placeholder {
    color: rgba(92,58,30,0.5);
    transition: all 0.3s ease;
  }
  .form-input:focus::placeholder {
    color: rgba(212,175,55,0.7);
  }

  /* ── About ── */
  .about-wrap { max-width: 900px; margin: 0 auto; padding: 0 2rem 4rem; animation: fadeSlideUp 0.6s ease; }
  .about-section {
    margin-bottom: 2.5rem;
    animation: fadeSlideUp 0.6s ease backwards;
  }
  .about-section:nth-child(1) { animation-delay: 0.1s; }
  .about-section:nth-child(2) { animation-delay: 0.2s; }
  .about-section:nth-child(3) { animation-delay: 0.3s; }
  .about-section:nth-child(4) { animation-delay: 0.4s; }
  .about-section h3 {
    font-family: 'Cinzel', serif; color: var(--maroon);
    font-size: 1.2rem; letter-spacing: 0.08em;
    margin-bottom: 1rem; padding-bottom: 8px;
    border-bottom: 2px solid var(--cream-dark);
    transition: all 0.3s ease;
  }
  .about-section:hover h3 {
    color: var(--saffron);
    border-bottom-color: var(--gold);
  }
  .about-section p { color: var(--text-mid); line-height: 1.8; margin-bottom: 0.8rem; transition: all 0.3s ease; }
  .about-section:hover p { color: var(--text-dark); }
  .reach-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  .reach-card {
    background: var(--white);
    border: 1px solid var(--cream-dark);
    border-radius: 3px;
    padding: 1.2rem; text-align: center;
    box-shadow: 0 2px 6px var(--shadow);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
  }
  .reach-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(255,107,26,0.05));
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .reach-card:hover {
    transform: translateY(-8px) rotateY(5deg);
    box-shadow: 0 12px 24px var(--shadow), 0 0 20px rgba(212,175,55,0.15);
    border-color: var(--gold);
  }
  .reach-card:hover::before { opacity: 1; }
  .reach-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    transition: all 0.4s ease;
    animation: float 3s ease-in-out infinite;
  }
  .reach-card:hover .reach-icon { animation: spinRotate 0.6s ease forwards; }
  .reach-title { font-family: 'Cinzel', serif; color: var(--maroon); font-size: 0.85rem; margin-bottom: 0.3rem; transition: all 0.3s ease; }
  .reach-card:hover .reach-title { color: var(--saffron); }
  .reach-desc { color: var(--text-mid); font-size: 0.9rem; line-height: 1.5; transition: all 0.3s ease; }
  .reach-card:hover .reach-desc { color: var(--text-dark); }

  /* ── Admin ── */
  .admin-login-wrap {
    display: flex; align-items: center; justify-content: center;
    min-height: calc(100vh - 68px);
    background: linear-gradient(160deg, var(--cream) 0%, var(--cream-dark) 100%);
    padding: 2rem;
  }
  .login-box {
    background: var(--white);
    border: 1px solid var(--cream-dark);
    border-top: 5px solid var(--maroon-dark);
    border-radius: 4px;
    padding: 3rem 2.5rem; width: 100%; max-width: 420px;
    box-shadow: 0 8px 32px var(--shadow);
    text-align: center;
  }
  .login-box h2 { font-family: 'Cinzel Decorative', serif; color: var(--maroon-dark); font-size: 1.5rem; margin-bottom: 0.3rem; }
  .login-box p { color: var(--text-mid); font-style: italic; margin-bottom: 2rem; }
  .admin-wrap { max-width: 1200px; margin: 0 auto; padding: 2rem 2rem 4rem; }
  .admin-header {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
    gap: 1rem; margin-bottom: 2rem;
    background: var(--white);
    border: 1px solid var(--cream-dark); border-left: 5px solid var(--maroon);
    border-radius: 4px; padding: 1.2rem 1.5rem;
    box-shadow: 0 2px 8px var(--shadow);
  }
  .admin-title { font-family: 'Cinzel', serif; color: var(--maroon); font-size: 1.1rem; letter-spacing: 0.08em; }
  .admin-table-wrap { overflow-x: auto; background: var(--white); border-radius: 4px; border: 1px solid var(--cream-dark); box-shadow: 0 2px 8px var(--shadow); }
  table { width: 100%; border-collapse: collapse; }
  th {
    background: var(--maroon-dark); color: var(--gold-light);
    font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 14px 16px; text-align: left;
  }
  td { padding: 12px 16px; border-bottom: 1px solid var(--cream-dark); color: var(--text-dark); font-size: 0.95rem; vertical-align: middle; }
  tr:hover td { background: rgba(107,26,26,0.03); }
  .action-btns { display: flex; gap: 6px; flex-wrap: wrap; }
  .btn-sm {
    padding: 5px 12px; border-radius: 3px; cursor: pointer;
    font-family: 'Cinzel', serif; font-size: 0.68rem; letter-spacing: 0.08em; font-weight: 700;
    border: none; text-transform: uppercase; transition: all 0.2s;
  }
  .btn-edit { background: rgba(212,175,55,0.2); color: var(--maroon-dark); border: 1px solid var(--gold); }
  .btn-edit:hover { background: var(--gold); color: var(--maroon-dark); }
  .btn-delete { background: rgba(229,62,62,0.1); color: #C53030; border: 1px solid rgba(229,62,62,0.3); }
  .btn-delete:hover { background: #C53030; color: white; }
  .btn-toggle { background: rgba(107,26,26,0.1); color: var(--maroon); border: 1px solid rgba(107,26,26,0.3); }
  .btn-toggle:hover { background: var(--maroon); color: var(--cream); }
  .btn-logout { background: rgba(229,62,62,0.1); color: #C53030; border: 1px solid rgba(229,62,62,0.3); font-family: 'Cinzel', serif; font-size: 0.75rem; padding: 8px 16px; border-radius: 3px; cursor: pointer; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
  .btn-logout:hover { background: #C53030; color: white; }
  .btn-add { background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-mid) 100%); color: var(--cream); border: none; font-family: 'Cinzel', serif; font-size: 0.75rem; padding: 10px 20px; border-radius: 3px; cursor: pointer; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; box-shadow: 0 2px 8px rgba(107,26,26,0.3); }
  .btn-add:hover { background: linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 100%); transform: translateY(-1px); }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.6);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem; backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease;
  }
  .modal {
    background: var(--white);
    border: 1px solid var(--cream-dark);
    border-top: 5px solid var(--maroon-dark);
    border-radius: 4px;
    padding: 2rem; width: 100%; max-width: 500px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.3), 0 0 40px rgba(212,175,55,0.15);
    animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
  }
  .modal::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,175,55,0.05), rgba(255,107,26,0.03));
    z-index: 0;
  }
  .modal h3 {
    font-family: 'Cinzel', serif;
    color: var(--maroon);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    letter-spacing: 0.08em;
    position: relative;
    z-index: 1;
    animation: slideInLeft 0.4s ease;
  }
  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 1.5rem;
    position: relative;
    z-index: 1;
  }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 3000;
    padding: 16px 28px; border-radius: 8px; font-family: 'Cinzel', serif;
    font-size: 0.85rem; letter-spacing: 0.06em;
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
    animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), slideOutRight 0.4s ease 2.6s forwards;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    position: relative;
  }
  .toast::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    pointer-events: none;
  }
  .toast-success {
    background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
    color: var(--gold-light);
    border-left: 4px solid var(--gold);
    box-shadow: 0 12px 40px rgba(107,26,26,0.4), 0 0 30px rgba(212,175,55,0.2);
  }
  .toast-error {
    background: linear-gradient(135deg, #C53030, #E53E3E);
    color: white;
    border-left: 4px solid #FC8181;
    box-shadow: 0 12px 40px rgba(197,48,48,0.4), 0 0 30px rgba(252,129,129,0.2);
  }
  @keyframes slideOutRight { to { opacity: 0; transform: translateX(400px); } }

  /* ── Animations ── */
  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
  
  /* ── Advanced Animations ── */
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 5px rgba(212,175,55,0.3), 0 0 10px rgba(212,175,55,0.2); }
    50% { text-shadow: 0 0 20px rgba(212,175,55,0.8), 0 0 30px rgba(212,175,55,0.5); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes rotate3d {
    0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
    100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-15px) translateX(-5px); }
    50% { transform: translateY(-25px) translateX(5px); }
    75% { transform: translateY(-15px) translateX(-5px); }
  }
  
  @keyframes waveBorder {
    0%, 100% { clip-path: polygon(0 50%, 0 0, 100% 0, 100% 50%, 100% 100%, 0 100%); }
    50% { clip-path: polygon(0 45%, 0 0, 100% 0, 100% 55%, 100% 100%, 0 100%); }
  }
  
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes expandIn {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  }
  
  @keyframes bounceIn {
    0% { opacity: 0; transform: scale(0.3); }
    50% { opacity: 1; transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
  
  @keyframes rainbowGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  /* ── Footer ── */
  .footer {
    background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
    color: rgba(253,246,227,0.6);
    text-align: center; padding: 2rem;
    font-size: 0.9rem; font-style: italic;
    border-top: 2px solid var(--gold);
    position: relative;
    overflow: hidden;
  }
  .footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent);
    animation: shimmer 3s ease infinite;
  }
  .footer span {
    color: var(--gold);
    animation: glow 2.5s ease-in-out infinite;
  }
  .footer p {
    position: relative;
    z-index: 1;
  }

  /* ── Responsive ── */
  @media (max-width: 600px) {
    .form-row { grid-template-columns: 1fr; }
    .nav-links { gap: 0; }
    .nav-link { padding: 8px 8px; font-size: 0.7rem; }
    .admin-header { flex-direction: column; align-items: flex-start; }
  }

  /* ════════════════════════════════════════════════════════════════
     ADVANCED FUTURISTIC EFFECTS – NEW IN v3.0
  ════════════════════════════════════════════════════════════════ */

  /* ── Neon Glow Border Effect ── */
  @keyframes neonGlow {
    0% { box-shadow: 0 0 5px rgba(0,217,255,0.3), inset 0 0 5px rgba(0,217,255,0.1); }
    50% { box-shadow: 0 0 20px rgba(0,217,255,0.6), inset 0 0 20px rgba(0,217,255,0.2); }
    100% { box-shadow: 0 0 5px rgba(0,217,255,0.3), inset 0 0 5px rgba(0,217,255,0.1); }
  }

  /* ── Holographic Shimmer ── */
  @keyframes holoShimmer {
    0% { transform: translateY(-100%) rotateX(80deg); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(100%) rotateX(80deg); opacity: 0; }
  }

  /* ── Cyber Grid ── */
  @keyframes cyberGrid {
    0% { background-position: 0 0, 0 0; }
    100% { background-position: 100px 100px, 40px 60px; }
  }

  /* ── Floating Hologram ── */
  @keyframes floatGlitch {
    0%, 100% { transform: translateY(0) skew(0deg); }
    20% { transform: translateY(-12px) skew(-1deg); }
    40% { transform: translateY(0) skew(0deg); }
    60% { transform: translateY(-8px) skew(1deg); }
    80% { transform: translateY(0) skew(-1deg); }
  }

  /* ── Cyber Pulse ── */
  @keyframes cyberPulse {
    0%, 100% { filter: drop-shadow(0 0 2px rgba(0,217,255,0.3)) drop-shadow(0 0 5px rgba(157,78,221,0.2)); }
    50% { filter: drop-shadow(0 0 8px rgba(0,217,255,0.8)) drop-shadow(0 0 15px rgba(157,78,221,0.6)); }
  }

  /* ── Scifi Text Animation ── */
  @keyframes scifiText {
    0%, 19%, 21%, 58%, 60%, 100% { text-shadow: -2px 0 #00D9FF, 2px 0 #FF006E, -4px -8px 0 #00D9FF, 4px -8px 0 #FF006E; }
    20%, 24%, 55% { text-shadow: 2px 10px 0 rgba(0,217,255,0.5); }
    25%, 54% { text-shadow: -2px -10px 0 rgba(255,0,110,0.5); }
    55% { text-shadow: -2px 0 #9D4EDD, 2px 0 #FF6B1A; }
  }

  /* ── Quantum State Change ── */
  @keyframes quantumFlip {
    0% { transform: perspective(1000px) rotateY(0) rotateX(0); opacity: 1; }
    50% { transform: perspective(1000px) rotateY(180deg) rotateX(10deg); opacity: 0.7; }
    100% { transform: perspective(1000px) rotateY(360deg) rotateX(0); opacity: 1; }
  }

  /* ── Particles/Micro Animation ── */
  .particle-effect {
    position: absolute;
    pointer-events: none;
  }
  .particle-glow {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    animation: particleDrift 8s ease-out forwards;
    opacity: 0.8;
  }
  @keyframes particleDrift {
    0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
  }

  /* ── Gradient Shift ── */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* ── Matrix Code Rain (subtle) ── */
  @keyframes codeRain {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }

  /* ── Cyber Card Enhancement ── */
  .cyber-card {
    position: relative;
    background: linear-gradient(135deg, rgba(0,217,255,0.05), rgba(157,78,221,0.05));
    border: 1px solid rgba(0,217,255,0.2);
    border-radius: 3px;
    overflow: hidden;
  }
  .cyber-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(0,217,255,0.3), transparent);
    animation: holoShimmer 6s infinite;
  }

  /* ── Enhanced Button with Neon ── */
  .btn-neon {
    position: relative;
    border: 2px solid var(--cyan);
    background: transparent;
    color: var(--cyan);
    text-shadow: 0 0 5px rgba(0,217,255,0.5);
    box-shadow: 0 0 10px rgba(0,217,255,0.4), inset 0 0 10px rgba(0,217,255,0.1);
    animation: neonGlow 2s ease-in-out infinite;
    padding: 10px 24px;
    font-family: 'Cinzel', serif;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-neon:hover {
    box-shadow: 0 0 20px rgba(0,217,255,0.8), inset 0 0 20px rgba(0,217,255,0.3);
    transform: scale(1.05);
    color: white;
    text-shadow: 0 0 10px rgba(0,217,255,0.9);
  }

  /* ── Status Indicator with Pulse ── */
  .status-indicator {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: 'Cinzel', serif;
    padding: 6px 12px;
    border-radius: 20px;
    background: rgba(0,217,255,0.1);
    border: 1px solid rgba(0,217,255,0.3);
    color: var(--cyan);
  }
  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--cyan);
    animation: cyberPulse 1.5s ease-in-out infinite, float 3s ease-in-out infinite;
  }

  /* ── Enhanced Tooltip ── */
  .tooltip-futuristic {
    position: relative;
  }
  .tooltip-futuristic::after {
    content: attr(data-tip);
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, rgba(0,217,255,0.9), rgba(157,78,221,0.9));
    border: 1px solid rgba(0,217,255,0.5);
    color: white;
    padding: 8px 12px;
    border-radius: 3px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1000;
    box-shadow: 0 0 15px rgba(0,217,255,0.4);
  }
  .tooltip-futuristic:hover::after {
    opacity: 1;
  }

  /* ── Glitch Character ── */
  @keyframes glitch-1 {
    0% { clip-path: polygon(0 0%, 100% 0%, 100% 5%, 0 5%); transform: translate(-2px, -2px); }
    20% { clip-path: polygon(0 20%, 100% 20%, 100% 25%, 0 25%); transform: translate(2px, 2px); }
    40% { clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%); transform: translate(-2px, 2px); }
    60% { clip-path: polygon(0 70%, 100% 70%, 100% 75%, 0 75%); transform: translate(2px, -2px); }
    100% { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%); transform: translate(0, 0); }
  }

  /* ── Loading Animation v2 ── */
  .spinner-modern {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0,217,255,0.1);
    border-top: 3px solid var(--cyan);
    border-right: 3px solid var(--purple);
    border-radius: 50%;
    animation: spinModern 1s linear infinite, pulse 2s ease-in-out infinite;
  }
  @keyframes spinModern {
    to { transform: rotate(360deg); }
  }

  /* ── Data Visualization Bar ── */
  .bar-chart-futuristic {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 40px;
    position: relative;
  }
  .bar-segment {
    flex: 1;
    background: linear-gradient(to top, var(--cyan), var(--purple));
    border-radius: 2px 2px 0 0;
    min-height: 8px;
    animation: barGrow 0.6s ease-out backwards;
    box-shadow: 0 0 8px rgba(0,217,255,0.4);
  }
  .bar-segment:nth-child(1) { animation-delay: 0.1s; }
  .bar-segment:nth-child(2) { animation-delay: 0.2s; }
  .bar-segment:nth-child(3) { animation-delay: 0.3s; }
  @keyframes barGrow {
    from { height: 0; opacity: 0; }
    to { height: var(--h, 50%); opacity: 1; }
  }

  /* ── Hologram Frame Effect ── */
  .hologram-frame {
    position: relative;
    border: 2px solid var(--cyan);
    box-shadow: inset 0 0 10px rgba(0,217,255,0.2), 0 0 20px rgba(0,217,255,0.3);
  }
  .hologram-frame::before,
  .hologram-frame::after {
    content: '';
    position: absolute;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    height: 2px;
    width: 100%;
    animation: slideHolo 3s ease-in-out infinite;
  }
  .hologram-frame::before {
    top: 0;
  }
  .hologram-frame::after {
    bottom: 0;
    animation-delay: 1.5s;
  }
  @keyframes slideHolo {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  /* ── Cyber Success State ── */
  .success-pulse {
    animation: successGlow 0.6s ease-out;
  }
  @keyframes successGlow {
    0% { box-shadow: 0 0 0 0 rgba(34,139,34,0.7); }
    70% { box-shadow: 0 0 0 25px rgba(34,139,34,0); }
  }

  /* ── Enhanced Loading Screen ── */
  .loading-overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, rgba(74,14,14,0.9), rgba(0,0,0,0.95));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
  }
  .loading-text {
    color: var(--cyan);
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    animation: scifiText 0.8s ease forwards;
  }

  /* ── Cyber Link Hover ── */
  a.cyber-link {
    position: relative;
    color: var(--cyan);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
  }
  a.cyber-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--cyan);
    transition: width 0.3s ease;
    box-shadow: 0 0 10px rgba(0,217,255,0.5);
  }
  a.cyber-link:hover::after {
    width: 100%;
  }
`;


// ─────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return <div className={`toast toast-${type}`}>{msg}</div>;
}

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "timings", label: "Darshan" },
    { id: "booking", label: "Booking" },
    { id: "about", label: "About" },
    { id: "admin", label: "Admin" },
  ];
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setPage("home")}>
        <span className="om-symbol">ॐ</span>
        <span>Yadadri Temple</span>
      </div>
      <div className="nav-links">
        {links.map((l) => (
          <button
            key={l.id}
            className={`nav-link${page === l.id ? " active" : ""}${l.id === "admin" ? " admin-link" : ""}`}
            onClick={() => setPage(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-badge">Sri Yadadri Kshetram · Telangana</div>
        <h1 className="hero-title">Yadadri Temple<br />Tourism</h1>
        <div className="hero-deity">Sri Lakshmi Narasimha Swamy Devasthanam</div>
        <p className="hero-tagline">
          "Where devotion meets divinity — seek blessings at the sacred abode of the Lord on the hill."
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => setPage("timings")}>View Darshan Timings</button>
          <button className="btn-secondary" onClick={() => setPage("booking")}>Book a Seva</button>
        </div>
      </div>

      <div className="features">
        <div className="features-grid">
          {[
            { icon: "🕌", title: "Sacred Darshan", desc: "Multiple seva slots daily for a blessed experience with the Lord." },
            { icon: "📅", title: "Easy Booking", desc: "Book your darshan slot in advance, hassle-free from anywhere." },
            { icon: "🛕", title: "Temple History", desc: "Over 5,000 years of spiritual significance and Puranic importance." },
            { icon: "🗺️", title: "How to Reach", desc: "Well-connected by road, rail and air from Hyderabad & beyond." },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>🙏 <span>Jai Sri Lakshmi Narasimha Swamy</span> 🙏</p>
        <p style={{ marginTop: "6px" }}>© 2025 Yadadri Temple Tourism. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DARSHAN TIMINGS PAGE
// ─────────────────────────────────────────────────────────────────
const DEMO_TIMINGS = [
  { id: 1, sevaName: "Suprabhatam Darshan", timeSlot: "04:30 AM – 05:30 AM", price: "Free", capacity: 500, dayAvailability: "All Days", active: true },
  { id: 2, sevaName: "Thomala Seva", timeSlot: "07:00 AM – 08:00 AM", price: "Paid", capacity: 100, dayAvailability: "All Days", active: true },
  { id: 3, sevaName: "Asthadala Pada Padmaradhana", timeSlot: "08:00 AM – 09:00 AM", price: "Paid", capacity: 50, dayAvailability: "Friday, Sunday", active: true },
  { id: 4, sevaName: "Nijaroopa Darshan", timeSlot: "10:00 AM – 12:00 PM", price: "Free", capacity: 1000, dayAvailability: "All Days", active: true },
  { id: 5, sevaName: "Ekanta Seva", timeSlot: "01:00 PM – 02:00 PM", price: "Paid", capacity: 80, dayAvailability: "All Days", active: true },
  { id: 6, sevaName: "Dolotsavam", timeSlot: "05:00 PM – 06:00 PM", price: "Paid", capacity: 60, dayAvailability: "Friday, Sunday", active: false },
  { id: 7, sevaName: "Evening Darshan", timeSlot: "06:00 PM – 08:00 PM", price: "Free", capacity: 800, dayAvailability: "All Days", active: true },
  { id: 8, sevaName: "Pavitrotsavam Seva", timeSlot: "08:30 PM – 09:30 PM", price: "Paid", capacity: 40, dayAvailability: "Friday", active: true },
];

function DarshanPage() {
  const [timings, setTimings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${BASE_URL}/api/darshan/public/timings`)
      .then((r) => r.json())
      .then((data) => { setTimings(data); setLoading(false); })
      .catch(() => { setTimings(DEMO_TIMINGS); setLoading(false); });
  }, []);

  const filtered = timings.filter((t) => {
    if (filter === "free") return t.price === "Free";
    if (filter === "paid") return t.price === "Paid";
    if (filter === "friday") return t.dayAvailability?.toLowerCase().includes("friday");
    if (filter === "sunday") return t.dayAvailability?.toLowerCase().includes("sunday");
    return true;
  });

  return (
    <div className="page">
      <div className="section-heading">
        <h2>Darshan Timings</h2>
        <p>Plan your sacred visit with our complete seva schedule</p>
      </div>
      <div className="divider"><div className="divider-line" /><span className="divider-symbol">✦</span><div className="divider-line" /></div>

      <div className="filter-bar">
        {[["all","All Sevas"],["free","Free Darshan"],["paid","Paid Seva"],["friday","Friday"],["sunday","Sunday"]].map(([val, lbl]) => (
          <button key={val} className={`filter-btn${filter === val ? " active" : ""}`} onClick={() => setFilter(val)}>{lbl}</button>
        ))}
      </div>

      {loading ? (
        <div className="spinner-wrap"><div className="spinner" /></div>
      ) : (
        <div className="cards-container">
          <div className="cards-grid">
            {filtered.map((t) => (
              <div className="timing-card" key={t.id}>
                <div className="card-seva">{t.sevaName}</div>
                <div className="card-row"><span className="icon">🕐</span> {t.timeSlot}</div>
                <div className="card-row"><span className="icon">👥</span> Capacity: {t.capacity}</div>
                <div className="card-row"><span className="icon">📅</span> {t.dayAvailability}</div>
                <div style={{ marginTop: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <span className={`badge ${t.price === "Free" ? "badge-free" : "badge-paid"}`}>{t.price}</span>
                  {!t.active && <span className="badge badge-inactive">Inactive</span>}
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p style={{ textAlign:"center", color:"var(--text-mid)", padding:"3rem", fontStyle:"italic" }}>No timings found for this filter.</p>}
        </div>
      )}
      <footer className="footer">© 2025 Yadadri Temple Tourism</footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// BOOKING PAGE
// ─────────────────────────────────────────────────────────────────
const SEVA_OPTIONS = [
  "Suprabhatam Darshan", "Thomala Seva", "Asthadala Pada Padmaradhana",
  "Nijaroopa Darshan", "Ekanta Seva", "Dolotsavam", "Evening Darshan", "Pavitrotsavam Seva"
];

function BookingPage({ showToast }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", seva: "", people: "1" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Devotee name is required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.date) e.date = "Please select a date";
    if (!form.seva) e.seva = "Please select a seva type";
    if (!form.people || form.people < 1) e.people = "At least 1 person required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
    showToast("🙏 Booking submitted successfully! Jai Sri Lakshmi Narasimha!", "success");
    setForm({ name: "", phone: "", date: "", seva: "", people: "1" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="page">
      <div className="section-heading">
        <h2>Book a Darshan</h2>
        <p>Reserve your sacred slot at the temple</p>
      </div>
      <div className="divider"><div className="divider-line" /><span className="divider-symbol">✦</span><div className="divider-line" /></div>

      <div className="booking-wrap">
        {submitted && (
          <div style={{ background: "rgba(34,139,34,0.08)", border: "1px solid rgba(34,139,34,0.3)", borderRadius: "4px", padding: "1.2rem", marginBottom: "1.5rem", textAlign: "center", fontFamily: "'Cinzel', serif", color: "#228B22" }}>
            🙏 Your booking has been received. We'll confirm shortly!
          </div>
        )}

        <div className="booking-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Devotee Name</label>
              <input className={`form-input${errors.name ? " error" : ""}`} placeholder="Enter full name" value={form.name} onChange={update("name")} />
              {errors.name && <div className="error-msg">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className={`form-input${errors.phone ? " error" : ""}`} placeholder="10-digit mobile" value={form.phone} onChange={update("phone")} maxLength={10} />
              {errors.phone && <div className="error-msg">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Darshan Date</label>
              <input type="date" className={`form-input${errors.date ? " error" : ""}`} value={form.date} onChange={update("date")} min={new Date().toISOString().split("T")[0]} />
              {errors.date && <div className="error-msg">{errors.date}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">No. of People</label>
              <input type="number" className={`form-input${errors.people ? " error" : ""}`} min="1" max="10" value={form.people} onChange={update("people")} />
              {errors.people && <div className="error-msg">{errors.people}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Seva Type</label>
            <select className={`form-select${errors.seva ? " error" : ""}`} value={form.seva} onChange={update("seva")}>
              <option value="">— Select a Seva —</option>
              {SEVA_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.seva && <div className="error-msg">{errors.seva}</div>}
          </div>

          <button className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} onClick={handleSubmit}>
            🙏 Submit Booking
          </button>
        </div>
      </div>
      <footer className="footer">© 2025 Yadadri Temple Tourism</footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div className="page">
      <div className="section-heading">
        <h2>About Yadadri</h2>
        <p>The sacred hill of Sri Lakshmi Narasimha Swamy</p>
      </div>
      <div className="divider"><div className="divider-line" /><span className="divider-symbol">✦</span><div className="divider-line" /></div>

      <div className="about-wrap">
        <div className="about-section">
          <h3>🛕 Temple History</h3>
          <p>Yadadri (Yadagirigutta) is one of the most revered Vaishnava shrines in South India, located about 60 km from Hyderabad in Telangana. The temple is dedicated to Sri Lakshmi Narasimha Swamy, the fierce yet compassionate avatar of Lord Vishnu.</p>
          <p>The name "Yadadri" is derived from the sage Yada, who is believed to have performed intense penance on this hill and received the divine vision of Lord Narasimha. The Puranas narrate that this is one of the eight Narasimha Kshetrams and holds immense spiritual significance.</p>
        </div>

        <div className="about-section">
          <h3>✨ Spiritual Importance</h3>
          <p>The presiding deity appears in five forms — Jwala Narasimha, Gandabherunda Narasimha, Yogananda Narasimha, Uma Narasimha, and Lakshmi Narasimha — each symbolising a unique aspect of divine grace.</p>
          <p>Devotees from across India and abroad visit the temple, especially on Fridays, Ekadashi, and Karthika Masam, seeking blessings for health, prosperity, and liberation. The temple recently underwent a grand renovation under the Telangana government and reopened with elevated splendour.</p>
        </div>

        <div className="about-section">
          <h3>📍 Location</h3>
          <p>Yadagirigutta, Yadadri Bhongir District, Telangana – 508115, India.</p>
          <p>The temple is situated on a rocky hill and is accessible by steps or elevator (for senior devotees and differently-abled persons).</p>
        </div>

        <div className="about-section">
          <h3>🚗 How to Reach</h3>
          <div className="reach-grid">
            {[
              { icon: "🚗", title: "By Road", desc: "60 km from Hyderabad. TSRTC buses operate frequently. Private cabs and autos available from NH65." },
              { icon: "🚂", title: "By Train", desc: "Nearest station: Bhongir (18 km). Secunderabad to Bhongir trains run regularly. Auto/taxi from station." },
              { icon: "✈️", title: "By Air", desc: "Rajiv Gandhi International Airport, Hyderabad (~75 km). Taxis & car rentals available to the temple." },
            ].map((r) => (
              <div className="reach-card" key={r.title}>
                <div className="reach-icon">{r.icon}</div>
                <div className="reach-title">{r.title}</div>
                <div className="reach-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="footer">© 2025 Yadadri Temple Tourism</footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ADMIN PAGE
// ─────────────────────────────────────────────────────────────────
const BLANK_TIMING = { sevaName: "", timeSlot: "", price: "Free", capacity: "", dayAvailability: "All Days", active: true };

function AdminPage({ showToast }) {
  const [token, setToken] = useState(null);
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [loginErr, setLoginErr] = useState("");
  const [timings, setTimings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // { mode: "add"|"edit", data }

  // ── Login ──
  const doLogin = async () => {
    setLoginErr("");
    try {
      const r = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (!r.ok) throw new Error("Invalid credentials");
      const d = await r.json();
      setToken(d.token || "demo-token");
      loadTimings(d.token || "demo-token");
    } catch {
      // Demo fallback
      if (creds.username === "admin" && creds.password === "admin123") {
        setToken("demo-token");
        setTimings(DEMO_TIMINGS);
      } else {
        setLoginErr("Invalid username or password.");
      }
    }
  };

  const loadTimings = async (t) => {
    setLoading(true);
    try {
      const r = await fetch(`${BASE_URL}/api/darshan/admin/timings`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      const d = await r.json();
      setTimings(d);
    } catch {
      setTimings(DEMO_TIMINGS);
    }
    setLoading(false);
  };

  const doSave = async () => {
    const { mode, data } = modal;
    if (!data.sevaName || !data.timeSlot || !data.capacity) {
      showToast("Please fill all required fields.", "error"); return;
    }
    try {
      const url = mode === "add"
        ? `${BASE_URL}/api/darshan/admin/timings`
        : `${BASE_URL}/api/darshan/admin/timings/${data.id}`;
      await fetch(url, {
        method: mode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
    } catch {}
    if (mode === "add") {
      setTimings((prev) => [...prev, { ...data, id: Date.now() }]);
    } else {
      setTimings((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    }
    setModal(null);
    showToast(mode === "add" ? "Timing added successfully!" : "Timing updated successfully!", "success");
  };

  const doDelete = async (id) => {
    if (!window.confirm("Delete this timing?")) return;
    try {
      await fetch(`${BASE_URL}/api/darshan/admin/timings/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    setTimings((prev) => prev.filter((t) => t.id !== id));
    showToast("Timing deleted.", "success");
  };

  const doToggle = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/darshan/admin/timings/${id}/toggle`, {
        method: "PATCH", headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    setTimings((prev) => prev.map((t) => t.id === id ? { ...t, active: !t.active } : t));
  };

  const updateModal = (k) => (e) =>
    setModal((m) => ({ ...m, data: { ...m.data, [k]: e.target.value } }));

  // ── Login form ──
  if (!token) {
    return (
      <div className="page">
        <div className="admin-login-wrap">
          <div className="login-box">
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔐</div>
            <h2>Admin Login</h2>
            <p>Secure access for temple administrators</p>
            {loginErr && <div style={{ background: "rgba(229,62,62,0.1)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: "3px", padding: "10px", color: "#C53030", marginBottom: "1rem", fontSize: "0.9rem" }}>{loginErr}</div>}
            <div className="form-group" style={{ textAlign: "left" }}>
              <label className="form-label">Username</label>
              <input className="form-input" placeholder="admin" value={creds.username} onChange={(e) => setCreds((c) => ({ ...c, username: e.target.value }))} />
            </div>
            <div className="form-group" style={{ textAlign: "left" }}>
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="••••••••" value={creds.password} onChange={(e) => setCreds((c) => ({ ...c, password: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && doLogin()} />
            </div>
            <button className="btn-primary" style={{ width: "100%" }} onClick={doLogin}>Login to Dashboard</button>
            <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-mid)", fontStyle: "italic" }}>Demo: admin / admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="admin-wrap">
        <div className="admin-header">
          <div>
            <div className="admin-title">🛕 Admin Dashboard — Darshan Timings</div>
            <div style={{ color: "var(--text-mid)", fontSize: "0.9rem", fontStyle: "italic", marginTop: "2px" }}>Manage all darshan slots and seva schedules</div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button className="btn-add" onClick={() => setModal({ mode: "add", data: { ...BLANK_TIMING } })}>+ Add Timing</button>
            <button className="btn-logout" onClick={() => { setToken(null); setTimings([]); }}>Logout</button>
          </div>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Seva Name</th><th>Time Slot</th><th>Price</th>
                  <th>Capacity</th><th>Days</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {timings.map((t, i) => (
                  <tr key={t.id}>
                    <td style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}>{i + 1}</td>
                    <td style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", color: "var(--maroon)", fontWeight: "600" }}>{t.sevaName}</td>
                    <td>{t.timeSlot}</td>
                    <td><span className={`badge ${t.price === "Free" ? "badge-free" : "badge-paid"}`}>{t.price}</span></td>
                    <td>{t.capacity}</td>
                    <td style={{ fontSize: "0.88rem" }}>{t.dayAvailability}</td>
                    <td><span className={`badge ${t.active ? "badge-free" : "badge-inactive"}`}>{t.active ? "Active" : "Inactive"}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-sm btn-edit" onClick={() => setModal({ mode: "edit", data: { ...t } })}>Edit</button>
                        <button className="btn-sm btn-toggle" onClick={() => doToggle(t.id)}>{t.active ? "Deactivate" : "Activate"}</button>
                        <button className="btn-sm btn-delete" onClick={() => doDelete(t.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <h3>{modal.mode === "add" ? "➕ Add New Timing" : "✏️ Edit Timing"}</h3>
            <div className="form-group">
              <label className="form-label">Seva Name *</label>
              <input className="form-input" value={modal.data.sevaName} onChange={updateModal("sevaName")} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Time Slot *</label>
                <input className="form-input" placeholder="e.g. 06:00 AM – 07:00 AM" value={modal.data.timeSlot} onChange={updateModal("timeSlot")} />
              </div>
              <div className="form-group">
                <label className="form-label">Capacity *</label>
                <input type="number" className="form-input" value={modal.data.capacity} onChange={updateModal("capacity")} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Price</label>
                <select className="form-select" value={modal.data.price} onChange={updateModal("price")}>
                  <option>Free</option><option>Paid</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Day Availability</label>
                <select className="form-select" value={modal.data.dayAvailability} onChange={updateModal("dayAvailability")}>
                  <option>All Days</option><option>Friday</option><option>Sunday</option>
                  <option>Friday, Sunday</option><option>Weekdays</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" style={{ padding: "9px 20px", fontSize: "0.8rem" }} onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" style={{ padding: "9px 24px", fontSize: "0.8rem" }} onClick={doSave}>
                {modal.mode === "add" ? "Add Timing" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">© 2025 Yadadri Temple Tourism</footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  return (
    <>
      <style>{COLORS + GLOBAL_STYLES}</style>
      <Navbar page={page} setPage={setPage} />

      {/* Version Display - Floating Badge */}
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 100,
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: "'Cinzel', serif",
        padding: '4px 12px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(0,217,255,0.1), rgba(157,78,221,0.1))',
        border: '1px solid rgba(0,217,255,0.3)',
        color: 'var(--cyan)',
        animation: 'float 4s ease-in-out infinite',
      }}>
        v3.0 ✨
      </div>

      {page === "home"    && <HomePage setPage={setPage} />}
      {page === "timings" && <DarshanPage />}
      {page === "booking" && <BookingPage showToast={showToast} />}
      {page === "about"   && <AboutPage />}
      {page === "admin"   && <AdminPage showToast={showToast} />}

      {toast && (
        <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
