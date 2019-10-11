import less from 'pea-less'
import antd from 'pea-antd'
import styledJsx from 'pea-styled-jsx'
import darkTheme from '@ant-design/dark-theme'
// import { Configuration } from 'pea-cli'
import { join } from 'path'

// const config: Configuration = {
const config = {
  title: 'Tie',
  outputHtml: 'tie-dev-dashboard.html',
  appHtml: join(process.cwd(), 'public', 'tie-dev-dashboard.html'),
  plugins: [
    less({
      modifyVars: darkTheme,
      javascriptEnabled: true,
    }),
    antd(),
    styledJsx(),
  ],
}

export default config
