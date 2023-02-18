import { useState } from 'react';

import { Row, Button } from 'react-bootstrap';
import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import FilteringMenu from 'components/FilteringMenu';

import { useGetBlogsPages } from 'actions/pagination';
import { getAllBlogs } from 'lib/api';

export default function Home({blogs}) {
  const [filter, setFilter] = useState({
    view: { list: 0 }
  });

  // loadMore: load more data
  // isLoadingMore: true when making request to fetch data
  // isReachingEnd: true when all data is loaded or data is empty
  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore
  } = useGetBlogsPages({blogs, filter});

  return (
    <PageLayout>
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) =>
          setFilter({...filter, [option]: value})
        }
      />
      <hr/>
      <Row className="mb-5">
        {pages}
      </Row>
      <div style={{textAlign: 'center'}}>
        <Button
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
          variant="outline-secondary"
          size="lg"
          >
            {isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'Load more'}
        </Button>

      </div>
    </PageLayout>
  )
}

export async function getStaticProps() {
  const blogs = await getAllBlogs({offset: 0});
  return {
    props: {
      blogs
    }
  }
}