import React from 'react'
import { useFetch } from 'dahlia-rest'


export default () => {
  const { loading, data } = useFetch('/-dev-dashboard/api/getConfig')
  if (!!loading) return null

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
