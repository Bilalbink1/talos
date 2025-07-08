import PageLayout from "../../components/PageLayout/PageLayout";
import CredentialCard from "../../components/CredentialCard/CredentialCard";

const sampleData = [
    {
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
        name: "Gym Membership",
        descrption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
];

const Credentials = () => {
    return (
        <PageLayout title="Your Credentials">
            <div>
                {sampleData.map((data) => (
                    <CredentialCard
                        name={data.name}
                        description={data.descrption}
                    />
                ))}
            </div>
        </PageLayout>
    );
};

export default Credentials;
