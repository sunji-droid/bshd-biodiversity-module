/* ==========================================================================
   BSHD x ClimateFeatures x Internews Network
   Biodiversity Reporting Module — Core Application JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProgressTracker();
  initSidebarMenuGroups();
  initSettingsEngine();
  initMobileNavigation();
  initSearchEngine();
  initStoryClinicTabs();
  initWorkingProgressBanner();
});

/* ==========================================================================
   Theme Switcher (Light Editorial / Dark Institutional)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('bshd_theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
  }
  
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    updateThemeBtnIcon(savedTheme);
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      const isDark = document.body.classList.contains('theme-dark');
      localStorage.setItem('bshd_theme', isDark ? 'dark' : 'light');
      updateThemeBtnIcon(isDark ? 'dark' : 'light');
    });
  }
}

function updateThemeBtnIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  if (theme === 'dark') {
    themeBtn.innerHTML = '☀️ <span style="font-size:0.8rem">Light Canvas</span>';
  } else {
    themeBtn.innerHTML = '🌙 <span style="font-size:0.8rem">Dark Canvas</span>';
  }
}

/* ==========================================================================
   Working Progress Banner Control
   ========================================================================== */
function initWorkingProgressBanner() {
  const banner = document.getElementById('wp-banner');
  const closeBtn = document.getElementById('dismiss-wp-banner');
  if (!banner || !closeBtn) return;
  
  // If dismissed in this sessionStorage session, minimize or hide
  if (sessionStorage.getItem('bshd_wp_dismissed') === 'true') {
    banner.style.display = 'none';
  }
  
  closeBtn.addEventListener('click', () => {
    banner.style.opacity = '0';
    setTimeout(() => {
      banner.style.display = 'none';
      sessionStorage.setItem('bshd_wp_dismissed', 'true');
    }, 250);
  });
}

/* ==========================================================================
   Reading Progress Tracker (Private LocalStorage)
   ========================================================================== */
const ALL_TOP_LEVEL_PAGES = [
  'home', 'foreword', 'partners', 'disclaimer', 'attribution', 'glossary',
  'unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'closing-reflection', 'project-partners'
];

function initProgressTracker() {
  const currentPageId = document.body.dataset.pageId;
  let visited = JSON.parse(localStorage.getItem('bshd_module_progress') || '[]');
  
  // Auto-mark current page after 4 seconds or when scrolled past 40%
  if (currentPageId && ALL_TOP_LEVEL_PAGES.includes(currentPageId)) {
    setTimeout(() => {
      markPageComplete(currentPageId);
    }, 4000);
    
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollPos > docHeight * 0.4) {
        markPageComplete(currentPageId);
      }
    }, { passive: true });
  }
  
  // Update sidebar checkmarks & header progress
  updateProgressUI();
  
  // Manual mark complete button click
  const markBtn = document.getElementById('mark-complete-btn');
  if (markBtn && currentPageId) {
    if (visited.includes(currentPageId)) {
      markBtn.classList.add('completed');
      markBtn.innerHTML = '✔️ Section Completed';
    }
    markBtn.addEventListener('click', () => {
      markPageComplete(currentPageId);
      markBtn.classList.add('completed');
      markBtn.innerHTML = '✔️ Section Completed';
    });
  }
  
  // Reset progress button
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your reading progress across the entire training module?')) {
        localStorage.removeItem('bshd_module_progress');
        updateProgressUI();
        const markBtn = document.getElementById('mark-complete-btn');
        if (markBtn) {
          markBtn.classList.remove('completed');
          markBtn.innerHTML = '✔️ Mark Section Complete';
        }
      }
    });
  }
}

function markPageComplete(pageId) {
  let visited = JSON.parse(localStorage.getItem('bshd_module_progress') || '[]');
  if (!visited.includes(pageId) && ALL_TOP_LEVEL_PAGES.includes(pageId)) {
    visited.push(pageId);
    localStorage.setItem('bshd_module_progress', JSON.stringify(visited));
    updateProgressUI();
  }
}

function updateProgressUI() {
  let visited = JSON.parse(localStorage.getItem('bshd_module_progress') || '[]');
  
  // Highlight completed checkmarks in sidebar
  document.querySelectorAll('.nav-item').forEach(item => {
    const pageId = item.dataset.navId;
    if (pageId && visited.includes(pageId)) {
      item.classList.add('completed');
    } else {
      item.classList.remove('completed');
    }
  });
  
  // Calculate percentage
  const pct = Math.round((visited.length / ALL_TOP_LEVEL_PAGES.length) * 100);
  
  const pctText = document.getElementById('header-progress-text');
  const barFill = document.getElementById('header-progress-fill');
  
  if (pctText) pctText.textContent = `Module Progress: ${pct}% (${visited.length}/${ALL_TOP_LEVEL_PAGES.length})`;
  if (barFill) barFill.style.width = `${pct}%`;
}

