// offlinenotification.js

document.addEventListener('DOMContentLoaded', () => {
    // Assuming these values are stored and retrieved from localStorage for simplicity
    const lastSaveTime = parseInt(localStorage.getItem('lastSaveTime'), 10) || Date.now();
    const knightCount = parseInt(localStorage.getItem('knightCount'), 10) || 0;
    const archerCount = parseInt(localStorage.getItem('archerCount'), 10) || 0;
    const wizardCount = parseInt(localStorage.getItem('wizardCount'), 10) || 0;
    const paladinCount = parseInt(localStorage.getItem('paladinCount'), 10) || 0;

    // Rates per hour - adjust these according to your game's balance
    const rates = {
        knightRate: 0.5,
        archerRate: 1,
        wizardRate: 2,
        paladinRate: 4
    };
    const maxOfflineHours = 8;

    const offlineNotification = new OfflineNotification(rates, maxOfflineHours);
    offlineNotification.showNotification(lastSaveTime, { knightCount, archerCount, wizardCount, paladinCount });

    // Update last save time on game load
    localStorage.setItem('lastSaveTime', Date.now().toString());
});

class OfflineNotification {
    constructor(rates, maxOfflineHours) {
        this.knightRate = rates.knightRate;
        this.archerRate = rates.archerRate;
        this.wizardRate = rates.wizardRate;
        this.paladinRate = rates.paladinRate;
        this.maxOfflineHours = maxOfflineHours;
    }

    showNotification(lastSaveTime, units) {
        const offlineHours = this.calculateOfflineHours(lastSaveTime);
        const earnings = this.calculateEarnings(offlineHours, units);

        if (earnings > 0) {
            const message = `Welcome back! You were offline for ${offlineHours.toFixed(2)} hours. Your heroes have collected ${earnings.toFixed(2)} gold coins.`;
            this.displayNotification(message);
        }
    }

    calculateOfflineHours(lastSaveTime) {
        const currentTime = Date.now();
        const elapsedMs = currentTime - lastSaveTime;
        const elapsedHours = Math.min(elapsedMs / (1000 * 60 * 60), this.maxOfflineHours);
        return elapsedHours;
    }

    calculateEarnings(hours, { knightCount, archerCount, wizardCount, paladinCount }) {
        const earnings = (knightCount * this.knightRate + archerCount * this.archerRate +
            wizardCount * this.wizardRate + paladinCount * this.paladinRate) * hours;
        return earnings;
    }

    displayNotification(message) {
        // This can be replaced with a custom UI element instead of an alert
        alert(message);
    }
}
