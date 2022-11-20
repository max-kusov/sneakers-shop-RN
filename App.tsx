import Navigation from './app/navigation';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <Provider store={store} >
      <Navigation />
      <StatusBar backgroundColor="gray" />
    </Provider>
  );
}
