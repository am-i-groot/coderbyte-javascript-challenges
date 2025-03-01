/*

Front-end Challenge
We have set up the basic structure for a React Native component in the starter code. 
Your task is to create a To-Do application where users can add items to a list, edit a specific item, 
or remove a specific item from the list using React Native.

Requirements:

- The application should feature a text input field and a submit button to add new tasks.
- When the user enters a task in the input field and presses the submit button, the task should be added to a list displayed on the screen.
- Each task in the list must be accompanied by an "Edit" button.
- Pressing the "Edit" button should transform the task text into an editable input field, along with a "Save" button to confirm changes.
- Changes must be saved to the task list when the "Save" button is pressed.
- Each task should also feature a "Remove" button next to the "Edit" button for removing that specific task from the list.
- The "Remove" button should not be visible while in edit mode.
- Add the attribute testID="toDoList" to the FlatList component.

*/

import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask }]);
      setNewTask('');
    }
  };

  const handleEditTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTask(taskText);
  };

  const handleSaveTask = () => {
    setTasks(
      tasks.map(task => 
        task.id === editingTaskId ? { ...task, text: editedTask } : task
      )
    );
    setEditingTaskId(null);
    setEditedTask('');
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      {editingTaskId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput 
            style={styles.input}
            value={editedTask}
            onChangeText={setEditedTask}
          />
          <Button title="Save" onPress={handleSaveTask} />
        </View>
      ) : (
        <View style={styles.taskTextContainer}>
          <Text style={styles.taskText}>{item.text}</Text>
          <TouchableOpacity onPress={() => handleEditTask(item.id, item.text)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
            <Text style={styles.removeButton}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        testID="toDoList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
  },
  taskItem: {
    marginBottom: 16,
  },
  taskTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    color: '#007bff',
    marginLeft: 8,
  },
  removeButton: {
    color: '#ff0000',
    marginLeft: 8,
  },
});

export default TodoApp;
