import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface Todo {
  _id: number;
  title: string;
  description: string;
  status: "start" | "progress" | "completed";
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpdateTodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (todo: Todo) => Promise<void>;
  selectedTodo: Todo | null;
}

export default function UpdateTodoDialog({ isOpen, onClose, onUpdate, selectedTodo }: UpdateTodoDialogProps) {
  const [formData, setFormData] = useState<Todo>({
    _id: 0,
    title: "",
    description: "",
    status: "start",
    priority: "medium",
    completed: false,
    createdAt: "",
    updatedAt: ""
  });

  useEffect(() => {
    if (selectedTodo) {
      setFormData(selectedTodo);
    }
  }, [selectedTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Todo Düzenle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label>Başlık</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <Label>Açıklama</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <Label>Öncelik</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as Todo["priority"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Düşük</SelectItem>
                  <SelectItem value="medium">Orta</SelectItem>
                  <SelectItem value="high">Yüksek</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit">
              Güncelle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
