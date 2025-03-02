import {useSignOut} from "../graphql/useSignOut";
import {useRouter} from "next/router";
import {useFlashMessage} from "@/state/FlassMessageState";

export const SignOut: React.FC = () => {
  const [signout] = useSignOut();
  const router = useRouter()
  const {addSuccessMessage} = useFlashMessage()

  function handleSignout() {
    signout()
    addSuccessMessage('You are now logged out')
    router.push({pathname: `/`});
  }

  return (
    <button type="button" onClick={handleSignout}>
      Sign Out
    </button>
  );
}
