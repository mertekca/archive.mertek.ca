document.addEventListener('DOMContentLoaded', () => {
    // Add Navbar HTML
    const nav = `
        <style>
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
        </style>
        <nav class="navbar">
            <ul class="nav-list">
                <li><a href="/home" class="nav-link">Home</a></li>
                <li><a href="/user-agreement" class="nav-link">User Agreement</a></li>
                <li><a href="/create-json" class="nav-link">Create File Set</a></li>
                <li><a href="/log-in" class="nav-link">Log In</a></li>
            </ul>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', nav);

    // Add Footer HTML
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
    document.body.insertAdjacentHTML('beforeend', footer);
});
