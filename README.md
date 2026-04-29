# Sonia Dresses - Free MVP E-commerce

Completely free MVP clothing store built with:

- Next.js (frontend + backend API routes)
- Tailwind CSS
- MongoDB Atlas Free Tier
- Cloudinary Free Tier
- NextAuth.js (credentials auth for admin)
- Vercel Free deployment
- Payments: COD + WhatsApp order flow

## 1) Project Setup

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local` with your free-tier credentials.

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## 2) Database Setup (MongoDB Atlas Free)

- Create a free MongoDB Atlas cluster.
- Add database user and network access (IP allowlist).
- Copy connection string into `MONGODB_URI`.
- Database name used by app: `sonia_dresses`.

## 3) Cloudinary Setup (Free Tier)

- Create a free Cloudinary account.
- Copy:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Image uploads happen via `/api/upload` (admin only).

## 4) Admin Setup

- Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`.
- Login URL: `http://localhost:3000/admin/login`
- Admin dashboard URL: `http://localhost:3000/admin`

Admin can:
- Add products
- Delete products
- Upload images to Cloudinary
- View orders
- Update order status

## 5) Customer Features

- Home with banner, categories, featured products
- Category browsing + search
- Product details with sizes
- Cart (localStorage)
- Checkout form (name, phone, address)
- COD order placement
- WhatsApp pre-filled order link

## 6) API Routes

- `GET/POST /api/products`
- `GET/PUT/DELETE /api/products/:id`
- `GET/POST /api/orders`
- `PATCH /api/orders/:id`
- `POST /api/upload`
- `GET/POST /api/auth/[...nextauth]`

## 7) Folder Structure

```text
src/
  app/
    admin/
    api/
    cart/
    category/[category]/
    checkout/
    product/[id]/
  components/
    Header.js
    ProductCard.js
  context/
    CartContext.js
  lib/
    auth.js
    cloudinary.js
    constants.js
    db.js
    models/
      Order.js
      Product.js
```

## 8) Deploy for Free (Vercel)

- Push to GitHub.
- Import project in Vercel (free plan).
- Add same env vars in Vercel project settings.
- Deploy.

## Notes

- No paid APIs/services are used.
- No paid payment gateway is used.
- Free-first MVP focused on real-world usability and easy upgrades later.
