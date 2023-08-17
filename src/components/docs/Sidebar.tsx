/**@jsx h */
/**@jsxFrag Fragment */
import { Props, h, Fragment } from 'https://deno.land/x/atlet@1.3.0/mod.ts'

type Links = Array<[string, string]>

const links: Links = [
  ['Intro', '/docs/intro'],
  ['Routes', '/docs/routes'],
  ['Props', '/docs/props'],
  ['Layouts', '/docs/layouts'],
  ['Middleware', '/docs/middleware'],
  ['Context', '/docs/context'],
  ['Static files', '/docs/static-files'],
  ['Forms', '/docs/forms'],
  ['Rest API', '/docs/rest-api'],
  ['Not found', '/docs/not-found'],
  ['Interactivity', '/docs/interactivity'],
  ['Config', '/docs/config'],
]

export default function Sidebar(props: Props) {
  return (
    <>
      <div 
        v-on:click="menuVisible = false"
        class="fixed z-30 w-full h-full lg:bg-transparent lg:hidden transition-colors cursor-pointer"
        v-bind:class="{
          'bg-black/10 pointer-events-auto': menuVisible,
          'pointer-events-none': !menuVisible,
        }">
      </div>
      <aside 
        class="flex flex-col border-r h-full lg:h-auto bg-white dark:bg-stone-900 border-stone-400/20 space-y-1 p-2 w-48 fixed z-40 lg:static -translate-x-48 lg:translate-x-0 transition-transform" 
        v-bind:class="{ 
          'translate-x-0': menuVisible,
          '-translate-x-48': !menuVisible,
        }">
        <div class="flex flex-col space-y-1 sticky top-16">
          {links.map(([name, href]) => (
            <a 
              href={href} 
              class={`px-2.5 py-1.5 rounded-md font-medium  hover:bg-stone-400/10 ${props.url.pathname === href ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-stone-600 dark:text-stone-300'}`}>{name}</a>
          ))}
        </div>
      </aside>
    </>
  )
}