import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { NoteInput, createNote, updateNote } from '../network/note_api'
import { Note } from '../models/note'
import { useForm } from "react-hook-form"
interface AddEditNoteDialogeProps {
  noteToEdit?: Note,
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void,
}
const AddEditNoteDialoge = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogeProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || " "
    }
  });
  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note;
      if (noteToEdit)
        noteResponse = await updateNote(noteToEdit._id, input);
      else
        noteResponse = await createNote(input);
      onNoteSaved(noteResponse);

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {noteToEdit ? "Edit Note" : "Add Note"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              isInvalid={!!errors.title}//covert error.title to boolean
              placeholder='Title'
              {...register('title', { required: "Required" })}
            />
          </Form.Group>
          <Form.Control.Feedback type='invalid'>
            {errors.title?.message}
          </Form.Control.Feedback>
          <Form.Group className='mb-3'>
            <Form.Label>Text</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Text'
              rows={3}
              {...register('text')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type='submit'
          disabled={isSubmitting}
          form='addEditNoteForm'>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialoge
