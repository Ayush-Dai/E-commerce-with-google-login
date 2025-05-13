import { TableCell, TableRow } from "@/Components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"

export function UserTableRow({ name, email, role, joined, status }) {
  let statusColor = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"

  if (status === "Active") {
    statusColor = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  } else if (status === "Inactive") {
    statusColor = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  } else if (status === "Pending") {
    statusColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  }

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${name.charAt(0)}`} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {name}
        </div>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{joined}</TableCell>
      <TableCell>
        <Badge className={statusColor}>{status}</Badge>
      </TableCell>
    </TableRow>
  )
}

// File: components/dashboard/SimpleBarChart.jsx
"use client"

export function SimpleBarChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const values = [30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]
  const maxValue = Math.max(...values)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-end">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center">
            <div
              className="w-full max-w-[30px] bg-blue-500 dark:bg-blue-600 rounded-t-sm mx-auto"
              style={{ height: `${(values[index] / maxValue) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        {months.map((month) => (
          <div key={month} className="flex-1 text-center text-xs text-gray-500">
            {month}
          </div>
        ))}
      </div>
    </div>
  )
}