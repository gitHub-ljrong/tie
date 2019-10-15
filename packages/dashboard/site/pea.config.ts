import ModalPlugin from 'pea-plugin-modal'
import DrawerPlugin from 'pea-plugin-drawer'
import RouterPlugin from 'pea-plugin-router'
import AntdPlugin from 'pea-plugin-antd'
import LessPlugin from 'pea-plugin-less'
import RestPlugin from 'pea-plugin-rest'
import GraphqlPlugin from 'pea-plugin-graphql'
// import darkTheme from '@ant-design/dark-theme'
import { join } from 'path'

const config = {
  title: 'Dashboard',
  // buildDir: join(process.cwd(), '..', 'dist-site'),
  plugins: [
    new RouterPlugin(),
    new AntdPlugin(),
    new DrawerPlugin(),
    new ModalPlugin(),
    new RestPlugin(),
    new GraphqlPlugin(),
    // new LessPlugin({ javascriptEnabled: true, modifyVars: darkTheme }),
    new LessPlugin({ javascriptEnabled: true }),
  ],
}

export default config
