import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import Dashboard from "../../domain/Dashboard";
import handleServerSideFetch from "../../service/handleServerSideFetch";
import { Tag } from "../../types/Tag";
import { Todo } from "../../types/Todo";

export type DashboardData = {
  data: {
    tags: Tag[];
    todo: Todo[];
  };
};

const DashboardPage: FunctionComponent<DashboardData> = ({ data }) => {
  return <Dashboard data={data} />;
};

export const getServerSideProps: GetServerSideProps = handleServerSideFetch(
  async (service) => {
    try {
      const { data: tags } = await service.get("/tags");
      const { data: todo } = await service.get("/to-do");

      return {
        props: {
          data: {
            tags: tags.tags,
            todo: todo.todos,
          },
        },
      };
    } catch (e) {
      throw e;
    }
  }
);

export default DashboardPage;
