import Input from '../../utils/Input.js'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'react-bootstrap'

const UsuariosForm = ({onSubmit, user}) => {
    <Row>
      <Col xs={12}>
        <form onSubmit={() => onSubmit()}>
          <Input 
            label="Usuário"
            value={user.username}
          />
        </form>
      </Col>
    </Row>
}

UsuariosForm.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.shape({
    _id: PropTypes.number,
    username: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string
  })
}
