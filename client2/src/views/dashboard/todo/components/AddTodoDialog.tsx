import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"


interface Todo {
  id: string
  title: string
  description: string
  status: 'start' | 'progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  assignee?: string
}

interface AddTodoDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (todo: Omit<Todo, 'id'>) => void
}

export default function AddTodoDialog({ isOpen, onClose, onAdd }: AddTodoDialogProps) {
  const [formData, setFormData] = useState<Omit<Todo, 'id'>>({
    title: '',
    description: '',
    status: 'start',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    console.log(formData);
    
    onClose()
    // Formu sıfırla
    setFormData({
      title: '',
      description: '',
      status: 'start',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] dark:bg-[#09090B] dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Yeni Todo Ekle</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Başlık</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="p-5 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
              placeholder="Todo başlığını girin"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Açıklama</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              className="min-h-[150px] p-5 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
              placeholder="Detaylı açıklama girin"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="priority" className="text-gray-700 dark:text-gray-300">Öncelik</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as Todo['priority'] }))}
              >
                <SelectTrigger className="p-5 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Öncelik seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#09090B] border-gray-200 dark:border-gray-700">
                  <SelectItem value="low" className="text-[#09090B] dark:text-white">Düşük</SelectItem>
                  <SelectItem value="medium" className="text-[#09090B] dark:text-white">Orta</SelectItem>
                  <SelectItem value="high" className="text-[#09090B] dark:text-white">Yüksek</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="dueDate" className="text-[gray-700] dark:text-gray-300">Bitiş Tarihi</Label>
              <Input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="p-5 bg-white dark:bg-[#09090B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={onClose}
              className="px-6"
            >
              İptal
            </Button>
            <Button 
              type="submit"
              variant="default"
              className="px-6"
            >
              Ekle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 