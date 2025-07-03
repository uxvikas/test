// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.process-card, .work-card, .content-block');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Case study navigation functions
function goToNextCaseStudy(currentCase) {
    const caseStudies = [
        'case-study-1.html',
        'case-study-2.html', 
        'case-study-3.html',
        'case-study-4.html',
        'case-study-5.html',
        'case-study-6.html'
    ];
    
    const currentIndex = caseStudies.indexOf(currentCase);
    if (currentIndex < caseStudies.length - 1) {
        window.location.href = caseStudies[currentIndex + 1];
    }
}

function goToPrevCaseStudy(currentCase) {
    const caseStudies = [
        'case-study-1.html',
        'case-study-2.html', 
        'case-study-3.html',
        'case-study-4.html',
        'case-study-5.html',
        'case-study-6.html'
    ];
    
    const currentIndex = caseStudies.indexOf(currentCase);
    if (currentIndex > 0) {
        window.location.href = caseStudies[currentIndex - 1];
    }
}

// Initialize case study navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Case study order
    const caseStudies = [
        'case-study-1.html',
        'case-study-2.html', 
        'case-study-3.html',
        'case-study-4.html',
        'case-study-5.html',
        'case-study-6.html'
    ];
    
    const currentIndex = caseStudies.indexOf(currentPage);
    
    if (currentIndex !== -1) {
        // Hide Previous button on first case study
        if (currentIndex === 0) {
            const prevButton = document.querySelector('button[onclick*="goToPrevCaseStudy"]');
            if (prevButton) {
                prevButton.style.display = 'none';
            }
        }
        
        // Hide Next button on last case study
        if (currentIndex === caseStudies.length - 1) {
            const nextButton = document.querySelector('button[onclick*="goToNextCaseStudy"]');
            if (nextButton) {
                nextButton.style.display = 'none';
            }
        }
        
        // Update button text with actual case study names
        const caseStudyTitles = [
            'E-commerce Mobile App',
            'SaaS Dashboard Optimization',
            'Healthcare App for Seniors', 
            'Fintech Investment Platform',
            'Online Learning Platform',
            'IoT Smart Home Interface'
        ];
        
        const prevButton = document.querySelector('button[onclick*="goToPrevCaseStudy"]');
        const nextButton = document.querySelector('button[onclick*="goToNextCaseStudy"]');
        
        if (prevButton && currentIndex > 0) {
            prevButton.innerHTML = `← ${caseStudyTitles[currentIndex - 1]}`;
            prevButton.title = `Previous: ${caseStudyTitles[currentIndex - 1]}`;
        }
        
        if (nextButton && currentIndex < caseStudies.length - 1) {
            nextButton.innerHTML = `${caseStudyTitles[currentIndex + 1]} →`;
            nextButton.title = `Next: ${caseStudyTitles[currentIndex + 1]}`;
        }

        // Add progress indicator and case study overview
        const navContainer = document.querySelector('.case-study-nav');
        if (navContainer) {
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'case-study-progress';
            
            // Create case study dots navigation
            let dotsNav = '<div class="case-studies-overview">';
            caseStudies.forEach((caseStudy, index) => {
                const isActive = index === currentIndex;
                dotsNav += `
                    <div class="case-dot ${isActive ? 'active' : ''}" 
                         onclick="window.location.href='${caseStudy}'" 
                         title="${caseStudyTitles[index]}">
                        <span class="dot-number">${index + 1}</span>
                    </div>
                `;
            });
            dotsNav += '</div>';
            
            progressIndicator.innerHTML = `
                <div class="progress-info">
                    <span class="progress-text">Case Study ${currentIndex + 1} of ${caseStudies.length}</span>
                    <h3 class="current-case-title">${caseStudyTitles[currentIndex]}</h3>
                    ${dotsNav}
                </div>
            `;
            navContainer.appendChild(progressIndicator);
        }
    }
});

// Form validation for contact page
function validateContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Reset previous error styles
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Validate name
        if (name === '') {
            document.getElementById('name').closest('.form-group').classList.add('error');
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailPattern.test(email)) {
            document.getElementById('email').closest('.form-group').classList.add('error');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('message').closest('.form-group').classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            showMessage('Please fill in all required fields correctly.', 'error');
        }
    });
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', validateContactForm);