import React from 'react'
import './App.css';
import { Table } from './Table'
import { AppStore } from './lib/app-store'
import { IAppState } from './lib/app-state'
import { Dispatcher } from './lib/dispatcher'
import { TextArea } from './TextArea'
import { Button } from './Button'
import { TextBox } from './TextBox'
import { ChromePicker } from 'react-color'
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
              onFillPixel={this.onFillPixel}
            />
            <div className="App-color-picker">
              <ChromePicker
                onChange={this.handleColorChange}
                color={this.state.color}
              />
              <Button
                onClick={this.handleClearCanvas}
              >
                Clear
              </Button>
            </div>
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

  private onFillPixel = (index: number) => {
    this.props.dispatcher.changePixelColor(index, this.state.color)
    this.props.dispatcher.updateWledSegment()
  }

  private handleColorChange = (color: any) => {
   this.props.dispatcher.updateColor(color)
  }

  private handleTestClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.dispatcher.testWledMatrix()
  }

  private handleIpAddressChange = (ipAddress: string) => {
    this.props.dispatcher.updateWledIpAddress(ipAddress)
  }

  private handleClearCanvas = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.dispatcher.loadInitalState()
  }
}
