// ============================================
// Javascript Website Profil - Arif Herfian
// ============================================

// ---------- NAVBAR, TOMBOL KE ATAS & SCROLL ----------
const navbar = document.getElementById("navbar");
const tombolKeAtas = document.getElementById("keAtas");
const tombolMenu = document.getElementById("tombolMenu");
const menu = document.getElementById("menu");

window.addEventListener("scroll", function () {
  // navbar dikasih background setelah discroll,
  // tombol ke atas muncul setelah scroll 400px
  navbar.classList.toggle("discroll", window.scrollY > 50);
  tombolKeAtas.classList.toggle("tampil", window.scrollY > 400);

  cekMuncul();
  menuAktif();
});

tombolKeAtas.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// buka tutup menu di tampilan hp
tombolMenu.addEventListener("click", function () {
  menu.classList.toggle("buka");
});

// menu otomatis nutup kalau salah satu link diklik
document.querySelectorAll(".menu a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("buka");
  });
});

// ---------- MODE GELAP / TERANG ----------
const tombolTema = document.getElementById("tombolTema");
const iconTema = tombolTema.querySelector("i");

// cek tema yang tersimpan di localStorage
if (localStorage.getItem("tema") === "gelap") {
  document.body.classList.add("gelap");
  iconTema.classList.replace("fa-moon", "fa-sun");
}

tombolTema.addEventListener("click", function () {
  const jadiGelap = document.body.classList.toggle("gelap");

  if (jadiGelap) {
    iconTema.classList.replace("fa-moon", "fa-sun");
  } else {
    iconTema.classList.replace("fa-sun", "fa-moon");
  }
  localStorage.setItem("tema", jadiGelap ? "gelap" : "terang");
});

// ---------- EFEK KETIK DI BERANDA ----------
const daftarProfesi = [
  "Guru Informatika",
  "Web Developer",
  "Pendidik Digital",
  "UI Designer"
];

const teksKetik = document.getElementById("teksKetik");
let indexProfesi = 0;
let indexHuruf = 0;
let sedangHapus = false;

function efekKetik() {
  const kata = daftarProfesi[indexProfesi];
  let jeda = sedangHapus ? 50 : 100;

  indexHuruf += sedangHapus ? -1 : 1;
  teksKetik.textContent = kata.substring(0, indexHuruf);

  if (!sedangHapus && indexHuruf === kata.length) {
    // kata sudah lengkap, tunggu sebentar lalu hapus
    sedangHapus = true;
    jeda = 1500;
  } else if (sedangHapus && indexHuruf === 0) {
    // pindah ke kata berikutnya
    sedangHapus = false;
    indexProfesi = (indexProfesi + 1) % daftarProfesi.length;
    jeda = 300;
  }

  setTimeout(efekKetik, jeda);
}

efekKetik();

// ---------- ANIMASI MUNCUL SAAT SCROLL ----------
const elemenMuncul = document.querySelectorAll(".muncul");

function cekMuncul() {
  elemenMuncul.forEach(function (el) {
    const posisi = el.getBoundingClientRect().top;

    if (posisi < window.innerHeight - 80) {
      el.classList.add("tampil");
    }
  });
}

// ---------- MENU AKTIF SESUAI SECTION ----------
const semuaSection = document.querySelectorAll("section[id]");

function menuAktif() {
  const posisiScroll = window.scrollY + 150;

  semuaSection.forEach(function (section) {
    const link = document.querySelector('.menu a[href="#' + section.id + '"]');
    const kelihatan =
      posisiScroll >= section.offsetTop &&
      posisiScroll < section.offsetTop + section.offsetHeight;

    if (link) {
      link.classList.toggle("aktif", kelihatan);
    }
  });
}

// jalankan sekali waktu halaman pertama kali dibuka
cekMuncul();
menuAktif();

// ---------- KIRIM PESAN LEWAT WHATSAPP ----------
function kirimWA() {
  const nama = document.getElementById("namaPengirim").value.trim();
  const email = document.getElementById("emailPengirim").value.trim();
  const pesan = document.getElementById("isiPesan").value.trim();

  // validasi sederhana
  if (nama === "" || pesan === "") {
    alert("Mohon isi nama dan pesan terlebih dahulu!");
    return;
  }

  let isiTeks = "Halo Arif! Saya " + nama;
  if (email !== "") {
    isiTeks += " (" + email + ")";
  }
  isiTeks += "\n\n" + pesan;

  window.open("https://wa.me/6285790226536?text=" + encodeURIComponent(isiTeks), "_blank");
}
