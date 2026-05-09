// ======================================
// PORTFOLIO SCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", () => {

  // ======================================
  // ELEMENT SELECTORS
  // ======================================

  const root = document.documentElement;

  const greetingEl =
    document.getElementById("greeting");

  const typingEl =
    document.getElementById("typing-text");

  const ageDisplay =
    document.getElementById("age-display");

  const themeBtn =
    document.getElementById("theme-btn");

  const clock =
    document.getElementById("clock");

  const loader =
    document.getElementById("loader");

  const year =
    document.getElementById("year");

  // ======================================
  // GREETING
  // ======================================

  function updateGreeting() {

    if (!greetingEl) return;

    const hour = new Date().getHours();

    let greetingText =
      "// Good Night 🌙";

    if (hour >= 5 && hour <= 11) {
      greetingText =
        "// Good Morning ☀️";
    }

    else if (hour >= 12 && hour <= 16) {
      greetingText =
        "// Good Afternoon 🌤";
    }

    else if (hour >= 17 && hour <= 20) {
      greetingText =
        "// Good Evening 🌆";
    }

    greetingEl.textContent =
      greetingText;
  }

  updateGreeting();


  // ======================================
  // TYPING EFFECT
  // ======================================

  function initTypingEffect() {

    if (!typingEl) return;

    const roles = [
      "Web Developer",
      "Frontend Enthusiast",
      "UI Designer",
      "Problem Solver",
      "Laravel Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {

      const current =
        roles[roleIndex];

      charIndex +=
        isDeleting ? -1 : 1;

      typingEl.innerHTML =
        current.slice(0, charIndex) +
        `<span class="cursor"></span>`;

      if (
        !isDeleting &&
        charIndex === current.length
      ) {

        setTimeout(() => {
          isDeleting = true;
        }, 1500);

      }

      else if (
        isDeleting &&
        charIndex === 0
      ) {

        isDeleting = false;

        roleIndex =
          (roleIndex + 1) % roles.length;
      }

      setTimeout(
        type,
        isDeleting ? 50 : 100
      );
    }

    type();
  }

  initTypingEffect();


  // ======================================
  // AGE CALCULATION
  // ======================================

  function updateAge() {

    if (!ageDisplay) return;

    const birthDate =
      new Date("2005-08-17");

    const today =
      new Date();

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDiff =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (
        monthDiff === 0 &&
        today.getDate() <
        birthDate.getDate()
      )
    ) {
      age--;
    }

    ageDisplay.textContent =
      age;
  }

  updateAge();


  // ======================================
  // DARK MODE
  // ======================================

  function initTheme() {

    if (!themeBtn) return;

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme) {

      root.setAttribute(
        "data-theme",
        savedTheme
      );

      themeBtn.textContent =
        savedTheme === "dark"
          ? "☀️"
          : "🌙";
    }

    themeBtn.addEventListener(
      "click",
      () => {

        const currentTheme =
          root.getAttribute(
            "data-theme"
          );

        const newTheme =
          currentTheme === "light"
            ? "dark"
            : "light";

        root.setAttribute(
          "data-theme",
          newTheme
        );

        localStorage.setItem(
          "theme",
          newTheme
        );

        themeBtn.textContent =
          newTheme === "dark"
            ? "☀️"
            : "🌙";
      }
    );
  }

  initTheme();


  // ======================================
  // TAB SYSTEM
  // ======================================

  function initTabs() {

    const tabBtns =
      document.querySelectorAll(".tab-btn");

    const tabPanels =
      document.querySelectorAll(".tab-panel");

    tabBtns.forEach((btn) => {

      btn.addEventListener(
        "click",
        () => {

          tabBtns.forEach((b) =>
            b.classList.remove("active")
          );

          tabPanels.forEach((panel) =>
            panel.classList.remove("active")
          );

          btn.classList.add("active");

          const target =
            document.getElementById(
              `tab-${btn.dataset.tab}`
            );

          if (target) {
            target.classList.add("active");
          }
        }
      );

    });
  }

  initTabs();


  // ======================================
  // SKILL ANIMATION
  // ======================================

  function initSkillAnimation() {

    const skills =
      document.querySelectorAll(".skill-item");

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

              const skill =
                entry.target;

              const level =
                skill.dataset.level;

              const fill =
                skill.querySelector(".skill-fill");

              setTimeout(() => {

                fill.style.width =
                  `${level}%`;

              }, index * 150);

              observer.unobserve(skill);
            }

          });

        },
        {
          threshold: 0.3
        }
      );

    skills.forEach((skill) => {
      observer.observe(skill);
    });
  }

  initSkillAnimation();


  // ======================================
  // PROJECT FILTER
  // ======================================

  function initProjectFilter() {

    const filterBtns =
      document.querySelectorAll(".filter-btn");

    const projectCards =
      document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {

      btn.addEventListener(
        "click",
        () => {

          const filter =
            btn.dataset.filter;

          filterBtns.forEach((b) =>
            b.classList.remove("active")
          );

          btn.classList.add("active");

          projectCards.forEach((card) => {

            const category =
              card.dataset.category;

            const show =
              filter === "all" ||
              filter === category;

            card.style.display =
              show ? "block" : "none";
          });

        }
      );

    });
  }

  initProjectFilter();


  // ======================================
  // CONTACT FORM
  // ======================================

  function initContactForm() {

    const form =
      document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener(
      "submit",
      (e) => {

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

        errName.textContent = "";
        errEmail.textContent = "";
        errMessage.textContent = "";

        let valid = true;

        if (
          name.value.trim().length < 2
        ) {
          errName.textContent =
            "Minimum 2 characters";
          valid = false;
        }

        if (
          !email.value.includes("@")
        ) {
          errEmail.textContent =
            "Invalid email";
          valid = false;
        }

        if (
          message.value.trim().length < 10
        ) {
          errMessage.textContent =
            "Minimum 10 characters";
          valid = false;
        }

        if (valid) {

          success.style.display =
            "block";

          setTimeout(() => {

            success.style.display =
              "none";

          }, 3000);

          form.reset();
        }

      }
    );
  }

  initContactForm();


  // ======================================
  // RANDOM QUOTE API
  // ======================================

  function initQuotes() {

    const quoteText =
      document.getElementById("quote-text");

    const quoteAuthor =
      document.getElementById("quote-author");

    const quoteBtn =
      document.getElementById("new-quote-btn");

    async function getQuote() {

      if (!quoteText || !quoteAuthor) return;

      try {

        quoteText.textContent =
          "Loading quote...";

        quoteAuthor.textContent = "";

        const response =
          await fetch(
            "https://dummyjson.com/quotes/random"
          );

        if (!response.ok) {
          throw new Error(
            "Failed fetch"
          );
        }

        const data =
          await response.json();

        quoteText.textContent =
          `"${data.quote}"`;

        quoteAuthor.textContent =
          `- ${data.author}`;

      }

      catch (error) {

        quoteText.textContent =
          "Failed to load quote.";

        console.error(error);
      }
    }

    if (quoteBtn) {

      quoteBtn.addEventListener(
        "click",
        getQuote
      );
    }

    getQuote();
  }

  initQuotes();


  // ======================================
  // LIVE CLOCK
  // ======================================

  function initClock() {

    if (!clock) return;

    function updateClock() {

      const now =
        new Date();

      clock.textContent =
        now.toLocaleTimeString("id-ID");
    }

    updateClock();

    setInterval(updateClock, 1000);
  }

  initClock();


  // ======================================
  // ACTIVE NAVIGATION
  // ======================================

  function initActiveNav() {

    const sections =
      document.querySelectorAll("section");

    const navLinks =
      document.querySelectorAll("nav a");

    window.addEventListener(
      "scroll",
      () => {

        let current = "";

        sections.forEach((section) => {

          const sectionTop =
            section.offsetTop;

          if (
            scrollY >= sectionTop - 200
          ) {
            current =
              section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {

          link.classList.remove("active");

          if (
            link
              .getAttribute("href")
              .includes(current)
          ) {
            link.classList.add("active");
          }
        });

      }
    );
  }

  initActiveNav();


  // ======================================
  // SCROLL REVEAL
  // ======================================

  function initRevealAnimation() {

    const reveals =
      document.querySelectorAll(".reveal");

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "active"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.15
        }
      );

    reveals.forEach((el) => {
      observer.observe(el);
    });
  }

  initRevealAnimation();


  // ======================================
  // COUNTER ANIMATION
  // ======================================

  function initCounters() {

    const counters =
      document.querySelectorAll(
        ".stat-box h2"
      );

    counters.forEach((counter) => {

      const target =
        Number(
          counter.innerText.replace("+", "")
        );

      let current = 0;

      const increment =
        target / 100;

      const interval =
        setInterval(() => {

          current += increment;

          if (current >= target) {

            counter.innerText =
              `${target}+`;

            clearInterval(interval);
          }

          else {

            counter.innerText =
              Math.floor(current);
          }

        }, 20);

    });
  }

  initCounters();


  // ======================================
  // LOADER
  // ======================================

  window.addEventListener(
    "load",
    () => {

      if (!loader) return;

      loader.style.opacity = "0";

      setTimeout(() => {

        loader.style.display = "none";

      }, 500);

    }
  );


  // ======================================
  // FOOTER YEAR
  // ======================================

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});