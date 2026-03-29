// BalanceU Landing Page JavaScript
// This file contains interactive functionality for the landing page

document.addEventListener('DOMContentLoaded', function() {
  console.log('BalanceU landing page loaded successfully!');

  // Get all buttons
  const signUpButtons = document.querySelectorAll('.btn-primary, .btn-white');
  const logInButtons = document.querySelectorAll('.btn-outline, .btn-white-outline');

  // Add click handlers for Sign Up buttons
  signUpButtons.forEach(button => {
    if (button.textContent.trim() === 'Sign Up') {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        // You can replace this with your actual sign-up page URL
        // alert('Sign Up functionality - Redirect to your sign-up page');
        window.location.href = '/signup_screen/signup.html';
      });
    }
  });

  // Add click handlers for Log In buttons
  logInButtons.forEach(button => {
    if (button.textContent.trim() === 'Log In') {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        // You can replace this with your actual login page URL
        // alert('Log In functionality - Redirect to your login page');
        window.location.href = '/login_screen/login.html';
      });
    }
  });

  // Smooth scroll for internal links (if you add any in the future)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Optional: Add scroll-based animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature cards for fade-in animation
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
