import * as React from 'react'
import './CopyButton.css'

interface ICopyButton {
  readonly onClick: () => void
}

export class CopyButton extends React.Component<ICopyButton, {}> {

  public render() {
    return (
      <button
        className="copy-button"
        title="Copy to clipboard"
        onClick={this.props.onClick}
      />
    )
  }
}