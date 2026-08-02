/**
 * LENSON CONSULTING
 * Premium Restaurant-Webdesign
 * Haupt-JavaScript-Datei
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION SCROLL EFFEKT
    // ============================================
    const navbar = document.getElementById('mainNav');
    
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // ============================================
    // NAVIGATION: Aktiver Link beim Scrollen
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // NAVIGATION: Mobiles Menü schließen
    // ============================================
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    if (navToggler && navCollapse) {
        document.querySelectorAll('.nav-link, .btn-outline-gold').forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    navToggler.click();
                }
            });
        });
    }

    // ============================================
    // KONTAKTFORMULAR
    // ============================================
    const kontaktForm = document.getElementById('kontaktForm');
    const formMessage = document.getElementById('formMessage');

    if (kontaktForm) {
        kontaktForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const nachricht = document.getElementById('nachricht').value.trim();
            
            if (!name || !email || !nachricht) {
                e.preventDefault();
                showFormMessage('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                e.preventDefault();
                showFormMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                return;
            }
            
            // Erfolgsmeldung – Formular wird von Web3Forms abgeschickt
            showFormMessage('Vielen Dank, ' + name + '! Ihre Anfrage wird gesendet. Ich melde mich innerhalb von 24 Stunden bei Ihnen.', 'success');
        });
    }
    
    function showFormMessage(message, type) {
        if (!formMessage) return;
        formMessage.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'form-message alert ' + (type === 'success' ? 'alert-success' : 'alert-danger');
        div.textContent = message;
        div.style.marginTop = '20px';
        div.style.borderRadius = '8px';
        formMessage.appendChild(div);
        setTimeout(() => { formMessage.innerHTML = ''; }, 8000);
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // DIGITALE VISITENKARTE
    // ============================================
    
    // QR-Code toggeln
    window.toggleQR = function() {
        const modal = document.getElementById('qrModal');
        if (!modal) return;
        modal.classList.toggle('active');
        
        if (modal.classList.contains('active')) {
            generateQR();
        }
    };
    
    // QR-Code generieren
    function generateQR() {
        const qrContainer = document.getElementById('qrCode');
        if (!qrContainer) return;
        
        const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Robin Lenson
ORG:Lenson Consulting
TEL:+4917662145153
EMAIL:info@lensonconsulting.de
URL:https://lensonconsulting.de
NOTE:Restaurant-Webdesign auf höchstem Niveau
END:VCARD`;
        
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vcardData)}&bgcolor=FFFFFF&color=1A1A1A`;
        
        qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR-Code Visitenkarte" style="width:200px;height:200px;border-radius:4px;">`;
    }
    
    // VCF-Datei herunterladen
    window.downloadVCard = function() {
        const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Robin Lenson
ORG:Lenson Consulting
TEL;TYPE=CELL:+4917662145153
EMAIL:info@lensonconsulting.de
URL:https://lensonconsulting.de
NOTE:Restaurant-Webdesign auf höchstem Niveau
END:VCARD`;
        
        const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Robin_Lenson_Lenson_Consulting.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    console.log('%c🦁 LENSON CONSULTING %c| %cPremium Restaurant-Webdesign',
        'font-size: 18px; font-weight: bold; color: #C6A86B;',
        '',
        'font-size: 14px; color: #fff;');
    console.log('%cInteresse? info@lensonconsulting.de', 'font-size: 12px; color: #9CA3AF;');
});