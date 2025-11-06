// EduAcademy Platform - Main JavaScript File

// Global variables
let currentUser = null;
let courses = [];
let enrolledCourses = [];
let teachers = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize data
    initializeCourses();
    initializeTeachers();
    
    // Initialize components
    initializeScrollReveal();
    initializeParticleBackground();
    initializeTeacherCarousel();
    initializeStatCounters();
    
    // Render initial content
    renderCourseGrid();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

// Course data
function initializeCourses() {
    courses = [
        {
            id: 1,
            title: "Advanced Calculus",
            category: "math",
            instructor: "Dr. Sarah Johnson",
            duration: "12 weeks",
            level: "Advanced",
            students: 234,
            rating: 4.9,
            price: "$299",
            image: "https://kimi-web-img.moonshot.cn/img/media.springernature.com/78defea370ff5af0e2e72f1828581eeac877fcdd.png",
            description: "Master advanced calculus concepts including multivariable calculus and differential equations."
        },
        {
            id: 2,
            title: "Python Programming",
            category: "technology",
            instructor: "Prof. Michael Chen",
            duration: "8 weeks",
            level: "Beginner",
            students: 567,
            rating: 4.8,
            price: "$199",
            image: "https://kimi-web-img.moonshot.cn/img/cdn.mos.cms.futurecdn.net/22e19b51e1945138e502ef4e25dd492fd3f19deb.jpg",
            description: "Learn Python programming from scratch with hands-on projects and real-world applications."
        },
        {
            id: 3,
            title: "Creative Writing",
            category: "arts",
            instructor: "Dr. Emily Rodriguez",
            duration: "10 weeks",
            level: "Intermediate",
            students: 189,
            rating: 4.7,
            price: "$249",
            image: "https://kimi-web-img.moonshot.cn/img/www.21kschool.com/e856c3c74741db338a7a2631c3b36d20d7f95060.png",
            description: "Develop your creative writing skills through structured exercises and peer feedback."
        },
        {
            id: 4,
            title: "Organic Chemistry",
            category: "science",
            instructor: "Dr. Sarah Johnson",
            duration: "14 weeks",
            level: "Advanced",
            students: 156,
            rating: 4.6,
            price: "$349",
            image: "https://kimi-web-img.moonshot.cn/img/virtualteacherassociation.org/091ab63fc33a53f05b4c41aa7b124490abbb6a41.jpg",
            description: "Comprehensive study of organic chemistry principles and laboratory techniques."
        },
        {
            id: 5,
            title: "Spanish Language",
            category: "language",
            instructor: "Dr. Emily Rodriguez",
            duration: "16 weeks",
            level: "Beginner",
            students: 423,
            rating: 4.8,
            price: "$279",
            image: "https://kimi-web-img.moonshot.cn/img/cdn-thumbnails.huggingface.co/de3a144cdadf0e5123d3a0467ee99b940edfdfd9.png",
            description: "Learn Spanish from the ground up with immersive lessons and cultural insights."
        },
        {
            id: 6,
            title: "Machine Learning",
            category: "technology",
            instructor: "Prof. Michael Chen",
            duration: "12 weeks",
            level: "Advanced",
            students: 312,
            rating: 4.9,
            price: "$399",
            image: "https://kimi-web-img.moonshot.cn/img/ictinstitute.nl/9021f624a2b88f0f0464a8ba94cf39a16dfe97ee.png",
            description: "Deep dive into machine learning algorithms and artificial intelligence applications."
        },
        {
            id: 7,
            title: "World History",
            category: "arts",
            instructor: "Dr. Emily Rodriguez",
            duration: "10 weeks",
            level: "Intermediate",
            students: 278,
            rating: 4.5,
            price: "$229",
            image: "https://kimi-web-img.moonshot.cn/img/www.clicdata.com/85a2f71bc1d36843120ec680627cb7e10c0d1628.jpg",
            description: "Explore major civilizations and historical events that shaped our modern world."
        },
        {
            id: 8,
            title: "Digital Art",
            category: "arts",
            instructor: "Prof. Michael Chen",
            duration: "8 weeks",
            level: "Intermediate",
            students: 345,
            rating: 4.7,
            price: "$259",
            image: "https://kimi-web-img.moonshot.cn/img/ira.okstate.edu/4493c080e28ab7ec2b2ea6bbfa6edd605894ca64.jpg",
            description: "Master digital art techniques using industry-standard software and tools."
        },
        {
            id: 9,
            title: "Statistics & Probability",
            category: "math",
            instructor: "Dr. Sarah Johnson",
            duration: "10 weeks",
            level: "Intermediate",
            students: 267,
            rating: 4.6,
            price: "$289",
            image: "https://kimi-web-img.moonshot.cn/img/edtechbooks.org/ab08e9834c7bcfa19802add108b5c3735969dac6.png",
            description: "Learn statistical methods and probability theory with practical applications."
        },
        {
            id: 10,
            title: "Web Development",
            category: "technology",
            instructor: "Prof. Michael Chen",
            duration: "12 weeks",
            level: "Beginner",
            students: 456,
            rating: 4.8,
            price: "$319",
            image: "https://kimi-web-img.moonshot.cn/img/www.viewsonic.com/a173104466df9eeff78c7a7895108411f872113d.jpg",
            description: "Build modern websites and web applications with HTML, CSS, and JavaScript."
        },
        {
            id: 11,
            title: "Biology Fundamentals",
            category: "science",
            instructor: "Dr. Sarah Johnson",
            duration: "14 weeks",
            level: "Beginner",
            students: 389,
            rating: 4.7,
            price: "$269",
            image: "https://kimi-web-img.moonshot.cn/img/img.freepik.com/8c3e0d4e562a6e076b4525513dce4fbeb45c6e65.jpg",
            description: "Comprehensive introduction to biology covering cells, genetics, and ecosystems."
        },
        {
            id: 12,
            title: "French Language",
            category: "language",
            instructor: "Dr. Emily Rodriguez",
            duration: "16 weeks",
            level: "Beginner",
            students: 298,
            rating: 4.6,
            price: "$289",
            image: "https://kimi-web-img.moonshot.cn/img/assignmentpoint.com/f0d9b4d0cdfc3241dfe40b83b21fa33f568af58d.jpg",
            description: "Learn French language and culture through immersive lessons and practice."
        }
    ];
}

