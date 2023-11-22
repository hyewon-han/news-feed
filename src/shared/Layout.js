import styled from 'styled-components';
import theme from 'styles/Theme';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <div>
      <StHeader>
        <Link to="/">
          <StSpan>MBTI Comunity</StSpan>
        </Link>
        <Btns>
          <button onClick={() => navigate('/login')}>LOGIN</button>
          <button onClick={() => navigate('/join')}>JOIN</button>
        </Btns>
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
  justify-content: space-between;
  color: white;
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

const Btns = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
  margin: 0px 20px;
`;

const StSpan = styled.span`
  margin: 0px 20px;
`;
