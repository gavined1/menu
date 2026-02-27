# Angkor Menu

Next.js 16+, Supabase, Tailwind CSS 4 and TypeScript. 🚀 Next.js 🔥 Supabase 💻 TypeScript 💚 ESLint 🎨 Prettier 🐶 Husky 🧹 Lint-Staged 🧪 Jest 🧪 Testing Library 🕹️ Playwright ✍️ Commitizen 💬 Commitlint 💻 VSCode 🌪️ Vercel 🎨 PostCSS 🍃 Tailwind CSS ⚛️ React Query

![Angkor Menu - Digital Catalogs for Any Business](https://angkormenu.com/images/banner.png)

Angkor Menu is a modern digital menu and catalog platform built with Next.js 16 and Supabase. Create beautiful, mobile-first digital menus for restaurants, retail stores, transportation services, and any business that needs a digital catalog.

## ✨ Features

### Core Features

- 🍽️ **Multi-purpose Digital Catalogs** - Restaurants, retail, transportation, hotels, and more
- 🌐 **Multi-language Support** - English and Khmer (easily extensible)
- 💰 **Multi-currency Support** - USD and KHR with automatic conversion
- 📱 **Mobile-first Design** - Optimized for smartphones with native-like experience
- 🔗 **Deep Linking** - Share individual items with direct links
- 📤 **Social Sharing** - WhatsApp, Telegram, Facebook, Messenger integration
- 🖼️ **Image Carousels** - Hero banners and multi-image item galleries
- 🔍 **Search & Filter** - Find items quickly with category filters
- 🎨 **Customizable Themes** - Per-business branding and colors

### Technical Features

- 🚀 **Next.js 16** - Latest App Router with Server Components
- 💾 **Supabase** - PostgreSQL database with Row Level Security
- 🔐 **Type-safe** - Full TypeScript with auto-generated database types
- ⚡ **Fast** - Optimized images, lazy loading, and caching
- 📊 **SEO Ready** - Dynamic Open Graph meta tags for rich link previews
- 🌙 **Zustand** - Persistent state management for user preferences
- 🎨 **Tailwind CSS** - Modern utility-first styling
- 📝 **Custom Fonts** - Plus Jakarta Sans (English) & Kantumruy Pro (Khmer)

## 🚀 Getting Started

### Prerequisites

- Node.js 24 or higher (recommended to use [nvm](https://github.com/nvm-sh/nvm))
- pnpm package manager
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/angkor-menu.git
   cd angkor-menu
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Link your project:
     ```bash
     pnpm supabase link --project-ref <your-project-ref>
     ```

4. **Configure environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Supabase URL and anon key in `.env.local`

5. **Push database schema**

   ```bash
   pnpm supabase db push
   ```

6. **Generate TypeScript types**

   ```bash
   pnpm generate:types:local
   ```

7. **Start development server**
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see your app!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dynamic-pages)/    # Main app pages (landing, auth)
│   └── (menu-pages)/       # Digital menu pages
├── components/
│   ├── menu/               # Menu components
│   │   ├── locale/         # i18n (translations, provider, store)
│   │   ├── DigitalMenu.tsx # Main menu component
│   │   ├── MenuItemCard.tsx
│   │   ├── ItemDetailModal.tsx
│   │   ├── HeroCarousel.tsx
│   │   └── ...
│   └── ui/                 # Shared UI components
├── rsc-data/               # Server-side data fetching
├── data/                   # Server actions
└── lib/                    # Utilities and types
```

## 🗄️ Database Schema

### Tables

- `menu_clients` - Business/restaurant profiles
- `menu_categories` - Item categories
- `menu_items` - Products/menu items
- `menu_featured_items` - Hero carousel items

### Key Fields

- Multi-language: `name`, `name_km`, `description`, `description_km`
- Multi-currency: `currency`, `exchange_rate`
- Flexible: `custom_fields` (JSONB), `client_type`

## 🌐 Adding New Languages

1. Add locale config in `src/components/menu/locale/i18n.config.ts`
2. Add translations in `src/components/menu/locale/translations.ts`
3. Add database columns for the new language (e.g., `name_th` for Thai)

## 💱 Currency Configuration

Exchange rates can be set:

1. **Per-business**: Set `exchange_rate` in `menu_clients` table
2. **Default**: Configure in `src/components/menu/locale/i18n.config.ts`

## 🧪 Testing

```bash
# Unit tests
pnpm test

# End-to-end tests
pnpm test:e2e
```

## 🚢 Deployment

Deploy to any platform that supports Next.js:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- Self-hosted with Docker

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📞 Support

- Website: [angkormenu.com](https://angkormenu.com)
- Email: hello@gavined.com

---

Built with ❤️ in Cambodia 🇰🇭
