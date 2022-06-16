import React, { useState, useEffect, BaseSyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Config from "../config";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import ProblemDetailProps from "../model/problem_detail_props";
import SubmissionResponse from "../model/submission_response";
import VerdictCode from "../common/verdict_code";

const cppTemplate = `#include<bits/stdc++.h>
using namespace std;
int main(){
  cout << "Hello World";
}`;

const javaTemplate = `class Code{
  public static void main(String[] args){
    System.out.println("Hello world")
  }
}`;

const pythonTemplate = `print("Hello World")`;

const ProblemScreen = () => {
  let { problemId } = useParams();
  const [problem, setProblem] = useState<ProblemDetailProps | null>(null);
  const [language, setLanguage] = useState("cpp");
  const [tabActiveKey, setTabActiveKey] = useState<string>("description");
  const [submissionRes, setSubmissionRes] = useState<SubmissionResponse | null>(
    null
  );
  enum submitStatusEnum {
    notStarted,
    submitting,
    submitted,
  }
  const [submitStatus, setSubmitStatus] = useState<submitStatusEnum>(
    submitStatusEnum.notStarted
  );

  let code: string = "";
  const fetchProblem = async () => {
    try {
      let res = await axios.get(`${Config.baseUrl}/problems/${problemId}`);
      setProblem(res.data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const renderSubmissionTab = () => {
    if (submitStatus == submitStatusEnum.notStarted) {
      return <p>Please submit a solution</p>;
    } else if (submitStatus == submitStatusEnum.submitting) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else {
      if (submissionRes?.verdictCode == VerdictCode.AllClear) {
        return (
          <Alert key={"success"} variant={"success"}>
            <h5>{submissionRes.result}</h5>
            <p>{submissionRes.details}</p>
          </Alert>
        );
      } else if (submissionRes?.verdictCode == VerdictCode.WrongAnswer) {
        return (
          <Alert key={"danger"} variant={"danger"}>
            <h5>{submissionRes.result}</h5>
            <p>{submissionRes.details}</p>
          </Alert>
        );
      } else if (submissionRes?.verdictCode == VerdictCode.CompilationError) {
        return (
          <Alert key={"danger"} variant={"danger"}>
            <h5>{submissionRes.result}</h5>
            <p>{submissionRes.details}</p>
          </Alert>
        );
      } else if (submissionRes?.verdictCode == VerdictCode.RuntimeException) {
        return (
          <Alert key={"danger"} variant={"danger"}>
            <h5>{submissionRes.result}</h5>
            <p>{submissionRes.details}</p>
          </Alert>
        );
      } else if (submissionRes?.verdictCode == VerdictCode.TimeLimitException) {
        return (
          <Alert key={"danger"} variant={"danger"}>
            <h5>{submissionRes.result}</h5>
            <p>{submissionRes.details}</p>
          </Alert>
        );
      }
    }
  };
  const languageSupport = () => {
    if (language == "cpp") {
      console.log("supporting c++");
      return [cpp()];
    } else if (language == "java") {
      console.log("supporting java");
      return [java()];
    } else {
      console.log("supporting python");
      return [python()];
    }
  };
  const setLanguageSupport = (e: BaseSyntheticEvent) => {
    console.log(e);
  };
  const setLanguageTemplate = () => {
    if (language == "cpp") return (code = cppTemplate);
    else if (language == "java") return (code = javaTemplate);
    else return (code = pythonTemplate);
  };
  useEffect(() => {
    fetchProblem();
  }, []);

  const submitCode = async () => {
    setTabActiveKey("submission");
    setSubmitStatus(submitStatusEnum.submitting);
    let data = {
      codes: code,
      language: language,
    };
    try {
      let res = await axios.post(
        `${Config.baseUrl}/problems/${problemId}/submission`,
        data
      );
      setSubmissionRes(res.data);
    } catch (e: any) {
      console.log(e);
      if (e.response.status == 406) {
        setSubmissionRes(e.response.data);
      } else {
        throw e;
      }
    }

    //do something with res
    setSubmitStatus(submitStatusEnum.submitted);
  };

  const renderProblem = () => {
    if (problem == null) {
      return (
        <Row>
          <Col>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col>
            <h4>{`${problem.id}. ${problem.title}`}</h4>

            <p className={problem.level}>{problem.level}</p>
            <hr />
            <p>{problem.description}</p>
            <br />
            <h6>Input 1</h6>
            <div className={["basicBlock", "p-3"].join(" ")}>
              {problem.input1}
            </div>
            <h6>Output 1</h6>
            <div className={["basicBlock", "p-3"].join(" ")}>
              {problem.output1}
            </div>
            <h6>Input 2</h6>
            <div className={["basicBlock", "p-3"].join(" ")}>
              {problem.input2}
            </div>
            <h6>Output 2</h6>
            <div className={["basicBlock", "p-3"].join(" ")}>
              {problem.output2}
            </div>
            <h6>Constraints</h6>
            <div className={["basicBlock", "p-3"].join(" ")}>
              {problem.constraint.toString()}
            </div>
          </Col>
        </Row>
      );
    }
  };

  return (
    <Container fluid>
      <Row className={"py-2"}>
        <Col>
          <Tabs
            activeKey={tabActiveKey}
            onSelect={(k) => {
              k != null && setTabActiveKey(k);
            }}
            className="mb-3"
          >
            <Tab eventKey="description" title="Description">
              {renderProblem()}
            </Tab>
            <Tab eventKey="submission" title="Submission">
              {renderSubmissionTab()}
            </Tab>
          </Tabs>
        </Col>
        <Col>
          <Row className={"py-2"}>
            <Col>
              <Form.Select onChange={(e) => setLanguage(e.target.value)}>
                <option value="cpp">c++</option>
                <option value="java">java</option>
                <option value="python">python3</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option>one-dark</option>
              </Form.Select>
            </Col>
          </Row>
          <CodeMirror
            value={setLanguageTemplate()}
            height="500px"
            theme={oneDark}
            extensions={languageSupport()}
            onChange={(value, viewUpdate) => (code = value)}
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Button variant="primary" onClick={submitCode}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProblemScreen;
