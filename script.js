// تفعيل الوضع الليلي
const darkModeBtn = document.getElementById('dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeBtn.textContent = 
    document.body.classList.contains('dark-mode') ? 'تعطيل الوضع الليلي' : 'تفعيل الوضع الليلي';
});

// تحديث الأذكار بشكل دوري
const adhkar = ["سبحان الله", "الحمد لله", "الله أكبر", "لا إله إلا الله"];
let dhikrIndex = 0;

setInterval(() => {
  const dhikrElement = document.getElementById('dhikr');
  dhikrElement.textContent = adhkar[dhikrIndex];
  dhikrIndex = (dhikrIndex + 1) % adhkar.length;
}, 60000); // تحديث كل دقيقة

// حساب مواقيت الصلاة باستخدام مكتبة Adhan.js (تحتاج لإضافتها في HTML)
function updatePrayerTimes() {
  const times = {
    fajr: "05:30",
    dhuhr: "12:00",
    asr: "15:30",
    maghrib: "18:00",
    isha: "19:30"
  };
  
  document.getElementById('fajr').textContent = times.fajr;
  document.getElementById('dhuhr').textContent = times.dhuhr;
  document.getElementById('asr').textContent = times.asr;
  document.getElementById('maghrib').textContent = times.maghrib;
  document.getElementById('isha').textContent = times.isha;
}

updatePrayerTimes();

// تحديد اتجاه القبلة
const qiblaBtn = document.getElementById('qibla-btn');
qiblaBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const qiblaDirection = getQiblaDirection(latitude, longitude);
      document.getElementById('qibla-direction').textContent = `اتجاه القبلة: ${qiblaDirection}°`;
    });
  } else {
    alert("الموقع الجغرافي غير مدعوم في متصفحك.");
  }
});

function getQiblaDirection(lat, lon) {
  const kaabaLat = 21.4225;
  const kaabaLon = 39.8262;
  const dLon = (kaabaLon - lon) * (Math.PI / 180);
  const y = Math.sin(dLon) * Math.cos(kaabaLat * (Math.PI / 180));
  const x = Math.cos(lat * (Math.PI / 180)) * Math.sin(kaabaLat * (Math.PI / 180)) -
            Math.sin(lat * (Math.PI / 180)) * Math.cos(kaabaLat * (Math.PI / 180)) * Math.cos(dLon);
  const bearing = Math.atan2(y, x) * (180 / Math.PI);
  return (bearing + 360) % 360;
}
