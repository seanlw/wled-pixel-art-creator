import * as React from 'react'
import './TextArea.css'
import { CopyButton } from './CopyButton'

interface ITextAreaProps {
  readonly value?: string
}

export class TextArea extends React.Component<ITextAreaProps, {}> {
  public render() {
    return (
      <pre className="segment-text">
        <CopyButton 
          onClick={this.handleCopyClick}
        />
        <code>
          {this.props.value}
        </code>
      </pre>
    )
  }

  private handleCopyClick = () => {
    navigator.clipboard.writeText(this.props.value || '')
  }
}