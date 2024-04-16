import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import Card from './Card';

const AddCard = () => {
  return (
    <Card>
      <MaterialIcons name="add" size={42} color="black" />
    </Card>
  );
};

export default AddCard;
