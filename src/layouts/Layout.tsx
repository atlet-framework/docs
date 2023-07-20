/** @jsx h */
import { Props, h } from 'https://deno.land/x/atlet@1.0.0/mod.ts'
import Navbar from '../components/Navbar.tsx'

export default function Layout(props: Props) {
  props.page.title = 'Atlet'
  props.page.head.push(
    <link rel="stylesheet" href="/css/code-theme.css" />,
    <link rel="icon" href="/img/favicon.png" />,
    <link rel="manifest" href="/manifest.json" />,
    <link rel="apple-touch-icon" href="/img/logo.png" />,
    <meta name="apple-mobile-web-app-capable" content="yes" />,
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />,
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,500,0,0" />,
  )

  return (
    <body class="bg-white min-h-screen">
      <main v-scope class="px-0 lg:px-4 mx-auto max-w-screen-lg min-h-screen flex flex-col">
        <Navbar {...props} />
        <div class=" flex-1 flex flex-col">
          {props.children}
        </div>
      </main>
      <footer class="py-5 bg-white border-t border-gray-200">
        <p class="text-center text-gray-500 font-medium">Made with ❤️ by <a href="https://github.com/Hladikes" class="hover:underline text-indigo-600">Hladikes</a></p>
      </footer>
    </body>
  )
}