document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');

    // Initial greeting already in HTML

    // Add event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Focus on input field when page loads
    userInput.focus();

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addUserMessage(message);
        
        // Clear input field
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate bot response with slight delay for realism
        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = generateResponse(message);
            addBotMessage(botResponse);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatBox.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatBox.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function generateResponse(userMessage) {
        // Convert to lowercase for easier matching
        const message = userMessage.toLowerCase();
        
        // Rule-based responses for snake game topics
        
        // Greetings
        if (containsAny(message, ['hello', 'hi', 'hey', 'greetings', 'howdy'])) {
            return "Hello there! How can I help you with snake games today?";
        }
        
        // Game controls and how to play
        if (containsAny(message, ['control', 'move', 'how to play', 'arrow', 'wasd', 'keys', 'how do i play', 'how can i play', 'play snake', 'play the game', 'how do you play'])) {
            return "In most snake games, you can control the snake using arrow keys (↑, ↓, ←, →) or WASD keys. The snake moves continuously in the direction you choose, and you need to guide it to food while avoiding obstacles and its own tail. The goal is to eat as much food as possible and grow your snake without crashing!";
        }
        
        // Game rules
        if (containsAny(message, ['rule', 'how does it work', 'objective', 'goal', 'aim', 'purpose', 'what is the point'])) {
            return "The basic rules of Snake are simple: guide your snake to eat food items that appear on the screen. Each time your snake eats food, it grows longer. The game ends if your snake hits a wall or collides with its own body. The objective is to grow as long as possible without crashing!";
        }
        
        // Game history
        if (containsAny(message, ['history', 'origin', 'first', 'invented', 'creator', 'old', 'when was', 'who made'])) {
            return "Snake games originated in the 1976 arcade game 'Blockade' by Gremlin Industries. The concept became widely popular in 1997 when Nokia included the game on their mobile phones, programmed by Taneli Armanto. Since then, countless variations have been created, making it one of the most recognizable video game genres.";
        }
        
        // Tips and strategies
        if (containsAny(message, ['tip', 'strategy', 'advice', 'hint', 'how to win', 'score', 'better', 'improve', 'get good'])) {
            return "Here are some tips for playing Snake: 1) Plan your moves ahead and leave yourself escape routes. 2) Use the edges of the screen to your advantage. 3) Create patterns like spirals to maximize space usage. 4) Start slow and increase your speed as you gain confidence. 5) Be extra careful when your snake gets longer, as it's easier to accidentally collide with yourself.";
        }
        
        // Different versions
        if (containsAny(message, ['version', 'different', 'types', 'variation', 'slither', 'multiplayer', 'kinds of', 'other games'])) {
            return "There are many versions of Snake games! Classic versions like Nokia's Snake focus on single-player gameplay. Modern versions include multiplayer games like Slither.io where you compete against other players online, Little Big Snake with power-ups and customizations, and Paper.io which combines snake mechanics with territory control. Each offers a unique twist on the classic formula.";
        }
        
        // Difficulty
        if (containsAny(message, ['difficult', 'hard', 'easy', 'challenge', 'level', 'beginner', 'expert'])) {
            return "Snake games are known for being easy to learn but difficult to master. The difficulty increases naturally as your snake grows longer, giving you less room to maneuver. Many modern versions offer different difficulty levels or gradually increase the speed as you progress. The key to improving is practice and developing good spatial awareness!";
        }
        
        // Food and power-ups
        if (containsAny(message, ['food', 'eat', 'power', 'grow', 'apple', 'item', 'collect', 'pickup'])) {
            return "In classic Snake, the food is usually represented as a simple dot or apple. Eating food makes your snake grow longer and increases your score. Modern versions have introduced various power-ups like speed boosts, score multipliers, shields, or the ability to pass through walls temporarily. Some games even have different types of food that provide different benefits!";
        }
        
        // High scores
        if (containsAny(message, ['high score', 'leaderboard', 'record', 'best', 'top', 'highest', 'champion'])) {
            return "Many Snake games feature leaderboards to track high scores. The world record for the original Nokia Snake game is incredibly high, with some players managing to fill almost the entire screen! Online versions like Slither.io have global leaderboards where players compete for the top spots. What's your personal best score?";
        }
        
        // Game over conditions
        if (containsAny(message, ['game over', 'lose', 'die', 'crash', 'collision', 'end', 'fail', 'how to lose'])) {
            return "In most Snake games, you lose when your snake collides with a wall or with its own body. Some modern versions have added different game over conditions, like being eaten by larger snakes in multiplayer games. The longer your snake gets, the more challenging it becomes to avoid these collisions!";
        }
        
        // Platforms
        if (containsAny(message, ['platform', 'play on', 'mobile', 'phone', 'computer', 'online', 'where can i play', 'where to play'])) {
            return "Snake games are available on virtually every platform! You can play classic versions on mobile phones, modern versions in web browsers, or download dedicated apps. Many versions are free to play online, while others offer premium features or ad-free experiences. You can even find Snake games on smart TVs and gaming consoles!";
        }
        
        // Customization
        if (containsAny(message, ['custom', 'skin', 'color', 'appearance', 'look', 'change', 'personalize'])) {
            return "Modern Snake games often offer customization options. You can change your snake's color, pattern, or even give it a unique skin like a dragon or robot. Games like Slither.io and Little Big Snake have extensive customization options that you can unlock through gameplay or purchase.";
        }
        
        // Multiplayer
        if (containsAny(message, ['multiplayer', 'online', 'against', 'compete', 'other players', 'friends', 'pvp'])) {
            return "Multiplayer Snake games like Slither.io have become incredibly popular. In these games, you compete against other players in real-time, trying to grow your snake while avoiding collisions. Some games add competitive elements like the ability to trap other players or steal their food. It adds a whole new strategic dimension to the classic gameplay!";
        }
        
        // Development
        if (containsAny(message, ['develop', 'create', 'make', 'code', 'program', 'build', 'design', 'own game'])) {
            return "Snake is one of the most popular games for beginner programmers to create! It teaches fundamental programming concepts like loops, conditions, and collision detection. You can create a basic Snake game with languages like JavaScript, Python, or Java. There are many tutorials online that can guide you through the process step by step.";
        }
        
        // Thank you responses
        if (containsAny(message, ['thank', 'thanks', 'appreciate', 'helpful', 'good answer'])) {
            return "You're welcome! I'm happy to help with any other questions about snake games. Happy gaming!";
        }
        
        // Goodbye responses
        if (containsAny(message, ['bye', 'goodbye', 'see you', 'farewell', 'later'])) {
            return "Goodbye! Feel free to come back if you have more questions about snake games. Have fun playing!";
        }
        
        // Default response for unrecognized queries
        return "I'm not sure I understand that question about snake games. You can ask me about how to play, game history, different versions, strategies, or anything else related to snake games!";
    }

    // Helper function to check if message contains any of the keywords
    function containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
});
