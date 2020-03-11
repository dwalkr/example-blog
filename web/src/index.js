import ReactDOM from 'react-dom'
import { RedwoodProvider } from '@redwoodjs/web'
import netlifyIdentity from 'netlify-identity-widget'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { Tina, TinaCMS } from 'tinacms'

import FatalErrorBoundary from 'src/lib/FatalErrorBoundary'
import Routes from 'src/Routes'

import './index.css'

if (process.env.USE_AUTHENTICATION === 'true') {
  window.netlifyIdentity = netlifyIdentity
  netlifyIdentity.init()
}

const cms = new TinaCMS({
  sidebar: {
    hidden: false,
    position: 'displace',
  },
})

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <Tina cms={cms}>
        <Routes />
      </Tina>
    </RedwoodProvider>
  </FatalErrorBoundary>,
  document.getElementById('hammer-app')
)
