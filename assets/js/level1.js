// // script.js

// // Add event listeners to draggable items
// document.querySelectorAll('.draggable').forEach(item => {
//     item.addEventListener('dragstart', dragStart);
//     item.addEventListener('dragend', dragEnd); // To handle visibility after drag
// });

// // Add event listeners to drop zones
// document.querySelectorAll('.dropzone').forEach(zone => {
//     zone.addEventListener('dragover', dragOver);
//     zone.addEventListener('drop', drop);
// });

// // Drag start function
// function dragStart(event) {
//     event.dataTransfer.setData('text/plain', event.target.id);
//     setTimeout(() => {
//         event.target.classList.add('hide'); // Hide original item while dragging
//     }, 0);
// }

// // Drag end function to restore visibility if not dropped
// function dragEnd(event) {
//     event.target.classList.remove('hide'); // Make visible again if dropped incorrectly
// }

// // Drag over function to allow dropping
// function dragOver(event) {
//     event.preventDefault();
//     //event.target.style.border = "2px dashed #333"; // Highlight drop zone
// }

// // Drop function
// function drop(event) {
//     event.preventDefault();
//     const id = event.dataTransfer.getData('text/plain');
//     const draggableElement = document.getElementById(id);

    

//     // Remove existing draggable item in the drop zone if any
//     const existingItem = event.target.querySelector('.draggable');
//     if (existingItem && existingItem !== draggableElement) {
//         existingItem.remove(); // Remove previous item if it’s different
//     }

//     // Place item in the drop zone
//     event.target.appendChild(draggableElement);
//     draggableElement.classList.remove('hide'); // Make item visible

//     // Resize the dropped image
//     draggableElement.style.width = "100px"; // Set to desired width
//     draggableElement.style.height = "auto";

//     // Check if dropped in the correct drop zone
//     if (event.target.id === `dropzone${id.charAt(id.length - 1)}`) {
//         event.target.appendChild(draggableElement); // Place item in the drop zone
//         draggableElement.classList.remove('hide'); // Make item visible
//         alert(`Correct! ${id} was dropped in the right zone!`);
//         event.target.style.backgroundColor = "#a8e6cf"; // Visual feedback on correct drop
//     } else {
//         alert(`Try again! ${id} was dropped in the wrong zone.`);
//         draggableElement.classList.remove('hide'); // Make it visible in original position
//     }
// }


// Load audio files
const dragStartSound = new Audio('./assets/sounds/drag-start.mp3');
const correctDropSound = new Audio('./assets/sounds/correct-drop.mp3');
const wrongDropSound = new Audio('./assets/sounds/wrong-drop.mp3');
const levelUpSound = new Audio('./assets/sounds/level-up.mp3');
const clickSound = new Audio('./assets/sounds/button-click.mp3'); 
const backgroundMusic = new Audio('./assets/sounds/background-music.mp3'); 

// Set playback rate (1 is normal speed, values higher than 1 are faster)
dragStartSound.playbackRate = 2;  // 1.5x speed
correctDropSound.playbackRate = 1.5;
wrongDropSound.playbackRate = 1.5;
levelUpSound.playbackRate = 1.5;
clickSound.playbackRate = 1.5;

clickSound.volume = 1.0; // Set volume (0.0 to 1.0)
backgroundMusic.volume = 0.5; // Set volume level (adjust as needed)
backgroundMusic.loop = true; // Enable looping
backgroundMusic.play(); // Start playing when the game loads

const toggleMusicButton = document.getElementById('toggle-music');

// Toggle mute/unmute on button click
toggleMusicButton.addEventListener('click', () => {
    backgroundMusic.muted = !backgroundMusic.muted;

    if (backgroundMusic.muted) {
        toggleMusicButton.classList.remove('unmute');
        toggleMusicButton.classList.add('mute');
    } else {
        toggleMusicButton.classList.remove('mute');
        toggleMusicButton.classList.add('unmute');
    }
});



// Get modal elements
const resultModal = document.getElementById("resultModal");
const modalMessage = document.getElementById("modalMessage");
const exitButton = document.getElementById("exitButton");
const actionButton = document.getElementById("actionButton");

exitButton.addEventListener('click', () => resultModal.style.display = 'none'); // Close modal on exit



// Add event listeners to draggable items
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd); 
});

// Add event listeners to drop zones
document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
});

