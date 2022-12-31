import * as React from 'react'
import classNames from 'classnames'
import './Button.css'

interface IButtonProps {
  readonly disabled?: boolean
  readonly className?: string
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  readonly type?: 'submit'
  readonly children: React.ReactNode
}

export class Button extends React.Component<IButtonProps, {}> {
  public render() {
    const className = classNames('button-component', this.props.className)
    return (
      <button
        className={className}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }
}