document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.querySelector('#clock');
    const dateElement = document.querySelector('#date-display');
    const body = document.body;

    function updateTime() {
        const now = new Date();

        // Update Clock
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;

        // Update Date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);

        // Subtle background shift based on seconds
        const hue = (now.getSeconds() * 6); // 360 degrees / 60 seconds
        // body.style.borderColor = `hsla(${hue}, 70%, 50%, 0.1)`;
    }

    // Initial call
    updateTime();

    // Update every second
    setInterval(updateTime, 1000);
});