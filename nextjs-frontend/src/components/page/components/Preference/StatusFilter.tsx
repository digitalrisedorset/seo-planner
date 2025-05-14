import {Label} from "@/components/global/styles/Form";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";;
import {VenueStyle} from "@/components/page/styles/PageFilterStyles";
import {useUserState} from "@/state/UserState";

export const StatusFilter: React.FC = () => {
    const {user} = useUserState()
    const [updateUserPreference] = useUserPreference()

    if (user?.id === undefined) return

    const onStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id,{'hideComplete': e.target.value})
        })
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>Status Filter</Label>
                <select onChange={onStatusChange} className="form-select"
                        value={user.hideComplete === true ? "true" : "false"}>
                    <option value="true">Hide Completed</option>
                    <option value="false">Show Completed</option>
                </select>
            </fieldset>
        </VenueStyle>
    )
}