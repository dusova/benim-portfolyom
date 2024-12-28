const navMenu = document?.getElementById("nav-menu");
const navToggle = document?.getElementById("nav-toggle");
const navClose = document?.getElementById("nav-close");

navToggle?.addEventListener("click", () => {
  navMenu?.classList?.add("show-menu");
});

navClose?.addEventListener("click", () => {
  navMenu?.classList?.remove("show-menu");
});

/*===== GİTHUB PROJELERİ ÇEKME =====*/

// GitHub kullanıcı adınızı buraya yazın
const githubUsername = 'dusova';
const personalAccessToken = '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'; // Buraya kendi token'ınızı ekleyin
const projelerimContainer = document.getElementById('projelerim-container');

// Maksimum açıklama uzunluğu
const maxDescriptionLength = 201; // Karakter sayısını buradan ayarlayın

// Proje adlarını güncellemek için eşleme nesnesi
const projectNameMapping = {
  'basit-yapilacaklar-listesi': 'Basit Yapılacaklar Listesi',
  'graphic-design-portfolio': 'Grafik Tasarımcı Portfolyo',
  'weather-forecast': 'Hava Durumu',
  'iphone-calculator': 'iPhone Hesap Makinesi',
  'dusovadb': 'MadTethys Database',
  'ai-tools': 'Yapay Zeka Araçları',
  'reddit-random-image-api': 'Reddit API Rastgele Resim',
  'sayi-tahmin-oyunu': 'Sayı Tahmin Oyunu',
  'dusova': 'MadTethys ReadMe',
  'spotify-recently-played': 'Spotify Son Dinlenen Müzikler',
  // Diğer projeleri buraya ekleyin
};

// Her proje için görsel URL'lerini içeren eşleme nesnesi
const projectImageMapping = {
  'graphic-design-portfolio': 'https://mdusova.com/dosyalar/resimler/madgrafik.webp',
  'dusovadb': 'https://mdusova.com/dosyalar/resimler/madtethysdb.webp',
  'ai-tools': 'https://mdusova.com/dosyalar/resimler/yapayzeka.webp',
  'reddit-random-image-api': 'https://mdusova.com/dosyalar/resimler/redditapi.webp',
  'dusova': 'https://mdusova.com/dosyalar/resimler/readme.webp',
  'spotify-recently-played': 'https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&width=300&count=4',
  // Diğer projeleri buraya ekleyin
};

const projectOrder = [
  'spotify-recently-played',
  'graphic-design-portfolio',
  'dusovadb',
  'reddit-random-image-api',
  'ai-tools',
  'dusova',
  // Diğer projeleri istediğiniz sırada ekleyin
];

// GitHub API'sinden repoları çekmek için bir fonksiyon
async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
      headers: {
        'Authorization': `token ${personalAccessToken}` // Token'ı burada ekliyoruz
      }
    });
    
    const repos = await response.json();

    // Projeleri sıralama dizisine göre sıralama
    const sortedRepos = projectOrder.map(projectName => 
      repos.find(repo => repo.name === projectName)
    ).filter(repo => repo); // Sıralama dizisinde olmayan projeleri filtrele

    sortedRepos.forEach(repo => {
      const projectCard = document.createElement('article');
      projectCard.className = 'projelerim__card';

      // Açıklamayı kısıtlama
      const description = repo.description || 'Bu projede açıklama bulunmuyor.';
      const shortDescription = description.length > maxDescriptionLength ? 
        description.substring(0, maxDescriptionLength) + '...' : 
        description;

      // Proje ismini güncelleme
      const projectName = projectNameMapping[repo.name] || repo.name; // Eşleme yoksa eski ismi kullan
      const projectImage = projectImageMapping[repo.name] || 'https://via.placeholder.com/300'; // Görseli güncelle

      projectCard.innerHTML = `
        <a href="${repo.html_url}" target="_blank" class="projelerim__link">
          <div class="projelerim__image">
            <img src="${projectImage}" style="border-radius:10px; height:273px; width:300px;" alt="${projectName}" class="projelerim__img" />
            <a href="${repo.html_url}" target="_blank" class="projelerim__button button">
              <i class="ri-arrow-right-up-line"></i>
            </a>
          </div>
        </a>
        <div class="projelerim__content">
          <h3 class="projelerim__subtitle">GitHub Projesi</h3>
          <h2 class="projelerim__title">${projectName}</h2>
          <p class="projelerim__description">${shortDescription}</p>
        </div>
        <a href="${repo.html_url}" target="_blank" class="projelerim__demo button">
          <i class="ri-layout-6-line"></i> Projeyi Gör
        </a>
      `;
      projelerimContainer.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Github projeleri listenmesinde bir hata oluştu:', error);
  }
}

