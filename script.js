// Mobile Navigation Toggle - Versión Corregida
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenuMobile = document.querySelector('.nav-menu-mobile');
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    const mobileDropdownMenus = document.querySelectorAll('.mobile-dropdown-menu');

    console.log('DOM cargado');
    console.log('Hamburger:', hamburger);
    console.log('Nav menu mobile:', navMenuMobile);

    // Verificar que los elementos existan
    if (hamburger && navMenuMobile) {
        // Toggle menú hamburguesa
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Click en hamburguesa');
            hamburger.classList.toggle('active');
            navMenuMobile.classList.toggle('active');
            
            console.log('Hamburger active:', hamburger.classList.contains('active'));
            console.log('Nav menu active:', navMenuMobile.classList.contains('active'));
        });

        // Cerrar menú al hacer click en enlaces
        document.querySelectorAll('.mobile-link, .mobile-sublink').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    // Cerrar menú
                    hamburger.classList.remove('active');
                    navMenuMobile.classList.remove('active');
                    
                    // Cerrar dropdowns
                    mobileDropdownBtns.forEach(btn => btn.classList.remove('active'));
                    mobileDropdownMenus.forEach(menu => menu.classList.remove('active'));
                    
                    // Scroll suave
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenuMobile.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenuMobile.classList.remove('active');
                
                // Cerrar dropdowns
                mobileDropdownBtns.forEach(btn => btn.classList.remove('active'));
                mobileDropdownMenus.forEach(menu => menu.classList.remove('active'));
            }
        });
    } else {
        console.error('No se encontraron los elementos del menú móvil');
        console.log('Hamburger:', hamburger);
        console.log('Nav menu mobile:', navMenuMobile);
    }

    // Toggle dropdowns móviles
    mobileDropdownBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            
            // Cerrar todos los dropdowns
            mobileDropdownBtns.forEach(b => b.classList.remove('active'));
            mobileDropdownMenus.forEach(m => m.classList.remove('active'));
            
            // Abrir el dropdown actual si estaba cerrado
            if (!isActive) {
                this.classList.add('active');
                mobileDropdownMenus[index].classList.add('active');
            }
        });
    });

    // Smooth scrolling para todos los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
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

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create WhatsApp message
            const whatsappMessage = `¡Hola! Soy ${name} y me gustaría agendar una cita.%0A%0A` +
                                   `📧 Email: ${email}%0A` +
                                   `📱 Teléfono: ${phone}%0A` +
                                   `✂️ Servicio: ${service}%0A` +
                                   `💬 Mensaje: ${message || 'No hay mensaje adicional'}`;
            
            // Open WhatsApp with pre-filled message
            const whatsappURL = `https://wa.me/+56951947706?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('¡Gracias! Te redirigiremos a WhatsApp para completar tu reserva.');
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Service cards animation
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Feature items animation
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Process steps animation
    document.querySelectorAll('.process-step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'scale(0.8)';
        step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(step);
    });

    // FAQ items animation
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add active state to navigation based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu-desktop a, .mobile-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effect to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('Script cargado y funcionando correctamente');
});