import React from "react";
import styled from "styled-components";

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

class Memo extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        <Content>{this.props.content}</Content>
        <RegDate>{this.props.regDate}</RegDate>
      </Container>
    );
  }
}
export default Memo;
