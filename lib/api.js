import client from './sanity';
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client);

const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  coverImage,
  'author': author->{authorName, 'authorImage':authorImage.asset->url},
`

export function urlFor(src) {
  return builder.image(src);
}

export async function getAllBlogs({offset} = {offset: 0}) {
  const results = await client
    .fetch(`*[_type == "blog"] | order(date desc) { ${blogFields} }[${offset}...${offset + 3}]`);
  return results;
}

export async function getBlogBySlug(slug) {
  const result = await client
    .fetch(`*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset": asset->}
    }`, {slug}).then(res => res?.[0])

  return result;
}