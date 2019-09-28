export interface RouteItem {
  method: string
  methodName: string
  path: string
  handler: any
  instance: any
  view: string
  fn: (...args: any[]) => any
  target: Object
  propertyKey: string
}
