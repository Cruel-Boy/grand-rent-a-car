# 🚗 Grand Rent a Car

A modern, responsive car rental website featuring a premium design with multi-language support (English, Russian, Uzbek), interactive vehicle showcase, and seamless user experience.

![Grand Rent a Car](https://img.shields.io/badge/Status-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contact](#-contact)
- [License](#-license)

## ✨ Features

### 🌐 Multi-Language Support
- **Three Languages**: English (EN), Russian (RU), and Uzbek (UZ)
- Language preference saved in localStorage
- Seamless language switching without page reload

### 🎨 Modern UI/UX
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Elegant midnight blue and gold color scheme
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Interactive Carousel**: Auto-rotating hero carousel with 7 slides

### 🚙 Vehicle Showcase
- Featured vehicles section with detailed specifications
- Complete fleet display with pricing information
- Vehicle cards with hover effects
- Direct booking via phone call integration

### 📍 Service Regions
- Interactive map integration (Google Maps)
- Regional pricing information
- Service coverage across multiple cities in Uzbekistan

### 📱 Additional Features
- Mobile-friendly hamburger menu
- Newsletter subscription
- Social media links
- Touch/swipe support for carousel
- Keyboard navigation (Arrow keys)
- Smooth scrolling navigation

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript
- **Font Awesome 6.0**: Icons
- **Google Fonts**: Inter font family
- **Google Maps API**: Embedded map for location

## 📁 Project Structure

```
G-Rent/
│
├── index.html              # Main homepage
├── bonus.html              # Bonus page (default)
├── bonus_en.html           # Bonus page (English)
├── bonus_ru.html           # Bonus page (Russian)
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
│
├── src/                    # Assets directory
│   ├── logo-nobg.png      # Logo (transparent)
│   ├── logo-main.png      # Main logo
│   ├── cashback.jpg       # Cashback image
│   └── time.png           # Time image
│
├── sss/                    # Vehicle images
│   ├── Range Rover.png
│   ├── m5.jpg
│   ├── ford.jpg
│   ├── mercedes_amg_g_63_2025-HD.jpg
│   └── ... (other vehicle images)
│
└── VEHICLES/               # Additional vehicle assets
    ├── Ford Mustang.png
    ├── m5.png
    └── ... (other vehicle images)
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/G-Rent.git
   cd G-Rent
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Navigate to `http://localhost:8000` (or your chosen port)

## 💻 Usage

### Basic Navigation
- Click on navigation links to scroll to different sections
- Use the language switcher (UZ/RU/EN) to change the interface language
- Click "Bonus +" button to view bonus information

### Vehicle Booking
- Browse vehicles in the "Our Complete Fleet" section
- Click "Book Now" or "Rent Now" buttons to initiate a phone call
- All booking buttons are linked to: `+998 (90) 022-26-22`

### Carousel Controls
- **Auto-play**: Carousel automatically advances every 5 seconds
- **Keyboard**: Use Left/Right arrow keys to navigate
- **Touch**: Swipe left/right on mobile devices

### Newsletter
- Enter your email in the footer newsletter section
- Click "Subscribe" to receive updates (currently shows success notification)

## 📸 Screenshots

> **Note**: Add screenshots of your website here
> 
> Example:
> - Homepage hero section
> - Vehicle showcase
> - About section
> - Regions map
> - Mobile responsive view

## 🌍 Service Regions

The website displays service coverage for:
- **Toshkent shahri & Toshkent viloyati**: 100% + 0%
- **Samarqand • Jizzax • Sirdaryo**: 100% + 15%
- **Qashqadaryo • Surxondaryo**: 100% + 25%
- **Buxoro • Navoi**: 100% + 25%
- **Xorazm • Qoraqalpog'iston**: 100% + 35%

## 📞 Contact

- **Phone**: +998 (90) 022-26-22
- **Email**: info@grandrentacar.com
- **Address**: Toshkent shahar, Mirobod tumani, Shahrisabz ko'chasi 8A uy
- **Working Hours**: Mon-Sun: 9:00 AM - 10:00 PM
- **Instagram**: [@rentcar_grand](https://instagram.com/rentcar_grand)

## 🎯 Key Features Implementation

### Internationalization (i18n)
The website uses a custom i18n system that:
- Stores language preference in localStorage
- Dynamically updates all text content
- Supports three languages with complete translations
- Maintains state across page reloads

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 512px
- Hamburger menu for mobile navigation
- Optimized images and layouts for all screen sizes

### Performance
- Optimized CSS with variables for easy theming
- Efficient JavaScript with event delegation
- Smooth animations using CSS transitions
- Intersection Observer for scroll animations

## 🔧 Customization

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --gold: #d4af37;
    --gold-dark: #b0892f;
    --midnight: #0a192f;
    /* ... */
}
```

### Adding Vehicles
1. Add vehicle images to the `sss/` directory
2. Add vehicle HTML in the vehicles section of `index.html`
3. Update vehicle data if needed

### Modifying Translations
Edit the `translations` object in `script.js` to add or modify translations.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**SHN-DESIGN**
- Website: [Your Website]
- Email: [Your Email]

---

⭐ If you find this project helpful, please consider giving it a star!

