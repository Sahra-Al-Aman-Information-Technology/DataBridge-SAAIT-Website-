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
    { pct: 28, msg: 'AUTHENTICATING ENCRYPTION VAULT...' },
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
   4. Interactive ROI & TCO Calculator
   -------------------------------------------------------------------------- */
function initRoiCalculator() {
  const dbSlider = document.getElementById('slider-sources');
  const volSlider = document.getElementById('slider-volume');
  const dbDisplay = document.getElementById('val-sources-display');
  const volDisplay = document.getElementById('val-volume-display');
  
  const hoursOutput = document.getElementById('roi-hours-saved');
  const moneyOutput = document.getElementById('roi-dollars-saved');
  const breakevenOutput = document.getElementById('roi-breakeven');

  if (!dbSlider || !volSlider || !hoursOutput || !moneyOutput) return;

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

    // Formulas based on enterprise data engineering benchmark:
    // Avg manual scripting/maintenance: 45 hours / DB / year
    // Avg senior data engineer rate: $95 / hour
    // Network/compute optimization: ~$12 / GB / year in saved warehouse compute
    const hoursSaved = Math.round(dbCount * 48 + (volGB * 0.15));
    const dollarsSaved = Math.round((hoursSaved * 95) + (volGB * 4.5));
    const breakEvenWeeks = Math.max(1, Math.round(14 / Math.sqrt(dbCount)));

    hoursOutput.textContent = `${hoursSaved.toLocaleString()} hrs / yr`;
    moneyOutput.textContent = `$${dollarsSaved.toLocaleString()}`;
    if (breakevenOutput) {
      breakevenOutput.textContent = `${breakEvenWeeks} Days`;
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const nameInput = form.querySelector('#demo-name');
    const emailInput = form.querySelector('#demo-email');
    const companyInput = form.querySelector('#demo-company');

    if (!nameInput.value || !emailInput.value || !companyInput.value) {
      showToast('⚠️ Please complete all required fields.', 'warn');
      return;
    }

    // Business email check
    const email = emailInput.value.toLowerCase();
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const domain = email.split('@')[1];
    if (personalDomains.includes(domain)) {
      showToast('ℹ️ Please use your enterprise/work email address for priority onboarding.', 'info');
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Provisioning Demo Sandbox...</span>`;
    }

    setTimeout(() => {
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
    }, 1200);
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
