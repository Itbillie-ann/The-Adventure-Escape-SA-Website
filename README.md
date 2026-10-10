# Adventure Escape SA Website

A responsive, 12-page website for **Adventure Escape SA**, a fictional outdoor adventure and eco-tourism company operating throughout the Western Cape, South Africa. Customers can browse adventure packages and individual activities, request quotations and calculate a total fee with automatic loyalty discounts.

Built by **The Akatsuki** for **XHAW5112 (P/W) Work Integrated Learning 1**, Task 2, Phase 3. Lecturer: Wellcome Zaranyika.

## Screenshots
<!-- Add 2 or 3 screenshots to a /screenshots folder, then link them here, e.g. ![Home page](screenshots/home.png) -->

## Team
| Member | Role | GitHub |
|---|---|---|
| Alicia Bukitu | Team Leader | Itsbillieann |
| Duncan Khoza | Technical Lead | SsjDuncan |
| Promedi Ilunga | Team Secretary | Promza-20 |

## Features
- 12 linked pages with one consistent navigation bar, a drop-down menu and a mobile menu
- Overview page listing 4 adventure packages and 3 individual activities, each linking to its own page
- Calculate Total Fees page with a contact form, checkbox list of experiences and a calculator button
- Loyalty discount applied automatically: 1 booking none, 2 bookings 5%, 3 bookings 10%, more than 3 bookings 15%, plus 15% VAT
- Form validation for name, phone number and email, with clear error messages
- Contact page with phone, email, social links, venue addresses and maps
- Responsive layout for phone, tablet and desktop, with image alt text and a skip-to-content link

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home |
| `about.html` | About Us: history, vision, mission, goals |
| `overview.html` | Summary of all packages and activities |
| `ultimate-adventure-day.html`, `family-explorer-package.html`, `mountain-adventure-package.html`, `corporate-team-challenge.html` | Adventure packages (R1,500 each) |
| `ziplining-adventure.html`, `kayaking-experience.html`, `rock-climbing-session.html` | Individual activities (R750 each) |
| `fees.html` | Calculate Total Fees |
| `contact.html` | Contact details and maps |

## Built with
HTML5, CSS3 and vanilla JavaScript. Fonts: Montserrat and Lato. No frameworks or build step.

## Project structure
```
index.html, about.html, overview.html, fees.html, contact.html
7 individual package and activity pages
style.css    shared styles
script.js    navigation menu, fee calculator, form validation
README.md
```

## Run locally
Download or clone the repository, keep all files in the same folder, and open `index.html` in a browser.

## Design
- Colours: forest green `#1F5C3A`, gold `#D9A441`, sky blue `#4FA8D8`, cream `#FAF7F0`, charcoal `#26312B`
- Each package and activity page has its own accent colour within this theme
- High-fidelity wireframes:
    - https://www.figma.com/design/HFzlsTCMqScRIvbBxFpDsY/GreenLeaf-Co.?node-id=24-1081&t=aUOECaml5Gc8g9sN-0
    - https://www.figma.com/design/WhPCtkRjQ8EDdD56a3RUNq/xhaw-mobile?node-id=0-1&t=vbZOZufkY44Eb8Hv-1

## Version control
Each member commits their own work with a message describing the change. Pull before you push.

## Status
Task 2: HTML structure and navigation for all pages, with a working fee calculator. Planned for Task 3: finish and refine the CSS and JavaScript, then publish the site.

## References
Photography from Unsplash: Elijah Cobb (2025), Matt Palmer (2025), Sergio Arteaga (2024), Roger Ce (2023).
The company, contact details, addresses and social links are fictional and used for academic purposes only.
