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
    const nextIndex = (currentIndex + 1) % caseStudies.length;
    window.location.href = caseStudies[nextIndex];
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
    const prevIndex = currentIndex === 0 ? caseStudies.length - 1 : currentIndex - 1;
    window.location.href = caseStudies[prevIndex];
}

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