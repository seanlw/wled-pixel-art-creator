import { TypedBaseStore } from './base-store'
import { 
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
  private selectedPixel: Pixel | null = null
  private displayColorPicker: boolean = false
  private wledSegment: string = ''
  private wledIpAddress: string = '0.0.0.0'
  private curlCommand: string = ''


  public getState(): IAppState {
    return {
      pixels: this.pixels,
      selectedPixel: this.selectedPixel,
      displayColorPicker: this.displayColorPicker,
      wledSegment: this.wledSegment,
      wledIpAddress: this.wledIpAddress,
      curlCommand: this.curlCommand
    }
  }

  public async loadInitialState() {
    this.pixels = range(0,256).map((i) => {
      return (
        {
          index: i,
          hex: '#fff',
          rgb: [255,255,255]
        }
      )
    })
    this.wledSegment = createSegments(this.pixels)
    this.curlCommand = curlCommand(this.wledIpAddress, this.wledSegment)

    this.emiteUpdateNow()
  }

  public async _selectPixel(index: number): Promise<void> {
    this.selectedPixel = this.pixels[index]
    this.displayColorPicker = true
    this.emitUpdate()
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
    this.selectedPixel = pixel

    this.emitUpdate()
  }

  public async _closeColorPicker(): Promise<void> {
    this.displayColorPicker = false
    this.emitUpdate()
  }

  public async _updateWledSegment(): Promise<void> {
    this.wledSegment = createSegments(this.pixels)
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