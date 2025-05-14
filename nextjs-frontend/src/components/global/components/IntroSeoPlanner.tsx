import {IntroStyle} from "@/components/global/components/home/styles/HomeStyles";
import {PageStyles} from "@/components/global/styles/NavStyles";
import Link from "next/link";
import {useUserState} from "@/state/UserState";

const IntroSeoPlanner: React.FC = () => {
    const {user} = useUserState()

    const nextStep = user? '/pages': '/signin'

    return (
        <IntroStyle>
            <div className="content">
                <h2>The SEO Planner</h2>
                <p className="general">A simple and practical pocket tool for you to maintain your website&rsquo;s SEO</p>
                <PageStyles>
                    <Link href={nextStep}>View your websites and pages</Link>
                </PageStyles>
                <p className="ethos">Empower yourself with your SEO challenges by positioning you at the centre of it </p>
            </div>
            <div className="illustration">

            </div>
        </IntroStyle>
    )
}

export default IntroSeoPlanner