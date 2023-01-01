import { AppStore } from './app-store'

export class Dispatcher {
  private readonly appStore: AppStore

  public constructor(appStore: AppStore) {
    this.appStore = appStore
  }

  public loadInitalState(): Promise<void> {
    return this.appStore.loadInitialState()
  }

  public changePixelColor(index: number, color: any): Promise<void> {
    return this.appStore._changePixelColor(index, color)
  }

  public updateColor(color: any): Promise<void> {
    return this.appStore._updateColor(color)
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