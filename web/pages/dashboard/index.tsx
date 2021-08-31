import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import { SWRConfig } from "swr";
import Dashboard from "../../domain/Dashboard";
import endpointUrls from "../../service/endpointUrls";
import handleServerSideFetch from "../../service/handleServerSideFetch";
import { Tag } from "../../types/Tag";
import { Todo } from "../../types/Todo";

export type DashboardData = {
  tags: Tag[];
  todos: Todo[];
};

const DashboardPage: FunctionComponent<DashboardData> = ({ tags, todos }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnMount: false,
        fallback: {
          [endpointUrls.tags]: tags,
          [endpointUrls.todos]: todos,
        },
      }}
    >
      <Dashboard />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = handleServerSideFetch(
  async (service) => {
    try {
      const { data: tags } = await service.get(endpointUrls.tags);
      const { data: todos } = await service.get(endpointUrls.todos);

      return {
        props: {
          tags,
          todos,
        },
      };
    } catch (e) {
      throw e;
    }
  }
);

export default DashboardPage;
