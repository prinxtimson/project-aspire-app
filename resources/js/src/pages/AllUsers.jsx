import UsersTable from "../components/UsersTable";
import AdminDashboardContainer from "../components/AdminDashboardContainer";

const AllUsers = () => {
    return (
        <AdminDashboardContainer>
            <UsersTable />
        </AdminDashboardContainer>
    );
};

export default AllUsers;
