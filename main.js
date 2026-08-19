/**
 * DataBridge Enterprise Marketing Website - Interactive Engine & Scripts
 * Features: Live Pipeline Simulator, ROI Calculator, Interactive Diagram Controller,
 * ScrollSpy, Mobile Drawer, Form Validation, and Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPagePreloader();
  initScrollReveal();
  initNavbarScroll();
  initMobileDrawer();
  initPipelineSimulator();
  initRoiCalculator();
  initFaqAccordion();
  initDemoForm();
  initBackToTop();
  initSmoothScroll();
  // Impeccable UI Upgrades
  initScrollProgress();
  initAmbientCanvas();
  initSpotlightEffect();
  initHeroNodeTooltips();
  initCodeCopy();
  // 3D Flip Card + Executive BI Dashboard
  initHeroFlipCard();
  initBiDashboard();
});

/* --------------------------------------------------------------------------
   0. High-Tech Enterprise Initial Page Preloader
   -------------------------------------------------------------------------- */
function initPagePreloader() {
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');
  const statusText = document.getElementById('preloader-status-text');

  if (!preloader || !bar) return;

  const steps = [
    { pct: 28, msg: 'INITIALIZING CREDENTIAL ENCRYPTION...' },
    { pct: 62, msg: 'INTROSPECTING ENTERPRISE CATALOGS...' },
    { pct: 88, msg: 'CALIBRATING IN-MEMORY STREAM BUFFER...' },
    { pct: 100, msg: '100% READY // PIPELINE ORCHESTRATOR ONLINE' }
  ];

  let currentStep = 0;

  function runNext() {
    if (currentStep < steps.length) {
      const s = steps[currentStep];
      bar.style.width = `${s.pct}%`;
      if (statusText) statusText.textContent = s.msg;
      currentStep++;
      setTimeout(runNext, 110);
    } else {
      setTimeout(() => {
        preloader.classList.add('loaded');
        // Trigger any hero counters
        document.querySelectorAll('.hero-metrics .counter-item').forEach(c => animateCounter(c));
      }, 180);
    }
  }

  setTimeout(runNext, 50);
}

/* --------------------------------------------------------------------------
   0.1 Scroll-Driven Reveal Observer & Number Counter
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Check if element itself is a counter or has child counters
        if (entry.target.classList.contains('counter-item') && !entry.target.classList.contains('counted')) {
          animateCounter(entry.target);
        }
        const childCounters = entry.target.querySelectorAll('.counter-item:not(.counted)');
        childCounters.forEach(c => animateCounter(c));

        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  if (el.classList.contains('counted')) return;
  el.classList.add('counted');

  const target = parseFloat(el.getAttribute('data-target') || '0');
  const suffix = el.getAttribute('data-suffix') || '';
  const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
  const duration = 1200;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutExpo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = target * ease;

    if (decimals > 0) {
      el.textContent = currentVal.toFixed(decimals) + suffix;
    } else {
      el.textContent = Math.floor(currentVal) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (decimals > 0) {
        el.textContent = target.toFixed(decimals) + suffix;
      } else {
        el.textContent = target + suffix;
      }
    }
  }

  requestAnimationFrame(update);
}

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & ScrollSpy
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active state
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const openBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!openBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   3. Live Pipeline Simulator Sandbox
   -------------------------------------------------------------------------- */
