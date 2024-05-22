
# Muslim Prayer Timing Website

This repository hosts a dynamic Muslim prayer timing website, initially configured for Swedish cities. The website is designed to be easily adaptable for any city in the world by modifying the data files located in `JS/Data/{city}.js`.

## Features

- **City-Specific Prayer Times:** Provides accurate Islamic prayer times tailored for each city.
- **Easily Configurable:** Can be adapted to new cities worldwide by modifying simple JavaScript files.
- **Responsive Design:** The site is fully responsive, providing an optimal viewing experience across a wide range of devices.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have a modern web browser installed and optionally, Node.js if you wish to run a local development server.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nabilakhlaque/BonetiderPro.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BonetiderPro
   ```
3. Open the `index.html` file in your browser or set up a local server to start developing.

## Configuring for Other Cities

To adapt the website for a different city:
1. Create a new JavaScript data file in `js/Data/` named after the city (e.g., `newyork.js`).
2. Follow the format used in existing files to set up the prayer times for the new city.
3. Reference the new file in your main JavaScript or HTML file to load the new city's data.

## Contributing

Feel free to fork this repository and propose changes through a pull request. Any contributions aimed at enhancing the application or extending its capabilities are welcome.

## License

This project is open-source and available under no specific license. Anyone is free to use, modify, and distribute the software as they wish.
