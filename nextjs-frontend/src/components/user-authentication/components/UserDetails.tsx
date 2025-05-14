import {useUser} from '../hooks/useUser';
import {Form} from "../../global/styles/Form";

export const UserDetails: React.FC = () => {
    const {user} = useUserState()

    if (!user) return null

    return (
        <Form>
            <h2>Your details</h2>
            <fieldset>
                <label htmlFor="name">
                    Your Name
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        disabled
                    />
                </label>
                <label htmlFor="email">
                    Your Email
                    <input
                        type="text"
                        name="name"
                        value={user.email}
                        disabled
                    />
                </label>
            </fieldset>
        </Form>
    )
}