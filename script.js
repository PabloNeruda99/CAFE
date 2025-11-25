document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Hero Animations (Run immediately on load)
    const heroElements = document.querySelectorAll('.hero-section .fade-in-up');
    heroElements.forEach(el => {
        // Wait a tiny moment before starting the hero animation
        setTimeout(() => {
            el.classList.add('animated');
        }, 50); 
    });




    // 2. Scroll-Based Animations using Intersection Observer


    // Configuration for the observer
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };


    /**
     * Creates an IntersectionObserver to trigger animations on scroll.
     * @param {string} selector - CSS selector for the elements to observe.
     * @param {number} [staggerDelay=0] - Optional delay in ms for staggered animation.
     */
    const createObserver = (selector, staggerDelay = 0) => {
        const elements = document.querySelectorAll(selector);


        if (elements.length === 0) return;


        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Use a delay for staggering if provided
                    const delay = index * staggerDelay; 
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, delay);
                    // Stop observing once it has animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);


        elements.forEach(el => observer.observe(el));
    };


    // A. Feature Grid Staggered Animation (3 cards, 200ms stagger)
    createObserver('.feature-card.animate-on-scroll', 200);


    // B. Left Slide-in for Section Headers (no stagger)
    createObserver('.slide-in-left');


    // C. Zoom-in for Contact Title (no stagger)
    createObserver('.zoom-in-title');
});