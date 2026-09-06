'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, Loader2, AlertCircle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CtaButton, CtaLink } from '@/components/editorial/cta'

const steps = ['Privacy & Consent', 'Member Details', 'Review & Submit'] as const
const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Kiambu', 'Nakuru', 'Uasin Gishu', 'Machakos']
const constituencies: Record<string, string[]> = {
  Nairobi: ['Westlands', 'Kasarani', 'Embakasi South', 'Dagoretti North'],
  Mombasa: ['Mvita', 'Nyali', 'Likoni', 'Kisauni'],
  Kisumu: ['Kisumu Central', 'Seme', 'Nyando', 'Muhoroni'],
  Kiambu: ['Ruiru', 'Thika Town', 'Kiambu', 'Gatundu South'],
  Nakuru: ['Nakuru Town East', 'Nakuru Town West', 'Naivasha', 'Bahati'],
  'Uasin Gishu': ['Ainabkoi', 'Kapsaret', 'Kesses', 'Moiben'],
  Machakos: ['Machakos Town', 'Mavoko', 'Kangundo', 'Yatta'],
}
type SubmitState = 'idle' | 'loading' | 'error' | 'success'
type FormData = { fullName: string; email: string; phone: string; county: string; constituency: string; idNumber: string; occupation: string }
const emptyForm: FormData = { fullName: '', email: '', phone: '', county: '', constituency: '', idNumber: '', occupation: '' }

export function ApplicationShell() {
  const [step, setStep] = useState(0)
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [formError, setFormError] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const availableConstituencies = useMemo(() => constituencies[form.county] ?? [], [form.county])
  const update = (key: keyof FormData, value: string) => setForm((current) => ({ ...current, [key]: value, ...(key === 'county' ? { constituency: '' } : {}) }))

  function next() {
    if (step === 0 && !consent) return setConsentError(true)
    if (step === 1) {
      const missing = Object.entries(form).find(([, value]) => !value.trim())
      if (missing) return setFormError('Please complete every member detail before continuing.')
      setFormError('')
    }
    setStep((current) => Math.min(current + 1, 2))
  }

  async function submit() {
    setState('loading')
    try {
      const response = await fetch('/api/membership/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Registration failed')
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2" aria-label="Registration progress">
        {steps.map((label, index) => <li key={label} className="flex flex-1 items-center gap-3"><span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold', index < step && 'border-transparent bg-adek-blue text-white', index === step && 'border-navy bg-navy text-white', index > step && 'border-border bg-background text-muted-foreground')}>{index < step ? <Check className="size-4" aria-hidden="true" /> : index + 1}</span><span className={cn('text-sm font-medium', index === step ? 'text-navy' : 'text-muted-foreground')}>{label}</span>{index < 2 && <span className="hidden h-px flex-1 bg-border sm:block" />}</li>)}
      </ol>

      <div className="mt-8 border-t border-border pt-8">
        {step === 0 && <div>
          <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-gold-600"><ShieldCheck className="size-5" aria-hidden="true" /></span><div><h2 className="text-lg font-bold text-navy">Privacy & consent</h2><p className="mt-1 max-w-prose text-sm leading-relaxed text-muted-foreground">Your information will be used only to process ADEK membership registration and maintain the member register.</p></div></div>
          <label htmlFor="consent" className={cn('mt-6 flex cursor-pointer items-start gap-3 rounded-xl border p-4', consentError && !consent ? 'border-destructive/50 bg-destructive/5' : 'border-border')}><input id="consent" type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setConsentError(false) }} className="mt-0.5 size-5 shrink-0 accent-[var(--navy)]" /><span className="text-sm leading-relaxed text-foreground/90">I consent to ADEK collecting and processing the information below for membership administration.</span></label>
          {consentError && !consent && <p role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-destructive"><AlertCircle className="size-4" aria-hidden="true" />Consent is required to continue.</p>}
          <div className="mt-8 flex justify-end"><CtaButton onClick={next} variant="primary" withArrow>Continue</CtaButton></div>
        </div>}

        {step === 1 && <div><h2 className="text-lg font-bold text-navy">Member details</h2><p className="mt-2 text-sm text-muted-foreground">Complete the approved registration fields. All fields are required.</p><div className="mt-6 grid gap-5 sm:grid-cols-2">
          {([['fullName', 'Full name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone number', 'tel'], ['idNumber', 'National ID number', 'text'], ['occupation', 'Occupation', 'text']] as const).map(([key, label, type]) => <label key={key} className={cn('flex flex-col gap-2', key === 'fullName' && 'sm:col-span-2')}><span className="text-sm font-semibold text-navy">{label}</span><input value={form[key]} onChange={(event) => update(key, event.target.value)} type={type} className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-adek-blue focus:ring-2 focus:ring-adek-blue/20" required /></label>)}
          <label className="flex flex-col gap-2"><span className="text-sm font-semibold text-navy">County</span><select value={form.county} onChange={(event) => update('county', event.target.value)} className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-adek-blue" required><option value="">Select county</option>{counties.map((county) => <option key={county}>{county}</option>)}</select></label>
          <label className="flex flex-col gap-2"><span className="text-sm font-semibold text-navy">Constituency</span><select value={form.constituency} onChange={(event) => update('constituency', event.target.value)} disabled={!form.county} className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-adek-blue disabled:cursor-not-allowed disabled:opacity-50" required><option value="">Select constituency</option>{availableConstituencies.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>{formError && <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-destructive"><AlertCircle className="size-4" />{formError}</p>}<div className="mt-8 flex items-center justify-between"><CtaButton onClick={() => setStep(0)} variant="outline"><ArrowLeft className="size-4" />Back</CtaButton><CtaButton onClick={next} variant="primary" withArrow>Review details</CtaButton></div></div>}

        {step === 2 && <div><h2 className="text-lg font-bold text-navy">Review & submit</h2>{state === 'success' ? <div className="mt-4 rounded-xl border border-adek-blue/30 bg-adek-blue/5 p-6 text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-adek-blue text-white"><Check className="size-6" /></span><p className="mt-4 text-lg font-bold text-navy">Registration submitted</p><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Your membership registration has been received and is awaiting verification by ADEK.</p><div className="mt-6 flex justify-center"><CtaLink href="/join/confirmation" variant="primary" withArrow>View confirmation</CtaLink></div></div> : <><dl className="mt-5 grid gap-3 rounded-xl border border-border bg-offwhite p-5 text-sm sm:grid-cols-2">{Object.entries({ 'Full name': form.fullName, Email: form.email, Phone: form.phone, County: form.county, Constituency: form.constituency, Occupation: form.occupation }).map(([label, value]) => <div key={label}><dt className="text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold text-navy">{value}</dd></div>)}</dl>{state === 'error' && <p role="alert" className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"><AlertCircle className="size-4" />We could not submit your registration. Please try again.</p>}<div className="mt-8 flex items-center justify-between"><CtaButton onClick={() => setStep(1)} variant="outline"><ArrowLeft className="size-4" />Edit details</CtaButton><CtaButton onClick={submit} variant="primary" disabled={state === 'loading'}>{state === 'loading' ? <><Loader2 className="size-4 animate-spin" />Submitting…</> : <>Submit registration<ArrowRight className="size-4" /></>}</CtaButton></div></>}</div>}
      </div>
      <p className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">Registration is currently active. Submissions are subject to verification and approval. <Link href="/privacy" className="link-underline font-medium text-navy">Read the privacy notice</Link>.</p>
    </div>
  )
}
