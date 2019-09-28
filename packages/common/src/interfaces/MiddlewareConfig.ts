export type MiddlewareConfig = Array<{
  name: string
  use: (...args: any) => any | void
  enable?: boolean
}>
