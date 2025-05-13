import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/Components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/Components/ui/table"
import { UserTableRow } from "@/Components/Admin/UserTableRow"

export function RecentUsers() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
        <CardDescription>A list of recent users who joined the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <UserTableRow
              name="John Doe"
              email="john@example.com"
              role="Admin"
              joined="2 days ago"
              status="Active"
            />
            <UserTableRow
              name="Jane Smith"
              email="jane@example.com"
              role="User"
              joined="5 days ago"
              status="Active"
            />
            <UserTableRow
              name="Robert Johnson"
              email="robert@example.com"
              role="Editor"
              joined="1 week ago"
              status="Inactive"
            />
            <UserTableRow
              name="Emily Davis"
              email="emily@example.com"
              role="User"
              joined="2 weeks ago"
              status="Active"
            />
            <UserTableRow
              name="Michael Wilson"
              email="michael@example.com"
              role="User"
              joined="3 weeks ago"
              status="Pending"
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}