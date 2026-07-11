import { useEffect, useState } from "react"
import { getAllPosts } from "../services/postService"
import { getAllTopics } from "../services/topicService"
import { getAllLikes } from "../services/likeService"

export const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [topics, setTopics] = useState([])
  const [likes, setLikes] = useState([])
  const [selectedTopic, setSelectedTopic] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getAllPosts().then(setPosts)
    getAllTopics().then(setTopics)
    getAllLikes().then(setLikes)
  }, [])

  return (
    <div className="all-posts">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
        <option value="">Topics</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>

      {posts
      .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedTopic === "" || post.topicId.toString() === selectedTopic))
      .map((post) => {
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