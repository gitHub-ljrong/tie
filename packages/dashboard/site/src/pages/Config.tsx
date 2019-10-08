import React from 'react'
import { useFetch } from '@peajs/rest'


export default () => {
  const { loading, data } = useFetch('/api/getTieConfig')
  if (!!loading) return null

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
