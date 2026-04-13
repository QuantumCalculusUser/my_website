const universalFooterHtml = `
<footer>
    <div class="social-links" aria-label="Profile links">
        <a href="https://github.com/QuantumCalculusUser" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <span class="social-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.91 10.91 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.73.8 1.17 1.83 1.17 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.79 1.05.79 2.11 0 1.52-.01 2.74-.01 3.11 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"></path>
                </svg>
            </span>
            <span>GitHub</span>
        </a>
        <a href="https://www.codewars.com/users/harshadsknandanwar" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Codewars profile">
            <span class="social-icon codewars-icon" aria-hidden="true">CW</span>
            <span>Codewars</span>
        </a>
    </div>
    <p>&copy; 2026 Harshad Sanjay Nandanwar. All rights reserved.</p>
</footer>
`;

const universalThemeHtml = `
<div class="theme-switcher" role="group" aria-label="Theme selector">
    <div class="theme-track">
        <span class="theme-slider" aria-hidden="true"></span>
        <button type="button" class="theme-option" data-theme="light">Light</button>
        <button type="button" class="theme-option" data-theme="dark">Dark</button>
        <button type="button" class="theme-option" data-theme="default">Default</button>
    </div>
</div>
`;

const universalHamburgerHtml = `
<button class="hamburger-menu" aria-label="Open navigation menu" aria-expanded="false">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
</button>
`;

const themeStorageKey = 'universalPreferredTheme';

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    const effectiveTheme = theme === 'default' ? getSystemTheme() : theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('theme-light', effectiveTheme === 'light');
    document.documentElement.classList.toggle('theme-dark', effectiveTheme === 'dark');
    localStorage.setItem(themeStorageKey, theme);
    updateActiveThemeButton(theme);
}

function moveSliderTo(button) {
    const slider = document.querySelector('.theme-slider');
    if (!button || !slider) return;
    const buttonRect = button.getBoundingClientRect();
    const trackRect = button.parentElement.getBoundingClientRect();
    const offset = buttonRect.left - trackRect.left;
    const width = buttonRect.width;
    slider.style.width = `${width}px`;
    slider.style.transform = `translateX(${offset}px)`;
}

function updateActiveThemeButton(theme) {
    const buttons = Array.from(document.querySelectorAll('.theme-option'));
    buttons.forEach(button => {
        const isActive = button.dataset.theme === theme;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        if (isActive) {
            moveSliderTo(button);
        }
    });
}

function insertUniversalThemeSwitcher() {
    if (document.querySelector('.theme-switcher')) return;
    const header = document.querySelector('header');
    if (!header) return;
    header.insertAdjacentHTML('afterbegin', universalThemeHtml);
}

function insertUniversalFooter() {
    if (document.querySelector('footer')) return;
    const main = document.querySelector('main');
    if (main) {
        main.insertAdjacentHTML('afterend', universalFooterHtml);
    } else {
        document.body.appendChild(document.createRange().createContextualFragment(universalFooterHtml));
    }
}

function insertUniversalHamburger() {
    if (document.querySelector('.hamburger-menu')) return;
    const header = document.querySelector('header');
    if (!header) return;
    header.insertAdjacentHTML('afterbegin', universalHamburgerHtml);
}

function getBasePath() {
    const path = window.location.pathname;
    return path.includes('/projects/') ? '../../' : './';
}

function insertUniversalSidebar() {
    if (document.querySelector('.sidebar')) return;
    const basePath = getBasePath();
    const sidebarHtml = `
<div class="sidebar-overlay" aria-hidden="true"></div>
<div class="sidebar" aria-hidden="true">
    <nav class="sidebar-nav">
        <ul>
            <li><a href="${basePath}index.html">Home</a></li>
            <li class="has-submenu">
                <a href="#projects" class="submenu-toggle">Projects</a>
                <ul class="submenu">
                    <li><a href="${basePath}projects/e-commerce/index.html">E-Commerce Website</a></li>
                    <li><a href="${basePath}projects/task-management/index.html">Task Management App</a></li>
                    <li><a href="${basePath}projects/weather-dashboard/index.html">Weather Dashboard</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</div>
`;
    document.body.insertAdjacentHTML('afterbegin', sidebarHtml);
}

function initThemeSwitcher() {
    const buttons = Array.from(document.querySelectorAll('.theme-option'));
    buttons.forEach(button => {
        button.addEventListener('click', () => setTheme(button.dataset.theme));
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!hamburger || !sidebar || !overlay) return;

    function toggleSidebar() {
        const isOpen = sidebar.getAttribute('aria-hidden') === 'false';
        hamburger.setAttribute('aria-expanded', !isOpen);
        sidebar.setAttribute('aria-hidden', isOpen);
        overlay.setAttribute('aria-hidden', isOpen);
        document.body.classList.toggle('sidebar-open', !isOpen);
    }

    hamburger.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    const sidebarLinks = sidebar.querySelectorAll('a:not(.submenu-toggle)');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleSidebar();
        });
    });

    const submenuToggles = sidebar.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const li = this.parentElement;
            li.classList.toggle('open');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.getAttribute('aria-hidden') === 'false') {
            toggleSidebar();
        }
    });
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem(themeStorageKey) || 'default';
    setTheme(savedTheme);
    setTimeout(() => {
        const activeButton = document.querySelector('.theme-option.active');
        if (activeButton) {
            moveSliderTo(activeButton);
        }
    }, 0);
    window.addEventListener('load', () => {
        const activeButton = document.querySelector('.theme-option.active');
        if (activeButton) {
            moveSliderTo(activeButton);
        }
    });
}

function watchSystemThemeChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
        const savedTheme = localStorage.getItem(themeStorageKey) || 'default';
        if (savedTheme === 'default') {
            setTheme('default');
        }
    });
}

function enableThemeTransitions() {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.documentElement.classList.remove('theme-preload');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    insertUniversalHamburger();
    insertUniversalSidebar();
    insertUniversalThemeSwitcher();
    insertUniversalFooter();
    initHamburgerMenu();
    initThemeSwitcher();
    initSmoothScroll();
    applySavedTheme();
    enableThemeTransitions();
    watchSystemThemeChanges();
    window.addEventListener('resize', () => moveSliderTo(document.querySelector('.theme-option.active')));
});
