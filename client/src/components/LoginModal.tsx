import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from 'react';
import { useNavigate } from "react-router";
//import { UnauthorizedError } from "../errors/http_errors";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (token: { token: string, expiresIn: string }) => void,
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const token = await NotesApi.login(credentials);
            onLoginSuccessful(token);
        } catch (error) {
            alert(error);
            console.log(error)
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header >
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <div className={styleUtils.flexCenter}>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        >
                        Log In
                    </Button>
                    <Button
                        onClick={() => { navigate("/signup") }}
                        disabled={isSubmitting}
                        
                        >
                        Create Account
                    </Button>
                        </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default LoginModal;