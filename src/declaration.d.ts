declare module '*.jpeg'
declare module '*.jpg'
declare module '*.png'

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.json' {
  const value: any
  export default value
}
