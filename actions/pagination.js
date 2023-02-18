import { useSWRPages } from 'swr';
import { useGetBlogs } from 'actions';
import { Col } from 'react-bootstrap';
import CardItem from 'components/CardItem';
import CardListItem from 'components/CardListItem';

export const useGetBlogsPages = ({blogs, filter}) => {
  return useSWRPages(
    'index-page',
    ({offset, withSWR}) => { // callback
      let initialData = !offset && blogs;
      const { data: paginatedBlogs } = withSWR(useGetBlogs({offset}, initialData));

      if (!paginatedBlogs) { return 'loading...' }
      
      return paginatedBlogs.map(blog => 
        !filter.view.list ?
          <Col key={`${blog.slug}-list`} md="10">
            <CardListItem 
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              author={blog.author}
              link={{
                href: '/blogs/[slug]',
                as: `/blogs/${blog.slug}`
              }}
            />
          </Col>
          :
          <Col key={blog.slug} md="4">
            <CardItem 
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              image={blog.coverImage}
              author={blog.author}
              link={{
                href: '/blogs/[slug]',
                as: `/blogs/${blog.slug}`
              }}
            />
          </Col>
        )
    },
    // compute offset to pass into prev callback
    // SWR: data from withSWR
    // index: number of current page
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) {return null;}
      return (index + 1) * 3;
    },
    [filter]
  )
}