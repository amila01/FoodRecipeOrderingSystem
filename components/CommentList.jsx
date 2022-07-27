import React from 'react'
import Comment from './Comment'
import { Row, Col } from 'react-bootstrap'

const CommentList = ({commentList, food}) => {
  return (
    <Row md={4}>
    
    {commentList
            .filter((comment) => comment.proId == food._id)
            .map((comment) => (
                <Col>
                <Comment key={comment._id} comment={comment} />
              </Col>
            ))}
            
  </Row>
  )
}

export default CommentList