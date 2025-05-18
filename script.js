document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling for the right panel sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Function to activate the correct section
    function activateSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Activate the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Activate the corresponding nav link
        const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }
    
    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Update the URL hash
            window.location.hash = sectionId;
            
            // Activate the section
            activateSection(sectionId);
        });
    });
    
    // Handle URL hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            activateSection(hash);
        }
    });
    
    // Set initial active section based on URL hash or default to 'about'
    const initialSection = window.location.hash.substring(1) || 'about';
    activateSection(initialSection);
    
    // Animated skill bars
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = width;
            }, 300);
        });
    }
    
    // Trigger skill bar animation when skills section becomes visible
    const skillsLink = document.querySelector('.nav-link[data-section="skills"]');
    if (skillsLink) {
        skillsLink.addEventListener('click', function() {
            setTimeout(animateSkillBars, 400);
        });
    }
    
    // Initialize skill bars animation if skills section is active on page load
    if (initialSection === 'skills') {
        setTimeout(animateSkillBars, 400);
    }
    
    // Smooth scrolling for about section links
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update the URL hash which will trigger our hashchange handler
            window.location.hash = targetId;
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log it and show a success message
            console.log('Form submission:', { name, email, subject, message });
            
            // Show success message (in a real implementation, you'd wait for server response)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            this.reset();
        });
    }
    
    // Add hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Dynamic typing effect for the introduction heading
    function typeWriter(element, text, speed = 100, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }
    
    // Apply typing effect to name on page load
    const nameElement = document.querySelector('.left-panel h1');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 70);
    }
    
    // Handle responsive navigation for mobile view
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 992) {
            // Mobile layout adjustments
            document.querySelectorAll('.panel').forEach(panel => {
                panel.style.height = 'auto';
            });
        } else {
            // Desktop layout
            document.querySelectorAll('.panel').forEach(panel => {
                panel.style.height = '100%';
            });
        }
    }
    
    // Run on page load and window resize
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);
});