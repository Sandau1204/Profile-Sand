
// THAY THẾ BẰNG CẤU HÌNH CỦA BẠN (từ Bước 2)
const firebaseConfig = {
  apiKey: "AIzaSyCKE0G7ZmtV1wNdaO0dfxmIefZ59qdah1s",
  authDomain: "sand-profile-1205e.firebaseapp.com",
  projectId: "sand-profile-1205e",
  storageBucket: "sand-profile-1205e.firebasestorage.app",
  messagingSenderId: "669072661949",
  appId: "1:669072661949:web:c2a0f41b54b5c9939846d4",
  measurementId: "G-07ZQYCBJH2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    // --- MỚI: XỬ LÝ FORM LIÊN HỆ BẰNG FIREBASE ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // 1. Ngăn chặn form gửi đi theo cách truyền thống
            e.preventDefault();

            // 2. Lấy dữ liệu từ form
            const name = contactForm.name.value;
            const email = contactForm.email.value;
            const message = contactForm.message.value;

            // 3. Lấy nút submit và hiển thị trạng thái "Đang gửi..."
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="vi">Đang gửi...</span><span class="en">Sending...</span>';

            // 4. Gửi dữ liệu lên Firestore
            db.collection("contacts").add({
                name: name,
                email: email,
                message: message,
                timestamp: new Date() // Thêm dấu thời gian
            })
            .then(() => {
                // 5. Gửi thành công
                console.log("Document successfully written!");
                // Chuyển hướng đến trang cảm ơn
                window.location.href = "thank-you.html"; 
            })
            .catch((error) => {
                // 6. Gửi thất bại
                console.error("Error writing document: ", error);
                alert("Đã có lỗi xảy ra. Vui lòng thử lại.");

                // Khôi phục nút
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }

    // --- HÀM HIỆU ỨNG GÕ PHÍM VÀ XOAY VÒNG (MỚI) ---

// Hàm trợ giúp để tạm dừng (pause)
const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Hàm để gõ chữ
async function type(element, text, speed = 100) {
    const cursor = element.nextElementSibling;
    if (cursor) cursor.style.display = 'none'; // Ẩn con trỏ khi gõ

    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await pause(speed);
    }

    if (cursor) cursor.style.display = 'inline-block'; // Hiện lại con trỏ
}

// Hàm để xóa chữ
async function deleteText(element, speed = 50) {
    const cursor = element.nextElementSibling;
    if (cursor) cursor.style.display = 'none'; // Ẩn con trỏ khi xóa

    const text = element.innerHTML;
    for (let i = text.length - 1; i >= 0; i--) {
        element.innerHTML = text.substring(0, i);
        await pause(speed);
    }

    if (cursor) cursor.style.display = 'inline-block'; // Hiện lại con trỏ
}

// Hàm chính điều khiển vòng lặp
async function typeDeleteLoop(element) {
    // Lấy danh sách từ data attributes và tách ra thành mảng
    const titlesVI = (element.getAttribute('data-vi') || '').split(',');
    const titlesEN = (element.getAttribute('data-en') || '').split(',');
    const cursor = element.nextElementSibling;

    // Vòng lặp vô tận
    while (true) {
        // Kiểm tra ngôn ngữ hiện tại
        const lang = document.documentElement.lang || 'vi';
        const currentTitles = (lang === 'vi') ? titlesVI : titlesEN;

        // Lặp qua từng chức vụ
        for (const title of currentTitles) {
            if (!title) continue; // Bỏ qua nếu rỗng

            await type(element, title, 100); // Gõ chữ
            await pause(2000);               // Dừng 2 giây
            await deleteText(element, 50);  // Xóa chữ
            await pause(500);                // Dừng 0.5 giây trước khi gõ chữ tiếp
        }
    }
}

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
    // ... (phần code particlesJS.load) ...

// --- MỚI: Khởi chạy VÒNG LẶP gõ phím ---
    const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
        typeDeleteLoop(typingElement);
    }
});
