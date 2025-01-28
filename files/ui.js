document.addEventListener('DOMContentLoaded', () => {
    // Add Navbar HTML
    const nav = `
        <script src="/files/navbar.js"></script>
    `;
    
    // Insert Navbar HTML into the body
    document.body.insertAdjacentHTML('afterbegin', nav);

    // Add Footer HTML
    const footer = `
        <script src="/files/footer.js"></script>
    `;
    
    // Insert Footer HTML into the body
    document.body.insertAdjacentHTML('beforeend', footer);
});
