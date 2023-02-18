import PageLayout from "components/PageLayout";
import { getBlogBySlug, getAllBlogs } from "lib/api";
import { Row, Col } from 'react-bootstrap'
import BlogHeader from "components/BlogHeader";
import BlogContent from "components/BlogContent";
import { urlFor } from "lib/api";

const BlogDetail = ({blog}) => {
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader 
            title={blog.title} 
            subtitle={blog.subtitle} 
            author={blog.author} 
            date={blog.date} 
            coverImage={urlFor(blog.coverImage).height(400).url()} 
          />
          <hr/>
          <BlogContent content={blog.content} />
        </Col>
      </Row>
    </PageLayout>
  )
}

export async function getStaticProps({params}) {
  const blog = await getBlogBySlug(params?.slug);
  return {
    props: {blog}
  }
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map(blog =>({params: {slug: blog.slug}}))
  return {
    paths,
    fallback: false
  }
}

export default BlogDetail;