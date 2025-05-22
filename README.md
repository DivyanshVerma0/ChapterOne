# ChapterOne Bookstore

A modern, minimalist online bookstore web app for discovering and purchasing classic and contemporary books. Built with HTML, CSS, and JavaScript.

---

## 📚 Features
- **Beautiful Home Page** with author highlights and quotes
- **Responsive Design** for desktop, tablet, and mobile
- **Product Catalog** with book images, prices, and details
- **Add to Cart** with quantity management and local storage persistence
- **Minimalist Cart Page** with order summary, save for later, and remove options
- **Razorpay Payment Integration** (test mode)
- **About, Contact, and Login Pages**
- **Animated UI** with smooth transitions

---

## 🛠️ Tech Stack
- HTML5
- CSS3 (custom, with responsive media queries)
- JavaScript (vanilla)
- [Razorpay Checkout](https://razorpay.com/docs/payment-gateway/web-integration/standard/) (test mode)
- [Boxicons](https://boxicons.com/) & [Font Awesome](https://fontawesome.com/)

---

## 🏁 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DivyanshVerma0/ChapterOne.git
   cd ChapterOne
   ```
2. **Open `index.html` in your browser.**
   - No build step required! All files are static.
3. **To test payments:**
   - Add books to your cart and click "Proceed to Checkout".
   - Use Razorpay's test card: `4111 1111 1111 1111`, any future expiry, any CVV.

---

## ⚙️ Project Structure
```
├── assets/           # Additional assets (if any)
├── css/              # Extra CSS files
├── image/            # Book and author images
├── js/               # Extra JS files
├── .vscode/          # VSCode settings (optional)
├── cart.html         # Cart page
├── cart.js           # Cart logic
├── Shop1.html        # Shop page
├── index.html        # Home page
├── style.css         # Main stylesheet
├── products.json     # Book data
├── ...
```

---

## ✨ Customization
- **Add your own books:** Edit `products.json` and update images in `/image/`.
- **Change payment provider:** Swap out Razorpay for Stripe or PayPal if needed.
- **Style tweaks:** Edit `style.css` for colors, fonts, and layout.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is open source and free to use for learning and personal projects. 
