import React from 'react'
import { Table } from 'antd'
import { useQuery } from '@peajs/graphql'
import { gql } from '@peajs/core'
import { RouteItem } from '../types/types'

const input = gql`
  {
    _devDashboard {
      routerStore {
        instance
        method
      }
    }
  }
`

type Data = {
  routerStore: RouteItem[]
}

const columns = [
  {
    title: 'path',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'method',
    dataIndex: 'method',
    key: 'method',
  },
  {
    title: 'Controller',
    dataIndex: 'instance',
    key: 'instance',
  },
]

export default () => {
  const { loading, data } = useQuery<Data>(input)
  if (!!loading) return null

  const { routerStore } = data
  console.log('routerStore:', routerStore)
  return (
    <Table
      bordered
      rowKey={(record: RouteItem) => record.path + record.method}
      dataSource={routerStore}
      columns={columns}
    />
  )
}