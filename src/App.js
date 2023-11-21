import GlobalStyle from 'styles/GlobalStyle';
import Router from 'shared/Router';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
