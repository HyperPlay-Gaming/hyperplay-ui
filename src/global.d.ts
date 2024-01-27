declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >
}

declare module '*.svg?url'
declare module '*.png'
declare module '*.png?url'
declare module '*.gif'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}
