// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCarousel();
    initNavigation();
    initSmoothScrolling();
    initVehicleFilters();
    initScrollAnimations();
    initMobileMenu();
    initNewsletter();
    initI18n();
});

// Carousel Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function initCarousel() {
    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex += direction;
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    slides[currentSlideIndex].classList.add('active');
}

function goToSlide(n) {
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (n - 1 + totalSlides) % totalSlides;
    slides[currentSlideIndex].classList.add('active');
}

// Navigation Functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Smooth Scrolling for all internal links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Vehicle Filter Functionality
function initVehicleFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vehicleItems = document.querySelectorAll('.vehicle-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            vehicleItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.vehicle-card, .pricing-card, .feature, .region-item, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Newsletter Subscription
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button');
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Show success message
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Vehicle Modal Functionality
const vehicleData = {
    'toyota-corolla': {
        title: 'Toyota Corolla 2023',
        category: 'Economy',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        specs: {
            'Engine': '1.8L 4-Cylinder',
            'Transmission': 'CVT Automatic',
            'Fuel Type': 'Petrol',
            'Seating': '5 Seats',
            'Year': '2023',
            'Color': 'Silver',
            'Mileage': 'Unlimited',
            'Air Conditioning': 'Yes',
            'Bluetooth': 'Yes',
            'USB Ports': '2'
        },
        pricing: {
            'Daily Rate': '$29',
            'Weekly Rate': '$189',
            'Monthly Rate': '$699',
            'Security Deposit': '$200'
        }
    },
    'bmw-x5': {
        title: 'BMW X5 2023',
        category: 'SUV',
        image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        specs: {
            'Engine': '3.0L 6-Cylinder Turbo',
            'Transmission': '8-Speed Automatic',
            'Fuel Type': 'Petrol',
            'Seating': '7 Seats',
            'Year': '2023',
            'Color': 'Black',
            'Mileage': 'Unlimited',
            'Air Conditioning': 'Yes',
            'Bluetooth': 'Yes',
            'Navigation': 'Yes',
            'Sunroof': 'Yes',
            'Leather Seats': 'Yes'
        },
        pricing: {
            'Daily Rate': '$59',
            'Weekly Rate': '$389',
            'Monthly Rate': '$1,499',
            'Security Deposit': '$500'
        }
    },
    'mercedes-s-class': {
        title: 'Mercedes S-Class 2023',
        category: 'Luxury',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        specs: {
            'Engine': '3.0L 6-Cylinder Turbo',
            'Transmission': '9-Speed Automatic',
            'Fuel Type': 'Petrol',
            'Seating': '5 Seats',
            'Year': '2023',
            'Color': 'White',
            'Mileage': 'Unlimited',
            'Air Conditioning': 'Yes',
            'Bluetooth': 'Yes',
            'Navigation': 'Yes',
            'Sunroof': 'Yes',
            'Leather Seats': 'Yes',
            'Massage Seats': 'Yes',
            'Premium Sound': 'Yes'
        },
        pricing: {
            'Daily Rate': '$99',
            'Weekly Rate': '$649',
            'Monthly Rate': '$2,499',
            'Security Deposit': '$1,000'
        }
    },
    'porsche-911': {
        title: 'Porsche 911 2023',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        specs: {
            'Engine': '3.0L 6-Cylinder Turbo',
            'Transmission': '7-Speed Manual',
            'Fuel Type': 'Petrol',
            'Seating': '4 Seats',
            'Year': '2023',
            'Color': 'Red',
            'Mileage': 'Unlimited',
            'Air Conditioning': 'Yes',
            'Bluetooth': 'Yes',
            'Navigation': 'Yes',
            'Convertible': 'Yes',
            'Leather Seats': 'Yes',
            'Sport Mode': 'Yes'
        },
        pricing: {
            'Daily Rate': '$149',
            'Weekly Rate': '$999',
            'Monthly Rate': '$3,999',
            'Security Deposit': '$2,000'
        }
    },
    'honda-civic': {
        title: 'Honda Civic 2023',
        category: 'Economy',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        specs: {
            'Engine': '1.5L 4-Cylinder Turbo',
            'Transmission': 'CVT Automatic',
            'Fuel Type': 'Petrol',
            'Seating': '5 Seats',
            'Year': '2023',
            'Color': 'Blue',
            'Mileage': 'Unlimited',
            'Air Conditioning': 'Yes',
            'Bluetooth': 'Yes',
            'USB Ports': '2',
            'Backup Camera': 'Yes'
        },
        pricing: {
            'Daily Rate': '$25',
            'Weekly Rate': '$159',
            'Monthly Rate': '$599',
            'Security Deposit': '$150'
        }
    },
    'audi-q7': {
        title: 'Audi Q7 2023',
        category: 'SUV',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        specs: {
            'Engine': '3.0L 6-Cylinder Diesel',
            'Transmission': '8-Speed Automatic',
            'Fuel Type': 'Diesel',
            'Seating': '7 Seats',
            'Year': '2023',
            'Color': 'Gray',
            'Mileage': 'Unlimited',
            'Air Conditioning': 'Yes',
            'Bluetooth': 'Yes',
            'Navigation': 'Yes',
            'Sunroof': 'Yes',
            'Leather Seats': 'Yes',
            'Third Row': 'Yes'
        },
        pricing: {
            'Daily Rate': '$65',
            'Weekly Rate': '$429',
            'Monthly Rate': '$1,699',
            'Security Deposit': '$600'
        }
    }
};

function openVehicleModal(vehicleId) {
    const modal = document.getElementById('vehicleModal');
    const vehicle = vehicleData[vehicleId];
    
    if (!vehicle) {
        showNotification('Vehicle information not available.', 'error');
        return;
    }
    
    // Populate modal content
    document.getElementById('modalImage').src = vehicle.image;
    document.getElementById('modalImage').alt = vehicle.title;
    document.getElementById('modalTitle').textContent = vehicle.title;
    document.getElementById('modalCategory').textContent = vehicle.category;
    
    // Populate specifications
    const specsContainer = document.getElementById('modalSpecs');
    specsContainer.innerHTML = '';
    Object.entries(vehicle.specs).forEach(([key, value]) => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-label">${key}:</span>
            <span class="spec-value">${value}</span>
        `;
        specsContainer.appendChild(specItem);
    });
    
    // Populate pricing
    const pricingContainer = document.getElementById('modalPricing');
    pricingContainer.innerHTML = '';
    Object.entries(vehicle.pricing).forEach(([key, value]) => {
        const priceItem = document.createElement('div');
        priceItem.className = 'price-item';
        priceItem.innerHTML = `
            <span class="price-label">${key}:</span>
            <span class="price-value">${value}</span>
        `;
        pricingContainer.appendChild(priceItem);
    });
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVehicleModal() {
    const modal = document.getElementById('vehicleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('vehicleModal');
    if (e.target === modal) {
        closeVehicleModal();
    }
});

// Add CSS for modal specs and pricing
const modalStyles = `
    .spec-item, .price-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .spec-item:last-child, .price-item:last-child {
        border-bottom: none;
    }
    
    .spec-label, .price-label {
        font-weight: 500;
        color: #6b7280;
    }
    
    .spec-value, .price-value {
        font-weight: 600;
        color: #1f2937;
    }
    
    .price-value {
        color: #2563eb;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
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
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.background = 'rgba(10, 25, 47, 0.85)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Add loading states for buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.style.opacity = '0.7';
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    };
}

// Enhanced button interactions
document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    // Phone call for booking actions
    if (target.classList.contains('book-btn') || target.classList.contains('modal-book-btn') || target.classList.contains('rent-btn')) {
        window.location.href = 'tel:+998900222622';
        return;
    }

    // Keep existing behavior for other action buttons
    if (target.classList.contains('pricing-btn')) {
        const resetButton = addLoadingState(target, 'Processing...');
        setTimeout(() => {
            resetButton();
            showNotification('Request submitted successfully! We will contact you shortly.', 'success');
        }, 1500);
    }
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'Escape') {
        closeVehicleModal();
    }
});

