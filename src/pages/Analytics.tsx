/**@jsx h */
/**@jsxFrag Fragment */
import { Props, h, Fragment } from 'https://deno.land/x/atlet@1.3.0/mod.ts'
import { Context, kv } from '../../main.tsx'

type PageVisitEntity = {
  url: string
  visitsCount: number
}

async function AnalyticsTable(props: Props<Context>) {
  const list = kv.list({
    prefix: ['analytics', 'page_visit'],
  })

  const items: Array<PageVisitEntity> = []
  for await (const item of list) {
    if (props.query.get('action') === 'delete') {
      await kv.delete(item.key)
    } else {
      items.push({
        url: item?.key[2].toString() ?? '',
        visitsCount: Number(item.value),
      })
    }
  }

  const sortedItems = items.sort((a, b) => {
    return a.visitsCount > b.visitsCount ? -1 : 1
  })
  const maxCount = sortedItems[0]?.visitsCount ?? 0

  return (
    <div class="border-y border-gray-300 py-3 space-y-2">
      {sortedItems.length > 0 && (
        <div class="grid grid-cols-[min-content_max-content_1fr] gap-1">
          {sortedItems.map((item) => (
            <>
              <p class="py-1 px-3 font-medium">{item.url}</p>
              <div class="py-1">
                <span class="h-full flex items-center justify-center text-xs bg-gray-700 rounded-md text-white font-medium px-2">{item.visitsCount}</span>
              </div>
              <div class="justify-self-stretch py-1">
                <div class="h-full bg-gray-700 rounded-md" style={`width: ${(item.visitsCount / maxCount) * 100}%;`}></div>
              </div>
            </>
          ))}
        </div>
      )}

      {sortedItems.length === 0 && (
        <p class="font-mono text-center">No data yet</p>
      )}

      <form action="/_/analytics?action=delete" method="POST">
        <button type="submit" class="py-3 px-5 bg-red-100 rounded-lg text-red-600 font-medium">Reset all</button>
        <input type="text" name="code" value={Deno.env.get('CODE')} hidden />
      </form>
    </div>
  )
}

export default async function Analytics(props: Props<Context>) {
  let logged = false
  let message = null
  
  if (props.request.method === 'POST') {
    const form = await props.request.formData()
    const code = form.get('code')?.toString() ?? ''

    if (code === Deno.env.get('CODE')) {
      logged = true
    } else {
      message = <p class="py-3 px-4 bg-red-100 text-red-600 rounded-lg">You entered invalid code</p>
    }
  }

  return (
    <body class="bg-gray-100 min-h-screen">
      <main v-scope class="p-4 space-y-4 mx-auto max-w-screen-lg min-h-screen flex flex-col">
        <h1 class="text-4xl">Analytics</h1>
        
        {message}

        {!logged && (
          <form method="POST" class="flex space-x-3">
            <input placeholder="Code" name="code" type="password" class="py-3 px-4 bg-gray-200 rounded-lg flex-1" />
            <button type="submit" class="bg-gray-800 py-3 px-4 font-medium rounded-md shadow-md text-white">ENTER</button>
          </form>
        )}

        {logged && <AnalyticsTable {...props} />}
        
        <a href="/" class="text-gray-700 hover:underline px-3">Go home</a>
      </main>
    </body>
  )
}