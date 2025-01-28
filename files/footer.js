document.addEventListener('DOMContentLoaded', () => {
    // Footer HTML
    const footer = `
        <style>
            footer {
                background-color: #333;
                color: #fff;
                text-align: center;
                font-size: 16px;
                border-top: 1px solid #444;
                width: 100%;
                padding: 10px 0;
                position: relative;
                bottom: 0;
            }
        </style>
        <footer>
            <p>&copy; MerTek Archive Site 2025</p>
        </footer>
    `;
    
    // Insert the footer HTML into the body before the closing </body> tag
    document.body.insertAdjacentHTML('beforeend', footer);
});
