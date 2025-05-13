import { useEffect, useState } from "react"
import { allUsersApi, deleteUserApi } from "../../../APIs/GoogleApi"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { Badge } from "@/Components/ui/badge"
import { Search, Trash2, UserCog } from "lucide-react"
import { Skeleton } from "@/Components/ui/skeleton"

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await allUsersApi()
        if (response.status === 200) {
          const sortedUsers = response.data.Users.sort((a, b) => a.name.localeCompare(b.name))
          setUsers(sortedUsers)
        } else {
          console.error("Failed to fetch Users", response)
        }
      } catch (e) {
        console.error("Error fetching Users:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUserApi(userId)
      if (response.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userId))
      } else {
        console.error("Failed to delete user", response)
      }
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadgeColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "manager":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "user":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <UserCog className="h-6 w-6" />
            User Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your system users</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell className="text-center">
                    <Skeleton className="h-5 w-5 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-9 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <TableRow
                  key={user._id || index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account for{" "}
                            <span className="font-semibold">{userToDelete?.name}</span>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 curosor-pointer"
                            onClick={() => handleDelete(userToDelete?._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-500 dark:text-gray-400">
                  {searchTerm ? "No users found matching your search." : "No users available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && users.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      )}
    </div>
  )
}
