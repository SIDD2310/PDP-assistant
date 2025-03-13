const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const typingIndicator = document.getElementById('typingIndicator');

const quickReplies = [
    'Eligibility requirements?',
    'Workshop schedule',
    'Volunteer experience options',
    'How to apply?',
    'Program timeline',
    'Interview preparation'
];

// Event Listeners
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Focus input on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        userInput.focus();
        
        // Add entrance animation to initial message
        const initialMessage = document.querySelector('.bot-message');
        if (initialMessage) {
            initialMessage.style.opacity = '0';
            initialMessage.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                initialMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                initialMessage.style.opacity = '1';
                initialMessage.style.transform = 'translateY(0)';
            }, 300);
        }
    }, 500);
});

// Add scroll animation
const animateScroll = (element, to, duration) => {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScrollStep = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            requestAnimationFrame(animateScrollStep);
        }
    };

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animateScrollStep);
};

// Main message handling function
async function sendMessage(userMessage = null) {
    const message = userMessage || userInput.value.trim();
    if (!message) return;

    // Add user message and clear input
    addMessage(message, 'user');
    if (!userMessage) userInput.value = '';
    
    // Show typing indicator with animation
    showTypingIndicator();

    try {
        // Get response from backend
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        // Simulate typing delay based on message length for realism
        const typingDelay = Math.min(1000 + data.text.length * 5, 3000);
        
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(data.text, 'bot');
            
            // Add quick replies with slight delay for better visual flow
            setTimeout(() => {
                addQuickReplies();
            }, 400);
            
        }, typingDelay);

    } catch (error) {
        console.error('Chat Error:', error);
        hideTypingIndicator();
        addMessage('Sorry, we\'re experiencing technical difficulties. Please try again later or email pdprogram@unsw.edu.au', 'bot');
    }
}

// Helper functions
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    // Set initial state for animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    if (sender === 'bot') {
        // Parse Markdown and sanitize HTML
        const parsedHtml = marked.parse(text);
        const cleanHtml = DOMPurify.sanitize(parsedHtml);
        messageDiv.innerHTML = cleanHtml;
    } else {
        messageDiv.textContent = text;
    }

    chatMessages.appendChild(messageDiv);
    
    // Trigger animation after a small delay
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
    
    scrollToBottom();
}

function addQuickReplies() {
    // Clear existing quick replies with fade-out animation
    const existingReplies = document.querySelectorAll('.quick-reply');
    existingReplies.forEach(reply => {
        reply.style.opacity = '0';
        reply.style.transform = 'translateY(10px)';
        setTimeout(() => reply.remove(), 300);
    });

    // Create new quick reply buttons
    const quickReplyDiv = document.createElement('div');
    quickReplyDiv.className = 'quick-reply';
    quickReplyDiv.style.opacity = '0';
    quickReplyDiv.style.transform = 'translateY(10px)';
    
    quickReplies.forEach((reply, index) => {
        const btn = document.createElement('button');
        btn.textContent = reply;
        btn.style.transitionDelay = `${index * 0.05}s`;
        btn.onclick = () => sendMessage(reply);
        quickReplyDiv.appendChild(btn);
    });
    
    chatMessages.appendChild(quickReplyDiv);
    
    // Trigger fade-in animation
    setTimeout(() => {
        quickReplyDiv.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        quickReplyDiv.style.opacity = '1';
        quickReplyDiv.style.transform = 'translateY(0)';
    }, 100);
    
    scrollToBottom();
}

function showTypingIndicator() {
    typingIndicator.style.display = 'block';
    typingIndicator.style.opacity = '0';
    typingIndicator.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        typingIndicator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        typingIndicator.style.opacity = '1';
        typingIndicator.style.transform = 'translateY(0)';
    }, 10);
    
    scrollToBottom();
}

function hideTypingIndicator() {
    typingIndicator.style.opacity = '0';
    typingIndicator.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 300);
}

function scrollToBottom() {
    const target = chatMessages.scrollHeight;
    animateScroll(chatMessages, target, 500);
}

// Initial quick replies with animation
window.onload = () => {
    setTimeout(() => {
        addQuickReplies();
    }, 1000);
};

// Add wave effect on button click
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
});

// Add this to your script.js file

// Create the dark mode toggle button
function addDarkModeToggle() {
    const chatHeader = document.querySelector('.chat-header');
    
    // Create toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.innerHTML = '🌙'; // Moon emoji for dark mode
    darkModeToggle.className = 'mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.title = 'Toggle dark mode';
    
    // Add styles inline (or you can add them to your CSS file)
    darkModeToggle.style.marginLeft = 'auto';
    darkModeToggle.style.width = '40px';
    darkModeToggle.style.height = '40px';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.display = 'flex';
    darkModeToggle.style.alignItems = 'center';
    darkModeToggle.style.justifyContent = 'center';
    darkModeToggle.style.padding = '0';
    darkModeToggle.style.fontSize = '1.2rem';
    
    // Append to header
    chatHeader.appendChild(darkModeToggle);
    
    // Initialize dark mode from local storage preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️'; // Sun emoji for light mode
    }
    
    // Add event listener for toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Toggle dark mode function
function toggleDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Update button icon
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    
    // Save preference to local storage
    localStorage.setItem('darkMode', isDarkMode);
    
    // Add a subtle animation
    document.body.style.transition = 'background 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
}

// Call this function when the page loads
window.addEventListener('load', function() {
    addDarkModeToggle();
});