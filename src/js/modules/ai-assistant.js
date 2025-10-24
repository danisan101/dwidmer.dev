// AI Assistant Module
export function initAIAssistant() {
    console.log('🤖 Initializing AI Assistant...');
    
    // Create assistant UI
    createAssistantUI();
    
    // Initialize conversation
    let conversationHistory = [];
    let isOpen = false;
    
    const responses = {
        greeting: [
            "Hallo! Ich bin Daniels digitaler Assistent. Wie kann ich Ihnen helfen?",
            "Willkommen! Ich kann Ihnen bei Fragen zu Daniels Projekten helfen.",
            "Hi! Möchten Sie mehr über Daniels Arbeit erfahren?"
        ],
        projects: [
            "Daniel hat mehrere coole Projekte entwickelt! Schauen Sie sich die 'Schälle Sau' iOS App oder seine Website an.",
            "Seine Projekte umfassen iOS-Entwicklung, Web-Design und kreative Lösungen. Welches interessiert Sie?",
            "Daniel ist spezialisiert auf Frontend-Development und Mobile Apps. Soll ich Ihnen Details zeigen?"
        ],
        skills: [
            "Daniel beherrscht JavaScript, Swift, React, und vieles mehr! Er ist ein Full-Stack-Developer.",
            "Seine Expertise liegt in Frontend-Development, iOS-Apps, und UI/UX Design.",
            "Er arbeitet mit modernen Technologien wie Vite, Node.js, und Swift."
        ],
        contact: [
            "Sie können Daniel über das Kontaktformular erreichen oder direkt eine E-Mail senden.",
            "Für Projekte und Zusammenarbeit nutzen Sie am besten das Kontaktformular auf der Website.",
            "Daniel freut sich über neue Projekte! Kontaktieren Sie ihn gerne."
        ],
        games: [
            "Cool! Daniel hat Snake und Tetris als Easter Eggs programmiert! Drücken Sie Ctrl+Alt+Shift+S für Snake oder Ctrl+Alt+Shift+T für Tetris.",
            "Die Spiele sind mit WASD oder Pfeiltasten steuerbar. Viel Spaß beim Spielen!",
            "Daniel liebt Retro-Games! Probieren Sie die versteckten Spiele aus."
        ],
        default: [
            "Das ist eine interessante Frage! Lassen Sie mich das für Sie recherchieren...",
            "Hmm, das weiß ich nicht genau. Aber ich kann Ihnen bei anderen Fragen helfen!",
            "Gute Frage! Daniel könnte Ihnen da sicher mehr erzählen. Kontaktieren Sie ihn gerne!"
        ]
    };
    
    function getResponse(userInput) {
        const input = userInput.toLowerCase();
        
        if (input.includes('hallo') || input.includes('hi') || input.includes('hey')) {
            return getRandomResponse(responses.greeting);
        } else if (input.includes('projekt') || input.includes('arbeit') || input.includes('app')) {
            return getRandomResponse(responses.projects);
        } else if (input.includes('skill') || input.includes('können') || input.includes('technologie')) {
            return getRandomResponse(responses.skills);
        } else if (input.includes('kontakt') || input.includes('erreichen') || input.includes('email')) {
            return getRandomResponse(responses.contact);
        } else if (input.includes('spiel') || input.includes('game') || input.includes('snake') || input.includes('tetris')) {
            return getRandomResponse(responses.games);
        } else {
            return getRandomResponse(responses.default);
        }
    }
    
    function getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
    
    function createAssistantUI() {
        // Create floating assistant button
        const assistantButton = document.createElement('div');
        assistantButton.className = 'ai-assistant-button';
        assistantButton.innerHTML = '🤖';
        assistantButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            font-size: 24px;
        `;
        
        // Create chat window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'ai-chat-window';
        chatWindow.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #ffffff;
            border-radius: 15px;
            display: none;
            flex-direction: column;
            z-index: 1001;
            font-family: 'Space Mono', monospace;
        `;
        
        // Chat header
        const chatHeader = document.createElement('div');
        chatHeader.innerHTML = `
            <div style="padding: 15px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; color: #fff;">Daniel's Assistant</h3>
                <button id="closeChat" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 20px;">✕</button>
            </div>
        `;
        
        // Chat messages
        const chatMessages = document.createElement('div');
        chatMessages.className = 'chat-messages';
        chatMessages.style.cssText = `
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            color: #fff;
        `;
        
        // Chat input
        const chatInput = document.createElement('div');
        chatInput.innerHTML = `
            <div style="padding: 15px; border-top: 1px solid #333; display: flex; gap: 10px;">
                <input type="text" id="chatInput" placeholder="Fragen Sie mich etwas..." 
                       style="flex: 1; padding: 10px; background: #333; border: 1px solid #555; color: #fff; border-radius: 5px;">
                <button id="sendMessage" style="padding: 10px 15px; background: #667eea; border: none; color: #fff; border-radius: 5px; cursor: pointer;">Send</button>
            </div>
        `;
        
        chatWindow.appendChild(chatHeader);
        chatWindow.appendChild(chatMessages);
        chatWindow.appendChild(chatInput);
        
        document.body.appendChild(assistantButton);
        document.body.appendChild(chatWindow);
        
        // Add welcome message
        addMessage('assistant', 'Hallo! Ich bin Daniels digitaler Assistent. Wie kann ich Ihnen helfen?');
        
        // Event listeners
        assistantButton.addEventListener('click', () => {
            isOpen = !isOpen;
            chatWindow.style.display = isOpen ? 'flex' : 'none';
            if (isOpen) {
                document.getElementById('chatInput').focus();
            }
        });
        
        document.getElementById('closeChat').addEventListener('click', () => {
            isOpen = false;
            chatWindow.style.display = 'none';
        });
        
        document.getElementById('sendMessage').addEventListener('click', sendMessage);
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Hover effects
        assistantButton.addEventListener('mouseenter', () => {
            assistantButton.style.transform = 'scale(1.1)';
            assistantButton.style.boxShadow = '0 6px 25px rgba(0,0,0,0.4)';
        });
        
        assistantButton.addEventListener('mouseleave', () => {
            assistantButton.style.transform = 'scale(1)';
            assistantButton.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        });
    }
    
    function addMessage(sender, message) {
        const chatMessages = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 10px;
            max-width: 80%;
            ${sender === 'user' ? 
                'background: #667eea; margin-left: auto; text-align: right;' : 
                'background: #333; margin-right: auto;'
            }
        `;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            addMessage('user', message);
            conversationHistory.push({ role: 'user', content: message });
            
            // Simulate typing delay
            setTimeout(() => {
                const response = getResponse(message);
                addMessage('assistant', response);
                conversationHistory.push({ role: 'assistant', content: response });
            }, 1000);
            
            input.value = '';
        }
    }
    
    console.log('✅ AI Assistant initialized!');
}
