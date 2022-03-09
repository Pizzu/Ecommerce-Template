import { createClient } from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"

const config = {
  projectId: "3g3mzvvg",
  dataset: "production",
  apiVersion: 'v2021-10-21',
  useCdn: false 
}

export const sanityClient = createClient(config)
export const urlFor = (source: any) => createImageUrlBuilder(config).image(source)
