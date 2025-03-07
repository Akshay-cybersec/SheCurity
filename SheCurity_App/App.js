import MainContainer from './Navigation/MainContainer'
import { MD3LightTheme as DefaultTheme, PaperProvider, Surface } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import Colors from './assets/Colors/color';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: 'red',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <MainContainer />
    </PaperProvider>
    
  );


}
AppRegistry.registerComponent("SheCurity", () => App);




