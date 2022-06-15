import {Row, Col} from 'react-bootstrap'
import ProblemProps from '../model/problem_props';
import {Link} from 'react-router-dom'

const Problem = (props : ProblemProps) => {
    return (
      <Row>
        <Col sm={1}><p>{props.id}</p> </Col>
        <Col sm={10}><Link to={`/problems/${props.id}`}>{props.title}</Link></Col>
        <Col sm={1}><p className={props.level}>{props.level}</p></Col>
      </Row>
    );
  }

export default Problem