export function requireFile(file: string='') {
  try {
    if (require(file).default) {
      return require(file).default
    }
  } catch {
    return null
  }
}
