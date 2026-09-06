/**
 * Content governance model.
 *
 * Every piece of political / institutional content is tagged with a status so
 * the UI can never silently promote unfinished material to "published".
 * Do NOT change a DRAFT or PENDING_CLIENT_INPUT item into fabricated copy.
 */
export type ContentStatus =
  | 'APPROVED'
  | 'DRAFT'
  | 'PENDING_CLIENT_INPUT'
  | 'PLACEHOLDER'
  | 'DO_NOT_PUBLISH'

export const statusLabels: Record<ContentStatus, string> = {
  APPROVED: 'Approved',
  DRAFT: 'Draft',
  PENDING_CLIENT_INPUT: 'Pending Client Input',
  PLACEHOLDER: 'Placeholder',
  DO_NOT_PUBLISH: 'Do Not Publish',
}

export const statusDescriptions: Record<ContentStatus, string> = {
  APPROVED: 'Content supplied and approved for publication.',
  DRAFT: 'Draft content — not yet finalised or officially approved.',
  PENDING_CLIENT_INPUT: 'Awaiting official content from ADEK before publication.',
  PLACEHOLDER: 'Structural placeholder illustrating a future layout.',
  DO_NOT_PUBLISH: 'Withheld from publication.',
}
