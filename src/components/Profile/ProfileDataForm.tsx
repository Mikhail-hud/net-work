import { FC } from "react";
import { useAppDispatch } from "@hooks";
import { UserProfile } from "@app/types/profileTypes";
import { saveProfile } from "@app/store/reducers/ProfileSlice";
import { Drawer, Form, Button, Input, Checkbox, Alert, Divider } from "antd";
import { DRAWER_INNER_WINDOW_WIDTH } from "@app/constants/profileConstans";

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};

interface ProfileDataFormProps {
    profile: UserProfile;
    editMode: boolean;
    onSetEditMode: (editMode: boolean) => void;
    isProfileSaving: boolean;
    profileDataFormError: Array<string>;
}

export const ProfileDataForm: FC<ProfileDataFormProps> = ({
    profile,
    editMode,
    onSetEditMode,
    isProfileSaving,
    profileDataFormError,
}) => {
    const dispatch = useAppDispatch();

    const onFinish = (profile: UserProfile): void => {
        dispatch(saveProfile(profile));
    };

    return (
        <Drawer
            open={editMode}
            title="Profile Details"
            width={window.innerWidth >= DRAWER_INNER_WINDOW_WIDTH ? "70%" : "100%"}
            onClose={() => onSetEditMode(false)}
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
                        type="default"
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};