function initPipelineSimulator() {
  const runBtn = document.getElementById('btn-run-simulation');
  const logContainer = document.getElementById('simulator-log-stream');
  const sourceSelect = document.getElementById('sim-source-db');
  const strategySelect = document.getElementById('sim-strategy');
  const targetSelect = document.getElementById('sim-target-wh');
  const statusBadge = document.getElementById('sim-status-badge');
  const speedIndicator = document.getElementById('sim-throughput');

  if (!runBtn || !logContainer) return;

  let isRunning = false;

  const simulationScenarios = {
    oracle: {
      driver: 'Oracle cx_Oracle / SQLAlchemy Driver',
      tables: 'FINANCIAL_ORDERS, AR_INVOICES, GL_TRANSACTIONS',
      proc: 'sp_CalculateMonthlyAccruals (Seq: 1, Group: A)'
    },
    mssql: {
      driver: 'Microsoft ODBC Driver 18 for SQL Server',
      tables: 'SalesOrderHeader, FactInventoryDaily, DimCustomer',
      proc: 'sp_UpdateInventoryBalances (Seq: 2, Group: B)'
    },
    excel: {
      driver: 'OpenXML Sheet Ingestion Engine',
      tables: 'Q4_Financial_Report.xlsx, MonthlyExpenses.csv',
      proc: 'sp_ConsolidateExcelStaging (Seq: 1, Group: A)'
    },
    sharepoint: {
      driver: 'Microsoft Graph API SharePoint List Engine',
      tables: 'VendorDirectory_List, ProjectTracker_List',
      proc: 'sp_SyncSharePointListState (Seq: 1, Group: A)'
    }
  };

  runBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = `<span>⚡ Orchestrating Pipeline...</span>`;
    statusBadge.textContent = 'RUNNING';
    statusBadge.className = 'log-tag warn';
    logContainer.innerHTML = '';

    const source = sourceSelect ? sourceSelect.value : 'oracle';
    const strategy = strategySelect ? strategySelect.value : 'append';
    const target = targetSelect ? targetSelect.value : 'oracle_wh';
    const meta = simulationScenarios[source] || simulationScenarios.oracle;

    const logSteps = [
      { text: `[INIT] Mapped Source: [${source.toUpperCase()}] -> Target Warehouse: [${target.toUpperCase()}]...`, tag: 'info', delay: 100 },
      { text: `[EXTRACT] Pulling data from ${source.toUpperCase()} via ${meta.driver}...`, tag: 'info', delay: 400 },
      { text: `[STAGE] Staged extracted dataset as CSV file buffer: [stg_${source}_raw.csv]`, tag: 'info', delay: 800 },
      { text: `[TABLE_CHECK] Verifying destination table structure in ${target.toUpperCase()} (auto-created if missing)...`, tag: 'info', delay: 1200 },
      { text: `[STRATEGY] Configured Mode: [${strategy.toUpperCase()}]. Checked today's presence -> Auto-merged to prevent duplicates.`, tag: 'info', delay: 1600 },
      { text: `[PROCEDURE] Executing registered source procedure: ${meta.proc}...`, tag: 'warn', delay: 2000 },
      { text: `[PROCEDURE] Procedure execution completed cleanly. Sequence & Parallel group verified.`, tag: 'success', delay: 2400 },
      { text: `[MSAL_AUTH] Authenticating with Azure AD (MSAL Service Principal: Client ID & Tenant ID)...`, tag: 'info', delay: 2800 },
      { text: `[POWER_BI] Polling Power BI REST API for linked semantic model refresh status...`, tag: 'info', delay: 3200 },
      { text: `[POWER_BI] Power BI dataset refresh status: COMPLETED (200 OK)`, tag: 'success', delay: 3600 },
      { text: `[LOGS_VIEW] Transaction Log record created: Extracted: 48,210 | Inserted: 48,210 | Updated: 0 | Errors: 0`, tag: 'success', delay: 4000 }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'log-line';
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

        line.innerHTML = `
          <span class="log-time">${timeStr}</span>
          <span class="log-tag ${step.tag}">${step.tag.toUpperCase()}</span>
          <span>${step.text}</span>
        `;
        logContainer.appendChild(line);
        logContainer.scrollTop = logContainer.scrollHeight;

        if (speedIndicator && step.delay === 1500) {
          speedIndicator.textContent = '184.2 MB/s';
        }
      }, step.delay);
    });

    setTimeout(() => {
      isRunning = false;
      runBtn.disabled = false;
      runBtn.innerHTML = `<span>▶ Run Live Pipeline Simulation</span>`;
      statusBadge.textContent = 'STANDBY / SUCCESS';
      statusBadge.className = 'log-tag success';
    }, 4200);
  });
}

/* --------------------------------------------------------------------------
   4. Interactive ROI & Pipeline Efficiency Calculator
   -------------------------------------------------------------------------- */
function initRoiCalculator() {
  const dbSlider = document.getElementById('slider-sources');
  const volSlider = document.getElementById('slider-volume');
  const dbDisplay = document.getElementById('val-sources-display');
  const volDisplay = document.getElementById('val-volume-display');
  
  const hoursOutput = document.getElementById('roi-hours-saved');
  const efficiencyOutput = document.getElementById('roi-efficiency-gain');

  if (!dbSlider || !volSlider || !hoursOutput) return;

  function calculateROI() {
    const dbCount = parseInt(dbSlider.value, 10);
    const volGB = parseInt(volSlider.value, 10);

    // Display values
    if (dbDisplay) dbDisplay.textContent = `${dbCount} Databases`;
    if (volDisplay) {
      if (volGB >= 1000) {
        volDisplay.textContent = `${(volGB / 1000).toFixed(1)} TB / month`;
      } else {
        volDisplay.textContent = `${volGB} GB / month`;
      }
    }

    // Formulas based on enterprise data engineering benchmark
    const hoursSaved = Math.round(dbCount * 48 + (volGB * 0.15));
    const effortReduced = Math.min(99, Math.round(88 + Math.min(dbCount, 10) * 0.8));

    hoursOutput.textContent = `${hoursSaved.toLocaleString()} hrs / yr`;
    if (efficiencyOutput) {
      efficiencyOutput.textContent = `${effortReduced}%`;
    }
  }

  dbSlider.addEventListener('input', calculateROI);
  volSlider.addEventListener('input', calculateROI);
  calculateROI();
}

