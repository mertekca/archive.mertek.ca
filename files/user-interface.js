document.addEventListener('DOMContentLoaded', () => {
    // Create a style element
    const styleElement = document.createElement("style");
    styleElement.id = "custom-styles";
    styleElement.innerHTML = `
        /* Navbar Styling */
        .navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 60px !important;
            background-color: #333 !important;
            color: white !important;
            z-index: 1000 !important;
            display: flex !important;
            justify-content: space-around !important;
            align-items: center !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        }

        .nav-list {
            list-style: none !important;
            display: flex !important;
        }

        .nav-list li {
            margin: 0 15px !important;
        }

        .nav-link {
            color: white !important;
            text-decoration: none !important;
            font-size: 18px !important;
            font-weight: bold !important;
            transition: color 0.3s ease !important;
        }

        .nav-link:hover {
            color: #00aaff !important;
        }

        /* Prevent Navbar Overlap */
        body {
            padding-top: 60px !important;
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
        }

        /* Footer Styling */
        footer {
            background-color: #333 !important;
            color: #fff !important;
            text-align: center !important;
            font-size: 16px !important;
            border-top: 1px solid #444 !important;
            width: 100% !important;
            padding: 20px 0 !important;
            margin-top: auto !important;
        }
    `;

    // Append styles to the head
    document.head.appendChild(styleElement);

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

    // Inject navbar at the top
    document.body.insertAdjacentHTML('afterbegin', nav);

    // Inject footer at the bottom
    document.body.insertAdjacentHTML('beforeend', footer);
});
