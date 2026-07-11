import { useEffect, useState } from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { AllPosts } from "../components/AllPosts.jsx"
import { NavBar } from "../components/nav/NavBar.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts />} />
      </Route>
    </Routes>
  )
}