/** @jsx h */
/** @jsxFrag Fragment */
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createHandler, h, Props, NOT_FOUND, MIDDLEWARE, json, redirect, Config } from 'https://deno.land/x/atlet@1.1.0/mod.ts'
import Home from './src/pages/Home.tsx'
import Intro from './src/pages/docs/Intro.tsx'
import Routes from './src/pages/docs/Routes.tsx'
import NotFound from './src/pages/NotFound.tsx'
import PropsPage from './src/pages/docs/Props.tsx'
import LayoutsPage from './src/pages/docs/Layouts.tsx'
import Context from './src/pages/docs/Context.tsx'
import Middleware from './src/pages/docs/Middleware.tsx'
import StaticFiles from './src/pages/docs/StaticFiles.tsx'
import Forms from './src/pages/docs/Forms.tsx'
import RestApi from './src/pages/docs/RestApi.tsx'
import NotFoundPage from './src/pages/docs/NotFoundPage.tsx'
import Interactivity from './src/pages/docs/Interactivity.tsx'
import ConfigPage from './src/pages/docs/ConfigPage.tsx'
import Analytics from './src/pages/Analytics.tsx'

const config: Config = {
  static: './static',
  unoCSS: true,
}

export type Context = {
  kv: Deno.Kv
}

export const kv = await Deno.openKv()

const handler = await createHandler({
  [MIDDLEWARE]: (props) => {
    const page = props.url.href.replace(props.url.origin, '')

    if (!page.includes('.') && !page.includes('/_/')) {
      kv.atomic()
        .mutate({
          type: 'sum',
          key: ['analytics', 'page_visit', page],
          value: new Deno.KvU64(1n),
        })
        .commit()
    }
  },
  '/_/analytics': Analytics,
  '/': Home,
  '/docs': () => redirect('/docs/intro'),
  '/docs/intro': Intro,
  '/docs/routes': Routes,
  '/docs/props': PropsPage,
  '/docs/context': Context,
  '/docs/layouts': LayoutsPage,
  '/docs/middleware': Middleware,
  '/docs/static-files': StaticFiles,
  '/docs/forms': Forms,
  '/docs/rest-api': RestApi,
  '/docs/not-found': NotFoundPage,
  '/docs/interactivity/api/random': async () => {
    await new Promise(r => setTimeout(r, 1000))
    return json({
      randomNumber: 1 + Math.random() * 100 | 0,
    })
  },
  '/docs/interactivity': Interactivity,
  '/docs/config': ConfigPage,
  [NOT_FOUND]: NotFound,
}, config)

serve(handler, {
  port: 6969,
  hostname: 'localhost',
  onListen(params) {
    console.log('[i] Server is running', `http://${params.hostname}:${params.port}`)
  },
})
