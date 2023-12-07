import React from 'react';
import DriverDialog from './dialogs/DriverDiaglog';
import EmployeeDialog from './dialogs/EmployeeDialog';
import RouteDialog from './dialogs/RouteDialog';

const Modal = ({
  category,
  data,
  onUpdate,
  onDelete,
  closeModal,
  openModal,
}) => {
  return (
    <>
      {category === 'driver' ? (
        <DriverDialog
          driverData={data}
          onDelete={onDelete}
          onUpdate={onUpdate}
          closeModal={closeModal}
          openModal={openModal}
        />
      ) : category === 'employee' ? (
        <EmployeeDialog
          employeeData={data}
          onDelete={onDelete}
          onUpdate={onUpdate}
          closeModal={closeModal}
          openModal={openModal}
        />
      ) : (
        <RouteDialog
          routeData={data}
          onDelete={onDelete}
          onUpdate={onUpdate}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
    </>
  );
};

export default Modal;
