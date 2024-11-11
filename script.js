// الوضع الليلي
const toggle = document.getElementById('dark-mode-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// تحديد القبلة
function findQibla() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const qiblaDirection = Math.atan2(39.8262 - latitude, 21.4225 - longitude) * 180 / Math.PI;
            document.getElementById('qibla-direction').innerText = `اتجاه القبلة: ${qiblaDirection.toFixed(2)}°`;
        });
    }
}

// أوقات الصلاة
function calculatePrayerTimes() {
    // هنا يمكن استخدام مكتبات مثل praytimes.js (بدون API خارجي)
    const times = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
    const timesDiv = document.getElementById('times');
    times.forEach(prayer => {
        const time = new Date().toLocaleTimeString();
        timesDiv.innerHTML += `<p>${prayer}: ${time}</p>`;
    });
}

// تحديث الأذكار يوميًا
const azkarList = ["سبحان الله", "الحمد لله", "لا إله إلا الله", "الله أكبر"];
function updateAzkar() {
    const randomAzkar = azkarList[Math.floor(Math.random() * azkarList.length)];
    document.getElementById('azkar-text').innerText = randomAzkar;
}
setInterval(updateAzkar, 60000);

// استدعاء الدوال
calculatePrayerTimes();
updateAzkar();
