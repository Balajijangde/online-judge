import { Spinner, Container, Col, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Config from "../config";
import ProblemProps from "../model/problem_props";
import Problem from "../component/problem";
import { Link } from "react-router-dom";

const ProblemsScreen = () => {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    fetchProblems();
  }, []);
  const fetchProblems = async () => {
    let res = await axios.get(`${Config.baseUrl}/problems`);
    setProblems(res.data);
  };
  const renderProblems = () => {
    if (problems.length == 0)
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    else
      return (
        <Row className="mt-5">
          <Col>
            <Table striped bordered hover className="w-75">
              <thead>
                <tr>
                  <th>
                    <p>Problem ID</p>
                  </th>

                  <th>
                    <p>Problem name</p>
                  </th>
                  <th>
                    <p>Difficulty</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem: ProblemProps) => (
                  <tr key={problem.id}>
                    <td>
                      <p>{problem.id}</p>
                    </td>
                    <td>
                      <p>
                        <Link to={`/problems/${problem.id}`}>
                          {problem.title}
                        </Link>
                      </p>
                    </td>
                    <td>
                      <p className={problem.level}>{problem.level}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      );
  };
  return <Container>{renderProblems()}</Container>;
};

export default ProblemsScreen;
