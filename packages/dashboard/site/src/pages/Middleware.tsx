import React from 'react'
import { Timeline, Icon } from 'antd'
import { useQuery } from '@peajs/graphql'
import { gql } from '@peajs/core'

const input = gql`
  {
    _devDashboard {
      baseDir
      middlewareStore {
        name
        enable
        use
      }
    }
  }
`

export default () => {
  const { loading, data } = useQuery(input)
  if (!!loading) {
    return null
  }
  console.log('data:', data)
  return (
    <div>
      <Timeline mode="alternate">
        <Timeline.Item>body</Timeline.Item>
        <Timeline.Item color="green">Logger</Timeline.Item>
        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
          Endpoint
        </Timeline.Item>
        <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
          Technical testing 2015-09-01
        </Timeline.Item>
      </Timeline>
      ,
    </div>
  )
}
