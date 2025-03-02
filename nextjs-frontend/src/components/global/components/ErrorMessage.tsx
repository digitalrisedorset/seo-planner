import {ErrorStyles} from "@/components/global/styles/ErrorMessage";

type ErrorProps = {
    error: string | undefined
}

export const ErrorMessage: React.FC<ErrorProps> = ({ error }: ErrorProps) => {
    if (!error) return  null

      return (
        <ErrorStyles>
          <>
            <strong>Shoot!</strong>
            {/*{error.message.replace('GraphQL error: ', '')}*/}
              {error}
          </>
        </ErrorStyles>
      );
};