// Drag start function
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    
    dragStartSound.play(); // Play sound when dragging starts
    setTimeout(() => {
        event.target.classList.add('hide'); // Hide original item while dragging
    }, 0);
}

// Drag end function to restore visibility if not dropped
function dragEnd(event) {
    event.target.classList.remove('hide'); // Make visible again if not dropped
}

// Allow drop
function dragOver(event) {
    event.preventDefault();
}

// Drop function
function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);

    
    // // Remove any existing item in the drop zone
    // const existingItem = event.target.querySelector('.draggable');
    // if (existingItem) {
    //     existingItem.remove(); // Remove the existing item
    // }
    // Append the new item and make it visible
    event.target.appendChild(draggableElement);
    draggableElement.classList.remove('hide');

    // Resize the item if necessary
    draggableElement.style.width = "100px";
    draggableElement.style.height = "auto";

    // Check for correct drop zone and give visual feedback
    if (event.target.id === `dropzone${id.charAt(id.length - 1)}`) {
        //alert(`Correct! ${id} was dropped in the right zone!`);
        correctDropSound.play(); // Play correct sound if item dropped in the right zone
        event.target.style.backgroundColor = "green";

          // Show modal for correct answer after 1 second
        setTimeout(() => {
            modalMessage.textContent = `Yuupp! Book is the right anwer.`;
            actionButton.textContent = 'Move to Next Level';
            actionButton.onclick = () => { 
                resultModal.style.display = 'none'; 
                // Add any "next level" functionality here
                transitionToNextLevel(); // Redirect to next level
            };
            resultModal.style.display = 'flex';
        }, 1000);

    } else {
        //alert(`Try again! ${id} was dropped in the wrong zone.`);
        wrongDropSound.play(); // Play wrong sound if item dropped in the wrong zone
        event.target.style.backgroundColor = "red";

         // Show modal for incorrect answer after 1 second
         setTimeout(() => {
            modalMessage.textContent = `No! This is a wrong anwer.`;
            actionButton.textContent = 'Replay';
            actionButton.onclick = () => { 
                resultModal.style.display = 'none'; 
                // Add any "replay" functionality here
                replay();
            };
            resultModal.style.display = 'flex';
        }, 1000);
    }
}



// Redirect with transition animation
function transitionToNextLevel() {
    levelUpSound.play(); // Play level up sound
    const overlay = document.getElementById('transition-overlay2');
    const progressBar = document.getElementById('progress-bar2');
    overlay.classList.remove('hidden');

    // Reset progress bar
    progressBar.style.width = '0%';

    // Animate the progress bar
    let progress = 0;
    const duration = 3000; // Duration in milliseconds (2 seconds)
    const interval = 20; // Update interval in milliseconds
    const totalSteps = duration / interval; // Total steps to reach 100%
    
    const progressInterval = setInterval(() => {
        progress += 100 / totalSteps; // Increment progress
        progressBar.style.width = `${progress}%`; // Update width

        // Check if progress is complete
        if (progress >= 100) {
            clearInterval(progressInterval); // Stop the interval
            setTimeout(() => {
                window.location.href = 'next-level.html'; // Redirect after animation
            }, 200); // Optional short delay before redirecting
        }
    }, interval);

    
}



//Replay game by redirecting to the same page 
function replay() {
    levelUpSound.play(); // Play level up sound
    const overlay = document.getElementById('transition-overlay');
    const progressBar = document.getElementById('progress-bar');
    overlay.classList.remove('hidden');

    // Reset progress bar
    progressBar.style.width = '0%';

    // Animate the progress bar
    let progress = 0;
    const duration = 3000; // Duration in milliseconds (2 seconds)
    const interval = 20; // Update interval in milliseconds
    const totalSteps = duration / interval; // Total steps to reach 100%
    
    const progressInterval = setInterval(() => {
        progress += 100 / totalSteps; // Increment progress
        progressBar.style.width = `${progress}%`; // Update width

        // Check if progress is complete
        if (progress >= 100) {
            clearInterval(progressInterval); // Stop the interval
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect after animation
            }, 200); // Optional short delay before redirecting
        }
    }, interval);

}


// Get the link and add a click event listener
document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent immediate navigation

    // Play the click sound
    clickSound.play();

    // Navigate to the link after the sound finishes
    setTimeout(() => {
        window.location.href = this.href;
    }, 300); // Delay for sound duration (adjust if necessary)
});

