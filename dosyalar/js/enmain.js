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
const githubUsername = 'madtethys';
const personalAccessToken = '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'; // Buraya kendi token'ınızı ekleyin
const projectsContainer = document.getElementById('projects-container');

// Maksimum açıklama uzunluğu
const maxDescriptionLength = 201; // Karakter sayısını buradan ayarlayın

// Proje adlarını güncellemek için eşleme nesnesi
const projectNameMapping = {
  'basit-yapilacaklar-listesi': 'Simple To Do List',
  'grafik-tasarimci-portfolyo': 'Graphic Designer Portfolio',
  'havadurumu': 'Weather Forecast',
  'iphone-hesap-makinesi': 'iPhone Calculator',
  'madtethysdb': 'MadTethys Database',
  'yapayzeka-araclari': 'Artificial Intelligence Tools',
  'reddit-api-rastgele-resim': 'Reddit API Random Image',
  'sayi-tahmin-oyunu': 'Number Guessing Game',
  'madtethys': 'MadTethys ReadMe',
  'spotify-son-dinlenenler': 'Spotify Recently Played Musics',
  // Diğer projeleri buraya ekleyin
};

// Proje açıklamaları için eşleme nesnesi
const projectDescriptionMapping = {
  'basit-yapilacaklar-listesi': 'This is a simple to-do list application where you can add, delete, and mark tasks as completed.',
  'grafik-tasarimci-portfolyo': 'A portfolio template designed for graphic designers to showcase their work.',
  'havadurumu': 'Weather forecasting app that provides real-time updates and detailed weather reports.',
  'iphone-hesap-makinesi': 'A clone of the iPhone calculator with basic functionalities like addition, subtraction, multiplication, and division.',
  'madtethysdb': 'A project focused on building a lightweight database.',
  'yapayzeka-araclari': 'A collection of artificial intelligence tools for various tasks such as image processing and text analysis.',
  'reddit-api-rastgele-resim': 'Fetch random images from Reddit using the Reddit API.',
  'sayi-tahmin-oyunu': 'A simple number guessing game where players attempt to guess the correct number.',
  'madtethys': 'The main repository for MadTethys, containing documentation and setup guides.',
  'spotify-son-dinlenenler': 'Displays your recently played tracks on Spotify.',
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
      projectCard.className = 'projects__card';

      // Açıklamayı kısıtlama
      const description = projectDescriptionMapping[repo.name] || 'No description available for this project.';
      const shortDescription = description.length > maxDescriptionLength ? 
        description.substring(0, maxDescriptionLength) + '...' : 
        description;

      // Proje ismini güncelleme
      const projectName = projectNameMapping[repo.name] || repo.name; // Eşleme yoksa eski ismi kullan
      const projectImage = projectImageMapping[repo.name] || 'https://via.placeholder.com/300'; // Görseli güncelle

      projectCard.innerHTML = `
        <a href="${repo.html_url}" target="_blank" class="projects__link">
          <div class="projects__image">
            <img src="${projectImage}" style="border-radius:10px; height:273px; width:300px;" alt="${projectName}" class="projects__img" />
            <a href="${repo.html_url}" target="_blank" class="projects__button button">
              <i class="ri-arrow-right-up-line"></i>
            </a>
          </div>
        </a>
        <div class="projects__content">
          <h3 class="projects__subtitle">GitHub Project</h3>
          <h2 class="projects__title">${projectName}</h2>
          <p class="projects__description">${shortDescription}</p>
        </div>
        <a href="${repo.html_url}" target="_blank" class="projects__demo button">
          <i class="ri-layout-6-line"></i> View Project
        </a>
      `;
      projectsContainer.appendChild(projectCard);
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


const contactForm = document?.getElementById("contact-form");
const contactMessage = document?.getElementById("contact-message");
const btnSendMessage = document?.getElementById("contact-button");

const sendEmail = (e) => {
  e?.preventDefault();
  btnSendMessage.innerHTML = "<i class='ri-send-plane-line'></i> Sending...";
  btnSendMessage.disabled = true;
  emailjs
    ?.sendForm(
      "service_6ucm1ji",
      "template_pe4eizl",
      contactForm,
      "XvUDYMGzr8Auvv-O9"
    )
    ?.then(
      (result) => {
        contactMessage.innerHTML = "Message sent successfully! ✅";

        setTimeout(() => {
          contactMessage.innerHTML = "";
        }, 5000);

        contactForm?.reset();

        btnSendMessage.innerHTML =
          "<i class='ri-send-plane-line'></i> Send Message";

        btnSendMessage.disabled = false;
      },
      (error) => {
        contactMessage.innerHTML = "Message could not be sent! (service error) ❌";

        setTimeout(() => {
          contactMessage.innerHTML = "";
        }, 5000);

        btnSendMessage.innerHTML =
          "<i class='ri-send-plane-line'></i> Send Message";

        btnSendMessage.disabled = false;
      }
    );
};

contactForm.addEventListener("submit", sendEmail);

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
  ".homepage__perfil, .about__image, .contact__mail, #experiences-box-right, #music-box-right",
  { origin: "right" }
);
sr?.reveal(
  ".homepage__name, .homepage__info, .about__container, .section__title-1, .about__info, .contact__social, .contact__data, #experiences-box-left, #music-box-left",
  { origin: "left" }
);
sr?.reveal(".projects__card, .section__title-2, .music__title-sub", {
  interval: 100,
});
