import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App.tsx";
import Login from "../components/Auth/Login.tsx";
import Register from "../components/Auth/Register.tsx";
import FieldList from "../components/Fields/FieldList.tsx";
import FieldDetails from "../components/Fields/FieldDetails.tsx";
import BookingList from "../components/Bookings/BookingList.tsx";
import UserList from "../components/Users/UserList.tsx";
import BookForm from "../components/Bookings/BookForm.tsx";
import EditBookingForm from "../components/Bookings/EditBookingForm.tsx";
import UserProfile from "../components/Users/UserProfile.tsx";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="fields" element={<FieldList />} />
          <Route path="bookings" element={<BookingList />} />
          <Route path="fields/:id" element={<FieldDetails />} />
          <Route path="bookings/edit/:id" element={<EditBookingForm />} />
          <Route path="fields/:id/book" element={<BookForm />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="users" element={<UserList />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<FieldList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
