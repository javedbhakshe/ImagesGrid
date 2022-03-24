import React, { useState } from "react";
import { InputGroup, Button, FormControl, Form } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          value={term}
          onChange={({ target }) => setTerm(target.value)}
        />
        <Button
          variant="outline-secondary"
          title="Search Images"
          type="submit"
          disabled={!term}
        >
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
