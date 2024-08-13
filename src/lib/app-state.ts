export interface Pixel {
  readonly index: number
  readonly hex: string
  readonly rgb: ReadonlyArray<number>
}

export interface IAppState {
  readonly pixels: ReadonlyArray<Pixel>
  readonly firstPixel: Orientation
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

export enum Orientation {
  Left,
  Right
}