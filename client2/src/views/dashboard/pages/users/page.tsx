import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import UsersDataTable from "./data-table";



export default function UsersPage() {

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <Button asChild>
          <Link to="#">
            <PlusCircledIcon className="me-2" /> Add New User
          </Link>
        </Button>
      </div>
      <UsersDataTable data={[]} />
    </>
  );
}
