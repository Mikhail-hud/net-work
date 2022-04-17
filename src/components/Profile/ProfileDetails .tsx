import React from "react";
import { Col } from "antd";
import { vk, facebook, github, website, twitter, youtube, instagram, mainLink } from "../../assets/img/profile";
import { UserProfile } from "../../types/profileTypes";

type Props = {
    profile: UserProfile;
};
const ProfileDetails: React.FC<Props> = ({ profile }) => {
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
        <Col xs={24} className="profile-data">
            <h2>{fullName}</h2>
            {aboutMe && (
                <p>
                    <b>About me:</b> {aboutMe}
                </p>
            )}
            <p>
                <b>Looking for a job:</b> {lookingForAJob ? "Yes!" : "No !"}
            </p>
            {lookingForAJob && (
                <p>
                    <b>My skills:</b> {lookingForAJobDescription}
                </p>
            )}
            {Object.entries(contacts).map(([key, item]) => {
                if (item)
                    return (
                        <a href={item} key={key} target="_blank" rel="noreferrer">
                            <img src={icon[key]} alt="social-icon" />
                        </a>
                    );
                return null;
            })}
        </Col>
    );
};

export default ProfileDetails;
