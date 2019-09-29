export type MiddlewareConfig = Array<{
  name: string
  use?: (...args: any) => any | void
  enable?: boolean
  matcher?: { path: string; method: string }
}>
