import { NextResponse } from 'next/server'

const requiredFields = ['fullName', 'email', 'phone', 'county', 'constituency', 'idNumber', 'occupation'] as const

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || requiredFields.some((field) => typeof body[field] !== 'string' || !body[field].trim())) {
    return NextResponse.json({ error: 'All registration fields are required.' }, { status: 400 })
  }

  const email = body.email.trim().toLowerCase()
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  // This endpoint validates the approved form contract only. A production
  // deployment should replace this response with a secured database transaction.
  return NextResponse.json({
    accepted: true,
    status: 'PENDING_VERIFICATION',
    reference: `ADEK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
  }, { status: 202 })
}
