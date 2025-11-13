// animations.js
// Scroll animations and interactions
class PortfolioAnimations {
    constructor() {
        this.progressBarsAnimated = false;
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupNavbar();
        this.setupThemeToggle();
        this.setupProgressBars();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupTypewriterEffect();
        this.setupFormValidation();
        this.setupPerformanceOptimizations();
        this.setupHeroImageInteractions();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger children if present
                    const staggerItems = entry.target.querySelectorAll('.stagger-item');
                    staggerItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                    // Unobserve after it's visible
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            fadeObserver.observe(el);
        });

        // Observe skill cards for progress animation
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBars();
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }

    // Navbar scroll effects
    setupNavbar() {
        const header = document.querySelector('header');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Debounce scroll events for performance
        let scrollTimer;
        const handleScroll = () => {
            if (scrollTimer) return;
            
            scrollTimer = setTimeout(() => {
                if (window.scrollY > 100) {
                    header.classList.add('nav-scrolled');
                } else {
                    header.classList.remove('nav-scrolled');
                }

                // Update active nav link
                this.updateActiveNavLink(navLinks);
                scrollTimer = null;
            }, 10);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateActiveNavLink(navLinks) {
        const scrollPosition = window.scrollY + 100; // Offset for fixed header
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                }
            }
        });
    }

    // Theme toggle functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle?.querySelector('svg path');
        
        if (!themeToggle || !themeIcon) return;

        // Check for saved theme preference or default to system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        this.updateThemeIcon(themeIcon, savedTheme);

        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            const theme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            this.updateThemeIcon(themeIcon, theme);
            
            // Update theme color for PWA
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', isDark ? '#111827' : '#7C3AED');
            }
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const isDark = e.matches;
                document.documentElement.classList.toggle('dark', isDark);
                this.updateThemeIcon(themeIcon, isDark ? 'dark' : 'light');
            }
        });
    }

    updateThemeIcon(iconPath, theme) {
        // Simple icon change: moon for dark, sun for light
        if (theme === 'dark') {
            iconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h1M4 12H3m15.354 3.354l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
        } else {
            iconPath.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
        }
    }

    // Animate progress bars
    setupProgressBars() {
        this.progressBarsAnimated = false;
    }

    animateProgressBars() {
        if (this.progressBarsAnimated) return;
        
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                // Set initial width to 0 and then animate
                bar.style.width = '0%';
                // Use requestIdleCallback for non-critical animation
                requestIdleCallback(() => {
                    requestAnimationFrame(() => {
                        bar.style.width = width;
                    });
                });
            }
        });
        
        this.progressBarsAnimated = true;
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            const updateMenuState = (isExpanded) => {
                mobileMenu.classList.toggle('hidden', !isExpanded);
                mobileMenuButton.setAttribute('aria-expanded', isExpanded);
                
                // Change button icon
                const icon = mobileMenuButton.querySelector('svg path');
                if (icon) {
                    if (isExpanded) {
                        icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
                    } else {
                        icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                    }
                }
            };

            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenu.classList.contains('hidden');
                updateMenuState(isExpanded);
            });

            // Close mobile menu when clicking on links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    updateMenuState(false);
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                    updateMenuState(false);
                }
            });
        }
    }

    // Enhanced smooth scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without page jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // Form validation
    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm(form)) {
                this.handleFormSubmission(form);
            }
        });

        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input[required], textarea[required]');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}-error`);
        
        // Clear previous error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, errorElement, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, errorElement, 'Please enter a valid email address');
                return false;
            }
        }

        return true;
    }

    showFieldError(field, errorElement, message) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('#submit-btn');
        const submitText = submitBtn.querySelector('.submit-text');
        const loadingText = submitBtn.querySelector('.loading-text');
        const successMessage = document.getElementById('success-message');

        // Show loading state
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        loadingText.classList.remove('hidden');

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';
            successMessage.classList.remove('hidden');
            successMessage.classList.remove('error-message');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);

        } catch (error) {
            console.error('Form submission error:', error);
            successMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            successMessage.classList.remove('hidden');
            successMessage.classList.add('error-message');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy load images that are not in viewport
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Only trigger load if src is different from current
                    if (img.src !== img.dataset.src) {
                        img.src = img.dataset.src || img.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            // Store original src to avoid unnecessary reloads
            img.dataset.src = img.src;
            imageObserver.observe(img);
        });
    }

    preloadCriticalResources() {
        // Preload above-the-fold images
        const criticalImages = [
            'assets/images/profile.png',
            'assets/images/about-image.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Hero image interactions
    setupHeroImageInteractions() {
        const profileContainer = document.querySelector('.profile-image-container');
        const heroSection = document.getElementById('home');
        
        if (!profileContainer || !heroSection) return;

        // Mouse move parallax effect
        heroSection.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = heroSection.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            profileContainer.style.transform = `translateX(${x * 20}px) translateY(${y * 20}px) rotate(${x * 5}deg)`;
        });

        // Reset position when mouse leaves
        heroSection.addEventListener('mouseleave', () => {
            profileContainer.style.transform = 'translateX(0) translateY(0) rotate(0)';
        });

        // Click ripple effect
        profileContainer.addEventListener('click', (e) => {
            this.createRippleEffect(e, profileContainer);
        });
    }

    createRippleEffect(event, container) {
        const ripple = document.createElement('div');
        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Utility function for typewriter effect
    setupTypewriterEffect() {
        // Example usage if you had an element like <span id="typewriter-text"></span>
        // const typewriterElement = document.getElementById('typewriter-text');
        // if (typewriterElement) {
        //     this.typewriterEffect(typewriterElement, "Web Developer & Student", 70);
        // }
    }

    typewriterEffect(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        element.classList.add('typewriter');
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typewriter');
            }
        }
        type();
    }
}

