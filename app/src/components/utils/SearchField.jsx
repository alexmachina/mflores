import React from 'react';
import {FormGroup, InputGroup, Glyphicon, FormControl} from 'react-bootstrap';
import { observer } from 'mobx-react'


@observer
export default class SearchField extends React.Component {
  render(){
    return (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
          <FormControl type="text" 
            placeholder=""
            onChange={this.props.handleSearchChange}
            value={this.props.search}
          />
        </InputGroup>
      </FormGroup>

    )

  }
}
