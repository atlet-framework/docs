/** @jsx h */
import { Props, h } from 'https://deno.land/x/atlet@1.3.0/mod.ts'
import Navbar from '../components/Navbar.tsx'

export default function Layout(props: Props) {
  props.page.title = 'Atlet'
  props.page.head.push(
    <link rel="stylesheet" href="/css/scrollbar.css" />,
    <link rel="stylesheet" href="/css/code-theme.css" />,
    <link rel="icon" href="/img/favicon.png" />,
    <link rel="manifest" href="/manifest.json" />,
    <link rel="apple-touch-icon" href="/img/logo.png" />,
    <meta name="apple-mobile-web-app-capable" content="yes" />,
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />,
    <link rel="stylesheet" href="https://esm.sh/@unocss/reset@0.53.4/tailwind.css" />,
  )

  return (
    <body class="bg-white dark:bg-stone-900 dark:text-stone-300 min-h-screen">
      <main v-scope class="px-0 lg:px-4 mx-auto max-w-screen-lg min-h-screen flex flex-col">
        <Navbar {...props} />
        <div class=" flex-1 flex flex-col">
          {props.children}
        </div>
      </main>
      <footer class="py-5 border-t border-gray-400/20">
        <p class="text-center font-medium">
          Built with <a href="https://github.com/atlet-framework/atlet" class="hover:underline text-indigo-500">Atlet</a> ❤️ by <a href="https://github.com/Hladikes" class="hover:underline text-indigo-500">Hladikes</a>
        </p>
      </footer>
    </body>
  )
}