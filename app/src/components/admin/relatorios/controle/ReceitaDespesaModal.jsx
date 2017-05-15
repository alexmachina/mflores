import React from 'react'
import {Col, Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ReceitaDespesaModal = ({show, close, onReceitasClick, onDespesasClick}) => (
  <Modal show={show} onHide={close}>
    <Modal.Header >
      <Modal.Title>
      </Modal.Title>
      <Modal.Body>
        <Col id="choices">
          <Col xs={12} md={6}
            id="despesas-button" className="choice-button"
            onClick={onDespesasClick}>
              Despesas
            </Col>
            
            <Col xs={12} md={6} 
              id="receitas-button" className="choice-button"
              onClick={onReceitasClick}>
              Receitas
            </Col>
        </Col>
      </Modal.Body>
    </Modal.Header>
  </Modal>

)

ReceitaDespesaModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  onReceitasClick: PropTypes.func,
  onDespesasClick: PropTypes.func
}

export default ReceitaDespesaModal
