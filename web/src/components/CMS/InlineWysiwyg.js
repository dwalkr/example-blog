import { Wysiwyg } from 'tinacms'
import { InlineField } from 'react-tinacms-inline'

export function InlineWysiwyg({ name, children, enabled }) {
  if (!enabled) return children
  return (
    <InlineField name={name}>
      {({ input, status }) => {
        if (status === 'active') {
          return <Wysiwyg sticky={'72px'} input={input || ''} />
        }
        return children
      }}
    </InlineField>
  )
}
