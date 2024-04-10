class OfflineTracker {
    constructor() {
        this.earningsPerSecond = 0.1; // Adjust based on your game's economy
    }

    init() {
        this.updateOfflineProgress();
        this.setupEventListeners();
    }

    updateLastActiveTime() {
        localStorage.setItem('lastActiveTime', Date.now());
    }

    setupEventListeners() {
        window.addEventListener('beforeunload', () => this.updateLastActiveTime());
        document.addEventListener('DOMContentLoaded', () => this.updateOfflineProgress());
    }

    updateOfflineProgress() {
        const lastActiveTime = localStorage.getItem('lastActiveTime');
        if (lastActiveTime) {
            const currentTime = Date.now();
            const timePassed = currentTime - lastActiveTime; // Time passed in milliseconds
            const offlineEarnings = this.calculateOfflineEarnings(timePassed);
            this.showOfflineProgress(offlineEarnings);
        }
        // Update last active time for the next session
        this.updateLastActiveTime();
    }

    calculateOfflineEarnings(timePassed) {
        // Calculate earnings based on time passed
        const earnings = Math.floor((timePassed / 1000) * this.earningsPerSecond);
        return earnings;
    }

    showOfflineProgress(earnings) {
        // Ensure jQuery is loaded
        if (window.jQuery) {
            // Update the modal content and display it
            $('#offlineEarnings').text(earnings);
            $('#offlineProgressModal').modal('show');

            // Ensure the close functionality works for the modal
            $('.close, .btn-secondary').click(function() {
                $('#offlineProgressModal').modal('hide');
            });
        } else {
            console.error('jQuery is not loaded, modal cannot be displayed.');
        }
    }
}

// Create and initialize the OfflineTracker instance when the page is fully loaded
window.addEventListener('load', () => {
    const offlineTracker = new OfflineTracker();
    offlineTracker.init();
});
