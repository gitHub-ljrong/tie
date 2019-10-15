import React from 'react'
import { Timeline } from 'antd'
import { useQuery } from '@peajs/graphql'
import gql from 'gql-tag'

import { MiddlewareItem } from '../types/types'

type Data = {
  middlewareStore: MiddlewareItem[]
}

const input = gql`
  {
    _devDashboard {
      middlewareStore {
        name
        enable
        use
      }
    }
  }
`
const colors = ['#1dd1a1', '#48dbfb', '#108ee9', '#feca57', '#ff6b6b']

function randomColor() {
  const index = Math.ceil(Math.random() * colors.length)
  return colors[index]
}

export default () => {
  const { loading, data } = useQuery<Data>(input)
  if (!!loading) {
    return null
  }
  const { middlewareStore } = data
  return (
    <div>
      <Timeline mode="alternate">
        {middlewareStore.map(item => (
          <Timeline.Item key={item.name} color={randomColor()}>
            {item.name}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}
