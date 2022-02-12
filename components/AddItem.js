import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddItem = ({ addItem }) => {
    const [course, setCourse] = useState('');
    const [assignment, setAssignment] = useState('');
    const [date, setDate] = useState('');

    const onChangeClass = classValue => setCourse(classValue);
    const onChangeAssignment = assignmentValue => setAssignment(assignmentValue);
    const onChangeDate = dateValue => setDate(dateValue);

    return (
        <View>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Course"
                            style={{ justifyContent: 'flex-start' }, styles.input}
                            onChangeText={onChangeClass}
                            value={course}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Assignment"
                            style={{ justifyContent: 'flex-start' }, styles.input}
                            onChangeText={onChangeAssignment}
                            value={assignment}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Due Date"
                            style={{ justifyContent: 'flex-end' }, styles.input}
                            onChangeText={onChangeDate}
                            value={date}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    addItem(course, assignment, date);
                    setCourse('');
                    setAssignment('');
                    setDate('');
                }}>
                <Text style={styles.btnText}>
                    <Icon name="plus" size={20} /> Add Assignment
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        margin: 5,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default AddItem;