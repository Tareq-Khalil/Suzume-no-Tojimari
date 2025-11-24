// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
    
    // Random Hero Image
    const images = [
        "resources/img/suzume1.png", 
        "resources/img/suzume2.png", 
        "resources/img/suzume3.png", 
        "resources/img/suzume4.png"
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const suzumeImage = document.getElementById("suzumeImage");
    if (suzumeImage) {
        suzumeImage.src = randomImage;
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });

        // Close menu when clicking on a link
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
            });
        });
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Animated Counter for Stats
    const animateCounter = (element, target) => {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for Stats Animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll(".stat-number");
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute("data-target"));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Scroll Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Apply animation to various sections
    const animatedElements = document.querySelectorAll(
        ".gallery-item, .character-card, .rating-card, .quote-card, .resource-card, .team-member, .movie-item"
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.6s ease";
        elementObserver.observe(el);
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)";
            navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.15)";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
        }
    });

    // Team Member Modal
    const modal = document.getElementById("memberModal");
    const closeModal = document.querySelector(".close-modal");
    const teamMembers = document.querySelectorAll(".team-member");

    // Team member data
    const teamData = {
        tareq: {
            name: "Tareq Khalil",
            role: "Website Developer",
            image: "resources/team/tareq.jpg",
            details: "Passionate web developer with expertise in modern web technologies. Specialized in creating responsive and user-friendly interfaces.",
            github: "https://github.com/CYB3RBBY",
            linkedin: "#",
            email: "tareq@example.com"
        },
        ans: {
            name: "Ans Wael",
            role: "PPT Creator",
            image: "resources/team/ans.jpg",
            details: "Creative presentation designer with an eye for visual storytelling. Expert in crafting engaging and informative PowerPoint presentations.",
            github: "#",
            linkedin: "#",
            email: "ans@example.com"
        },
        abdelrahman: {
            name: "Abdelrahman Azzam",
            role: "Poster Creator",
            image: "resources/team/abdelrahman.jpg",
            details: "Talented graphic designer specializing in movie poster creation. Brings creativity and artistic vision to every project.",
            github: "#",
            linkedin: "#",
            email: "abdelrahman@example.com"
        },
        kareem: {
            name: "Kareem Fathy",
            role: "Poster Creator",
            image: "resources/team/kareem.jpg",
            details: "Skilled visual artist with a passion for cinema and design. Creates stunning posters that capture the essence of films.",
            github: "#",
            linkedin: "#",
            email: "kareem@example.com"
        },
        muhamed: {
            name: "Muhamed Waleed",
            role: "PDF Writer",
            image: "resources/team/muhamed.jpg",
            details: "Expert content writer specializing in film analysis and reviews. Creates comprehensive and insightful written content.",
            github: "#",
            linkedin: "#",
            email: "muhamed@example.com"
        },
        farouk: {
            name: "Farouk Diab",
            role: "PDF Writer",
            image: "resources/team/farouk.jpg",
            details: "Professional writer with a deep appreciation for cinema. Crafts detailed and engaging film reviews and analyses.",
            github: "#",
            linkedin: "#",
            email: "farouk@example.com"
        }
    };

    // Open modal on team member click
    teamMembers.forEach(member => {
        member.addEventListener("click", () => {
            const memberId = member.getAttribute("data-member");
            const data = teamData[memberId];
            
            if (data) {
                document.getElementById("modalImage").src = data.image;
                document.getElementById("modalName").textContent = data.name;
                document.getElementById("modalRole").textContent = data.role;
                document.getElementById("modalDetails").textContent = data.details;
                document.getElementById("modalGithub").href = data.github;
                document.getElementById("modalLinkedin").href = data.linkedin;
                document.getElementById("modalEmail").href = `mailto:${data.email}`;
                
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    // Close modal on outside click
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Close modal on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Gallery Image Lightbox Effect (Optional)
    const galleryItems = document.querySelectorAll(".gallery-item img");
    galleryItems.forEach(img => {
        img.addEventListener("click", () => {
            const lightbox = document.createElement("div");
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
                cursor: pointer;
            `;
            
            const lightboxImg = document.createElement("img");
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            document.body.style.overflow = "hidden";
            
            lightbox.addEventListener("click", () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = "auto";
            });
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector(".hero");
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effect to resource buttons
    const resourceButtons = document.querySelectorAll(".resource-btn");
    resourceButtons.forEach(btn => {
        btn.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.05) translateY(-2px)";
        });
        
        btn.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1) translateY(0)";
        });
    });

    // Lazy Loading for Videos
    const videos = document.querySelectorAll("video");
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.play();
            } else {
                const video = entry.target;
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // Add active state to navigation on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll("button, .tag, .resource-btn");
    buttons.forEach(button => {
        button.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = "relative";
            this.style.overflow = "hidden";
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-menu a.active {
            color: var(--primary-color);
        }
        
        .nav-menu a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    console.log("Suzume Website Loaded Successfully! 🌸");
});