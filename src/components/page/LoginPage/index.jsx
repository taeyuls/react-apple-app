import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../../firebase";
import SignupPage from "../SignupPage";

const LoginPage = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // 로그인 성공 시 필요한 로직을 추가하세요.
      navigate("/dashboard"); // 로그인 성공 후 이동할 페이지 경로
    } catch (error) {
      console.error("로그인 실패:", error);
      // 로그인 실패 시 사용자에게 오류 메시지를 표시할 수 있습니다.
    }
  };

  return (
    <Container>
      <Center>
        <Logo src="/images/apple-gray-logo.svg" alt="로고" />
        <HeadingText>Sign in with your Apple ID</HeadingText>
        <Description>
          You will be signed in to Apple TV and Apple Music.
        </Description>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            type="email"
            placeholder="Apple ID"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "유효한 이메일 주소를 입력해주세요",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          <StyledInput
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자리 이상이어야 합니다",
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <Button type="submit">Sign In</Button>
        </Form>
        <LinkText onClick={openSignup}>Create New Apple ID</LinkText>
        <LinkText>Forgot Apple ID or Password?</LinkText>
      </Center>
      {isSignupOpen && <SignupPage onClose={closeSignup} />}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  margin-bottom: 1.3rem;
  width: 50px;
`;

const HeadingText = styled.h1`
  font-size: 1.9rem;
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.3rem;
`;

const Button = styled.button`
  font-size: 1.2rem;
  color: white;
  background-color: #2997ff;
  border: none;
  padding: 1rem 2rem;
  margin: 1rem 0;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    background-color: #2383dd;
  }
`;

const LinkText = styled.p`
  font-size: 1.2rem;
  color: #2997ff;
  margin: 1rem 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledInput = styled.input`
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 18px;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #424245;
  background-color: hsla(0, 0%, 100%, 0.04);
  width: 310px;
  font-weight: 400;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.08);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Error = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export default LoginPage;
