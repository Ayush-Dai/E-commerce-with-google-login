export function ActivityItem({ title, description, time }) {
    return (
      <div className="border-l-2 border-blue-500 pl-3 py-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{time}</p>
      </div>
    )
  }