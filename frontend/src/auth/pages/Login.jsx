import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { apiLoginUser } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "../../untils/aixos";
import { loginSuccess } from "../providers/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const loading = useSelector((state) => state.auth?.login?.isFetching);

  const accessToken = useSelector(
    (state) => state.auth?.user?.data?.accessToken
  );

  const checkToken = async () => {
    if (accessToken) {
      try {
        await axios.post("/auth", { token: accessToken });
        navigate("/dashboard");
      } catch (error) {
        dispatch(loginSuccess(null));
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiLoginUser(values, dispatch, navigate);
  };

  return (
    <>
      <ToastContainer />
      <Wrapper>
        <Container>
          <Title>
            <h1>Log in</h1>
            <p>Enter your email address and password to access admin panel</p>
          </Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <div className="mb-3 btnDiv">
              <Button variant="primary" type="submit">
                {(loading && (
                  <Image
                    className="loading"
                    src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                    alt=""
                  />
                )) ||
                  "Log in"}
              </Button>
            </div>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://lightence-ant-design-react-template.pages.dev/static/media/login-bg.bf8eb115.webp")
    0% 0% / cover;
`;
const Container = styled.div`
  padding: 2.5rem;
  width: 500px;
  background-color: rgba(37, 40, 75, 0.93);
  border-radius: 7px;

  label {
    color: #fff;
  }
  input {
    background-color: transparent;
    color: #fff !important;
  }
  input:focus {
    background-color: transparent !important;
    color: #fff !important;
  }
  input::placeholder {
    color: #fff;
  }
  button {
    width: 100% !important;
  }
  .btnDiv {
    text-align: center;
    .loading {
      width: 20px;
    }
  }
`;
const Title = styled.div`
  h1 {
    color: #339cfd;
    margin-bottom: 0.9375rem;
    font-size: 1.625rem;
    font-weight: 800;
    line-height: 2.125rem;
  }
  p {
    color: #fff;
    margin-bottom: 1.875rem;
    font-weight: 400;
  }
`;

export default Login;
