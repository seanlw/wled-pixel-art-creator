import { TypedBaseStore } from './base-store'
import { 
  Orientation,
  IAppState, 
  Pixel
} from './app-state'
import { range } from './range'
import { 
  createSegments,
  curlCommand,
  testMatrix
} from './wled'

export class AppStore extends TypedBaseStore<IAppState> {
  private emitQueued = false
  private pixels: ReadonlyArray<Pixel> = []
  private color: any = {}
  private wledSegment: string = ''
  private wledIpAddress: string = '0.0.0.0'
  private curlCommand: string = ''
  private firstPixel: Orientation = Orientation.Left


  public getState(): IAppState {
    return {
      pixels: this.pixels,
      color: this.color,
      wledSegment: this.wledSegment,
      wledIpAddress: this.wledIpAddress,
      curlCommand: this.curlCommand,
      firstPixel: this.firstPixel
    }
  }

  public async loadInitialState() {
    this.color = {
      hex: '#000000',
      rgb: {
        r: 0,
        g: 0,
        b: 0
      }
    }
    this.pixels = range(0,256).map((i) => {
      return (
        {
          index: i,
          hex: '#fff',
          rgb: [255,255,255]
        }
      )
    })
    this.wledSegment = createSegments(this.pixels, this.firstPixel)
    this.curlCommand = curlCommand(this.wledIpAddress, this.wledSegment)

    this.emiteUpdateNow()
  }

  public async _changePixelColor(index: number, color: any): Promise<void> {
    const newPixels = Array.from(this.pixels)
    const pixel: Pixel = {
      index: index,
      hex: color.hex,
      rgb: [color.rgb.r, color.rgb.g, color.rgb.b]
    }
    newPixels[index] = pixel
    this.pixels = newPixels

    this.emitUpdate()
  }

  public async _updateColor(color: any): Promise<void> {
    this.color = color
    this.emitUpdate()
  }

  public async _updateWledSegment(): Promise<void> {
    this.wledSegment = createSegments(this.pixels, this.firstPixel)
    this.curlCommand = curlCommand(this.wledIpAddress, this.wledSegment)
    this.emitUpdate()
  }

  public async _testMatrix(): Promise<void> {
    testMatrix(this.wledIpAddress, this.wledSegment)
      .catch(error => console.error(error))
  }

  public async _updateIpAddress(ipAddress: string): Promise<void> {
    this.wledIpAddress = ipAddress
    this.curlCommand = curlCommand(ipAddress, this.wledSegment)
    this.emitUpdate()
  }

  private emiteUpdateNow() {
    this.emitQueued = false
    const state = this.getState()
    super.emitUpdate(state)
  }

  protected emitUpdate() {
    if (this.emitQueued) {
      return
    }
    this.emitQueued = true
    this.emiteUpdateNow()
  }
}