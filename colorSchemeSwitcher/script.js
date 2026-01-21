document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.swatch');
    const body = document.body;
    const hexValueDisplay = document.querySelector('#hex-value');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const theme = button.getAttribute('data-theme');
            const hex = button.getAttribute('data-hex');

            // Update active state in UI
            updateActiveSwatch(button);

            // Apply theme to body
            applyTheme(theme);

            // Update HEX display
            if (hexValueDisplay) {
                hexValueDisplay.textContent = hex;
            }
        });
    });

    function updateActiveSwatch(selectedButton) {
        buttons.forEach(btn => btn.classList.remove('active'));
        selectedButton.classList.add('active');
    }

    function applyTheme(theme) {
        // Remove all theme classes first
        const themeClasses = Array.from(body.classList).filter(c => c.startsWith('theme-'));
        body.classList.remove(...themeClasses);

        // Add new theme class
        body.classList.add(`theme-${theme}`);

        // Console log for debugging (as requested in original)
        console.log(`Theme switched to: ${theme}`);
    }
});