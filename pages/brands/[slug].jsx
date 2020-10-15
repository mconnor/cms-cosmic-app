import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllBrandsWithSlug, getBrandAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | StashBox
                </title>
                <meta
                  property="og:image"
                  content={post.metadata.logo.imgix_url}
                />
              </Head>
              <h1>{post.title}</h1>
             {/*  <PostHeader
                title={post.title}
                coverImage={post.metadata.logo}
                date={post.created_at}
                author={post.metadata.author}
              />
              <PostBody content={post.content} /> */}
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getBrandAndMorePosts(params.slug, preview)
  const content = await markdownToHtml(data.post?.metadata?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data.post,
        content,
      },
      morePosts: data.morePosts || [],
    },
  }
}

export async function getStaticPaths() {
  const allPosts = (await getAllBrandsWithSlug()) || []
  return {
    paths: allPosts.map((post) => `/brands/${post.slug}`),
    fallback: true,
  }
}