/* --------------------------------------------------------------------------
   5. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others for sleek single-open accordion
      faqItems.forEach((other) => {
        other.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Demo Request Form & Modal / Toast
   -------------------------------------------------------------------------- */
function initDemoForm() {
  const form = document.getElementById('enterprise-demo-form');
  if (!form) return;

  // Dynamic API endpoint: Uses localhost during local development, and live server IP/domain when deployed
  const isLocal = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  const CMS_ENQUIRY_URL = isLocal
    ? 'http://localhost:5000/api/public/enquiry'
    : 'http://58.84.14.54:5000/api/public/enquiry'; // Live SAAIT Backend API

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const nameInput = form.querySelector('#demo-name');
    const emailInput = form.querySelector('#demo-email');
    const companyInput = form.querySelector('#demo-company');
    const sourceSys = form.querySelector('#demo-source')?.value || '';
    const targetSys = form.querySelector('#demo-warehouse')?.value || '';
    const messageInput = form.querySelector('#demo-message')?.value || '';

    if (!nameInput.value || !emailInput.value || !companyInput.value) {
      showToast('⚠️ Please complete all required fields.', 'warn');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Provisioning Demo Sandbox...</span>`;
    }

    const payload = {
      site_source: "DataBridge",
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      company_name: companyInput.value.trim(),
      subject: "DataBridge Enterprise Demo Request",
      message: `Source: ${sourceSys}; Target: ${targetSys}; Requirements: ${messageInput}`,
      source_page: "/#demo"
    };

    fetch(CMS_ENQUIRY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>✓ Request Submitted</span>`;
      }
      showToast(`🎉 Demo request received for ${companyInput.value}! An ETL Architect will reach out within 2 hours.`, 'success');
      form.reset();
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = `<span>Request an Enterprise Demo →</span>`;
        }
      }, 5000);
    })
    .catch(err => {
      console.error('CMS submission error:', err);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Request an Enterprise Demo →</span>`;
      }
      showToast('❌ Submission failed. Please try again or contact support directly.', 'error');
    });
  });
}


function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: ${type === 'success' ? '#34D399' : type === 'warn' ? '#FBBF24' : '#38BDF8'}">
      ${type === 'success' ? '✔' : type === 'warn' ? '⚠' : 'ℹ'}
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4500);
}

/* --------------------------------------------------------------------------
   7. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   8. Smooth Scrolling for Internal Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

/* --------------------------------------------------------------------------
   10. Background Ambient Canvas Particle Network
   -------------------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 25), 45);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.45)';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse if near
      const mdx = p.x - mouseX;
      const mdy = p.y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 180) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.25 * (1 - mdist / 180)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   12. Card Mouse Spotlight Tracking
   -------------------------------------------------------------------------- */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('[data-spotlight]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   13. Hero SVG Interactive Node Tooltips
   -------------------------------------------------------------------------- */
function initHeroNodeTooltips() {
  const tooltip = document.getElementById('svg-tooltip');
  const titleEl = document.getElementById('tooltip-title');
  const descEl = document.getElementById('tooltip-desc');
  const statEl = document.getElementById('tooltip-stat');
  const nodes = document.querySelectorAll('.pulse-node[data-tooltip-title]');

  if (!tooltip || !nodes.length) return;

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const title = node.getAttribute('data-tooltip-title');
      const desc = node.getAttribute('data-tooltip-desc');
      const stat = node.getAttribute('data-tooltip-stat');

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (statEl) statEl.textContent = stat;

      tooltip.classList.add('active');
    });

    node.addEventListener('mousemove', (e) => {
      const x = e.clientX + 16;
      const y = e.clientY + 16;

      const tooltipWidth = tooltip.offsetWidth || 280;
      const tooltipHeight = tooltip.offsetHeight || 100;
      const maxX = window.innerWidth - tooltipWidth - 20;
      const maxY = window.innerHeight - tooltipHeight - 20;

      tooltip.style.left = `${Math.min(x, maxX)}px`;
      tooltip.style.top = `${Math.min(y, maxY)}px`;
    });

    node.addEventListener('mouseleave', () => {
      tooltip.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   14. Code Snippet Tab Switching & Copy Utility
   -------------------------------------------------------------------------- */
function initCodeCopy() {
  const tabs = document.querySelectorAll('.code-tab-btn');
  const blocks = document.querySelectorAll('.code-block');
  const copyBtn = document.getElementById('copy-code-btn');

  if (tabs.length && blocks.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        blocks.forEach(b => {
          if (b.id === `code-${targetTab}`) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      });
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const activeBlock = document.querySelector('.code-block.active');
      if (!activeBlock) return;

      const codeText = activeBlock.textContent || activeBlock.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: #34D399;">Copied!</span>
        `;
        if (typeof showToast === 'function') {
          showToast('Code snippet copied to clipboard!', 'success');
        }
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 2200);
      }).catch(() => {
        if (typeof showToast === 'function') {
          showToast('Failed to copy code', 'error');
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   15. Hero 3D Flip Card Toggle
   -------------------------------------------------------------------------- */
function initHeroFlipCard() {
  const container = document.getElementById('hero-flip-container');
  if (!container) return;

  const flipToDashBtn = document.getElementById('flip-to-dashboard-btn');
  const biSvgNode = document.getElementById('bi-svg-trigger-node');
  const flipToPipelineBtn = document.getElementById('flip-to-pipeline-btn');
  const flipBackFooterBtn = document.getElementById('bi-flip-back-footer-btn');

  function flipToDashboard() {
    container.classList.add('flipped');
    startPbiLiveAnimation();
  }

  function flipToPipeline() {
    container.classList.remove('flipped');
  }

  if (flipToDashBtn) flipToDashBtn.addEventListener('click', flipToDashboard);
  if (biSvgNode) biSvgNode.addEventListener('click', flipToDashboard);
  if (flipToPipelineBtn) flipToPipelineBtn.addEventListener('click', flipToPipeline);
  if (flipBackFooterBtn) flipBackFooterBtn.addEventListener('click', flipToPipeline);
}

/* --------------------------------------------------------------------------
   16. Simple & Authentic Power BI Analytics Report (Live & Moving Charts)
   -------------------------------------------------------------------------- */

let pbiAnimFrameId = null;
let pbiStartTime = null;

function startPbiLiveAnimation() {
  if (pbiAnimFrameId) return; // already running

  const areaPath = document.getElementById('pbi-area-path');
  const linePath = document.getElementById('pbi-line-path');
  const dot1 = document.getElementById('pbi-dot-1');
  const dot2 = document.getElementById('pbi-dot-2');
  const val1 = document.getElementById('pbi-val-1');
  const val2 = document.getElementById('pbi-val-2');
  const liveDot = document.getElementById('pbi-live-dot');
  const liveDotOuter = document.getElementById('pbi-live-dot-outer');
  const liveVal = document.getElementById('pbi-live-val');

  const barOracle = document.getElementById('pbi-bar-oracle');
  const barSql = document.getElementById('pbi-bar-sql');
  const valOracle = document.getElementById('pbi-val-oracle');
  const valSql = document.getElementById('pbi-val-sql');
  const tblOracle = document.getElementById('tbl-oracle-vol');
  const tblSql = document.getElementById('tbl-sql-vol');

  const kpiThroughput = document.getElementById('kpi-throughput-val');
  const kpiLatency = document.getElementById('kpi-latency-val');

  pbiStartTime = performance.now();

  function renderPbiFrame(now) {
    const elapsed = (now - pbiStartTime) / 1000;

    // 1. Dynamic Moving Wave Calculations
    const y0 = 58 + Math.sin(elapsed * 1.6) * 3;
    const y1 = 34 + Math.sin(elapsed * 2.1 + 1.2) * 4.5;
    const y2 = 25 + Math.cos(elapsed * 1.8 + 2.4) * 4;
    const y3 = 14 + Math.sin(elapsed * 2.4 + 0.6) * 3.5;

    const lineD = `M 38,${y0.toFixed(1)} C 70,${(y0 - 6).toFixed(1)} 100,${(y1 + 12).toFixed(1)} 135,${y1.toFixed(1)} C 165,${(y1 - 14).toFixed(1)} 195,${(y2 + 14).toFixed(1)} 225,${y2.toFixed(1)} C 255,${(y2 - 12).toFixed(1)} 270,${(y3 + 7).toFixed(1)} 285,${y3.toFixed(1)}`;
    const areaD = `${lineD} L 285,70 L 38,70 Z`;

    if (linePath) linePath.setAttribute('d', lineD);
    if (areaPath) areaPath.setAttribute('d', areaD);

    // Update Dots on Wave
    if (dot1) dot1.setAttribute('cy', y1.toFixed(1));
    if (val1) {
      val1.setAttribute('y', (y1 - 6).toFixed(1));
      val1.textContent = (48.0 + Math.sin(elapsed * 2.1) * 0.7).toFixed(1) + 'K';
    }

    if (dot2) dot2.setAttribute('cy', y2.toFixed(1));
    if (val2) {
      val2.setAttribute('y', (y2 - 6).toFixed(1));
      val2.textContent = (58.0 + Math.cos(elapsed * 1.8) * 0.9).toFixed(1) + 'K';
    }

    if (liveDot) liveDot.setAttribute('cy', y3.toFixed(1));
    if (liveDotOuter) liveDotOuter.setAttribute('cy', y3.toFixed(1));
    if (liveVal) {
      liveVal.setAttribute('y', (y3 - 6).toFixed(1));
      const curLive = (52.2 + Math.sin(elapsed * 2.4) * 0.8).toFixed(1);
      liveVal.textContent = curLive + 'K';
    }

    // 2. Dynamic Moving Column Bars (Target Warehouse)
    const oracleH = 51 + Math.sin(elapsed * 0.9) * 2.5;
    const oracleY = 70 - oracleH;
    if (barOracle) {
      barOracle.setAttribute('height', oracleH.toFixed(1));
      barOracle.setAttribute('y', oracleY.toFixed(1));
    }
    if (valOracle) {
      valOracle.setAttribute('y', (oracleY - 6).toFixed(1));
      const curOracleGB = Math.round(820 + Math.sin(elapsed * 0.9) * 3);
      valOracle.textContent = curOracleGB + ' GB';
      if (tblOracle) tblOracle.textContent = curOracleGB + ' GB';
    }

    const sqlH = 41 + Math.cos(elapsed * 0.8) * 2;
    const sqlY = 70 - sqlH;
    if (barSql) {
      barSql.setAttribute('height', sqlH.toFixed(1));
      barSql.setAttribute('y', sqlY.toFixed(1));
    }
    if (valSql) {
      valSql.setAttribute('y', (sqlY - 6).toFixed(1));
      const curSqlGB = Math.round(660 + Math.cos(elapsed * 0.8) * 2.5);
      valSql.textContent = curSqlGB + ' GB';
      if (tblSql) tblSql.textContent = curSqlGB + ' GB';
    }

    // 3. Real-time KPI Tickers
    if (kpiThroughput) {
      kpiThroughput.innerHTML = 'Multi-Stream';
    }

    if (kpiLatency) {
      kpiLatency.textContent = 'Real-Time';
    }

    pbiAnimFrameId = requestAnimationFrame(renderPbiFrame);
  }

  pbiAnimFrameId = requestAnimationFrame(renderPbiFrame);
}

function initBiDashboard() {
  // Start the chart animation
  startPbiLiveAnimation();

  const xmlaBtn = document.getElementById('trigger-xmla-btn');
  if (xmlaBtn) {
    xmlaBtn.addEventListener('click', () => {
      const originalHtml = xmlaBtn.innerHTML;

      xmlaBtn.innerHTML = `
        <svg style="animation: spin 0.8s linear infinite" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        <span>Refreshing...</span>
      `;
      xmlaBtn.disabled = true;
      xmlaBtn.style.opacity = '0.75';

      setTimeout(() => {
        xmlaBtn.innerHTML = `
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>✓ Synchronized!</span>
        `;
        xmlaBtn.style.background = '#10B981';
        xmlaBtn.style.borderColor = '#10B981';
        xmlaBtn.style.color = '#0F172A';
        xmlaBtn.style.opacity = '1';

        if (typeof showToast === 'function') {
          showToast('Power BI Direct Lake datasets refreshed successfully!', 'success');
        }

        setTimeout(() => {
          xmlaBtn.innerHTML = originalHtml;
          xmlaBtn.disabled = false;
          xmlaBtn.style.background = '';
          xmlaBtn.style.borderColor = '';
          xmlaBtn.style.color = '';
          xmlaBtn.style.opacity = '1';
        }, 2200);
      }, 1200);
    });
  }
}




