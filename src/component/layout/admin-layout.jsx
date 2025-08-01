import AdminNavigation from "../navbar/admin-navigation";
import SideBar from "../sidebar/sidebar";

function AdminLayout({ children }) {
  return (
    <div className="real">
      <div className="cont-div">
        <SideBar />{" "}
      </div>
      <main className="content">
        {/* <AdminNavigation /> */}
        <div className="p-3">{children}</div>
      </main>
    </div>
  );
}
export default AdminLayout;
