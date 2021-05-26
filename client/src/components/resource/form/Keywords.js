import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { ImCross } from 'react-icons/im';


export const Keywords = ({ keywords, setManual }) => {

    const [keyword, setTagInputvalue] = useState("")

    const removeKeyword = (i) => {
        setManual({ keywords: keywords.filter((_, id) => id !== i) });
    }

    const changeKeyword = ({ target }) => {
        setTagInputvalue(target.value);
    }

    const handleAddKeyword = (e) => {
        e.preventDefault();
        if (keyword.trim().length > 2 && keywords.length < 5) {
            setManual({ keywords: [...keywords, keyword] });
            setTagInputvalue("");
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
                    value={keyword}
                    name="keyword"
                    maxLength="32"
                    placeholder="Insert a keyword"
                    onChange={changeKeyword}
                />
            </Col>
            <Col sm={4}>
                <Button
                    className="btn-block"
                    onClick={handleAddKeyword}>
                    Add
                        </Button>
            </Col>
            <Col sm={12}>
                {
                    keywords.map((kw, i) => (<Badge key={i} variant="primary">{kw} <ImCross className="bi bi-x" onClick={() => removeKeyword(i)} /></Badge>))
                }
            </Col>
        </Row>
    )
}
