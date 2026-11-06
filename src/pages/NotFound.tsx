import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n'

export function NotFound({ message }: { message?: string }) {
  const { t, path } = useI18n()
  return (
    <section className="bg-grid grid min-h-[60vh] place-items-center border-b border-line py-24 text-center">
      <div className="container-x">
        <p className="font-display text-7xl text-gold italic" aria-hidden="true">
          404
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium text-navy">{t.notFound.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-slate">{message ?? t.notFound.text}</p>
        <Link to={path()} className="btn-primary mt-8">
          {t.notFound.home}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