// Teacher data
function initializeTeachers() {
    teachers = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            subject: "Mathematics & Science",
            experience: "15+ years",
            students: 1200,
            rating: 4.9,
            image: "https://kimi-web-img.moonshot.cn/img/virtualteacherassociation.org/091ab63fc33a53f05b4c41aa7b124490abbb6a41.jpg",
            specialties: ["Calculus", "Physics", "Chemistry"],
            bio: "PhD from MIT with extensive experience in advanced mathematics and theoretical physics."
        },
        {
            id: 2,
            name: "Prof. Michael Chen",
            subject: "Technology & Computer Science",
            experience: "12+ years",
            students: 1500,
            rating: 4.8,
            image: "https://kimi-web-img.moonshot.cn/img/cdn.mos.cms.futurecdn.net/22e19b51e1945138e502ef4e25dd492fd3f19deb.jpg",
            specialties: ["Python", "AI/ML", "Web Development"],
            bio: "Former Google engineer with expertise in artificial intelligence and software development."
        },
        {
            id: 3,
            name: "Dr. Emily Rodriguez",
            subject: "Literature & Languages",
            experience: "10+ years",
            students: 800,
            rating: 4.7,
            image: "https://kimi-web-img.moonshot.cn/img/www.21kschool.com/e856c3c74741db338a7a2631c3b36d20d7f95060.png",
            specialties: ["English", "Creative Writing", "Spanish"],
            bio: "Published author and linguist with expertise in comparative literature and creative writing."
        }
    ];
}

// Course filtering
function filterCourses(category) {
    // Update active filter button
    document.querySelectorAll('.course-filter').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('bg-white', 'text-gray-700');
    });
    
    event.target.classList.add('active');
    event.target.classList.remove('bg-white', 'text-gray-700');
    
    // Filter and render courses
    renderCourseGrid(category);
}

