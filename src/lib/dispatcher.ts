import { timeStamp } from 'console'
import { AppStore } from './app-store'

export class Dispatcher {
  private readonly appStore: AppStore

  public constructor(appStore: AppStore) {
    this.appStore = appStore
  }

  public loadInitalState(): Promise<void> {
    return this.appStore.loadInitialState()
  }

  public selectPixel(index: number): Promise<void> {
    return this.appStore._selectPixel(index)
  }

  public changePixelColor(index: number, color: any): Promise<void> {
    return this.appStore._changePixelColor(index, color)
  }

  public closeColorPicker(): Promise<void> {
    return this.appStore._closeColorPicker()
  }

  public updateWledSegment(): Promise<void> {
    return this.appStore._updateWledSegment()
  }

  public testWledMatrix(): Promise<void> {
    return this.appStore._testMatrix()
  }

  public updateWledIpAddress(ipAddress: string): Promise<void> {
    return this.appStore._updateIpAddress(ipAddress)
  }

}