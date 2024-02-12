import React from "react";
import { Layout } from "../components/layout";
import { BoardsContainer } from "../containers/boardsContainer";

export const MainPage: React.FC = () => {
  return (
    <Layout>
      <BoardsContainer />
    </Layout>
  );
}