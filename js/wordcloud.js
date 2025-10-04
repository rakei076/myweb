// Word cloud data with categories and multi-language support
const wordCloudData = [
    // Technology
    { 
        text: { zh: 'Python', ja: 'Python', en: 'Python' }, 
        category: 'tech', 
        size: 'large',
        weight: 5 
    },
    { 
        text: { zh: 'JavaScript', ja: 'JavaScript', en: 'JavaScript' }, 
        category: 'tech', 
        size: 'large',
        weight: 5 
    },
    { 
        text: { zh: 'Web开发', ja: 'ウェブ開発', en: 'Web Development' }, 
        category: 'tech', 
        size: 'medium',
        weight: 4 
    },
    { 
        text: { zh: '机器学习', ja: '機械学習', en: 'Machine Learning' }, 
        category: 'tech', 
        size: 'medium',
        weight: 4 
    },
    { 
        text: { zh: '数据分析', ja: 'データ分析', en: 'Data Analysis' }, 
        category: 'tech', 
        size: 'small',
        weight: 3 
    },
    
    // Creative
    { 
        text: { zh: '摄影', ja: '写真', en: 'Photography' }, 
        category: 'creative', 
        size: 'large',
        weight: 5 
    },
    { 
        text: { zh: '设计', ja: 'デザイン', en: 'Design' }, 
        category: 'creative', 
        size: 'medium',
        weight: 3 
    },
    { 
        text: { zh: '创意', ja: '創造性', en: 'Creativity' }, 
        category: 'creative', 
        size: 'small',
        weight: 3 
    },
    
    // Travel
    { 
        text: { zh: '旅游', ja: '旅行', en: 'Travel' }, 
        category: 'travel', 
        size: 'large',
        weight: 5 
    },
    { 
        text: { zh: '探索', ja: '探索', en: 'Exploration' }, 
        category: 'travel', 
        size: 'medium',
        weight: 3 
    },
    { 
        text: { zh: '文化', ja: '文化', en: 'Culture' }, 
        category: 'travel', 
        size: 'small',
        weight: 3 
    },
    { 
        text: { zh: '冒险', ja: '冒険', en: 'Adventure' }, 
        category: 'travel', 
        size: 'tiny',
        weight: 2 
    },
    
    // Gaming
    { 
        text: { zh: '帝国时代', ja: 'Age of Empires', en: 'Age of Empires' }, 
        category: 'gaming', 
        size: 'large',
        weight: 5 
    },
    { 
        text: { zh: '策略游戏', ja: '戦略ゲーム', en: 'Strategy Games' }, 
        category: 'gaming', 
        size: 'medium',
        weight: 4 
    },
    { 
        text: { zh: '游戏', ja: 'ゲーム', en: 'Gaming' }, 
        category: 'gaming', 
        size: 'medium',
        weight: 4 
    },
    { 
        text: { zh: '竞技', ja: '競技', en: 'Competition' }, 
        category: 'gaming', 
        size: 'small',
        weight: 2 
    },
    
    // Learning
    { 
        text: { zh: '笔记', ja: 'ノート', en: 'Notes' }, 
        category: 'learning', 
        size: 'large',
        weight: 5 
    },
    { 
        text: { zh: '学习', ja: '学習', en: 'Learning' }, 
        category: 'learning', 
        size: 'medium',
        weight: 4 
    },
    { 
        text: { zh: '知识管理', ja: '知識管理', en: 'Knowledge Management' }, 
        category: 'learning', 
        size: 'small',
        weight: 3 
    },
    { 
        text: { zh: '效率', ja: '効率', en: 'Efficiency' }, 
        category: 'learning', 
        size: 'tiny',
        weight: 2 
    },
    
    // Lifestyle
    { 
        text: { zh: '生活', ja: '生活', en: 'Lifestyle' }, 
        category: 'lifestyle', 
        size: 'medium',
        weight: 3 
    },
    { 
        text: { zh: '思考', ja: '思考', en: 'Thinking' }, 
        category: 'lifestyle', 
        size: 'small',
        weight: 3 
    },
    { 
        text: { zh: '分享', ja: '共有', en: 'Sharing' }, 
        category: 'lifestyle', 
        size: 'small',
        weight: 2 
    },
    { 
        text: { zh: '成长', ja: '成長', en: 'Growth' }, 
        category: 'lifestyle', 
        size: 'tiny',
        weight: 2 
    }
];

// Initialize word cloud
function initializeWordCloud() {
    const wordCloudContainer = document.querySelector('.wordcloud');
    
    if (!wordCloudContainer) return;
    
    // Clear existing items
    wordCloudContainer.innerHTML = '';
    
    // Shuffle the data for random positioning
    const shuffledData = [...wordCloudData].sort(() => Math.random() - 0.5);
    
    // Create word cloud items
    shuffledData.forEach((item, index) => {
        const wordElement = createWordCloudItem(item, index);
        wordCloudContainer.appendChild(wordElement);
    });
    
    // Add entrance animations
    animateWordCloudEntrance();
}

