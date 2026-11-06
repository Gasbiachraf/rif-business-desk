import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowRight, Info, Menu, X } from 'lucide-react'
import { LANGS, LANG_LABELS, useI18n, type Lang } from '../i18n'
import { services } from '../data/services'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './ui'

function Seal({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`font-display relative grid size-11 shrink-0 place-items-center border text-[1.05rem] font-medium italic ${
        light ? 'border-gold-light/60 text-gold-light' : 'border-navy bg-navy text-gold-light'
      }`}
      aria-hidden="true"
    >
      <span className={`absolute inset-[3px] border ${light ? 'border-gold-light/25' : 'border-gold-light/35'}`} />
      Rb
    </span>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  const { t, path } = useI18n()
  return (
    <Link to={path()} aria-label={t.nav.home} className="flex items-center gap-3" dir="ltr">
      <Seal light={light} />
      <span className="leading-none">
        <span className={`font-display block text-[1.3rem] font-medium tracking-[-0.01em] ${light ? 'text-white' : 'text-navy'}`}>
          Rif Business Desk
        </span>
        <span className={`mt-1 block text-[11px] font-medium tracking-[0.16em] uppercase ${light ? 'text-white/60' : 'text-slate'}`}>
          Al Hoceima · Conseil
        </span>
      </span>
    </Link>
  )
}

function LangSwitcher({ onPick, dark = false }: { onPick?: () => void; dark?: boolean }) {
  const { lang, t } = useI18n()
  const { pathname, search, hash } = useLocation()
  const swap = (to: Lang) => pathname.replace(/^\/(fr|ar|en)(?=\/|$)/, `/${to}`) + search + hash

  return (
    <nav aria-label={t.nav.language} className="flex items-center gap-1">
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className={dark ? 'text-white/25' : 'text-line'} aria-hidden="true">/</span>}
          <Link
            to={swap(code)}
            onClick={onPick}
            lang={code}
            hrefLang={code}
            aria-current={code === lang ? 'true' : undefined}
            title={LANG_LABELS[code].name}
            className={`grid min-h-8 min-w-8 place-items-center px-1 text-xs font-semibold transition ${
              code === lang
                ? dark
                  ? 'text-gold-light underline decoration-gold-light underline-offset-4'
                  : 'text-navy underline decoration-gold underline-offset-4'
                : dark
                  ? 'text-white/70 hover:text-white'
                  : 'text-slate hover:text-navy'
            }`}
          >
            {LANG_LABELS[code].short}
          </Link>
        </span>
      ))}
    </nav>
  )
}

/** Navy strip on top: concept-demo notice + language switcher. */
function UtilityBar() {
  const { t } = useI18n()
  return (
    <div className="bg-navy text-white/80">
      <div className="container-x flex min-h-10 items-center justify-between gap-4 py-1.5">
        <p className="flex items-center gap-2 text-xs">
          <Info className="size-3.5 shrink-0 text-gold-light" aria-hidden="true" />
          {t.banner}
        </p>
        <div className="hidden lg:block">
          <LangSwitcher dark />
        </div>
      </div>
    </div>
  )
}

function Header() {
  const { t, path } = useI18n()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: path('/services'), label: t.nav.services },
    { to: path('/#process'), label: t.nav.process },
    { to: path('/#profiles'), label: t.nav.profiles },
    { to: path('/#faq'), label: t.nav.faq },
    { to: path('/contact'), label: t.nav.contact },
  ]

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-shadow ${
        scrolled ? 'border-line shadow-[0_10px_30px_-20px_rgba(11,22,48,0.35)]' : 'border-line/70'
      }`}
    >
      <div className="container-x flex h-[4.75rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navigation" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `py-2 text-[15px] font-medium transition hover:text-navy ${
                  isActive && !link.to.includes('#') ? 'text-navy underline decoration-gold decoration-2 underline-offset-[10px]' : 'text-slate'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to={path('/consultation')} className="btn-primary hidden min-h-11 px-5 lg:inline-flex">
          {t.nav.cta}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.nav.close : t.nav.menu}
          className="grid size-11 place-items-center border border-line text-navy lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Navigation" className="container-x flex flex-col py-2">
            {links.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line/70 py-4 text-lg text-navy"
              >
                <span className="font-display text-sm text-gold italic" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-medium">{link.label}</span>
              </Link>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-3">
              <LangSwitcher onPick={() => setOpen(false)} />
              <Link to={path('/consultation')} className="btn-primary min-h-11 px-5">
                {t.nav.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function MobileBar() {
  const { t, path } = useI18n()
  const { pathname } = useLocation()
  if (pathname.endsWith('/consultation')) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-navy p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="flex gap-2">
        <Link to={path('/consultation')} className="btn-gold flex-1">
          {t.nav.cta}
        </Link>
        <a
          href={whatsappLink(t.contact.hello)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.whatsappCta}
          className="btn-wa aspect-square px-0"
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </div>
    </div>
  )
}

function Footer() {
  const { t, l, path } = useI18n()
  return (
    <footer className="bg-grid-dark bg-navy pt-16 pb-28 text-white/70 md:pb-12">
      <div className="container-x">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-display max-w-2xl text-3xl leading-tight font-medium text-balance text-white sm:text-4xl">{t.hero.title}</p>
          <Link to={path('/consultation')} className="btn-gold shrink-0">
            {t.nav.cta}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-gold-light uppercase rtl:tracking-normal">{t.nav.services}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={path(`/services/${s.slug}`)} className="hover:text-white">
                    {l(s.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-gold-light uppercase rtl:tracking-normal">{t.footer.explore}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to={path('/consultation')} className="hover:text-white">
                  {t.nav.cta}
                </Link>
              </li>
              <li>
                <Link to={path('/contact')} className="hover:text-white">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <a href={whatsappLink(t.contact.hello)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <WhatsAppIcon className="size-4" />
                  {t.contact.whatsappCta}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-2 border-t border-white/10 pt-6 text-xs leading-relaxed">
          <p className="font-semibold text-gold-light">{t.legal.disclaimer}</p>
          <p>{t.legal.independence}</p>
          <p className="max-w-3xl">{t.footer.concept}</p>
          <div className="flex flex-wrap justify-between gap-3 pt-3 text-white/60">
            <p>
              © {new Date().getFullYear()} Rif Business Desk — Concept Demo · {t.footer.photos}
            </p>
            <p>
              {t.footer.madeBy}{' '}
              <a href="https://innovatechs.vercel.app/" className="font-semibold text-white hover:text-gold-light">
                Innovatechs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Scrolls to the hash target, or to the top when the page changes. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only z-50 bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <UtilityBar />
      <Header />
      <main id="main">{children ?? <Outlet />}</main>
      <Footer />
      <MobileBar />
    </>
  )
}
