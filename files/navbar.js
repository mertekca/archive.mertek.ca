document.addEventListener('DOMContentLoaded', () => {
    // Add Navbar HTML
    const nav = `
        <style>
            html, body {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                min-height: 100%;
                display: flex;
                flex-direction: column;
            }

            body {
                padding-top: 60px; /* Adjust based on navbar height */
            }

            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 60px; /* Adjust as needed */
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

            /* Footer styling */
            footer {
                background-color: #333; /* Dark gray background */
                color: #fff; /* White text color */
                text-align: center;
                font-size: 16px; /* Larger font size for visibility */
                border-top: 1px solid #444; /* Slightly lighter gray for top border */
                width: 100%;
                padding: 10px 0;
                margin-top: auto; /* Ensures footer stays at the bottom */
            }

            /* Content container for flex behavior */
            .content-wrapper {
                flex: 1; /* Allows this section to grow/shrink as needed */
                padding: 20px; /* Optional padding for the content */
                display: block; /* Content should flow normally */
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
        <div class="content-wrapper"></div> <!-- Placeholder for page content -->
    `;
    const footer = `
        <footer>
            <p>&copy; MerTek Archive Site 2025</p>
        </footer>
    `;
    document.body.insertAdjacentHTML('afterbegin', nav);
    document.body.insertAdjacentHTML('beforeend', footer); // Ensure footer is at the
