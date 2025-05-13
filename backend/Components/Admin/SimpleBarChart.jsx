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