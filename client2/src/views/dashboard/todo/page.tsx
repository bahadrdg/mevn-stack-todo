import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import AddTodoDialog from "./components/AddTodoDialog";
import { Button } from "@/components/ui/button";
import TodoService from "@/services/todoServices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import UpdateTodoDialog from "./components/UpdateTodoDialog";

interface Todo {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  status: "start" | "progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface Column {
  id: "start" | "progress" | "completed";
  title: string;
  color: string;
  icon: React.ReactNode;
}

const columns: Column[] = [
  {
    id: "start",
    title: "Başlangıç",
    color: "bg-gray-100 dark:bg-[#09090B]",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
  },
  {
    id: "progress",
    title: "Devam Ediyor",
    color: "bg-blue-50 dark:bg-[#09090B]",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "completed",
    title: "Tamamlandı",
    color: "bg-green-50 dark:bg-[#09090B]",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
];

export default function KanbanBoard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const todoService = new TodoService();

  // Todoları yükle
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoService.getAllTodos();

      // Backend'den gelen todoları uygun formata dönüştür
      const formattedTodos = response.map((todo) => ({
        ...todo,
        status: todo.completed ? "completed" : todo.status || "start",
        priority: todo.priority || ("high" as const),
        description: todo.description || todo.title,
      }));
      setTodos(formattedTodos as unknown as Todo[]);
    } catch (error) {
      console.error("Todolar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      await fetchTodos();
      window.location.reload(); // Sayfayı yenile
    } catch (error) {
      console.error("Todo silinirken hata:", error);
    }
  };
  // Yeni todo ekle
  const handleAddTodo = async (newTodo: {
    title: string;
    description: string;
    priority: Todo["priority"];
    status: Todo["status"];
  }) => {
    try {
      await todoService.createTodo(
        newTodo.title,
        newTodo.description,
        newTodo.priority,
        newTodo.status
      );
      // Todo eklendikten sonra güncel listeyi getir
      await fetchTodos();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Todo eklenirken hata:", error);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      await todoService.updateTodo(updatedTodo._id, updatedTodo);
      await fetchTodos();
      setIsUpdateDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Todo güncellenirken hata:", error);
    }
  };

  // Todo durumunu güncelle
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn && source.index === destination.index)
      return;

    // Tüm todoları kolonlara ayır
    const startTodos = todos.filter((t) => t.status === "start");
    const progressTodos = todos.filter((t) => t.status === "progress");
    const completedTodos = todos.filter((t) => t.status === "completed");

    // Sürüklenen todo'yu bul ve kopyasını al
    const movedTodo = todos.find((t) => t._id.toString() === draggableId);
    if (!movedTodo) return;

    const newStatus = destColumn as Todo["status"];
    const isCompleted = newStatus === "completed";
    const updatedTodo = {
      ...movedTodo,
      status: newStatus,
      completed: isCompleted,
    };

    // Kaynak kolondan todo'yu kaldır
    let sourceList: Todo[] = [];
    if (sourceColumn === "start") sourceList = startTodos;
    else if (sourceColumn === "progress") sourceList = progressTodos;
    else sourceList = completedTodos;
    sourceList.splice(source.index, 1);

    // Hedef kolona todo'yu ekle
    let destList: Todo[] = [];
    if (destColumn === "start") destList = startTodos;
    else if (destColumn === "progress") destList = progressTodos;
    else destList = completedTodos;
    destList.splice(destination.index, 0, updatedTodo);

    // Tüm listeleri birleştir
    const newTodos = [...startTodos, ...progressTodos, ...completedTodos];
    setTodos(newTodos);

    try {
      // Backend'e status değişikliği gönder
      await todoService.changeStatus(movedTodo._id, newStatus);

      // Completed durumunu güncelle
      await todoService.updateTodo(movedTodo._id, {
        completed: isCompleted,
      });
    } catch (error) {
      console.error("Todo güncellenirken hata:", error);
      // Hata durumunda orijinal duruma geri dön
      fetchTodos();
    }
  };

  const getTodosByStatus = (status: Column["id"]) => {
    return todos.filter((t) => t.status === status);
  };

  const getPriorityColor = (priority: Todo["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100";
      case "low":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-white dark:bg-[#09090B]">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Todo App
        </h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="px-4 py-2">
          + Yeni Todo
        </Button>
      </div>

      <AddTodoDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddTodo}
      />

      <UpdateTodoDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => {
          setIsUpdateDialogOpen(false);
          window.location.reload();
        }}
        onUpdate={handleUpdateTodo}
        selectedTodo={selectedTodo}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 flex-1">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`${column.color} rounded-lg flex flex-col max-h-[calc(100vh-10rem)] border dark:border-gray-700`}
            >
              <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 sticky top-0 z-10">
                <h2 className="font-semibold text-lg flex items-center justify-between text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    {column.icon}
                    {column.title}
                  </div>
                  <span className="text-sm font-normal bg-white dark:bg-gray-700 px-2 py-1 rounded">
                    {getTodosByStatus(column.id).length}
                  </span>
                </h2>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 overflow-y-auto p-4 space-y-4 min-h-[100px] ${
                      snapshot.isDraggingOver
                        ? "bg-gray-50/50 dark:bg-gray-800/50"
                        : ""
                    }`}
                  >
                    {getTodosByStatus(column.id).map((todo, index) => (
                      <Draggable
                        key={todo._id}
                        draggableId={todo._id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white dark:bg-black p-4 rounded-lg shadow-sm transition-all ${
                              snapshot.isDragging
                                ? "shadow-lg ring-2 ring-blue-400 dark:ring-blue-500 rotate-2 opacity-90"
                                : "hover:shadow-md"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {todo.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(
                                    todo.priority
                                  )}`}
                                >
                                  {todo.priority}
                                </span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-36"
                                  >
                                    <DropdownMenuItem 
                                      className="flex items-center gap-2 cursor-pointer" 
                                      onClick={() => {
                                        setSelectedTodo(todo);
                                        setIsUpdateDialogOpen(true);
                                      }}
                                    >
                                      <PencilIcon className="w-4 h-4" />
                                      <span>Düzenle</span>
                                    </DropdownMenuItem>
                                    <AlertDialog>
                                      <AlertDialogTrigger className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 p-2 hover:bg-red-50 hover:text-white dark:hover:text-red-600 dark:hover:bg-red-900 rounded-md w-full">
                                        
                                          <TrashIcon className="w-4 h-4" />
                                          <span>Sil</span>
                                        
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Silmek istediğinize emin misiniz?
                                          </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogDescription>
                                          Bu işlem geri alınamaz.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            İptal
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDeleteTodo(todo._id)
                                            }
                                          >
                                            Sil
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    {/* <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400">
                                      <TrashIcon className="w-4 h-4" />
                                      <span>Sil</span>
                                    </DropdownMenuItem> */}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                              {todo.description}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {new Date(todo.createdAt).toLocaleDateString(
                                "tr-TR"
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
