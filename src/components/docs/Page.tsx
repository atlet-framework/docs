/**@jsx h */
import { Props, h } from 'https://deno.land/x/atlet@1.3.0/mod.ts'

type DocumentationPageProps = {
  title: string
  previous?: {
    href: string
    name: string
  }
  next?: {
    href: string
    name: string
  }
}

export function DocumentationPage(props: Props & DocumentationPageProps) {
  return (
    <div class="space-y-5 pb-5">
      <h1 class="text-4xl">{props.title}</h1>
      {props.children}
      <div class="flex pt-5 space-x-5">
        <div class="flex-1 flex">
          {props.previous && (
            <a 
              href={props.previous.href} 
              class="flex-1 bg-gray-400/10 rounded-md hover:opacity-70 py-3 px-5 font-medium inline-block group">
              <div class="flex flex-row items-center space-x-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-white w-6 h-6" viewBox="0 -960 960 960" alt="arrow backward">
                  <path d="m297.92-442.123 235.696 235.696L480-153.304 153.304-480 480-806.855l53.616 53.282L297.92-517.877h508.935v75.754H297.92Z"/>
                </svg>
                <div class="flex flex-col justify-start">
                  <p class="text-gray-400 text-xs uppercase font-medium">previous</p>
                  <p class="group-hover:underline sm:text-lg text-md">{props.previous.name}</p>
                </div>
              </div>
            </a>
          )}
        </div>
        <div class="flex-1 flex">
          {props.next && (
            <a 
              href={props.next.href} 
              class="flex-1 bg-gray-400/10 rounded-md hover:opacity-70 py-3 px-5 font-medium inline-block group">
              <div class="flex flex-row justify-end items-center space-x-5">
                <div class="flex flex-col justify-start">
                  <p class="text-gray-400 text-xs uppercase font-medium">next</p>
                  <p class="group-hover:underline sm:text-lg text-md">{props.next.name}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-white w-6 h-6" viewBox="0 -960 960 960" alt="arrow forward">
                  <path d="M662.08-442.123H153.304v-75.754H662.08L426.384-753.573 480-806.855 806.855-480 480-153.304l-53.616-53.123L662.08-442.123Z"/>
                </svg>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

type DocumentationSectionProps = {
  title?: string
  id?: string
}

export function DocumentationSection(props: Props & DocumentationSectionProps) {
  return (
    <div class="space-y-2">
      {props.title && (
        <h1 class="text-2xl  section" id={props.id ?? null}>
          {props.title}
          <button class="px-2 opacity-50 text-lg hover:opacity-100" onclick={`copy(this, '${props.id}')`}>🔗</button>
        </h1>
      )}
      {props.children}
    </div>
  )
}