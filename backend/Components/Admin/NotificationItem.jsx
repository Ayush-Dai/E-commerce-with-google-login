import { Badge } from "@/Components/ui/badge"

export function NotificationItem({ title, time, read }) {
  return (
    <div className={`p-3 ${read ? "" : "bg-blue-50 dark:bg-blue-900/20"}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{time}</p>
        </div>
        {!read && <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">New</Badge>}
      </div>
    </div>
  )
}