import React from "react"
import { Layout } from "../components/layout"
import { TodoContainer } from "../containers/todoContainer"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export const BoardPage: React.FC = () => {
  return <Layout>
    <DndProvider backend={HTML5Backend}>
      <TodoContainer />
    </DndProvider>
  </Layout>
}
