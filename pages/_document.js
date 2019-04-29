import Document, { Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { ThemeProvider } from 'baseui'
import { styletron } from '../styletron'

import Jasmine from '../themes'

class MyDocument extends Document {
  static getInitialProps (props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <ThemeProvider theme={Jasmine}>
          <App {...props} />
        </ThemeProvider>
      </StyletronProvider>
    ))
    const stylesheets = styletron.getStylesheets() || []
    return { ...page, stylesheets }
  }

  render () {
    return (
      <html>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className='_styletron_hydrate_'
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/inter-ui@3.5.0/inter.min.css'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
