// Fungsi untuk menangani autentikasi
function setupAuth() {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const modal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close-auth-modal');
    const switchToLogin = document.querySelector('.switch-to-login');
    const switchToRegister = document.querySelector('.switch-to-register');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Inisialisasi localStorage jika belum ada
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Buka modal login/register
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            showLoginForm();
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            showRegisterForm();
        });
    }

    // Tutup modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Tutup modal saat klik di luar
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Switch antara form login dan register
    if (switchToLogin) {
        switchToLogin.addEventListener('click', showLoginForm);
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', showRegisterForm);
    }

    // Handle form login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Validasi input
            if (!email || !password) {
                showErrorMessage('Harap isi semua field!');
                return;
            }
            
            // Simulasi login
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                showSuccessMessage('Login berhasil!');
                setTimeout(() => {
                    modal.style.display = 'none';
                    updateAuthUI();
                    window.location.reload(); // Refresh halaman setelah login
                }, 1500);
            } else {
                showErrorMessage('Email atau password salah!');
            }
        });
    }

    // Handle form register
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;

            // Validasi input
            if (!name || !email || !password || !confirmPassword) {
                showErrorMessage('Harap isi semua field!');
                return;
            }

            if (password !== confirmPassword) {
                showErrorMessage('Password tidak cocok!');
                return;
            }

            // Simulasi register
            const users = JSON.parse(localStorage.getItem('users'));
            
            if (users.some(u => u.email === email)) {
                showErrorMessage('Email sudah terdaftar!');
                return;
            }

            const newUser = {
                name,
                email,
                password,
                joinDate: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            showSuccessMessage('Registrasi berhasil!');
            
            setTimeout(() => {
                modal.style.display = 'none';
                showLoginForm();
            }, 1500);
        });
    }

    // Fungsi untuk menampilkan form login
    function showLoginForm() {
        if (loginForm && registerForm && switchToLogin && switchToRegister) {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            switchToLogin.style.display = 'none';
            switchToRegister.style.display = 'block';
        }
    }

    // Fungsi untuk menampilkan form register
    function showRegisterForm() {
        if (loginForm && registerForm && switchToLogin && switchToRegister) {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            switchToLogin.style.display = 'block';
            switchToRegister.style.display = 'none';
        }
    }

    // Fungsi untuk menampilkan pesan sukses
    function showSuccessMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'auth-message success';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    }

    // Fungsi untuk menampilkan pesan error
    function showErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'auth-message error';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    }

    // Fungsi untuk update UI setelah login/logout
    function updateAuthUI() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const navActions = document.querySelector('.nav-actions');
        
        if (currentUser && navActions) {
            navActions.innerHTML = `
                <div class="user-profile">
                    <span>${currentUser.name}</span>
                    <button class="logout-btn">Logout</button>
                </div>
            `;
            
            const logoutBtn = document.querySelector('.logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('currentUser');
                    updateAuthUI();
                    window.location.reload(); // Refresh halaman setelah logout
                });
            }
        } else if (navActions) {
            navActions.innerHTML = `
                <button class="login-btn">Masuk</button>
                <button class="register-btn">Daftar</button>
            `;
            setupAuth(); // Setup ulang event listeners
        }
    }

    // Cek status login saat halaman dimuat
    updateAuthUI();
}

// Panggil fungsi setupAuth saat halaman dimuat
document.addEventListener('DOMContentLoaded', setupAuth); 