import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth } from "../../../firebase";

const SignupPage = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      onClose();
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const password = watch("password");

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Logo>
            <img
              width={60}
              src="/images/apple-gray-logo.svg"
              alt="Apple logo"
            />
            <h2>Sign Up</h2>
            <p>You will sign up for Apple TV and Apple Music.</p>
          </Logo>
          <Input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "유효한 이메일 주소를 입력해주세요",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}

          <Input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자리 이상이어야 합니다",
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}

          <Input
            placeholder="Password Confirm"
            type="password"
            {...register("passwordConfirm", {
              required: "비밀번호를 한번 더 입력해주세요",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.passwordConfirm && (
            <Error>{errors.passwordConfirm.message}</Error>
          )}

          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Form>
      </Modal>
    </Overlay>
  );
};

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Form = styled.form`
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  color: black;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

const Error = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #111111;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #101010;
    border: solid 1px white;
  }
`;

export default SignupPage;
