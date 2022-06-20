import React, { ReactElement } from 'react'
import styles from './BlogPosts.module.css'
import content from '../../../content/blogPosts.json'
import Container from '../atoms/Container'

interface PostParams {
  title: string
  image: string
  link: string
}

export default function BlogPosts(): ReactElement {
  const { posts } = content as { posts: PostParams[] }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Helpful Resources</h2>
      <div className={styles.postList}>
        {posts.map((post: PostParams, i: number) => (
          <a key={i} href={post.link} target="_blank" rel="noreferrer noopener">
            <div
              className={styles.post}
              style={{
                backgroundImage: `linear-gradient(
                  180deg,
                  rgba(0, 0, 102, 0) 0%,
                  rgba(0, 0, 102, 0.6) 72.44%), url(/images/blog_${post.image}.png)`
              }}
            >
              <h4 className={styles.postTitle}>{post.title}</h4>
            </div>
          </a>
        ))}
      </div>
      <a
        href="https://deltadao.medium.com/"
        className={styles.more}
        target="_blank"
        rel="noreferrer noopener"
      >
        Read more on our Medium Blog
      </a>
    </div>
  )
}
