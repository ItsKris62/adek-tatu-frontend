import Link from 'next/link'
import { FileText, ArrowRight, Download, Lock } from 'lucide-react'
import { ContentStatusBadge } from '@/components/editorial/content-status-badge'
import {
  officialDocuments,
  isDocumentAvailable,
  type OfficialDocument,
} from '@/content/documents'

function DocumentRow({ doc }: { doc: OfficialDocument }) {
  const available = isDocumentAvailable(doc)
  return (
    <div className="flex flex-col gap-4 border-t border-border py-6 first:border-t-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-secondary text-navy">
          <FileText className="size-5" aria-hidden="true" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-bold text-navy">{doc.title}</h3>
            <ContentStatusBadge status={doc.status} />
          </div>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {doc.summary}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0 sm:pl-4">
        {available && doc.fileUrl ? (
          <a
            href={doc.fileUrl}
            download={doc.downloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center gap-2 rounded-[10px] bg-gold px-4 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <Download className="size-4" aria-hidden="true" />
            Download PDF
          </a>
        ) : null}

        {available && doc.href ? (
          <Link
            href={doc.href}
            className="group inline-flex h-10 items-center gap-2 rounded-[10px] border border-navy/25 px-4 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue focus-visible:ring-offset-2"
          >
            Read online
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ) : null}

        {!available ? (
          <span
            className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-dashed border-border px-4 text-sm font-medium text-muted-foreground"
            title="This document is not yet available."
          >
            <Lock className="size-4" aria-hidden="true" />
            Not yet available
          </span>
        ) : null}
      </div>
    </div>
  )
}

export function DocumentLibrary() {
  return (
    <div>
      {officialDocuments.map((doc) => (
        <DocumentRow key={doc.title} doc={doc} />
      ))}
    </div>
  )
}
