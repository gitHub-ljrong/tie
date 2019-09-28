import React from 'react'
import { modalStore } from 'dahlia/modal'
import { Button, Timeline, Icon } from 'antd'
import '../css/index.css'

export default () => (
  <div>
    hi dahlia
    <div className="home">
      styled
      <span>jsx</span>
    </div>
    <Button onClick={() => modalStore.open('ModalLogin')}>openn___</Button>
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
    <style jsx>{`
      .home {
        color: green;
      }
      span {
        color: red;
      }
    `}</style>
  </div>
)
