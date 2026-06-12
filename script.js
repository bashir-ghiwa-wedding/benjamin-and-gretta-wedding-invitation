// ==========================================
// 1. NAVIGATION & MUSIC ENGINE CONTROLLER
// ==========================================
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }

    const music = document.getElementById('bg-music');
    if (music) {
        music.muted = false; 
        music.play().catch(error => {
            console.log("Audio waiting for explicit user interaction gesture context.", error);
        });
    }
}

// ==========================================
// 2. WEDDING TARGET COUNTDOWN SCHEDULER
// ==========================================
function initCountdown() {
    const weddingDate = new Date("August 8, 2026 17:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("countdown");
        if (!countdownElement) return;

        if (difference < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = `<div class="v-box"><span class="v-num">🎉</span><span class="v-lbl">Just Married</span></div>`;
        } else {
            countdownElement.innerHTML = `
                <div class="v-box"><span class="v-num">${days}</span><span class="v-lbl">Days</span></div>
                <div class="v-box"><span class="v-num">${hours}</span><span class="v-lbl">Hrs</span></div>
                <div class="v-box"><span class="v-num">${minutes}</span><span class="v-lbl">Min</span></div>
                <div class="v-box"><span class="v-num">${seconds}</span><span class="v-lbl">Sec</span></div>
            `;
        }
    }, 1000);
}

// ==========================================
// 3. INTERACTIVE GEOLOCATION MAP OVERRIDES
// ==========================================
function openMap() {
    const locationQuery = encodeURIComponent("Our Lady of Lebanon, Harissa, Jounieh");
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.open(`maps://maps.apple.com/?q=${locationQuery}`);
    } else {
        window.open(`http://maps.google.com/?q=${locationQuery}`);
    }
}

function openReceptionMap() {
    const receptionQuery = encodeURIComponent("Gefinor Rotana, Beirut, Lebanon");
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.open(`maps://maps.apple.com/?q=${receptionQuery}`);
    } else {
        window.open(`http://maps.google.com/?q=${receptionQuery}`);
    }
}

// ==========================================
// 4. REGISTRY CLIPBOARD COPY CONTROLLER
// ==========================================
function copyAccountNumber() {
    const accountNumText = "123141234-01";
    const isArabic = document.getElementById('lang-btn-ar').classList.contains('active');
    
    navigator.clipboard.writeText(accountNumText).then(() => {
        const toast = document.getElementById('copy-toast');
        const icon = document.getElementById('copy-icon');
        
        if (toast && icon) {
            icon.innerHTML = "✅";
            toast.innerHTML = isArabic ? "تم النسخ بنجاح!" : "Copied successfully!";
            toast.style.opacity = "1";
            
            setTimeout(() => {
                toast.style.opacity = "1";
                icon.innerHTML = "📋";
                toast.innerHTML = isArabic ? "اضغط لنسخ رقم الحساب" : "Click to copy account code";
            }, 2000);
        }
    }).catch(err => {
        console.error("Clipboard error: ", err);
    });
}

// ==========================================
// 5. RSVP FORM SUBMISSION & WHATSAPP PACKAGER
// ==========================================
function submitRSVP(event) {
    event.preventDefault();
    
    const name = document.getElementById('guest-name').value;
    const attendance = document.getElementById('attendance').value;
    const guestCount = document.getElementById('guest-count').value;
    const comment = document.getElementById('guest-comment').value.trim();
    const isArabic = document.getElementById('lang-btn-ar').classList.contains('active');
    
    let message = "";
    
    if (isArabic) {
        if (attendance === "yes") {
            message = `مرحباً! أنا ${name}، أتشرف بالحضور لمشاركتكم فرحتكم الكبرى في حفل الزفاف! 🎉\n• عدد الأشخاص: ${guestCount}`;
            if (comment !== "") message += `\n• ملاحظة: ${comment}`;
        } else {
            message = `مرحباً! أنا ${name}، للأسف أعتذر عن الحضور بسبب ظروف خاصة. أتمنى لكم حياة زوجية مليئة بالسعادة! ❤️`;
            if (comment !== "") message += `\n• ملاحظة: ${comment}`;
        }
    } else {
        if (attendance === "yes") {
            message = `Hi! I am ${name}. I joyfully accept your invitation and can't wait to celebrate your wedding day with you! 🎉\n• Number of guests: ${guestCount}`;
            if (comment !== "") message += `\n• Note: ${comment}`;
        } else {
            message = `Hi! I am ${name}. I regretfully decline your invitation due to previous commitments. Wishing you a beautiful life together! ❤️`;
            if (comment !== "") message += `\n• Note: ${comment}`;
        }
    }
    
    const phoneNumber = "96171038184"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
}

