import { Outlet } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";

const AdminScreen = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminScreen;
