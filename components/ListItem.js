import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({
    item,
    deleteItem,
    editItem,
    isEditing,
    editItemDetail,
    saveEditItem,
    handleEditChangeCourse,
    handleEditChangeAssignment,
    handleEditChangeDate,
    itemChecked,
    checkedItems,
}) => {
    const checked = checkedItems.filter(
        checkedItem => checkedItem.id === item.id,
    );
    return (
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                {isEditing && editItemDetail.id === item.id ? (
                    <View style={{ flexDirection: "row", flex: .9 }}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                placeholder="Course"
                                style={{ justifyContent: 'flex-start' }, styles.editItemInput}
                                onChangeText={handleEditChangeCourse}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                placeholder="Descrip."
                                style={{ justifyContent: 'flex-start' }, styles.editItemInput}
                                onChangeText={handleEditChangeAssignment}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <TextInput
                                placeholder="Date"
                                style={{ justifyContent: 'flex-end' }, styles.editItemInput}
                                onChangeText={handleEditChangeDate}
                            />
                        </View>
                    </View>
                ) : (
                    <Text
                        onPress={() => itemChecked(item.id, item.course, item.assignment, item.date)}
                        style={
                            checked.length ? styles.checkedItemText : styles.listItemText
                        }>
                        {item.course + " | " + item.assignment + " | " + item.date}
                    </Text>
                )}
                <View style={styles.iconView}>
                    {isEditing && editItemDetail.id === item.id ? (
                        <Icon
                            name="save"
                            size={20}
                            color="green"
                            onPress={() => saveEditItem(item.id, item.course, item.assignment, item.date)}
                        />
                    ) : (
                        !checked.length && (
                            <Icon
                                name="pencil"
                                size={20}
                                color="blue"
                                onPress={() => editItem(item.id, item.course, item.assignment, item.date)}
                            />
                        )
                    )}
                    <Icon
                        name="remove"
                        size={20}
                        color="firebrick"
                        onPress={() => deleteItem(item.id)}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: 18,
    },
    checkedItemText: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: 'green',
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 70,
    },
    editItemInput: {
        padding: 0,
        fontSize: 18,
    },
});

export default ListItem;