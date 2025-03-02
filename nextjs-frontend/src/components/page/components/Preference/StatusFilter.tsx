import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";;
import {VenueStyle} from "@/components/page/styles/PageFilterStyles";

export const StatusFilter: React.FC = () => {
    const user = useUser()
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