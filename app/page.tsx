import ThemeProvider from "@/components/theme-provider"
import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-md mx-auto">
          <TodoApp />
        </div>
      </main>
    </ThemeProvider>
  )
}
