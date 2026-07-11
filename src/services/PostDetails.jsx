import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPostById } from "../services/postService.jsx"
import { getUserById } from "../services/userService.jsx"
import { getAllTopics } from "../services/topicService.jsx"
import { getAllLikes, createLike } from "../services/likeService.jsx"

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [topic, setTopic] = useState(null)
  const [likes, setLikes] = useState([])

  useEffect(() => {
    getPostById(postId).then((foundPost) => {
      setPost(foundPost)
      getUserById(foundPost.userId).then(setAuthor)
      getAllTopics().then((topics) => {
        setTopic(topics.find((t) => t.id === foundPost.topicId))
      })
    })
    getAllLikes().then(setLikes)
  }, [postId])

  const handleLike = () => {
    const newLike = { userId: currentUser.id, postId: post.id }
    createLike(newLike).then(() => {
      getAllLikes().then(setLikes)
      // TODO: navigate to Favorites view once that view exists
    })
  }

  if (!post || !author || !topic) return <div>Loading...</div>

  const likeCount = likes.filter((l) => l.postId === post.id).length
  const isAuthor = currentUser && currentUser.id === post.userId

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>By: <Link to={`/users/${author.id}`}>{author.fullName}</Link></p>
      <p>Topic: {topic.name}</p>
      <p>Date: {post.date}</p>
      <p>{post.body}</p>
      <p>{likeCount} likes</p>

      {isAuthor ? (
        <button onClick={() => {/* TODO: navigate to Edit Post view once that view exists */}}>
          Edit
        </button>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}
    </div>
  )
}