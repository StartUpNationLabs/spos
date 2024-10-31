import React from 'react';
import Footer from '../utils/mealSelectionForPaymentFooter';
import BackButton from '../utils/backButton';

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

  function handdleBackButtonClick(): void {
    console.log('Back button clicked');
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <BackButton 
        onClick={() => handdleBackButtonClick()}
       
      />
      <Footer
        onClose={handleClose}
        onSelectWhoPays={handleSelectWhoPays}
        onGroupClick={handleGroupClick}
      />
    </div>
  );
}

export default MealSelectionForPayment;
