const navbar = document.getElementById("navbar");

if(navbar) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-kai-teal-dark')
        } else {
            navbar.classList.remove('bg-kai-teal-dark')
        }
    });
};

const heroSlider = document.getElementById("hero-slider");
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = document.getElementById("hero-dots");
const heroPrev = document.getElementById("hero-prev");
const heroNext = document.getElementById("hero-next");

if (heroSlider && heroSlides.length === 3 && heroDots && heroPrev && heroNext) {
    let activeHeroSlide = 0;
    let autoplayTimer;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showHeroSlide(index) {
        activeHeroSlide = (index + heroSlides.length) % heroSlides.length;

        heroSlides.forEach(function (slide, slideIndex) {
            const isActive = slideIndex === activeHeroSlide;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
            heroDots.children[slideIndex].setAttribute("aria-current", String(isActive));
        });
    }

    heroSlides.forEach(function (_, index) {
        const dot = document.createElement("button");
        dot.className = "hero-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Show featured image ${index + 1}`);
        dot.setAttribute("aria-current", String(index === 0));
        dot.addEventListener("click", function () {
            showHeroSlide(index);
            resetAutoplay();
        });
        heroDots.append(dot);
    });

    function stopAutoplay() {
        window.clearInterval(autoplayTimer);
    }

    function startAutoplay() {
        if (!prefersReducedMotion) {
            stopAutoplay();
            autoplayTimer = window.setInterval(function () {
                showHeroSlide(activeHeroSlide + 1);
            }, 5000);
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    heroPrev.addEventListener("click", function () {
        showHeroSlide(activeHeroSlide - 1);
        resetAutoplay();
    });

    heroNext.addEventListener("click", function () {
        showHeroSlide(activeHeroSlide + 1);
        resetAutoplay();
    });

    heroSlider.addEventListener("mouseenter", stopAutoplay);
    heroSlider.addEventListener("mouseleave", startAutoplay);
    heroSlider.addEventListener("focusin", stopAutoplay);
    heroSlider.addEventListener("focusout", function (event) {
        if (!heroSlider.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });

    startAutoplay();
}

const hamburger = document.getElementById("hamburger");
const bar1 = document.getElementById("bar-1");
const bar2 = document.getElementById("bar-2");
const bar3 = document.getElementById("bar-3");

const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener('click', function () {

    bar1.classList.toggle('-rotate-45');
    bar1.classList.toggle('mt-2');
    bar2.classList.toggle('hidden');
    bar3.classList.toggle('rotate-45');
    bar3.classList.toggle('mb-2');

    mobileMenu.classList.toggle('hidden');
});


const favCard = document.querySelectorAll(".fav-card");
const favDots = document.getElementById("fav-dots");
const favRow = document.getElementById("fav-row");

for(let i = 0; i < favCard.length; i++) {
    const swipeDot = document.createElement("span");
    swipeDot.className = "dot";
    
    if (i === 0) swipeDot.classList.add("active");

    favDots.append(swipeDot);
};

const step = favCard[1].offsetLeft - favCard[0].offsetLeft;

const dots = document.querySelectorAll(".dot");

favRow.addEventListener("scroll", function () {

    let index = Math.round(favRow.scrollLeft / step);

    if (favRow.scrollLeft + favRow.clientWidth >= favRow.scrollWidth - 2) {
        index = favCard.length - 1;
    };

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    dots[index].classList.add("active");

});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll("main > section").forEach(function (section) {
        section.classList.add("reveal-on-scroll");
        sectionObserver.observe(section);
    });
}

const menu = [
  // APPETIZERS
  { name: "A1. Vietnamese Egg Rolls", nativeName: "Chả Giò", description: "2 crispy rolls filled with pork, wood ear mushroom, carrots, onions and glass noodles. Served with fish sauce.", price: 5, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701974/Vietnamese_Egg_Rolls_n9hgam.avif" },
  { name: "A2. Dumplings (Fried/Steamed)", nativeName: "Há Cảo Chiên/Hấp", description: "8 pork and chive dumplings, steamed or crispy fried.", price: 8, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701971/Dumplings_aj5vj9.jpg" },
  { name: "A7. Phu Quoc Wings", nativeName: "Cánh Gà Chiên Nước Mắm", description: "8 lightly battered wings tossed in Vietnamese fish sauce.", price: 13, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701974/Phu_Quoc_Wings_l5pm9y.jpg" },
  { name: "A8. Beurre Chicken Wings", nativeName: "Cánh Gà Chiên Bơ Pháp", description: "8 lightly battered wings tossed in garlic and French butter.", price: 13, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701970/Beurre_Chicken_Wings_jyomdq.jpg" },
  { name: "A9. Flank Steak on Skewers", nativeName: "Bò Xiên Cây", description: "2 skewers.", price: 9, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701972/Flank_Steak_on_Skewers_crkutm.jpg" },
  { name: "A10. Chicken Teriyaki on Skewers", nativeName: "Gà Xiên Cây", description: "2 skewers.", price: 8, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701971/Chicken_Teriyaki_on_Skewers_uffemz.jpg" },
  { name: "A12. Lotus Salad", nativeName: "Gỏi Ngó Sen", description: "Pickled lotus stem with pork, shrimp, herbs and jalapeno. Served with shrimp crackers and fish sauce.", price: 16, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701972/Lotus_Salad_c1dubr.jpg" },
  { name: "A13. Nha Trang Calamari", nativeName: "Mực Rang Muối Nha Trang", description: "Lightly fried calamari with lettuce, shrimp chips, scallions, jalapeno, sea salt and pepper.", price: 15, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701973/Nha_Trang_Calamari_iyvdzx.jpg" },
  { name: "A15. Crab Rangoon", nativeName: "Wonton Pho Mai", description: "6 wontons filled with cream cheese and imitation crab. Served with sweet and sour sauce.", price: 8, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701971/Crab_Rangoon_ts0kfj.jpg" },
  { name: "A16. Veggie Eggrolls", nativeName: "Cha Gio Rau Cai", description: "2 rolls filled with cabbage, carrots and celery. Served with sweet and sour sauce.", price: 5, category: "appetizers", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793701972/images_qwyzzp.jpg" },

  // SPRING ROLLS (2 rolls each)
  { name: "A3. Shrimp & Pork", nativeName: "Tôm & Thịt", description: "", price: 6, category: "springRolls", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793704291/Shrimp_Pork_rczx8s.webp" },
  { name: "A4. Lemongrass Steak", nativeName: "Bò Nướng Sả", description: "", price: 6, category: "springRolls", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793704289/Lemongrass_Steak_rkmrdr.jpg" },
  { name: "A5. Lemongrass Pork", nativeName: "Heo Nướng Sả", description: "", price: 6, category: "springRolls", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793704289/Lemongrass_Pork_ltwz2j.jpg" },
  { name: "A6. Grilled Pork", nativeName: "Nem Nướng", description: "", price: 7, category: "springRolls", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793704288/Grilled_Pork_qn3cua.jpg" },
  { name: "A17. Chicken Spring Rolls", nativeName: "Ga Cuon", description: "Steamed or grilled.", price: 6, category: "springRolls", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793704288/Chicken_Spring_Rolls_xq7ziv.jpg" },

  // BAO (3 buns each)
  { name: "B1. BBQ Pork", nativeName: "Xá Xíu", description: "", price: 11, category: "bao", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793705432/BAO_BBQ_Pork_fm1yri.jpg" },
  { name: "B2. Pork Belly", nativeName: "Ba Rọi", description: "", price: 11, category: "bao", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793705434/BAO_PORK_BELLY_lvrmov.jpg" },
  { name: "B3. Chicken", nativeName: "Gà", description: "", price: 11, category: "bao", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793705433/BAO_Chicken_h2qzc0.jpg" },
  { name: "B4. Grilled Shrimp", nativeName: "Tôm", description: "", price: 11, category: "bao", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793705434/BAO_Grilled_Shrimp_hvraqb.jpg" },
  { name: "Fried Shrimp", nativeName: "Tom", description: "Topped with house spicy mayo.", price: 12, category: "bao", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793705434/BAO_Fried_Shrimp_aqugkb.jpg" },
  { name: "B5. Create Your Own", nativeName: "Tự chọn", description: "Pick 3 from the list. Add $1 for fried shrimp.", price: 12, category: "bao", img: "" },

  // BÁNH MÌ
  { name: "B6. Grilled Chicken", nativeName: "Gà Nướng", description: "", price: 10, category: "banhMi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793706201/B%C3%81NH_M%C3%8C_Grilled_Chicken_qq6emf.jpg" },
  { name: "B7. BBQ Pork", nativeName: "Xá Xíu", description: "", price: 10, category: "banhMi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793706191/B%C3%81NH_M%C3%8C_BBQ_Pork_jfrkgp.jpg" },
  { name: "B8. Lemongrass Beef", nativeName: "Bò Nướng Sả", description: "", price: 10, category: "banhMi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793706203/B%C3%81NH_M%C3%8C_Lemon_Grass_Beef_nleuhg.jpg" },
  { name: "B9. Lemongrass Pork", nativeName: "Heo Nướng Sả", description: "", price: 10, category: "banhMi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793706193/B%C3%81NH_M%C3%8C_Lemongrass_Pork_gyd3js.jpg" },
  { name: "B10. Pork Belly", nativeName: "Ba Rọi", description: "", price: 11, category: "banhMi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793706199/B%C3%81NH_M%C3%8C_Pork_Belly_egsldi.jpg" },
  { name: "B11. Grilled Shrimp", nativeName: "Tôm Nướng", description: "", price: 11, category: "banhMi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793706193/B%C3%81NH_M%C3%8C_Grilled_Shrimp_jyexcc.webp" },
  { name: "B12. Mushroom", nativeName: "Nấm Hương Nướng", description: "", price: 10, category: "banhMi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793706196/B%C3%81NH_M%C3%8C_Mushrrom_hwsfqd.jpg" },

  // BÚN CHẢ GIÒ
  { name: "D1. Pork Meatballs", nativeName: "Chả Viên", description: "", price: 15, category: "bun", img: "" },
  { name: "D2. Lemongrass Beef", nativeName: "Bò Xào Sả", description: "", price: 15, category: "bun", img: "" },
  { name: "D3. Lemongrass Pork", nativeName: "Heo Xào Sả", description: "", price: 15, category: "bun", img: "" },
  { name: "D4. Chicken Stir-fry", nativeName: "Gà Xào", description: "", price: 15, category: "bun", img: "" },
  { name: "D5. Grilled Shrimp", nativeName: "Tôm Nướng", description: "", price: 16, category: "bun", img: "" },
  { name: "D6. Create Your Own Bun", nativeName: "Tu chon", description: "Pick 2 meats.", price: 17, category: "bun", img: "" },
  { name: "D7. Huế Style Noodle Soup", nativeName: "Bún Bò Huế", description: "Traditional spicy beef and pork noodle soup with bean sprouts and fresh herbs.", price: 16, category: "bun", img: "" },

  // CƠM
  { name: "C1. Grilled Pork & Fried Eggs", nativeName: "Sườn Nướng & ốp la", description: "", price: 15, category: "com", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334276/Grilled_Pork_Fried_Eggs_brq0jy.webp" },
  { name: "C2. Grilled Chicken & Fried Eggs", nativeName: "Gà Nướng & ốp la", description: "", price: 15, category: "com", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334274/Grilled_Chicken_Fried_Egg_vgveur.jpg" },
  { name: "C3. Lemongrass Beef", nativeName: "Bò Nướng Sả", description: "", price: 15, category: "com", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334277/Lemongrass_Beef_vuoebv.jpg" },
  { name: "C4. Lemongrass Pork", nativeName: "Heo Nướng Sả", description: "", price: 15, category: "com", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334278/Lemongrass_Pork_yqtlw1.jpg" },
  { name: "C5. Shaken Ribeyes", nativeName: "Bò Lúc Lắc", description: "Ribeye cubes sautéed with onion, bell peppers, jalapeno and tomato in garlic ginger soy sauce.", price: 20, category: "com", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334282/Shaken_Ribeyes_bjecne.jpg" },

  // CƠM CHIÊN
  { name: "C6. Chicken", nativeName: "Gà", description: "", price: 12, category: "comChien", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334272/Chicken_dzo9xf.webp" },
  { name: "C7. Pork", nativeName: "Heo", description: "", price: 12, category: "comChien", img: "" },
  { name: "C8. Beef", nativeName: "Bò", description: "", price: 13, category: "comChien", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334268/Beef_llcb6w.jpg" },
  { name: "C9. Shrimp", nativeName: "Tôm", description: "", price: 14, category: "comChien", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334283/Shrimp_xfspgw.jpg" },
  { name: "C10. Kai Special", nativeName: "Cơm Chiên Dương Châu", description: "Combination of all meats and Chinese sausage.", price: 16, category: "comChien", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334276/Kai_Special_lrb61d.jpg" },

  // KAI’S PHỞ
  { name: "P1. Deluxe Phở", nativeName: "Phở Đặc Biệt", description: "Eye round and brisket steak with meatballs.", price: 17, category: "pho", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793140709/bowl_of_pho_khghi5.jpg" },
  { name: "P2. Eye Round Steak", nativeName: "Phở Tái", description: "", price: 15, category: "pho", img: "" },
  { name: "P3. Brisket Steak", nativeName: "Phở Chín", description: "", price: 15, category: "pho", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334270/Brisket_Steak_yewx8k.jpg" },
  { name: "P4. Meatballs", nativeName: "Phở Bò Viên", description: "", price: 15, category: "pho", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334280/Meatballs_y1qb5i.webp" },
  { name: "P5. Phở Satế", nativeName: "Phở Satế", description: "Creamy, spicy beef broth with wide rice noodles, eye round steak, tomato, cucumbers, onions and peanuts.", price: 16, category: "pho", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334281/Ph%E1%BB%9F_Sat%E1%BA%BF_bmrrva.jpg" },
  { name: "P6. Chicken Noodle Soup", nativeName: "Phở Gà", description: "Chicken broth rice noodle soup with white meat chicken, green onion, fried onion, fried garlic and lettuce.", price: 15, category: "pho", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334271/Chicken_Noodle_Soup_m7h6hc.jpg" },

  // MÌ
  { name: "M1. Wonton", nativeName: "Hoành Thánh", description: "Pork-filled wontons and BBQ pork.", price: 15, category: "mi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334261/M%C3%8C_zqjhxb.webp" },
  { name: "M2. Chicken", nativeName: "Gà", description: "", price: 15, category: "mi", img: "" },
  { name: "M3. Seafood", nativeName: "Hải Sản", description: "Shrimp, calamari and fishcakes.", price: 16, category: "mi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334261/Seafood_vybyts.jpg" },
  { name: "M4. Deluxe", nativeName: "Thập Cẩm", description: "Pork, shrimp, calamari, fishcakes and fried wonton.", price: 16, category: "mi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334261/Deluxe_jr5qif.jpg" },
  { name: "M5. House Dry Noodle Soup", nativeName: "Mì Khô Thập Cẩm", description: "", price: 16, category: "mi", img: "" },
  { name: "M6. Duck Soup", nativeName: "Vịt Tiềm", description: "Duck broth soup with a whole duck leg quarter, egg noodles, mushrooms, yu choy, fried onion, green onions and fried garlic.", price: 18, category: "mi", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334260/Duck_Soup_rdi88f.jpg" },

  // HỦ TIẾU
  { name: "H1. Seafood Hủ Tiếu", nativeName: "Hải Sản", description: "Shrimp, calamari and fishcakes.", price: 16, category: "huTieu", img: "" },
  { name: "H2. Deluxe", nativeName: "Thập Cẩm Hải Sản", description: "Pork, shrimp, calamari, fishcakes, quail eggs and fried wonton.", price: 16, category: "huTieu", img: "" },
  { name: "H3. Nam Vang Dry Noodle", nativeName: "Hủ Tiếu Khô Thap cam", description: "", price: 16, category: "huTieu", img: "" },

  // MÓN XÀO
  { name: "X1. Egg Noodles", nativeName: "Mì Xào", description: "Stir-fried egg noodles with vegetables, shrimp, pork, chicken and beef in garlic ginger sauce.", price: 17, category: "xao", img: "" },
  { name: "X2. Pan Fried Noodles", nativeName: "Mì Xào Giòn", description: "Crispy pan-fried egg noodles with vegetables, shrimp, pork, chicken and beef in garlic ginger sauce.", price: 17, category: "xao", img: "" },
  { name: "X3. Flat Rice Noodle", nativeName: "Phở Xào", description: "Stir-fried flat rice noodles with vegetables, shrimp, pork, chicken and beef in hoisin oyster sauce.", price: 17, category: "xao", img: "" },
  { name: "X4. Orange Beef", nativeName: "Bò Xào Cam", description: "Lightly battered steak tossed with sweet spicy pepper and orange peel on steamed broccoli. Served with steamed or fried rice.", price: 16, category: "xao", img: "" },
  { name: "X5. Orange Chicken", nativeName: "Ga Xao Cam", description: "Lightly battered chicken tossed with sweet spicy pepper and orange peel on steamed broccoli. Served with steamed or fried rice.", price: 15, category: "xao", img: "" },
  { name: "X6. Broccoli Chicken", nativeName: "Gà Xào Bông Cải", description: "Stir-fried chicken with broccoli, carrots and mushrooms. Served with steamed or fried rice.", price: 15, category: "xao", img: "" },
  { name: "X7. Broccoli Beef", nativeName: "Bò Xào Bông Cải", description: "Stir-fried beef with broccoli, carrots and mushrooms. Served with steamed or fried rice.", price: 16, category: "xao", img: "" },
  { name: "X8. Stir-Fried Dry Egg Noodles", nativeName: "Mì Xào Khô", description: "Dry egg noodles stir-fried with vegetables, shrimp, pork, chicken and beef. No sauce.", price: 17, category: "xao", img: "" },
  { name: "X9. Lo-mein", nativeName: "Mi Xao Trung Hao", description: "Stir-fried lo mein noodles with vegetables, shrimp, pork, chicken and beef.", price: 17, category: "xao", img: "" },
  { name: "X10. Garlic Shrimp", nativeName: "Tom Xao Rau Cai voi Sot Toi", description: "Stir-fried shrimp with vegetables in garlic sauce. Served with steamed or fried rice.", price: 17, category: "xao", img: "" },
  { name: "X11. Orange Shrimp", nativeName: "Tom Xao Cam", description: "Lightly battered shrimp tossed with sweet spicy pepper and orange peel on steamed broccoli. Served with steamed or fried rice.", price: 17, category: "xao", img: "" },
  { name: "X12. Pepper Steak", nativeName: "Bo Xao ot chuong", description: "Stir-fried steak with bell pepper, carrots and onion. Served with steamed or fried rice.", price: 16, category: "xao", img: "" },

  // THỨC ĂN CHAY
  { name: "V1. Summer Roll Tofu", nativeName: "Gỏi Cuốn Đậu Hủ", description: "2 rolls with fried tofu, lettuce, cilantro, basil, bean sprouts, cucumber and rice noodle. Served with peanut sauce.", price: 6, category: "chay", img: "" },
  { name: "V2. Vegetarian Dumplings", nativeName: "Há Cảo Chay Chiên/Hấp", description: "8 dumplings filled with mixed vegetables, steamed or crispy fried.", price: 8, category: "chay", img: "" },
  { name: "V3. Dragon Delight", nativeName: "Rau Xào Ngũ Sắc", description: "Assorted vegetables and fried tofu stir-fried in vegetarian seasoning. Served with steamed or fried rice.", price: 14, category: "chay", img: "" },
  { name: "V4. Vermicelli with Tofu", nativeName: "Bún Đậu Hủ", description: "Vermicelli bowl with tofu, herbs, vegetables, peanuts, scallion and carrots. Choice of fish sauce, vegan fish sauce or sweet soy sauce.", price: 14, category: "chay", img: "" },
  { name: "V5. Stir-Fried Vegetarian Egg Noodle", nativeName: "Mì Xào Chay", description: "Stir-fried egg noodles with fried tofu and assorted vegetables.", price: 16, category: "chay", img: "" },
  { name: "V6. Stir-Fried Vegetarian Flat Rice Noodle", nativeName: "Phở Xào Chay", description: "Stir-fried rice noodles with tofu and assorted vegetables.", price: 16, category: "chay", img: "" },
  { name: "V7. Pan Fried Vegetarian Egg Noodle", nativeName: "Mì Xào Giòn Chay", description: "Crispy pan-fried noodles with tofu and assorted vegetables.", price: 16, category: "chay", img: "" },
  { name: "V8. Vegetarian Fried Rice", nativeName: "Cơm Chiên Rau Cải", description: "Fried rice with assorted vegetables and scrambled eggs.", price: 13, category: "chay", img: "" },
  { name: "V9. Vegetarian Lomein", nativeName: "Mì Lomein Chay", description: "Stir-fried lo mein noodles with assorted vegetables.", price: 16, category: "chay", img: "" },
  { name: "V10. Vegetarian Egg Noodle Soup", nativeName: "Mì Rau Cải", description: "Egg noodles with assorted vegetables and tofu in vegetarian broth.", price: 17, category: "chay", img: "" },
  { name: "V11. Vegetarian Rice Noodle Soup", nativeName: "Phở Rau Cải", description: "Rice noodles with assorted vegetables and tofu in vegetarian broth.", price: 15, category: "chay", img: "" },

  // DESSERT
  { name: "Custard Bun", nativeName: "", description: "4 sweet steamed buns with egg custard filling.", price: 8, category: "dessert", img: "" },

  // DRINKS
  { name: "U1. Soda", nativeName: "", description: "Coke, Diet Coke, Sprite, Pink Lemonade, Dr. Pepper, Diet Dr. Pepper, Club soda, Sweet Tea or Iced Tea. Free refills.", price: 3, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334293/Soda_nswog0.jpg" },
  { name: "U2. Vietnamese Milk Iced Coffee", nativeName: "", description: "", price: 6, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334298/Vietnamese_Milk_Iced_Coffee_zl18ou.jpg" },
  { name: "U3. Vietnamese Black Iced Coffee", nativeName: "", description: "", price: 5, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334297/Vietnamese_Black_Iced_Coffee_y3obka.jpg" },
  { name: "U4. Soya Milk", nativeName: "", description: "", price: 4, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334293/Soya_Milk_rxutdz.webp" },
  { name: "U5. Young Coconut", nativeName: "", description: "", price: 6, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334300/Young_Coconut_b7hxss.jpg" },
  { name: "U6. Fresh Lemonade", nativeName: "", description: "", price: 4, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334285/Fresh_Lemonade_keppb9.jpg" },
  { name: "U7. Passion Fruit Lemonade", nativeName: "", description: "", price: 4, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334290/Passion_Fruit_Lemonade_el0e0i.jpg" },
  { name: "U8. Winter Melon Tea", nativeName: "", description: "", price: 4, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334299/Winter_Melon_Tea_uc9xpu.jpg" },
  { name: "U9. Passion Fruit Tea", nativeName: "", description: "", price: 4, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334292/Passion_Fruit_Tea_lippbt.jpg" },
  { name: "U10. Thai Tea", nativeName: "", description: "", price: 5, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334296/Thai_Tea_yzpeil.jpg" },
  { name: "U11. Matcha Milk Tea", nativeName: "", description: "", price: 6, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334288/Matcha_Milk_Tea_rn8hfh.jpg" },
  { name: "U12. Golden Milk Tea", nativeName: "", description: "", price: 6, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334286/Golden_Milk_Tea_sqhdbc.jpg" },
  { name: "U13. Taro Milk Tea", nativeName: "", description: "", price: 6, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334295/Taro_Milk_Tea_jfhbbu.webp" },
  { name: "Milk Tea", nativeName: "", description: "Choice of regular boba, crystal boba, strawberry popping boba, coffee jelly, lychee jelly or mixed fruit jelly.", price: 6, category: "drinks", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1794334289/Milk_Tea_iceolu.jpg" }
];

const categoryInfo = {
  appetizers: { title: "Appetizers", line: "Starters to share." },
  springRolls: { title: "Spring Rolls", line: "Gỏi cuốn: 2 rice paper rolls with fresh herbs, served with peanut sauce." },
  bao: { title: "Bao", line: "Three steamed buns with pickled carrots, cucumber, cilantro and jalapeno." },
  banhMi: { title: "Bánh Mì", line: "6-inch baguettes with carrots, cilantro, cucumber, jalapeno and shrimp chips." },
  bun: { title: "Bún Chả Giò", line: "Vermicelli bowls with 2 egg rolls, fresh herbs and fish sauce." },
  com: { title: "Cơm", line: "Jasmine rice plates. Add a fried egg ($3) or shrimp ($4)." },
  comChien: { title: "Cơm Chiên", line: "Fried rice with bean sprouts, scallions and scrambled egg." },
  pho: { title: "Kai's Phở", line: "Beef broth simmered for hours, served with basil, cilantro, bean sprouts and lime." },
  mi: { title: "Mì", line: "Chicken broth with egg noodles and fresh herbs on the side." },
  huTieu: { title: "Hủ Tiếu", line: "Chicken broth with chewy glass noodles and fresh herbs on the side." },
  xao: { title: "Món Xào", line: "Stir-fried noodles and rice plates." },
  chay: { title: "Thức Ăn Chay", line: "Vegetarian dishes." },
  dessert: { title: "Dessert", line: "A sweet finish." },
  drinks: { title: "Drinks", line: "Coffee, tea, boba and more." }
};

const categoryTabs = document.getElementById("categoryTabs");
const categoryDescription = document.getElementById("categoryDescription");

const categoryHeading = document.getElementById("categoryHeading");

const categoryLine = document.getElementById("categoryLine");

const menuGrid = document.getElementById("menu-grid");

function renderMenu(category) {

    const dishes = menu.filter(function (dish) {
        return dish.category === category;
    });

    menuGrid.innerHTML = "";

    for(let i = 0; i < dishes.length; i++) {

        const dish = dishes[i];

        const imageHTML = dish.img
            ? `<img src="${dish.img}" alt="${dish.name}" class="w-full h-full object-cover">`: 
            `<div class="w-full h-full flex flex-col items-center justify-center gap-1 bg-kai-cream border border-dashed border-kai-ink/20">
                <span class="w-7 h-7 rounded-full bg-kai-gold"></span>
                <span class="text-[10px] text-kai-ink">Photo soon</span>
            </div>`;

        const menuCard = document.createElement("div");
        menuCard.className = "menu-card"

        menuCard.innerHTML = `
        <div class="img-div rounded-lg overflow-hidden shrink-0 w-[90px] h-[90px]">${imageHTML}</div>

        <div class="h-full font-body flex flex-col justify-between">
            <div class="flex flex-col gap-1">
                <div>
                    <div class="font-heading">${dish.name}</div>
                    <div class="text-sm text-kai-teal-dark">${dish.nativeName}</div>
                </div>

                <div class="text-xs">${dish.description}</div>
            </div>

            <div class="text-sm">$${dish.price}</div>

        </div>
        `;

        menuGrid.append(menuCard);
    };
}

const tabs = document.querySelectorAll("#categoryTabs [data-category]");

tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {
        const category = tab.dataset.category;

        renderMenu(category);

        tabs.forEach(function (t) {
            t.classList.remove("bg-kai-teal");
            t.classList.add("border");
        });

        tab.classList.remove("border");
        tab.classList.add("bg-kai-teal");

        categoryHeading.textContent = categoryInfo[category].title;
        categoryLine.textContent = categoryInfo[category].line;
    });
});

renderMenu("appetizers");