import React from 'react'
import { Modal, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

const ParamsModal = ({
  show, close, dataInicial, dataFinal,
  onDataInicialChange, onDataFinalChange, onSubmit, erro}) => (
  <Modal show={show} onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title >
        Escolha as datas
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={onSubmit}>
        
        <label> Data Inicial</label>
        <div>
        <DatePicker 
          selected={dataInicial}
          onChange={onDataInicialChange}
          className="form-control"
        />
      </div>
        <label>Data Final</label>
        <div>
        <DatePicker
          selected={dataFinal}
          onChange={onDataFinalChange}
          className="form-control"
        />
      </div>

      <Button type="submit" className="btn btn-primary form-button">
        OK
      </Button>
      <p className="erro">{erro}</p>
      </form>
    </Modal.Body>
  </Modal>
)


export default ParamsModal

