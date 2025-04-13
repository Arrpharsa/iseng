document.addEventListener('DOMContentLoaded', function() {
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));
    
    if (orderSummary) {
        // Tampilkan detail pesanan
        document.getElementById('game-name').textContent = orderSummary.game;
        document.getElementById('user-id').textContent = orderSummary.userId;
        document.getElementById('zone-id').textContent = orderSummary.zoneId;
        document.getElementById('denom').textContent = orderSummary.denom;
        document.getElementById('price').textContent = orderSummary.price;
        document.getElementById('payment').textContent = orderSummary.payment;

        // Tampilkan instruksi pembayaran sesuai metode
        const paymentSteps = document.getElementById('payment-steps');
        const steps = getPaymentSteps(orderSummary.payment);
        paymentSteps.innerHTML = steps;
    }

    // Fungsi untuk mendapatkan instruksi pembayaran
    function getPaymentSteps(paymentMethod) {
        const steps = {
            'DANA': [
                'Buka aplikasi DANA',
                'Pilih menu "Transfer"',
                'Masukkan nomor tujuan: 081234567890',
                'Masukkan nominal: ' + orderSummary.price,
                'Konfirmasi pembayaran'
            ],
            'GoPay': [
                'Buka aplikasi Gojek',
                'Pilih menu "GoPay"',
                'Pilih "Transfer"',
                'Masukkan nomor tujuan: 081234567890',
                'Masukkan nominal: ' + orderSummary.price,
                'Konfirmasi pembayaran'
            ],
            'OVO': [
                'Buka aplikasi OVO',
                'Pilih menu "Transfer"',
                'Masukkan nomor tujuan: 081234567890',
                'Masukkan nominal: ' + orderSummary.price,
                'Konfirmasi pembayaran'
            ],
            'BCA': [
                'Buka aplikasi BCA Mobile',
                'Pilih menu "Transfer"',
                'Masukkan nomor rekening: 1234567890',
                'Masukkan nominal: ' + orderSummary.price,
                'Konfirmasi pembayaran'
            ]
        };

        return steps[paymentMethod].map(step => `<p>${step}</p>`).join('');
    }
}); 