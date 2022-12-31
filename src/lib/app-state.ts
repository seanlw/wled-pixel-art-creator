export interface Pixel {
  readonly index: number
  readonly hex: string
  readonly rgb: ReadonlyArray<number>
}

export interface IAppState {
  readonly pixels: ReadonlyArray<Pixel>
  readonly selectedPixel: Pixel | null
  readonly displayColorPicker: boolean
  readonly wledSegment: string
  readonly wledIpAddress: string
  readonly curlCommand: string
}