// Portfolio main page JavaScript
// Initialize portfolio functionality and theme switcher

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const themeButtons = Array.from(document.querySelectorAll('.theme-option'));
    const slider = document.querySelector('.theme-slider');
    const themeStorageKey = 'preferredTheme';

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        const effectiveTheme = theme === 'default' ? getSystemTheme() : theme;
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle('theme-light', effectiveTheme === 'light');
        document.documentElement.classList.toggle('theme-dark', effectiveTheme === 'dark');
        updateActiveButton(theme);
        localStorage.setItem(themeStorageKey, theme);
    }

    function moveSliderTo(button) {
        if (!button || !slider) return;
        const width = button.offsetWidth;
        const offset = button.offsetLeft;
        slider.style.width = `${width}px`;
        slider.style.transform = `translateX(${offset}px)`;
    }

    function updateActiveButton(theme) {
        themeButtons.forEach(button => {
            const isActive = button.dataset.theme === theme;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            if (isActive) {
                moveSliderTo(button);
            }
        });
    }

    themeButtons.forEach(button => {
        button.addEventListener('click', () => applyTheme(button.dataset.theme));
    });

    window.addEventListener('resize', () => {
        const activeButton = document.querySelector('.theme-option.active');
        if (activeButton) moveSliderTo(activeButton);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const savedTheme = localStorage.getItem(themeStorageKey) || 'default';
        if (savedTheme === 'default') {
            applyTheme('default');
        }
    });

    const savedTheme = localStorage.getItem(themeStorageKey) || 'default';
    applyTheme(savedTheme);
});