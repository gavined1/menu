import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { T } from '@/components/ui/Typography';
import {
  ArrowRight,
  ChefHat,
  Filter,
  Flame,
  Globe,
  Leaf,
  Palette,
  QrCode,
  Search,
  Smartphone,
  Sparkles,
  Star,
  Utensils,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200/50 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
                <Utensils className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900">
                MenuCraft
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/menu/omni">View Demo</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-700"
              >
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100 via-stone-50 to-orange-50" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="outline"
              className="mb-6 border-amber-300 bg-amber-50 px-4 py-1.5 text-amber-700"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Digital Menu Platform for Modern Restaurants
            </Badge>

            <T.H1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Beautiful{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Digital Menus
              </span>{' '}
              for Your Restaurant
            </T.H1>

            <T.P className="mx-auto mb-8 max-w-2xl text-lg text-stone-600 md:text-xl">
              Create stunning, mobile-first digital menus that delight your
              customers. QR code ready, easy to update, and beautifully
              designed.
            </T.P>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="group h-12 bg-gradient-to-r from-amber-500 to-orange-600 px-6 text-base font-semibold text-white shadow-xl shadow-amber-500/30 transition-all hover:from-amber-600 hover:to-orange-700 hover:shadow-2xl hover:shadow-amber-500/40"
              >
                <Link href="/menu/omni">
                  View Live Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 border-stone-300 px-6 text-base font-semibold text-stone-700 hover:bg-stone-100"
              >
                <Link href="/login">
                  <QrCode className="mr-2 h-4 w-4" />
                  Create Your Menu
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Device Mockup */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-20 blur-3xl" />

            {/* Phone Mockup */}
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
              <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-stone-900 bg-stone-900 shadow-2xl">
                {/* Phone Notch */}
                <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-stone-900" />

                {/* Screen Content */}
                <div className="relative aspect-[9/19] w-full overflow-hidden bg-white">
                  <Image
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
                    alt="Digital menu preview"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Overlay UI Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20">
                    {/* Navbar Mockup */}
                    <div className="absolute left-0 right-0 top-8 flex items-center justify-between px-4">
                      <div className="rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-md">
                        <span className="text-xs font-semibold text-white">
                          OMNI Restaurant
                        </span>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <span className="text-sm">ℹ️</span>
                      </div>
                    </div>

                    {/* Content Badge */}
                    <div className="absolute bottom-24 left-4 right-4">
                      <div className="mb-2 inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900">
                        🌟 Chef&apos;s Special
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Grilled Salmon
                      </h3>
                      <p className="text-sm text-white/70">
                        Fresh Atlantic salmon with herbs
                      </p>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-1.5">
                      <div className="h-1.5 w-6 rounded-full bg-white" />
                      <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 hidden animate-pulse rounded-2xl border border-stone-200 bg-white p-3 shadow-xl sm:-left-16 sm:block">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-stone-700">
                    Vegan
                  </span>
                </div>
              </div>

              <div
                className="absolute -right-4 top-1/3 hidden rounded-2xl border border-stone-200 bg-white p-3 shadow-xl sm:-right-20 sm:block"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="text-sm font-medium text-stone-700">
                    4.9 Rating
                  </span>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 hidden animate-pulse rounded-2xl border border-stone-200 bg-white p-3 shadow-xl sm:-right-16 sm:block">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                    <Flame className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-stone-700">
                    Spicy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-stone-200 bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-stone-900 md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-stone-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-orange-200 bg-orange-50 text-orange-700"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Powerful Features
            </Badge>
            <T.H2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Everything You Need for Digital Menus
            </T.H2>
            <T.P className="text-lg text-stone-600">
              Built with modern technology to provide the best experience for
              you and your customers.
            </T.P>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/50"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-amber-100/50 to-transparent" />
                <CardHeader className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg shadow-amber-100/50 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-stone-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-stone-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge className="mb-6 border-amber-500/30 bg-amber-500/10 text-amber-400">
                <Star className="mr-1.5 h-3.5 w-3.5 fill-amber-400" />
                Live Demo Available
              </Badge>
              <T.H2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                See It In Action
              </T.H2>
              <T.P className="mb-8 text-lg leading-relaxed text-stone-400">
                Experience our digital menu platform with a real restaurant
                demo. Browse categories, search items, view details, and see how
                your customers will interact with your menu.
              </T.P>

              <div className="mb-8 space-y-4">
                {demoFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                    </div>
                    <span className="text-stone-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                asChild
                className="group h-12 bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-base font-semibold text-white shadow-xl shadow-amber-500/20"
              >
                <Link href="/menu/omni">
                  Try OMNI Restaurant Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-stone-700/50 bg-stone-800 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                  alt="Restaurant interior"
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2 inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400 backdrop-blur-sm">
                    Featured Restaurant
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-white">
                    OMNI Restaurant
                  </h3>
                  <p className="text-stone-400">
                    Modern dining experience with curated seasonal dishes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-amber-200 bg-amber-50 text-amber-700"
            >
              Simple Setup
            </Badge>
            <T.H2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Get Started in Minutes
            </T.H2>
            <T.P className="text-lg text-stone-600">
              Create your digital menu and share it with customers in three easy
              steps.
            </T.P>
          </div>

          <div className="relative mx-auto max-w-4xl">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-300 via-orange-300 to-red-300 md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center gap-6 md:flex-row ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 1 ? 'md:text-right' : ''
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 ${
                        index % 2 === 1 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-sm font-bold text-amber-600">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-stone-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-stone-600">{step.description}</p>
                  </div>

                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
                    {step.icon}
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <T.H2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Modernize Your Menu?
            </T.H2>
            <T.P className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Join restaurants worldwide using digital menus to enhance their
              customer experience. Start free, upgrade anytime.
            </T.P>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="h-12 bg-white px-8 text-base font-semibold text-orange-600 shadow-xl hover:bg-stone-100"
              >
                <Link href="/login">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/menu/omni">View Demo First</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const stats = [
  { value: '10K+', label: 'Menus Created' },
  { value: '500+', label: 'Restaurants' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9★', label: 'Rating' },
];

const features = [
  {
    title: 'Mobile-First Design',
    description:
      'Optimized for smartphones with smooth scrolling, touch gestures, and fast loading. Your menu looks stunning on any device.',
    icon: <Smartphone className="h-6 w-6 text-amber-600" />,
  },
  {
    title: 'Smart Search & Filter',
    description:
      'Customers can easily find dishes by name, category, or dietary preferences. Filter by vegan, spicy, gluten-free, and more.',
    icon: <Search className="h-6 w-6 text-amber-600" />,
  },
  {
    title: 'Dietary Badges',
    description:
      'Highlight important dietary information with beautiful badges. Vegan, vegetarian, spicy, gluten-free, and chef specials.',
    icon: <Leaf className="h-6 w-6 text-amber-600" />,
  },
  {
    title: 'Category Management',
    description:
      'Organize your menu into clear categories. Customers can browse by Appetizers, Main Courses, Desserts, Drinks, and more.',
    icon: <Filter className="h-6 w-6 text-amber-600" />,
  },
  {
    title: 'Brand Customization',
    description:
      'Match your restaurant brand with custom colors, logos, and styling. Create a consistent experience for your customers.',
    icon: <Palette className="h-6 w-6 text-amber-600" />,
  },
  {
    title: 'Multi-Location Support',
    description:
      'Perfect for restaurant chains. Each location gets its own branded menu with centralized management.',
    icon: <Globe className="h-6 w-6 text-amber-600" />,
  },
];

const demoFeatures = [
  'Browse full menu with beautiful imagery',
  'Filter by categories and dietary preferences',
  'Search for specific dishes instantly',
  'View detailed item information and pricing',
  'See restaurant info, hours, and contact details',
  'Experience smooth mobile-first interactions',
];

const steps = [
  {
    title: 'Create Your Menu',
    description:
      'Sign up and add your restaurant details, categories, and menu items with photos and descriptions.',
    icon: <ChefHat className="h-7 w-7 text-white" />,
  },
  {
    title: 'Customize Your Brand',
    description:
      'Upload your logo, set your brand colors, and personalize the look and feel of your digital menu.',
    icon: <Palette className="h-7 w-7 text-white" />,
  },
  {
    title: 'Share with Customers',
    description:
      'Generate a QR code or share your unique link. Customers can access your menu instantly on any device.',
    icon: <QrCode className="h-7 w-7 text-white" />,
  },
];
