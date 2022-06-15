import {Spinner, Container} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Config from '../config'
import ProblemProps from '../model/problem_props';
import Problem from '../component/problem';

const ProblemsScreen = () => {
    const [problems, setProblems] = useState([])
    useEffect(()=>{fetchProblems()}, []);
    const fetchProblems = async () => {
      let res = await axios.get(`${Config.baseUrl}/problems`)
      setProblems(res.data)
    }
    const renderProblems = () => {
      if(problems.length == 0) return (<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>)
      else return <div>
        {problems.map((problem: ProblemProps) => <Problem key={problem.id} id={problem.id} title={problem.title} level={problem.level}/>)}
      </div>
    }
    return (
      <Container fluid>
        
        {renderProblems()}
      </Container>
    );
  }

export default ProblemsScreen