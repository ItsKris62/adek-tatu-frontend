import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { footerGroups } from '@/content/navigation'
import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-navy-700/40 bg-navy text-white/80">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* Identity + contact */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/adek-logo.png"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div className="leading-tight">
                <p className="font-display text-base font-extrabold text-white">
                  ADEK TATU
                </p>
                <p className="text-xs tracking-[0.14em] text-white/60 uppercase">
                  {site.slogan}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {site.name}. An inclusive social democracy founded on teamwork,
              accountability, transparency and unity.
            </p>

            <address className="mt-6 flex flex-col gap-3 text-sm not-italic">
              <span className="flex items-start gap-2.5 text-white/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-adek-blue" aria-hidden="true" />
                {site.contact.poBox}
              </span>
              {site.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-adek-blue" aria-hidden="true" />
                  {phone}
                </a>
              ))}
            </address>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition-colors hover:text-adek-blue focus-visible:text-adek-blue focus-visible:outline-none"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-md text-white/45">
            {/* Content governance: some material is pending official approval. */}
            Some content on this website is a draft or is pending official
            approval and is clearly labelled as such.
          </p>
        </div>
      </Container>
    </footer>
  )
}
