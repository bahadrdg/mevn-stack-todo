<script setup>
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import TodoService from '@/service/TodoService';
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';

const todoService = new TodoService();
const todos = ref([]);
const visible = ref(false);
const newTodo = ref({
    title: '',
    description: '',
    status: ''
});

onMounted(async () => {
    try {
        todos.value = await todoService.getAllTodos();
        console.log(todos.value[0]);
    } catch (error) {
        console.error('hata', error);
    }
});
const status = ref([
    { name: 'Başlangıç', value: 'start' },
    { name: 'Devam Ediyor', value: 'progress' },
    { name: 'Tamamlandı', value: 'completed' }
]);

const createTodo = async () => {
    const todoData = {
        title: newTodo.value.title,
        description: newTodo.value.description,
        status: newTodo.value.status.value
    };

    try {
        await todoService.createTodo(todoData);
        todos.value.unshift({ ...todoData, _id: Date.now() }); // En başa ekliyoruz
        visible.value = false; // Dialog'u kapat
        newTodo.value = { title: '', description: '', status: '' }; // Formu sıfırla
    } catch (error) {
        console.error('Todo oluşturulurken hata:', error);
    }
};


</script>

<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold">My Todo</h1>
            <div class="flex items-center space-x-4">
                <Button label="Yeni Todo" icon="pi pi-plus" @click="visible = true" />
                <Avatar image="/image/bg.jpg" class="mr-2" size="large" shape="circle" />
            </div>
        </div>

        <div class="flex justify-between items-center pt-5">
            <!-- <div class="relative w-64">
                <i class="pi pi-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <InputText v-model="searchTerm" placeholder="Ara..." class="w-full py-2 px-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div> -->
            <div class="flex space-x-4">
                <DatePicker placeholder="Başlangıç Tarihi" show-icon="true" />
                <DatePicker placeholder="Bitiş Tarihi" show-icon="true" />
            </div>
        </div>
    </div>

    <div class="grid grid-cols-3 gap-4 w-full pt-5">
        <div>
            <span class="flex items-center gap-2 py-5">
                <Badge severity="info" size="large" />
                <p class="text-lg font-bold">Yapılacaklar</p>
            </span>
            <div class="bg-[#C4D0EB] rounded-xl min-h-screen">
                <div v-for="todo in todos.filter((t) => t.status === 'start')" :key="todo._id" class="p-3">
                    <div class="flex flex-col p-3 bg-white rounded-xl border border-[#334977] min-h-60">
                        <div class="flex justify-between">
                            <p class="text-xl font-bold">{{ todo.title }}</p>
                            <!-- <div class="space-x-2">
                                <Button icon="pi pi-pencil" severity="info" />
                                <Button icon="pi pi-trash" severity="danger" />
                            </div> -->
                        </div>

                        <p class="text-sm text-gray-500">{{ todo.description }}</p>
                        <p class="text-sm text-gray-500 text-end">{{ new Date(todo.createdAt).toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <span class="flex items-center gap-2 py-5">
                <Badge severity="warn" size="large" />
                <p class="text-lg font-bold">Devam Ediyor</p>
            </span>
            <div class="bg-[#C4D0EB] rounded-xl min-h-screen">
                <div v-for="todo in todos.filter((t) => t.status === 'progress')" :key="todo._id" class="p-3">
                    <div class="flex flex-col p-3 bg-white rounded-xl border border-[#334977] min-h-60">
                        <div class="flex justify-between">
                            <p class="text-xl font-bold">{{ todo.title }}</p>
                            <!-- <div class="space-x-2">
                                <Button icon="pi pi-pencil" severity="info" />
                                <Button icon="pi pi-trash" severity="danger" />
                            </div> -->
                        </div>

                        <p class="text-sm text-gray-500">{{ todo.description }}</p>
                        <p class="text-sm text-gray-500 text-end">{{ new Date(todo.createdAt).toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <span class="flex items-center gap-2 py-5">
                <Badge severity="success" size="large" />
                <p class="text-lg font-bold">Tamamlandı</p>
            </span>
            <div class="bg-[#C4D0EB] rounded-xl min-h-screen">
                <div v-for="todo in todos.filter((t) => t.status === 'completed')" :key="todo._id" class="p-3">
                    <div class="flex flex-col p-3 bg-white rounded-xl border border-[#334977] min-h-60">
                        <div class="flex justify-between">
                            <p class="text-xl font-bold">{{ todo.title }}</p>
                            <!-- <div class="space-x-2">
                                <Button icon="pi pi-pencil" severity="info" />
                                <Button icon="pi pi-trash" severity="danger" />
                            </div> -->
                        </div>

                        <p class="text-sm text-gray-500">{{ todo.description }}</p>
                        <p class="text-sm text-gray-500 text-end">{{ new Date(todo.createdAt).toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Yeni Todo Oluştur" :style="{ width: '55rem' }">
        <div class="flex items-center mb-4">
            <label for="title" class="font-semibold w-24">Başlık</label>
            <InputText id="title" v-model="newTodo.title" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="description" class="font-semibold w-24">İçerik</label>
            <Textarea v-model="newTodo.description" rows="10" cols="100" />
        </div>
        <div class="flex items-center mb-8">
            <label for="status" class="font-semibold w-24">Durum</label>
            <Select v-model="newTodo.status" :options="status" optionLabel="name" placeholder="Aşama Seçiniz" class="w-full md:w-56" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="İptal Et" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Kaydet" @click="createTodo"></Button>
        </div>
    </Dialog>
</template>
