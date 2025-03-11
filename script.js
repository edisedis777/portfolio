/**
 * Main JavaScript for Portfolio Site
 * Handles theme toggling, navigation, animations, and other interactive elements
 */

// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animation library
  AOS.init({
    once: true,
    offset: 100,
    duration: 800,
  });

  // Update current year for copyright
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // ====== Navigation and Scrolling ======
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");

  // Add scroll event for navbar shrinking effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink();
  });

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuToggle.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }

      // Scroll to target
      const targetId = this.getAttribute("href");
      if (targetId === "#") return; // Ignore # links without specific target

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });

        // Update active link
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // Function to update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section, header");
    const scrollPosition = window.scrollY + 100; // Offset to trigger a bit earlier

    sections.forEach((section) => {
      const sectionId = section.getAttribute("id");
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const navLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );

      if (
        navLink &&
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
        });
        navLink.classList.add("active");
      }
    });
  }

  // ====== Theme Toggling ======
  const themeToggle = document.querySelector(".theme-toggle");
  const themeToggleIcon = themeToggle.querySelector("i");
  const body = document.body;

  // Apply theme from localStorage or use system preference as default
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // Use saved preference
      applyTheme(savedTheme);
    } else {
      // Use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      applyTheme(defaultTheme);
    }
  }

  function applyTheme(theme) {
    // Remove both theme classes
    body.classList.remove("dark-theme", "light-theme");

    // Add the appropriate theme class
    body.classList.add(theme + "-theme");

    // Update the toggle icon
    themeToggleIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";

    // Store the preference
    localStorage.setItem("theme", theme);
  }

  // Theme toggle click handler
  themeToggle.addEventListener("click", () => {
    const isDarkTheme = body.classList.contains("dark-theme");
    const newTheme = isDarkTheme ? "light" : "dark";
    applyTheme(newTheme);
  });

  // Initialize theme
  initTheme();

  // ====== Page Loader ======
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.classList.add("hidden");
      // Remove loader from DOM after transition finishes
      setTimeout(() => {
        loader.remove();
      }, 500);
    }
  });

  // ====== Initial active link ======
  // Set the initial active link based on page position
  updateActiveNavLink();
});

// Apply theme immediately to prevent flash of wrong theme
(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme + "-theme");
  } else {
    // Use system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = prefersDark ? "dark" : "light";
    document.body.classList.add(defaultTheme + "-theme");
  }
})();
