import React from 'react';
import { Button, Card, CardBody, CardHeader, Modal } from 'reactstrap';
import {
  Form,
  Button as ValidButton,
} from 'views/comn/validation/FormValidation';
import { GetConstants, Constants } from 'libs/Constants';

const EditModal = ({
  title,
  editForm,
  formId,
  edit,
  toggle,
  onSubmit,
  onCancel,
  className,
}) => {
  return (
    <Modal isOpen={edit.visible} toggle={toggle} className={className}>
      <Card>
        <CardHeader>
          <strong>{title}</strong> {GetConstants.getEditTitle(edit.mode)}
        </CardHeader>
        <CardBody>
          <Form
            id={formId}
            action=""
            method="post"
            className="form-horizontal"
            onSubmit={onSubmit}
          >
            {editForm}
            {(edit.mode === Constants.EDIT_MODE.WRITE ||
              edit.mode === Constants.EDIT_MODE.EDIT) && (
              <>
                <ValidButton type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o" />{' '}
                  {GetConstants.getEditTitle(edit.mode)}
                </ValidButton>
              </>
            )}
            <Button type="reset" size="sm" color="danger" onClick={onCancel}>
              <i className="fa fa-ban" /> {Constants.BUTTON.CLOSE}
            </Button>
          </Form>
        </CardBody>
        {/* <CardFooter /> */}
      </Card>
    </Modal>
  );
};

export default EditModal;
