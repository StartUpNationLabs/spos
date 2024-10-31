import React from 'react';
import Footer from '../utils/footer';

export function MealSelectionForPayment() {
  function handleClose() {
    console.log('Close button clicked');
  }

  function handleSelectWhoPays() {
    console.log('Select who pays button clicked');
  }

  function handleGroupClick() {
    console.log('Group button clicked');
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Footer
        onClose={handleClose}
        onSelectWhoPays={handleSelectWhoPays}
        onGroupClick={handleGroupClick}
      />
    </div>
  );
}

export default MealSelectionForPayment;