// Render course grid
function renderCourseGrid(filter = 'all') {
    const grid = document.getElementById('course-grid');
    if (!grid) return;
    
    const filteredCourses = filter === 'all' ? courses : courses.filter(course => course.category === filter);
    
    grid.innerHTML = filteredCourses.map(course => `
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover scroll-reveal">
            <div class="relative">
                <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover">
                <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    ${course.level}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
                <p class="text-gray-600 mb-4">${course.description}</p>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👨‍🏫 ${course.instructor}</span>
                        <span>⏱️ ${course.duration}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <div class="flex text-yellow-400">
                            ${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}
                        </div>
                        <span class="text-sm text-gray-600">${course.rating}</span>
                        <span class="text-sm text-gray-500">(${course.students} students)</span>
                    </div>
                    <div class="text-2xl font-bold text-blue-600">${course.price}</div>
                </div>
                <button onclick="enrollInCourse(${course.id})" class="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Enroll Now
                </button>
            </div>
        </div>
    `).join('');
    
    // Re-initialize scroll reveal for new elements
    initializeScrollReveal();
}

// Enroll in course
function enrollInCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Simulate enrollment process
    showNotification(`Successfully enrolled in ${course.title}!`, 'success');
    
    // Add to enrolled courses (simulate)
    if (!enrolledCourses.find(c => c.id === courseId)) {
        enrolledCourses.push({...course, progress: 0, enrolledDate: new Date()});
    }
    
    // Redirect to student dashboard
    setTimeout(() => {
        window.location.href = 'student-dashboard.html';
    }, 1500);
}

// Initialize scroll reveal animations
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Initialize particle background
function initializeParticleBackground() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    // Create p5.js sketch for particle background
    const sketch = (p) => {
        let particles = [];
        
        p.setup = () => {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-1, 1),
                    vy: p.random(-1, 1),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, 255, 255, particle.opacity * 255);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(255, 255, 255, (1 - distance / 100) * 50);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    };
    
    new p5(sketch);
}

// Initialize teacher carousel
function initializeTeacherCarousel() {
    const carousel = document.getElementById('teacher-carousel');
    if (!carousel) return;
    
    new Splide('#teacher-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        breakpoints: {
            768: {
                perPage: 1,
            },
            1024: {
                perPage: 2,
            }
        }
    }).mount();
}

// Initialize stat counters
function initializeStatCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

// Handle scroll events
function handleScroll() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white/90');
    } else {
        navbar.classList.add('bg-white/90');
        navbar.classList.remove('bg-white/95');
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal functions
function showLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideLoginModal() {
    document.getElementById('loginModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showSignupModal() {
    hideLoginModal();
    document.getElementById('signupModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideSignupModal() {
    document.getElementById('signupModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    
    // Simulate login
    currentUser = {
        email: email,
        role: 'student',
        name: 'Demo User'
    };
    
    showNotification('Login successful! Redirecting to dashboard...', 'success');
    hideLoginModal();
    
    setTimeout(() => {
        window.location.href = 'student-dashboard.html';
    }, 1500);
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const accountType = formData.get('account_type') || event.target.querySelector('select').value;
    
    // Simulate signup
    currentUser = {
        email: formData.get('email') || event.target.querySelector('input[type="email"]').value,
        role: accountType,
        name: formData.get('name') || event.target.querySelector('input[type="text"]').value
    };
    
    showNotification('Account created successfully! Welcome to EduAcademy!', 'success');
    hideSignupModal();
    
    setTimeout(() => {
        if (accountType === 'teacher') {
            window.location.href = 'teacher-dashboard.html';
        } else {
            window.location.href = 'student-dashboard.html';
        }
    }, 1500);
}

// Mobile menu toggle
function toggleMobileMenu() {
    // Implementation for mobile menu
    showNotification('Mobile menu feature coming soon!', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white max-w-sm ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // Remove after delay
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Export functions for use in other pages
window.EduAcademy = {
    courses,
    teachers,
    currentUser,
    enrolledCourses,
    showNotification,
    formatDate,
    formatCurrency,
    initializeScrollReveal,
    animateCounter
};