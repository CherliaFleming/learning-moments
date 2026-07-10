import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/postService"
import { getAllTopics } from "../../services/topicService"
import { getAllLikes } from "../../services/likeService"
import "./AllPosts.css"

export const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [topics, setTopics] = useState([])
  const [likes, setLikes] = useState([])

  useEffect(() => {
    getAllPosts().then(setPosts)
    getAllTopics().then(setTopics)
    getAllLikes().then(setLikes)
  }, [])

  return (
    <div className="all-posts">
      {posts.map((post) => {
        const topic = topics.find((t) => t.id === post.topicId)
        const likeCount = likes.filter((l) => l.postId === post.id).length

        return (
          <div className="post-card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{topic?.name}</p>
            <p>{likeCount} likes</p>
          </div>
        )
      })}
    </div>
  )
}