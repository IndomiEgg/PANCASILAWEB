const garuda = document.getElementById("garudaContainer");

garuda.addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ripple.style.left = `${x - 50}px`;
  ripple.style.top = `${y - 50}px`;

  this.appendChild(ripple);

  setTimeout(() => {
    document.getElementById("sejarah").scrollIntoView({
      behavior: "smooth",
    });
  }, 300);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

document
  .querySelector(".scroll-indicator")
  .addEventListener("click", function () {
    document.getElementById("sejarah").scrollIntoView({
      behavior: "smooth",
    });
  });

function animateOnScroll() {
  const cards = document.querySelectorAll(".sila-card");
  const windowHeight = window.innerHeight;

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < windowHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

document.querySelectorAll(".sila-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";
});

function checkImageLoad() {
  const silaSymbols = document.querySelectorAll(".sila-symbol");
  silaSymbols.forEach((symbol) => {
    const computedStyle = window.getComputedStyle(symbol);
    const bgImage = computedStyle.backgroundImage;

    if (bgImage === "none" || bgImage === "") {
      symbol.style.fontSize = "4rem";
      symbol.innerHTML = symbol.getAttribute("data-emoji");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
  animateOnScroll();
  checkImageLoad();
});

// Hapus event lama yang membuka tab baru
// Sila card click for modal (replace open new tab behavior)
document.querySelectorAll(".sila-card").forEach((card) => {
  card.replaceWith(card.cloneNode(true)); // Remove all old listeners
});
const silaCardsModal = document.querySelectorAll(".sila-card");
silaCardsModal.forEach((card) => {
  card.addEventListener("click", function (e) {
    e.stopPropagation();
    const silaNumber = parseInt(this.getAttribute("data-sila"));
    if (silaInfo[silaNumber]) {
      createSilaModal(
        silaNumber,
        silaInfo[silaNumber].title,
        silaInfo[silaNumber].desc
      );
    }
  });
});

function setupVideoPlayer() {
  const video = document.getElementById("sejarahVideo");

  if (video) {
    video.muted = false;

    video.addEventListener("error", function () {
      const videoContainer = document.querySelector(".video-container");
      videoContainer.innerHTML = `
                <div style="width: 100%; height: 350px; background: linear-gradient(45deg, #ff0000, #ffffff); display: flex; align-items: center; justify-content: center; color: #333; font-size: 1.2rem; text-align: center; border-radius: 15px;">
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🎥</div>
                        <p>Video Sejarah Pancasila</p>
                    </div>
                </div>
            `;
    });
  }
}

window.addEventListener("load", setupVideoPlayer);

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("load", updateActiveNav);
}

const navbarLinks = document.querySelectorAll(".nav-link");

navbarLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const sectionId = this.getAttribute("href");
    if (sectionId.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      // Close mobile nav if open
      const navMenu = document.getElementById("navMenu");
      const navToggle = document.getElementById("navToggle");
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
});

window.addEventListener("load", initNavbar);

// Modal Sila Card
function createSilaModal(silaNumber, silaTitle, silaDesc) {
  // Remove existing modal if any
  const existing = document.getElementById("silaModal");
  if (existing) existing.remove();

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "silaModal";
  overlay.className = "sila-modal-overlay";
  overlay.innerHTML = `
    <div class="sila-modal-card sila-modal-anim">
      <button class="sila-modal-close">&times;</button>
      <h2>${silaTitle}</h2>
      <p>${silaDesc}</p>
    </div>
  `;
  document.body.appendChild(overlay);

  // Blur background
  document.body.classList.add("modal-blur");

  // Close handler
  overlay.querySelector(".sila-modal-close").onclick = function () {
    overlay.classList.remove("sila-modal-anim");
    overlay.classList.add("sila-modal-close-anim");
    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("modal-blur");
    }, 300);
  };
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.querySelector(".sila-modal-close").click();
    }
  });
}

