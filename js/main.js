// Language data
const translations = {
    zh: {
        'Choose Language / 言語選択 / 选择语言': '选择语言',
        'Personal Blog': '个人博客',
        'About': '关于我',
        'Timeline': '时间轴',
        'Interests': '兴趣爱好',
        'About Me': '关于我',
        'My Timeline': '我的时间轴',
        'My Interests': '兴趣爱好',
        'Hello! I\'m a developer who loves technology and life.': '你好！我是一名热爱技术和生活的开发者。',
        'I have a deep interest in programming, photography, travel, and gaming. Here I share my experiences and thoughts.': '我对编程、摄影、旅游和游戏都有着浓厚的兴趣。在这里，我分享我的经历和想法。',
        '© 2024 Personal Blog. Thank you for visiting!': '© 2024 个人博客. 感谢您的访问！'
    },
    ja: {
        'Choose Language / 言語選択 / 选择语言': '言語選択',
        'Personal Blog': '個人ブログ',
        'About': '私について',
        'Timeline': 'タイムライン',
        'Interests': '趣味',
        'About Me': '私について',
        'My Timeline': '私のタイムライン',
        'My Interests': '趣味',
        'Hello! I\'m a developer who loves technology and life.': 'こんにちは！私は技術と人生を愛する開発者です。',
        'I have a deep interest in programming, photography, travel, and gaming. Here I share my experiences and thoughts.': 'プログラミング、写真、旅行、ゲームに深い興味を持っています。ここで私の経験と考えを共有します。',
        '© 2024 Personal Blog. Thank you for visiting!': '© 2024 個人ブログ. ご訪問ありがとうございます！'
    },
    en: {
        'Choose Language / 言語選択 / 选择语言': 'Choose Language',
        'Personal Blog': 'Personal Blog',
        'About': 'About',
        'Timeline': 'Timeline',
        'Interests': 'Interests',
        'About Me': 'About Me',
        'My Timeline': 'My Timeline',
        'My Interests': 'My Interests',
        'Hello! I\'m a developer who loves technology and life.': 'Hello! I\'m a developer who loves technology and life.',
        'I have a deep interest in programming, photography, travel, and gaming. Here I share my experiences and thoughts.': 'I have a deep interest in programming, photography, travel, and gaming. Here I share my experiences and thoughts.',
        '© 2024 Personal Blog. Thank you for visiting!': '© 2024 Personal Blog. Thank you for visiting!'
    }
};

// Current language
let currentLanguage = 'zh';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has selected a language before
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        selectLanguage(savedLanguage);
    } else {
        showLanguageModal();
    }
    
    // Initialize timeline and word cloud
    initializeTimeline();
    initializeWordCloud();
    
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Add scroll animations
    addScrollAnimations();
});

// Language selection functions
function showLanguageModal() {
    const modal = document.getElementById('language-modal');
    const mainContent = document.getElementById('main-content');
    modal.style.display = 'flex';
    mainContent.classList.add('hidden');
}

function selectLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Hide modal and show main content
    const modal = document.getElementById('language-modal');
    const mainContent = document.getElementById('main-content');
    modal.style.display = 'none';
    mainContent.classList.remove('hidden');
    
    // Update page language
    document.documentElement.lang = lang;
    
    // Update all text elements
    updatePageLanguage(lang);
}

function updatePageLanguage(lang) {
    // Update elements with data attributes
    const elementsWithData = document.querySelectorAll('[data-' + lang + ']');
    elementsWithData.forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });
    
    // Update timeline content
    updateTimelineLanguage(lang);
}

// Smooth scrolling for navigation
function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Utility functions
function createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

function getRandomColor() {
    const colors = [
        'tech', 'creative', 'travel', 'gaming', 'lifestyle', 'learning'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomSize() {
    const sizes = ['large', 'medium', 'small', 'tiny'];
    const weights = [1, 2, 3, 4]; // Higher weight = more likely
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < sizes.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return sizes[i];
        }
    }
    return 'small';
}

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);