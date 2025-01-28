async function loadScripts() {
    await new Promise((resolve) => {
        const navbarScript = document.createElement('script');
        navbarScript.src = '/files/navbar.js';
        navbarScript.onload = resolve;
        document.head.appendChild(navbarScript);
    });

    await new Promise((resolve) => {
        const footerScript = document.createElement('script');
        footerScript.src = '/files/footer.js';
        footerScript.onload = resolve;
        document.head.appendChild(footerScript);
    });
}

document.addEventListener('DOMContentLoaded', loadScripts);
