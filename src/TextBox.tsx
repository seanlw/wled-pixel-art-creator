import * as React from 'react'
import classNames from 'classnames'
import './TextBox.css'

interface ITextBoxProps {
  readonly label?: string | JSX.Element
  readonly value?: string
  readonly className?: string
  readonly placeholder?: string
  readonly onValueChange?: (value: string) => void 
}

interface ITextBoxState {
  readonly value?: string
  readonly inputId?: string
}

export class TextBox extends React.Component<ITextBoxProps, ITextBoxState> {
  state = {
    inputId: `TextBox_${this.props.label || this.props.placeholder}`,
    value: this.props.value
  }

  public render() {
    const className = classNames('text-box-component', this.props.className)

    return (
      <div className={className}>
        {this.renderLabel()}
        <input
          id={this.state.inputId}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }

  private renderLabel() {
    if (!this.props.label){
      return null
    }
    
    return (
      <div className="label-container">
        <label htmlFor={this.state.inputId}>{this.props.label}</label>
      </div>
    )
  }

  private onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    this.setState({ value }, () => {
      if (this.props.onValueChange) {
        this.props.onValueChange(value)
      }
    })
  }
}