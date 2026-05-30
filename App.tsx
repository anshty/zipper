import { StatusBar, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { setToastRef } from '@utils/toastUtils';
import { ToastProvider } from 'react-native-toast-notifications';
import StackNavigation from '@navigation/StackNavigation';
import CustomToast from '@components/CustomToast';
import { navigationRef } from '@utils/NavigationUtils';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const App = () => {
  console.log('app is run');
  return (
    //  <SafeAreaProvider>
    <View style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ToastProvider
            ref={ref => setToastRef(ref)}
            placement="bottom"
            duration={3000}
            animationType="slide-in"
            offset={50}
            renderType={{
              success: toast => <CustomToast toast={toast} type="success" />,
              danger: toast => <CustomToast toast={toast} type="danger" />,
              warning: toast => <CustomToast toast={toast} type="warning" />,
              info: toast => <CustomToast toast={toast} type="normal" />,
            }}
          >
            <NavigationContainer ref={navigationRef}>
              {/* <StatusBar barStyle="dark-content" backgroundColor={'#fff'} /> */}
              <StackNavigation />
            </NavigationContainer>
          </ToastProvider>
        </Provider>
      </QueryClientProvider>
    </View>
  );
};

export default App;
