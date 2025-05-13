import { Card, CardContent } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"

export function StatsCard({ title, value, change, icon }) {
  const isPositive = change.startsWith("+")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <Badge
            variant={isPositive ? "success" : "destructive"}
            className={`${isPositive ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
          >
            {change}
          </Badge>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}