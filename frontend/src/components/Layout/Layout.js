import MainNavigation from "./MainHeader";

const Layout = props => {
  return (
    <div className="layout">
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
