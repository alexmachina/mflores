import React from 'react'
import ProprietariosTableContainer from '../../geral/ProprietariosTableContainer.jsx'
import { Jumbotron, Button } from 'react-bootstrap'
import { Link } from 'react-router'

export default class ProprietariosPage extends React.Component {
  render() {
    return(
      <div>
        <Jumbotron className="admin-jumbotron text-center">
          <h1 className="text-center">
            Proprietários
          </h1>
          <Link to="/admin/proprietario">
            <Button>
              Novo Proprietário
            </Button>
          </Link>
        </Jumbotron>


        <ProprietariosTableContainer />
      </div>
    )
  }
}
