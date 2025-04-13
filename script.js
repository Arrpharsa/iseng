// Fungsi untuk menangani klik pada tombol "Top Up Sekarang"
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('topupModal');
    const closeBtn = document.querySelector('.close-modal');
    const topUpButtons = document.querySelectorAll('.game-card button');
    const denomCards = document.querySelectorAll('.denom-card');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Buka modal saat tombol "Top Up Sekarang" diklik
    topUpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameCard = this.closest('.game-card');
            const gameName = gameCard.querySelector('h3').textContent;
            document.getElementById('modalGameName').textContent = gameName;
            modal.style.display = 'block';
        });
    });

    // Tutup modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Tutup modal saat klik di luar modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Pilih nominal
    denomCards.forEach(card => {
        card.addEventListener('click', function() {
            denomCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Pilih metode pembayaran
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Proses checkout
    checkoutBtn.addEventListener('click', function() {
        const userId = document.querySelector('.input-section input[placeholder="User ID"]').value;
        const zoneId = document.querySelector('.input-section input[placeholder="Zone ID"]').value;
        const selectedDenom = document.querySelector('.denom-card.selected');
        const selectedPayment = document.querySelector('.payment-option.selected');

        if (!userId || !zoneId) {
            alert('Mohon masukkan User ID dan Zone ID!');
            return;
        }

        if (!selectedDenom) {
            alert('Mohon pilih nominal top up!');
            return;
        }

        if (!selectedPayment) {
            alert('Mohon pilih metode pembayaran!');
            return;
        }

        // Tampilkan instruksi pembayaran
        const paymentMethod = selectedPayment.querySelector('span').textContent;
        const price = selectedDenom.querySelector('.price').textContent;
        
        let paymentSteps = '';
        switch(paymentMethod) {
            case 'DANA':
                paymentSteps = `1. Buka aplikasi DANA\n2. Pilih menu "Transfer"\n3. Masukkan nomor tujuan: 081234567890\n4. Masukkan nominal: ${price}\n5. Konfirmasi pembayaran`;
                break;
            case 'GoPay':
                paymentSteps = `1. Buka aplikasi Gojek\n2. Pilih menu "GoPay"\n3. Pilih "Transfer"\n4. Masukkan nomor tujuan: 081234567890\n5. Masukkan nominal: ${price}\n6. Konfirmasi pembayaran`;
                break;
            case 'OVO':
                paymentSteps = `1. Buka aplikasi OVO\n2. Pilih menu "Transfer"\n3. Masukkan nomor tujuan: 081234567890\n4. Masukkan nominal: ${price}\n5. Konfirmasi pembayaran`;
                break;
            case 'BCA':
                paymentSteps = `1. Buka aplikasi BCA Mobile\n2. Pilih menu "Transfer"\n3. Masukkan nomor rekening: 1234567890\n4. Masukkan nominal: ${price}\n5. Konfirmasi pembayaran`;
                break;
        }

        alert(`Instruksi Pembayaran:\n\n${paymentSteps}\n\nSetelah melakukan pembayaran, diamond akan masuk dalam waktu 1-5 menit.`);
        modal.style.display = 'none';
    });
});

// Fungsi untuk menangani pencarian game
function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    let currentFilter = 'all';

    // Event listener untuk input pencarian
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterGames(searchTerm, currentFilter);
    });

    // Event listener untuk tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambah class active ke tombol yang diklik
            button.classList.add('active');
            
            // Update filter yang aktif
            currentFilter = button.textContent.toLowerCase();
            const searchTerm = searchInput.value.toLowerCase();
            filterGames(searchTerm, currentFilter);
        });
    });

    // Fungsi untuk memfilter game
    function filterGames(searchTerm, filter) {
        gameCards.forEach(card => {
            const gameName = card.querySelector('h3').textContent.toLowerCase();
            const gameCategory = card.getAttribute('data-category') || 'all';
            const isVisible = 
                (filter === 'all' || gameCategory === filter) &&
                (searchTerm === '' || gameName.includes(searchTerm));
            
            card.style.display = isVisible ? 'block' : 'none';
        });
    }
}

// Panggil fungsi setupSearch saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    
    // Tambahkan kategori data ke setiap game card
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const gameName = card.querySelector('h3').textContent;
        if (gameName === 'Mobile Legends' || gameName === 'PUBG Mobile' || gameName === 'Free Fire') {
            card.setAttribute('data-category', 'mobile');
        } else if (gameName === 'Valorant') {
            card.setAttribute('data-category', 'pc');
        }
    });
});

// Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Active Link Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, footer');

    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.nav-container').prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}); 