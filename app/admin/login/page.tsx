'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Loader2, AlertCircle, KeyRound, ArrowLeft } from 'lucide-react'
import { CtaButton } from '@/components/editorial/cta'
import { loginAdmin, verifyMfa } from '@/lib/api/adminAuth'
import { ApiError } from '@/lib/api/apiClient'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mfaRequired, setMfaRequired] = useState(false)
  const [preAuthToken, setPreAuthToken] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await loginAdmin({ email, password })
      if (response.mfaRequired) {
        setMfaRequired(true)
        setPreAuthToken(response.preAuthToken)
      } else {
        router.push('/admin')
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage('Authentication failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleMfaVerify(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      await verifyMfa({ preAuthToken, totpCode })
      router.push('/admin')
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage('MFA verification failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-16 size-[420px] rounded-full border border-white/[0.06]" />
          <div className="absolute top-1/3 -left-24 size-[520px] rounded-full border border-white/[0.05]" />
        </div>
        <Link href="/" className="relative flex items-center gap-3">
          <Image src="/adek-logo.png" alt="" width={44} height={44} className="h-11 w-11" />
          <span className="font-display text-lg font-extrabold text-white">ADEK Admin</span>
        </Link>
        <div className="relative">
          <p className="max-w-sm font-display text-2xl leading-snug font-bold text-white">
            Operational tools for ADEK administration.
          </p>
          <p className="mt-3 max-w-sm text-sm text-sidebar-foreground/70">
            Secure administrative access for party operations, application review, content management and governance.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-offwhite p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src="/adek-logo.png" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-lg font-extrabold text-navy">ADEK Admin</span>
          </div>

          <h1 className="font-display text-2xl font-bold text-navy">
            {mfaRequired ? 'Two-Factor Authentication' : 'Sign in'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mfaRequired
              ? 'Enter the 6-digit verification code from your authenticator app.'
              : 'Access the ADEK administrative area.'}
          </p>

          {errorMessage && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!mfaRequired ? (
            <form className="mt-6 flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-navy">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-navy">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
                />
              </div>

              <CtaButton type="submit" variant="primary" size="lg" disabled={loading} className="mt-2 w-full">
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <Lock className="size-4" aria-hidden="true" />
                    Sign in
                  </>
                )}
              </CtaButton>
            </form>
          ) : (
            <form className="mt-6 flex flex-col gap-4" onSubmit={handleMfaVerify}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="totp" className="text-sm font-medium text-navy">
                  6-Digit Verification Code
                </label>
                <input
                  id="totp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  autoComplete="one-time-code"
                  required
                  className="h-11 rounded-lg border border-input bg-background px-3 text-center font-mono text-lg tracking-widest outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
                />
              </div>

              <CtaButton type="submit" variant="primary" size="lg" disabled={loading || totpCode.length !== 6} className="mt-2 w-full">
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Verifying…
                  </>
                ) : (
                  <>
                    <KeyRound className="size-4" aria-hidden="true" />
                    Verify Code
                  </>
                )}
              </CtaButton>

              <button
                type="button"
                onClick={() => {
                  setMfaRequired(false)
                  setPreAuthToken('')
                  setTotpCode('')
                }}
                className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-navy"
              >
                <ArrowLeft className="size-3.5" />
                Back to email & password
              </button>
            </form>
          )}

          <Link
            href="/"
            className="mt-6 inline-block text-sm text-muted-foreground transition-colors hover:text-navy"
          >
            ← Back to public site
          </Link>
        </div>
      </div>
    </div>
  )
}
