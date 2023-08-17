/**@jsx h */
import { withLayout, h, Props } from 'https://deno.land/x/atlet@1.3.0/mod.ts'
import Sidebar from '../components/docs/Sidebar.tsx'
import Layout from './Layout.tsx'

export default withLayout(Layout, (props: Props) => {
  props.page.head.push(
    <script src="/js/app.js" type="module"></script>,
    <script src="/js/copy.js"></script>,
    <link rel="stylesheet" href="/css/link.css" />
  )

  return (
    <div class="flex-1 flex flex-row">
      <Sidebar {...props} />
      <div class="flex-1 p-4 pb-16 relative overflow-x-hidden">
        {props.children}
      </div>
    </div>
  )
})