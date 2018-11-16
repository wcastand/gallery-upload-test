import React, { useRef, useState } from 'react'
import 'isomorphic-fetch'

export default () => {
  const node = useRef(null)
  const [src, setSrc] = useState('')
  const submit = e => {
    if (node !== null) {
      const data = new FormData(node.current)
      fetch('upload/handler', {
        method: 'POST',
        body: data,
      })
        .then(res => res.text())
        .then(url => setSrc(url))
    }
    e.preventDefault()
  }
  return (
    <div>
      <form ref={node} onSubmit={submit} encType="multipart/form-data" method="post">
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
      {src !== '' && <img src={src} />}
    </div>
  )
}
