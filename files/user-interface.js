document.addEventListener('DOMContentLoaded', () => {
    const styles = `
        <style>
            /* Reset */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            /* Make body take full height */
            html, body {
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            /* Navbar Styling */
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 60px;
                background-color: #333;
                color: white;
                z-index: 1000;
                display: flex;
                justify-content: space-around;
                align-items: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .nav-list {
                list-style: none;
                display: flex;
                margin: 0;
                padding: 0;
            }

            .nav-list li {
                margin: 0 15px;
            }

            .nav-link {
                color: white;
                text-decoration: none;
                font-size: 18px;
                font-weight: bold;
                transition: color 0.3s ease;
            }

            .nav-link:hover {
                color: #00aaff;
            }

            /* Prevent Navbar Overlap */
            body {
                padding-top: 60px;
                display: flex;
                flex-direction: column;
            }

            /* Content Wrapper */
            .content-wrapper {
                max-width: 1200px;
                width: 100%;
                margin: 0 auto;
                padding: 40px 20px; /* Increased padding */
                flex: 1; /* Pushes footer down */
            }

            /* Footer Styling */
            footer {
                background-color: #333;
                color: #fff;
                text-align: center;
                font-size: 16px;
                border-top: 1px solid #444;
                width: 100%;
                padding: 30px 0; /* Increased padding */
                margin-top: 40px; /* Extra space between content and footer */
            }
        </style>
    `;

    // Navbar HTML
    const nav = `
        <nav class="navbar">
            <ul class="nav-list">
                <li><a href="/home" class="nav-link">Home</a></li>
                <li><a href="/user-agreement" class="nav-link">User Agreement</a></li>
                <li><a href="/create-json" class="nav-link">Create File Set</a></li>
                <li><a href="/log-in" class="nav-link">Log In</a></li>
            </ul>
        </nav>
    `;

    // Footer HTML
    const footer = `
        <footer>
            <p>&copy; MerTek Archive Site 2025</p>
        </footer>
    `;

    // Inject styles
    document.head.insertAdjacentHTML('beforeend', styles);

    // Inject navbar at the top
    document.body.insertAdjacentHTML('afterbegin', nav);

    // Wrap existing content in a content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content-wrapper');

    while (document.body.childNodes.length > 1) {
        contentWrapper.appendChild(document.body.childNodes[1]);
    }
    
    document.body.appendChild(contentWrapper);

    // Inject footer at the bottom
    document.body.insertAdjacentHTML('beforeend', footer);
});
