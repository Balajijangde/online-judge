import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Config from "../config"
import { Col, Container, Row } from 'react-bootstrap'
import CodeMirror from '@uiw/react-codemirror'
import {cpp} from '@codemirror/lang-cpp'
import {oneDark} from '@codemirror/theme-one-dark'
import {StreamLanguage} from '@codemirror/language'

const cppTemplate = `#include<bits/stdc++.h>
using namespace std;
int main(){
  cout << "Hello World";
}`

const ProblemScreen = () => {
    let {problemId} = useParams()
    const [problem, setProblem] = useState([])
    const fetchProblem = async () => {
      try{
        let res = await axios.get(`${Config.baseUrl}/problems/${problemId}`)
        setProblem(res.data)
        console.log(res)
      }catch(e){
        console.log(e)
      }
    }
    useEffect(()=>{fetchProblem()}, [])
    
    return (
      <Container fluid>
        <Row>
          <Col>
            <p>Problem description block</p>
          </Col>
          <Col>
          <CodeMirror
      value={cppTemplate}
      height="600px"
      theme={oneDark}
      extensions={[cpp()]}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}

    />
          </Col>
        </Row>
      </Container>
    )
  }

  export default ProblemScreen