function toggleGuestCount() {
    const attendanceSelect = document.getElementById('attendance');
    const wrapper = document.getElementById('guest-count-wrapper');
    if (attendanceSelect && wrapper) {
        wrapper.style.display = (attendanceSelect.value === 'no') ? 'none' : 'block';
    }
}

// ==========================================
// 6. LANGUAGE TRANSLATION SWITCH ENGINE
// ==========================================
function switchLanguage(lang) {
    const btnEn = document.getElementById('lang-btn-en');
    const btnAr = document.getElementById('lang-btn-ar');
    if (btnEn && btnAr) {
        btnEn.classList.remove('active');
        btnAr.classList.remove('active');
        document.getElementById(`lang-btn-${lang}`).classList.add('active');
    }
    
    const translatableElements = document.querySelectorAll('[data-en]');
    translatableElements.forEach(elem => {
        elem.innerHTML = (lang === 'ar') ? elem.getAttribute('data-ar') : elem.getAttribute('data-en');
    });
    
    const mainContainer = document.querySelector('.phone-container');
    if (mainContainer) {
        if (lang === 'ar') mainContainer.classList.add('rtl-mode');
        else mainContainer.classList.remove('rtl-mode');
    }
    
    // Smooth helper adjustment for the active registry hint text language
    const toast = document.getElementById('copy-toast');
    if (toast && toast.style.opacity !== "1") {
        toast.innerHTML = (lang === 'ar') ? "اضغط لنسخ رقم الحساب" : "Click to copy account code";
    }
}

// ==========================================
// 7. FORM SHUT DOWN & MODERN EXIT SEQUENCER
// ==========================================
function exitInvitation() {
    const music = document.getElementById('bg-music');
    if (music) music.pause();

    const rsvpSlide = document.getElementById('rsvp-slide');
    if (rsvpSlide) {
        rsvpSlide.style.transition = "all 0.8s ease-in-out";
        rsvpSlide.style.opacity = "0";
        rsvpSlide.style.transform = "scale(0.92)";
        rsvpSlide.style.pointerEvents = "none";
        
        setTimeout(() => {
            const isArabic = document.getElementById('lang-btn-ar').classList.contains('active');
            rsvpSlide.innerHTML = `
                <div class="content" style="opacity: 0; transition: opacity 0.5s ease; padding: 40px 20px;">
                    <div style="font-family: 'Cinzel', serif; font-size: 2rem; margin-bottom: 15px; color: #ffffff; letter-spacing: 2px;">B & G</div>
                    <p style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.1rem; color: #eae3db; line-height: 1.6;">
                       ${isArabic ? 'شكراً لكم.<br>نتطلع بلهفة للاحتفال معكم!' : 'Thank you.<br>We look forward to celebrating with you!'}
                    </p>
                </div>
            `;
            setTimeout(() => {
                rsvpSlide.style.opacity = "1";
                rsvpSlide.style.transform = "scale(1)";
                rsvpSlide.querySelector('.content').style.opacity = "0.95";
            }, 50);
        }, 800);
    }
}

// ==========================================
// 8. MASTER APPLICATION BOOTLOADER INIT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    switchLanguage('en'); 
    toggleGuestCount(); 
    
    // Explicit setup ensuring registry card starts with its prompt hint clear visible
    const toast = document.getElementById('copy-toast');
    if(toast) toast.style.opacity = "0.7";
});