// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenuMobile = document.querySelector('.nav-menu-mobile');
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    const mobileDropdownMenus = document.querySelectorAll('.mobile-dropdown-menu');

    if (hamburger && navMenuMobile) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenuMobile.classList.toggle('active');
        });

        document.querySelectorAll('.mobile-link, .mobile-sublink').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    hamburger.classList.remove('active');
                    navMenuMobile.classList.remove('active');
                    
                    mobileDropdownBtns.forEach(btn => btn.classList.remove('active'));
                    mobileDropdownMenus.forEach(menu => menu.classList.remove('active'));
                    
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenuMobile.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenuMobile.classList.remove('active');
                
                mobileDropdownBtns.forEach(btn => btn.classList.remove('active'));
                mobileDropdownMenus.forEach(menu => menu.classList.remove('active'));
            }
        });
    }

    mobileDropdownBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            
            mobileDropdownBtns.forEach(b => b.classList.remove('active'));
            mobileDropdownMenus.forEach(m => m.classList.remove('active'));
            
            if (!isActive) {
                this.classList.add('active');
                mobileDropdownMenus[index].classList.add('active');
            }
        });
    });

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

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            const whatsappMessage = `¡Hola! Soy ${name} y me gustaría agendar una cita.%0A%0A` +
                                   `📧 Email: ${email}%0A` +
                                   `📱 Teléfono: ${phone}%0A` +
                                   `✂️ Servicio: ${service}%0A` +
                                   `💬 Mensaje: ${message || 'No hay mensaje adicional'}`;
            
            const whatsappURL = `https://wa.me/+56951947706?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');
            
            this.reset();
            
            alert('¡Gracias! Te redirigiremos a WhatsApp para completar tu reserva.');
        });
    }
});