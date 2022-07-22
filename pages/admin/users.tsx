import { PeopleOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AdminLayout } from "../../components/layouts";
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IUser } from "../../interfaces";
import { entriesApi } from "../../apis";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) {
    return <></>;
  }
  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await entriesApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previosUsers);
      console.log(error);
      alert("No se pudo actualizar el usuario");
    }
  };
  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "Correo",
      width: 250,
    },
    {
      field: "name",
      headerName: "Nombre completo",
      width: 300,
    },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Select
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            value={row.role}
            label={"Rol"}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super-user">Super User</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rowFormatted = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));
  return (
    <AdminLayout
      title={"Usuarios"}
      subtitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rowFormatted}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