const silaInfo = [
  null,
  {
    title: "Sila 1: Ketuhanan Yang Maha Esa",
    desc: `Makna sila ini adalah pengakuan bahwa Tuhan merupakan sumber kehidupan dan kekuasaan tertinggi. Pancasila menempatkan nilai-nilai spiritual dan keimanan sebagai dasar kehidupan berbangsa dan bernegara.

Negara Indonesia bukan negara sekuler yang memisahkan agama dari negara, tetapi juga bukan negara teokrasi yang hanya berdasarkan satu agama. Negara menjamin kebebasan beragama dan beribadah, namun tidak membenarkan atheisme atau penistaan terhadap agama.

Implikasinya, negara menghormati semua agama dan menjamin hak umat beragama untuk menjalankan ibadahnya. Hal ini tercermin dalam Undang-Undang Dasar 1945 Pasal 29 Ayat 1 dan 2. Lembaga-lembaga seperti Kementerian Agama, pendidikan agama di sekolah, serta peringatan hari besar keagamaan adalah bentuk nyata penerapan sila ini.

Nilai-nilai yang terkandung: toleransi antarumat beragama, kebebasan beribadah, serta tidak memaksakan agama tertentu kepada orang lain.`,
  },
  {
    title: "Sila 2: Kemanusiaan yang Adil dan Beradab",
    desc: `Sila ini mengandung makna bahwa setiap manusia memiliki derajat, hak, dan kewajiban yang sama tanpa diskriminasi. "Adil" berarti memperlakukan sesuai dengan hak dan tanggung jawabnya, sedangkan "beradab" berarti menjunjung tinggi nilai moral, etika, dan kebudayaan.

Dalam penerapannya, negara wajib menjunjung tinggi Hak Asasi Manusia (HAM), menolak penindasan, perbudakan, kekerasan, dan diskriminasi. Pelanggaran hukum dan HAM dianggap bertentangan dengan sila ini.

Pendidikan sejak dini harus menanamkan nilai empati, rasa hormat, dan toleransi. Masyarakat didorong untuk bersikap sopan santun, saling menghargai, dan menghindari konflik sosial.

Nilai-nilai utamanya: keadilan sosial dan hukum, penghormatan terhadap martabat manusia, serta budaya etika dan sopan santun.`,
  },
  {
    title: "Sila 3: Persatuan Indonesia",
    desc: `Sila ini mengajak seluruh rakyat Indonesia untuk mengutamakan kesatuan bangsa di atas kepentingan pribadi atau golongan. Persatuan yang dimaksud mencakup keberagaman suku, agama, ras, dan budaya dalam bingkai Bhinneka Tunggal Ika.

Negara mendorong semangat nasionalisme yang inklusif, bukan eksklusif atau radikal. Disintegrasi, separatisme, dan intoleransi adalah bentuk pengingkaran terhadap sila ini.

Dalam pendidikan, media, dan budaya, wawasan kebangsaan terus dikembangkan. Pemerintah juga wajib mendorong pembangunan yang merata agar tidak terjadi kecemburuan antardaerah.

Nilai utama: cinta tanah air, solidaritas nasional, dan toleransi terhadap keanekaragaman.`,
  },
  {
    title:
      "Sila 4: Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
    desc: `Sila ini menekankan sistem demokrasi Indonesia yang khas, yaitu demokrasi Pancasila. Keputusan diambil melalui musyawarah untuk mufakat, bukan sekadar suara terbanyak tanpa pertimbangan etika.

Rakyat memiliki kedaulatan melalui perwakilan seperti DPR dan MPR. Pemilu digunakan sebagai sarana demokratis untuk memilih pemimpin dan wakil rakyat. Musyawarah diprioritaskan dalam pengambilan kebijakan publik.

Kepemimpinan ideal menurut sila ini adalah yang bijaksana, adil, dan mendahulukan kepentingan umum, bukan kekuasaan pribadi atau kelompok.

Nilai-nilai utamanya: musyawarah untuk mufakat, kepemimpinan yang bijak, dan demokrasi yang beretika.`,
  },
  {
    title: "Sila 5: Keadilan Sosial bagi Seluruh Rakyat Indonesia",
    desc: `Sila ini bermakna bahwa negara harus menjamin keadilan di semua bidang: ekonomi, hukum, pendidikan, kesehatan, dan sosial. Keadilan tidak hanya berarti sama rata, tetapi memberikan sesuai kebutuhan dan memperlakukan secara adil.

Negara harus menolak sistem ekonomi yang kapitalistik maupun komunis ekstrem. Sumber daya alam digunakan sebesar-besarnya untuk kemakmuran rakyat, sebagaimana tercantum dalam Pasal 33 UUD 1945.

Pemerintah wajib memberantas kemiskinan, ketimpangan, pengangguran, dan ketidakadilan. Semua warga negara berhak mendapatkan layanan yang layak dan kesempatan yang setara.

Nilai-nilai utamanya: pemerataan, perlindungan terhadap yang lemah, keseimbangan antara hak dan kewajiban, serta penghapusan ketimpangan sosial.`,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const btnToSila = document.getElementById("btnToSila");
  if (btnToSila) {
    btnToSila.addEventListener("click", function () {
      const silaSection = document.getElementById("sila-section");
      if (silaSection) {
        silaSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Tombol dari section sila-sila ke section nilai-nilai
  const btnToNilai = document.createElement("button");
  btnToNilai.id = "btnToNilai";
  btnToNilai.textContent = "Lanjut ke Nilai-Nilai Pancasila ⬇";
  btnToNilai.style.padding = "0.8rem 2.2rem";
  btnToNilai.style.fontSize = "1.1rem";
  btnToNilai.style.background = "#ff0000";
  btnToNilai.style.color = "#fff";
  btnToNilai.style.border = "none";
  btnToNilai.style.borderRadius = "30px";
  btnToNilai.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
  btnToNilai.style.cursor = "pointer";
  btnToNilai.style.transition = "background 0.2s";
  btnToNilai.style.fontWeight = "bold";
  btnToNilai.style.letterSpacing = "1px";
  btnToNilai.style.margin = "2rem auto 0 auto";
  btnToNilai.style.display = "block";

  const silaSection = document.getElementById("sila-section");
  if (silaSection && !document.getElementById("btnToNilai")) {
    silaSection.appendChild(btnToNilai);
  }

  document.getElementById("btnToNilai")?.addEventListener("click", function () {
    const nilaiSection = document.getElementById("nilai-section");
    if (nilaiSection) {
      nilaiSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});
