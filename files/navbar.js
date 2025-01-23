document.addEventListener('DOMContentLoaded', () => {
    // Add Navbar HTML
    const nav = `
        <style>
            .navbar {
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: #333;
                color: white;
                padding: 10px 20px;
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
                <li><a href="/user-agreement" class="nav-link">About</a></li>
                <li><a href="/create-json" class="nav-link">Create FIleset</a></li>
            </ul>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', nav);
});
