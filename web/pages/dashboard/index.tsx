import { GetServerSideProps } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import React, { FunctionComponent } from "react";
import Dashboard from "../../domain/Dashboard";
import { injectCookieService } from "../../service";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const service = injectCookieService(ctx.req?.headers?.cookie);

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
    console.log("Error occurred:", e);

    return {
      notFound: true,
    };
  }
};

export default DashboardPage;