// Touch/swipe support for carousel
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

// Performance optimization - lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on load
revealOnScroll();

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    console.log(`Tracked: ${action} on ${element}`);
    // Here you would integrate with your analytics service
}

// Add tracking to important buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button')) {
        trackClick(e.target, 'Hero CTA Click');
    } else if (e.target.classList.contains('rent-btn')) {
        trackClick(e.target, 'Rent Button Click');
    } else if (e.target.classList.contains('book-btn')) {
        trackClick(e.target, 'Book Button Click');
    }
});

// Console welcome message
console.log('%c🚗 Welcome to Grand Rent a Car! 🚗', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully! All features are ready.', 'color: #10b981; font-size: 14px;');

// ------------------ i18n (EN, RU, UZ) ------------------
const translations = {
    en: {
        nav_home: 'Home',
        nav_about: 'About Us',
        nav_pricing: 'Pricing',
        nav_vehicles: 'Vehicles',
        nav_regions: 'Regions',
        hero_title_1: 'Grand Rent a Car',
        hero_sub_1: 'Premium Car Rental Service',
        hero_cta_1: 'Explore Our Fleet',
        hero_title_2: 'Adventure Awaits',
        hero_sub_2: 'Explore with our premium SUVs',
        hero_cta_2: 'Book Now',
        hero_title_3: 'Luxury Redefined',
        hero_sub_3: 'Experience the finest in automotive luxury',
        hero_cta_3: 'Discover More',
        hero_title_4: 'Performance & Style',
        hero_sub_4: 'Drive the car of your dreams',
        hero_cta_4: 'Rent Today',
        hero_title_5: 'Family Comfort',
        hero_sub_5: 'Perfect for family adventures',
        hero_cta_5: 'Choose Family',
        hero_title_6: 'Open Road Freedom',
        hero_sub_6: 'Feel the wind in your hair',
        hero_cta_6: 'Go Convertible',
        hero_title_7: 'Eco-Friendly Drive',
        hero_sub_7: 'Sustainable and efficient transportation',
        hero_cta_7: 'Go Green',
        featured_title: 'Our Featured Vehicles',
        rent_now: 'Rent Now',
        about_title: 'About Grand Rent a Car',
        about_lead: 'With over 15 years of experience in the car rental industry, Grand Rent a Car has been providing exceptional service and premium vehicles to customers across multiple regions.',
        about_mission: 'Our mission is to make every journey memorable by offering the finest selection of vehicles, from economy cars to luxury sedans and SUVs. We pride ourselves on our commitment to customer satisfaction, competitive pricing, and maintaining the highest standards of vehicle maintenance and cleanliness.',
        feat_exp_title: '15+ Years Experience',
        feat_exp_desc: 'Trusted by thousands of customers',
        feat_ins_title: 'Fully Insured',
        feat_ins_desc: 'Complete coverage for your peace of mind',
        feat_247_title: '24/7 Support',
        feat_247_desc: 'Round-the-clock customer assistance',
        contact_phone: 'Phone',
        contact_email: 'Email',
        contact_hours: 'Working Hours',
        pricing_title: 'Our Pricing Plans',
        pricing_sub: 'Choose the perfect plan for your needs',
        pricing_most_pop: 'Most Popular',
        choose_plan: 'Choose Plan',
        weekly: 'Weekly',
        vehicles_title: 'Our Complete Fleet',
        vehicles_sub: 'Browse our extensive collection of vehicles',
        filter_all: 'All Vehicles',
        filter_economy: 'Economy',
        filter_suv: 'SUV',
        filter_luxury: 'Luxury',
        filter_sports: 'Sports',
        book_now: 'Book Now',
        modal_specs: 'Specifications',
        modal_pricing: 'Pricing',
        modal_book: 'Book This Vehicle',
        regions_title: 'Our Service Regions',
        regions_sub: 'We operate in multiple cities across the region',
        footer_quick_links: 'Quick Links',
        footer_contact_info: 'Contact Info',
        footer_newsletter: 'Newsletter',
        newsletter_sub: 'Subscribe to get special offers and updates',
        quick_home: 'Home',
        quick_about: 'About Us',
        quick_pricing: 'Pricing',
        quick_vehicles: 'Vehicles',
        quick_regions: 'Regions',
        newsletter_placeholder: 'Enter your email',
        newsletter_button: 'Subscribe',
        seats_word: 'Seats',
        petrol: 'Petrol',
        diesel: 'Diesel',
        automatic: 'Automatic',
        manual: 'Manual',
        cvt: 'CVT',
        fuel_efficient: 'Fuel Efficient',
        manual_auto: 'Manual/Auto',
        basic_insurance: 'Basic Insurance',
        roadside_24_7: '24/7 Roadside',
        spacious_interior: 'Spacious Interior',
        awd: 'All-Wheel Drive',
        premium_insurance: 'Premium Insurance',
        gps: 'GPS Navigation',
        premium_brand: 'Premium Brand',
        full_coverage: 'Full Coverage',
        concierge_service: 'Concierge Service'
    },
    ru: {
        nav_home: 'Главная',
        nav_about: 'О нас',
        nav_pricing: 'Цены',
        nav_vehicles: 'Автопарк',
        nav_regions: 'Регионы',
        hero_title_1: 'Grand Rent a Car',
        hero_sub_1: 'Премиальный прокат автомобилей',
        hero_cta_1: 'Посмотреть автопарк',
        hero_title_2: 'Приключения ждут',
        hero_sub_2: 'Исследуйте мир на наших премиум SUV',
        hero_cta_2: 'Забронировать',
        hero_title_3: 'Роскошь переосмыслена',
        hero_sub_3: 'Испытайте высший уровень комфорта',
        hero_cta_3: 'Узнать больше',
        hero_title_4: 'Производительность и стиль',
        hero_sub_4: 'Ваша машина мечты ждёт',
        hero_cta_4: 'Арендовать сегодня',
        hero_title_5: 'Семейный комфорт',
        hero_sub_5: 'Идеально для семейных поездок',
        hero_cta_5: 'Выбрать семейный',
        hero_title_6: 'Свобода открытой дороги',
        hero_sub_6: 'Почувствуйте ветер в волосах',
        hero_cta_6: 'Кабриолет',
        hero_title_7: 'Экологичное вождение',
        hero_sub_7: 'Устойчиво и эффективно',
        hero_cta_7: 'Зелёный выбор',
        featured_title: 'Наши избранные автомобили',
        rent_now: 'Арендовать',
        about_title: 'О компании Grand Rent a Car',
        about_lead: 'С более чем 15-летним опытом в сфере проката авто мы предоставляем исключительный сервис и премиальные автомобили клиентам во многих регионах.',
        about_mission: 'Наша миссия — сделать каждую поездку незабываемой, предлагая лучший выбор автомобилей: от эконом-класса до роскошных седанов и SUV. Мы стремимся к удовлетворенности клиентов, конкурентным ценам и высоким стандартам обслуживания.',
        feat_exp_title: '15+ лет опыта',
        feat_exp_desc: 'Тысячи довольных клиентов',
        feat_ins_title: 'Полное страхование',
        feat_ins_desc: 'Спокойствие на дороге',
        feat_247_title: 'Поддержка 24/7',
        feat_247_desc: 'Круглосуточная помощь',
        contact_phone: 'Телефон',
        contact_email: 'Эл. почта',
        contact_hours: 'Часы работы',
        pricing_title: 'Тарифы',
        pricing_sub: 'Выберите идеальный план',
        pricing_most_pop: 'Самый популярный',
        choose_plan: 'Выбрать тариф',
        weekly: 'Неделя',
        vehicles_title: 'Весь автопарк',
        vehicles_sub: 'Просмотрите наш большой выбор',
        filter_all: 'Все',
        filter_economy: 'Эконом',
        filter_suv: 'SUV',
        filter_luxury: 'Люкс',
        filter_sports: 'Спорт',
        book_now: 'Забронировать',
        modal_specs: 'Характеристики',
        modal_pricing: 'Цены',
        modal_book: 'Забронировать авто',
        regions_title: 'Регионы обслуживания',
        regions_sub: 'Мы работаем в нескольких городах',
        footer_quick_links: 'Быстрые ссылки',
        footer_contact_info: 'Контакты',
        footer_newsletter: 'Рассылка',
        newsletter_sub: 'Подпишитесь на акции и новости',
        quick_home: 'Главная',
        quick_about: 'О нас',
        quick_pricing: 'Цены',
        quick_vehicles: 'Автопарк',
        quick_regions: 'Регионы',
        newsletter_placeholder: 'Введите ваш email',
        newsletter_button: 'Подписаться',
        seats_word: 'мест',
        petrol: 'Бензин',
        diesel: 'Дизель',
        automatic: 'Автомат',
        manual: 'Механика',
        cvt: 'Вариатор',
        fuel_efficient: 'Экономичный расход',
        manual_auto: 'Механика/автомат',
        basic_insurance: 'Базовая страховка',
        roadside_24_7: 'Помощь 24/7',
        spacious_interior: 'Просторный салон',
        awd: 'Полный привод',
        premium_insurance: 'Расширенная страховка',
        gps: 'GPS навигация',
        premium_brand: 'Премиальный бренд',
        full_coverage: 'Полное покрытие',
        concierge_service: 'Консьерж-сервис'
    },
    uz: {
        nav_home: 'Bosh sahifa',
        nav_about: 'Biz haqimizda',
        nav_pricing: 'Narxlar',
        nav_vehicles: 'Avtopark',
        nav_regions: 'Hududlar',
        hero_title_1: 'Grand Rent a Car',
        hero_sub_1: 'Premium avto ijarasi xizmati',
        hero_cta_1: 'Avtoparkni ko‘rish',
        hero_title_2: 'Sarguzashtlar kutmoqda',
        hero_sub_2: 'Bizning premium SUVlar bilan sayohat qiling',
        hero_cta_2: 'Band qilish',
        hero_title_3: 'Hashamat qayta talqin etildi',
        hero_sub_3: 'Eng yuqori qulaylikni his eting',
        hero_cta_3: 'Batafsil',
        hero_title_4: 'Tezlik va uslub',
        hero_sub_4: 'Orzuingizdagi mashina sizni kutmoqda',
        hero_cta_4: 'Bugun ijaraga oling',
        hero_title_5: 'Oila uchun qulay',
        hero_sub_5: 'Oilaviy sayohatlar uchun a’lo',
        hero_cta_5: 'Oilaviy tanlov',
        hero_title_6: 'Ochiq yo‘lda erkinlik',
        hero_sub_6: 'Shamolni his eting',
        hero_cta_6: 'Kabriolet',
        hero_title_7: 'Ekologik haydash',
        hero_sub_7: 'Barqaror va samarali',
        hero_cta_7: 'Yashil tanlov',
        featured_title: 'Tanlangan avtomobillar',
        rent_now: 'Ijaraga olish',
        about_title: 'Grand Rent a Car haqida',
        about_lead: '15 yildan ortiq tajribaga ega kompaniyamiz ko‘plab hududlarda mijozlarga yuqori sifatli xizmat va avtomobillarni taklif qiladi.',
        about_mission: 'Maqsadimiz — har bir safarni unutilmas qilish. Bizda iqtisodiy sinfdan tortib, lyuks sedan va SUVlargacha bor. Mijozlar mamnuniyati, qulay narx va yuqori standartlar — ustuvor vazifamiz.',
        feat_exp_title: '15+ yil tajriba',
        feat_exp_desc: 'Minglab mijozlar ishonchi',
        feat_ins_title: 'To‘liq sug‘urta',
        feat_ins_desc: 'Yo‘lda xotirjamlik',
        feat_247_title: '24/7 qo‘llab-quvvatlash',
        feat_247_desc: 'Doimiy yordam',
        contact_phone: 'Telefon',
        contact_email: 'Email',
        contact_hours: 'Ish vaqti',
        pricing_title: 'Tariflar',
        pricing_sub: 'O‘zingizga mos reja tanlang',
        pricing_most_pop: 'Eng ommabop',
        choose_plan: 'Rejani tanlash',
        weekly: 'Haftalik',
        vehicles_title: 'To‘liq avtopark',
        vehicles_sub: 'Keng tanlovni ko‘rib chiqing',
        filter_all: 'Barchasi',
        filter_economy: 'Iqtisodiy',
        filter_suv: 'SUV',
        filter_luxury: 'Lyuks',
        filter_sports: 'Sport',
        book_now: 'Band qilish',
        modal_specs: 'Texnik xususiyatlar',
        modal_pricing: 'Narxlar',
        modal_book: 'Ushbu avtomobilni band qilish',
        regions_title: 'Xizmat ko‘rsatish hududlari',
        regions_sub: 'Bir nechta shaharlarda ishlaymiz',
        footer_quick_links: 'Tezkor havolalar',
        footer_contact_info: 'Aloqa',
        footer_newsletter: 'Yangiliklar',
        newsletter_sub: 'Aksiya va yangiliklarga obuna bo‘ling',
        quick_home: 'Bosh sahifa',
        quick_about: 'Biz haqimizda',
        quick_pricing: 'Narxlar',
        quick_vehicles: 'Avtopark',
        quick_regions: 'Hududlar',
        newsletter_placeholder: 'Email kiriting',
        newsletter_button: 'Obuna bo‘lish',
        seats_word: 'o‘rin',
        petrol: 'Benzin',
        diesel: 'Dizel',
        automatic: 'Avtomat',
        manual: 'Mexanik',
        cvt: 'CVT',
        fuel_efficient: 'Yoqilg‘i tejamkor',
        manual_auto: 'Mexanik/Avtomat',
        basic_insurance: 'Asosiy sug‘urta',
        roadside_24_7: '24/7 yo‘l yordami',
        spacious_interior: 'Keng salon',
        awd: 'To‘liq yuritma',
        premium_insurance: 'Premium sug‘urta',
        gps: 'GPS navigatsiya',
        premium_brand: 'Premium brend',
        full_coverage: 'To‘liq qamrov',
        concierge_service: 'Konsijer xizmati'
    }
};

function initI18n() {
    const stored = localStorage.getItem('lang') || 'en';
    setLanguage(stored);
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === stored);
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            buttons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        });
    });
}

