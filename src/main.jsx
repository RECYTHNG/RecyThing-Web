import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBorderColor: "transparent",
                defaultHoverColor: "",
                defaultHoverBg: ""
              },
              Input: {
                activeBg: "",
                activeShadow: "",
                activeBorderColor: "",
                hoverBg: "",
                colorTextPlaceholder: ""
              }
            },
            token: {
              fontFamily: "Nunito",
            }
          }}>
          <ToastContainer />
          <App />
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>,
)