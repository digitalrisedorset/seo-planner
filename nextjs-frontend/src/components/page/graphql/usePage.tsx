import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

export const TASK_QUERY = gql`
  query Page($where: PageWhereUniqueInput!) {
      page(where: $where) {
        id
        slug 
        title      
        website {
            id
        }
        keywords
        description   
        ranking     
        priority   
      }
    }
`;

export const usePage = (id: string | undefined) => {
    const { data, error, refetch, loading } = useQuery(TASK_QUERY, {
        variables: { "where": { id }},
    });

    return { data, refetch, error, loading }
}