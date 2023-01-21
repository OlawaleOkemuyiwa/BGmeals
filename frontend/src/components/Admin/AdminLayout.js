import classes from "./AdminLayout.module.css";
import AdminNav from "./AdminNav";

const AdminLayout = props => {
  return (
    <div className={classes.adminContainer}>
      <h1>Admin Panel</h1>
      <AdminNav />
      {props.children}
    </div>
  );
};

export default AdminLayout;
