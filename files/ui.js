document.addEventListener('DOMContentLoaded', () => {
    // Dynamically load Navbar
    const navbarScript = document.createElement('script');
    navbarScript.src = '/files/navbar.js';
    document.head.appendChild(navbarScript);

    // Dynamically load Footer
    const footerScript = document.createElement('script');
    footerScript.src = '/files/footer.js';
    document.head.appendChild(footerScript);
});
