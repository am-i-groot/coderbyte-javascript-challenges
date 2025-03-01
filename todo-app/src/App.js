import React, { useState } from "react";
import { View, TextInput, Button, FlatList, StyleSheet } from "react-native";
import TaskItem from "./components/TaskItem";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    const addTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, { id: Date.now().toString(), text: taskInput }]);
            setTaskInput("");
        }
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter task"
                value={taskInput}
                onChangeText={setTaskInput}
            />
            <Button title="Add Task" onPress={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TaskItem item={item} removeTask={removeTask} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 }
});

export default TodoApp;