// Create word cloud item element
function createWordCloudItem(data, index) {
    const wordElement = document.createElement('div');
    wordElement.className = `word-item ${data.category} size-${data.size}`;
    
    // Set text content based on current language
    wordElement.textContent = data.text[currentLanguage] || data.text.zh;
    
    // Store language data for later updates
    wordElement.setAttribute('data-zh', data.text.zh);
    wordElement.setAttribute('data-ja', data.text.ja);
    wordElement.setAttribute('data-en', data.text.en);
    
    // Add click handler
    addWordClickHandler(wordElement, data);
    
    // Add random rotation for visual interest
    const rotation = (Math.random() - 0.5) * 10; // Random rotation between -5 and 5 degrees
    wordElement.style.transform = `rotate(${rotation}deg)`;
    
    // Add animation delay
    wordElement.style.animationDelay = `${index * 0.1}s`;
    
    // Add some items as featured (with pulse animation)
    if (data.weight >= 5) {
        wordElement.classList.add('featured');
    }
    
    return wordElement;
}

// Add click handler to word items
function addWordClickHandler(element, data) {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click animation
        element.style.transform = 'scale(0.9)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
        
        // Show info about the interest (could be expanded)
        showInterestInfo(data);
    });
}

// Show information about clicked interest
function showInterestInfo(data) {
    const messages = {
        zh: {
            'Python': '我热爱Python编程，它是我最常用的编程语言之一！',
            '摄影': '摄影让我能够捕捉生活中的美好瞬间。',
            '旅游': '旅游开阔了我的视野，让我体验不同的文化。',
            '帝国时代': '帝国时代是我最喜欢的策略游戏，充满挑战性！',
            '笔记': '做笔记帮助我更好地整理和记忆知识。',
            'default': '这是我的一个兴趣爱好！'
        },
        ja: {
            'Python': 'Pythonプログラミングが大好きで、最もよく使うプログラミング言語の一つです！',
            '写真': '写真は人生の美しい瞬間を捉えることができます。',
            '旅行': '旅行は私の視野を広げ、異なる文化を体験させてくれます。',
            'Age of Empires': 'Age of Empiresは私のお気に入りの戦略ゲームで、とても挑戦的です！',
            'ノート': 'ノートを取ることで、知識をより良く整理し記憶できます。',
            'default': 'これは私の趣味の一つです！'
        },
        en: {
            'Python': 'I love Python programming, it\'s one of my most frequently used programming languages!',
            'Photography': 'Photography allows me to capture beautiful moments in life.',
            'Travel': 'Travel broadens my horizons and lets me experience different cultures.',
            'Age of Empires': 'Age of Empires is my favorite strategy game, very challenging!',
            'Notes': 'Taking notes helps me better organize and remember knowledge.',
            'default': 'This is one of my interests!'
        }
    };
    
    const text = data.text[currentLanguage];
    const message = messages[currentLanguage][text] || messages[currentLanguage]['default'];
    
    // Create and show a simple tooltip or alert
    showTooltip(message, event.target);
}

// Show tooltip for word cloud items
function showTooltip(message, element) {
    // Remove existing tooltips
    const existingTooltips = document.querySelectorAll('.word-tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'word-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        font-size: 0.9rem;
        max-width: 200px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    
    // Show tooltip
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    });
    
    // Hide tooltip after 3 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}

// Animate word cloud entrance
function animateWordCloudEntrance() {
    const words = document.querySelectorAll('.word-item');
    
    words.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = word.style.transform.replace('translateY(20px)', 'translateY(0)');
        }, index * 100);
    });
}

// Update word cloud language
function updateWordCloudLanguage(lang) {
    const wordItems = document.querySelectorAll('.word-item');
    
    wordItems.forEach(item => {
        const text = item.getAttribute(`data-${lang}`);
        if (text) {
            item.textContent = text;
        }
    });
}

// Add scroll-triggered animations for word cloud
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const wordItems = entry.target.querySelectorAll('.word-item');
                wordItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = item.style.transform.replace('scale(0.8)', 'scale(1)');
                        item.classList.add('animate-in');
                    }, index * 50);
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    const wordCloudSection = document.querySelector('.interests-section');
    if (wordCloudSection) {
        observer.observe(wordCloudSection);
    }
});

// Add floating animation to word cloud items
function addFloatingAnimation() {
    const wordItems = document.querySelectorAll('.word-item');
    
    wordItems.forEach((item, index) => {
        const delay = index * 0.5; // Stagger the animations
        const duration = 3 + Math.random() * 2; // Random duration between 3-5 seconds
        
        item.style.animation = `wordFloat ${duration}s ease-in-out ${delay}s infinite alternate`;
    });
}

// Initialize floating animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addFloatingAnimation, 2000); // Start floating after initial entrance
});