// Particle effect for hero background
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        // Debounce resize for performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resizeCanvas(), 100);
        });
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.createParticles(); // Recreate particles on resize
    }

    createParticles() {
        const particleCount = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 8000));
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.6 + 0.2,
                wobble: Math.random() * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Wobble effect
            particle.x += particle.speedX + Math.sin(Date.now() * particle.wobbleSpeed + index) * particle.wobble;
            particle.y += particle.speedY + Math.cos(Date.now() * particle.wobbleSpeed + index) * particle.wobble;
            
            // Wrap particles around the canvas edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle with glow
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
            const rgb = this.hexToRgb(primaryColor);
            
            // Create gradient for particles
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity})`);
            gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Connect particles with lines
            this.connectParticles(particle, index);
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    connectParticles(currentParticle, currentIndex) {
        this.particles.forEach((particle, index) => {
            if (index <= currentIndex) return;
            
            const distance = Math.sqrt(
                Math.pow(currentParticle.x - particle.x, 2) + 
                Math.pow(currentParticle.y - particle.y, 2)
            );
            
            if (distance < 100) {
                const opacity = (1 - distance / 100) * 0.2;
                this.ctx.beginPath();
                this.ctx.moveTo(currentParticle.x, currentParticle.y);
                this.ctx.lineTo(particle.x, particle.y);
                this.ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }
        });
    }

    // Stop animation when not in viewport for performance
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Helper to convert hex to RGB for particle color
    hexToRgb(hex) {
        // Handle both #RRGGBB and rgb() values
        if (hex.startsWith('#')) {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return { r, g, b };
        } else if (hex.startsWith('rgb')) {
            const match = hex.match(/\d+/g);
            if (match) {
                return {
                    r: parseInt(match[0]),
                    g: parseInt(match[1]),
                    b: parseInt(match[2])
                };
            }
        }
        return { r: 124, g: 58, b: 237 }; // Default purple
    }
}

// Error tracking utility
class ErrorTracker {
    static init() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            // Here you could send errors to a service like Sentry
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize error tracking
    ErrorTracker.init();
    
    // Initialize animations
    const animations = new PortfolioAnimations();
    
    // Initialize particle background
    const particleBackground = new ParticleBackground();

    // Stop animations when page is not visible for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            particleBackground.stop();
        } else {
            particleBackground.animate();
        }
    });
});

// Add loading states
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading skeleton if any
    const skeletons = document.querySelectorAll('.loading-skeleton');
    skeletons.forEach(skeleton => {
        skeleton.classList.remove('loading-skeleton');
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioAnimations, ParticleBackground, ErrorTracker };
}