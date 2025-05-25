# 🏆 Gold Price Tracker - BTMC

A modern, responsive web application that displays real-time gold prices from BTMC (Bảo Tín Minh Châu) API.

## ✨ Features

- **Real-time Data**: Fetches live gold prices from BTMC API
- **Beautiful UI**: Modern, responsive design with Vietnamese interface
- **Smart Filtering**: Filter by gold type and search functionality
- **Price Analytics**: Summary cards showing highest, lowest, and world prices
- **Auto Refresh**: Updates every 5 minutes automatically
- **Mobile Friendly**: Fully responsive design for all devices
- **Offline Detection**: Handles network connectivity issues gracefully

## 🚀 Live Demo

View the live application at: [Your GitHub Pages URL]

## 📊 Data Source

Data is fetched from BTMC API:

- **API Endpoint**: `http://api.btmc.vn/api/BTMCAPI/getpricebtmc`
- **Authorization Key**: `3kd8ub1llcg9t45hnoh8hmn7t5kc2v`

### Data Fields

| Field  | Description                      |
| ------ | -------------------------------- |
| `n_1`  | Tên giá vàng (Gold name)         |
| `k_1`  | Hàm lượng Kara (Karat content)   |
| `h_1`  | Hàm lượng vàng (Gold purity)     |
| `pb_1` | Giá mua vào (Buy price)          |
| `ps_1` | Giá bán ra (Sell price)          |
| `pt_1` | Giá thế giới (World price)       |
| `d_1`  | Thời gian cập nhật (Update time) |

## 🏗️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **API Proxy**: AllOrigins (for CORS handling)

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## 🚀 Deployment to GitHub Pages

### Method 1: Using Git Commands

1. **Initialize Git repository**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Gold price tracker website"
   ```

2. **Create GitHub repository** and add remote:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gold-price-tracker.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

### Method 2: Direct Upload

1. Create a new repository on GitHub
2. Upload all files directly through GitHub interface
3. Enable GitHub Pages in repository settings

## 🔧 Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/gold-price-tracker.git
   cd gold-price-tracker
   ```

2. **Serve locally** (optional):

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Or simply open index.html in your browser
   ```

## 🌐 CORS Handling

Since the BTMC API doesn't support CORS, we use a proxy service (`allorigins.win`) to fetch data. In a production environment, you might want to:

- Set up your own CORS proxy
- Use a backend service to fetch data
- Contact BTMC to enable CORS on their API

## 📱 Browser Support

- Chrome/Edge: 88+
- Firefox: 85+
- Safari: 14+
- Mobile browsers: Latest versions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Created with ❤️ for Vietnamese gold price tracking.

---

**Note**: This application is for informational purposes only. Always verify prices with official BTMC sources before making any transactions.
