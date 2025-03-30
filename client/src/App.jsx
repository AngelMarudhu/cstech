import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

const Login = lazy(() => import("./Pages/Login"));
const AdminHome = lazy(() => import("./Pages/Admin/AdminHome"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute authRequired={false}>
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-home"
          element={
            <ProtectedRoute authRequired={true}>
              <Suspense fallback={<div>Loading...</div>}>
                <AdminHome />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
