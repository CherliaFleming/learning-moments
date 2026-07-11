
export const getAllLikes = () => {
    return fetch("http://localhost:8088/likes").then((res) => res.json())
} 