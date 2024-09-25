/*=============== SHOW MENU ===============*/
const navMenu = document?.getElementById("nav-menu");
const navToggle = document?.getElementById("nav-toggle");
const navClose = document?.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
navToggle?.addEventListener("click", () => {
  navMenu?.classList?.add("show-menu");
});

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
navClose?.addEventListener("click", () => {
  navMenu?.classList?.remove("show-menu");
});

/*===== GİTHUB PROJELERİ ÇEKME =====*/

// GitHub kullanıcı adınızı buraya yazın
const githubUsername = 'madtethys';
const personalAccessToken = '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'; // Buraya kendi token'ınızı ekleyin
const projelerimContainer = document.getElementById('projelerim-container');

// Maksimum açıklama uzunluğu
const maxDescriptionLength = 201; // Karakter sayısını buradan ayarlayın

// Proje adlarını güncellemek için eşleme nesnesi
const projectNameMapping = {
  'basit-yapilacaklar-listesi': 'Basit Yapılacaklar Listesi',
  'grafik-tasarimci-portfolyo': 'Grafik Tasarımcı Portfolyo',
  'havadurumu': 'Hava Durumu',
  'iphone-hesap-makinesi': 'iPhone Hesap Makinesi',
  'madtethysdb': 'MadTethys Database',
  'yapayzeka-araclari': 'Yapay Zeka Araçları',
  'reddit-api-rastgele-resim': 'Reddit API Rastgele Resim',
  'sayi-tahmin-oyunu': 'Sayı Tahmin Oyunu',
  'madtethys': 'MadTethys ReadMe',
  'spotify-son-dinlenenler': 'Spotify Son Dinlenen Müzikler',
  // Diğer projeleri buraya ekleyin
};

// Her proje için görsel URL'lerini içeren eşleme nesnesi
const projectImageMapping = {
  'grafik-tasarimci-portfolyo': 'https://mdusova.com/dosyalar/resimler/madgrafik.webp',
  'madtethysdb': 'https://mdusova.com/dosyalar/resimler/madtethysdb.webp',
  'yapayzeka-araclari': 'https://mdusova.com/dosyalar/resimler/yapayzeka.webp',
  'reddit-api-rastgele-resim': 'https://mdusova.com/dosyalar/resimler/redditapi.webp',
  'madtethys': 'https://mdusova.com/dosyalar/resimler/readme.webp',
  'spotify-son-dinlenenler': 'https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&width=300&count=4',
  // Diğer projeleri buraya ekleyin
};

const projectOrder = [
  'spotify-son-dinlenenler',
  'grafik-tasarimci-portfolyo',
  'madtethysdb',
  'reddit-api-rastgele-resim',
  'yapayzeka-araclari',
  'madtethys',
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
            <img src="${projectImage}" style="border-radius:10px" alt="${projectName}" class="projelerim__img" />
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


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document?.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document?.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu?.classList?.remove("show-menu");
};
navLink?.forEach((n) => n?.addEventListener("click", linkAction));
/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document?.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this?.scrollY >= 50
    ? header?.classList.add("shadow-header")
    : header?.classList.remove("shadow-header");
};
window?.addEventListener("scroll", shadowHeader);
/*=============== EMAIL JS ===============*/
const iletisimForm = document?.getElementById("iletisim-form");
const iletisimMessage = document?.getElementById("iletisim-message");
const btnSendMessage = document?.getElementById("iletisim-button");

const sendEmail = (e) => {
  e?.preventDefault();
  btnSendMessage.innerHTML = "<i class='ri-send-plane-line'></i> Sending...";
  btnSendMessage.disabled = true;
  // service id, template id, form, public key
  emailjs
    ?.sendForm(
      "service_jc9nd2h",
      "template_jiin5n5",
      iletisimForm,
      "bJGLfO20ad8dY_bas"
    )
    ?.then(
      (result) => {
        iletisimMessage.innerHTML = "Message sent successfully ✅";

        setTimeout(() => {
          iletisimMessage.innerHTML = "";
        }, 5000);

        // reset form
        iletisimForm?.reset();

        btnSendMessage.innerHTML =
          "<i class='ri-send-plane-line'></i> Send Message";

        btnSendMessage.disabled = false;
      },
      (error) => {
        iletisimMessage.innerHTML = "Message not sent (service error) ❌";

        setTimeout(() => {
          iletisimMessage.innerHTML = "";
        }, 5000);

        btnSendMessage.innerHTML =
          "<i class='ri-send-plane-line'></i> Send Message";

        btnSendMessage.disabled = false;
      }
    );
};

iletisimForm.addEventListener("submit", sendEmail);

/*=============== SHOW scroll UP ===============*/
const scrollUp = () => {
  const scrollUp = document?.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this?.scrollY >= 350
    ? scrollUp?.classList?.add("show-scroll")
    : scrollUp?.classList?.remove("show-scroll");
};

window?.addEventListener("scroll", scrollUp);

/*=============== scroll SECTIONS ACTIVE LINK ===============*/
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

/*=============== DARK LIGHT THEME ===============*/
// get current theme of browser
const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)");
const themeButton = document?.getElementById("theme-button");

const darkTheme = () => {
  // Add or remove the dark / icon theme
  document?.body?.classList?.add("dark-theme");
  themeButton?.classList?.add("ri-moon-line");
  themeButton?.classList?.remove("ri-sun-line");
};

const lightTheme = () => {
  // Add or remove the dark / icon theme
  document?.body?.classList?.remove("dark-theme");
  themeButton?.classList?.remove("ri-moon-line");
  themeButton?.classList?.add("ri-sun-line");
};

isDarkTheme?.matches ? darkTheme() : lightTheme();

// Detect the dark mode
isDarkTheme?.addEventListener("change", () => {
  isDarkTheme.matches ? darkTheme() : lightTheme();
});

// Activate / deactivate the theme manually with the button
themeButton?.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document?.body?.classList?.toggle("dark-theme");
  themeButton?.classList?.toggle("ri-moon-line");
  themeButton?.classList?.toggle("ri-sun-line");
});
/*=============== scroll REVEAL ANIMATION ===============*/
const sr = scrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 300,
  // reset: true, // to repeat animation
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
