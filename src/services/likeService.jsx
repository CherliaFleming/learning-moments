
export const getAllLikes = () => {
    return fetch("http://localhost:8088/likes").then((res) => res.json())
} 
export const createLike = (like) => {
  return fetch(`http://localhost:8088/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(like),
  }).then(res => res.json())
}