function setLanguage(lang) {
    const t = translations[lang] || translations.en;
    localStorage.setItem('lang', lang);

    // Navbar
    setText('a.nav-link[href="#home"]', t.nav_home);
    setText('a.nav-link[href="#about"]', t.nav_about);
    setText('a.nav-link[href="#pricing"]', t.nav_pricing);
    setText('a.nav-link[href="#vehicles"]', t.nav_vehicles);
    setText('a.nav-link[href="#regions"]', t.nav_regions);

    // Hero slides (7 slides)
    const heroTitles = [t.hero_title_1, t.hero_title_2, t.hero_title_3, t.hero_title_4, t.hero_title_5, t.hero_title_6, t.hero_title_7];
    const heroSubs = [t.hero_sub_1, t.hero_sub_2, t.hero_sub_3, t.hero_sub_4, t.hero_sub_5, t.hero_sub_6, t.hero_sub_7];
    const heroCtas = [t.hero_cta_1, t.hero_cta_2, t.hero_cta_3, t.hero_cta_4, t.hero_cta_5, t.hero_cta_6, t.hero_cta_7];
    document.querySelectorAll('.carousel-slides .slide').forEach((slide, i) => {
        const h1 = slide.querySelector('h1');
        const p = slide.querySelector('p');
        const a = slide.querySelector('a.cta-button');
        if (h1) h1.textContent = heroTitles[i] || '';
        if (p) p.textContent = heroSubs[i] || '';
        if (a) a.textContent = heroCtas[i] || '';
    });

    // Featured vehicles section
    setText('.vehicle-showcase h2', t.featured_title);
    document.querySelectorAll('.vehicle-card .rent-btn').forEach(btn => btn.textContent = t.rent_now);

    // About
    setText('#about .about-text h2', t.about_title);
    setText('#about .about-text .lead', t.about_lead);
    // Second paragraph of about
    // Keep existing mission text lengths; replace if present
    const aboutParas = document.querySelectorAll('#about .about-text p');
    if (aboutParas[1]) aboutParas[1].textContent = t.about_mission;
    setText('#about .feature:nth-child(1) h4', t.feat_exp_title);
    setText('#about .feature:nth-child(1) p', t.feat_exp_desc);
    setText('#about .feature:nth-child(2) h4', t.feat_ins_title);
    setText('#about .feature:nth-child(2) p', t.feat_ins_desc);
    setText('#about .feature:nth-child(3) h4', t.feat_247_title);
    setText('#about .feature:nth-child(3) p', t.feat_247_desc);
    setText('#about .contact-item:nth-child(1) h4', t.contact_phone);
    setText('#about .contact-item:nth-child(2) h4', t.contact_email);
    setText('#about .contact-item:nth-child(3) h4', t.contact_hours);

    // Pricing
    setText('#pricing h2', t.pricing_title);
    setText('#pricing .section-subtitle', t.pricing_sub);
    setText('#pricing .featured .popular-badge', t.pricing_most_pop);
    document.querySelectorAll('#pricing .pricing-card .pricing-btn').forEach(btn => btn.textContent = t.choose_plan);
    // Weekly labels
    document.querySelectorAll('#pricing .weekly-rate span').forEach(span => {
        span.textContent = span.textContent.replace(/Weekly|Неделя|Haftalik/i, t.weekly);
    });
    // Pricing features text replacements
    const featureReplacements = new Map([
        ['Fuel Efficient', t.fuel_efficient],
        ['Manual/Auto', t.manual_auto],
        ['Basic Insurance', t.basic_insurance],
        ['24/7 Roadside', t.roadside_24_7],
        ['Spacious Interior', t.spacious_interior],
        ['All-Wheel Drive', t.awd],
        ['Premium Insurance', t.premium_insurance],
        ['GPS Navigation', t.gps],
        ['Premium Brand', t.premium_brand],
        ['Full Coverage', t.full_coverage],
        ['Concierge Service', t.concierge_service]
    ]);
    document.querySelectorAll('#pricing .features li').forEach(li => {
        featureReplacements.forEach((val, key) => {
            if (li.textContent.includes(key)) {
                li.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = node.textContent.replace(key, val);
                    }
                });
            }
        });
        // Translate the word Seats while preserving numbers like "4-5"
        li.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace(/Seats|мест|o‘rin/gi, t.seats_word);
            }
        });
    });

    // Vehicles
    setText('#vehicles h2', t.vehicles_title);
    setText('#vehicles .section-subtitle', t.vehicles_sub);
    const filterOrder = [t.filter_all, t.filter_economy, t.filter_suv, t.filter_luxury, t.filter_sports];
    document.querySelectorAll('.vehicle-filters .filter-btn').forEach((btn, i) => {
        btn.textContent = filterOrder[i] || btn.textContent;
    });
    document.querySelectorAll('#vehicles .book-btn').forEach(btn => btn.textContent = t.book_now);
    // Translate vehicle category labels
    const categoryMap = new Map([
        ['Economy', t.filter_economy],
        ['SUV', t.filter_suv],
        ['Luxury', t.filter_luxury],
        ['Sports', t.filter_sports]
    ]);
    document.querySelectorAll('#vehicles .vehicle-category').forEach(span => {
        const key = [...categoryMap.keys()].find(k => new RegExp(`^${k}$`, 'i').test(span.textContent.trim()));
        if (key) span.textContent = categoryMap.get(key);
    });
    // Translate vehicle specs label words
    const specWordMap = new Map([
        ['Seats', t.seats_word],
        ['Petrol', t.petrol],
        ['Diesel', t.diesel],
        ['Automatic', t.automatic],
        ['Manual', t.manual],
        ['CVT', t.cvt]
    ]);
    document.querySelectorAll('.vehicle-specs span').forEach(span => {
        specWordMap.forEach((val, key) => {
            span.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = node.textContent.replace(new RegExp(key, 'g'), val);
                }
            });
        });
    });

    // Modal
    setText('.modal-specs h3', t.modal_specs);
    setText('.modal-pricing h3', t.modal_pricing);
    setText('.modal-book-btn', t.modal_book);

    // Regions
    setText('#regions h2', t.regions_title);
    setText('#regions .section-subtitle', t.regions_sub);

    // Footer
    setText('.footer-section:nth-child(2) h4', t.footer_quick_links);
    setText('.footer-section:nth-child(3) h4', t.footer_contact_info);
    setText('.footer-section:nth-child(4) h4', t.footer_newsletter);
    setText('.footer-section:nth-child(4) p', t.newsletter_sub);
    // Footer quick links items
    setText('.footer-section:nth-child(2) a[href="#home"]', t.quick_home);
    setText('.footer-section:nth-child(2) a[href="#about"]', t.quick_about);
    setText('.footer-section:nth-child(2) a[href="#pricing"]', t.quick_pricing);
    setText('.footer-section:nth-child(2) a[href="#vehicles"]', t.quick_vehicles);
    setText('.footer-section:nth-child(2) a[href="#regions"]', t.quick_regions);
    // Newsletter input/button
    const newsletterInput = document.querySelector('.newsletter input[type="email"]');
    if (newsletterInput) newsletterInput.placeholder = t.newsletter_placeholder;
    const newsletterBtn = document.querySelector('.newsletter button');
    if (newsletterBtn) newsletterBtn.textContent = t.newsletter_button;
}

function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el && typeof text === 'string') el.textContent = text;
}

function getCurrentLang() {
    return localStorage.getItem('lang') || 'en';
}
