document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Thay đổi icon 3 gạch thành 'X' và ngược lại
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Tự động đóng menu khi nhấn vào 1 link (trên mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // ===== 2. Particle.js Initialization =====
    // Cấu hình nền công nghệ (hạt nối nhau)
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80, // Số lượng hạt
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00ffcc" // Màu của hạt
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00ffcc", // Màu của đường nối
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3, // Tốc độ di chuyển
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse" // Đẩy hạt khi rê chuột
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // Thêm hạt khi click
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });


    // ===== 3. Intersection Observer (Scroll Animations) =====
    // Dùng để kích hoạt hiệu ứng khi cuộn tới
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Kích hoạt khi 10% của element lọt vào màn hình
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class 'visible' để kích hoạt CSS fade-in
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                }
                
                // Kích hoạt skill bars
                if (entry.target.id === 'skills') {
                    const skillLevels = document.querySelectorAll('.skill-level');
                    skillLevels.forEach(skill => {
                        const level = skill.getAttribute('data-level');
                        skill.style.width = level + '%';
                    });
                }
                
                // Tắt theo dõi sau khi đã kích hoạt
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Theo dõi tất cả các section có class 'fade-in'
    const sectionsToFade = document.querySelectorAll('.fade-in');
    sectionsToFade.forEach(section => {
        observer.observe(section);
    });
    
    // Theo dõi riêng section 'skills' để kích hoạt thanh kỹ năng
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    // ===== 4. Typing Effect Function =====
// (Thêm đoạn code này vào bên trong DOMContentLoaded)

// ===== 4. Typing Effect (Looping Titles) =====
    // (Thêm đoạn code này vào bên trong DOMContentLoaded)

    function typeLoopEffect() {
        const titles = ["Fullstack Developer", "Data Engineer", "Mobile Developer"];
        const element = document.getElementById("typing-subtitle");
        
        if (!element) return; // Dừng lại nếu không tìm thấy element

        let titleIndex = 0; // Chức vụ hiện tại (0, 1, 2)
        let charIndex = 0;  // Ký tự hiện tại
        let isDeleting = false; // Trạng thái: đang gõ hay đang xóa
        
        const typeSpeed = 100;    // Tốc độ gõ
        const deleteSpeed = 50;   // Tốc độ xóa
        const pauseTime = 1500; // Thời gian dừng khi gõ xong 1 chữ

        function type() {
            // Lấy chức vụ hiện tại
            const currentTitle = titles[titleIndex];
            
            // Thêm con trỏ nhấp nháy
            if (!element.classList.contains("typing-cursor")) {
                element.classList.add("typing-cursor");
            }

            if (isDeleting) {
                // --- Trạng thái XÓA ---
                // Lấy nội dung, xóa đi 1 ký tự cuối
                element.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                
                // Khi xóa xong
                if (charIndex === 0) {
                    isDeleting = false;
                    // Chuyển sang chức vụ tiếp theo (quay vòng)
                    titleIndex = (titleIndex + 1) % titles.length; 
                    // Dừng 1 chút trước khi gõ chữ mới
                    setTimeout(type, typeSpeed * 2); 
                } else {
                    // Tiếp tục xóa
                    setTimeout(type, deleteSpeed);
                }
                
            } else {
                // --- Trạng thái GÕ ---
                // Lấy nội dung, thêm 1 ký tự
                element.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;

                // Khi gõ xong
                if (charIndex === currentTitle.length) {
                    isDeleting = true;
                    // Dừng 1.5 giây (pauseTime) rồi mới bắt đầu xóa
                    setTimeout(type, pauseTime);
                } else {
                    // Tiếp tục gõ
                    setTimeout(type, typeSpeed);
                }
            }
        }

        // Chờ 1 chút (ví dụ 500ms) sau khi tải trang rồi mới bắt đầu gõ
        setTimeout(type, 500);
    }

    // Gọi hàm để chạy hiệu ứng
    typeLoopEffect();
});