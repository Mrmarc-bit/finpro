// ===============================
// PORTFOLIO SCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // GREETING
  // ===============================
  const greetingEl = document.getElementById("greeting");

  if (greetingEl) {
    const hour = new Date().getHours();

    const greetingText =
      hour >= 5 && hour <= 11
        ? "// Good Morning ☀️"
        : hour >= 12 && hour <= 16
        ? "// Good Afternoon 🌤"
        : hour >= 17 && hour <= 20
        ? "// Good Evening 🌆"
        : "// Good Night 🌙";

    greetingEl.textContent = greetingText;
  }


  // ===============================
  // TYPING EFFECT
  // ===============================
  const typingEl = document.getElementById("typing-text");

  if (typingEl) {

    const roles = [
      "Web Developer",
      "UI Designer",
      "Problem Solver",
      "Frontend Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

      const currentRole = roles[roleIndex];

      charIndex += isDeleting ? -1 : 1;

      typingEl.innerHTML =
        currentRole.slice(0, charIndex) +
        `<span class="cursor"></span>`;

      if (!isDeleting && charIndex === currentRole.length) {

        setTimeout(() => {
          isDeleting = true;
        }, 1500);

      } else if (isDeleting && charIndex === 0) {

        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;

      }

      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
  }


  // ===============================
  // AGE CALCULATION
  // ===============================
  const ageDisplay = document.getElementById("age-display");

  if (ageDisplay) {

    const birthDate = new Date("2005-08-17");
    const today = new Date();

    let age =
      today.getFullYear() - birthDate.getFullYear();

    const month =
      today.getMonth() - birthDate.getMonth();

    if (
      month < 0 ||
      (month === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    ageDisplay.textContent = age;
  }


  // ===============================
  // DARK MODE
  // ===============================
  const themeBtn = document.getElementById("theme-btn");
  const root = document.documentElement;

  if (themeBtn) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      root.setAttribute("data-theme", savedTheme);

      themeBtn.textContent =
        savedTheme === "dark" ? "☀️" : "🌙";
    }

    themeBtn.addEventListener("click", () => {

      const currentTheme =
        root.getAttribute("data-theme");

      const newTheme =
        currentTheme === "light"
          ? "dark"
          : "light";

      root.setAttribute("data-theme", newTheme);

      localStorage.setItem("theme", newTheme);

      themeBtn.textContent =
        newTheme === "dark" ? "☀️" : "🌙";
    });
  }


  // ===============================
  // TAB SYSTEM
  // ===============================
  const tabBtns =
    document.querySelectorAll(".tab-btn");

  const tabPanels =
    document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

      tabBtns.forEach((b) =>
        b.classList.remove("active")
      );

      tabPanels.forEach((panel) =>
        panel.classList.remove("active")
      );

      btn.classList.add("active");

      const target = btn.dataset.tab;

      const activePanel =
        document.getElementById(`tab-${target}`);

      if (activePanel) {
        activePanel.classList.add("active");
      }

    });

  });


  // ===============================
  // SKILL ANIMATION
  // ===============================
  const skills =
    document.querySelectorAll(".skill-item");

  const skillObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

          const skill = entry.target;

          const level =
            skill.getAttribute("data-level");

          const bar =
            skill.querySelector(".skill-fill");

          setTimeout(() => {
            bar.style.width = `${level}%`;
          }, index * 200);

          skillObserver.unobserve(skill);
        }

      });

    }, {
      threshold: 0.4
    });

  skills.forEach((skill) => {
    skillObserver.observe(skill);
  });


  // ===============================
  // PROJECT FILTER
  // ===============================
  const filterBtns =
    document.querySelectorAll(".filter-btn");

  const projectCards =
    document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

      const filter =
        btn.dataset.filter;

      filterBtns.forEach((b) =>
        b.classList.remove("active")
      );

      btn.classList.add("active");

      projectCards.forEach((card) => {

        const category =
          card.dataset.category;

        if (
          filter === "all" ||
          filter === category
        ) {

          card.style.display = "block";

          setTimeout(() => {
            card.style.opacity = "1";
          }, 10);

        } else {

          card.style.opacity = "0";

          setTimeout(() => {
            card.style.display = "none";
          }, 300);

        }

      });

    });

  });


  // ===============================
  // CONTACT FORM VALIDATION
  // ===============================
  const form =
    document.getElementById("contact-form");

  if (form) {

    form.addEventListener("submit", (e) => {

      e.preventDefault();

      const name =
        document.getElementById("name");

      const email =
        document.getElementById("email");

      const message =
        document.getElementById("message");

      const errName =
        document.getElementById("err-name");

      const errEmail =
        document.getElementById("err-email");

      const errMessage =
        document.getElementById("err-message");

      const success =
        document.getElementById("form-success");

      let valid = true;

      // RESET ERROR
      errName.textContent = "";
      errEmail.textContent = "";
      errMessage.textContent = "";

      // VALIDATION
      if (name.value.trim().length < 2) {
        errName.textContent =
          "Name must be at least 2 characters";
        valid = false;
      }

      if (
        !email.value.includes("@") ||
        !email.value.includes(".")
      ) {
        errEmail.textContent =
          "Please enter a valid email";
        valid = false;
      }

      if (message.value.trim().length < 10) {
        errMessage.textContent =
          "Message must be at least 10 characters";
        valid = false;
      }

      // SUCCESS
      if (valid) {

        const subject =
          "Message From Portfolio Website";

        const body =
          `Name: ${name.value}%0D%0A` +
          `Email: ${email.value}%0D%0A` +
          `Message: ${message.value}`;

        window.location.href =
          `mailto:muchlisinmaruf@gmail.com?subject=${subject}&body=${body}`;

        success.style.display = "block";

        setTimeout(() => {
          success.style.display = "none";
        }, 3000);

        form.reset();
      }

    });

  }


  // ===============================
