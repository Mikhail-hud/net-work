import React from "react";
import { Drawer, Form, Button, Input, Checkbox, Alert, Divider } from "antd";
import { UserProfile } from "../../types/profileTypes";
import { useAppDispatch } from "../../hooks";
import { saveProfile } from "../../store/reducers/ProfileSlice";

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};

type Props = {
    profile: UserProfile;
    editMode: boolean;
    onSetEditMode: (editMode: boolean) => void;
    isProfileSaving: boolean;
    profileDataFormError: Array<string>;
};

const ProfileDataForm: React.FC<Props> = ({
    profile,
    editMode,
    onSetEditMode,
    isProfileSaving,
    profileDataFormError,
}): JSX.Element => {
    const dispatch = useAppDispatch();

    const onFinish = (profile: UserProfile): void => {
        dispatch(saveProfile(profile));
    };

    return (
        <Drawer
            title="Profile Details"
            width="70%"
            onClose={() => onSetEditMode(false)}
            visible={editMode}
            bodyStyle={{ paddingBottom: "2rem" }}
        >
            {profileDataFormError && (
                <Alert
                    style={{ marginBottom: "10px" }}
                    closable
                    type="error"
                    message={profileDataFormError.join(", ")}
                    banner
                />
            )}
            <Form {...formItemLayout} onFinish={onFinish}>
                <Form.Item
                    initialValue={profile.fullName}
                    name="fullName"
                    label="Your full name:"
                    rules={[{ required: true, message: "Please enter your full name." }]}
                >
                    <Input disabled={isProfileSaving} placeholder="Don't forget to write your full name." />
                </Form.Item>
                <Form.Item
                    initialValue={profile.aboutMe}
                    name="aboutMe"
                    label="Describe Yourself"
                    rules={[
                        {
                            required: true,
                            message: "Please describe Yourself.",
                        },
                    ]}
                >
                    <Input.TextArea
                        disabled={isProfileSaving}
                        rows={2}
                        placeholder="How would you describe yourself?"
                    />
                </Form.Item>
                <Form.Item
                    initialValue={profile.lookingForAJobDescription}
                    name="lookingForAJobDescription"
                    label="Your skills"
                    rules={[
                        {
                            required: true,
                            message: "Please indicate your skills.",
                        },
                    ]}
                >
                    <Input.TextArea disabled={isProfileSaving} rows={2} placeholder="Please indicate your skills." />
                </Form.Item>
                <Form.Item
                    name="lookingForAJob"
                    label="Looking for a job"
                    valuePropName="checked"
                    initialValue={profile.lookingForAJob}
                >
                    <Checkbox disabled={isProfileSaving} />
                </Form.Item>
                <Divider orientation="center">Contacts</Divider>
                {Object.entries(profile.contacts).map(([k, i]) => {
                    return (
                        <Form.Item
                            style={{ textTransform: "capitalize" }}
                            name={["contacts", `${k}`]}
                            label={k}
                            initialValue={i}
                            key={k}
                        >
                            <Input disabled={isProfileSaving} placeholder="Please indicate url to your network" />
                        </Form.Item>
                    );
                })}
                <Form.Item wrapperCol={{ ...formItemLayout.labelCol, offset: 8 }}>
                    <Button
                        loading={isProfileSaving}
                        disabled={isProfileSaving}
                        type="primary"
                        style={{ marginRight: "1rem" }}
                        htmlType="submit"
                    >
                        Save
                    </Button>
                    <Button
                        loading={isProfileSaving}
                        disabled={isProfileSaving}
                        onClick={() => onSetEditMode(false)}
                        type="primary"
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ProfileDataForm;
