import * as React from 'react'
import { range } from './lib/range'
import './Table.css'
import { 
  MouseButton, 
  Pixel 
} from './lib/app-state'

interface ITableProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly onFillPixel: (index: number) => void
}

interface ITableState {
  readonly drawing: boolean
}

export class Table extends React.Component<ITableProps, ITableState> {
  state = {
    drawing: false
  }

  public render() {
    return (
      <table
        className="pixel-table"
      >
         <tbody>
          <Rows 
            pixels={this.props.pixels}
            drawing={this.state.drawing}
            onFillPixel={this.onFillPixel}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          />
         </tbody>
      </table>
    )
  }

  private onFillPixel = (index: number) => {
    this.props.onFillPixel(index)
  }

  private onMouseDown = (e: React.MouseEvent<HTMLTableCellElement>) => {
    this.setState({ drawing: true })
  }

  private onMouseUp = (e: React.MouseEvent<HTMLTableCellElement>) => {
    this.setState({ drawing: false })
  }
}

interface IRowsProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly drawing: boolean
  readonly onFillPixel: (index: number) => void
  readonly onMouseDown: (e: React.MouseEvent<HTMLTableCellElement>) => void
  readonly onMouseUp: (e: React.MouseEvent<HTMLTableCellElement>) => void
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
          drawing={this.props.drawing}
          onFillPixel={this.props.onFillPixel}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
        />
      )
    }) 
  }
}

interface IRowProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly drawing: boolean
  readonly onFillPixel: (index: number) => void
  readonly onMouseDown: (e: React.MouseEvent<HTMLTableCellElement>) => void
  readonly onMouseUp: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

class Row extends React.Component<IRowProps, {}> {
  public render() {
    return (
      <tr>
        <PixelRow 
          pixels={this.props.pixels}
          drawing={this.props.drawing}
          onFillPixel={this.props.onFillPixel}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
        />
      </tr>
    )
  }
}

interface IPixelRowProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly drawing: boolean
  readonly onFillPixel: (index: number) => void
  readonly onMouseDown: (e: React.MouseEvent<HTMLTableCellElement>) => void
  readonly onMouseUp: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

class PixelRow extends React.Component<IPixelRowProps, {}> {
  public render() {
    return range(0,16).map((i) => {
      const pixel = this.props.pixels[i]

      return (
        <PixelBox
          key={i}
          pixel={pixel}
          drawing={this.props.drawing}
          onFillPixel={this.props.onFillPixel}
          onMouseDown={this.props.onMouseDown}
          onMouseUp={this.props.onMouseUp}
        />
      )
    })
  }
}


interface IPixelBoxProps {
  readonly pixel: Pixel
  readonly drawing: boolean
  readonly onFillPixel: (index: number) => void
  readonly onMouseDown: (e: React.MouseEvent<HTMLTableCellElement>) => void
  readonly onMouseUp: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

class PixelBox extends React.Component<IPixelBoxProps, {}> {
  public render() {
    const pixelStyle = {
      background: this.props.pixel.hex,
      border: `2px solid ${this.props.pixel.hex}`
    }

    return (
      <td
       style={ pixelStyle }
       onMouseDown={this.onMouseDown}
       onMouseUp={this.onMouseUp}
       onMouseEnter={this.onMouseEnter}
      ></td>
    )
  }

  private onMouseDown = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (e.button === MouseButton.Left){
      this.props.onFillPixel(this.props.pixel.index)
      this.props.onMouseDown(e)
    }
  }

  private onMouseUp = (e: React.MouseEvent<HTMLTableCellElement>) => {
    this.props.onMouseUp(e)
  }

  private onMouseEnter = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (this.props.drawing) {
      this.props.onFillPixel(this.props.pixel.index)
    }
  }

}

