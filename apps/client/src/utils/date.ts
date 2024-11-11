const fullDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
})

export function formatDateTime(date: string) {
  return fullDateFormatter.format(new Date(date))
}

export function formatDate(date: string) {
  return shortDateFormatter.format(new Date(date))
}
