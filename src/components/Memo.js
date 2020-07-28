import React from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 500px;
  height: 400px;
  border: 1px solid rgba(200, 200, 200);
  border-radius: 5px;
  box-shadow: 2px 5px 4.5px rgba(200, 200, 200);
  margin: 20px;
`;

const Title = styled.h2`
  padding: 20px;
`;

const Content = styled.p`
  padding: 10px;
`;

const RegDate = styled.div`
  padding: 10px;
`;

const RefKey = styled.h3`
  padding: 10px;
`;

class Memo extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        <Content>{this.props.content}</Content>
        <RegDate>{this.props.regDate}</RegDate>
        <button onClick={() => this._deleteBtnHandler(this.props.refKey)}>
          삭제
        </button>
      </Container>
    );
  }

  _deleteBtnHandler = async (refKey) => {
    const inputData = {
      refKey,
    };

    await axios
      .post(
        "/api/deleteBtnHandler",
        { params: { inputData } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data === 1) {
          alert("삭제 성공");
        } else {
          alert("삭제 실패");
        }
      });
  };
}
export default Memo;
