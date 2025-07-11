
// Create modern floating particles with minimal black and white styling
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 30 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
        
        // Pure white particles
        particle.style.background = '#ffffff';
        particle.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.3)';
        
        particleContainer.appendChild(particle);
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Ultra-modern scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Advanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Minimal cursor trail effect
let mouseTrail = [];
function createMinimalTrail(e) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.background = '#ffffff';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.opacity = '0.6';
    trail.style.transform = 'scale(1)';
    trail.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    trail.style.zIndex = '9999';
    trail.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.4)';
    
    document.body.appendChild(trail);
    mouseTrail.push(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 100);
    
    setTimeout(() => {
        if (trail.parentNode) {
            document.body.removeChild(trail);
        }
        mouseTrail = mouseTrail.filter(t => t !== trail);
    }, 800);
    
    // Limit trail length
    if (mouseTrail.length > 10) {
        const oldTrail = mouseTrail.shift();
        if (oldTrail && oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
        }
    }
}

// Modern glitch effect for hero title with coding symbols
function modernGlitchEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        const glitchChars = '{}<>/\\=;()[]#*&%$@!+-_|~`^"\'.,?:';

        let iterations = 0;
        const maxIterations = originalText.length;
        
        const interval = setInterval(() => {
            if (iterations >= maxIterations) {
                clearInterval(interval);
                heroTitle.textContent = originalText;
                return;
            }
            
            heroTitle.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            iterations += 1 / 3;
        }, 50);
    }
}

// Enhanced text reveal animation with modern theme
function revealText() {
    const textElements = document.querySelectorAll('.hero-subtitle, .hero-description');
    textElements.forEach((element, index) => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${(charIndex * 0.02) + (index * 1)}s`;
            span.style.display = 'inline-block';
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    });
}

// Modern skill tags animation
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8) translateY(20px)';
        tag.style.transition = `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1) translateY(0)';
                }
            });
        });
        
        observer.observe(tag);
    });
}

// Enhanced project card animations
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
        
        observer.observe(card);
    });
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const finalValue = entry.target.textContent;
                    const numValue = parseFloat(finalValue);
                    const isDecimal = finalValue.includes('.');
                    const duration = 2500;
                    const startTime = Date.now();
                    
                    function updateCounter() {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const current = numValue * progress;
                        
                        if (isDecimal) {
                            entry.target.textContent = current.toFixed(1) + '+';
                        } else {
                            entry.target.textContent = Math.floor(current) + '+';
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = finalValue;
                        }
                    }
                    
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// Minimal parallax effect
function minimalParallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cubes');
    
    parallaxElements.forEach((element) => {
        const speed = 0.2;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create minimal particles
    createParticles();
    
    // Setup scroll animations
    const animateElements = document.querySelectorAll('.about-content, .contact-content, .skill-category');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
    
    // Animate project cards
    animateProjectCards();
    
    // Animate skill tags
    animateSkillTags();
    
    // Animate stats
    animateStats();
    
    // Hero animations with delays
    setTimeout(() => {
        modernGlitchEffect();
    }, 1000);
    
    setTimeout(() => {
        revealText();
    }, 2500);
    
    // Minimal mouse trail
    document.addEventListener('mousemove', createMinimalTrail);
    
    // Minimal parallax scroll effect
    window.addEventListener('scroll', minimalParallaxEffect);
    
    // Add staggered animation to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        link.style.transition = `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        observer.observe(link);
    });
    
    // Add hover effects to project icons
    const projectIcons = document.querySelectorAll('.placeholder-image.roblox-themed i');
    projectIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
            icon.style.color = '#ffffff';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            icon.style.color = 'rgba(255, 255, 255, 0.7)';
        });
    });
    
    // Add interactive effects to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const icon = category.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#ffffff';
            }
        });
        
        category.addEventListener('mouseleave', () => {
            const icon = category.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = 'rgba(255, 255, 255, 0.8)';
            }
        });
    });
});

// Add subtle glow to the main logo
setInterval(() => {
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
    }
}, 4000);

// Smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(1.02)';
});
