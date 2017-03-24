import React from 'react';
import {FormGroup, InputGroup, Glyphicon, FormControl} from 'react-bootstrap';

export class SearchField extends React.Component {
  render(){
    return (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
          <FormControl type="text" 
            placeholder="search..."
            onChange={this.props.handleSearchChange}
            value={this.props.search}
          />
        </InputGroup>
      </FormGroup>

    )

  }
}
