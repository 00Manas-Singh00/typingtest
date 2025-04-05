const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".container .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistakes span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector(".start-btn");
const timeBar = document.querySelector(".timer");

// Authentication elements
const authContainer = document.getElementById('authContainer');
const mainContent = document.getElementById('mainContent');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const usernameDisplay = document.getElementById('usernameDisplay');

// Mode and time selection elements
const modeButtons = document.querySelectorAll('.mode-btn');
const timeButtons = document.querySelectorAll('.time-btn');
let currentMode = 'normal';
let maxTime = 60;

let timer;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

// Settings visibility elements
const testSettings = document.getElementById('testSettings');
const settingsToggle = document.getElementById('settingsToggle');
const confirmBtn = document.querySelector('.confirm-btn');

// Button elements
const startBtn = document.querySelector('.start-btn');
const retryBtn = document.querySelector('.retry-btn');
const nextBtn = document.querySelector('.next-btn');
const testHistoryContainer = document.getElementById('testHistory');

let testHistory = [];

// Statistics elements
const statsBtn = document.getElementById('statsBtn');
const statsModal = document.getElementById('statsModal');
const closeBtn = document.querySelector('.close-btn');
let performanceChart = null;

// Test section element
const testSection = document.getElementById('testSection');

function loadParagraph() {
  const paragraph = generateUniqueParagraph(currentMode);
  typingText.innerHTML = "";
  for (const char of paragraph) {
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => {
    input.focus();
  });
}

function initTyping() {
  timeBar.style.display = "block";

  triggerAnimation();
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);
  
  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    // Handle backspace
    if (input.value.length < charIndex) {
      charIndex--;
      if (char[charIndex].classList.contains("incorrect")) {
        mistake--;
      }
      char[charIndex].classList.remove("correct", "incorrect", "active");
      if (charIndex > 0) {
        char[charIndex - 1].classList.add("active");
      }
      return;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
    }
    char[charIndex].classList.remove("active");
    charIndex++;
    if (charIndex < char.length) {
      char[charIndex].classList.add("active");
    }
    mistakes.innerHTML = mistake;
    cpm.innerText = charIndex - mistake;
  } else {
    // Check if we've reached the end of the current paragraph
    if (charIndex >= char.length && timeLeft > 0) {
      // Clear the input field
      input.value = "";
      // Reset character index and mistakes for the new paragraph
      charIndex = 0;
      // Load a new paragraph
      loadParagraph();
      // Add active class to the first character of the new paragraph
      typingText.querySelectorAll("span")[0].classList.add("active");
    } else {
      clearInterval(timer);
      input.value = "";
      // Show retry and next buttons when test is complete
      startBtn.classList.add('hidden');
      retryBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    }
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    let wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
    // Show retry and next buttons when test is complete
    startBtn.classList.add('hidden');
    retryBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  }
}

function reset() {
  timeBar.style.display = "none";
  timeBar.style.animation = 'none';
  timeBar.offsetHeight; // Trigger reflow
  timeBar.style.animation = null;

  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  time.innerText = timeLeft;
  mistakes.innerText = 0;
  wpm.innerText = 0;
  cpm.innerText = 0;
  input.value = "";
  
  // Show start button and hide retry/next buttons
  startBtn.classList.remove('hidden');
  retryBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
}

function triggerAnimation() {
  timeBar.style.animation = `expand ${maxTime}s forwards`;
}

// Check if user is already logged in and initialize the page
document.addEventListener('DOMContentLoaded', () => {
  if (userManager.currentUser) {
    showMainContent();
    loadParagraph(); // Load the paragraph when user is logged in
  } else {
    showAuthContainer();
  }
});

// Event listeners for authentication
loginBtn.addEventListener('click', () => {
  const result = userManager.login(usernameInput.value, passwordInput.value);
  if (result.success) {
    showMainContent();
    loadParagraph(); // Load the paragraph after successful login
  } else {
    alert(result.message);
  }
});

registerBtn.addEventListener('click', () => {
  const result = userManager.register(usernameInput.value, passwordInput.value);
  if (result.success) {
    showMainContent();
    loadParagraph(); // Load the paragraph after successful registration
  } else {
    alert(result.message);
  }
});

