import * as libs from './libs'

type HiddenItem = {
  createTime: number;
  url: string;
}

const key = process.env.NEWS_FETCHER_KEY
let items: HiddenItem[] = []
let rawSources: any[]

function assert (condition: any, statusCode: number, errorMessage: string) {
  if (!condition) {
    throw [statusCode, errorMessage]
  }
}

export async function bind (app: libs.express.Application, method: 'get' | 'post', path: string, handler: (request: libs.express.Request, response: libs.express.Response) => Promise<void>, upload?: libs.multer.Instance) {
  async function handle (request: libs.express.Request, response: libs.express.Response) {
    try {
      assert(request.query.key === key, 403, 'a key is required')
      await handler(request, response)
    } catch (error) {
      response.status(error[0]).json({
        isSuccess: false,
        errorMessage: error[1]
      })
    }
  }
  if (upload) {
    app[method](path, upload.any(), handle)
  } else {
    app[method](path, handle)
  }
}

export async function getHistory (request: libs.express.Request, response: libs.express.Response) {
  const date = Date.now() - 7 * 24 * 3600 * 1000
  items = items.filter(item => item.createTime > date)
  response.status(200).json({
    isSuccess: true,
    items: items.map(i => i.url),
    rawSources
  })
}

export async function saveHistory (request: libs.express.Request, response: libs.express.Response) {
  items.push({
    createTime: Date.now(),
    url: request.body.url
  })

  response.status(200).json({
    isSuccess: true
  })
}

export async function saveRawSources (request: libs.express.Request, response: libs.express.Response) {
  const newRawSources = request.body.rawSources
  assert(newRawSources, 400, 'rawSources is required in body')
  rawSources = newRawSources
  response.status(200).json({
    isSuccess: true
  })
}

export async function errorReport (request: libs.express.Request, response: libs.express.Response) {
    // here is error report in response.body, response.file and response.files
  response.status(200).json({
    isSuccess: true
  })
}
