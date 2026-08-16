/*==================================================
        PORTFOLIO SCRIPT - PART 1
==================================================*/

// ==============================
// SELECT ELEMENTS
// ==============================

const header = document.querySelector("header");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

// ==============================
// STICKY NAVBAR + BACK TO TOP
// ==============================

window.addEventListener("scroll", () => {

    // Sticky Navbar Effect
    if (window.scrollY > 60) {

        header.style.background = "rgba(5,10,20,.92)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";

    } else {

        header.style.background = "rgba(5,10,20,.65)";
        header.style.boxShadow = "none";

    }

    // Back To Top Button
    if (window.scrollY > 400) {

        backToTop.classList.add("active");

    } else {

        backToTop.classList.remove("active");

    }

});

// ==============================
// BACK TO TOP
// ==============================

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// ==============================
// SMOOTH SCROLL
// ==============================

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ==============================
// ACTIVE NAVIGATION
// ==============================

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ==============================
// SCROLL REVEAL
// ==============================

const revealElements = document.querySelectorAll(
`
.fade-up,
.fade-left,
.fade-right,
.zoom-in
`
);

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

// ==============================
// HOVER SCALE EFFECT
// ==============================

const cards = document.querySelectorAll(

`
.project-card,
.skill-card,
.about-card,
.exp-card,
.feature-card,
.highlight-card,
.achievement-card
`

);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".35s";

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// ==============================
// IMAGE PARALLAX EFFECT
// ==============================

const heroImage = document.querySelector(".hero-image-card img");

window.addEventListener("mousemove", (e) => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;

    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

// Reset Position

window.addEventListener("mouseleave", () => {

    if (!heroImage) return;

    heroImage.style.transform = "rotateY(0deg) rotateX(0deg)";

});

console.log("Portfolio Part 1 Loaded Successfully 🚀");

/*==================================================
        PORTFOLIO SCRIPT - PART 2A
==================================================*/

/*=========================================
        SKILL BAR ANIMATION
=========================================*/

const progressBars = document.querySelectorAll(".progress span");

const animateSkills = () => {

    progressBars.forEach((bar) => {

        const rect = bar.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100 && !bar.classList.contains("animated")) {

            bar.classList.add("animated");

            const finalWidth = bar.dataset.width;

            bar.style.width = "0%";

            setTimeout(() => {

                bar.style.transition = "width 2s ease";
                bar.style.width = finalWidth;

            }, 200);

        }

    });

};

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);


/*=========================================
        COUNTER ANIMATION
=========================================*/

const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {

    const target = Number(counter.dataset.target);

    let count = 0;

    const increment = target / 100;

    const update = () => {

        count += increment;

        if (count < target) {

            counter.innerText = Math.floor(count);

            requestAnimationFrame(update);

        } else {

            counter.innerText = target;

        }

    };

    update();

};

const counterObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

runCounter(entry.target);

counterObserver.unobserve(entry.target);

}

});

},

{

threshold:0.5

}

);

counters.forEach(counter=>{

counterObserver.observe(counter);

});


/*=========================================
        PROJECT CARD ANIMATION
=========================================*/

const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(

(entries)=>{

entries.forEach((entry,index)=>{

if(entry.isIntersecting){

setTimeout(()=>{

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

},index*150);

}

});

},

{

threshold:.2

}

);

projectCards.forEach(card=>{

card.style.opacity="0";
card.style.transform="translateY(60px)";
card.style.transition=".8s";

projectObserver.observe(card);

});


/*=========================================
        ACHIEVEMENT CARDS
=========================================*/

const achievementCards=document.querySelectorAll(".achievement-card");

achievementCards.forEach((card,index)=>{

card.style.opacity="0";
card.style.transform="scale(.8)";

const observer=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

setTimeout(()=>{

entry.target.style.opacity="1";
entry.target.style.transform="scale(1)";

},index*180);

}

});

},

{

threshold:.3

}

);

observer.observe(card);

});


/*=========================================
        IMAGE FADE
=========================================*/

const allImages = document.querySelectorAll("img");

allImages.forEach(image => {

    image.style.opacity = "0";

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.transition = "1s";
                    entry.target.style.opacity = "1";

                }

            });

        }
    );

    observer.observe(image);

});

/*=========================================
        SECTION TITLE ANIMATION
=========================================*/

const titles=document.querySelectorAll(".section-title");

titles.forEach(title=>{

title.style.opacity="0";
title.style.transform="translateY(40px)";

const observer=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";
entry.target.style.transition=".8s";

}

});

}

);

observer.observe(title);

});

