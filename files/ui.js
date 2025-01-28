document.addEventListener('DOMContentLoaded', () => {
    // Dynamically load Navbar
    const navbarScript = document.createElement('script');
    navbarScript.src = 'navbar.js';
    document.head.appendChild(navbarScript);

    // Dynamically load Footer
    const footerScript = document.createElement('script');
    footerScript.src = 'footer.js';
    document.head.appendChild(footerScript);
});
