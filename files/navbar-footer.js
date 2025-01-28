document.addEventListener('DOMContentLoaded', () => {
    // Create script tags for both external scripts
    const script1 = document.createElement('script');
    script1.src = '/files/navbar.js/';
    script1.type = 'text/javascript';

    const script2 = document.createElement('script');
    script2.src = '/files/footer.js/';
    script2.type = 'text/javascript';

    // Append both scripts to the document body or head
    document.body.appendChild(script1);
    document.body.appendChild(script2);
});
