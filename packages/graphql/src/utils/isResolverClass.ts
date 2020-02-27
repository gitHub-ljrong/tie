import isClass from 'is-class'

// TODO: 需要改善
export function isResolverClass(exportedValue: any) {
  return isClass(exportedValue) && exportedValue.toString().includes('Resolver')
}
