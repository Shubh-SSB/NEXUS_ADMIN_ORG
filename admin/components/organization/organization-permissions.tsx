"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const permissions = [
  {
    role: "Super Admin",
    viewUsers: true,
    manageUsers: true,
    manageCourses: true,
    viewReports: true,
    manageBilling: true,
  },
  {
    role: "Admin",
    viewUsers: true,
    manageUsers: true,
    manageCourses: true,
    viewReports: true,
    manageBilling: false,
  },
  {
    role: "Manager",
    viewUsers: true,
    manageUsers: false,
    manageCourses: true,
    viewReports: true,
    manageBilling: false,
  },
  {
    role: "Trainer",
    viewUsers: false,
    manageUsers: false,
    manageCourses: true,
    viewReports: false,
    manageBilling: false,
  },
]

export function OrganizationPermissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role & Permission Matrix</CardTitle>
        <CardDescription>Configure access levels for different user roles</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>View Users</TableHead>
              <TableHead>Manage Users</TableHead>
              <TableHead>Manage Courses</TableHead>
              <TableHead>View Reports</TableHead>
              <TableHead>Manage Billing</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((perm) => (
              <TableRow key={perm.role}>
                <TableCell className="font-medium">{perm.role}</TableCell>
                <TableCell>
                  <Checkbox checked={perm.viewUsers} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={perm.manageUsers} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={perm.manageCourses} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={perm.viewReports} />
                </TableCell>
                <TableCell>
                  <Checkbox checked={perm.manageBilling} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
