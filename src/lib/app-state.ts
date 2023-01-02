export interface Pixel {
  readonly index: number
  readonly hex: string
  readonly rgb: ReadonlyArray<number>
}

export interface IAppState {
  readonly pixels: ReadonlyArray<Pixel>
  readonly color: any
  readonly wledSegment: string
  readonly wledIpAddress: string
  readonly curlCommand: string
}

export enum MouseButton {
  Left,
  Middle,
  Right
}