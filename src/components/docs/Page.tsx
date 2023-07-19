/**@jsx h */
import { Props, h } from 'https://deno.land/x/atlet@1.0.0/mod.ts'

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
              class="flex-1 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 py-3 px-5 font-medium inline-block group">
              <div class="flex flex-row items-center space-x-5">
                <span class="material-symbols-outlined !no-underline">arrow_back</span>
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
              class="flex-1 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 py-3 px-5 font-medium inline-block group">
              <div class="flex flex-row justify-end items-center space-x-5">
                <div class="flex flex-col justify-start">
                  <p class="text-gray-400 text-xs uppercase font-medium">next</p>
                  <p class="group-hover:underline sm:text-lg text-md">{props.next.name}</p>
                </div>
                <span class="material-symbols-outlined !no-underline">arrow_forward</span>
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