import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

export const PAGE_QUERY = gql`
  query Page($where: PageWhereUniqueInput!) {
      page(where: $where) {
        id
        slug 
        currentVersion {
            title
            keywords
            description   
        }              
        website {
            id
        }        
        ranking     
        priority   
      }
    }
`;

export const usePage = (id: string | undefined) => {
    const { data, error, refetch, loading } = useQuery(PAGE_QUERY, {
        variables: { "where": { id }},
    });

    return { pageData: data, refetchPage: refetch, error, loading }
}