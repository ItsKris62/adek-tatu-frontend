import type { Metadata } from 'next'
import { Phone, MapPin } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { ContactDemoForm } from '@/components/contact/contact-demo-form'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact the Alliance for Democracy and Equality in Kenya (ADEK TATU). ${site.contact.officeLocation}, ${site.contact.poBox}.`,
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact ADEK"
        lead="Reach the party using the official details below."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
              <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-gold" />
              Official Contact
            </h2>
            <address className="mt-6 flex flex-col gap-5 not-italic">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-secondary text-gold">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Office Location</p>
                  <p className="text-base font-semibold text-navy">
                    {site.contact.officeLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-secondary text-gold">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Postal address</p>
                  <p className="text-base font-semibold text-navy">
                    {site.contact.poBox}
                  </p>
                </div>
              </div>
              {site.contact.phones.map((phone, i) => (
                <div key={phone} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-secondary text-navy">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Telephone {i + 1}
                    </p>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-base font-semibold text-navy transition-colors hover:text-adek-blue"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              ))}
            </address>

            {/* Do NOT display email, physical office address, hours, map or social media. */}
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Additional contact channels will be published here once official
              details are confirmed.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
              Send a message
            </h2>
            <div className="mt-6">
              <ContactDemoForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
