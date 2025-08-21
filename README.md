# Frontend Mentor - E-commerce product page solution

This is my solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6).  
The challenge helped me practice building a fully responsive product page with an image gallery, cart functionality, and TypeScript integration.


## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

#### Desktop
![Desktop View](./screenshots/desktop.png)

#### Mobile
![Mobile View](./screenshots/mobile.png)

---

### Links

- Solution URL: [Add solution URL here](https://github.com/alicedicey/E-commerce)
- Live Site URL: 👉 [https://alicedicey.github.io/E-commerce/](https://alicedicey.github.io/E-commerce/)



## My process

### Built with

- Semantic HTML5 markup
- CSS3 (Flexbox + Grid)
- TypeScript (compiled to JavaScript)
- Mobile-first workflow


### What I learned

This project improved my skills in:

- Structuring semantic HTML and keeping it accessible
- Using CSS Grid and Flexbox for a responsive layout
- Implementing interactive UI features like lightbox galleries
- Managing cart state dynamically using TypeScript

Example of a TypeScript snippet I’m proud of:

```ts
const updateCartBadge = (count: number): void => {
  const badge = document.querySelector(".cart-count") as HTMLElement;
  badge.textContent = count.toString();
  badge.style.display = count > 0 ? "inline-block" : "none";
};

Continued development
In the future, I’d like to:
Expand the cart to handle multiple products
Add a checkout page with form validation
Experiment with React/Next.js for state management at scale

Useful resources
  Typescript Handbook - Great reference for type safety and TS basics.
  MDN Web Docs- My go-to for CSS and JS documentation.
  Frontend Mentor Community- Inspiration and tips from other developers.

  ## 📖 How to Use
1. Clone the repo:
   ```bash
   git clone https://github.com/alice_dicey/E-commerce.git

 2.  Open index.html in your browser.


🧑‍💻 Author

GitHub – alice_dicey

Frontend Mentor – @alice_dicey

LinkedIn – Odunayo Amoye