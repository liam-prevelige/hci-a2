import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { v4 as uuid } from 'uuid';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const App = () => {
  const [items, setItems] = useState([
    {
      id: uuid(),
      course: 'HCI',
      assignment: 'Reflection',
      date: '2/12',
    },
  ]);

  // Flag true if user is currently editing an item
  const [editStatus, editStatusChange] = useState(false);

  // State to capture information about the item being edited
  const [editItemDetail, editItemDetailChange] = useState({
    id: null,
    course: null,
    assignment: null,
    date: null
  });

  const [checkedItems, checkedItemChange] = useState([]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  // Submit the users edits to the overall items state
  const saveEditItem = (id, course, assignment, date) => {
    setItems(prevItems => {
      return prevItems.map(item =>
        item.id === editItemDetail.id ? { id, course: editItemDetail.course, assignment: editItemDetail.assignment, date: editItemDetail.date } : item,
      );
    });
    // Flip edit status back to false
    editStatusChange(!editStatus);
  };

  const handleEditChangeCourse = course => {
    editItemDetailChange({ id: editItemDetail.id, course, assignment: editItemDetail.assignment, date: editItemDetail.date});
  };

  const handleEditChangeAssignment = assignment => {
    editItemDetailChange({ id: editItemDetail.id, course: editItemDetail.course, assignment, date: editItemDetail.date});
  };

  const handleEditChangeDate = date => {
    editItemDetailChange({ id: editItemDetail.id, course: editItemDetail.course, assignment: editItemDetail.assignment, date});
  };

  const addItem = (course, assignment, date) => {
    if (!course || !assignment || !date) {
      Alert.alert(
        'No item entered',
        'Please enter an item when adding to your agenda',
        [
          {
            course: 'Understood',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      setItems(prevItems => {
        return [{ id: uuid(), course, assignment, date }, ...prevItems];
      });
    }
  };

  // capture old items ID and course when user clicks edit
  const editItem = (id, course, assignment, date) => {
    editItemDetailChange({
      id,
      course,
      assignment,
      date,
    });
    return editStatusChange(!editStatus);
  };

  const itemChecked = (id, course, assignment, date) => {
    const isChecked = checkedItems.filter(checkedItem => checkedItem.id === id);
    isChecked.length
      ? // remove item from checked items state (uncheck)
      checkedItemChange(prevItems => {
        return [...prevItems.filter(item => item.id !== id)];
      })
      : // Add item to checked items state
      checkedItemChange(prevItems => {
        return [...prevItems.filter(item => item.id !== id), { id, course, assignment, date }];
      });
  };

  return (
    <View style={styles.container}>
      <Header title="Agenda" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
            isEditing={editStatus}
            editItemDetail={editItemDetail}
            saveEditItem={saveEditItem}
            handleEditChangeCourse={handleEditChangeCourse}
            handleEditChangeAssignment={handleEditChangeAssignment}
            handleEditChangeDate={handleEditChangeDate}
            itemChecked={itemChecked}
            checkedItems={checkedItems}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;