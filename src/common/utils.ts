// Make some fields of T optional
export type Optional<T, K extends string> = Omit<T, K> & Partial<T>
