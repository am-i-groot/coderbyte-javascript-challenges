import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TaskItem = ({ item, editTask, removeTask }) => (
    <View style={styles.taskContainer}>
        <Text>{item.text}</Text>
        <TouchableOpacity onPress={() => editTask(item.id, item.text)}>
            <Text style={styles.button}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeTask(item.id)}>
            <Text style={styles.button}>Remove</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    taskContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5 },
    button: { color: "blue", marginLeft: 10 }
});

export default TaskItem;
