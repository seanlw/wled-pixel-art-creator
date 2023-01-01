import * as React from 'react'
import { range } from './lib/range'
import './Table.css'
import { Pixel } from './lib/app-state'

interface ITableProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly onClick: (index: number) => void
}

export class Table extends React.Component<ITableProps, {}> {
  public render() {
    return (
      <table
        className="pixel-table"
      >
         <tbody>
          <Rows 
            pixels={this.props.pixels}
            onClick={this.onClick}
          />
         </tbody>
      </table>
    )
  }

  private onClick = (index: number) => {
    this.props.onClick(index)
  }
}

interface IRowsProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly onClick: (index: number) => void
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
          onClick={this.props.onClick}
        />
      )
    }) 
  }
}

interface IRowProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly onClick: (index: number) => void
}

class Row extends React.Component<IRowProps, {}> {
  public render() {
    return (
      <tr>
        <PixelRow 
          pixels={this.props.pixels}
          onClick={this.props.onClick}
        />
      </tr>
    )
  }
}

interface IPixelRowProps {
  readonly pixels: ReadonlyArray<Pixel>
  readonly onClick: (index: number) => void
}

class PixelRow extends React.Component<IPixelRowProps, {}> {
  public render() {
    return range(0,16).map((i) => {
      const pixel = this.props.pixels[i]

      return (
        <PixelBox
          key={i}
          pixel={pixel}
          onClick={this.props.onClick}
        />
      )
    })
  }
}


interface IPixelBoxProps {
  readonly pixel: Pixel
  readonly onClick: (index: number) => void
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
       onClick={this.onClick}
      ></td>
    )
  }

  private onClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    this.props.onClick(this.props.pixel.index)
  }

}

