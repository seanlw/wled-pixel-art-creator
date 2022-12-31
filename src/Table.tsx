import * as React from 'react'
import { range } from './lib/range'
import './Table.css'
import { Pixel } from './lib/app-state'
import classNames from 'classnames'
import { ChromePicker } from 'react-color'


interface ITableProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly selectedPixel: Pixel | null
  readonly displayColorPicker: boolean
  readonly onClick: (index: number) => void
  readonly onColorChange: (color: any) => void
  readonly onColorChangeComplete: () => void
  readonly onColorPickerClose: () => void
}

interface ITableState {
  readonly displayColorPicker: boolean
}

export class Table extends React.Component<ITableProps, ITableState> {
  state = {
    displayColorPicker: this.props.displayColorPicker
  }

  public render() {
    return (
      <table
        className="pixel-table"
      >
         <tbody>
          <Rows 
            pixels={this.props.pixels}
            selectedPixel={this.props.selectedPixel || undefined}
            displayColorPicker={this.state.displayColorPicker}
            onClick={this.onClick}
            onColorChange={this.props.onColorChange}
            onColorChangeComplete={this.props.onColorChangeComplete}
            onColorPickerClose={this.onColorPickerClose}
          />
         </tbody>
      </table>
    )
  }

  private onColorPickerClose = () => {
    this.setState({displayColorPicker: false})
    this.props.onColorPickerClose()
  }

  private onClick = (index: number) => {
    if (!this.state.displayColorPicker) {
      this.setState({displayColorPicker: true})
    }
    this.props.onClick(index)
  }
}

interface IRowsProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly selectedPixel?: Pixel
  readonly displayColorPicker: boolean
  readonly onClick: (index: number) => void
  readonly onColorChange: (color: any) => void
  readonly onColorChangeComplete: () => void
  readonly onColorPickerClose: () => void
}

class Rows extends React.Component<IRowsProps, {}> {
  public render() {
    return range(0,16).map((i) => {
      const start = i * 16
      const end = start + 16
      const pixelRowState = this.props.pixels.slice(start, end)

      return (
        <Row 
          key={i}
          pixels={pixelRowState}
          selectedPixel={this.props.selectedPixel}
          displayColorPicker={this.props.displayColorPicker}
          onClick={this.props.onClick}
          onColorChange={this.props.onColorChange}
          onColorChangeComplete={this.props.onColorChangeComplete}
          onColorPickerClose={this.props.onColorPickerClose}
        />
      )
    }) 
  }
}

interface IRowProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly selectedPixel?: Pixel
  readonly displayColorPicker: boolean
  readonly onClick: (index: number) => void
  readonly onColorChange: (color: any) => void
  readonly onColorChangeComplete: () => void
  readonly onColorPickerClose: () => void
}

class Row extends React.Component<IRowProps, {}> {
  public render() {
    return (
      <tr>
        <PixelRow 
          pixels={this.props.pixels}
          selectedPixel={this.props.selectedPixel}
          displayColorPicker={this.props.displayColorPicker}
          onClick={this.props.onClick}
          onColorChange={this.props.onColorChange}
          onColorChangeComplete={this.props.onColorChangeComplete}
          onColorPickerClose={this.props.onColorPickerClose}
        />
      </tr>
    )
  }
}

interface IPixelRowProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly selectedPixel?: Pixel
  readonly displayColorPicker: boolean
  readonly onClick: (index: number) => void
  readonly onColorChange: (color: any) => void
  readonly onColorChangeComplete: () => void
  readonly onColorPickerClose: () => void
}

class PixelRow extends React.Component<IPixelRowProps, {}> {
  public render() {
    return range(0,16).map((i) => {
      const pixel = this.props.pixels[i]

      return (
        <PixelBox
          key={i}
          pixel={pixel}
          selectedPixel={this.props.selectedPixel}
          displayColorPicker={this.props.displayColorPicker}
          onClick={this.props.onClick}
          onColorChange={this.props.onColorChange}
          onColorChangeComplete={this.props.onColorChangeComplete}
          onColorPickerClose={this.props.onColorPickerClose}
        />
      )
    })
  }
}


interface IPixelBoxProps {
  readonly pixel: Pixel
  readonly selectedPixel?: Pixel
  readonly displayColorPicker: boolean
  readonly onClick: (index: number) => void
  readonly onColorChange: (color: any) => void
  readonly onColorChangeComplete: () => void
  readonly onColorPickerClose: () => void
}

class PixelBox extends React.Component<IPixelBoxProps, {}> {
  public render() {
    const pixelStyle = {
      background: this.props.pixel.hex,
      border: `2px solid ${this.props.pixel.hex}`
    }

    const selected = this.props.pixel.index === this.props.selectedPixel?.index
    const className = classNames({selected})

    return (
      <td
       style={ pixelStyle }
       className={className}
      >
        <div 
          className="color-picker-container"
          onClick={this.onClick}  
        >
          {this.renderColorPicker()}
        </div>
      </td>
    )
  }

  public renderColorPicker() {
    const selected = this.props.pixel.index === this.props.selectedPixel?.index
    
    if(!this.props.displayColorPicker || !selected) {
      return
    }
    return (
      <div>
        <div 
          className="cover"
          onClick={this.handleColorPickerClose}
        ></div>
        <div className="color-picker">
          <ChromePicker 
            color={this.props.pixel.hex}
            onChange={this.handleColorChange}
            onChangeComplete={this.handleColorChangeComplete}
          />
        </div>
      </div>
    )
  }

  private handleColorChange = (color: any, event: any) => {
    this.props.onColorChange(color)
  }

  private handleColorChangeComplete = (color: any, event: any) => {
    this.props.onColorChangeComplete()
  }

  private onClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    this.props.onClick(this.props.pixel.index)
  }

  private handleColorPickerClose = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.onColorPickerClose()
  }

}