logoutBtn.addEventListener('click', () => {
  userManager.logout();
  showAuthContainer();
});

function showMainContent() {
  authContainer.style.display = 'none';
  mainContent.style.display = 'block';
  usernameDisplay.textContent = userManager.currentUser.username;
}

function showAuthContainer() {
  authContainer.style.display = 'flex';
  mainContent.style.display = 'none';
  usernameInput.value = '';
  passwordInput.value = '';
}

// Mode and time selection event listeners
modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    modeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentMode = button.dataset.mode;
    // Show test section when a mode is selected
    testSection.classList.remove('hidden');
  });
});

timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    timeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    maxTime = parseInt(button.dataset.time);
    timeLeft = maxTime;
    time.innerText = timeLeft;
  });
});

// Event listeners for the action buttons
startBtn.addEventListener('click', () => {
  reset();
  timeBar.style.display = "block";
  triggerAnimation();
  isTyping = true;
  timer = setInterval(initTime, 1000);
  input.focus();
});

retryBtn.addEventListener('click', () => {
  reset();
  timeBar.style.display = "block";
  triggerAnimation();
  isTyping = true;
  timer = setInterval(initTime, 1000);
  input.focus();
});

nextBtn.addEventListener('click', () => {
  addToHistory();
  reset();
});

// Remove the input event listener that was automatically starting the test
input.removeEventListener("input", initTyping);
input.addEventListener("input", () => {
  if (isTyping) {
    initTyping();
  }
});

function addToHistory() {
  const wpmVal = parseInt(wpm.innerText);
  const accuracy = Math.round(((charIndex - mistake) / charIndex) * 100);
  
  const testResult = {
    date: new Date().toLocaleString(),
    wpm: wpmVal,
    accuracy: accuracy,
    mistakes: mistake,
    mode: currentMode,
    duration: maxTime
  };
  
  testHistory.unshift(testResult);
  updateHistoryDisplay();
  
  // Update the chart if it's visible
  if (statsModal.classList.contains('visible')) {
    updatePerformanceChart();
  }
}

function updateHistoryDisplay() {
  testHistoryContainer.innerHTML = testHistory.map(test => `
    <div class="history-item">
      <span class="date">${test.date}</span>
      <span class="wpm">${test.wpm} WPM</span>
      <span class="accuracy">${test.accuracy}% Accuracy</span>
      <span class="mistakes">${test.mistakes} Mistakes</span>
      <span class="mode">${test.mode}</span>
      <span class="duration">${test.duration}s</span>
    </div>
  `).join('');
}

// Statistics button event listener
statsBtn.addEventListener('click', () => {
  statsModal.classList.add('visible');
  updatePerformanceChart();
});

// Close button event listener
closeBtn.addEventListener('click', () => {
  statsModal.classList.remove('visible');
});

// Close modal when clicking outside
statsModal.addEventListener('click', (e) => {
  if (e.target === statsModal) {
    statsModal.classList.remove('visible');
  }
});

function updatePerformanceChart() {
  const ctx = document.getElementById('performanceChart').getContext('2d');
  
  // Destroy existing chart if it exists
  if (performanceChart) {
    performanceChart.destroy();
  }

  // Prepare data for the chart
  const labels = testHistory.map(test => {
    const date = new Date(test.date);
    return `${date.getHours()}:${date.getMinutes()}`;
  }).reverse();

  const wpmData = testHistory.map(test => test.wpm).reverse();
  const accuracyData = testHistory.map(test => test.accuracy).reverse();

  // Create the chart
  performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'WPM',
          data: wpmData,
          borderColor: '#424242',
          backgroundColor: 'rgba(66, 66, 66, 0.1)',
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Accuracy (%)',
          data: accuracyData,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'WPM'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: 'Accuracy (%)'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      }
    }
  });
}

// Confirm button event listener
confirmBtn.addEventListener('click', () => {
  testSettings.classList.add('hidden');
  settingsToggle.classList.remove('hidden');
  // Show test section when settings are confirmed
  testSection.classList.remove('hidden');
  reset();
});

// Settings toggle button event listener
settingsToggle.addEventListener('click', () => {
  testSettings.classList.remove('hidden');
  settingsToggle.classList.add('hidden');
  // Hide test section when settings are opened
  testSection.classList.add('hidden');
});
