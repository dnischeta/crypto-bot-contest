// Monitoring system may be connected later (eg. Sentry)

export function log(error: Error, context?: Record<string, any>) {
    console.error({
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context,
    })
}
