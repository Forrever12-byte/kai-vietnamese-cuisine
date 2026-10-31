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
]


const categoryTabs = document.getElementById("categoryTabs");
const categoryDescription = document.getElementById("categoryDescription");

const categoryHeading = document.getElementById("categoryHeading");

const categoryLine = document.getElementById("categoryLine");

const menuGrid = document.getElementById("menu-grid");

function renderMenu() {

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