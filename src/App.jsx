import React from "react"
import { Routes, Route } from "react-router-dom"
import FirmsList from "@/component/Firms/FirmsList"
import "./App.css"
import "antd/dist/antd.less"

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirmsList />} />
    </Routes>
  )
}

export default App
