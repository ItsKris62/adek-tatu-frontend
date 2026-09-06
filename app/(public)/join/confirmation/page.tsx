import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { CtaLink } from '@/components/editorial/cta'

export const metadata: Metadata = {
  title: 'Application Confirmation',
  description: 'Confirmation of ADEK membership registration submission.',
  robots: { index: false, follow: false },
}

/**
 * Submission confirmation. The reference is intentionally generated client-side
 * for this frontend prototype; a production backend should issue the authoritative
 * reference and persist the registration securely.
 */
export default function ConfirmationPage() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="max-w-2xl text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-adek-blue/10 text-adek-blue-600">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-balance text-3xl font-bold text-navy sm:text-4xl">
          Registration submitted
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          Your registration has been received. ADEK will verify the information before confirming membership and sharing next steps.
        </p>

        <dl className="mx-auto mt-10 max-w-md space-y-3 text-left">
          <div className="flex items-center justify-between rounded-lg border border-dashed border-border bg-offwhite px-4 py-3">
            <dt className="text-sm text-muted-foreground">Application reference</dt>
            <dd className="text-sm font-medium text-muted-foreground">
              Will appear here
            </dd>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-dashed border-border bg-offwhite px-4 py-3">
            <dt className="text-sm text-muted-foreground">Status</dt>
            <dd className="text-sm font-medium text-navy">
              Pending verification
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaLink href="/" variant="primary">
            Return home
          </CtaLink>
          <CtaLink href="/join" variant="outline" withArrow>
            Back to membership
          </CtaLink>
        </div>
      </Container>
    </section>
  )
}
