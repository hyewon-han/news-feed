import React, { useState } from 'react';
import styled from 'styled-components';

function Upload() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const onChangeContent = (event) => {
    setContent(event.target.value)
  }

  const onChangeFile = (event) => {
    setFile(event.target.value)
  }
  console.log(file)

  return (
    <StPost>
      <StH1>게시글 작성하기</StH1>
      <form name='posting' action='' method='post'>
        <div>
          <StTitle type='text' value={title} onChange={onChangeTitle} placeholder='제목을 입력해주세요.'></StTitle>
        </div>
        <div>
          <StContent type='text' value={content} onChange={onChangeContent} placeholder='내용을 입력해주세요.'></StContent>
        </div>
        <div>
          <StFile type='file' multiple value={file} onChange={onChangeFile}></StFile>
          {/* <StFile type='file' id='postFiles' multiple></StFile> */}
        </div>
        <StBtn onClick={createPost}>게시글 작성</StBtn>
      </form>
    </StPost>
  )
}

export default Upload;

const StPost = styled.div`
  background-color: inherit;
  width: 520px;
  height: 800px;
  text-align: center;
`

const StH1 = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #475c7a;
  margin-top: 50px;
  margin-bottom: 20px;
`

const StTitle = styled.input`
  width: 500px;
  height: 50px;
  margin-bottom: 30px;
  border: 1px solid #252525;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  text-indent: 10px;
`

const StContent = styled.textarea`
  width: 500px;
  height: 300px;
  margin-bottom: 30px;
  border: 1px solid #252525;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  text-indent: 10px;
`

const StFile = styled.input`
  width: 500px;
  height: 50px;
  margin-bottom: 30px;
  border: 1px solid #252525;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  text-indent: 10px;
  line-height: 50px;
  vertical-align: middle;
  cursor: pointer;
`

const StBtn = styled.button`
  width: 150px;
  height: 50px;
  background-color: #475c7a;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  padding: 10px;
  float: right;
  cursor: pointer;
`