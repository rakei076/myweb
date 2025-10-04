// Timeline data with multi-language support
const timelineData = [
    {
        year: '2024',
        title: {
            zh: '开始个人博客项目',
            ja: '個人ブログプロジェクトを開始',
            en: 'Started Personal Blog Project'
        },
        description: {
            zh: '创建了这个个人博客网站，展示我的技能和经历。使用现代web技术构建响应式设计。',
            ja: 'この個人ブログウェブサイトを作成し、スキルと経験を紹介。モダンなウェブ技術でレスポンシブデザインを構築。',
            en: 'Created this personal blog website to showcase my skills and experiences. Built with modern web technologies and responsive design.'
        },
        tags: ['Web开发', 'JavaScript', 'CSS3', 'HTML5']
    },
    {
        year: '2023',
        title: {
            zh: '学习摄影技术',
            ja: '写真技術を学習',
            en: 'Learning Photography'
        },
        description: {
            zh: '开始认真学习摄影，探索不同的摄影风格和技巧。参与了多次摄影外拍活动。',
            ja: '真剣に写真を学び始め、さまざまな写真スタイルとテクニックを探求。複数の写真撮影活動に参加。',
            en: 'Started seriously learning photography, exploring different styles and techniques. Participated in multiple photo shooting activities.'
        },
        tags: ['摄影', '艺术', '创意']
    },
    {
        year: '2022',
        title: {
            zh: '深入学习Python编程',
            ja: 'Python プログラミングを深く学習',
            en: 'Deep Dive into Python Programming'
        },
        description: {
            zh: '专注于Python编程，学习了数据分析、机器学习和web开发。完成了多个实践项目。',
            ja: 'Pythonプログラミングに焦点を当て、データ分析、機械学習、ウェブ開発を学習。複数の実践プロジェクトを完了。',
            en: 'Focused on Python programming, learned data analysis, machine learning, and web development. Completed several hands-on projects.'
        },
        tags: ['Python', '机器学习', '数据分析']
    },
    {
        year: '2021',
        title: {
            zh: '开始旅游探索',
            ja: '旅行探索を開始',
            en: 'Started Travel Exploration'
        },
        description: {
            zh: '开始了我的旅游之旅，探索不同的城市和文化。记录旅途中的美好时光和有趣经历。',
            ja: '旅行の旅を始め、さまざまな都市と文化を探索。旅路での美しい時間と興味深い経験を記録。',
            en: 'Started my travel journey, exploring different cities and cultures. Documenting beautiful moments and interesting experiences along the way.'
        },
        tags: ['旅游', '文化', '探索']
    },
    {
        year: '2020',
        title: {
            zh: '游戏爱好发展',
            ja: 'ゲーム趣味の発展',
            en: 'Gaming Hobby Development'
        },
        description: {
            zh: '深入了解各种游戏类型，特别是策略游戏如帝国时代。享受游戏带来的挑战和乐趣。',
            ja: 'さまざまなゲームジャンルを深く理解し、特にAge of Empiresなどの戦略ゲーム。ゲームがもたらす挑戦と楽しさを享受。',
            en: 'Developed deep understanding of various game genres, especially strategy games like Age of Empires. Enjoying the challenges and fun that gaming brings.'
        },
        tags: ['游戏', '策略', '帝国时代']
    },
    {
        year: '2019',
        title: {
            zh: '建立学习笔记系统',
            ja: '学習ノートシステムを構築',
            en: 'Built Learning Note System'
        },
        description: {
            zh: '开发了个人学习笔记系统，用于记录和整理学习内容。提高了学习效率和知识管理能力。',
            ja: '個人学習ノートシステムを開発し、学習内容の記録と整理に使用。学習効率と知識管理能力を向上。',
            en: 'Developed a personal learning note system for recording and organizing study materials. Improved learning efficiency and knowledge management.'
        },
        tags: ['笔记', '学习', '系统开发']
    }
];

// Initialize timeline
function initializeTimeline() {
    const timelineContainer = document.querySelector('.timeline-items');
    
    if (!timelineContainer) return;
    
    // Clear existing items
    timelineContainer.innerHTML = '';
    
    // Create timeline items
    timelineData.forEach((item, index) => {
        const timelineItem = createTimelineItem(item, index);
        timelineContainer.appendChild(timelineItem);
    });
    
    // Add animation delay
    setTimeout(() => {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
}

// Create timeline item element
function createTimelineItem(data, index) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    
    // Create timeline content
    const content = document.createElement('div');
    content.className = 'timeline-content';
    
    // Create timeline dot
    const dot = document.createElement('div');
    dot.className = 'timeline-dot';
    
    // Year
    const year = document.createElement('div');
    year.className = 'timeline-year';
    year.textContent = data.year;
    
    // Title
    const title = document.createElement('h3');
    title.className = 'timeline-title';
    title.setAttribute('data-zh', data.title.zh);
    title.setAttribute('data-ja', data.title.ja);
    title.setAttribute('data-en', data.title.en);
    title.textContent = data.title[currentLanguage] || data.title.zh;
    
    // Description
    const description = document.createElement('p');
    description.className = 'timeline-description';
    description.setAttribute('data-zh', data.description.zh);
    description.setAttribute('data-ja', data.description.ja);
    description.setAttribute('data-en', data.description.en);
    description.textContent = data.description[currentLanguage] || data.description.zh;
    
    // Tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'timeline-tags';
    
    data.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'timeline-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // Assemble content
    content.appendChild(year);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(tagsContainer);
    
    // Assemble item
    item.appendChild(content);
    item.appendChild(dot);
    
    // Add hover effects
    addTimelineHoverEffects(item, content, dot);
    
    return item;
}

// Add hover effects to timeline items
function addTimelineHoverEffects(item, content, dot) {
    let isHovered = false;
    
    content.addEventListener('mouseenter', () => {
        if (!isHovered) {
            isHovered = true;
            
            // Scale animation
            content.style.transform = 'scale(1.05)';
            content.style.zIndex = '10';
            
            // Dot animation
            dot.style.transform = 'translate(-50%, -50%) scale(1.3)';
            dot.style.background = '#764ba2';
            
            // Add glow effect
            content.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
            
            // Animate tags
            const tags = content.querySelectorAll('.timeline-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                }, index * 50);
            });
        }
    });
    
    content.addEventListener('mouseleave', () => {
        if (isHovered) {
            isHovered = false;
            
            // Reset animations
            content.style.transform = 'scale(1)';
            content.style.zIndex = '1';
            
            // Reset dot
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
            dot.style.background = '#667eea';
            
            // Reset shadow
            content.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            
            // Reset tags
            const tags = content.querySelectorAll('.timeline-tag');
            tags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        }
    });
    
    // Click effect
    content.addEventListener('click', () => {
        // Add click animation
        content.style.transform = 'scale(0.98)';
        setTimeout(() => {
            content.style.transform = isHovered ? 'scale(1.05)' : 'scale(1)';
        }, 150);
        
        // Could add more functionality here, like opening a modal with more details
    });
}

// Update timeline language
function updateTimelineLanguage(lang) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const data = timelineData[index];
        if (data) {
            const title = item.querySelector('.timeline-title');
            const description = item.querySelector('.timeline-description');
            
            if (title && data.title[lang]) {
                title.textContent = data.title[lang];
            }
            
            if (description && data.description[lang]) {
                description.textContent = data.description[lang];
            }
        }
    });
}

// Add scroll-triggered animations for timeline
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.classList.add('animate-in');
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.2
    });
    
    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
        observer.observe(timelineSection);
    }
});