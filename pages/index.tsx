import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import { getAllBrandsForHome } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'

// metadata: {
//     name: 'T Swift',
//     username: 'tswift',
//     password: 'test',
//     profile_picture: [Object],
//     uid: '',
//     zip_code: '',
//     cannabis_approved: false
//   }

type Post =  {
    title: string;
    content: string;
}

type Posts =  {
    allPosts: Post[];
}


const Index: React.FC<Posts> = ({ allPosts })  => {
    // console.trace( allPosts[0])
    // console.trace( allPosts[0].metadata)
    // console.trace( allPosts[0].metadata.profile_picture)
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js xxx with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <h1>{heroPost.title}</h1>
  
            <HeroPost
              title={heroPost.title}
            //   coverImage={heroPost.metadata.cover_image}
              date={heroPost.created_at}npm 
              author={heroPost.metadata.author}
              slug={heroPost.slug}
              excerpt={heroPost.metadata.excerpt}
            />
      
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview }) {
  const allPosts = (await getAllBrandsForHome(preview)) || []
  return {
    props: { allPosts },
  }
}


export default Index