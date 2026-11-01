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

    mobileMenu.classList.toggle('opacity-0');
    mobileMenu.classList.toggle('pointer-events-none');
    mobileMenu.classList.toggle('opacity-100');
    mobileMenu.classList.toggle('pointer-events-auto');

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

const menu = [
    {name: "P1. Deluxe Phở", nativeName: "Phở Đặc Biệt", description: "Short description.", price: 17, category: "phở", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793140709/bowl_of_pho_khghi5.jpg"},
    {name: "P1. Deluxe Phở", nativeName: "Phở Đặc Biệt", description: "Short description.", price: 17, category: "phở", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793140709/bowl_of_pho_khghi5.jpg"},
    {name: "P1. Deluxe Phở", nativeName: "Phở Đặc Biệt", description: "Short description.", price: 17, category: "phở", img: "https://res.cloudinary.com/pnfbjbp5/image/upload/v1793140709/bowl_of_pho_khghi5.jpg"}
];

const categoryInfo = {
  appetizers: { title: "Appetizers", line: "One short line." },
  pho: { title: "Kai's Phở", line: "One short line." }
};

const categoryTabs = document.getElementById("categoryTabs");
const categoryDescription = document.getElementById("categoryDescription");

const categoryHeading = document.getElementById("categoryHeading");

const categoryLine = document.getElementById("categoryLine");

const tabs = document.querySelectorAll("#categoryTabs [data-category]");

tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {
        const category = tab.dataset.category;
        renderMenu(category);

        tabs.forEach(function (t) {
            t.classList.remove("bg-kai-teal");
            t.classList.add("bg-white");
        });

        tab.classList.remove("bg-white");
        tab.classList.add("bg-kai-teal");

        categoryHeading.textContent = categoryInfo[category].title;
        categoryLine.textContent = categoryInfo[category].line;
    });
});

const menuGrid = document.getElementById("menu-grid");

function renderMenu(category) {

    const dishes = menu.filter(function (dish) {
        return dish.category === category;
    });

    for(let i = 0; i < menu.length; i++) {

        const dish = menu[i];

        const menuCard = document.createElement("div");
        menuCard.className = "menu-card"

        menuCard.innerHTML = `
        <div class="w-30 rounded-lg overflow-hidden"><img src="${dish.img}" alt="${dish.name}"></div>

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

renderMenu()