// Sayfa yüklendiğinde fonksiyonu çağır
window.onload = fetchGitHubRepos;


const navLink = document?.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document?.getElementById("nav-menu");
  navMenu?.classList?.remove("show-menu");
};
navLink?.forEach((n) => n?.addEventListener("click", linkAction));
const shadowHeader = () => {
  const header = document?.getElementById("header");
  this?.scrollY >= 50
    ? header?.classList.add("shadow-header")
    : header?.classList.remove("shadow-header");
};
window?.addEventListener("scroll", shadowHeader);


const iletisimForm = document?.getElementById("iletisim-form");
const iletisimMessage = document?.getElementById("iletisim-message");
const btnSendMessage = document?.getElementById("iletisim-button");

const sendEmail = (e) => {
  e?.preventDefault();
  btnSendMessage.innerHTML = "<i class='ri-send-plane-line'></i> Gönderiliyor...";
  btnSendMessage.disabled = true;
  emailjs
    ?.sendForm(
      "service_6ucm1ji",
      "template_pe4eizl",
      iletisimForm,
      "XvUDYMGzr8Auvv-O9"
    )
    ?.then(
      (result) => {
        iletisimMessage.innerHTML = "Mesaj başarılı bir şekilde gönderildi! ✅";

        setTimeout(() => {
          iletisimMessage.innerHTML = "";
        }, 5000);

        iletisimForm?.reset();

        btnSendMessage.innerHTML =
          "<i class='ri-send-plane-line'></i> Mesaj Gönder";

        btnSendMessage.disabled = false;
      },
      (error) => {
        iletisimMessage.innerHTML = "Mesaj gönderilemedi! (servis hatası) ❌";

        setTimeout(() => {
          iletisimMessage.innerHTML = "";
        }, 5000);

        btnSendMessage.innerHTML =
          "<i class='ri-send-plane-line'></i> Mesaj Gönder";

        btnSendMessage.disabled = false;
      }
    );
};

iletisimForm.addEventListener("submit", sendEmail);

const scrollUp = () => {
  const scrollUp = document?.getElementById("scroll-up");
  this?.scrollY >= 350
    ? scrollUp?.classList?.add("show-scroll")
    : scrollUp?.classList?.remove("show-scroll");
};

window?.addEventListener("scroll", scrollUp);

const sections = document?.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window?.scrollY;

  sections?.forEach((current) => {
    const sectionHeight = current?.offsetHeight,
      sectionTop = current?.offsetTop - 58,
      sectionId = current?.getAttribute("id"),
      sectionsClass = document?.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass?.classList?.add("active-link");
    } else {
      sectionsClass?.classList?.remove("active-link");
    }
  });
};
window?.addEventListener("scroll", scrollActive);

const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)");
const themeButton = document?.getElementById("theme-button");

const darkTheme = () => {
  document?.body?.classList?.add("dark-theme");
  themeButton?.classList?.add("ri-moon-line");
  themeButton?.classList?.remove("ri-sun-line");
};

const lightTheme = () => {
  document?.body?.classList?.remove("dark-theme");
  themeButton?.classList?.remove("ri-moon-line");
  themeButton?.classList?.add("ri-sun-line");
};

isDarkTheme?.matches ? darkTheme() : lightTheme();

isDarkTheme?.addEventListener("change", () => {
  isDarkTheme.matches ? darkTheme() : lightTheme();
});
themeButton?.addEventListener("click", () => {
  document?.body?.classList?.toggle("dark-theme");
  themeButton?.classList?.toggle("ri-moon-line");
  themeButton?.classList?.toggle("ri-sun-line");
});
const sr = scrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 300,
});

sr?.reveal(
  ".anasayfa__perfil, .hakkimda__image, .iletisim__mail, #deneyimlerim-box-right, #music-box-right",
  { origin: "right" }
);
sr?.reveal(
  ".anasayfa__name, .anasayfa__info, .hakkimda__container, .section__title-1, .hakkimda__info, .iletisim__social, .iletisim__data, #deneyimlerim-box-left, #music-box-left",
  { origin: "left" }
);
sr?.reveal(".projelerim__card, .section__title-2, .music__title-sub", {
  interval: 100,
});
