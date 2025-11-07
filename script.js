document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dark/Light Mode ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Kiểm tra chế độ đã lưu
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Lưu lựa chọn vào localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    // --- 2. Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Thay đổi icon (tùy chọn)
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
    
    // Đóng menu khi click vào link (trên mobile)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-xmark');
            }
        });
    });

    // --- 3. Chuyển đổi Ngôn ngữ ---
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlEl = document.documentElement;

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            htmlEl.setAttribute('lang', lang);

            // Cập nhật trạng thái 'active' cho nút
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // --- 4. Khởi tạo Particles.js (Nền Plexus) ---
    // Bạn cần tạo file 'particles.json' để cấu hình hiệu ứng
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js config loaded');
    });

});