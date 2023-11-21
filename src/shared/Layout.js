import styled from 'styled-components';
import theme from 'styles/Theme';

function Layout({ children }) {
  return (
    <div>
      <StHeader>
        <span>MBIT Comunity</span>
      </StHeader>
      <StLayout>{children}</StLayout>
      <StFooter>
        <span>Copyright &copy; MBTI Comunity All rights reserved</span>
      </StFooter>
    </div>
  );
}

export default Layout;

const StHeader = styled.header`
  background-color: ${theme.color.blue};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 30px 0px;
  font-size: 22px;
`;

const StFooter = styled.footer`
  background-color: ${theme.color.blue};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
`;
