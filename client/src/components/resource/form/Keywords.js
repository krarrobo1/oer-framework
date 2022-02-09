import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { ImCross } from 'react-icons/im';


export const Keywords = ({
    register
}) => {

    const [keyword, setKeyword] = useState("")
    const [keywords, setKeywords] = useState([])

    const removeKeyword = (idx) => {
        setKeywords(keywords.filter((_, id) => id !== idx));
    }

    const changeKeyword = ({ target }) => {
        setKeyword(target.value);
    }

    const handleAddKeyword = (e) => {
        if (e.charCode === 13) { // On key enter
            setKeywords([...keywords, keyword]);
            setKeyword("");
        }
    }

    return (
        <Row className="mt-2 mb-2">
            <Col sm={12}>
                <Form.Label>Keywords</Form.Label>
            </Col>
            <Col sm={8}>
                <Form.Control
                    type="text"
                    name="keyword"
                    maxLength="32"
                    placeholder="Insert a keyword"
                    onChange={changeKeyword}
                    value={keyword}
                    onKeyPress={handleAddKeyword}
                />
            </Col>
            <Col sm={12} className='p-2'>
                {
                    keywords.map((keyword, idx) =>
                        <Badge key={idx} variant="primary">
                            <span className="cursor-pointer" onClick={() => removeKeyword(idx)}>X</span>
                            <span className="ml-2">{keyword}</span>
                        </Badge>
                    )
                }
            </Col>
        </Row>
    )
}
