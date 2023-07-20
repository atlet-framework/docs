/**@jsx h */
import { Props, h } from 'https://deno.land/x/atlet@1.0.0/mod.ts'

export default function Navbar(props: Props) {
  return (
    <nav class="sticky top-0 z-50 flex flex-row items-center justify-between border-b border-gray-200 bg-gradient-to-b from-white via-white/90 to-white/80 backdrop-blur-sm">
      <div class="flex self-stretch items-center">
        {props.url.pathname.startsWith('/doc') && (
          <button 
            v-on:click="menuVisible = !menuVisible" 
            class="self-stretch inline-flex items-center px-4 lg:hidden group transition-transform"
            v-bind:class="{
              '-translate-x-1': menuVisible,
            }">
            <span class="material-symbols-outlined">menu</span>
          </button>
        )}

        <a href="/" class="text-xl pl-3 flex items-center space-x-3">
          <img src="/img/logo.png" alt="atlet logo" class="h-8 w-8" />
          <span>Atlet</span>
        </a>
      </div>
      <div class="flex flex-row">
        <a 
          href="https://github.com/atlet-framework/atlet" 
          target="_blank"
          class="justify-self-stretch flex items-center px-3 hover:bg-black/5">
          <img src="/img/github-mark.svg" alt="github" class="h-6" />
        </a>
        <a 
          href='/' 
          class={`p-4 font-medium hover:underline hover:bg-black/5 ${props.url.pathname === '/' ? 'text-black' : 'text-gray-500'}`}>Home</a>
        <a 
          href='/docs/intro' 
          class={`p-4 font-medium hover:underline hover:bg-black/5 ${props.url.pathname.startsWith('/docs') ? 'text-black' : 'text-gray-500'}`}>Docs</a>
      </div>
    </nav>
  )
}