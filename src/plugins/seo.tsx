/**@jsx h */
import { h } from 'https://deno.land/x/atlet@1.4.1/mod.ts'

type SEOConfig = {
  title?: string
  description?: string
  link?: string
  image?: string
}

export function seo(seoConf: SEOConfig) {
  const tags = [
    <meta content="Atlet" property="og:site_name " />,
  ]

  if (seoConf.title) {
    tags.push(
      <meta content={seoConf.title} property="og:title " />,
      <meta content={seoConf.title} name="twitter:title" />
    )
  }
  
  if (seoConf.description) {
    tags.push(
      <meta content={seoConf.description} property="og:description" />,
      <meta content={seoConf.description} name="description" />,
      <meta content={seoConf.description} name="twitter:description" />
    )
  }

  if (seoConf.link) {
    tags.push(
      <meta content={seoConf.link} property="og:url " />,
      <meta content={seoConf.link} name="twitter:site" />,
    )
  }

  if (seoConf.image) {
    tags.push(
      <meta content={seoConf.image} property="og:image " />,
      <meta content={seoConf.image} name="twitter:image" />,
      <meta content={seoConf.image} name="twitter:image:alt" />,
    )
  }

  return tags
}