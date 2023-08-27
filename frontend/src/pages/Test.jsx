import { useState } from 'react';
import { Form, Button, Rating } from 'react-bootstrap';

const Test = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Your Rating:</Form.Label>
        <Rating
          value={rating}
          onChange={handleRatingChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Write a Review:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">Submit Review</Button>
    </Form>
  );
};

export default Test;
