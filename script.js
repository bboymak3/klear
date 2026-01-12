// Mobile Navigation Toggle - Versión Mejorada
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenuMobile = document.querySelector('.nav-menu-mobile');
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    const mobileDropdownMenus = document.querySelectorAll('.mobile-dropdown-menu');

    console.log('DOM cargado');
    console.log('Hamburger:', hamburger);
    console.log('Nav menu mobile:', navMenuMobile);

    // Toggle menú hamburguesa
    if (hamburger && navMenuMobile) {
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
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
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

    // Resto del código JavaScript (formularios, animaciones, etc.) permanece igual...
    
    console.log('Menú hamburguesa cargado y funcionando correctamente');
});