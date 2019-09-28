import less from 'dahlia-less'
import antd from 'dahlia-antd'
import styledJsx from 'dahlia-styled-jsx'
import darkTheme from '@ant-design/dark-theme'
import { Configuration } from 'dahlia-scripts'
import { join } from 'path'

 const config: Configuration = {
   title: 'Tie',
   plugins: [
     less({
       modifyVars: darkTheme,
       javascriptEnabled: true,
     }),
     antd(),
     styledJsx(),
   ],
   appHtml: join(process.cwd(), 'public', 'tie-dev-dashboard.html'),
 }

export default config