import React from 'react'
import { Table, Tag } from 'antd'
import { useQuery } from '@peajs/graphql'
import { gql } from '@peajs/core'
import { RouteItem } from '../types/types'
import { modalStore } from '@peajs/modal'

const input = gql`
  {
    _devDashboard {
      routerStore {
        path
        instance
        method
      }
    }
  }
`

type Data = {
  routerStore: RouteItem[]
}

const colorMaps = {
  get: '#1dd1a1',
  post: '#48dbfb',
  put: '#108ee9',
  patch: '#feca57',
  delete: '#ff6b6b',
}

const columns = [
  {
    title: 'path',
    dataIndex: 'path',
    key: 'path',
    render(path: string, route: RouteItem) {
      if (route.method === 'get') {
        return (
          <a href={path} target="_blank" rel="noopener noreferrer">
            {path}
          </a>
        )
      }
      return <div>{path}</div>
    },
  },
  {
    title: 'method',
    dataIndex: 'method',
    key: 'method',
    render(method: string) {
      return (
        <Tag color={colorMaps[method] || '#48dbfb'} style={{ textTransform: 'uppercase' }}>
          {method}
        </Tag>
      )
    },
  },
  {
    title: 'Controller',
    dataIndex: 'instance',
    key: 'instance',
  },

  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render() {
      return (
        <span>
          <a onClick={() => modalStore.open('ModalRouterDetail')}>详情</a>
        </span>
      )
    },
  },
]

export default () => {
  const { loading, data } = useQuery<Data>(input)
  if (!!loading) return null

  const { routerStore } = data
  const dataSource = routerStore.filter(item => item.path !== '/tie-dev-dashboard/*')
  return (
    <Table
      bordered
      rowKey={(record: RouteItem) => record.path + record.method}
      dataSource={dataSource}
      columns={columns}
    />
  )
}
