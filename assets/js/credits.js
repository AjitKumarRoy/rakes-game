// JavaScript to handle the button clicks and video playback.

// Get elements
const infoButton = document.getElementById('info-button');
const infoModal = document.getElementById('info-modal');
const closeModal = document.getElementById('close-modal');

// Show modal on info button click
infoButton.addEventListener('click', () => {
    infoModal.style.display = 'flex'; // Show modal
});

// Hide modal on close button click
closeModal.addEventListener('click', () => {
    infoModal.style.display = 'none'; // Hide modal
});

