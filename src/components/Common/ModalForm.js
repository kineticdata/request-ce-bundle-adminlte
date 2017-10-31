import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { CoreForm } from 'react-kinetic-core';
import {  Modal } from 'react-bootstrap';

import { actions as modalFormActions } from '../../redux/modules/modalForm';

const ModalFormComponent = ({ form, completed, handleCompleted, handleDismissed }) =>
  form &&
  <Modal show={true} bsSize="large" onHide={handleDismissed} backdrop>
    <Modal.Header closeButton>
      <Modal.Title>{form.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {
      completed
        ? <h5>{form.confirmationMessage}</h5>
        : (
          <CoreForm
            kapp={form.kappSlug}
            form={form.formSlug}
            values={form.values}
            onCompleted={handleCompleted}
          />
        )
    }
    </Modal.Body>
  </Modal>;


const mapStateToProps = state => ({
  form: state.modalForm.form,
  completed: state.modalForm.completed,
});

const mapDispatchToProps = {
  completeForm: modalFormActions.completeForm,
  dismissForm: modalFormActions.dismissForm,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleCompleted: props => (submission, actions) => {
      actions.stop();
      props.completeForm();
    },
    handleDismissed: props => event => {
      if (event) event.stopPropagation();
      props.dismissForm();
    },
  }),
);

export const ModalForm = enhance(ModalFormComponent);