console.log("Portfolio Part 2A Loaded ✅");

/*==================================================
        PORTFOLIO SCRIPT - PART 2B-1
==================================================*/

/*=========================================
        TYPING EFFECT
=========================================*/

const typingElement = document.querySelector(".typing");

const words = [
    "Computer Science & Business Systems Student",
    "TEDx Speaker",
    "TEDx Organizer",
    "Digital Marketer",
    "UI/UX Designer",
    "Entrepreneur",
    "Patent Holder",
    "Power BI Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect(){

    if(!typingElement) return;

    const currentWord = words[wordIndex];

    if(!deleting){

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if(charIndex > currentWord.length){

            deleting = true;

            setTimeout(typingEffect,1500);

            return;

        }

    }else{

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typingEffect, deleting ? 45 : 90);

}

typingEffect();

/*=========================================
        SCROLL PROGRESS BAR
=========================================*/

const progressBar = document.createElement("div");

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.width = "0%";
progressBar.style.background = "#00d9ff";
progressBar.style.zIndex = "99999";
progressBar.style.transition = ".15s";

document.body.appendChild(progressBar);

window.addEventListener("scroll",()=>{

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});

/*=========================================
        NAVBAR LINK HOVER EFFECT
=========================================*/

const links = document.querySelectorAll(".nav-links a");

links.forEach(link=>{

    link.addEventListener("mouseenter",()=>{

        link.style.transform="translateY(-3px)";

    });

    link.addEventListener("mouseleave",()=>{

        link.style.transform="translateY(0px)";

    });

});

/*=========================================
        BUTTON RIPPLE
=========================================*/

const buttons = document.querySelectorAll(
".primary-btn,.secondary-btn,.resume-btn"
);

buttons.forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const x=e.clientX-this.offsetLeft;

const y=e.clientY-this.offsetTop;

circle.style.left=x+"px";
circle.style.top=y+"px";

circle.classList.add("ripple");

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

/*=========================================
        SECTION FADE
=========================================*/

const fadeSections =
document.querySelectorAll("section");

const fadeObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

fadeSections.forEach(section=>{

fadeObserver.observe(section);

});

console.log("Portfolio Part 2B-1 Loaded 🚀");


/*=========================================
        HERO IMAGE PARALLAX
=========================================*/

const heroCard = document.querySelector(".hero-image-card");

window.addEventListener("mousemove",(e)=>{

    if(!heroCard) return;

    const x = (window.innerWidth/2-e.clientX)/35;
    const y = (window.innerHeight/2-e.clientY)/35;

    heroCard.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

});

window.addEventListener("mouseleave",()=>{

    if(heroCard){

        heroCard.style.transform =
        "rotateY(0deg) rotateX(0deg)";

    }

});

/*=========================================
        IMAGE HOVER ZOOM
=========================================*/

const images =
document.querySelectorAll(
".project-image img,.certificate img,.gallery img"
);

images.forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.08)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});


/*=========================================
        LOADING FINISH
=========================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

/*=========================================
        CONSOLE MESSAGE
=========================================*/

console.log(
"%cPortfolio Developed by Aameena Mehek 🚀",
"color:#00d9ff;font-size:18px;font-weight:bold;"
);

console.log(
"%cDesigned with HTML • CSS • JavaScript",
"color:white;font-size:14px;"
);

console.log("Portfolio Fully Loaded ✅");




/*=========================================
        EMAILJS CONTACT FORM
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    emailjs.init({
        publicKey: "A5mGQga_lI8yhC0zQ"
    });

    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        console.error("Contact form not found!");
        return;
    }

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();
        e.stopPropagation();

        const submitBtn = this.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
        }

        emailjs.sendForm(
            "service_7mnn5pu",
            "template_kdqk7d5",
            this
        )
        .then(() => {

            alert("✅ Message Sent Successfully!");

            contactForm.reset();

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
            }

        })
        .catch((error) => {

            console.error(error);

            alert("❌ Failed to send message.");

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
            }

        });

    });

});




 /* ==================================================
   MOBILE HAMBURGER MENU
   ================================================== */

const menu = document.getElementById("navLinks");
const button = document.getElementById("menuToggle");

if (menu && button) {

    button.addEventListener("click", function () {

        menu.classList.toggle("active");

        if (menu.classList.contains("active")) {
            button.innerHTML = "✕";
        } else {
            button.innerHTML = '<i class="ri-menu-3-line"></i>';
        }

    });

    menu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("active");
            button.innerHTML = '<i class="ri-menu-3-line"></i>';

        });

    });

}