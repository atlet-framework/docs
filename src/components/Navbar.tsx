/**@jsx h */
import { Props, h } from 'https://deno.land/x/atlet@1.3.0/mod.ts'

export default function Navbar(props: Props) {
  return (
    <nav class="sticky top-0 z-50 flex flex-row items-center justify-between border-b border-gray-400/20 bg-gradient-to-b from-white via-white/90 to-white/80 dark:from-stone-900 dark:via-stone-900 backdrop-blur-sm">
      <div class="flex self-stretch items-center">
        {props.url.pathname.startsWith('/doc') && (
          <button 
            v-on:click="menuVisible = !menuVisible" 
            class="self-stretch inline-flex items-center px-4 lg:hidden group transition-transform"
            v-bind:class="{
              '-translate-x-1': menuVisible,
            }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 dark:fill-white" viewBox="0 -960 960 960" alt="menu">
              <path d="M113.304-230.195v-75.913h733.551v75.913H113.304Zm0-211.928v-75.754h733.551v75.754H113.304Zm0-211.769v-75.913h733.551v75.913H113.304Z"/>
            </svg>
          </button>
        )}

        <a href="/" class="text-xl pl-3 flex items-center space-x-3">
          <img src="/img/logo.png" alt="atlet logo" class="h-6 w-6" />
          <span>Atlet</span>
        </a>
      </div>
      <div class="flex flex-row">
        <a 
          href="https://github.com/atlet-framework/atlet" 
          target="_blank"
          class="justify-self-stretch flex items-center px-3 hover:bg-gray-400/10">
          <img src="/img/github-mark.svg" alt="github" class="h-7 p-0.5 bg-white rounded-full" />
        </a>
        <a 
          href='/' 
          class={`p-4 font-medium hover:underline hover:bg-gray-400/10 ${props.url.pathname === '/' ? '' : 'opacity-80'}`}>Home</a>
        <a 
          href='/docs/intro' 
          class={`p-4 font-medium hover:underline hover:bg-gray-400/10 ${props.url.pathname.startsWith('/docs') ? '' : 'opacity-80'}`}>Docs</a>
      </div>
    </nav>
  )
}