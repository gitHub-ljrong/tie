type Pattern = string | { pattern: string; cwd?: string }
type Patterns = Pattern[]
export interface ControllerConfig {
  patterns: Patterns
}
