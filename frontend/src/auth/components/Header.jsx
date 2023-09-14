import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { Image } from "react-bootstrap";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { memo } from "react";

const items = [
  {
    key: "1",
    label: (
      <Link target="_blank" rel="noopener noreferrer" to="">
        1st menu item
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link target="_blank" rel="noopener noreferrer" to="">
        2nd menu item
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link target="_blank" rel="noopener noreferrer" to="">
        3rd menu item
      </Link>
    ),
  },
];

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Left>
          <Form>
            <FormControl>
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Search" />
            </FormControl>
          </Form>
        </Left>
        <Right>
          <RightItem>
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow
              trigger={["click"]}
            >
              <FontAwesomeIcon icon={faBell} />
            </Dropdown>
          </RightItem>

          <RightItem>
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow
              trigger={["click"]}
            >
              <FontAwesomeIcon icon={faGear} />
            </Dropdown>
          </RightItem>

          <RightItem>
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow
              trigger={["click"]}
            >
              <Image src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/345427410_1388228668641570_6554442613079471867_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=a-JZosEoIvsAX83kZ8e&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCvKZuSzhnu_bpmbTDATu4VhDFUdyTaorGdEn8MsobXRw&oe=64E9D164" />
            </Dropdown>
            <span>Huynh Minh Nhut</span>
          </RightItem>
        </Right>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #1e2142;
  height: 90px;
  color: #fff;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 50px;
`;
const Left = styled.div`
  width: 50%;
`;

const Form = styled.form``;
const FormControl = styled.div`
  padding: 16px;
  border-radius: 3.125rem;
  background-color: #25284b;
  display: flex;
  align-items: center;
  input {
    padding-left: 10px;
    border: none;
    width: 100%;
  }
  svg {
    color: #fff;
  }
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
`;
const RightItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  color: #fff;
  cursor: pointer;
  img {
    width: 45px;
    border-radius: 50%;
  }
  svg {
    font-size: 24px;
    color: #fff;
    padding: 4px;
  }
  span {
    margin-left: 8px;
  }
  button {
    padding: 8px 12px;
    background-color: transparent;
    border: 1px solid #fff;
  }
`;

export default memo(Header);
