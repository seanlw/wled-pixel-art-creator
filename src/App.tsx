import React from 'react'
import './App.css';
import { Table } from './Table'
import { AppStore } from './lib/app-store'
import { IAppState } from './lib/app-state'
import { Dispatcher } from './lib/dispatcher'
import { TextArea } from './TextArea'
import { Button } from './Button'
import { TextBox } from './TextBox'
import wledlogo from './wled_logo_akemi.png'

interface IAppProps {
  readonly appStore: AppStore
  readonly dispatcher: Dispatcher
}

export class App extends React.Component<IAppProps, IAppState> {
  state = this.props.appStore.getState()

  public constructor(props: IAppProps) {
    super(props)

    this.props.dispatcher.loadInitalState()
  }

  public componentDidMount(): void {
    this.props.appStore.onDidUpdate(state => {
      this.setState(state)
    })
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={wledlogo} className="App-logo" alt="logo" />
          Pixel Art Creator
        </header>
        <div className="App-content">
          <div className="App-table">
            <Table
              pixels={this.state.pixels}
              selectedPixel={this.state.selectedPixel}
              displayColorPicker={this.state.displayColorPicker}
              onClick={this.onPixelClick}
              onColorChange={this.handleColorChange}
              onColorChangeComplete={this.handleColorChangeComplete}
              onColorPickerClose={this.handleClose}
            />
          </div>
          <div className="App-editor">
            <div className="wled-test">
              <TextBox 
                label='WLED IP Address'
                onValueChange={this.handleIpAddressChange}
              />
              <Button
                onClick={this.handleTestClick}
              >
                Test
              </Button>
            </div>
            <TextArea
              value={this.state.curlCommand}
            />
          </div>
        </div>
      </div>
    )
  }

  private onPixelClick = (index: number) => {
    this.props.dispatcher.selectPixel(index)
  }

  private handleColorChange = (color: any) => {
    if (this.state.selectedPixel) {
      this.props.dispatcher.changePixelColor(this.state.selectedPixel.index, color)
    }
  }

  private handleColorChangeComplete = () => {
    this.props.dispatcher.updateWledSegment()
  }

  private handleClose = () => {
    this.props.dispatcher.closeColorPicker()
  }

  private handleTestClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.dispatcher.testWledMatrix()
  }

  private handleIpAddressChange = (ipAddress: string) => {
    this.props.dispatcher.updateWledIpAddress(ipAddress)
  }
}
