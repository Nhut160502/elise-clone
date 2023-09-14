import React from "react";
import { Button, Form, Image } from "react-bootstrap";
import { styled } from "styled-components";

const ButtonSubmit = ({ title, isFetching }) => {
  return (
    <Form.Group>
      <Wrapper>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {(isFetching && (
            <Image
              className="loading"
              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
              alt=""
            />
          )) ||
            title}
        </Button>
      </Wrapper>
    </Form.Group>
  );
};

const Wrapper = styled.div`
  .btn-submit {
    text-align: center;
    .loading {
      width: 20px;
    }
  }
`;

export default ButtonSubmit;
