import { FC } from "react";
import { Col, Typography } from "antd";
import { UserProfile } from "@app/types/profileTypes";
import { vk, facebook, github, website, twitter, youtube, instagram, mainLink } from "@app/assets/img/profile";

interface ProfileDetailsProps {
    profile: UserProfile;
    isOwner: boolean;
}

export const ProfileDetails: FC<ProfileDetailsProps> = ({ profile, isOwner }) => {
    const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts } = profile;
    const icon = {
        github,
        facebook,
        vk,
        mainLink,
        youtube,
        instagram,
        twitter,
        website,
    };

    return (
        <Col xs={24} style={{ textAlign: "center" }}>
            <Typography.Title level={4}>{fullName}</Typography.Title>
            {aboutMe && (
                <Typography.Paragraph style={{ marginTop: "1em" }}>
                    {isOwner ? "About me" : "About"} : {aboutMe}
                </Typography.Paragraph>
            )}
            <Typography.Paragraph>Looking for a job: {lookingForAJob ? "Yes!" : "No !"}</Typography.Paragraph>
            {lookingForAJob && (
                <Typography.Paragraph>
                    {isOwner ? "My skills" : "Skills"} : {lookingForAJobDescription}
                </Typography.Paragraph>
            )}
            {Object.entries(contacts).map(([key, item]) => {
                if (item)
                    return (
                        <a style={{ margin: "5px" }} href={item} key={key} target="_blank" rel="noreferrer">
                            <img src={icon[key]} alt="social-icon" />
                        </a>
                    );
            })}
        </Col>
    );
};
