import fetch from 'node-fetch'

(async () => {
  const res = await fetch('http://localhost:9994/items')
  const text = await res.text()
  if (text !== '{"isSuccess":true,"items":[]}') {
    throw new Error('Error when get items')
  }

  const saveResponse = await fetch('http://localhost:9994/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: '{"url": "http://localhost"}'
  })
  const saveText = await saveResponse.text()
  if (saveText !== '{"isSuccess":true}') {
    throw new Error('Error when save items')
  }

  const responseAfterSave = await fetch('http://localhost:9994/items')
  const textAfterSave = await responseAfterSave.text()
  if (textAfterSave !== '{"isSuccess":true,"items":["http://localhost"]}') {
    throw new Error('Error when get items after save')
  }
})()