/* ==========================================================================
   Sidebar Accordion Navigation
   ========================================================================== */

/* ==========================================================================
   Left-Side Menu Buttons & Sub-Accordion Engine
   ========================================================================== */
function initSidebarMenuGroups() {
  const currentPageId = document.body.dataset.pageId;
  
  // 1. Collapsible Menu Groups on the Left Side
  const groups = document.querySelectorAll(".sidebar-menu-group");
  groups.forEach(group => {
    const btn = group.querySelector(".sidebar-menu-btn");
    if (!btn) return;
    
    // Auto-open group containing current page
    const hasCurrentPage = group.querySelector(`[data-nav-id="${currentPageId}"]`);
    if (hasCurrentPage) {
      group.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    } else {
      btn.setAttribute("aria-expanded", "false");
    }
    
    btn.addEventListener("click", () => {
      const isOpen = group.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen.toString());
      
      // Optional: close other groups (single open at a time)
      groups.forEach(otherGroup => {
        if (otherGroup !== group && otherGroup.classList.contains("open")) {
          otherGroup.classList.remove("open");
          const otherBtn = otherGroup.querySelector(".sidebar-menu-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  // 2. Sub-accordions for Units 1, 2, and 4 inside Curriculum Units group
  document.querySelectorAll(".sidebar-nav .nav-item.toc-parent").forEach(item => {
    const navId = item.dataset.navId;
    const toggleBtn = item.querySelector(".sub-toggle-btn");
    const link = item.querySelector("a.nav-link");
    
    // Mark current page
    if (navId && navId === currentPageId) {
      item.classList.add("active-parent", "open");
      if (link) link.classList.add("active");
    }
    
    // Only the toggle button should toggle the sub-accordion
    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        item.classList.toggle("open");
      });
    }
    
    // Clicking the link should navigate normally (no interference)
    // The link is a proper <a href> so it works by default
    // No extra handler needed - just ensure we don't prevent default on link clicks
  });
}

/* ==========================================================================
   Settings Modal & UI Controls Engine
   ========================================================================== */
function initSettingsEngine() {
  applySavedPreferences();

  const openBtns = document.querySelectorAll(".settings-trigger-btn");
  const closeBtn = document.getElementById("btn-close-settings");
  const modal = document.getElementById("settings-modal-overlay");
  
  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add("active");
  };
  const closeModal = () => modal.classList.remove("active");

  openBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.querySelectorAll(".settings-btn[data-setting]").forEach(btn => {
    btn.addEventListener("click", () => {
      const setting = btn.dataset.setting;
      const value = btn.dataset.value;

      btn.parentElement.querySelectorAll(".settings-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      let prefs = JSON.parse(localStorage.getItem("bshd_preferences") || "{}");
      prefs[setting] = value;
      localStorage.setItem("bshd_preferences", JSON.stringify(prefs));

      applySavedPreferences();
    });
  });

  const dataSaverCheckbox = document.getElementById("toggle-data-saver");
  if (dataSaverCheckbox) {
    let prefs = JSON.parse(localStorage.getItem("bshd_preferences") || "{}");
    dataSaverCheckbox.checked = !!prefs.dataSaver;
    dataSaverCheckbox.addEventListener("change", () => {
      let prefs = JSON.parse(localStorage.getItem("bshd_preferences") || "{}");
      prefs.dataSaver = dataSaverCheckbox.checked;
      localStorage.setItem("bshd_preferences", JSON.stringify(prefs));
      applySavedPreferences();
    });
  }

  const exportBtn = document.getElementById("export-settings-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const exportData = {
        module: "BSHD x ClimateFeatures Biodiversity Reporting Module",
        timestamp: new Date().toISOString(),
        progress: JSON.parse(localStorage.getItem("bshd_module_progress") || "[]"),
        preferences: JSON.parse(localStorage.getItem("bshd_preferences") || "{}")
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bshd-module-progress-backup.json";
      a.click();
    });
  }
}

function applySavedPreferences() {
  let prefs = JSON.parse(localStorage.getItem("bshd_preferences") || "{}");
  
  document.body.classList.remove("theme-dark", "theme-sepia");
  if (prefs.theme === "dark") document.body.classList.add("theme-dark");
  if (prefs.theme === "sepia") document.body.classList.add("theme-sepia");
  
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    if (prefs.theme === "dark") themeBtn.innerHTML = '☀️ <span style="font-size:0.8rem">Light Canvas</span>';
    else if (prefs.theme === "sepia") themeBtn.innerHTML = '📜 <span style="font-size:0.8rem">Sepia Canvas</span>';
    else themeBtn.innerHTML = '🌙 <span style="font-size:0.8rem">Dark Canvas</span>';
  }

  document.body.classList.remove("font-scale-sm", "font-scale-md", "font-scale-lg", "font-scale-xl");
  if (prefs.fontSize) document.body.classList.add("font-scale-" + prefs.fontSize);
  else document.body.classList.add("font-scale-md");

  document.body.classList.remove("font-sans-mode", "font-dyslexic-mode");
  if (prefs.fontStyle === "sans") document.body.classList.add("font-sans-mode");
  if (prefs.fontStyle === "dyslexic") document.body.classList.add("font-dyslexic-mode");

  if (prefs.dataSaver) document.body.classList.add("data-saver-mode");
  else document.body.classList.remove("data-saver-mode");
}

/* ==========================================================================
   Mobile Navigation Drawer Control
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const sidebar = document.getElementById('sidebar-nav');
  
  if (!toggleBtn || !sidebar) return;
  
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('mobile-open') &&
        !sidebar.contains(e.target) &&
        !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

/* ==========================================================================
   Client-Side Search Engine (Modal & Live Filtering)
   ========================================================================== */
function initSearchEngine() {
  const searchTriggerBtn = document.getElementById('search-trigger-btn');
  const searchModalOverlay = document.getElementById('search-modal-overlay');
  const searchInput = document.getElementById('search-input');
  const searchCloseBtn = document.getElementById('btn-close-search');
  const searchResultsContainer = document.getElementById('search-results-list');
  
  if (!searchModalOverlay || !searchInput) return;
  
  const openModal = () => {
    searchModalOverlay.classList.add('active');
    searchInput.focus();
    renderSearchResults(searchInput.value);
  };
  
  const closeModal = () => {
    searchModalOverlay.classList.remove('active');
  };
  
  if (searchTriggerBtn) searchTriggerBtn.addEventListener('click', openModal);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeModal);
  
  searchModalOverlay.addEventListener('click', (e) => {
    if (e.target === searchModalOverlay) closeModal();
  });
  
  // Keyboard Shortcut Ctrl+K or Cmd+K or Escape
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal();
    }
    if (e.key === 'Escape' && searchModalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Live filtering
  searchInput.addEventListener('input', () => {
    renderSearchResults(searchInput.value);
  });
  
  function renderSearchResults(query) {
    if (!searchResultsContainer) return;
    const q = query.trim().toLowerCase();
    const index = window.SEARCH_INDEX || [];
    
    if (!q) {
      // Show default top suggestions
      searchResultsContainer.innerHTML = `
        <div style="padding: 10px 0; font-size: 0.82rem; font-weight:700; color: var(--bshd-gold); text-transform:uppercase;">
          Suggested Module Sections
        </div>
        ${index.slice(0, 6).map(item => `
          <a href="${item.url}" class="search-result-item" onclick="document.getElementById('search-modal-overlay').classList.remove('active')">
            <div class="result-title">
              <span>${item.title}</span>
              <span class="glossary-tag">${item.category}</span>
            </div>
            <div class="result-snippet">${item.content.substring(0, 110)}...</div>
          </a>
        `).join('')}
      `;
      return;
    }
    
    const matches = index.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 15);
    
    if (matches.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="search-no-results">
          <p style="font-size:1.1rem; margin-bottom: 8px;">No matching sections or terms found for "<strong>${query}</strong>"</p>
          <p style="font-size:0.9rem;">Try searching for terms like <em>Okavango</em>, <em>DWNP</em>, <em>investigative</em>, <em>GBF</em>, or <em>solutions journalism</em>.</p>
        </div>
      `;
      return;
    }
    
    searchResultsContainer.innerHTML = matches.map(item => {
      // Highlight snippet
      let snippet = item.content;
      const idx = snippet.toLowerCase().indexOf(q);
      if (idx !== -1) {
        const start = Math.max(0, idx - 30);
        const end = Math.min(snippet.length, idx + q.length + 80);
        snippet = (start > 0 ? '...' : '') + snippet.substring(start, end) + (end < snippet.length ? '...' : '');
      } else {
        snippet = snippet.substring(0, 120) + '...';
      }
      
      return `
        <a href="${item.url}" class="search-result-item" onclick="document.getElementById('search-modal-overlay').classList.remove('active')">
          <div class="result-title">
            <span>${item.title}</span>
            <span class="glossary-tag">${item.category}</span>
          </div>
          <div class="result-snippet">${snippet}</div>
        </a>
      `;
    }).join('');
  }
}

/* ==========================================================================
   Unit 5 Story Clinic Interactive Tabs Control
   ========================================================================== */
function initStoryClinicTabs() {
  const tabContainers = document.querySelectorAll('.clinic-card');
  tabContainers.forEach(card => {
    const buttons = card.querySelectorAll('.clinic-tab-btn');
    const panels = card.querySelectorAll('.clinic-panel');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Remove active from all buttons & panels inside this card
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active to clicked button and matching panel
        btn.classList.add('active');
        const targetPanel = card.querySelector(`.clinic-panel[data-panel="${targetTab}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  });
}