// FETCH RANDOM QUOTE
// ===============================

const quoteText =
  document.getElementById("quote-text");

const quoteAuthor =
  document.getElementById("quote-author");

const newQuoteBtn =
  document.getElementById("new-quote-btn");

async function getQuote() {

  if (!quoteText || !quoteAuthor) return;

  try {

    quoteText.innerText =
      "Loading quote...";

    quoteAuthor.innerText = "";

    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    if (!response.ok) {
      throw new Error("Failed fetch");
    }

    const data = await response.json();

    quoteText.innerText =
      `"${data.quote}"`;

    quoteAuthor.innerText =
      `- ${data.author}`;

  } catch (error) {

    quoteText.innerText =
      "Failed to load quote.";

    quoteAuthor.innerText = "";

    console.error(error);
  }
}

if (newQuoteBtn) {
  newQuoteBtn.addEventListener(
    "click",
    getQuote
  );
}

getQuote();


  // ===============================
  // LIVE CLOCK
  // ===============================
  const clock =
    document.getElementById("clock");

  function updateClock() {

    if (!clock) return;

    const now = new Date();

    const time =
      now.toLocaleTimeString("id-ID");

    clock.textContent = time;
  }

  updateClock();

  setInterval(updateClock, 1000);


  // ===============================
  // ACTIVE NAVIGATION
  // ===============================
  const sections =
    document.querySelectorAll("section");

  const navLinks =
    document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      if (
        pageYOffset >= sectionTop - 200
      ) {
        current =
          section.getAttribute("id");
      }

    });

    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (
        link.getAttribute("href")
        .includes(current)
      ) {
        link.classList.add("active");
      }

    });

  });


  // ===============================
  // LOADER
  // ===============================
  window.addEventListener("load", () => {

    const loader =
      document.getElementById("loader");

    if (loader) {

      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);

    }

  });


  // ===============================
  // FOOTER YEAR
  // ===============================
  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});