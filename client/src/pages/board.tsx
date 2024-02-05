import React from "react"
import { Layout } from "../components/layout"
import { TodoContainer } from "../containers/todoContainer"

export const BoardPage: React.FC = () => {
  return <Layout>
    <TodoContainer />
  </Layout>
}
