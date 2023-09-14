import styled from "styled-components";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
function Quantity({ className, value, getValue }) {
  const [valueInput, setValueInput] = useState(value || 1);
  useEffect(() => {
    setValueInput(value);
    getValue && getValue(valueInput);
  }, []);
  return (
    <Wrapper className={className}>
      <MinusOutlined
        className="minus"
        onClick={() => {
          if (valueInput > 1) {
            setValueInput((pre) => pre - 1);
            getValue && getValue(valueInput - 1);
          }
        }}
      />
      <input type="number" value={valueInput} />
      <PlusOutlined
        className="plus"
        onClick={() => {
          setValueInput((pre) => pre + 1);
          getValue && getValue(valueInput + 1);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 112px;
  height: 45px;
  position: relative;
  span {
    position: absolute;
    font-size: 14px;
    cursor: pointer;
    &.minus {
      left: 0px;
      padding: 7px 15px;
    }
    &.plus {
      right: 0;
      padding: 7px 15px;
    }
  }
  input {
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
    padding: 0 30px;
    font-size: 16px;
    color: #000;
    text-align: center;
    cursor: pointer;
  }
`;
export default Quantity;
